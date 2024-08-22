import Login from "@/components/admin/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <Login />
    </div>
  );
}
