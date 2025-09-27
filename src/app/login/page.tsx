"use client";

import AuthForm from "@/features/auth/components/form";
import { useEffect, useState } from "react";


export default function Login() {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  if (hasToken === null) return null; // evita parpadeo en SSR

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!hasToken && <AuthForm />}
      <hr />
    </main>
  );
}
