"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

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
    <div
      className={` md:place-self-end ${pathname === "/admin/login" ? "hidden" : ""}`}
    >
      <button
        type="button"
        onClick={handleClick}
        className="bg-teal pr-2 pl-2 p-1 rounded-lg sm:w-auto flex items-center self-end"
      >
        <p className="hidden sm:block">Logout</p>
        <FontAwesomeIcon icon={faSignOut} className="p-1" />
      </button>
    </div>
  );
}
