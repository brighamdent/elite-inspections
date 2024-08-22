import Logout from "@/components/admin/Logout";
import TodaysAppointments from "@/components/admin/schedule/TodaysAppointments";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

export default function page() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center">
        <TodaysAppointments />
      </div>
    </ProtectedRoute>
  );
}
