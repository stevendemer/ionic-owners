import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  square,
  triangle,
  logoDropbox,
  heartOutline,
  personOutline,
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/main.css";
import Dashboard from "./pages/Dashboard";
import StatusBar from "./components/StatusBar";
import MainLayout from "./components/MainLayout";
import TicketConversation from "./components/tickets/TicketConversation";
import Conversation from "./pages/Conversation";

setupIonicReact();

const App: React.FC<RouteComponentProps> = () => (
  <IonApp>
    <IonReactRouter>
      <Route exact path="/tickets/open" component={Dashboard} />
      <Route exact path="/tickets/archived" component={Dashboard} />
      <Route exact path="/ticket/:id" component={TicketConversation} />
      <Redirect exact from="/" to="/tickets/open" />
    </IonReactRouter>
  </IonApp>
);

export default App;
