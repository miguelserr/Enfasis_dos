const app = require("./app/app");
const sequelize = require("./db/db");

const PORT = app.get("port") || 3000;

// Conectar con la base de datos y luego iniciar el servidor
sequelize.sync({ force: false }) // Cambia a true si quieres reiniciar tablas en desarrollo
    .then(() => {
        console.log("✅ Base de datos conectada");
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Error al conectar la base de datos:", error);
    });
