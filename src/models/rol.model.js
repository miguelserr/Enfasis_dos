const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Rol = sequelize.define(
    "Rol",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: { msg: "El nombre es obligatorio" }
            }
        }
    },
    {
        timestamps: true
    }
);

Rol.hasMany(User, {
    foreignKey: "rol_id"
});

User.belongsTo(Rol, {
    foreignKey: "rol_id"
});

module.exports = Rol;
