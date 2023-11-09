const express = require("express");
const router = express.Router();
const comprasController = require("../controllers/comprasController");

router
  // Obtener todas las compras
  .get("/", comprasController.getAllCompras)

  // Obtener una compra por su ID
  .get("/:id", comprasController.getCompraById)

  // Obtener todas las lineas de compra de un id de compra
  .get("/:id/lineas", comprasController.getAllLineasCompra)

  //Eliminar una compra
  .delete("/:id_compra", comprasController.deleteCompra)

  //Agregar Compra
  .post("/", comprasController.addCompra)

  //Agregar linea de compra
  .post("/:id/:linea", comprasController.addLineaCompra);

module.exports = router;
