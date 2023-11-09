// Imports
require("dotenv").config();
const express = require("express");
const app = express();
const materiaPrimaRouter = require('./routes/materiaPrimaRouter');
const productosRouter = require('./routes/productosRouter');
const cors = require("cors");

// Puerto
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors())
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Consultas

app.use("/api/materiaprima", materiaPrimaRouter);
app.use("/api/productos", productosRouter);

// Arrancar Servidor
app.listen(PORT, () => {
  console.log(`Server is running. http://localhost:${PORT}`);
});
