"use client";
import { use, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import { LockClosedIcon } from "@heroicons/react/16/solid";

export default function AuthForm() {
  const { email, setEmail, password, setPassword, postLogin, loading, success } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await postLogin(email, password);

    if(res){
        router.push("/dashboard");
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        text="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <Input
        type="password"
        text="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded flex items-center justify-center cursor-pointer hover:bg-blue-600" disabled={loading}>
        <LockClosedIcon className="h-6 w-6 text-white inline-block mr-2" />
        Login
      </button>
    </form>
  );
}