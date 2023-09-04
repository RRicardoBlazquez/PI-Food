import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

export default function Card(props) {
  return (
    <div className={style.container}>
      <NavLink className={style.containerImage} to={`/detail/${props.id}`}>
        <img className={style.imagen} src={props.image} alt="not found" />
      </NavLink>

      <div className={style.containerTitle}>
        <NavLink className={style.nav} to={`/detail/${props.id}`}>
          <h2 className={style.title}>{props.title} </h2>
        </NavLink>
      </div>
      <div className={style.containerDiets}>
        <h4 className={style.diets}>Diets</h4>
        <p className={style.text}>
          {new Intl.ListFormat("en").format(props.diets)}
        </p>
      </div>
    </div>
  );
}
