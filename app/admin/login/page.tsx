// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { cormorantGaramond } from "@/config/fonts";
import FloatingInput from "@/components/ui/FloatingInput";

export default function AdminLoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin");
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
          type="email"
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
