"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "../auth-actions";

const initialState = { error: "" };

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-1">
        <label htmlFor="email" className="text-sm font-semibold text-dark dark:text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-graymid/60 bg-white/80 px-4 py-3 text-base text-dark shadow-soft focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-white/5 dark:text-white"
          placeholder="admin@admin.com"
        />
      </div>
      <div className="grid gap-1">
        <label htmlFor="password" className="text-sm font-semibold text-dark dark:text-white">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="rounded-xl border border-graymid/60 bg-white/80 px-4 py-3 text-base text-dark shadow-soft focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-white/5 dark:text-white"
          placeholder="••••••"
        />
      </div>

      {state?.error ? <p className="text-sm text-red-500">{state.error}</p> : null}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-accent px-5 py-3 font-semibold text-[#111] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Signing in..." : "Login"}
    </button>
  );
}
