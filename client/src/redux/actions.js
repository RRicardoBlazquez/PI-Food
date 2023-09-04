import axios from "axios";
import { URL_BASE } from "../constantes/const";

export const GET_RECIPES = "GET_RECIPES";
export const GET_NAME_RECIPES = "GET_NAME_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const ORDER = "ORDER";
export const ORDER_RECIPES = "ORDER_RECIPES";

export const getRecipes = () => {
  return async function (dispatch) {
    const apiData = await axios(`${URL_BASE}recipes/`);
    let recipes = apiData.data;
    recipes = recipes.map((receta) => {
      if (receta.created === true) {
        return { ...receta, diets: [...receta.diets?.map((d) => d.name)] };
      }
      return { ...receta };
    });

    dispatch({ type: GET_RECIPES, payload: recipes });
  };
};

export const getNameRecipes = (nameRecipe) => {
  return async function (dispatch) {
    const apiData = await axios(`${URL_BASE}recipes/?name=${nameRecipe}`);
    const recipes = apiData.data;
    console.log(recipes);
    dispatch({ type: GET_NAME_RECIPES, payload: recipes });
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
    const diets = apiData.data;
    dispatch({ type: GET_DIETS, payload: diets });
  };
};

export const orderRecipes = (orden) => {
  return {
    type: ORDER,
    payload: orden,
  };
};
export const filterDiets = (dieta) => {
  return {
    type: FILTER_DIETS,
    payload: dieta,
  };
};

export const filterRecipes = (filter) => {
  return {
    type: FILTER_RECIPES,
    payload: filter,
  };
};

export const filterCreated = (filter) => {
  return {
    type: FILTER_CREATED,
    payload: filter,
  };
};
