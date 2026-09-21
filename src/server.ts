import "dotenv/config";
import express from "express";

import turnosRouter from "./routes/turnos.routes";
import medicosRoutes from "./routes/medicos.routes";
import authRoutes from "./routes/auth.routes";
import helloRouter from "./routes/welcome.routes";

import { notFoundMiddleware } from "./middleware/not-found.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use("/api/medicos", medicosRoutes);
app.use("/api/turnos", turnosRouter);
app.use("/api/auth", authRoutes);
app.use("/", helloRouter);

// Deben estar después de las rutas
app.use(notFoundMiddleware);

// Debe ser el último middleware
app.use(errorMiddleware);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor HTTP ejecutándose en http://localhost:${PORT}`);
});