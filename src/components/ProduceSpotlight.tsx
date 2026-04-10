import { motion } from "framer-motion";
import produceImage from "@/assets/fresh-produce.jpg";

const seasonalItems = [
  { name: "Christophene", season: "Year-round", note: "Versatile, local staple" },
  { name: "Julie Mangoes", season: "June–August", note: "Sweet & fragrant" },
  { name: "Breadfruit", season: "Year-round", note: "Roast, fry, or boil" },
  { name: "Hot Peppers", season: "Year-round", note: "Kick for any dish" },
];

const ProduceSpotlight = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-yellow mb-3">🌿 Farm to Shelf</span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mt-3 mb-4">
              Fresh Produce Spotlight
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              We work directly with St. Lucian farmers to bring you seasonal
              produce that's fresher, tastier, and supports local agriculture.
            </p>

            <div className="space-y-4">
              {seasonalItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between bg-secondary rounded-lg px-4 py-3"
                >
                  <div>
                    <span className="font-display font-bold text-foreground">{item.name}</span>
                    <span className="text-muted-foreground font-body text-sm ml-2">— {item.note}</span>
                  </div>
                  <span className="text-xs font-display font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {item.season}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={produceImage}
                alt="Fresh local produce at Ultramart"
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl p-4 shadow-lg">
              <p className="font-display font-black text-2xl">100%</p>
              <p className="font-body text-xs opacity-80">Locally Sourced</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProduceSpotlight;
