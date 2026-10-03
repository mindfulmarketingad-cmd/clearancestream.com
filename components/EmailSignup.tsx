"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { subscribe, type SubscribeState } from "@/app/subscribe/actions";
import { MailIcon } from "./Icons";

const initial: SubscribeState = { status: "idle", message: "" };
export const SUBSCRIBED_KEY = "cs-subscribed";

export function EmailSignup({ id, onSubscribed }: { id: string; onSubscribed?: () => void }) {
  const [state, action, pending] = useActionState(subscribe, initial);
  const [started, setStarted] = useState(0);
  useEffect(() => setStarted(Date.now()), []);

  useEffect(() => {
    if (state.status !== "ok") return;
    try {
      localStorage.setItem(SUBSCRIBED_KEY, "1");
    } catch {}
    onSubscribed?.();
  }, [state.status, onSubscribed]);

  if (state.status === "ok") {
    return (
      <p className="form-status ok" role="status">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="signup-form">
      <input type="hidden" name="t" value={started} />
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="signup-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <span className="signup-input">
          <MailIcon />
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </span>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Signing up..." : "Get deal alerts"}
        </button>
      </div>
      {state.status === "error" ? (
        <p className="form-status err" role="alert">
          {state.message}
        </p>
      ) : null}
      <p className="signup-fine">
        Free. Unsubscribe anytime. See our <Link href="/privacy">privacy policy</Link>.
      </p>
    </form>
  );
}
