import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Entrar · Painel Bendita",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FEEFE1] px-4 py-12">
      <div className="w-full max-w-sm rounded-[1.75rem] bg-white p-8 shadow-[0_24px_60px_rgba(72,44,27,0.12)]">
        <Image src="/images/logo.png" alt="Bendita Banoffee" width={180} height={102} className="mx-auto h-auto w-40" priority />
        <h1 className="mt-6 text-center font-title text-3xl font-semibold text-[#482C1B]">
          Painel de atendimento
        </h1>
        <p className="mt-2 text-center text-sm text-[#482C1B]/60">Entre com o seu e-mail da equipe.</p>
        <LoginForm />
      </div>
    </div>
  );
}
