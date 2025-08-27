"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import FloatingInput from "@/components/ui/FloatingInput";
import { cormorantGaramond } from "@/config/fonts";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createPagesBrowserClient();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      router.push("/admin"); // redirect to admin page
    }
  };

  return (
    <section className="flex flex-col p-4 sm:px-64 sm:py-24 gap-8 sm:gap-16 items-center justify-center">
      <div className="flex flex-col gap-8 p-8 sm:p-12 w-full sm:w-2xl items-center justify-center rounded-2xl sm:rounded-4xl shadow border border-zinc-200">
        <h2
          className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          Admin Login
        </h2>

        <FloatingInput
          id="email"
          placeholder="example@example.com"
          label="Email"
          className="input-lg !rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FloatingInput
          id="password"
          placeholder="••••••••"
          label="Password"
          type="password"
          className="input-lg !rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="btn waves waves-light !w-full sm:!w-96 !rounded-lg border-0 bg-amber-500"
        >
          Log In
        </button>
      </div>
    </section>
  );
}
