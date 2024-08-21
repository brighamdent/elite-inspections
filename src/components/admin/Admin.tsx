"use client";
import React from "react";
import Login from "./Login";
import { useAuth } from "@/context/AuthContext";

export default function Admin() {
  const { currentUser } = useAuth();
  return (
    <div>
      {!currentUser ? (
        <Login />
      ) : (
        <div>
          <h1>You are logged in as admin</h1>
        </div>
      )}
    </div>
  );
}
