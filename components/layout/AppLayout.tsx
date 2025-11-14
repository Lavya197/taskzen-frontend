"use client";

import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: any) {
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password");

  // Do NOT apply layout on auth pages
  if (isAuthPage) return children;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="p-6">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
