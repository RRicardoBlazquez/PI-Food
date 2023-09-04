import axios from "axios";
import style from "./Diets.module.css";
import { useEffect, useState } from "react";
import { URL_BASE } from "../../constantes/const";

export default function Diets({ handlerSelect, dependence }) {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL_BASE}diet/`)
      .then(({ data }) => {
        setDiets(data);
      })
      .catch(() =>
        setDiets(["vegan", "gluten free", "lacto ovo vegetarian", "dairy free"])
      );
    return setDiets([]);
  }, []);

  let listDiets = diets.map((dieta) => {
    return (
      <label className={style.text} key={dieta.id}>
        <input
          type="checkbox"
          name={dieta.name}
          value={dieta.name}
          checked={dependence.includes(dieta.name)}
          onChange={handlerSelect}
        />
        <span>{dieta.name}</span>
      </label>
    );
  });
  return <div className={style.containerDiets}>{listDiets}</div>;
}
