import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

export default function CardsContainer() {
  const recipes = useSelector((state) => state.recipes);
  return (
    <div className={style.container}>
      {recipes.map((receta) => {
        return (
          <Card
            id={receta.id}
            title={receta.title}
            image={receta.image}
            diets={receta.diets}
          />
        );
      })}
    </div>
  );
}
