import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonGrid,
} from "@ionic/react";
import { useState } from "react";
import { close, remove } from "ionicons/icons";

export default function WatchModal({
  isOpen,
  setIsOpen,
  movie,
  setSelectedMovie,
}: any) {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{movie.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <IonIcon icon={remove} />
            </IonButton>
            <IonButton
              onClick={() => {
                setSelectedMovie(null);
                setIsOpen(false);
              }}
            >
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </IonModal>
  );
}
