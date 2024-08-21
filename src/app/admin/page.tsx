import Admin from "@/components/admin/Admin";
import Login from "@/components/admin/Login";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

export default function page() {
  return (
    <AuthProvider>
      <div className="flex flex-col items-center">
        <Admin />
      </div>
    </AuthProvider>
  );
}
