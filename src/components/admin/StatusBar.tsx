"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Logout from "./Logout";

export default function StatusBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={`pt-4 sm:pt-0 md:w-full md:justify-center items-center justify-around md:space-x-12 sm:mt-4 mb-4 w-screen ${pathname != "/admin/login" ? "flex" : "hidden"}`}
    >
      <h2
        onClick={() => router.push("/admin/schedule")}
        className={`cursor-pointer text-base md:text-2xl ${
          pathname === "/admin/schedule" ? "text-teal" : ""
        }`}
      >
        Schedule
      </h2>
      <h2
        onClick={() => router.push("/admin/clients")}
        className={`cursor-pointer text-base md:text-2xl ${
          pathname === "/admin/clients" ? "text-teal" : ""
        }`}
      >
        Clients
      </h2>
      <h2
        onClick={() => router.push("/admin/availability")}
        className={`cursor-pointer text-base md:text-2xl ${
          pathname === "/admin/availability" ? "text-teal" : ""
        }`}
      >
        Availability
      </h2>
      <Logout />
    </div>
  );
}
