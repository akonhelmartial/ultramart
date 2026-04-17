import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useShop } from "@/contexts/ShopContext";
import { isStoreOpen } from "@/lib/shop/format";

type Store = {
  id: string;
  slug: string;
  name: string;
  address: string;
  open_time: string;
  close_time: string;
  pickup_lead_minutes: number;
};

const StoreSelect = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setStore } = useShop();

  useEffect(() => {
    supabase.from("stores").select("*").eq("is_active", true).order("sort_order")
      .then(({ data }) => {
        setStores(data ?? []);
        setLoading(false);
      });
  }, []);

  const choose = (s: Store) => {
    setStore({
      id: s.id, slug: s.slug, name: s.name,
      address: s.address, pickup_lead_minutes: s.pickup_lead_minutes,
    });
    navigate("/shop/browse");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-10">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-3">
            Choose your pickup store
          </h1>
          <p className="text-muted-foreground text-lg">
            Pick where you want to grab your order. Prices and stock are locked to that location.
          </p>
        </header>

        {loading ? (
          <div className="text-muted-foreground">Loading stores…</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {stores.map(s => {
              const open = isStoreOpen(s.open_time, s.close_time);
              return (
                <Card key={s.id} className="p-6 hover:shadow-lg transition-shadow border-2">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h2 className="text-xl font-display font-bold">{s.name}</h2>
                    <span className={`text-xs font-display font-bold uppercase px-2 py-1 rounded-full ${
                      open ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {open ? "Open Now" : "Closed"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-start gap-1.5 mb-3">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {s.address}
                  </p>
                  <p className="text-sm flex items-center gap-1.5 mb-5 text-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    Pickup in ~{s.pickup_lead_minutes} mins
                  </p>
                  <Button
                    variant="urgent" className="w-full group"
                    onClick={() => choose(s)} disabled={!open}
                  >
                    {open ? "Shop This Location" : "Currently Closed"}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default StoreSelect;
