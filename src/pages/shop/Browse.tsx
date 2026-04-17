import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useShop } from "@/contexts/ShopContext";
import ProductCard, { ShopProduct } from "@/components/shop/ProductCard";
import CartDrawer from "@/components/shop/CartDrawer";
import StickyCartBar from "@/components/shop/StickyCartBar";

type Category = { id: string; slug: string; name: string; icon: string | null };
type InventoryRow = {
  product_id: string;
  price_cents: number;
  promo_price_cents: number | null;
  stock_qty: number;
  is_available: boolean;
  products: {
    id: string; name: string; unit: string; image_url: string | null;
    is_popular: boolean; category_id: string;
  };
};

const Browse = () => {
  const { store, setCartOpen } = useShop();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [inventory, setInventory] = useState<InventoryRow[]>([]);
  const [activeCat, setActiveCat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!store) {
      navigate("/shop");
      return;
    }
    let cancelled = false;
    (async () => {
      const [{ data: cats }, { data: inv }] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase.from("store_inventory")
          .select("product_id,price_cents,promo_price_cents,stock_qty,is_available,products(id,name,unit,image_url,is_popular,category_id)")
          .eq("store_id", store.id)
          .eq("is_available", true),
      ]);
      if (cancelled) return;
      setCategories(cats ?? []);
      setInventory((inv ?? []) as unknown as InventoryRow[]);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [store, navigate]);

  const products = useMemo<ShopProduct[]>(() => {
    let rows = inventory;
    if (activeCat !== "all" && activeCat !== "popular") {
      rows = rows.filter(r => r.products.category_id === activeCat);
    } else if (activeCat === "popular") {
      rows = rows.filter(r => r.products.is_popular);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r => r.products.name.toLowerCase().includes(q));
    }
    return rows.map(r => ({
      productId: r.products.id,
      name: r.products.name,
      unit: r.products.unit,
      imageUrl: r.products.image_url,
      priceCents: r.price_cents,
      promoPriceCents: r.promo_price_cents,
      stockQty: r.stock_qty,
    }));
  }, [inventory, activeCat, search]);

  if (!store) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 md:pb-0">
      <Navbar />
      {/* Store bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-3 text-sm">
          <Link to="/shop" className="flex items-center gap-2 hover:underline font-display font-semibold">
            <ChevronLeft className="w-4 h-4" />
            <MapPin className="w-4 h-4" />
            <span>{store.name}</span>
          </Link>
          <span className="hidden sm:inline opacity-80">Pickup ~{store.pickup_lead_minutes} mins</span>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-4 max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products…" value={search}
            onChange={e => setSearch(e.target.value)} className="pl-9"
          />
        </div>

        {/* Sticky category nav */}
        <nav className="sticky top-[68px] z-30 -mx-4 px-4 py-2 bg-background/95 backdrop-blur border-b mb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[{ id: "all", name: "All", icon: "🛒" }, { id: "popular", name: "Popular This Week", icon: "🔥" }, ...categories].map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-display font-semibold whitespace-nowrap transition-colors ${
                  activeCat === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                <span className="mr-1">{c.icon}</span>{c.name}
              </button>
            ))}
          </div>
        </nav>

        {loading ? (
          <div className="text-muted-foreground py-12 text-center">Loading…</div>
        ) : products.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">No products match.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {products.map(p => <ProductCard key={p.productId} p={p} />)}
          </div>
        )}

        <div className="mt-8 hidden md:flex justify-end">
          <Button variant="urgent" size="lg" onClick={() => setCartOpen(true)}>
            View Cart
          </Button>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <StickyCartBar />
    </div>
  );
};

export default Browse;
