"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Layers } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (isRegistering) {
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name,
        });
        if (error) setError(error.message || "An error occurred");
        else router.push("/dashboard");
      } else {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        });
        if (error) setError(error.message || "An error occurred");
        else router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Layers className="w-8 h-8 text-emerald-500" />
        <span className="font-bold text-2xl tracking-tight">Asset Forge</span>
      </Link>
      
      <div className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? "Create your account" : "Sign in to Asset Forge"}
        </h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold rounded-lg px-4 py-2 mt-4 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isRegistering ? "Sign Up" : "Sign In"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-neutral-400">
          {isRegistering ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-emerald-400 hover:underline"
          >
            {isRegistering ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
