import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import characterRoutes from "./src/routes/character.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Obtiene el puerto de las variables de entorno o usa 3000 por defecto

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

app.use("/api/characters", characterRoutes);

const PORT = process.env.PORT || 4000;

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("¡Nos pudimos conectar a la base de datos!");

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error al conectar a la base de datos: ", error);
  }
};

init();

