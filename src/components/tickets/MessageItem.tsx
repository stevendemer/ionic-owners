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
  role,
}: {
  message: Message;
  role: string;
}) {
  return (
    <IonItem className=" message" lines="none" color={"primary"}>
      <IonLabel>{message.message}</IonLabel>
    </IonItem>
  );
}
