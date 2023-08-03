const { createdDiet, getAllDiets } = require("../controllers/dietControllers");

const getDietHandlers = (req, res) => {
  try {
    const listDiets = getAllDiets();
    res.status(200).send(listDiets);
  } catch (error) {
    res.status(404).send("Error accediendo a las dietas");
  }
};

const addNewDiet = async (req, res) => {
  const { name } = req.query;
  try {
    const newDiet = await createdDiet(name);
    res.status(200).json(newDiet);
  } catch (error) {
    res
      .status(404)
      .send("Error cargando en la base de datos o la dieta ya existe");
  }
};

module.exports = {
  getDietHandlers,
  addNewDiet,
};
