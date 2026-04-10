import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WeeklySpecials from "@/components/WeeklySpecials";
import ShopYourWay from "@/components/ShopYourWay";
import WhyUltramart from "@/components/WhyUltramart";
import ProduceSpotlight from "@/components/ProduceSpotlight";
import Testimonials from "@/components/Testimonials";
import StoreLocator from "@/components/StoreLocator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WeeklySpecials />
      <ShopYourWay />
      <WhyUltramart />
      <ProduceSpotlight />
      <Testimonials />
      <StoreLocator />
      <Footer />
    </div>
  );
};

export default Index;
