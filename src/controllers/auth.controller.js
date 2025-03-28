const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Rol = require("../models/rol.model");
require("dotenv").config();

// Registro de usuario
const register = async (req, res) => {
    try {
        const { first_name, last_name, telephone, email, password, rol_id } = req.body;
        
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "El correo ya está registrado." });
        }
        
        // Crear usuario
        const newUser = await User.create({ first_name, last_name, telephone, email, password, rol_id });
        return res.status(201).json({ msg: "Usuario registrado exitosamente." });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor", error });
    }
};

// Inicio de sesión
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email }, include: Rol });
        
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }
        
        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: "Credenciales incorrectas." });
        }
        
        // Generar token JWT
        const token = jwt.sign({ id: user.id, email: user.email, rol: user.Rol.name }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });
        
        return res.json({ token, user: { id: user.id, email: user.email, rol: user.Rol.name } });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor", error });
    }
};

// Validar token
const validateToken = async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ msg: "Acceso denegado." });
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.status(401).json({ msg: "Token inválido." });
        
        return res.json({ msg: "Token válido", user: verified });
    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor", error });
    }
};

module.exports = { register, login, validateToken };
