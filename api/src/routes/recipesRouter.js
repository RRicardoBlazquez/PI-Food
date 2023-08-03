const { Router } = require("express");
const {
  getRecipeHandler,
  getRecipesHandler,
  createRecipesHandler,
} = require("../handlers/recipesHandlers");

const recipesRouter = Router();

recipesRouter.get("/", getRecipesHandler);
recipesRouter.get("/:idRecipe", getRecipeHandler);
recipesRouter.post("/", createRecipesHandler);

module.exports = recipesRouter;
