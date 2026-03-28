import { cookies } from "next/headers";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_MAIN_API;

  if (!baseUrl) {
    throw new Error("API base URL missing");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let errorMessage = `API Error: ${res.status}`;

    try {
      const errorData = await res.json();
      console.error("API ERROR RESPONSE:", errorData);
      errorMessage =
        errorData?.message ||
        errorData?.error ||
        `API Error: ${res.status}`;
    } catch {
      const errorText = await res.text();
      console.error("API ERROR RESPONSE:", errorText);
      errorMessage = errorText || `API Error: ${res.status}`;
    }

    throw new Error(errorMessage);
  }

  return res.json();
}