"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PaymentDataContextType {
  userData: AppointmentType | undefined;
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
  const [userData, setUserData] = useState<AppointmentType>();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user");
  const value: PaymentDataContextType = {
    userData,
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/userToPay?userId=${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: AppointmentType = await response.json();
      setUserData(data);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <PaymentDataContext.Provider value={value}>
      {children}
    </PaymentDataContext.Provider>
  );
};
