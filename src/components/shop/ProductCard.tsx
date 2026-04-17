import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/contexts/ShopContext";
import { formatXCD } from "@/lib/shop/format";

export type ShopProduct = {
  productId: string;
  name: string;
  unit: string;
  imageUrl: string | null;
  priceCents: number;
  promoPriceCents: number | null;
  stockQty: number;
};

const ProductCard = ({ p }: { p: ShopProduct }) => {
  const { items, addItem, updateQty } = useShop();
  const inCart = items.find(i => i.productId === p.productId);
  const effectivePrice = p.promoPriceCents ?? p.priceCents;
  const onPromo = p.promoPriceCents != null;
  const lowStock = p.stockQty > 0 && p.stockQty <= 5;
  const outOfStock = p.stockQty <= 0;

  const handleAdd = () => addItem({
    productId: p.productId, name: p.name, unit: p.unit,
    imageUrl: p.imageUrl, unitPriceCents: effectivePrice,
  });

  return (
    <div className="bg-card rounded-lg border overflow-hidden flex flex-col group">
      <div className="aspect-square bg-secondary overflow-hidden relative">
        {p.imageUrl ? (
          <img
            src={p.imageUrl} alt={p.name} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
        )}
        {onPromo && (
          <span className="absolute top-2 left-2 bg-urgent text-urgent-foreground text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded">
            Deal
          </span>
        )}
        {lowStock && (
          <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded">
            Only {p.stockQty} left
          </span>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col gap-2">
        <h3 className="font-display font-semibold text-sm line-clamp-2 leading-tight min-h-[2.5rem]">
          {p.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className={`font-display font-bold text-lg ${onPromo ? "text-urgent" : "text-foreground"}`}>
            {formatXCD(effectivePrice)}
          </span>
          {onPromo && (
            <span className="text-xs text-muted-foreground line-through">{formatXCD(p.priceCents)}</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground -mt-1">{p.unit}</span>

        {inCart ? (
          <div className="flex items-center justify-between mt-auto pt-1">
            <Button size="icon" variant="outline" className="h-9 w-9"
              onClick={() => updateQty(p.productId, inCart.quantity - 1)}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="font-display font-bold text-base">{inCart.quantity}</span>
            <Button size="icon" variant="urgent" className="h-9 w-9"
              disabled={inCart.quantity >= p.stockQty}
              onClick={() => updateQty(p.productId, inCart.quantity + 1)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="urgent" className="mt-auto w-full" onClick={handleAdd}
            disabled={outOfStock}
          >
            {outOfStock ? "Out of Stock" : "Add"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
