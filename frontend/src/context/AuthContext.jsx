import { createContext, useEffect, useState } from "react";
import api from "../lib/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("auth_token", res.data.token);
    setUser(res.data.user);

    return res.data.user;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("auth_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  const register = async (name, email, password) => {
    const res = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });

    localStorage.setItem("auth_token", res.data.token);
    setUser(res.data.user);

    return res.data.user;
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};