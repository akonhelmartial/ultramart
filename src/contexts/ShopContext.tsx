import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react";

export type SelectedStore = {
  id: string;
  slug: string;
  name: string;
  address: string;
  pickup_lead_minutes: number;
};

export type CartItem = {
  productId: string;
  name: string;
  unit: string;
  imageUrl: string | null;
  unitPriceCents: number;
  quantity: number;
};

type ShopContextValue = {
  store: SelectedStore | null;
  setStore: (s: SelectedStore | null) => void;
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalCents: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const STORE_KEY = "ultramart.store";
const CART_KEY = "ultramart.cart";

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStoreState] = useState<SelectedStore | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORE_KEY);
      if (s) setStoreState(JSON.parse(s));
      const c = localStorage.getItem(CART_KEY);
      if (c) setItems(JSON.parse(c));
    } catch { /* ignore */ }
  }, []);

  const setStore = useCallback((s: SelectedStore | null) => {
    setStoreState(s);
    if (s) localStorage.setItem(STORE_KEY, JSON.stringify(s));
    else localStorage.removeItem(STORE_KEY);
    // Clear cart when switching stores (inventory is store-locked)
    setItems([]);
    localStorage.removeItem(CART_KEY);
  }, []);

  const persist = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
  };

  const addItem: ShopContextValue["addItem"] = useCallback((item, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(p => p.productId === item.productId);
      const next = existing
        ? prev.map(p => p.productId === item.productId ? { ...p, quantity: p.quantity + qty } : p)
        : [...prev, { ...item, quantity: qty }];
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => {
        const next = prev.filter(p => p.productId !== productId);
        localStorage.setItem(CART_KEY, JSON.stringify(next));
        return next;
      });
      return;
    }
    setItems(prev => {
      const next = prev.map(p => p.productId === productId ? { ...p, quantity: qty } : p);
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string) => updateQty(productId, 0), [updateQty]);
  const clearCart = useCallback(() => persist([]), []);

  const totalItems = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const subtotalCents = useMemo(() => items.reduce((s, i) => s + i.unitPriceCents * i.quantity, 0), [items]);

  return (
    <ShopContext.Provider value={{
      store, setStore, items, addItem, updateQty, removeItem, clearCart,
      totalItems, subtotalCents, cartOpen, setCartOpen,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
};
