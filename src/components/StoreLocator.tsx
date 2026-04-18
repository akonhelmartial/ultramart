import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const stores = [
  {
    name: "Ultramart — Castries Main",
    address: "Bridge Street, Castries",
    hours: "Mon–Sat 7AM–8PM, Sun 8AM–2PM",
    phone: "(758) 452-XXXX",
    isOpen: true,
  },
  {
    name: "Ultramart — Castries Micoud Street",
    address: "Micoud Street, Castries",
    hours: "Mon–Sat 7AM–8PM, Sun 8AM–2PM",
    phone: "(758) 453-XXXX",
    isOpen: true,
  },
  {
    name: "Ultramart — Castries, Marchand",
    address: "Marchand Road, Castries",
    hours: "Mon–Sat 7AM–8PM, Sun 8AM–2PM",
    phone: "(758) 454-XXXX",
    isOpen: true,
  },
  {
    name: "Ultramart — Corinth",
    address: "Corinth Highway, Gros Islet",
    hours: "Mon–Sat 7AM–8PM, Sun 8AM–2PM",
    phone: "(758) 450-XXXX",
    isOpen: true,
  },
];

const StoreLocator = () => {
  return (
    <section id="contact" className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground">
            Find Your Store
          </h2>
          <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto">
            We're right where you need us—embedded in your daily route.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stores.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-foreground">{store.name}</h3>
                <span
                  className={`text-xs font-display font-bold px-3 py-1 rounded-full ${
                    store.isOpen
                      ? "bg-primary/10 text-primary"
                      : "bg-urgent/10 text-urgent"
                  }`}
                >
                  {store.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>

              <div className="space-y-3 text-sm font-body text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{store.hours}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{store.phone}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="mt-5 w-full">
                <MapPin className="w-4 h-4" /> Get Directions Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreLocator;
