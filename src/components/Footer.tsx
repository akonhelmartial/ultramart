import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img
              src="/images/ultramart-logo.jpg"
              alt="Ultramart Inc"
              className="h-14 w-auto rounded mb-4"
            />
            <p className="font-body text-sm leading-relaxed opacity-70">
              Your neighborhood supermarket in St. Lucia. Built for speed,
              reliability, and community.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-background mb-4">Quick Links</h4>
            <div className="space-y-2 font-body text-sm">
              <a href="#specials" className="block hover:text-accent transition-colors">Weekly Specials</a>
              <a href="#products" className="block hover:text-accent transition-colors">Products</a>
              <a href="#about" className="block hover:text-accent transition-colors">About Us</a>
              <a href="#contact" className="block hover:text-accent transition-colors">Find a Store</a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-background mb-4">Contact</h4>
            <div className="space-y-3 font-body text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>Bridge Street, Castries, St. Lucia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>(758) 452-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>info@ultramartinc.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-background mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="font-body text-xs opacity-50 mt-6">
              © {new Date().getFullYear()} Ultramart Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
