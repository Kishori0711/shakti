export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    }
  )

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`)
  }

  return res.json()
}