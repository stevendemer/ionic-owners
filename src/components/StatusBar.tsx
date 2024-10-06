import React, { useCallback, useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { BatteryInfo, Device } from "@capacitor/device";
import {
  batteryFullOutline,
  batteryHalfOutline,
  batteryDeadOutline,
  batteryChargingOutline,
  cellular,
  wifiOutline,
  cellularOutline,
  wifi,
} from "ionicons/icons";
import { StatusBar as CapacitorStatusBar, Style } from "@capacitor/status-bar";

export default function StatusBar() {
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo | null>({
    batteryLevel: 0.8,
    isCharging: false,
  });

  const [time, setTime] = useState({ hours: 0, minutes: 0 });

  const getBatteryInfo = useCallback(async () => {
    const battery = await Device.getBatteryInfo();
    setBatteryInfo(battery);
  }, []);

  const getTime = useCallback(async () => {
    const now = new Date();
    setTime({
      hours: now.getHours(),
      minutes: now.getMinutes(),
    });
  }, []);

  useEffect(() => {
    getBatteryInfo();
    getTime();

    const intervalId = setInterval(getBatteryInfo, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const getBatteryIcon = (level?: number) => {
    if (level) {
      if (level > 0.7) return batteryFullOutline;
      if (level > 0.3) return batteryHalfOutline;
    }
    return batteryDeadOutline;
  };

  const getBatteryColor = (level?: number) => {
    if (level) {
      if (level > 0.7) return "success";
      if (level > 0.3) return "warning";
    }
    return "danger";
  };

  return (
    <IonToolbar className="toolbar">
      <IonButtons slot="start">
        {time.hours}:{time.minutes}
      </IonButtons>
      <IonButtons slot="end">
        <IonButton>
          <IonIcon size="default" icon={cellular} />
        </IonButton>
        <IonButton>
          <IonIcon size="default" icon={wifi} />
        </IonButton>
        <IonButton>
          <IonIcon
            size="default"
            icon={
              batteryInfo?.isCharging
                ? batteryChargingOutline
                : getBatteryIcon(batteryInfo?.batteryLevel)
            }
            // color={getBatteryColor(batteryInfo?.batteryLevel)}
          />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
}
