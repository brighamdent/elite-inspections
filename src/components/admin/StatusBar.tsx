"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function StatusBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex w-full justify-around">
      <h2
        onClick={() => router.push("/admin/schedule")}
        className={`cursor-pointer ${
          pathname === "/admin/schedule" ? "text-teal" : ""
        }`}
      >
        Schedule
      </h2>
      <h2
        onClick={() => router.push("/admin/clients")}
        className={`cursor-pointer ${
          pathname === "/admin/clients" ? "text-teal" : ""
        }`}
      >
        Clients
      </h2>
      <h2
        onClick={() => router.push("/admin/availability")}
        className={`cursor-pointer ${
          pathname === "/admin/availablity" ? "text-teal" : ""
        }`}
      >
        Availability
      </h2>
    </div>
  );
}
