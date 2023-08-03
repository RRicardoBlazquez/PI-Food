import axios from "axios";
const URL_BASE = "http://localhost:3001/";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const GET_DIETS = "GET_DIETS";

export const getRecipes = () => {
  return async function (dispatch) {
    const apiData = await axios(`${URL_BASE}recipes/`);
    const recipes = apiData.data;
    dispatch({ type: GET_RECIPES, payload: recipes });
  };
};

export const getRecipe = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`${URL_BASE}recipes/${id}`);
    const recipe = apiData.data;
    dispatch({ type: GET_RECIPE, payload: recipe });
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`${URL_BASE}diet/`);
    const recipe = apiData.data;
    dispatch({ type: GET_RECIPE, payload: recipe });
  };
};
