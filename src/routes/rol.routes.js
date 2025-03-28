const express = require("express");
const router = express.Router();
const controller = require("../controllers/rol.controller");

// Rutas para gestionar roles
router.get("/", controller.getAll);      // Obtener todos los roles
router.get("/:id", controller.getOne);   // Obtener un rol por ID
router.post("/", controller.create);     // Crear un nuevo rol
router.put("/:id", controller.update);   // Actualizar un rol
router.delete("/:id", controller.deleted); // Eliminar un rol

module.exports = router;