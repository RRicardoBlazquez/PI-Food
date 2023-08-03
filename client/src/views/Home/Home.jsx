import "./Home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
  return (
    <div>
      <h1>esta es la Home page</h1>
      <CardsContainer />
    </div>
  );
}

export default Home;
