"use client"; // This must be at the top of the file

export const dynamic = "force-dynamic"; // Ensure this comes after "use client"

import React from "react";
import Payment from "@/components/payment/Payment";
import { PaymentDataProvider } from "@/context/PaymentDataContext";

export default function Page() {
  return (
    <PaymentDataProvider>
      <div>
        <Payment />
      </div>
    </PaymentDataProvider>
  );
}
