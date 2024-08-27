import Payment from "@/components/payment/Payment";
import { PaymentDataProvider } from "@/context/PaymentDataContext";
import React from "react";
export default function page() {
  return (
    <div>
      <PaymentDataProvider>
        <Payment />
      </PaymentDataProvider>
    </div>
  );
}
