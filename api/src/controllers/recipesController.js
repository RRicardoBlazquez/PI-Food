const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");
const { API_KEY_1, API_KEY_2, API_KEY_3, API_KEY } = process.env;
const axios = require("axios");
const data = require("../data.json");
const URL_BASE = "https://api.spoonacular.com/recipes/";
const CANT_RECETAS = 100;
const detail_information = true;
const { setDiets } = require("./dietControllers");

const cleanRecipe = async (arr) =>
  await arr.map((receta) => {
    return {
      id: receta.id,
      title: receta.title,
      image: receta.image,
      summary: receta.summary,
      healthScore: receta.healthScore,
      steps: receta.analyzedInstructions[0]?.steps,
      diets: receta.diets,
      created: false,
    };
  });

const agregarDietas = async (arr) => {
  await arr.map(async (r) => await setDiets(r.diets));
};

const createRecipe = async ({
  title,
  image,
  summary,
  healthScore,
  steps,
  diets,
}) => {
  //const newDiet = await Diet.create({ diet });

  const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    steps,
    created: true,
  });
  let dietsId = await setDiets(diets);

  const listDietsId = dietsId.map((dieta) => dieta.id);
  newRecipe.addDiets(listDietsId);

  return newRecipe;
};

const getAllRecipe = async () => {
  let listRecipe = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  const listRecipeApiRaw = (
    await axios.get(
      `${URL_BASE}complexSearch?&number=${CANT_RECETAS}&addRecipeInformation=${detail_information}&apiKey=${API_KEY_2}`
    )
  ).data.results;
  //const listRecipeApiRaw = [...data];
  const listRecipeApi = await cleanRecipe(listRecipeApiRaw);

  await agregarDietas(listRecipeApi);

  return [...listRecipe, ...listRecipeApi];
};

const getNameRecipes = async (name) => {
  let listRecipe = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Diet,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  let listRecipeApiRaw = (
    await axios.get(
      `${URL_BASE}complexSearch?&apiKey=${API_KEY_1}&addRecipeInformation=${detail_information}&number=${CANT_RECETAS}`
    )
  ).data.results;
  //const listRecipeApiRaw = [...data];

  listRecipeApiRaw = listRecipeApiRaw.filter((recipe) =>
    recipe.title.toLowerCase().includes(name.toLowerCase())
  );
  let listRecipeApi = await cleanRecipe(listRecipeApiRaw);

  return [...listRecipeApi, ...listRecipe];
};

const getRecipeId = async (id, source) => {
  const newRecipe =
    source === "bdd"
      ? await Recipe.findByPk(id, {
          include: {
            model: Diet,
            attributes: ["name"],
            through: { attributes: [] },
          },
        })
      : (
          await axios.get(
            `${URL_BASE}${id}/information?includeNutrition=false&apiKey=${API_KEY}&addRecipeInformation=true`
          )
        ).data;
  const { title, image, summary, healthScore, diets, created } = newRecipe;
  const steps =
    created !== true
      ? newRecipe.analyzedInstructions[0]?.steps
      : newRecipe.steps;
  return {
    id,
    title,
    image,
    summary,
    healthScore,
    steps,
    diets,
    created,
  };
};

module.exports = {
  createRecipe,
  getAllRecipe,
  getRecipeId,
  getNameRecipes,
};
