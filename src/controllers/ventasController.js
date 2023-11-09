const db = require("../database/model");

// Obtener todas las ventas
const getAllVentas = (req, res) => {
  db.query("SELECT id, fecha, cliente, SUM(cantidad*precio_unitario) AS importe FROM ventas v INNER JOIN linea_ventas l ON l.id_venta = v.id GROUP BY id_venta", (err, results) => {
    if (err) {
      console.error("Error al obtener ventas:", err);
      res.status(500).json({ error: "Error" });
      return;
    }
    res.json(results);
  });
};

// Obtener una venta por su ID
const getVentaById = (req, res) => {
  const ventaId = req.params.id;

  db.query("SELECT id, fecha, cliente, SUM(cantidad*precio_unitario) AS importe FROM ventas v INNER JOIN linea_ventas l ON l.id_venta = v.id  WHERE id = ?", [ventaId], (err, results) => {
    if (err) {
      console.error("Error al obtener la venta:", err);
      res.status(500).json({ error: "Error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Venta no encontrada" });
      return;
    }

    const venta = results[0];
    res.json(venta);
  });
};

// Obtener todas las lineas de venta de una venta
const getAllLineasVenta = (req, res) => {
  const ventaId = req.params.id;

  db.query(
    "SELECT id_venta,linea,id_producto,cantidad,precio_unitario,nombre FROM linea_ventas,productos WHERE id_venta = ? AND productos.id=linea_ventas.id_producto;",
    [ventaId],
    (err, results) => {
      if (err) {
        console.error("Error", err);
        res.status(500).json({ error: "Error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Venta no encontrada" });
        return;
      }

      res.json(results);
    }
  );
};

// Obtener todas las ventas de un año
const getVentasAnual = (req, res) => {
  const anio = req.params.anio;

  db.query(
    "SELECT * FROM ventas WHERE YEAR(fecha) = ?",
    [anio],
    (err, results) => {
      if (err) {
        console.error("Error al obtener ventas:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.json(results);
    }
  );
};

// Obtener todas las ventas de un mes
const getVentasMensual = (req, res) => {
  const anio = req.params.anio;
  const mes = req.params.mes;

  db.query(
    "SELECT * FROM ventas WHERE YEAR(fecha) = ? AND MONTH(fecha) = ?",
    [anio, mes],
    (err, results) => {
      if (err) {
        console.error("Error al obtener ventas:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.json(results);
    }
  );
};

// Obtener todas las ventas de un dia
const getVentasDiario = (req, res) => {
  const anio = req.params.anio;
  const dia = req.params.dia;
  const mes = req.params.mes;

  db.query(
    "SELECT * FROM ventas WHERE DAY(fecha)=? AND MONTH(fecha)=? AND YEAR(fecha)=?",
    [dia, mes, anio],
    (err, results) => {
      if (err) {
        console.error("Error al obtener ventas:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.json(results);
    }
  );
};

// Obtener todas las ventas de una semana
const getVentasSemanal = (req, res) => {
  const anio = req.params.anio;
  const mes = req.params.mes;
  const sem = req.params.sem;
  const diaSup = parseInt(sem) * 7;
  const diaInf = diaSup - 7;

  db.query(
    "SELECT * FROM ventas WHERE DAY(fecha) BETWEEN ? AND ? AND MONTH(fecha)=? AND YEAR(fecha)=?",
    [diaInf, diaSup, mes, anio],
    (err, results) => {
      if (err) {
        console.error("Error al obtener ventas:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.json(results);
    }
  );
};

// Agregar una nueva venta
const addVenta = (req, res) => {
  const cliente = req.body.cliente;
  //const fecha = req.body.fecha; [fecha]
  db.query(
    "INSERT INTO ventas (cliente, fecha) VALUES (?, CURDATE())",
    [cliente],
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

// Agregar una nueva linea de venta
const addLineaVenta = (req, res) => {
  const id_venta = req.params.id;
  const linea = req.params.idl;
  const id_producto = req.body.id_producto;
  const cantidad = req.body.cantidad;
  const precio_unitario = req.body.precio_unitario;
  db.query(
    "INSERT INTO linea_ventas (id_venta, linea, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)",
    [id_venta, linea, id_producto, cantidad, precio_unitario],
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.status(201).send(`God`);
    }
  );
};

// Borrar una venta
const deleteVenta = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM ventas WHERE ventas.id = ? ", [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar la venta:", err);
      res.status(500).json({ error: "Error" });
      return;
    }
    res.status(200).send("Eliminado con exito.");
  });
};

module.exports = {
  getAllVentas,
  getVentaById,
  getAllLineasVenta,
  getVentasAnual,
  getVentasMensual,
  getVentasSemanal,
  getVentasDiario,
  addVenta,
  deleteVenta,
  addLineaVenta,
};
