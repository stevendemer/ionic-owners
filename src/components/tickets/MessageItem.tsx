import {
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { Message } from "../../types";

export default function MessageItem({
  message,
  isUser,
}: {
  message: Message;
  isUser?: boolean;
}) {
  console.log("message is ", message);

  return <div className="p2 ion-text-wrap">{message.message}</div>;
}
