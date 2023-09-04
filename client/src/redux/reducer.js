import {
  GET_RECIPES,
  GET_NAME_RECIPES,
  GET_DIETS,
  FILTER_DIETS,
  FILTER_RECIPES,
  FILTER_CREATED,
  ORDER,
} from "./actions";

const initialState = {
  recipesAll: [],
  recipes: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload, recipesAll: action.payload };

    case GET_NAME_RECIPES:
      return { ...state, recipes: action.payload };

    case GET_DIETS:
      return { ...state, diets: action.payload };

    case FILTER_RECIPES:
      let filtroRecetas = [...state.recipesAll];

      if (action.payload.filterDiets !== "all") {
        filtroRecetas = state.recipesAll?.filter((receta) =>
          receta.diets.includes(action.payload.filterDiets)
        );
      }
      if (action.payload.filterCreated !== "all") {
        filtroRecetas =
          action.payload.filterCreated !== "api"
            ? filtroRecetas?.filter((receta) => receta.created === true)
            : filtroRecetas?.filter((receta) => receta.created === false);
      }

      return { ...state, recipes: [...filtroRecetas] };

    case FILTER_DIETS:
      let filterDiets = state.recipesAll;

      if (action.payload !== "all") {
        filterDiets = state.recipes?.filter((receta) =>
          receta.diets.includes(action.payload)
        );
      }

      return { ...state, recipes: filterDiets };

    case FILTER_CREATED:
      let listRecipes = [];
      action.payload.filterCreated !== "all"
        ? (listRecipes = state.recipes?.filter((recetas) =>
            action.payload.filterCreated === "true"
              ? recetas.created === true
              : recetas.created === false
          ))
        : action.payload.filterDiets === "all"
        ? (listRecipes = [...state.recipesAll])
        : (listRecipes = [...state.recipes]);

      return { ...state, recipes: [...listRecipes] };

    case ORDER:
      let listOrder = [...state.recipes];

      if (action.payload.orderType !== "default") {
        listOrder =
          action.payload.orderType === "Alphabet"
            ? listOrder.sort((a, b) =>
                action.payload.order === "A"
                  ? a.title.localeCompare(b.title)
                  : b.title.localeCompare(a.title)
              )
            : listOrder.sort((a, b) =>
                action.payload.order === "A"
                  ? a.healthScore - b.healthScore
                  : b.healthScore - a.healthScore
              );
      }

      return {
        ...state,
        recipes: [...listOrder],
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
