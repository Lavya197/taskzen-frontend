import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";
import type { ReactNode } from "react";

export const metadata = {
  title: "TaskZen",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
