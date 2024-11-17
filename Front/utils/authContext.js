import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [medications, setMedications] = useState([]); // Ajouter un état pour les médicaments

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateMedications = (newMedication) => {
    setMedications((prevMedications) => [...prevMedications, newMedication]);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, medications, updateMedications }}
    >
      {children}
    </AuthContext.Provider>
  );
};
