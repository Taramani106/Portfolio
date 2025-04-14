import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";

// Components
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import ThreeScene from "./components/ThreeScene";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={Projects} />
      <Route path="/certifications" component={Certifications} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Global background animation */}
      {location !== "/" && <ThreeScene className="fixed inset-0 -z-10" />}
      
      <CustomCursor />
      <Navbar />
      <main className="flex-grow">
        <Router />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
