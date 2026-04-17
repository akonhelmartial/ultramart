import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/contexts/ShopContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems, setCartOpen, store } = useShop();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop Groceries", to: "/shop", primary: true as const },
    { label: "Weekly Specials", href: "/#specials" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleCartClick = () => {
    if (store) setCartOpen(true);
    else navigate("/shop");
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/ultramart-logo.jpg" alt="Ultramart Inc" className="h-12 w-auto rounded" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            link.to ? (
              <Link
                key={link.label} to={link.to}
                className={`font-display font-semibold text-sm tracking-wide transition-colors ${
                  link.primary ? "text-accent hover:text-accent/80" : "text-primary-foreground/90 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label} href={link.href}
                className="text-primary-foreground/90 hover:text-accent font-display font-semibold text-sm tracking-wide transition-colors"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => navigate("/shop")}>
            <MapPin className="w-4 h-4" /> Find Store
          </Button>
          <button
            onClick={handleCartClick}
            aria-label="Cart"
            className="relative bg-urgent text-urgent-foreground rounded-md px-3 py-2 hover:bg-urgent/90 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-pulse-subtle">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={handleCartClick}
            aria-label="Cart"
            className="relative bg-urgent text-urgent-foreground rounded-md px-2.5 py-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-primary-foreground p-2" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 pb-4">
          {navLinks.map((link) => (
            link.to ? (
              <Link
                key={link.label} to={link.to} onClick={() => setIsOpen(false)}
                className={`block px-6 py-3 font-display font-semibold text-sm hover:bg-primary-foreground/5 ${
                  link.primary ? "text-accent" : "text-primary-foreground/90 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label} href={link.href} onClick={() => setIsOpen(false)}
                className="block px-6 py-3 text-primary-foreground/90 hover:text-accent hover:bg-primary-foreground/5 font-display font-semibold text-sm"
              >
                {link.label}
              </a>
            )
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
