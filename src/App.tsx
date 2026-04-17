import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShopProvider } from "@/contexts/ShopContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import StoreSelect from "./pages/shop/StoreSelect.tsx";
import Browse from "./pages/shop/Browse.tsx";
import Checkout from "./pages/shop/Checkout.tsx";
import Confirmation from "./pages/shop/Confirmation.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ShopProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<StoreSelect />} />
            <Route path="/shop/browse" element={<Browse />} />
            <Route path="/shop/checkout" element={<Checkout />} />
            <Route path="/shop/confirmation/:orderNumber" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ShopProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
