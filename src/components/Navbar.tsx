import { useState } from "react";
import { Menu, X, ShoppingCart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Weekly Specials", href: "#specials" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#" className="flex items-center gap-2">
          <img
            src="/images/ultramart-logo.jpg"
            alt="Ultramart Inc"
            className="h-12 w-auto rounded"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-primary-foreground/90 hover:text-accent font-display font-semibold text-sm tracking-wide transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <MapPin className="w-4 h-4" />
            Find Store
          </Button>
          <Button variant="urgent" size="sm" className="group">
            <ShoppingCart className="w-4 h-4 group-hover:animate-pulse-subtle" />
            Weekly Deals
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary-foreground p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-6 py-3 text-primary-foreground/90 hover:text-accent hover:bg-primary-foreground/5 font-display font-semibold text-sm"
            >
              {link.label}
            </a>
          ))}
          <div className="px-6 pt-3 flex flex-col gap-2">
            <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground w-full">
              <MapPin className="w-4 h-4" /> Find Store
            </Button>
            <Button variant="urgent" size="sm" className="w-full">
              <ShoppingCart className="w-4 h-4" /> Weekly Deals
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
