import "./Landing.module.css";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div>
      <NavLink to={"/home"}>
        <h1>esta es la Landing page</h1>
      </NavLink>
    </div>
  );
}

export default Landing;
