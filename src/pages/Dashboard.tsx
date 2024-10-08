import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { Children, useCallback, useEffect, useState } from "react";
import { Ticket } from "../types";
import { addOutline, arrowBackOutline, ticket } from "ionicons/icons";
import TicketCard from "../components/tickets/Card";
import { useLocation } from "react-router";
import useStorage from "../hooks/useStorage";

export default function Dashboard() {
  const [selectedFragment, setSelectedSegment] = useState<"open" | "archived">(
    "open"
  );
  const location = useLocation();
  const router = useIonRouter();
  const { createTicket, tickets: savedTickets } = useStorage();

  useIonViewDidEnter(() => {
    console.log("ionViewDidEnter event fired");
  });

  useEffect(() => {
    // get the suffix of the current path
    const pathname = location.pathname.split("/").pop();
    if (pathname === "archived") {
      setSelectedSegment("archived");
    } else {
      setSelectedSegment("open");
    }
  }, [location.pathname]);

  const handleSegmentChange = (value: "open" | "archived") => {
    setSelectedSegment(value);
    router.push(`/tickets/${value}`, "forward", "push");
  };

  const openTickets = savedTickets.filter((ticket: Ticket) => !ticket.archived);
  const archivedTickets = savedTickets.filter(
    (ticket: Ticket) => ticket.archived
  );

  return (
    <IonPage>
      <IonToolbar>
        <IonItem lines="none">
          <IonButton
            style={{
              "--color": router.canGoBack()
                ? "var(--ion-color-text)"
                : "var(--ion-color-disabled)",
            }}
            onClick={() => router.goBack()}
            fill="clear"
            className="ion-no-padding"
            size="large"
          >
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
        </IonItem>
        <IonItem lines="none" className="ion-text-start">
          <IonLabel>
            <h2>House manager assistance</h2>
          </IonLabel>
          <IonIcon color="primary" icon={addOutline} />
        </IonItem>
      </IonToolbar>
      <IonContent>
        <IonSegment
          value={selectedFragment}
          onIonChange={(e) =>
            handleSegmentChange(e.detail.value as "open" | "archived")
          }
        >
          <IonSegmentButton value="open">
            <IonLabel
              style={{
                "font-weight": selectedFragment === "open" ? "800" : "normal",
                "--color":
                  selectedFragment === "open"
                    ? "var(--ion-text-color) !important"
                    : "var(--ion-color-disabled-dark)",
              }}
            >
              Open Tickets
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="archived">
            <IonLabel
              style={{
                "font-weight":
                  selectedFragment === "archived" ? "800" : "normal",
                "--color":
                  selectedFragment === "archived"
                    ? "var(--ion-text-color) !important"
                    : "var(--ion-color-disabled-dark)",
              }}
            >
              Archived
            </IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonList lines="full">
          {selectedFragment === "open" &&
            openTickets.map((ticket: Ticket) => (
              <div key={ticket.id}>
                <TicketCard
                  id={ticket.id}
                  date={ticket.date}
                  title={ticket.title}
                  user={ticket.user}
                  description={ticket.description}
                  isArchived={ticket.archived}
                />
              </div>
            ))}
          {selectedFragment === "archived" &&
            archivedTickets.map((ticket: Ticket) => (
              <div key={ticket.id}>
                <TicketCard
                  id={ticket.id}
                  date={ticket.date}
                  title={ticket.title}
                  user={ticket.user}
                  description={ticket.description}
                  isArchived={ticket.archived}
                />
              </div>
            ))}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            // generateTickets();
            setTimeout(() => ev.target.complete(), 400);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
}
