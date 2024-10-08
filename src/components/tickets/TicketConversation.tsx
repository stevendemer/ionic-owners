import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
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
  IonToggle,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import { Message, Ticket } from "../../types";
import { RouteComponentProps, useParams } from "react-router";
import useStorage from "../../hooks/useStorage";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import {
  archiveOutline,
  chatbubbleEllipsesOutline,
  checkmarkOutline,
  chevronDownOutline,
  chevronUpOutline,
  paperPlaneOutline,
  repeatOutline,
  sync,
  syncOutline,
} from "ionicons/icons";
import { formatTime } from "../../utils/helpers";
import { v4 as uuidv4 } from "uuid";

export default function TicketConversation({ ticket }: { ticket: Ticket }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { getTicket, tickets, addMessage } = useStorage();
  const [newMessage, setNewMessage] = useState("");
  const [showText, setShowText] = useState(false);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    async function fetchMessages() {
      const foundTicket = tickets.find((t) => t.id === ticket.id);
      setMessages(foundTicket?.conversation || []);
    }

    fetchMessages();
  }, [ticket, tickets]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollToBottom(300);
    }
  }, [messages]);

  // event handler
  const handleNewMessage = async () => {
    if (newMessage.trim() === "") return;

    present({
      message: "Sending message...",
    });

    const message: Message = {
      message_id: uuidv4(),
      from: "John", // username of current user
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    if (message) {
      // trigger render
      setMessages((prev) => [...prev, message]);
      await addMessage(ticket.id, message);
      setNewMessage("");

      dismiss();
    }
  };

  return (
    <>
      <IonToolbar>
        <IonGrid>
          <IonRow className="ion-justify-content-start ion-align-items-center">
            <IonCol sizeLg="4" size="8">
              <IonList>
                <IonItem className="ion-no-padding" lines="none">
                  <IonButton
                    size="large"
                    slot="start"
                    fill="clear"
                    color={ticket?.archived ? "medium" : "primary"}
                  >
                    <IonIcon icon={chatbubbleEllipsesOutline}></IonIcon>
                  </IonButton>
                  <h3>&#35;{ticket.id}</h3>
                  <IonText
                    color="medium"
                    className="timestamp ion-padding-start"
                  >
                    {ticket?.date && formatTime(ticket?.date)}
                  </IonText>
                  <IonButton fill="clear" slot="end" size="large">
                    <IonIcon
                      icon={ticket.archived ? syncOutline : checkmarkOutline}
                      size="large"
                      color="primary"
                    />
                  </IonButton>
                </IonItem>
                <IonItem className="ion-no-padding" lines="none">
                  <IonButton size="large" slot="start" fill="clear">
                    <IonIcon
                      icon={ticket?.archived ? archiveOutline : repeatOutline}
                    ></IonIcon>
                  </IonButton>
                  <h3 className="ion-text-capitalize">
                    {ticket?.archived ? "archive" : "open ticket"}
                  </h3>
                </IonItem>
                <h4 className="ion-padding-horizontal">{ticket?.title}</h4>
                <IonItem lines="none">
                  <IonText>{ticket?.description}</IonText>
                  <IonButton
                    fill="clear"
                    onClick={() => setShowText(!showText)}
                  >
                    <IonIcon icon={chevronDownOutline} />
                  </IonButton>
                </IonItem>
                <div className="ion-padding">
                  <h4>Conversation</h4>
                  <IonItem className="ion-no-padding" lines="none">
                    <IonAvatar>
                      <img
                        alt="user profile"
                        src={ticket?.user.profile_image}
                      />
                    </IonAvatar>
                    <h4 className="ion-margin">{ticket?.user.name}</h4>
                  </IonItem>
                </div>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
      <IonContent ref={contentRef} fullscreen>
        <IonList lines="none">
          {messages.map((message) => (
            <IonGrid key={message.message_id}>
              <IonRow>
                {message.from !== "John" ? (
                  <IonCol sizeLg="3" sizeXs="7">
                    <IonItem color="primary">
                      <MessageItem isUser={true} message={message} />
                    </IonItem>
                  </IonCol>
                ) : (
                  <IonCol sizeLg="6" sizeXs="7" offsetXs="1" offsetLg="2">
                    <IonItem color="light">
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
            maxlength={100}
            minlength={2}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNewMessage();
              }
            }}
            onIonChange={(e) => {
              setNewMessage(e.detail.value!);
            }}
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
    </>
  );
}
