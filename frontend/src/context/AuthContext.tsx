import { createContext, useState, useEffect, ReactNode } from "react";
import { api, setAuthToken } from "../api";

interface User {
  id: string;
  email: string;
  role: "admin" | "mentor" | "mentee";
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      api.get<User>("/auth/me")
        .then(res => setUser(res.data))
        .catch(() => {
          console.error("Failed to fetch user data");
          setUser(null);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post<{ token: string }>("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setAuthToken(res.data.token);
      const me = await api.get<User>("/auth/me");
      setUser(me.data);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
