import { useState, useEffect } from "react";
import axios from "axios";

export default function useFollow(targetUserId, token) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [counts, setCounts] = useState({ seguidores: 0, seguindo: 0 });

  // Verificar se segue
  async function checkFollowing() {
    if (!token) return;

    const res = await axios.get(`http://localhost:3000/api/follow/check/${targetUserId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setIsFollowing(res.data.isFollowing);
  }

  // Obter contagens
  async function fetchCounts() {
    const res = await axios.get(`http://localhost:3000/api/follow/count/${targetUserId}`);
    setCounts(res.data);
  }

  // Seguir
  async function follow() {
    await axios.post(`http://localhost:3000/api/follow/${targetUserId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setIsFollowing(true);
    fetchCounts();
  }

  // Desseguir
  async function unfollow() {
    await axios.delete(`http://localhost:3000/api/unfollow/${targetUserId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setIsFollowing(false);
    fetchCounts();
  }

  useEffect(() => {
    checkFollowing();
    fetchCounts();
  }, [targetUserId]);

  return {
    isFollowing,
    counts,
    follow,
    unfollow,
  };
}
