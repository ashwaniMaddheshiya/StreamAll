"use client";

import { baseUrl } from "@/constants";
import { myFetch } from "@/utils/myFetch";
import { showToast } from "@/utils/showToast";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";

interface UserType {
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: UserType | null;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };

  const deleteLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  const signin = async (email: string, password: string) => {
    const { data, error } = await myFetch(`${baseUrl}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (data) {
      console.log(data);
      setUser(data.user);
      setLocalStorage("user", JSON.stringify(data.user));
      setLocalStorage("token", data.token);
      router.push("/");
    }

    if (error) {
      console.log(error);
      showToast("error", error);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const { data, error } = await myFetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (data) {
      console.log(data);
      setUser(data.user);
      setLocalStorage("user", JSON.stringify(data.user));
      setLocalStorage("token", data.token);
      router.push("/");
    }

    if (error) {
      console.log(error);
      showToast("error", error);
    }
  };

  useLayoutEffect(() => {
    const token = window.localStorage.getItem("token");

    const authPaths = ["/signin", "/signup"];
    const isAuthPath = authPaths.includes(pathName);

    if (token && isAuthPath) {
      router.push("/");
    } else {
      const publicPaths = ["/signup"];
      const isPublicPath = publicPaths.includes(pathName);

      if (!isPublicPath && !token) {
        router.push("/signin");
      }
    }
  }, [pathName, router]);

  const signout = () => {
    deleteLocalStorage("user");
    setUser(null);
    router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
