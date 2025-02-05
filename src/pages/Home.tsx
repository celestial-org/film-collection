import {
  IonContent,
  IonHeader,
  IonPage,
  IonButtons,
  IonToolbar,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSearchbar,
  IonMenuButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { film } from "ionicons/icons";
import { PhimApi } from "../lib/phimapi";
import FilmCard from "../components/FilmCard";
import Menu from "../components/Menu";
import WatchModal from "../components/WatchModal";
import "./Home.css";

const Home: React.FC = () => {
  const api = new PhimApi();
  const [movies, setMovies]: any = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [selected, setSelected]: [string, any] = useState("latest");
  const [isCategory, setIsCategory] = useState(false);
  const [selectedMovie, setSelectedMovie]: any = useState(null);
  const [isOpenMovie, setIsOpenMovie] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const loadMore = () => {
    setPageCount(pageCount + 1);
  };

  const fetchSelectedMovie = async (slug: string) => {
    const movie = await api.get(slug);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    api.getList(selected, isCategory, pageCount).then((data) => {
      setMovies([
        ...movies,
        ...data.map((m: any) => (movies.includes(m) ? null : m)),
      ]);
    });
  }, [selected, pageCount]);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const newTimeout = setTimeout(() => {
      if (searchKeyword) {
        api.search(searchKeyword).then((data) => {
          setMovies(data);
        });
      } else {
        api.getList(selected, isCategory, pageCount).then((data) => {
          setMovies(data);
        });
      }
    }, 1500);
    setSearchTimeout(newTimeout);
  }, [searchKeyword]);

  useEffect(() => {
    if (selectedMovie) {
      setIsOpenMovie(true);
    }
  }, [selectedMovie]);

  return (
    <>
      <Menu
        setSelected={(v: string) => setSelected(v)}
        setIsCategory={(v: boolean) => setIsCategory(v)}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonSearchbar
              showCancelButton="focus"
              placeholder="Tìm Kiếm..."
              value={searchKeyword}
              onIonInput={(e: any) => setSearchKeyword(e.detail.value)}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          {selectedMovie && (
            <>
              {isOpenMovie ? (
                <WatchModal
                  isOpen={isOpenMovie}
                  setIsOpen={setIsOpenMovie}
                  movieData={selectedMovie}
                  setSelectedMovie={setSelectedMovie}
                />
              ) : (
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                  <IonFabButton onClick={() => setIsOpenMovie(true)}>
                    <IonIcon icon={film}></IonIcon>
                  </IonFabButton>
                </IonFab>
              )}
            </>
          )}

          <IonList>
            {movies.map((m: any, i: number) => (
              <FilmCard
                key={i}
                movie={m}
                fetchSelectedMovie={fetchSelectedMovie}
              />
            ))}
            <IonInfiniteScroll
              onIonInfinite={(event) => {
                loadMore();
                setTimeout(() => event.target.complete(), 500);
              }}
            >
              <IonInfiniteScrollContent loadingSpinner="bubbles"></IonInfiniteScrollContent>{" "}
            </IonInfiniteScroll>
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
