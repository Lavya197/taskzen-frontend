"use client";

import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function AppLayout({ children }: any) {
  const pathname = usePathname();
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUid(data?.user?.id ?? null);
    });
  }, []);

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
        <Navbar currentUserId={uid} />

        <main className="p-6">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
