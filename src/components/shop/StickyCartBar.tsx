import { ShoppingCart } from "lucide-react";
import { useShop } from "@/contexts/ShopContext";
import { formatXCD } from "@/lib/shop/format";

const StickyCartBar = () => {
  const { totalItems, subtotalCents, setCartOpen } = useShop();
  if (totalItems === 0) return null;
  return (
    <button
      onClick={() => setCartOpen(true)}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-urgent text-urgent-foreground px-4 py-3 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.15)] font-display font-bold"
    >
      <span className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        {totalItems} item{totalItems !== 1 ? "s" : ""}
      </span>
      <span className="flex items-center gap-2">
        {formatXCD(subtotalCents)}
        <span className="text-xs opacity-90">View Cart →</span>
      </span>
    </button>
  );
};

export default StickyCartBar;
