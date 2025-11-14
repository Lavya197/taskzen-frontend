// frontend/components/auth/AuthCard.tsx
import React, { ReactNode } from "react";

export default function AuthCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
