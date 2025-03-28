const express = require("express");
const cors = require("cors");

const config = require("../config"); 
const roles = require("../routes/rol.routes");
const authRoutes = require("../routes/auth.routes"); // Importar rutas de autenticación

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del puerto
app.set("port", config.app.port);

// Rutas
app.use("/api/rol", roles);
app.use("/api/auth", authRoutes); // Agregamos las rutas de autenticación

module.exports = app;
