"use client";

import { usePathname } from "next/navigation";   // ✅ ADD THIS
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";                   // ✅ ensure Navbar is imported

export default function HideNavbarWrapper({ children }: any) {
  const pathname = usePathname();
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUid(data.user?.id ?? null);
    });
  }, []);

  const hideNavbar =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password");

  return (
    <>
      {!hideNavbar && <Navbar currentUserId={uid} />}
      {children}
    </>
  );
}
