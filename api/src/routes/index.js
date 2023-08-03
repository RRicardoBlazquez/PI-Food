const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require("./recipesRouter");
const dietRouter = require("./dietRouter");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipesRouter);
router.use("/diet", dietRouter);

module.exports = router;
