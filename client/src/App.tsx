import { Switch, Route, useRoute } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import Agents from "@/pages/Agents";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Chat from "@/pages/Chat";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/agents" component={Agents} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/chat/:agentId" component={Chat} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoginPage] = useRoute("/login");
  const [isSignupPage] = useRoute("/signup");
  const [isChatPage] = useRoute("/chat/:agentId");
  const hideHeaderFooter = isLoginPage || isSignupPage || isChatPage;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          {!hideHeaderFooter && <Header />}
          <main className="flex-1">
            <Router />
          </main>
          {!hideHeaderFooter && <Footer />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
