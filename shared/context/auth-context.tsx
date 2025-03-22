import React, { createContext, useEffect, useState } from "react";
import {
  AuthContextProps,
  UserInterface,
} from "../utils/interfaces/user-interface";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");

    if (token && user) {
      setUser(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  const login = (token: string, userData: any) => {
    Cookies.set("token", token, { expires: 1 });
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    setUser(userData);
    router.push("/dashboard");
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

