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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Message, Ticket } from "../../types";
import { RouteComponentProps, useParams } from "react-router";
import useStorage from "../../hooks/useStorage";
import { useCallback, useEffect, useId, useState } from "react";
import MessageItem from "./MessageItem";
import {
  archiveOutline,
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
import { v4 as uuidv4 } from "uuid";

export default function TicketConversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ticket, setTicket] = useState<Ticket>();
  const { getTicket, tickets, addMessage } = useStorage();
  const { id } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      const ticket = tickets.find((t) => t.id === id);
      setMessages(ticket?.conversation || []);
      setTicket(ticket);
    }

    fetchMessages();
  }, [tickets]);

  // event handler
  const handleNewMessage = async () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      message_id: uuidv4(),
      from: "John", // username of current user
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    if (ticket) {
      // trigger render
      await addMessage(id, message);
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  return (
    <IonPage>
      <IonToolbar color="light">
        <div className="header-container">
          <div className="header-title">
            <IonButton
              size="large"
              slot="start"
              fill="clear"
              color={ticket?.archived ? "medium" : "primary"}
            >
              <IonIcon icon={chatbubbleEllipsesOutline}></IonIcon>
            </IonButton>
            <h2 className="message-id">&#35;{id}</h2>
            <IonText color="medium" className="ion-padding-horizontal">
              {ticket?.date && formatTime(ticket?.date)}
            </IonText>
          </div>
          <IonButton
            color={ticket?.archived ? "medium" : "primary"}
            size="large"
            slot="end"
            fill="clear"
          >
            <IonIcon icon={ticket?.archived ? repeatOutline : checkmark} />
          </IonButton>
        </div>
        <div className="sub-header">
          <IonButton size="large" slot="start" fill="clear">
            <IonIcon
              icon={ticket?.archived ? archiveOutline : repeatOutline}
            ></IonIcon>
          </IonButton>
          <h3 className="ion-text-capitalize">
            {ticket?.archived ? "archive" : "open ticket"}
          </h3>
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
          <IonItem color="light" className="ion-no-padding" lines="none">
            <IonAvatar>
              <img alt="user profile" src={ticket?.user.profile_image} />
            </IonAvatar>
            <h4 className="ion-margin">{ticket?.user.name}</h4>
          </IonItem>
        </div>
      </IonToolbar>
      <IonContent color="light">
        <IonList className="messages" lines="none">
          {ticket?.conversation.map((message) => (
            <IonItem
              className={`chat-message ion-margin ${
                message.from === "John" ? "ion-text-start" : "ion-text-end"
              }`}
              key={message.message_id}
              color={message.from === "John" ? "" : "light"}
            >
              <MessageItem
                isUser={message.from === "John"}
                key={message.message_id}
                message={message}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      {ticket?.archived ? (
        <IonItem color="light" lines="none">
          <p className="ion-padding ion-text-center">
            The Ticket was <b>archived</b> by the house manager
          </p>
        </IonItem>
      ) : (
        <IonItem color="light" lines="none">
          <IonInput
            autocorrect="on"
            debounce={400}
            inputMode="text"
            maxlength={100}
            minlength={2}
            spellCheck
            autoFocus
            onIonChange={(e) => setNewMessage(e.detail.value!)}
            value={newMessage}
            fill="outline"
            placeholder="Write a reply"
          />
          <IonButton
            onClick={handleNewMessage}
            size="large"
            fill="clear"
            slot="end"
          >
            <IonIcon icon={sendOutline} />
          </IonButton>
        </IonItem>
      )}
    </IonPage>
  );
}
