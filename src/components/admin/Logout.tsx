"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const handleClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}
