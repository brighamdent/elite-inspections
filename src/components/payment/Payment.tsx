"use client";
import { usePaymentData } from "@/context/PaymentDataContext";
import React from "react";

export default function Payment() {
  const { user } = usePaymentData();
  return <div>user: {user}</div>;
}
