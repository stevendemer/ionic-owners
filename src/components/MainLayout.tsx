import { IonCard, IonCol, IonGrid, IonRow } from "@ionic/react";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>{children}</IonCol>
      </IonRow>
    </IonGrid>
  );
}
