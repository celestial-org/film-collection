import { IonItem, IonThumbnail, IonLabel } from "@ionic/react";

export default function FilmCard({ movie, fetchSelectedMovie }: any) {
  return (
    <div onClick={() => fetchSelectedMovie(movie.slug)}>
      <IonItem>
        <IonThumbnail slot="start">
          <img
            alt={movie.name}
            src={movie.poster_url}
            onError={(e: any) =>
              (e.target.src = "https://phimimg.com/" + movie.poster_url)
            }
          />
        </IonThumbnail>
        <IonLabel>
          <b>{movie.name}</b>
          <br />
          <i>({movie.origin_name})</i> <code>{movie.year}</code>
        </IonLabel>
      </IonItem>
    </div>
  );
}
