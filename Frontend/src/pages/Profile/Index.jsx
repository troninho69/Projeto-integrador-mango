import "./Profile.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Header from "../../components/Header/Index";
import Navbar from "../../components/Navbar/Index";
import TabsComunidades from "../../components/Tabs/TabsComunidades/Index";
import TabsMusicas from "../../components/Tabs/TabsMusicas/Index";

export default function Profile() {
  const { id } = useParams();
  const { user, updateUser } = useAuth();
  const { logout } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState("");

  const [activeTab, setActiveTab] = useState("musicas");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const isOwner = user?.id === profileUser?.id;

  // ===============================
  // BUSCA DADOS DO PERFIL
  // ===============================
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => setProfileUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // ===============================
  // FECHAR MENU AO CLICAR FORA
  // ===============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===============================
  // SINCRONIZAR BIO COM A DO PROFILE USER
  // ===============================
  useEffect(() => {
    if (profileUser) {
      setTempBio(profileUser.bio || "");
    }
  }, [profileUser]);

  // ===============================
  // SE PERFIL AINDA NÃO CARREGOU
  // ===============================
  if (!profileUser) {
    return (
      <>
        <Header />
        <Navbar />
        <p className="text-white pb-28">Carregando...</p>
      </>
    );
  }

  // ===============================
  // SALVAR BIO
  // ===============================
  const handleBioSave = async () => {
    setIsEditingBio(false);

    try {
      const res = await fetch(`http://localhost:3000/auth/bio/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio: tempBio }),
      });

      if (!res.ok) throw new Error("Erro ao salvar bio no servidor");

      updateUser({ bio: tempBio });

      setProfileUser((prev) => ({ ...prev, bio: tempBio }));
    } catch (error) {
      alert("Erro ao salvar bio: " + error.message);
    }
  };

  // ===============================
  // ALTERAR FOTO DO PERFIL
  // ===============================
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch(`http://localhost:3000/auth/photo/${user.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao enviar foto");

      const data = await res.json();
      updateUser({ photo: data.photo });
    } catch (error) {
      alert("Erro ao atualizar foto: " + error.message);
    }
  };

  // ===============================
  // LOGOUT
  // ===============================
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // ===============================
  // RENDERIZAR TABS
  // ===============================
  const renderTabContent = () => {
    switch (activeTab) {
      case "musicas":
        return <TabsMusicas />;

      case "comunidades":
        return (
          <div className="flex justify-center">
            <div className="grid grid-cols-3 justify-around">
              <TabsComunidades />
              <TabsComunidades />
              <TabsComunidades />
              <TabsComunidades />
              <TabsComunidades />
              <TabsComunidades />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ===========================================================
  // RENDER PRINCIPAL
  // ===========================================================
  return (
    <>
      <Header />
      <Navbar />

      <div className="pb-28">
        <div className="profile-main">
          {/* Banner */}
          <div className="profile-banner"></div>

          {/* Foto */}
          <div className="profile-photo">
            <img
              src={`http://localhost:3000${profileUser.photo}`}
              alt="Foto de Perfil"
              className="cursor-pointer"
              onClick={
                isOwner
                  ? () => document.getElementById("photoInput").click()
                  : null
              }
            />

            <input
              id="photoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Botões */}
          <div className="profile-buttons relative">
            {!isOwner ? (
              <>
                <button className="msg-button">Mensagem</button>
                <button className="follow-button">Seguir</button>
              </>
            ) : (
              <>
                <button
                  className="btn-icon"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                </button>

                {menuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 
                    border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50"
                  >
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setMenuOpen(false);
                        setIsEditingBio(true);
                      }}
                    >
                      Mudar Bio
                    </button>

                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={handleLogout}
                    >
                      Sair da Conta
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Infos */}
          <div className="profile-info">
            <h1 className="profile-name">{profileUser.name}</h1>
            <p className="profile-username">@{profileUser.userName}</p>

            <div className="profile-description">
              {isEditingBio && isOwner ? (
                <textarea
                  autoFocus
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  onBlur={handleBioSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleBioSave();
                    }
                  }}
                  className="w-full bg-transparent outline-none resize-none text-center"
                  rows={3}
                />
              ) : (
                <p
                  className={isOwner ? "cursor-pointer" : ""}
                  onClick={isOwner ? () => setIsEditingBio(true) : undefined}
                >
                  {profileUser?.bio ||
                    (isOwner ? "Clique para adicionar uma bio" : "")}
                </p>
              )}
            </div>

            {/* Estatísticas */}
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">247</span>
                <span className="stat-label">Seguindo</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">1.234</span>
                <span className="stat-label">Seguidores</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-navigation">
            <button
              className={`tab-button ${
                activeTab === "musicas" ? "active" : ""
              }`}
              onClick={() => setActiveTab("musicas")}
            >
              Músicas
            </button>

            <button
              className={`tab-button ${
                activeTab === "comunidades" ? "active" : ""
              }`}
              onClick={() => setActiveTab("comunidades")}
            >
              Comunidades
            </button>
          </div>

          <div className="tab-content">{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
}
