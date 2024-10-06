import { useCallback, useEffect, useState } from "react";
import { Message } from "../types";
import ticketService from "../services/ticket-service";
import TicketConversation from "../components/tickets/TicketConversation";
import useStorage from "../hooks/useStorage";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

// testing CRUD operations with tickets
export default function Conversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const {
    tickets,
    createTicket,
    archiveTicket,
    removeTicket,
    emptyTickets,
    updateTicket,
  } = useStorage();

  const [ticket, setTicket] = useState<any>("");

  console.log("data", tickets);

  //   const getTickets = useCallback(async () => {
  //     const ts = await ticketService.getTickets();
  //     ts.map((t) => console.log(t));
  //     // console.log(ts);
  //     setMessages(ts?.at(0)?.conversation || []);
  //   }, []);

  //   useEffect(() => {
  //     getTickets();
  //   }, []);

  //   console.log(messages);

  //   if (messages.length > 0) {
  //     return <TicketConversation messages={messages} />;
  //   }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Update tickets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonInput
            placeholder="Enter ticket title"
            value={ticket}
            onIonChange={(ev) =>
              //   setTicket({
              //     title: ev.detail.value,
              //     archived: false,
              //     status: "open",
              //     conversation: [],
              //     date: new Date().toISOString(),
              //     user: {
              //       name: "user",
              //       profile_image: "assets/icon-only.png",
              //       location: "New York",
              //     },
              //     description: "Description for ticket",
              //     id: Math.random().toString(),
              //   })
              setTicket(ev.detail.value)
            }
          />
          <IonButton
            slot="end"
            onClick={async () => {
              await createTicket({
                title: ticket,
                archived: false,
                status: "open",
                conversation: [],
                date: new Date().toISOString(),
                user: {
                  name: "user",
                  profile_image: "assets/icon-only.png",
                  location: "New York",
                },
                description: "Description for ticket",
                id: Math.random().toString(),
              });
              setTicket("");
            }}
            fill="clear"
          >
            Add
          </IonButton>
        </IonItem>
        <IonList>
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <h2>{ticket.title}</h2>
              <p>{ticket.description}</p>
              <IonButton
                onClick={() => archiveTicket(ticket.id)}
                color="danger"
              >
                Archive ticket{" "}
              </IonButton>
            </div>
          ))}
        </IonList>
        <IonButton onClick={() => emptyTickets()} color="danger">
          Clear all
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
