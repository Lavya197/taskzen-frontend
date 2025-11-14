// frontend/app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // successful login; redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Welcome back">
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          className="w-full mt-1 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          type="email"
          data-cy="login-email"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          className="w-full mt-1 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          type="password"
          data-cy="login-password"
        />
      </div>

      <div className="flex items-center justify-between">
        <Link href="/forgot-password" className="text-sm text-blue-600">Forgot password?</Link>
      </div>

      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="text-center text-sm">
        Don’t have an account? <Link href="/signup" className="text-blue-600">Sign up</Link>
      </div>
    </AuthCard>
  );
}
