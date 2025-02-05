import {
  IonModal,
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonText,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonCol,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonSelect,
  IonSelectOption,
  IonAccordion,
  IonAccordionGroup,
  IonSegment,
  IonSegmentView,
  IonSegmentButton,
  IonSegmentContent,
} from "@ionic/react";
import { useState } from "react";
import { close, remove, film, information, list } from "ionicons/icons";

export default function WatchModal({
  isOpen,
  setIsOpen,
  movieData,
  setSelectedMovie,
}: any) {
  const [selectedSegment, setSelectedSegment] = useState("player");
  const [selectedEpisode, setSelectedEpisode] = useState(
    movieData.episodes[0].server_data[0].link_m3u8
  );
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{movieData.movie.name}</IonTitle>

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
      <IonContent>
        <IonSegmentView>
          <IonSegmentContent id="player">
            <video
              width="100%"
              height="100%"
              src={selectedEpisode}
              controls
              style={{ border: "none" }}
            ></video>
          </IonSegmentContent>
          <IonSegmentContent id="info">
            <div
              style={{
                backgroundImage: `url(${movieData.movie.poster_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                padding: "20px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              ></div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <IonText color="primary">
                  <h1>Tên Gốc: {movieData.movie.origin_name}</h1>
                  <IonText color="secondary">
                    <h2>Năm Phát Hành: {movieData.movie.year}</h2>
                    <h3>Thời lượng: {movieData.movie.time}</h3>
                    <h3>Trạng thái: {movieData.movie.episode_current}</h3>
                    <h3>Chất lượng: {movieData.movie.quality}</h3>
                    <h3>Ngôn ngữ: {movieData.movie.lang}</h3>
                  </IonText>
                </IonText>
                <IonText color="medium">
                  <p>{movieData.movie.content}</p>
                  <p>Diễn viên: {movieData.movie.actor.join(", ")}</p>
                  <p>Đạo diễn: {movieData.movie.director.join(", ")}</p>
                  <p>
                    Thể loại:{" "}
                    {movieData.movie.category
                      .map((cat: any) => cat.name)
                      .join(", ")}
                  </p>
                  <p>
                    Quốc gia:{" "}
                    {movieData.movie.country
                      .map((country: any) => country.name)
                      .join(", ")}
                  </p>
                </IonText>
              </div>
            </div>{" "}
          </IonSegmentContent>

          <IonSegmentContent id="episodes">
            <IonAccordionGroup>
              {movieData.episodes.map((server: any) => (
                <IonAccordion>
                  <IonItem slot="header" color="light">
                    <IonLabel>{server.server_name}</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    <IonSelect
                      label="Chọn Tập Phim"
                      value={selectedEpisode}
                      onIonChange={(e) => setSelectedEpisode(e.detail.value)}
                    >
                      {server.server_data.map((episode: any) => (
                        <IonSelectOption value={episode.link_m3u8}>
                          {episode.filename}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </div>
                </IonAccordion>
              ))}
            </IonAccordionGroup>
          </IonSegmentContent>
        </IonSegmentView>
      </IonContent>
      <IonFooter>
        {" "}
        <IonSegment
          value={selectedSegment}
          onIonChange={(e: any) => setSelectedSegment(e.detail.value)}
        >
          <IonSegmentButton value="player" contentId="player">
            <IonIcon icon={film} />
          </IonSegmentButton>
          <IonSegmentButton value="info" contentId="info">
            <IonIcon icon={information} />
          </IonSegmentButton>
          <IonSegmentButton value="episodes" contentId="episodes">
            <IonIcon icon={list} />
          </IonSegmentButton>
        </IonSegment>
      </IonFooter>
    </IonModal>
  );
}
