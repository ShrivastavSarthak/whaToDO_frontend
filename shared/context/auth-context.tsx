import React, { createContext, useEffect, useState } from "react";
import {
  AuthContextProps,
  UserInterface,
} from "../utils/interfaces/user_interface";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch } from "../utils/hooks/redux-hook";
import { setUser } from "../store/slices/user-slice";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    const role = Cookies.get("role");

    if (token && userId && role) {
      const user: UserInterface = {
          id: userId,
        token: token,
        role: role as UserInterface["role"],
        }
      dispatch(setUser(user))
      
      setCurrentUser({
        id: userId,
        token: token,
        role: role as UserInterface["role"],
      });
    }

    setLoading(false);
  }, []);

  const login = (userData: UserInterface) => {
    Cookies.set("token", userData.token, { expires: 1 });
    Cookies.set("userId", userData.id, { expires: 1 });
    Cookies.set("role", userData.role, { expires: 1 });
    setCurrentUser(userData);
    router.push("/dashboard");
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("role");
    setCurrentUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

