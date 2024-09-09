"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Logout() {
  const { logout } = useAuth();
  const pathname = usePathname();
  const handleClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`w-full ${pathname === "/admin/login" ? "hidden" : ""}`}>
      <button
        type="button"
        onClick={handleClick}
        className="bg-teal pr-2 pl-2 p-1 rounded-lg w-full sm:w-auto"
      >
        Logout
      </button>
    </div>
  );
}
