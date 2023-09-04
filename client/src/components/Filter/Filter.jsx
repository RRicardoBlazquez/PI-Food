import { useEffect, useState } from "react";
import { filterRecipes, orderRecipes } from "../../redux/actions";
import axios from "axios";
import style from "./Filter.module.css";
import { useDispatch } from "react-redux";
import { URL_BASE } from "../../constantes/const";

export default function Filter({ aux, setAux }) {
  const dispatch = useDispatch();
  const [diets, setDiets] = useState([]);
  const [filter, setFilter] = useState({
    orderType: "default",
    order: "A",
    filterDiets: "all",
    filterCreated: "all",
  });

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

  const handleChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "filterDiets":
        setFilter({ ...filter, filterDiets: value });
        dispatch(filterRecipes({ ...filter, filterDiets: value }));
        break;
      case "filterCreated":
        setFilter({ ...filter, filterCreated: value });
        dispatch(filterRecipes({ ...filter, filterCreated: value }));
        break;
      case "orderType":
        setFilter({ ...filter, orderType: value });
        dispatch(orderRecipes({ ...filter, orderType: value }));
        setAux(!aux);
        break;
      case "order":
        setFilter({ ...filter, order: value });
        dispatch(orderRecipes({ ...filter, order: value }));
        setAux(!aux);
        break;
      default:
        break;
    }
  };
  return (
    <div className={style.containerFilter}>
      <label className={style.text}> Order type</label>
      <button
        name="orderType"
        value={"Alphabet"}
        onClick={handleChange}
        className={
          filter.orderType.includes("Alphabet") ? style.buttonOn : style.button
        }
      >
        Alphabet
      </button>
      <button
        name="orderType"
        onClick={handleChange}
        value={"Healthscore"}
        className={
          filter.orderType.includes("Healthscore")
            ? style.buttonOn
            : style.button
        }
      >
        Healthscore
      </button>
      <label className={style.text}>
        Order :
        <select className={style.option} name="order" onChange={handleChange}>
          <option value="A">
            {filter.orderType.includes("Healthscore") ? "1...100" : "Aa...Zz"}
          </option>
          <option value="D">
            {filter.orderType.includes("Healthscore") ? "100...1" : "Zz...Aa"}
          </option>
        </select>
      </label>
      <label className={style.text}>
        Recipes :
        <select
          className={style.option}
          name="filterCreated"
          onChange={handleChange}
        >
          <option value="all">All </option>
          <option value={"base"}>Created </option>
          <option value={"api"}>Api </option>
        </select>
      </label>

      <label className={style.text}>
        Filtrar por dieta :
        <select
          className={style.option}
          name="filterDiets"
          onChange={handleChange}
        >
          <option key={0} value="all">
            All
          </option>
          {diets?.map((dieta) => (
            <option key={dieta.id} value={dieta.name}>
              {dieta.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
