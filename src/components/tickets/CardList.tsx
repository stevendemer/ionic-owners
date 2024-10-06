import React, { Component } from "react";
import { IonContent, IonList } from "@ionic/react";
import Card from "./Card";
import { CardProps } from "./Card";

const CardList = ({ cards }: { cards: CardProps[] }) => {
  return (
    <IonContent>
      <IonList>
        {cards.map((card) => (
          <Card
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
