import "server-only";
import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  return !!token;
}