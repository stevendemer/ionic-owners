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
  IonModal,
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
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { Ticket } from "../types";
import { addOutline, arrowBackOutline, ticket } from "ionicons/icons";
import { useLocation } from "react-router";
import useStorage from "../hooks/useStorage";
import PreviewTicketCard from "../components/tickets/PreviewTicketCard";
import TicketConversation from "../components/tickets/TicketConversation";

export default function Dashboard() {
  const [selectedFragment, setSelectedSegment] = useState<"open" | "archived">(
    "open"
  );
  const location = useLocation();
  const router = useIonRouter();
  const { createTicket, tickets: savedTickets } = useStorage();
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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
    router.push(`/tickets/${value}`);
  };

  const openTickets = savedTickets.filter((ticket: Ticket) => !ticket.archived);
  const archivedTickets = savedTickets.filter(
    (ticket: Ticket) => ticket.archived
  );

  const handleCardClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <IonPage>
      <IonToolbar>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeSm="12" sizeLg="7" offsetLg="1" sizeMd="7">
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
                <IonButton size="large" color="primary" fill="clear">
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
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
              <div onClick={() => handleCardClick(ticket)} key={ticket.id}>
                <PreviewTicketCard
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
              <div onClick={() => handleCardClick(ticket)} key={ticket.id}>
                <PreviewTicketCard
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
        <IonModal
          ref={modalRef}
          isOpen={isModalOpen}
          onDidDismiss={() => setIsModalOpen(false)}
          breakpoints={[0, 0.5, 1]}
          initialBreakpoint={1}
          handleBehavior="cycle"
          className="ticket-modal"
        >
          {selectedTicket && <TicketConversation ticket={selectedTicket} />}
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
