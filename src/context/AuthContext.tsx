"use client";
import React from "react";
import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface UserData {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
}
interface AuthContextType {
  currentUser: any;
  login: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredentials>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      return unsubscribe;
    });
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
