import AuthForm from "@/features/auth/components/AuthForm";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthForm />
      <hr />
    </main>
  );
}