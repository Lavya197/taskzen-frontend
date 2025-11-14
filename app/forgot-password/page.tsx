// frontend/app/forgot-password/page.tsx
"use client";
import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`
      });
      if (error) throw error;
      alert("If that email exists, a reset link has been sent.");
    } catch (err: any) {
      alert(err.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Reset password">
      <div>
        <label className="text-sm font-medium">Email</label>
        <input className="w-full mt-1 p-2 border rounded" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@company.com" />
      </div>

      <Button onClick={handleReset} disabled={loading}>
        {loading ? "Sending..." : "Send reset email"}
      </Button>

      <div className="text-center text-sm">
        Back to <Link href="/login" className="text-blue-600">Login</Link>
      </div>
    </AuthCard>
  );
}
