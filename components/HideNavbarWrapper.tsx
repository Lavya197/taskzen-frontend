"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";


export default function HideNavbarWrapper({ children }: any) {
  const pathname = usePathname();

  const hideNavbar =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
