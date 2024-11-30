import AwaitingInspection from "@/components/admin/clients/AwaitingInspection";
import AwaitingPayment from "@/components/admin/clients/AwaitingPayment";
import Paid from "@/components/admin/clients/Paid";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

export default function page() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center lg:flex-row justify-center md:space-x-6 lg:bg-royalblue lg:h-[700px] rounded-3xl lg:p-4 lg:m-4 md:overflow-x-auto">
        <AwaitingInspection />
        <AwaitingPayment />
        <Paid />
      </div>
    </ProtectedRoute>
  );
}
