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
import { arrowBackOutline } from "ionicons/icons";
import TicketCard from "../components/tickets/Card";
import { useLocation } from "react-router";
import useStorage from "../hooks/useStorage";

export default function Dashboard() {
  const [tickets, setTickets] = useState<any>([]);
  const [selectedFragment, setSelectedSegment] = useState<"open" | "archived">(
    "open"
  );
  const location = useLocation();
  const router = useIonRouter();
  const { createTicket, tickets: storedTickets } = useStorage();

  // generate random tickets (for testing)
  const generateTickets = useCallback(async () => {
    const newTickets = [] as Ticket[];

    for (let i = 0; i < 100; i++) {
      const newTicket = {
        id: i.toString(),
        date: new Date().toISOString(),
        title: `Ticket ${i}`,
        archived: i % 2 === 0,
        status: i % 2 === 0 ? "archived" : "open",
        conversation: [
          {
            from: "user",
            message: `Message from user ${i}`,
            message_id: i.toString(),
            timestamp: new Date().toISOString(),
          },
        ],
        description: `Description for ticket ${i}`,
        user: {
          name: "John Doe",
          location: "New York",
          profile_image: "assets/icon-only.png",
        },
      };

      await createTicket(newTicket);

      newTickets.push(newTicket);
    }

    // setTickets(storedTickets);
    console.log("stored tickets are ", storedTickets);
  }, []);

  useEffect(() => {
    // generateTickets();

    // use the tickets in the storage
    setTickets(storedTickets);
  }, [storedTickets]);

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

  const openTickets = storedTickets.filter(
    (ticket: Ticket) => !ticket.archived
  );
  const archivedTickets = storedTickets.filter(
    (ticket: Ticket) => ticket.archived
  );

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton
            style={{
              "--color": router.canGoBack()
                ? "var(--ion-color-text)"
                : "var(--ion-color-disabled)",
            }}
            onClick={() => router.goBack()}
            slot="icon-only"
          >
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
        </IonButtons>
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
            generateTickets();
            setTimeout(() => ev.target.complete(), 1200);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
}
