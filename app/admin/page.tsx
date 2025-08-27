"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // clear state
    router.push("/admin/login");
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <section className="p-8">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p>Please log in to access this page.</p>
      </section>
    );
  }

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold">Welcome Admin</h1>
      <p>Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="btn mt-6 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </section>
  );
}
