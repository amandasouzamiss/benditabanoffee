"use client";

import { useActionState } from "react";
import { login } from "../actions";

const input =
  "mt-1.5 w-full rounded-xl border border-[#482C1B]/15 bg-[#FFF8F0] px-4 py-3 text-[#482C1B] outline-none transition focus:border-[#9C521B] focus:ring-2 focus:ring-[#9C521B]/20";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block text-sm font-semibold text-[#482C1B]">
        E-mail
        <input name="email" type="email" autoComplete="username" required className={input} />
      </label>
      <label className="block text-sm font-semibold text-[#482C1B]">
        Senha
        <input name="senha" type="password" autoComplete="current-password" required className={input} />
      </label>

      {state?.erro && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {state.erro}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#482C1B] px-6 py-3.5 font-bold text-white transition hover:bg-[#9C521B] disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
