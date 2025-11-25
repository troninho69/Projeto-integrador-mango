import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// SERVIR ARQUIVOS ESTÁTICOS
app.use("/musics", express.static("uploads/musics"));

app.use("/auth", authRoutes);
app.use("/songs", songRoutes);
app.use("/covers", express.static("uploads/covers"));


export default app;
