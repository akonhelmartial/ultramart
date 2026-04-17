import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, MapPin, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/contexts/ShopContext";

const Confirmation = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { customerName?: string } };
  const { store } = useShop();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <Card className="p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-display font-extrabold mb-2">Order placed!</h1>
          <p className="text-muted-foreground mb-1">{state?.customerName ? `Thank you, ${state.customerName}.` : "Thank you."}</p>
          <p className="text-sm text-muted-foreground mb-6">
            Your order number is <span className="font-mono font-bold text-foreground">{orderNumber}</span>
          </p>

          {store && (
            <div className="bg-secondary rounded-md p-4 text-left space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span><strong>Pickup at:</strong> {store.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span><strong>Ready in:</strong> ~{store.pickup_lead_minutes}–{store.pickup_lead_minutes + 15} mins</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
                <span>We'll text you when your order is ready for pickup.</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
            <Button variant="urgent" onClick={() => navigate("/shop/browse")}>Shop Again</Button>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
