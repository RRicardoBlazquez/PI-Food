import lupa from "../../image/lupa.png";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../redux/actions";
import { useState } from "react";

export default function SearchBar() {
  const [nameRecipe, setNameRecipe] = useState("");
  const dispatch = useDispatch();
  const handlerChange = (e) => {
    const { value } = e.target;
    setNameRecipe(value);
  };
  const handlerKeyUp = (e) => {
    const { value, keyCode } = e.target;
    if (keyCode === 13) {
      setNameRecipe(value);
      dispatch(getNameRecipes(nameRecipe));
    }
  };
  const handlerButton = () => {
    dispatch(getNameRecipes(nameRecipe));
  };

  return (
    <div className={style.container}>
      <input
        className={style.Search}
        type="text"
        name="search"
        id="search"
        placeholder="Enter the name of the recipe"
        onChange={handlerChange}
        onKeyUp={handlerKeyUp}
      />
      <button className={style.button} onClick={handlerButton}>
        <img className={style.imagen} src={lupa} alt="" />
      </button>
    </div>
  );
}
