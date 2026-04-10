import { motion } from "framer-motion";

const specials = [
  { name: "Fresh Bananas", originalPrice: "$3.50", salePrice: "$1.99", unit: "per bunch", badge: "Hot Deal" },
  { name: "Local Tomatoes", originalPrice: "$5.00", salePrice: "$3.49", unit: "per lb", badge: "Fresh Pick" },
  { name: "Rice (5lb bag)", originalPrice: "$8.99", salePrice: "$6.99", unit: "each", badge: "Staple Saver" },
  { name: "Chicken Wings", originalPrice: "$12.00", salePrice: "$8.99", unit: "per lb", badge: "Weekend Deal" },
  { name: "Cooking Oil 1L", originalPrice: "$7.50", salePrice: "$5.49", unit: "each", badge: "Pantry Must" },
  { name: "Sugar (2lb)", originalPrice: "$4.99", salePrice: "$3.29", unit: "each", badge: "Save More" },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const WeeklySpecials = () => {
  return (
    <section id="specials" className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="badge-yellow mb-3">🔥 Limited Time</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mt-3">
            This Week's Specials
          </h2>
          <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto">
            Deals that respect your budget. Valid until Sunday.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specials.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
              className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-border text-center group"
            >
              <span className="price-tag text-xs mb-3">{item.badge}</span>
              <h3 className="font-display font-bold text-sm md:text-base text-foreground mt-3 mb-2">
                {item.name}
              </h3>
              <p className="text-muted-foreground line-through text-xs font-body">
                {item.originalPrice}
              </p>
              <p className="font-display font-black text-2xl text-urgent">
                {item.salePrice}
              </p>
              <p className="text-muted-foreground text-xs font-body mt-1">{item.unit}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="font-display font-bold text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
            See All Deals →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WeeklySpecials;
