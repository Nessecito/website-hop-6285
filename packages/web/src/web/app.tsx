import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import { Home } from "./pages/home";
import { TheHouse, FirstEdition, Journal, PreviewInfo, NotFound } from "./pages/editorial";
import { MethodNote, WearTestCollective } from "./pages/research";
import { Faq } from "./pages/faq";
import { SiteLayout } from "./components/site-layout";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

const pageTitles: Record<string, string> = {
  "/": "House of Pulido — Everyday clothing, considered closely",
  "/the-house": "The House — House of Pulido",
  "/first-edition": "First Edition development hub — House of Pulido",
  "/journal": "Tee Test Journal — House of Pulido",
  "/journal/what-we-will-measure": "What we’ll measure before launch — House of Pulido",
  "/wear-test-collective": "Wear Test Collective — House of Pulido",
  "/faq": "FAQ — House of Pulido",
  "/contact": "Contact Vanessa — House of Pulido",
  "/privacy": "Preview privacy — House of Pulido",
  "/terms": "Preview terms — House of Pulido",
};

function usePageTitle() {
  const [location] = useLocation();
  useEffect(() => {
    const base = location.split("#")[0].split("?")[0];
    document.title = pageTitles[base] ?? "House of Pulido — Everyday clothing, considered closely";
  }, [location]);
}

function App() {
  usePageTitle();
  return (
    <Provider>
      <SiteLayout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/the-house" component={TheHouse} />
          <Route path="/first-edition" component={FirstEdition} />
          <Route path="/faq" component={Faq} />
          <Route path="/journal/what-we-will-measure" component={MethodNote} />
          <Route path="/journal" component={Journal} />
          <Route path="/wear-test-collective" component={WearTestCollective} />
          <Route path="/contact">{() => <PreviewInfo kind="contact" />}</Route>
          <Route path="/privacy">{() => <PreviewInfo kind="privacy" />}</Route>
          <Route path="/terms">{() => <PreviewInfo kind="terms" />}</Route>
          <Route component={NotFound} />
        </Switch>
      </SiteLayout>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
