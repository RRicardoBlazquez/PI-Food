import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.container}>
      <NavLink className={style.nav} to="/home">
        HOME
      </NavLink>
      <NavLink className={style.nav} to="/form">
        FORM
      </NavLink>
    </div>
  );
};

export default NavBar;
