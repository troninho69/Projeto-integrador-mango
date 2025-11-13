// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Hook para usar o contexto em qualquer componente
export function useAuth() {
  return useContext(AuthContext);
}

// Provedor do contexto (envolve toda a aplicação)
export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  function login(userData) {
    setUser(userData);
    setIsLogged(true);
  }

  function logout() {
    setUser(null);
    setIsLogged(false);
  }

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
