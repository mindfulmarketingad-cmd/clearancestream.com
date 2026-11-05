"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, signUp, type AuthState } from "@/app/login/actions";

const initial: AuthState = { status: "idle", message: "" };

export function AuthForm({ mode, next }: { mode: "login" | "signup"; next: string }) {
  const action = mode === "login" ? signIn : signUp;
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="form">
      <input type="hidden" name="next" value={next} />
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          maxLength={72}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />
      </div>
      {state.message ? (
        <p className={state.status === "ok" ? "form-status ok" : "form-status err"} role={state.status === "ok" ? "status" : "alert"}>
          {state.message}
        </p>
      ) : null}
      <div>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
        </button>
      </div>
      <p className="muted" style={{ marginTop: 16, fontSize: 15 }}>
        {mode === "login" ? (
          <>
            New here? <Link href={`/signup?next=${encodeURIComponent(next)}`}>Create a free account</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href={`/login?next=${encodeURIComponent(next)}`}>Log in</Link>
          </>
        )}
      </p>
    </form>
  );
}
