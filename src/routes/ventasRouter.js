const express = require("express");
const router = express.Router();
const ventasController = require('../controllers/ventasController');


router
// Obtener todas las ventas
  .get("/", ventasController.getAllVentas)

// Obtener una venta por su ID
  .get("/:id", ventasController.getVentaById)

// Obtener todas las lineas de venta de una venta
  .get("/:id/lineas", ventasController.getAllLineasVenta)

// Obtener todas las ventas de un año
  .get("/anual/:anio", ventasController.getVentasAnual)

// Obtener todas las ventas de un mes
  .get("/mensual/:mes/:anio", ventasController.getVentasMensual)

// Obtener todas las ventas de un dia
  .get("/diario/:dia/:mes/:anio", ventasController.getVentasDiario)

// Obtener todas las ventas de una semana
  .get("/semanal/:sem/:mes/:anio", ventasController.getVentasSemanal)

//Agregar una venta
  .post('/', ventasController.addVenta)

//Agregar una linea de venta
  .post('/:id/:idl', ventasController.addLineaVenta)

//Eliminar una venta
  .delete('/:id', ventasController.deleteVenta);


module.exports = router;