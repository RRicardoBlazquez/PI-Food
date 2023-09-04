const { DB_USER, DB_PASSWORD } = process.env;
const {
  createRecipe,
  getRecipeId,
  getNameRecipes,
  getAllRecipe,
} = require("../controllers/recipesController");

const getRecipeHandler = async (req, res) => {
  const { idRecipe } = req.params;
  const source = isNaN(idRecipe) ? "bdd" : "api";
  try {
    const newRecipe = await getRecipeId(idRecipe, source);
    res.status(200).json(newRecipe);
  } catch (error) {
    res
      .status(404)
      .send("error obteniendo las receta  por id en la base de datos");
  }
};
const getRecipesHandler = async (req, res) => {
  const { name } = req.query;

  try {
    let listRecipes = name ? await getNameRecipes(name) : await getAllRecipe();
    res.status(200).json(listRecipes);
  } catch (error) {
    res
      .status(404)
      .send("error obteniendo las receta por su nombre de la base de datos");
  }
};

const createRecipesHandler = async (req, res) => {
  let { title, image, summary, healthScore, steps, diets } = req.body;
  healthScore = Number(healthScore);
  try {
    const newRecipe = await createRecipe({
      title,
      image,
      summary,
      healthScore,
      steps,
      diets,
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(404).send("error ingresando receta en la base de datos");
  }
};

module.exports = {
  getRecipeHandler,
  getRecipesHandler,
  createRecipesHandler,
};
