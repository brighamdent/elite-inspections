"use client";
import React, { createContext, useContext } from "react";

interface PaymentDataContextType {}

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
  const value: PaymentDataContextType = {};
  return (
    <PaymentDataContext.Provider value={value}></PaymentDataContext.Provider>
  );
};
