const db = require("../database/model");

//Obtener todos las materias primas
const getAllMateriasPrimas = (req, res) => {
  db.query("SELECT * FROM materias_primas", (err, results) => {
    if (err) {
      console.error("Error al obtener las materias primas:", err);
      res.status(500).json({ error: "Error" });
      return;
    }
    res.json(results);
  });
};

// Obtener un producto por su ID
const getMateriaPrimaById = (req, res) => {
  const materiasPrimasId = req.params.id;
  db.query(
    "SELECT * FROM materias_primas WHERE id = ?",
    [materiasPrimasId],
    (err, results) => {
      if (err) {
        console.error("Error al obtener la materia prima:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Materia no encontrado" });
        return;
      }
      const materia_prima = results[0];
      res.json(materia_prima);
    }
  );
};

// Agregar una nueva materia prima
const addMateriaPrima = (req, res) => { 
  const id = req.body.id;
  const nombre = req.body.nombre;
  const cantidad = req.body.cantidad;
  const descripcion = req.body.descripcion;
  const cantidad_min = req.body.cantidad_min;
  const fecha_actualizacion = req.body.fecha_actualizacion;
  db.query(
    "INSERT INTO materias_primas (id, nombre, cantidad, descripcion, cantidad_min, fecha_actualizacion) VALUES (?, ?, ?, ?, ?, CURDATE())",
    [id, nombre, cantidad, descripcion, fecha_actualizacion],
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.status(201).send(`/api/materiaprima/${results.insertId}`);
    }
  );
}

// Borrar un producto
const deleteMateriaPrima = (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM materias_primas WHERE materias_primas.id = ? ",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error al eliminar la materia prima:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.status(200).send('Eliminado con exito.');
    }
  );
}

//Modificar un producto
const updateMateriaPrima = (req, res) => {
  const nombre = req.body.nombre;
  const cantidad = req.body.cantidad;
  const descripcion = req.body.descripcion;
  const cantidad_min = req.body.cantidad_min;
  const fecha_actualizacion = req.body.fecha_actualizacion;
  const id = req.params.id;
  db.query(
    "UPDATE materias_primas SET nombre = ?, cantidad = ?, descripcion = ?, cantidad_min = ?, fecha_actualizacion = ? WHERE materias_primas.id = ? ",
    [nombre, cantidad, descripcion, cantidad_min, fecha_actualizacion, id],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar la materia prima:", err);
        res.status(500).json({ error: "Error" });
        return;
      }
      res.status(200).send(`Actualizado con exito.`);
    }
  );
}

module.exports = {
  getAllMateriasPrimas,
  getMateriaPrimaById,
  addMateriaPrima,
  deleteMateriaPrima,
  updateMateriaPrima
}