"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (currentUser === null) {
      // Redirect to login if not logged in
      router.replace("/admin/login");
    } else if (currentUser && window.location.pathname === "/admin") {
      // Redirect to schedule if logged in and trying to access /admin
      router.replace("/admin/schedule");
    }
  }, [loading, currentUser, router]);

  // Render children if the user is authenticated
  return currentUser ? <>{children}</> : null;
}
