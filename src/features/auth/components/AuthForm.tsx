"use client";
import { use, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Login
      </button>
    </form>
  );
}