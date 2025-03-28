const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const bcrypt = require("bcryptjs");
const Rol = require("./rol.model");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: { msg: "El nombre es obligatorio" }
            }
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: { msg: "El Apellido es obligatorio" }
            }
        },
        telephone: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: { msg: "El telefono es obligatorio" }
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Corrección aquí
                notNull: { msg: "El correo electronico es obligatorio" }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "La contraseña es obligatoria" }
            }
        },
        rol_id: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: { msg: "El rol es obligatorio" }
            }
        }
    },
    {
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
);

User.belongsTo(Rol, { foreignKey: "rol_id" });

module.exports = User;
