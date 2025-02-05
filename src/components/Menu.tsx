import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonToggle,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
} from "@ionic/react";
import { list, albums } from "ionicons/icons";
import { useState, useEffect } from "react";
import { topics, fetchCategories } from "../lib/phimapi";

export default function Menu({ setSelected, setIsCategory }: any) {
  const [selectedTopic, setSelectedTopic] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [categories, setCategories] = useState<any>([
    { id: 0, name: "Tất Cả", slug: "all" },
  ]);

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories([...categories, ...data]);
    });
  }, []);

  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonTitle></IonTitle>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonSelect
              interface="popover"
              label="Danh Mục"
              value={selectedTopic}
              onIonChange={(e) => {
                setSelectedTopic(e.detail.value);
                setSelected(e.detail.value);
                setSelectedCategory("all");
                setIsCategory(false);
              }}
            >
              {topics.map((c: any) => (
                <IonSelectOption key={c.slug} value={c.slug}>
                  {c.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect
              interface="popover"
              label="Thể Loại"
              value={selectedCategory}
              onIonChange={(e) => {
                setSelected(e.detail.value);
                setSelectedCategory(e.detail.value);
                setSelectedTopic("latest");
                setIsCategory(true);
              }}
            >
              {categories.map((c: any, i: number) => (
                <IonSelectOption key={i} value={c.slug}>
                  {c.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
