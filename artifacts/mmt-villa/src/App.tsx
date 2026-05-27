import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import FlightConfirmation from "./pages/FlightConfirmation";
import VillaExplore from "./pages/VillaExplore";
import VillaCompare from "./pages/VillaCompare";
import Checkout from "./pages/Checkout";
import HostLanding from "./pages/HostLanding";
import HostOnboard from "./pages/HostOnboard";
import HostDashboard from "./pages/HostDashboard";
import { AppProvider } from "./context/AppContext";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={FlightConfirmation} />
      <Route path="/explore" component={VillaExplore} />
      <Route path="/compare" component={VillaCompare} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/host" component={HostLanding} />
      <Route path="/host/onboard" component={HostOnboard} />
      <Route path="/host/dashboard" component={HostDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AppProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
