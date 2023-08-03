const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const axios = require("axios");
const URL_BASE = "https://api.spoonacular.com/recipes/";
const CANT_RECETAS = 20;
const detail_information = true;
const { getDiets } = require("./dietControllers");

const cleanRecipe = async (arr) =>
  await arr.map((e) => {
    return {
      id: e.id,
      title: e.title,
      image: e.image,
      summary: e.summary,
      healthScore: e.healthScore,
      steps: e.analyzedInstructions[0].steps,
      diets: e.diets,
      created: false,
    };
  });

const addDiets = async (arr) => {
  await arr.map(async (r) => await getDiets(r.diets));
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
  });
  let dietsId = await getDiets(diets);

  const listDietsId = dietsId.map((dieta) => dieta.id);
  newRecipe.addDiets(listDietsId);

  return newRecipe;
};

const getAllRecipe = async () => {
  const listRecipe = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  const listRecipeApiRaw = (
    await axios.get(
      `${URL_BASE}complexSearch?&apiKey=${API_KEY}&number=${CANT_RECETAS}&addRecipeInformation=${detail_information}`
    )
  ).data.results;
  const listRecipeApi = await cleanRecipe(listRecipeApiRaw);

  await addDiets(listRecipeApi);

  return [...listRecipe, ...listRecipeApi];
};

const getNameRecipes = async (name) => {
  let listRecipe = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  let listRecipeApiRaw = (
    await axios.get(
      `${URL_BASE}complexSearch?&apiKey=${API_KEY}&number=${CANT_RECETAS}`
    )
  ).data.results;
  let listRecipeApi = await cleanRecipe(listRecipeApiRaw);

  listRecipeApi = listRecipeApi.filter((recipe) =>
    recipe.title.toLowerCase().includes(name.toLowerCase())
  );

  return [...listRecipeApi, ...listRecipe];
};

const getRecipeId = async (id, source) => {
  const newRecipe =
    source === "bdd"
      ? await Recipe.findByPk(id)
      : (
          await axios.get(
            `${URL_BASE}${id}/information?includeNutrition=false&apiKey=${API_KEY}&addRecipeInformation=true`
          )
        ).data;

  return newRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipe,
  getRecipeId,
  getNameRecipes,
};
