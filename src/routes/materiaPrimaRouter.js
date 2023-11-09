const express = require("express");
const router = express.Router();
const materiaPrimaController = require('../controllers/materiaPrimaController');

router
  // Obtener todas las materias primas
  .get("/", materiaPrimaController.getAllMateriasPrimas)

  // Obtener materia prima por ID
  .get("/:id", materiaPrimaController.getMateriaPrimaById)

  //Agregar nueva materia prima
  .post('/', materiaPrimaController.addMateriaPrima)

  //Eliminar materia prima
  .delete('/:id', materiaPrimaController.deleteMateriaPrima)

  //Actualizar materia prima
  .put('/:id', materiaPrimaController.updateMateriaPrima);


  module.exports = router;