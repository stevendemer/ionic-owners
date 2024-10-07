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
  const role = message.from === "user" ? "end" : "start";

  return (
    <IonItem
      className={`ion-padding ion-text-wrap chat-message  ${
        isUser ? "left-message" : "right-message"
      }`}
      lines="none"
      color={isUser ? "light" : ""}
    >
      <div className="p2">{message.message}</div>
    </IonItem>
  );
}
