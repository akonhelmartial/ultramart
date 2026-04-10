import { motion } from "framer-motion";
import { Zap, PackageCheck, Leaf } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Fast Access Locations",
    description: "Embedded in your commute. No detours, no wasted time. Walk in, shop, done.",
  },
  {
    icon: PackageCheck,
    title: "Reliable Stock",
    description: "The staples you count on—always on the shelf. No surprises, no substitutions.",
  },
  {
    icon: Leaf,
    title: "Local Produce Support",
    description: "We stock what St. Lucian farmers grow. Fresher taste, shorter journey, stronger community.",
  },
];

const WhyUltramart = () => {
  return (
    <section className="py-16 md:py-20 section-green">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-3xl md:text-5xl">
            Why Ultramart
          </h2>
          <p className="mt-3 opacity-80 font-body max-w-md mx-auto">
            Built for working St. Lucians who need consistency, not promises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary-foreground/15 flex items-center justify-center mx-auto mb-5">
                <reason.icon className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{reason.title}</h3>
              <p className="font-body opacity-80 leading-relaxed text-sm max-w-xs mx-auto">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUltramart;
