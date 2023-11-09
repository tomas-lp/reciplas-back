const express = require("express");
const router = express.Router();
const productosController = require('../controllers/productosController');

router
  // Obtener todos los productos
  .get("/", productosController.getAllProductos)

  // Obtener un producto por su ID
  .get("/:id", productosController.getProductoById)

  //Agregar nuevo producto
  .post('/', productosController.addProducto)

  //Eliminar un producto
  .delete('/:id', productosController.deleteProducto)

  //Actualizar un producto
  .put('/:id', productosController.updateProducto);


  module.exports = router;