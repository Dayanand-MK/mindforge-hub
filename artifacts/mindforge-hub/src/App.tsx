import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Domains from "@/pages/Domains";
import Portfolio from "@/pages/Portfolio";
import HowItWorks from "@/pages/HowItWorks";
import Contact from "@/pages/Contact";
import Track from "@/pages/Track";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AppContent() {
  const [location] = useLocation();
  const isAdminPath = location === "/admin";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPath && <Navbar />}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/domains" component={Domains} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/contact" component={Contact} />
          <Route path="/track/:id" component={Track} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppContent />
        </WouterRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
