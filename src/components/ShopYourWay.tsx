import { motion } from "framer-motion";
import { Store, Clock, UtensilsCrossed } from "lucide-react";
import storeImage from "@/assets/store-shelves.jpg";
import deliImage from "@/assets/deli-ready.jpg";
import produceImage from "@/assets/fresh-produce.jpg";

const options = [
  {
    icon: Store,
    title: "Shop In-Store",
    description: "Walk in, fill your basket, and go. Our stores are built for speed—find what you need in minutes.",
    image: storeImage,
  },
  {
    icon: Clock,
    title: "Order & Pick Up",
    description: "Call ahead, we'll bag it. Grab your order without leaving your car. Coming soon to all locations.",
    image: produceImage,
    badge: "Coming Soon",
  },
  {
    icon: UtensilsCrossed,
    title: "Quick Lunch Deli",
    description: "Hot meals, local flavors, ready when you are. Rice & peas, grilled chicken, fried plantains—everyday.",
    image: deliImage,
  },
];

const ShopYourWay = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground">
            Shop Your Way
          </h2>
          <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto">
            Three ways to get what you need—on your schedule.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {options.map((option, i) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={option.image}
                  alt={option.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <option.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground">
                    {option.title}
                  </h3>
                  {option.badge && (
                    <span className="badge-yellow text-xs">{option.badge}</span>
                  )}
                </div>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {option.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopYourWay;
