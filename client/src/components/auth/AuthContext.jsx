// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(true); // Set initial value based on user authentication state

  const login = () => {
    // Perform login operation (e.g., set token in localStorage)
    setAuthenticated(true);
  };

  const logout = () => {
    // Perform logout operation (e.g., remove token from localStorage)
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
