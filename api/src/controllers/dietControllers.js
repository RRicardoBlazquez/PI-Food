const { Recipe, Diet } = require("../db");
const { Op, where } = require("sequelize");

const createdDiet = async (name) => {
  const newDiet = await Diet.create({ name });
  return newDiet;
};

const setDiets = async (listDiets) => {
  let newListDietId = await Promise.all(
    listDiets.map(async (nameDiet) => {
      const [dieta, created] = await Diet.findOrCreate({
        where: { name: nameDiet },
        defaults: { created: true },
      });
      return dieta;
    })
  );

  return newListDietId;
};

const getAllDiets = async () => {
  const listDiets = await Diet.findAll();
  return listDiets;
};

module.exports = {
  createdDiet,
  getAllDiets,
  setDiets,
};
