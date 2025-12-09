import { Router } from "express";
import followController from "../controllers/controllerFollow.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// Seguir usuário
router.post("/follow/:userId", authMiddleware, followController.follow);

// Deixar de seguir
router.delete("/unfollow/:userId", authMiddleware, followController.unfollow);

// Listar quem o usuário segue
router.get("/following/:userId", followController.listFollowing);

// Listar seguidores
router.get("/followers/:userId", followController.listFollowers);

// Contagem seguidores / seguindo
router.get("/follow/count/:userId", followController.count);

// Verificar se o usuário segue outro
router.get("/follow/check/:userId", authMiddleware, followController.isFollowing);


export default router;
