const User = require("../models/user.model");
const response = require("../res/response");

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        response.success(res, users, 200);
    } catch (error) {
        response.error(res, "Error al obtener los usuarios", 500, error);
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return response.error(res, "Usuario no encontrado", 404);
        response.success(res, user, 200);
    } catch (error) {
        response.error(res, "Error al obtener el usuario", 500, error);
    }
};

// Crear un usuario
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return response.error(res, "Todos los campos son obligatorios", 400);
        }
        const newUser = await User.create({ name, email, password, role });
        response.success(res, newUser, 201);
    } catch (error) {
        response.error(res, "Error al crear usuario", 500, error);
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        const user = await User.findByPk(id);
        if (!user) return response.error(res, "Usuario no encontrado", 404);
        await user.update({ name, email, role });
        response.success(res, { message: "Usuario actualizado correctamente" }, 200);
    } catch (error) {
        response.error(res, "Error al actualizar usuario", 500, error);
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return response.error(res, "Usuario no encontrado", 404);
        await user.destroy();
        response.success(res, { message: "Usuario eliminado correctamente" }, 200);
    } catch (error) {
        response.error(res, "Error al eliminar usuario", 500, error);
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
