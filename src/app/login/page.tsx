'use client';
import AuthForm from "@/features/auth/components/form";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).access_token : null;

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!localStorage.token && <AuthForm />}
      <hr />
    </main>
  );
}