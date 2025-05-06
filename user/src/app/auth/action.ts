"use server"
import { cookies } from "next/headers";

// Set a cookie
export async function setCookie(name: string, value: string) {
  (await cookies()).set({
    name,
    value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });
}

// Get a cookie
export async function getCookie(name: string): Promise<string | undefined> {
  const cookie = (await cookies()).get(name);
  return cookie?.value;
}

// Delete a cookie
export async function deleteCookie(name: string) {
  (await cookies()).delete(name);
}
