const jwt = require("jsonwebtoken");
const config = require("../config");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), config.jwt.secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
};

module.exports = authMiddleware;
