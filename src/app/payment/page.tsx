"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
export default function page() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  return <div>User ID: {user}</div>;
}
