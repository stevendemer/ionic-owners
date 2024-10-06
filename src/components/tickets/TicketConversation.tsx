import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTab,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Message, Ticket } from "../../types";
import { RouteComponentProps, useParams } from "react-router";
import useStorage from "../../hooks/useStorage";
import { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import {
  chatboxEllipsesOutline,
  chatbubbleEllipses,
  chatbubbleEllipsesOutline,
  checkmark,
  chevronDownOutline,
  chevronExpandOutline,
  repeatOutline,
  sendOutline,
} from "ionicons/icons";
import { formatTime } from "../../utils/helpers";

export default function TicketConversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ticket, setTicket] = useState<Ticket>();
  const { getTicket, tickets } = useStorage();
  const { id } = useParams<{ id: string }>();

  console.log("fetched ticket with id ", ticket);

  useEffect(() => {
    async function getTicket() {
      const ticket = tickets.find((t) => t.id === id);
      setTicket(ticket);
    }

    getTicket();
  }, [id, tickets]);

  return (
    <IonPage>
      <IonToolbar>
        <div className="header-container">
          <div className="header-title">
            <IonButton size="large" slot="start" fill="clear">
              <IonIcon icon={chatbubbleEllipsesOutline}></IonIcon>
            </IonButton>
            <h2 className="message-id">&#35;{id}</h2>
            <div className="message-timestamp">
              {ticket?.date && formatTime(ticket?.date)}
            </div>
          </div>
          <IonButton size="large" slot="end" fill="clear">
            <IonIcon icon={checkmark} />
          </IonButton>
        </div>
        <div className="sub-header">
          <IonButton size="large" slot="start" fill="clear">
            <IonIcon icon={repeatOutline}></IonIcon>
          </IonButton>
          <h3 className="ion-text-capitalize">Open ticket</h3>
        </div>
        <h4 className="ion-padding-start">{ticket?.title}</h4>
        <div className="description-container">
          <div className="ticket-description">{ticket?.description}</div>
          <IonButton size="large" slot="end" fill="clear">
            <IonIcon icon={chevronDownOutline} />
          </IonButton>
        </div>
        <div className="user-info">
          <h4>Conversation with</h4>
          <IonItem className="ion-no-padding" lines="none">
            <IonAvatar>
              <img alt="user profile" src={ticket?.user.profile_image} />
            </IonAvatar>
            <h4 className="ion-margin">{ticket?.user.name}</h4>
          </IonItem>
        </div>
      </IonToolbar>
      <IonContent fullscreen>
        <IonList lines="none">
          {ticket?.conversation.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </IonList>
      </IonContent>
      <IonItem className="message-input">
        <IonInput class="message" fill="outline" placeholder="Write a reply" />
        <IonButton size="large" fill="clear" slot="end">
          <IonIcon icon={sendOutline} />
        </IonButton>
      </IonItem>
    </IonPage>
  );
}
