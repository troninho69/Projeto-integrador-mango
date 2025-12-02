import "./Profile.css";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header/Index";
import Navbar from "../../components/Navbar/Index";

import TabsComunidades from "../../components/Tabs/TabsComunidades/Index";
import TabsMusicas from "../../components/Tabs/TabsMusicas/Index";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(user?.bio || "");

  const [activeTab, setActiveTab] = useState("musicas");
  const [menuOpen, setMenuOpen] = useState(false); // controla dropdown
  const menuRef = useRef(null); // referência ao dropdown

  const switchTab = (tabName) => setActiveTab(tabName);

  const handleBioSave = async () => {
    setIsEditingBio(false);

    try {
      const res = await fetch(`http://localhost:3000/auth/bio/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio: tempBio }),
      });

      if (!res.ok) throw new Error("Erro ao salvar bio no servidor");

      updateUser({ bio: tempBio }); // atualiza o usuário global
    } catch (error) {
      alert("Erro ao salvar bio: " + error.message);
    }
  };

  const handleBioClick = () => {
    setIsEditingBio(true);
    setTempBio(user?.bio || "");
  };

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

  const handleLogout = () => {
    alert("Logout realizado!");
    window.location.href = "/login"; // redireciona para login
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      // Atualiza o usuário globalmente (AuthContext)
      updateUser({ photo: data.photo });
    } catch (error) {
      alert("Erro ao atualizar foto: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="pb-28">
        <div className="profile-main">
          <div className="profile-banner"></div>

          <div className="profile-photo">
            <img
              src={`http://localhost:3000${user?.photo}`}
              alt="Foto de Perfil"
              className="cursor-pointer"
              onClick={() => document.getElementById("photoInput").click()}
            />

            <input
              id="photoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="profile-buttons relative">
            <button className="msg-button">Mensagem</button>
            <button className="follow-button">Seguir</button>

            {/* Botão de menu */}
            <button
              className="btn-icon"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50"
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
          </div>

          <div className="profile-info">
            <h1 className="profile-name">{user?.name}</h1>
            <p className="profile-username">@{user?.userName}</p>

            <p className="profile-description">
              {isEditingBio ? (
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
                <p onClick={handleBioClick} className="cursor-pointer">
                  {user?.bio || "Clique para adicionar uma bio"}
                </p>
              )}
            </p>

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

          <div className="tab-navigation">
            <button
              id="tab-musicas"
              className={`tab-button ${
                activeTab === "musicas" ? "active" : ""
              }`}
              onClick={() => switchTab("musicas")}
            >
              Músicas
            </button>
            <button
              id="tab-comunidades"
              className={`tab-button ${
                activeTab === "comunidades" ? "active" : ""
              }`}
              onClick={() => switchTab("comunidades")}
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
