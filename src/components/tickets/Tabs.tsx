import {
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonSegmentButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  homeOutline,
  logoDropbox,
  personOutline,
  settings,
  settingsOutline,
  square,
  triangle,
} from "ionicons/icons";
import { Redirect, Route } from "react-router";

export default function Tabs() {
  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/tabs" to="/tabs/open-tickets" />
          <Route exact path="/tabs/open-tickets">
            <div>open tickets</div>
          </Route>
          <Route exact path="/tabs/archive">
            <div>closed tickets</div>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="open-tickets" href="/tabs/open-tickets">
            <IonIcon icon={logoDropbox} />
          </IonTabButton>
          <IonTabButton tab="archive" href="/tabs/archive">
            <IonIcon icon={homeOutline} />
          </IonTabButton>
          <IonTabButton tab="random" href="/tabs/random">
            <IonIcon icon={personOutline} />
          </IonTabButton>
          <IonTabButton tab="notthis" href="/tabs/not">
            <IonIcon icon={settingsOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
}
