import React, { Component } from "react";
import { IonContent, IonList } from "@ionic/react";
import PreviewTicketCard from "./PreviewTicketCard";
import { CardProps } from "./PreviewTicketCard";

const CardList = ({ cards }: { cards: CardProps[] }) => {
  return (
    <IonContent>
      <IonList>
        {cards.map((card) => (
          <PreviewTicketCard
            key={card.id}
            id={card.id}
            date={card.date}
            title={card.title}
            user={card.user}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </IonList>
    </IonContent>
  );
};

export default CardList;
