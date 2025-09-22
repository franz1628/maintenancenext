import { apiFetch } from "@/config/api";

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResponse {
    data: {
        access_token: string;
        refreshToken?: string;
        user: { id: number; name: string; email: string };
    };
    meta: {
        timestamp: string; 
        path: string;
    };
}

export async function login(data: LoginInput): Promise<AuthResponse> {
  const res = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  localStorage.setItem("user", JSON.stringify(res.data));
  if (res.data.refreshToken) localStorage.setItem("refreshToken", res.data.refreshToken);

  return res;
}
