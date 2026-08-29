"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { orderClosedWeekdays } from "../../data/site";

/* ————————————————————————————————————————————————
   Helpers
———————————————————————————————————————————————— */

export function buildWhatsappUrl(
  number: string,
  lines: Array<string | false | null | undefined>,
): string {
  const text = lines.filter(Boolean).join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Data (YYYY-MM-DD) mínima para encomenda, somando os dias de antecedência. */
export function minOrderDate(leadDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + leadDays);
  return d.toISOString().slice(0, 10);
}

export function isClosedDay(isoDate: string): boolean {
  if (!isoDate) return false;
  // Interpreta como data local, sem fuso.
  const [y, m, day] = isoDate.split("-").map(Number);
  const weekday = new Date(y, m - 1, day).getDay();
  return orderClosedWeekdays.includes(weekday);
}

export function formatDatePtBr(isoDate: string): string {
  if (!isoDate) return "";
  const [y, m, day] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, day);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

/* ————————————————————————————————————————————————
   Layout
———————————————————————————————————————————————— */

export function OrderLayout({
  eyebrow,
  title,
  intro,
  backHref,
  backLabel,
  step,
  totalSteps,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  backHref: string;
  backLabel: string;
  step: number;
  totalSteps: number;
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#FEEFE1] pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#F1DCC9]/60 blur-[130px]" />

      <div className="container-site relative">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#482C1B]/60 transition hover:text-[#9C521B]"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>

        <div className="mt-6 max-w-2xl">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
            {eyebrow}
          </span>

          <h1 className="mt-4 text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[#482C1B] sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-5 text-base leading-8 text-[#482C1B]/70">{intro}</p>
        </div>

        <div className="mt-10">
          <ProgressBar step={step} totalSteps={totalSteps} />
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-[#482C1B]/10 bg-[#FFFAF5] p-6 shadow-[0_20px_60px_rgba(72,44,27,0.08)] sm:mt-10 sm:p-9 lg:p-11">
          {children}
        </div>
      </div>
    </section>
  );
}

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  const pct = Math.round((step / totalSteps) * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#482C1B]/55">
        <span>
          Passo {step} de {totalSteps}
        </span>
        <span>{pct}%</span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#482C1B]/10">
        <motion.div
          className="h-full rounded-full bg-[#9C521B]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————
   Step primitives
———————————————————————————————————————————————— */

export function Step({
  stepKey,
  children,
}: {
  stepKey: string | number;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function StepHeading({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#482C1B] sm:text-3xl">
        {title}
      </h2>
      {hint && (
        <p className="mt-2 text-sm leading-6 text-[#482C1B]/60">{hint}</p>
      )}
    </div>
  );
}

export function OptionCard({
  selected,
  onSelect,
  title,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-start gap-4 rounded-[1.25rem] border p-5 text-left transition duration-200 ${
        selected
          ? "border-[#9C521B] bg-[#9C521B]/[0.06] shadow-[0_10px_30px_rgba(156,82,27,0.12)]"
          : "border-[#482C1B]/12 bg-white hover:border-[#9C521B]/40 hover:bg-[#9C521B]/[0.03]"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          selected
            ? "border-[#9C521B] bg-[#9C521B] text-white"
            : "border-[#482C1B]/25 bg-transparent text-transparent"
        }`}
      >
        <Check size={13} strokeWidth={3} />
      </span>

      <span>
        <span className="block font-semibold text-[#482C1B]">{title}</span>
        {description && (
          <span className="mt-1 block text-sm leading-6 text-[#482C1B]/60">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

export function CheckCard({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className={`flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 ${
        checked
          ? "border-[#9C521B] bg-[#9C521B] text-white"
          : "border-[#482C1B]/15 bg-white text-[#482C1B]/75 hover:border-[#9C521B]/40"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          checked ? "border-white bg-white/20 text-white" : "border-[#482C1B]/30 text-transparent"
        }`}
      >
        <Check size={11} strokeWidth={3} />
      </span>
      {label}
    </button>
  );
}

export function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-[#482C1B]">
        {label}
        {optional && (
          <span className="text-xs font-normal text-[#482C1B]/45">
            (opcional)
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

const fieldClasses =
  "w-full rounded-[0.9rem] border border-[#482C1B]/15 bg-white px-4 py-3 text-[#482C1B] outline-none transition placeholder:text-[#482C1B]/35 focus:border-[#9C521B] focus:ring-2 focus:ring-[#9C521B]/15";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={fieldClasses} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${fieldClasses} min-h-[96px] resize-y`} />;
}

export function StepNav({
  onBack,
  onNext,
  nextLabel = "Continuar",
  nextDisabled,
  showBack = true,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#482C1B]/60 transition hover:text-[#9C521B]"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      ) : (
        <span />
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#482C1B] px-6 py-3 font-bold text-white transition duration-200 hover:bg-[#9C521B] disabled:cursor-not-allowed disabled:opacity-35"
      >
        {nextLabel}
        <ArrowRight size={17} />
      </button>
    </div>
  );
}

/* ————————————————————————————————————————————————
   Resumo final
———————————————————————————————————————————————— */

export function SummaryCard({
  rows,
  whatsappUrl,
  onBack,
}: {
  rows: Array<{ label: string; value: string }>;
  whatsappUrl: string;
  onBack: () => void;
}) {
  return (
    <div>
      <StepHeading
        title="Tudo certo? É só enviar"
        hint="Revise os detalhes abaixo. Ao enviar, abrimos uma conversa no WhatsApp com tudo preenchido — a confirmação final (valor, disponibilidade da data e forma de pagamento) é feita por lá."
      />

      <dl className="divide-y divide-[#482C1B]/10 overflow-hidden rounded-[1.25rem] border border-[#482C1B]/12 bg-white">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:gap-4"
          >
            <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[#482C1B]/45">
              {row.label}
            </dt>
            <dd className="whitespace-pre-line text-sm leading-6 text-[#482C1B]">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#482C1B]/60 transition hover:text-[#9C521B]"
        >
          <ArrowLeft size={16} />
          Ajustar
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 py-4 font-bold text-white shadow-[0_16px_40px_rgba(37,211,102,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#20c45a] sm:w-auto"
        >
          Enviar encomenda pelo WhatsApp
          <ArrowUpRight
            size={19}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <p className="mt-4 text-center text-xs text-[#482C1B]/50 sm:text-right">
        Sem pagamento agora. Você confirma tudo na conversa.
      </p>
    </div>
  );
}
