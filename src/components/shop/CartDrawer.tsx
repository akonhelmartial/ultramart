import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2, MapPin, Clock } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useShop } from "@/contexts/ShopContext";
import { formatXCD } from "@/lib/shop/format";

const CartDrawer = () => {
  const { cartOpen, setCartOpen, items, updateQty, removeItem, subtotalCents, store } = useShop();
  const navigate = useNavigate();

  const goCheckout = () => {
    setCartOpen(false);
    navigate("/shop/checkout");
  };

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="font-display text-xl flex items-center justify-between">
            Your Cart
            <button onClick={() => setCartOpen(false)} aria-label="Close" className="md:hidden">
              <X className="w-5 h-5" />
            </button>
          </SheetTitle>
          {store && (
            <div className="text-xs text-muted-foreground flex flex-col gap-1 pt-1">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{store.name}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Pickup in ~{store.pickup_lead_minutes} mins</span>
            </div>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Your cart is empty. Add items to get started.
            </div>
          ) : (
            <ul className="divide-y">
              {items.map(i => (
                <li key={i.productId} className="p-3 flex gap-3">
                  <div className="w-16 h-16 rounded bg-secondary overflow-hidden shrink-0">
                    {i.imageUrl && <img src={i.imageUrl} alt={i.name} className="w-full h-full object-cover" loading="lazy" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm leading-tight line-clamp-2">{i.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{i.unit} · {formatXCD(i.unitPriceCents)}</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQty(i.productId, i.quantity - 1)}>
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                      <span className="w-8 text-center font-display font-bold text-sm">{i.quantity}</span>
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQty(i.productId, i.quantity + 1)}>
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                      <button
                        className="ml-auto text-muted-foreground hover:text-urgent p-1"
                        aria-label="Remove" onClick={() => removeItem(i.productId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-display font-bold whitespace-nowrap">
                    {formatXCD(i.unitPriceCents * i.quantity)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-3 bg-background">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display font-bold text-lg">{formatXCD(subtotalCents)}</span>
            </div>
            <Button variant="urgent" className="w-full" size="lg" onClick={goCheckout}>
              Continue to Pickup Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
