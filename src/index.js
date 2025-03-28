const app = require("./app/app");
const sequelize = require("./db/db");

const PORT = app.get("port") || 3000;

sequelize.sync({ force: false })
    .then(() => {
        console.log(" Base de datos conectada");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(" Error al conectar la base de datos:", error);
    });
