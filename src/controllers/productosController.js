const db = require("../database/model");

//Obtener todos los productos
const getAllProductos = (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) {
      console.error("Error al obtener los productos:", err);
      res.status(500).json({ error: "Error" });
      return;
    }
    res.json(results);
  });
};

// Obtener un producto por su ID
const getProductoById = (req, res) => {
  const productId = req.params.id;
  db.query(
    "SELECT * FROM productos WHERE id = ?",
    [productId],
    (err, results) => {
      if (err) {
        console.error("Error al obtener el producto:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Producto no encontrado" });
        return;
      }
      const producto = results[0];
      res.json(producto);
    }
  );
};
// Agregar un nuevo producto
const addProducto = (req, res) => {
  const nombre = req.body.nombre;
  const cantidad = req.body.cantidad;
  const descripcion = req.body.descripcion;
  const precio = req.body.precio;
  db.query(
    "INSERT INTO productos (nombre, cantidad, descripcion, fecha_actualizacion, precio) VALUES (?, ?, ?, CURDATE(), ?)",
    [nombre, cantidad, descripcion, precio],
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.status(201).send(`/api/productos/${results.insertId}`);
    }
  );
}

// Borrar un producto
const deleteProducto = (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM productos WHERE productos.id = ? ",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error al eliminar el producto:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.status(200).send('Eliminado con exito.');
    }
  );
}

//Modificar un producto
const updateProducto = (req, res) => {
  const nombre = req.body.nombre;
  const cantidad = req.body.cantidad;
  const descripcion = req.body.descripcion;
  const fecha_actualizacion = req.body.fecha_actualizacion;
  const precio = req.body.precio;
  const id = req.params.id;
  db.query(
    "UPDATE productos SET nombre = ?, cantidad = ?, descripcion = ?, fecha_actualizacion = ?, precio = ? WHERE productos.id = ? ",
    [nombre, cantidad, descripcion, fecha_actualizacion, precio, id],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar el producto:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.status(200).send(`Actualizado con exito.`);
    }
  );
}

module.exports = {
  getAllProductos,
  getProductoById,
  addProducto,
  deleteProducto,
  updateProducto
}