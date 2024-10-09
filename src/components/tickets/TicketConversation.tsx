import {
  IonAlert,
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
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { Message, Ticket } from "../../types";
import { RouteComponentProps, useParams } from "react-router";
import useStorage from "../../hooks/useStorage";
import { useEffect, useRef, useState } from "react";
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

export default function TicketConversation({
  ticket,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { getTicket, tickets, addMessage, archiveTicket, syncTickets } =
    useStorage();
  const [newMessage, setNewMessage] = useState("");
  const [showText, setShowText] = useState(false);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const [present, dismiss] = useIonLoading();
  const [presentToast] = useIonToast();

  const formatedTime = formatTime(ticket.date);

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
      spinner: "crescent",
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

      presentToast({
        message: "Reply sent",
        duration: 900,
        position: "top",
      });
      dismiss();
    }
  };

  return (
    <>
      <IonToolbar>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="8">
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
                  <IonText color="medium" className="ion-padding-start">
                    {formatedTime}
                  </IonText>
                  {!ticket.archived && (
                    <IonButton
                      // onClick={() => {
                      //   if (!ticket.archived) {
                      //     archiveTicket(ticket.id);
                      //     presentToast({
                      //       message: "Ticket archived",
                      //       duration: 900,
                      //       position: "top",
                      //     });

                      //     onClose();
                      //   }
                      // }}
                      fill="clear"
                      slot="end"
                      size="large"
                      id="archive-ticket"
                    >
                      <IonIcon
                        icon={ticket.archived ? syncOutline : checkmarkOutline}
                        size="large"
                        color="primary"
                      />
                    </IonButton>
                  )}
                </IonItem>
                <IonItem className="ion-no-padding" lines="none">
                  <IonButton
                    id="archive-button"
                    onClick={() => {
                      syncTickets();
                      presentToast({
                        message: "Syncing tickets",
                        duration: 900,
                        position: "top",
                      });
                      window.location.reload();
                    }}
                    size="large"
                    slot="start"
                    fill="clear"
                  >
                    <IonIcon
                      icon={ticket?.archived ? archiveOutline : repeatOutline}
                    ></IonIcon>
                  </IonButton>
                  <h3 className="ion-text-capitalize">
                    {ticket?.archived ? "archive" : "open ticket"}
                  </h3>
                </IonItem>
                <IonItem lines="none">
                  <h4 className="">{ticket?.title}</h4>
                </IonItem>
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
        <IonList className="ion-no-padding" color="light" lines="none">
          {messages.map((message) => (
            <IonGrid key={message.message_id}>
              <IonRow>
                {message.from !== "John" ? (
                  <IonCol className="ion-no-padding" sizeLg="5" sizeXs="7">
                    <IonItem color="secondary">
                      <MessageItem isUser={true} message={message} />
                    </IonItem>
                  </IonCol>
                ) : (
                  <IonCol sizeLg="6" sizeXs="7" offsetXs="1" offsetLg="2">
                    <IonItem>
                      <MessageItem isUser={false} message={message} />
                    </IonItem>
                  </IonCol>
                )}
              </IonRow>
            </IonGrid>
          ))}
        </IonList>
        <IonAlert
          onDidDismiss={({ detail }) => {
            console.log("dimissed with role", detail.role);
          }}
          header="Archive ticket"
          trigger="archive-ticket"
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Alert cancelled");
              },
            },
            {
              text: "Confirm",
              role: "confirm",
              handler: () => {
                archiveTicket(ticket.id);
                presentToast({
                  message: "Ticket archived",
                  duration: 900,
                  position: "top",
                });
                onClose();
              },
            },
          ]}
        ></IonAlert>
      </IonContent>
      {ticket?.archived ? (
        <IonItem lines="none">
          <p className="ion-padding ion-text-center">
            The Ticket was <b>archived</b> by the house manager
          </p>
        </IonItem>
      ) : (
        <IonItem lines="none">
          <IonTextarea
            spellCheck
            className="message-input"
            maxlength={100}
            minlength={2}
            autoFocus
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
