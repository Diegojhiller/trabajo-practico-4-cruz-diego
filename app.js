// src/app.js
import express from "express";
import dotenv from "dotenv";

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Obtiene el puerto de las variables de entorno o usa 4000 por defecto

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Ruta de prueba (opcional, para verificar que el servidor funciona)
app.get("/", (req, res) => {
  res.send("¡API de Dragon Ball funcionando!");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
