// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Hook para usar o contexto em qualquer componente
export function useAuth() {
  return useContext(AuthContext);
}

// Provedor do contexto (envolve toda a aplicação)
export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  // Carrega o usuário salvo no localStorage ao iniciar a aplicação
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedLogged = localStorage.getItem("isLogged");

    if (savedUser && savedLogged === "true") {
      setUser(JSON.parse(savedUser));
      setIsLogged(true);
    }
  }, []);

  function updateUser(updatedData) {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  }

  function login(userData) {
    setUser(userData);
    setIsLogged(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLogged", "true");
  }

  function logout() {
    setUser(null);
    setIsLogged(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLogged");
  }

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
