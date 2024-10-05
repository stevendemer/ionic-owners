import {
  IonContent,
  IonHeader,
  IonTab,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ReactNode } from "react";

export default function TabContainer({ children }: { children: ReactNode }) {
  return (
    <IonTabs>
      <IonTab tab="tickets">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Open tickets</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="ticket-content">Tickets go here</div>
        </IonContent>
      </IonTab>
      <IonTab tab="archive">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Archive</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ticket-archive">
          Archived ticket goes here
        </IonContent>
      </IonTab>
    </IonTabs>
  );
}
