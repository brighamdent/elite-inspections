"use client";
import React, { createContext, useContext } from "react";
import { useSearchParams } from "next/navigation";

interface PaymentDataContextType {
  user: string | null;
}

const PaymentDataContext = createContext<PaymentDataContextType | undefined>(
  undefined,
);

export function usePaymentData(): PaymentDataContextType {
  const context = useContext(PaymentDataContext);
  if (context === undefined) {
    throw new Error(
      "usePaymentData must be used within an PaymentDataProvider",
    );
  }
  return context;
}

export const PaymentDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const value: PaymentDataContextType = { user };
  return (
    <PaymentDataContext.Provider value={value}>
      {children}
    </PaymentDataContext.Provider>
  );
};
