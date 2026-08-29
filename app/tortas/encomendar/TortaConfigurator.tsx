"use client";

import { useMemo, useState } from "react";
import { site, tortas, tortaSizes, orderLeadDays } from "../../data/site";
import {
  buildWhatsappUrl,
  Field,
  formatDatePtBr,
  isClosedDay,
  minOrderDate,
  OptionCard,
  OrderLayout,
  Step,
  StepHeading,
  StepNav,
  SummaryCard,
  TextArea,
  TextInput,
} from "../../components/order/OrderKit";

const TOTAL_STEPS = 5;
const flavorOptions = [...tortas.map((t) => t.name), "Ainda não decidi"];

export default function TortaConfigurator() {
  const [step, setStep] = useState(1);

  const [flavor, setFlavor] = useState("");
  const [size, setSize] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cakeMessage, setCakeMessage] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const minDate = useMemo(() => minOrderDate(orderLeadDays.tortas), []);
  const dateError = date && isClosedDay(date);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const sizeLabel = tortaSizes.find((s) => s.id === size)?.label ?? "";

  const whatsappUrl = useMemo(
    () =>
      buildWhatsappUrl(site.ordersWhatsappNumber, [
        "*Encomenda — Torta*",
        "",
        `🎂 Sabor: ${flavor}`,
        `📏 Tamanho: ${sizeLabel}`,
        `📅 Retirada: ${formatDatePtBr(date)}${time ? ` às ${time}` : ""}`,
        cakeMessage && `✍️ Mensagem na torta: "${cakeMessage}"`,
        restrictions && `⚠️ Restrições: ${restrictions}`,
        notes && `💬 Observações: ${notes}`,
        "",
        `👤 ${name}`,
        `📱 ${phone}`,
      ]),
    [flavor, sizeLabel, date, time, cakeMessage, restrictions, notes, name, phone],
  );

  const summaryRows = [
    { label: "Sabor", value: flavor },
    { label: "Tamanho", value: sizeLabel },
    {
      label: "Retirada",
      value: `${formatDatePtBr(date)}${time ? ` • ${time}` : ""}`,
    },
    cakeMessage && { label: "Mensagem na torta", value: cakeMessage },
    restrictions && { label: "Restrições", value: restrictions },
    notes && { label: "Observações", value: notes },
    { label: "Contato", value: `${name}\n${phone}` },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <OrderLayout
      eyebrow="Encomenda de torta"
      title={
        <>
          Monte a sua
          <span className="mt-1 block font-title italic font-normal text-[#9C521B]">
            torta encomendada
          </span>
        </>
      }
      intro="Quatro passos rápidos e a gente já recebe todos os detalhes. O valor e a confirmação da data são combinados pelo WhatsApp."
      backHref="/tortas"
      backLabel="Voltar para as tortas"
      step={Math.min(step, TOTAL_STEPS)}
      totalSteps={TOTAL_STEPS}
    >
      {step === 1 && (
        <Step stepKey={1}>
          <StepHeading
            title="Qual sabor você quer?"
            hint="Se ainda estiver em dúvida, escolha “Ainda não decidi” e a gente te ajuda."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {flavorOptions.map((option) => (
              <OptionCard
                key={option}
                selected={flavor === option}
                onSelect={() => setFlavor(option)}
                title={option}
                description={tortas.find((t) => t.name === option)?.description}
              />
            ))}
          </div>
          <StepNav showBack={false} onNext={next} nextDisabled={!flavor} />
        </Step>
      )}

      {step === 2 && (
        <Step stepKey={2}>
          <StepHeading
            title="Qual tamanho?"
            hint="Uma estimativa de fatias já ajuda — ajustamos com você depois."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {tortaSizes.map((option) => (
              <OptionCard
                key={option.id}
                selected={size === option.id}
                onSelect={() => setSize(option.id)}
                title={option.label}
                description={option.detail}
              />
            ))}
          </div>
          <StepNav onBack={back} onNext={next} nextDisabled={!size} />
        </Step>
      )}

      {step === 3 && (
        <Step stepKey={3}>
          <StepHeading
            title="Quando você quer retirar?"
            hint={`Encomendas de torta com no mínimo ${orderLeadDays.tortas} dias de antecedência. Terça-feira a loja fica fechada.`}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Data de retirada">
              <TextInput
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
            <Field label="Horário aproximado" optional>
              <TextInput
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Field>
          </div>
          {dateError && (
            <p className="mt-3 text-sm font-semibold text-[#9C521B]">
              A loja fica fechada às terças — escolha outro dia, por favor.
            </p>
          )}
          <StepNav
            onBack={back}
            onNext={next}
            nextDisabled={!date || Boolean(dateError)}
          />
        </Step>
      )}

      {step === 4 && (
        <Step stepKey={4}>
          <StepHeading
            title="Algum detalhe especial?"
            hint="Tudo opcional. Você também pode mandar fotos de referência direto na conversa."
          />
          <div className="grid gap-5">
            <Field label="Mensagem escrita na torta" optional>
              <TextInput
                type="text"
                maxLength={80}
                placeholder="Ex.: Parabéns, Vó Ana!"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
              />
            </Field>
            <Field label="Restrições alimentares" optional>
              <TextInput
                type="text"
                placeholder="Ex.: sem lactose, sem nozes"
                value={restrictions}
                onChange={(e) => setRestrictions(e.target.value)}
              />
            </Field>
            <Field label="Outras observações" optional>
              <TextArea
                placeholder="Cor, tema da festa, número de pessoas…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Field>
          </div>
          <StepNav onBack={back} onNext={next} />
        </Step>
      )}

      {step === 5 && (
        <Step stepKey={5}>
          <StepHeading
            title="Como a gente fala com você?"
            hint="Usamos só para confirmar a encomenda."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Seu nome">
              <TextInput
                type="text"
                autoComplete="name"
                placeholder="Nome e sobrenome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field label="WhatsApp">
              <TextInput
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(54) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Field>
          </div>
          <StepNav
            onBack={back}
            onNext={next}
            nextLabel="Ver resumo"
            nextDisabled={name.trim().length < 2 || phone.replace(/\D/g, "").length < 10}
          />
        </Step>
      )}

      {step > TOTAL_STEPS && (
        <Step stepKey="resumo">
          <SummaryCard
            rows={summaryRows}
            whatsappUrl={whatsappUrl}
            onBack={back}
          />
        </Step>
      )}
    </OrderLayout>
  );
}
