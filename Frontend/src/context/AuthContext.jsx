// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Carrega dados salvos no localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
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

  function login(userData, tokenReceived) {
    setUser(userData);
    setToken(tokenReceived);
    setIsLogged(true);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenReceived);
  }

  function logout() {
    setUser(null);
    setToken(null);
    setIsLogged(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ isLogged, user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
