import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { MapPin, Clock, Banknote, CreditCard, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/contexts/ShopContext";
import { supabase } from "@/integrations/supabase/client";
import { formatXCD } from "@/lib/shop/format";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Phone number required").max(30),
  email: z.string().trim().email("Invalid email").max(255).or(z.literal("")),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { items, store, subtotalCents, clearCart } = useShop();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupAsap, setPickupAsap] = useState(true);
  const [scheduleTime, setScheduleTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash_on_pickup" | "card">("cash_on_pickup");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!store || items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-display font-bold mb-3">Your cart is empty</h1>
          <Button variant="urgent" onClick={() => navigate("/shop")}>Start Shopping</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const submit = async () => {
    const parsed = schema.safeParse({ name, phone, email });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});

    if (paymentMethod === "card") {
      toast({ title: "Card payments coming soon", description: "Online card payment will activate in Phase 2. Please choose Cash on Pickup for now." });
      return;
    }

    setSubmitting(true);
    try {
      const pickupAt = pickupAsap ? null : (scheduleTime ? new Date(scheduleTime).toISOString() : null);

      const { data: order, error: oErr } = await supabase.from("orders").insert({
        store_id: store.id,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || null,
        pickup_asap: pickupAsap,
        pickup_at: pickupAt,
        subtotal_cents: subtotalCents,
        total_cents: subtotalCents,
        payment_method: paymentMethod,
        payment_status: "unpaid",
        status: "pending",
      }).select("id, order_number").single();
      if (oErr) throw oErr;

      const orderItems = items.map(i => ({
        order_id: order.id,
        product_id: i.productId,
        product_name: i.name,
        unit: i.unit,
        unit_price_cents: i.unitPriceCents,
        quantity: i.quantity,
        line_total_cents: i.unitPriceCents * i.quantity,
      }));
      const { error: iErr } = await supabase.from("order_items").insert(orderItems);
      if (iErr) throw iErr;

      clearCart();
      navigate(`/shop/confirmation/${order.order_number}`, {
        state: { orderNumber: order.order_number, customerName: name },
      });
    } catch (e: any) {
      toast({ title: "Order failed", description: e?.message ?? "Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        <button onClick={() => navigate("/shop/browse")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to shop
        </button>
        <h1 className="text-3xl font-display font-extrabold mb-6">Pickup Checkout</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card className="p-5">
              <h2 className="font-display font-bold mb-3">1. Your details</h2>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Full name *</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} maxLength={100} />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone (for pickup coordination) *</Label>
                  <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} maxLength={30} />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={255} />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="font-display font-bold mb-3">2. Pickup time</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-md border cursor-pointer hover:bg-secondary">
                  <input type="radio" checked={pickupAsap} onChange={() => setPickupAsap(true)} className="accent-primary" />
                  <div>
                    <div className="font-display font-semibold flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> ASAP Pickup</div>
                    <div className="text-xs text-muted-foreground">Ready in ~{store.pickup_lead_minutes}–{store.pickup_lead_minutes + 15} mins</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-md border cursor-pointer hover:bg-secondary">
                  <input type="radio" checked={!pickupAsap} onChange={() => setPickupAsap(false)} className="accent-primary" />
                  <div className="flex-1">
                    <div className="font-display font-semibold">Schedule pickup</div>
                    {!pickupAsap && (
                      <Input type="datetime-local" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="mt-2" />
                    )}
                  </div>
                </label>
              </div>
              <div className="mt-3 text-sm text-muted-foreground flex items-start gap-1.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                {store.name} — {store.address}
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="font-display font-bold mb-3">3. Payment</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-md border cursor-pointer hover:bg-secondary">
                  <input type="radio" checked={paymentMethod === "cash_on_pickup"} onChange={() => setPaymentMethod("cash_on_pickup")} className="accent-primary" />
                  <Banknote className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-display font-semibold">Cash on Pickup</div>
                    <div className="text-xs text-muted-foreground">Pay in-store when collecting your order</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-md border cursor-pointer hover:bg-secondary opacity-70">
                  <input type="radio" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="accent-primary" />
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-display font-semibold">Debit / Credit Card <span className="text-xs font-normal text-muted-foreground">(coming soon)</span></div>
                    <div className="text-xs text-muted-foreground">Online card payments activate in Phase 2</div>
                  </div>
                </label>
              </div>
            </Card>
          </div>

          <aside className="md:col-span-1">
            <Card className="p-5 md:sticky md:top-20">
              <h2 className="font-display font-bold mb-3">Order summary</h2>
              <ul className="space-y-2 text-sm mb-3 max-h-64 overflow-y-auto">
                {items.map(i => (
                  <li key={i.productId} className="flex justify-between gap-2">
                    <span className="line-clamp-2">{i.name} <span className="text-muted-foreground">× {i.quantity}</span></span>
                    <span className="font-semibold whitespace-nowrap">{formatXCD(i.unitPriceCents * i.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-3 flex justify-between items-baseline mb-4">
                <span className="font-display font-bold">Total</span>
                <span className="font-display font-bold text-2xl text-urgent">{formatXCD(subtotalCents)}</span>
              </div>
              <Button variant="urgent" className="w-full" size="lg" onClick={submit} disabled={submitting}>
                {submitting ? "Placing order…" : "Place Pickup Order"}
              </Button>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
