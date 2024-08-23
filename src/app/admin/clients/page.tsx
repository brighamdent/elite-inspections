import AwaitingInspection from "@/components/admin/clients/AwaitingInspection";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

export default function page() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center lg:flex-row justify-around lg:bg-royalblue lg:h-[700px] rounded-3xl lg:p-4 lg:m-4">
        <AwaitingInspection />
      </div>
    </ProtectedRoute>
  );
}
