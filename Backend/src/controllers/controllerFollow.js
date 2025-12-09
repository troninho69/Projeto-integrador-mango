import Follow from "../models/follow.js";
import User from "../models/user.js";

export default {
  // Seguir usuário
  async follow(req, res) {
    try {
      const followerId = req.user.id; // id do usuário logado (token)
      const { userId } = req.params; // id do usuário a ser seguido

      if (Number(followerId) === Number(userId)) {
        return res
          .status(400)
          .json({ message: "Você não pode seguir a si mesmo." });
      }

      const alreadyFollowing = await Follow.findOne({
        where: { followerId, followedId: userId },
      });

      if (alreadyFollowing) {
        return res.status(400).json({ message: "Você já segue esse usuário." });
      }

      await Follow.create({
        followerId,
        followedId: userId,
      });

      return res
        .status(201)
        .json({ message: "Agora você está seguindo este usuário!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao seguir usuário." });
    }
  },

  // Deixar de seguir
  async unfollow(req, res) {
    try {
      const followerId = req.user.id;
      const { userId } = req.params;

      const follow = await Follow.findOne({
        where: { followerId, followedId: userId },
      });

      if (!follow) {
        return res
          .status(404)
          .json({ message: "Você não segue esse usuário." });
      }

      await follow.destroy();

      return res.json({ message: "Você deixou de seguir esse usuário." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao deixar de seguir." });
    }
  },

  // Buscar quem o usuário segue
  async listFollowing(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId, {
        include: {
          model: User,
          as: "seguindo",
          attributes: ["id", "userName", "photo"],
          through: { attributes: [] },
        },
      });

      return res.json(user.seguindo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar seguindo." });
    }
  },

  // Buscar os seguidores
  async listFollowers(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId, {
        include: {
          model: User,
          as: "seguidores",
          attributes: ["id", "userName", "photo"],
          through: { attributes: [] },
        },
      });

      return res.json(user.seguidores);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar seguidores." });
    }
  },

  // Contagem total de seguidores e seguindo
  async count(req, res) {
    try {
      const { userId } = req.params;

      const seguidores = await Follow.count({
        where: { followedId: userId },
      });

      const seguindo = await Follow.count({
        where: { followerId: userId },
      });

      return res.json({ seguidores, seguindo });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Erro ao contar seguidores/seguindo." });
    }
  },

  // Verificar se o usuário logado segue um usuário específico
  async isFollowing(req, res) {
    try {
      const followerId = req.user.id; // usuário logado
      const { userId } = req.params; // usuário alvo

      const follow = await Follow.findOne({
        where: { followerId, followedId: userId },
      });

      return res.json({ isFollowing: !!follow });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao verificar follow." });
    }
  },
};
