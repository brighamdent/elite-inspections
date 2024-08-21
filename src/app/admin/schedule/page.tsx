import Logout from "@/components/admin/Logout";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

export default function page() {
  return (
    <ProtectedRoute>
      <div>Schedule</div>
    </ProtectedRoute>
  );
}
