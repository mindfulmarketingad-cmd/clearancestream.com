"use client";

import { useActionState, useEffect, useState } from "react";
import { sendContact, type ContactState } from "./actions";

const initial: ContactState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const [started, setStarted] = useState(0);
  // Set after hydration so server and client markup match.
  useEffect(() => setStarted(Date.now()), []);

  if (state.status === "ok") {
    return (
      <p className="form-status ok" role="status">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="form">
      <input type="hidden" name="t" value={started} />
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="topic">Topic</label>
        <select id="topic" name="topic" defaultValue="general" required>
          <option value="general">General question</option>
          <option value="listing">Report a listing or price issue</option>
          <option value="brand">Suggest a brand to track</option>
          <option value="partnership">Partnership</option>
          <option value="privacy">Privacy request</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required minLength={10} maxLength={5000} />
      </div>
      {state.status === "error" ? (
        <p className="form-status err" role="alert">
          {state.message}
        </p>
      ) : null}
      <div>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
