// frontend/app/signup/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      // If signUp created a user (for magic link/email confirmation flows, Supabase behavior may differ)
      const userId = data.user?.id;
      if (userId) {
        // create profile record
        await supabase.from("profiles").upsert({ id: userId, full_name: fullName });
      }

      alert("Signup successful. Check your inbox if confirmation is required.");
      router.push("/login");
    } catch (err: any) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Create your account">
      <div>
        <label className="text-sm font-medium">Full name</label>
        <input className="w-full mt-1 p-2 border rounded" placeholder="Your name" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <input className="w-full mt-1 p-2 border rounded" placeholder="you@company.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <input className="w-full mt-1 p-2 border rounded" placeholder="Choose a password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>

      <Button onClick={handleSignup} disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </Button>

      <div className="text-center text-sm">
        Already registered? <Link href="/login" className="text-blue-600">Sign in</Link>
      </div>
    </AuthCard>
  );
}
