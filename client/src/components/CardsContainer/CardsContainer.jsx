import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar";

export default function CardsContainer() {
  const recipes = useSelector((state) => state.recipes);
  const nPerpage = 9;
  const [index, setIndex] = useState({});
  const [aux, setAux] = useState(false);
  //let dieta;

  let listRecipes = recipes
    .map((receta) => {
      return (
        <li key={receta.id}>
          <Card
            id={receta.id}
            title={receta.title}
            image={receta.image}
            diets={receta.diets}
            healthScore={receta.healthScore}
          />
        </li>
      );
    })
    .slice(index.firt, index.last);

  return (
    <div className={style.container}>
      <SearchBar />
      <div className={style.paginationContainer}>
        <Pagination nPerPage={nPerpage} index={index} setIndex={setIndex} />
      </div>
      <div className={style.containerPage}>
        <Filter aux={aux} setAux={setAux} />
        <div className={style.containerCards}>{listRecipes}</div>
      </div>
    </div>
  );
}
