const Rol = require("../models/rol.model");
const response = require("../res/response");

// Obtener todos los roles
const getAll = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        if (roles.length > 0) {
            response.success(res, roles, 200);
        } else {
            response.success(res, { message: "No hay registros en la tabla" }, 200);
        }
    } catch (error) {
        response.error(res, "Error al obtener roles", 500, error);
    }
};

// Obtener un solo rol por ID
const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Rol.findByPk(id);
        if (!rol) {
            return response.error(res, "Rol no encontrado", 404);
        }
        response.success(res, rol, 200);
    } catch (error) {
        response.error(res, "Error al obtener el rol", 500, error);
    }
};

// Crear un nuevo rol
const create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return response.error(res, "El nombre del rol es obligatorio", 400);
        }
        const newRol = await Rol.create({ name });
        response.success(res, newRol, 201);
    } catch (error) {
        response.error(res, "Error al crear el rol", 500, error);
    }
};

// Actualizar un rol existente
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const rol = await Rol.findByPk(id);
        if (!rol) {
            return response.error(res, "Rol no encontrado", 404);
        }
        await rol.update({ name });
        response.success(res, { message: "Rol actualizado correctamente" }, 200);
    } catch (error) {
        response.error(res, "Error al actualizar el rol", 500, error);
    }
};

// Eliminar un rol
const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Rol.findByPk(id);
        if (!rol) {
            return response.error(res, "Rol no encontrado", 404);
        }
        await rol.destroy();
        response.success(res, { message: "Rol eliminado correctamente" }, 200);
    } catch (error) {
        response.error(res, "Error al eliminar el rol", 500, error);
    }
};

module.exports = { getAll, getOne, create, update, deleted };