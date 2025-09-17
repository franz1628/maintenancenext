import ENV from "@/env"
import Swal from "sweetalert2";

function getToken() {
  if (typeof window === "undefined") return null; // SSR
  return localStorage.getItem("token");
}

async function refreshToken(): Promise<string | null> {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) return null;

  try {
    const res = await fetch(`${ENV.API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data.token;
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${ENV.API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });


  if (res.status === 401) {
   
    Swal.fire({
      title: "Credentials Error",
      text: "Please log in again.",
      icon: "warning",
    });

  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  
  return res.json() as Promise<T>;
}
