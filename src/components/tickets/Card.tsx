import React from "react";
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
} from "@ionic/react";
import {
  caretForward,
  caretForwardOutline,
  chatbubbleEllipses,
  chatbubbleEllipsesOutline,
  chevronForward,
  locationOutline,
} from "ionicons/icons";
import { format } from "date-fns";
import styles from "./Card.module.css";
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

export default function TicketCard({
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
    <IonItem
      slot="start"
      button
      detail
      detailIcon={chevronForward}
      className={styles.card}
      routerLink={`/ticket/${id}`}
    >
      <IonLabel className={styles.card_label}>
        <div className={styles.left_row}>
          <IonButton onClick={onSync} fill="clear">
            <IonIcon
              slot="start"
              icon={chatbubbleEllipsesOutline}
              size="large"
              className={isArchived ? styles.archived : ""}
            />
          </IonButton>
          <h3 className={styles.ticket_id}>{id}</h3>
          <p className={styles.ticket_date}>{formattedTimestamp}</p>
        </div>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.description}>{description}</p>
        <div className={styles.bottom_row}>
          <div className={styles.user_info}>
            <IonAvatar>
              <img
                src={user.profile_image ?? "https://via.placeholder.com/150"}
                alt="user profile"
              />
            </IonAvatar>
            <h4 className="ion-text-capitalize ion-padding-start">
              {user.name}
            </h4>
          </div>
          <IonBadge>{user.location}</IonBadge>
        </div>
      </IonLabel>
    </IonItem>
  );
}
