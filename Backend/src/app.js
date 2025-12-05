import express from "express";
import cors from "cors";
import perfilRoutes from "./routes/perfilRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from './routes/likeRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// SERVIR ARQUIVOS ESTÁTICOS
app.use("/musics", express.static("uploads/musics"));
app.use("/covers", express.static("uploads/covers"));
app.use("/uploads/profile", express.static("uploads/profile"));
app.use("/uploads/posts", express.static("uploads/posts"));

app.use("/users", perfilRoutes);
app.use("/auth", authRoutes);
app.use("/songs", songRoutes);
app.use("/posts", postRoutes);
app.use("/", likeRoutes);

export default app;
