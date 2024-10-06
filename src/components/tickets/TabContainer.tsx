import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { ComponentType, ReactNode, useEffect, useState } from "react";
import { addOutline, arrowBack, caretBack, cellular } from "ionicons/icons";
import styles from "./TabContainer.module.css";

interface TabItem {
  label: string;
  icon?: string;
  children: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  tabIndex?: number;
}

export default function TabContainer({ tabs, tabIndex = 0 }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabIndex);

  console.log("tabs", tabs);

  return (
    <IonPage>
      <IonToolbar className={styles.container}>
        <div className={styles.top_row}>
          <IonButtons slot="start">
            <IonButton className="ion-padding" size="large">
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
        </div>
        <div className={styles.header_row}>
          <h3 className={styles.title}>house manager assistance</h3>
          <IonButton fill="clear" size="large" slot="icon-only">
            <IonIcon icon={addOutline} />
          </IonButton>
        </div>
        <div className={styles.container}>
          <IonSegment
            value={String(activeTab)}
            onIonChange={(e) => setActiveTab(Number(e.detail.value))}
            className={styles.segment}
          >
            {tabs.map((tab, index) => (
              <IonSegmentButton
                style={{
                  "--color": activeTab === index && "black",
                }}
                value={String(index)}
                key={tab.label}
              >
                <IonLabel>{tab.label}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>
      </IonToolbar>
      {tabs[activeTab].children}
    </IonPage>
  );
}
