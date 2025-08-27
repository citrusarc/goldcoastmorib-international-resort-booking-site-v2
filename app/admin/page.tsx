"use client";

import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const supabase = createPagesBrowserClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.replace("/admin/login");
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (!user) return <p>Loading...</p>;

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
