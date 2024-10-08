import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonButton,
  IonItemDivider,
  IonItem,
  IonImg,
  IonAvatar,
  IonBadge,
  IonTitle,
  IonText,
  IonCardHeader,
  IonContent,
  IonPage,
  IonModal,
} from "@ionic/react";
import {
  caretForward,
  caretForwardOutline,
  chatbubbleEllipses,
  chatbubbleEllipsesOutline,
  chevronForward,
} from "ionicons/icons";
import { formatTime } from "../../utils/helpers";

export interface CardProps {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: string;
  customStyle?: React.CSSProperties;
  isArchived?: boolean;
  onSelect?: (id: string) => void;
  onSync?: (event: any) => void;
  user: {
    name: string;
    location: string;
    profile_image: string;
  };
}

export default function PreviewTicketCard({
  id,
  date,
  title,
  description,
  icon,
  user,
  isArchived,
  onSelect,
  onSync,
  customStyle,
}: CardProps) {
  const formattedTimestamp = formatTime(date);
  const descriptionPreview =
    description.split(" ").slice(0, 10).join(" ") + "...";

  return (
    <IonCard>
      <IonGrid>
        <IonCardHeader className="ion-no-padding">
          <IonRow className="ion-align-items-center">
            <IonCol sizeLg="auto" sizeXs="auto" className="ion-no-padding">
              <IonButton className="ion-no-padding" fill="clear">
                <IonIcon
                  icon={chatbubbleEllipsesOutline}
                  size="large"
                  color={isArchived ? "medium" : ""}
                />
              </IonButton>
            </IonCol>
            <IonCol className="ion-padding-start">
              <IonItem className="ion-no-padding ion-no-margin" lines="none">
                <h3>&#35;{id}</h3>
                <IonText color="medium" className="ion-padding-start">
                  {formattedTimestamp}
                </IonText>
              </IonItem>
            </IonCol>
            <IonCol size="auto">
              <IonButton fill="clear">
                <IonIcon color="primary" icon={chevronForward} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardHeader>
        <IonCardContent className="ion-no-margin ion-no-padding">
          <IonRow className="ion-no-padding  ion-align-items-center">
            <IonCol>
              <IonItem className="ion-no-padding" lines="none">
                <h4>{title}</h4>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonCol>
            <IonText className="ion-text-wrap">{description}</IonText>
          </IonCol>
          <IonItem className="ion-justify-content-between ion-align-items-center ion-no-padding">
            <IonCol size="auto">
              <IonItem className="ion-no-padding" lines="none">
                <IonAvatar>
                  <img
                    src={
                      user.profile_image ?? "https://via.placeholder.com/150"
                    }
                    alt="user profile"
                  />
                </IonAvatar>
                <h4 className="ion-text-capitalize ion-padding-start ">
                  {user.name}
                </h4>
              </IonItem>
            </IonCol>
            <IonCol className="ion-padding-start" size="auto">
              <IonBadge>{user.location}</IonBadge>
            </IonCol>
          </IonItem>
        </IonCardContent>
      </IonGrid>
    </IonCard>
  );
}
