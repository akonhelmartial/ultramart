import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Tag } from "lucide-react";
import heroImage from "@/assets/hero-produce.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with parallax-like effect */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fresh Caribbean produce at Ultramart"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="badge-yellow mb-4">🛒 Serving Castries Daily</span>
          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-background mt-4 mb-6">
            Everything You Need.{" "}
            <span className="text-accent">Right Where You Are.</span>
          </h1>
          <p className="text-background/80 text-lg md:text-xl font-body leading-relaxed mb-8 max-w-lg">
            From fresh produce to daily essentials—Ultramart keeps your routine
            moving without interruption.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero">
              <Tag className="w-5 h-5" />
              View Weekly Specials
            </Button>
            <Button variant="hero-outline">
              <MapPin className="w-5 h-5" />
              Find Your Nearest Store
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
