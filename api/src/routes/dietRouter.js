const { Router } = require("express");
const { getDietHandlers, addNewDiet } = require("../handlers/dietHandlers");
const dietRouter = Router();

dietRouter.get("/", getDietHandlers);
dietRouter.post("/", addNewDiet);

module.exports = dietRouter;
