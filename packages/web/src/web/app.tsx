import { Route, Switch } from "wouter";
import { Home } from "./pages/home";
import { TheHouse, FirstEdition, Journal, PreviewInfo, NotFound } from "./pages/editorial";
import { MethodNote, WearTestCollective } from "./pages/research";
import { SiteLayout } from "./components/site-layout";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <SiteLayout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/the-house" component={TheHouse} />
          <Route path="/first-edition" component={FirstEdition} />
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
