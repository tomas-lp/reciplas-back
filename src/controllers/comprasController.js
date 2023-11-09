const db = require("../database/model");

// Obtener todas las compras
const getAllCompras = (req, res) => {
  db.query("SELECT id, fecha, proveedor, SUM(cantidad*precio_unitario) AS importe FROM compras c INNER JOIN linea_compras l ON l.id_compra = c.id GROUP BY id_compra", (err, results) => {
    if (err) {
      console.error("Error al obtener compras:", err);
      res.status(500).json({ error: "Error" });
      return;
    }
    res.json(results);
  });
};

// Obtener una compra por su ID
const getCompraById = (req, res) => {
  const compraId = req.params.id;

  db.query("SELECT id, fecha, proveedor, SUM(cantidad*precio_unitario) AS importe FROM compras c INNER JOIN linea_compras l ON l.id_compra = c.id  WHERE id = ?", [compraId], (err, results) => {
    if (err) {
      console.error("Error al obtener la compra:", err);
      res.status(500).json({ error: "Error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Compra no encontrada." });
      return;
    }

    const compra = results[0];
    res.json(compra);
  });
};

// Obtener todas las lineas de compra de un id de compra
const getAllLineasCompra = (req, res) => {
  const compraId = req.params.id;

  db.query(
    "SELECT id_compra,linea,id_producto,cantidad,precio_unitario,nombre FROM linea_compras,productos WHERE id_compra = ? AND productos.id=linea_compras.id_producto;",
    [compraId],
    (err, results) => {
      if (err) {
        console.error("Error", err);
        res.status(500).json({ error: "Error" });
        return;
      }

      if (results.length === 0) {
        res
          .status(404)
          .json({ error: "Compra no encontrada o la compra no tiene lineas." });
        return;
      }

      res.json(results);
    }
  );
};

//Agrego una nueva compra
const addCompra = (req, res) => {
  //const fecha = req.body.fecha; [fecha]
  const proveedor = req.body.proveedor;
  db.query(
    "INSERT INTO compras (fecha, proveedor) VALUES (CURDATE(), ?)",
    [proveedor],
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.status(201).send(`${results.insertId}`);
    }
  );
};

//Agrega linea compra
const addLineaCompra = (req, res) => {
  const linea = req.params.linea;
  const id_compra = req.params.id;

  const id_producto = req.body.id_producto;
  const cantidad = req.body.cantidad;
  const precio_unitario = req.body.precio_unitario;

  db.query(
    "INSERT INTO linea_compras (id_compra,linea,id_producto,cantidad,precio_unitario) VALUES (?, ?, ?, ?, ?)",
    [id_compra, linea, id_producto, cantidad, precio_unitario],
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      //No estoy seguro d esto, pero el suyo no entiendo =D
      res.status(201).json({ mensaje: "Linea de Compra creada exitosamente" });
    }
  );
};

const deleteCompra = (req, res) => {
  const id_compra = req.params.id_compra;
  db.query(
    "DELETE FROM compras where compras.id=?",
    [id_compra],
    (err, results) => {
      if (err) {
        console.error("Error al eliminar la venta:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.status(200).json({ mensaje: "Eliminada con exito." });
    }
  );
};

module.exports = {
  deleteCompra,
  addLineaCompra,
  addCompra,
  getAllCompras,
  getCompraById,
  getAllLineasCompra,
};
