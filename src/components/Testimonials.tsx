import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "I shop here 3 times a week. They always have what I need, and I'm in and out in 15 minutes.",
    name: "Marie J.",
    detail: "Castries Resident",
  },
  {
    quote: "The deli lunch saves me every day. Real food, fair price, and I don't have to leave the area.",
    name: "Kevin S.",
    detail: "Works near Bridge Street",
  },
  {
    quote: "Their produce is the freshest in town. You can tell it didn't sit on a container ship for weeks.",
    name: "Andrea P.",
    detail: "Shops weekly at Gros Islet",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground">
            What Our Shoppers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-secondary rounded-xl p-6 border-l-4 border-primary"
            >
              <p className="font-body text-foreground leading-relaxed mb-4 italic">
                "{t.quote}"
              </p>
              <footer>
                <span className="font-display font-bold text-foreground text-sm">{t.name}</span>
                <span className="text-muted-foreground font-body text-sm ml-2">— {t.detail}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
