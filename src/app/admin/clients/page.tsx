import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

export default function page() {
  return (
    <ProtectedRoute>
      <div>page</div>;
    </ProtectedRoute>
  );
}
