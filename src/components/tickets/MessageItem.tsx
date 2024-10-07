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
  IonText,
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
  return (
    <IonText className="ion-text-wrap message-item">{message.message}</IonText>
  );
}
