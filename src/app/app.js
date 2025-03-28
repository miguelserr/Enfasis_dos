const express = require("express");
const cors = require("cors");

const config = require("../config"); 
const rolesRoutes = require("../routes/rol.routes");
const authRoutes = require("../routes/auth.routes");
const userRoutes = require("../routes/user.routes"); 

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("port", config.app.port);


app.use("/api/rol", rolesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 

module.exports = app;
