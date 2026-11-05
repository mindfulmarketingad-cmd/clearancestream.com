"use server";

import { redirect } from "next/navigation";
import { safeNext } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { SITE } from "@/lib/site";

export type AuthState = { status: "idle" | "ok" | "error"; message: string };

const unavailable: AuthState = {
  status: "error",
  message: "Accounts are not connected yet. The site owner still needs to add the Supabase URL and publishable key.",
};

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? ""));
  if (!email || password.length < 8) return { status: "error", message: "Enter the email and password for your account." };

  const supabase = await createClient();
  if (!supabase) return unavailable;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { status: "error", message: "Email or password is incorrect." };
  redirect(next);
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? ""));
  if (!email || !email.includes("@")) return { status: "error", message: "Enter a valid email address." };
  if (password.length < 8 || password.length > 72) return { status: "error", message: "Use a password between 8 and 72 characters." };

  const supabase = await createClient();
  if (!supabase) return unavailable;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${SITE.url}/auth/callback?next=${encodeURIComponent(next)}` },
  });
  if (error) return { status: "error", message: "Could not create that account. If you already signed up, log in instead." };
  if (data.session) redirect(next);
  return { status: "ok", message: "Check your email for a confirmation link, then log in to see deals and promotions." };
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}
