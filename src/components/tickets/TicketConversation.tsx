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
  chatbubbleEllipsesOutline,
  chevronDownOutline,
  paperPlaneOutline,
  sync,
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
  }, [id, tickets]);

  // event handler
  const handleNewMessage = async () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      message_id: uuidv4(),
      from: "John", // username of current user
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    if (message) {
      // trigger render
      setMessages((prev) => [...prev, message]);
      await addMessage(id, message);
      setNewMessage("");
    }
  };

  return (
    <IonPage>
      <IonToolbar>
        <IonGrid>
          <IonRow className="ion-justify-content-start ion-align-items-center">
            <IonCol sizeLg="4" size="8">
              <div className="header-title">
                <IonButton
                  size="large"
                  slot="start"
                  fill="clear"
                  color={ticket?.archived ? "medium" : "primary"}
                >
                  <IonIcon icon={chatbubbleEllipsesOutline}></IonIcon>
                </IonButton>
                <IonItem lines="none" className="ion-align-self-center">
                  <h2>&#35;{id}</h2>
                  <IonText color="medium" className="ion-padding-start">
                    {ticket?.date && formatTime(ticket?.date)}
                  </IonText>
                </IonItem>
              </div>
              <div className="sub-header">
                <IonButton size="large" slot="start" fill="clear">
                  <IonIcon
                    icon={ticket?.archived ? archiveOutline : sync}
                  ></IonIcon>
                </IonButton>
                <h3 className="ion-text-capitalize">
                  {ticket?.archived ? "archive" : "open ticket"}
                </h3>
              </div>
              <h4 className="ion-padding-start">{ticket?.title}</h4>
              <IonText className="ion-padding-start">
                {ticket?.description}
              </IonText>
              <IonButton size="large" slot="end" fill="clear">
                <IonIcon icon={chevronDownOutline} />
              </IonButton>
              <div className="user-info">
                <h4>Conversation with</h4>
                <IonItem className="ion-no-padding" lines="none">
                  <IonAvatar>
                    <img alt="user profile" src={ticket?.user.profile_image} />
                  </IonAvatar>
                  <h4 className="ion-margin">{ticket?.user.name}</h4>
                </IonItem>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
      <IonContent fullscreen>
        <IonList lines="none">
          {messages.map((message) => (
            <IonGrid key={message.message_id}>
              <IonRow className="ion-justify-content-center">
                {message.from !== "John" ? (
                  <IonCol sizeLg="3" sizeXs="8">
                    <IonItem color="light">
                      <MessageItem isUser={true} message={message} />
                    </IonItem>
                  </IonCol>
                ) : (
                  <IonCol sizeLg="6" sizeXs="6" offsetXs="2" offsetLg="1">
                    <IonItem>
                      <MessageItem isUser={false} message={message} />
                    </IonItem>
                  </IonCol>
                )}
              </IonRow>
            </IonGrid>
          ))}
        </IonList>
      </IonContent>
      {ticket?.archived ? (
        <IonItem lines="none">
          <p className="ion-padding ion-text-center">
            The Ticket was <b>archived</b> by the house manager
          </p>
        </IonItem>
      ) : (
        <IonItem lines="none">
          <IonInput
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
            <IonIcon icon={paperPlaneOutline} />
          </IonButton>
        </IonItem>
      )}
    </IonPage>
  );
}
