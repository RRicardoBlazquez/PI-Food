import style from "./Landing.module.css";
import { NavLink } from "react-router-dom";
import imagen from "../../image/gorroChef2.png";

function Landing() {
  return (
    <div className={style.container}>
      <NavLink className={style.button} to={"/home"}>
        <picture className={style.containerImag}>
          <img className={style.img} src={imagen} alt="ingresar" />
        </picture>
      </NavLink>
    </div>
  );
}

export default Landing;
