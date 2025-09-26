import ENV from "@/env"
import Swal from "sweetalert2";

interface ErrorResponse{
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
}

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
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
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
    const resError: ErrorResponse = await res.json();

    Swal.fire({
      title: "Error",
      text: `API Error ${res.status}: ${resError.detail}`,
      icon: "error",
    });
    throw new Error(`APIg Error ${res.status}: ${resError.detail}`);
  }

  
  return res.json() as Promise<T>;
}
