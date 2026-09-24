"use client";

import { useMemo, useState } from "react";
import {
  site,
  cestaExtras,
  cestaOccasions,
  cestaSizes,
  orderLeadDays,
} from "../../data/site";
import {
  buildWhatsappUrl,
  CheckCard,
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

type Delivery = "retirada" | "entrega" | "";

export default function CestaConfigurator() {
  const [step, setStep] = useState(1);

  const [occasion, setOccasion] = useState("");
  const [size, setSize] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [customExtra, setCustomExtra] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [reference, setReference] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const minDate = useMemo(() => minOrderDate(orderLeadDays.cestas), []);
  const dateError = date && isClosedDay(date);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const toggleExtra = (id: string) =>
    setExtras((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    );

  const sizeLabel = cestaSizes.find((s) => s.id === size)?.label ?? "";
  const extrasLabels = extras
    .map((id) => {
      const base = cestaExtras.find((e) => e.id === id)?.label ?? id;
      if (id === "personalizado" && customExtra) return `${base} (${customExtra})`;
      return base;
    })
    .join(", ");

  const deliveryText =
    delivery === "entrega"
      ? `Entrega em ${[address, district, city].filter(Boolean).join(", ")}${
          reference ? ` — referência: ${reference}` : ""
        }`
      : "Retirada na loja";

  const addressComplete =
    delivery === "retirada" ||
    (delivery === "entrega" &&
      address.trim() &&
      district.trim() &&
      city.trim());

  const whatsappUrl = useMemo(
    () =>
      buildWhatsappUrl(site.ordersWhatsappNumber, [
        "*Encomenda — Cesta de café da manhã*",
        "",
        `🎁 Ocasião: ${occasion}`,
        `🧺 Tamanho: ${sizeLabel}`,
        extrasLabels && `✨ Extras: ${extrasLabels}`,
        `🚗 ${deliveryText}`,
        `📅 ${delivery === "entrega" ? "Entrega" : "Retirada"}: ${formatDatePtBr(date)}${
          time ? ` às ${time}` : ""
        }`,
        notes && `💬 Observações: ${notes}`,
        "",
        `👤 ${name}`,
        `📱 ${phone}`,
      ]),
    [
      occasion,
      sizeLabel,
      extrasLabels,
      deliveryText,
      delivery,
      date,
      time,
      notes,
      name,
      phone,
    ],
  );

  const summaryRows = [
    { label: "Ocasião", value: occasion },
    { label: "Tamanho", value: sizeLabel },
    extrasLabels && { label: "Extras", value: extrasLabels },
    {
      label: delivery === "entrega" ? "Entrega" : "Retirada",
      value: `${deliveryText}\n${formatDatePtBr(date)}${time ? ` • ${time}` : ""}`,
    },
    notes && { label: "Observações", value: notes },
    { label: "Contato", value: `${name}\n${phone}` },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <OrderLayout
      eyebrow="Encomenda de cesta"
      title={
        <>
          Monte a sua
          <span className="mt-1 block font-title italic font-normal text-[#9C521B]">
            cesta de café da manhã
          </span>
        </>
      }
      intro="Cinco passos e a gente já recebe tudo o que precisa para montar sua cesta. Valor e forma de pagamento são combinados pelo WhatsApp."
      backHref="/cestas"
      backLabel="Voltar para as cestas"
      step={Math.min(step, TOTAL_STEPS)}
      totalSteps={TOTAL_STEPS}
    >
      {step === 1 && (
        <Step stepKey={1}>
          <StepHeading title="Qual é a ocasião?" />
          <div className="grid gap-3 sm:grid-cols-2">
            {cestaOccasions.map((option) => (
              <OptionCard
                key={option}
                selected={occasion === option}
                onSelect={() => setOccasion(option)}
                title={option}
              />
            ))}
          </div>
          <StepNav showBack={false} onNext={next} nextDisabled={!occasion} />
        </Step>
      )}

      {step === 2 && (
        <Step stepKey={2}>
          <StepHeading
            title="Qual tamanho de cesta?"
            hint="Você pode ajustar os detalhes com a gente depois."
          />
          <div className="grid gap-3">
            {cestaSizes.map((option) => (
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
            title="Quer incluir algum extra?"
            hint="Opcional — selecione quantos quiser."
          />
          <div className="flex flex-wrap gap-2.5">
            {cestaExtras.map((extra) => (
              <CheckCard
                key={extra.id}
                checked={extras.includes(extra.id)}
                onToggle={() => toggleExtra(extra.id)}
                label={extra.label}
              />
            ))}
          </div>
          {extras.includes("personalizado") && (
            <div className="mt-5">
              <Field label="Qual item personalizado?">
                <TextInput
                  type="text"
                  placeholder="Ex.: caneca, chocolate específico, brinde…"
                  value={customExtra}
                  onChange={(e) => setCustomExtra(e.target.value)}
                />
              </Field>
            </div>
          )}
          <div className="mt-5">
            <Field label="Observações" optional>
              <TextArea
                placeholder="É surpresa? Mensagem para o cartão, restrição de item…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Field>
          </div>
          <StepNav onBack={back} onNext={next} />
        </Step>
      )}

      {step === 4 && (
        <Step stepKey={4}>
          <StepHeading
            title="Entrega ou retirada?"
            hint={`Encomendas de cesta com no mínimo ${orderLeadDays.cestas} dias de antecedência. Terça-feira a loja fica fechada.`}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <OptionCard
              selected={delivery === "retirada"}
              onSelect={() => setDelivery("retirada")}
              title="Retirar na loja"
              description="Travessa Ângelo Lorencet, 27 — Centro, Nova Prata"
            />
            <OptionCard
              selected={delivery === "entrega"}
              onSelect={() => setDelivery("entrega")}
              title="Entrega"
              description="Combinamos o valor do frete pelo WhatsApp"
            />
          </div>

          {delivery === "entrega" && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Endereço e número">
                  <TextInput
                    type="text"
                    autoComplete="street-address"
                    placeholder="Rua Exemplo, 123 — apto 4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Bairro">
                <TextInput
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </Field>
              <Field label="Cidade">
                <TextInput
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Ponto de referência" optional>
                  <TextInput
                    type="text"
                    placeholder="Perto de…, portão azul…"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </Field>
              </div>
            </div>
          )}

          {delivery && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label={delivery === "entrega" ? "Data da entrega" : "Data da retirada"}
              >
                <TextInput
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Field>
              <Field label="Horário">
                <TextInput
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Field>
            </div>
          )}

          {dateError && (
            <p className="mt-3 text-sm font-semibold text-[#9C521B]">
              A loja fica fechada às terças — escolha outro dia, por favor.
            </p>
          )}

          <StepNav
            onBack={back}
            onNext={next}
            nextDisabled={
              !delivery ||
              !addressComplete ||
              !date ||
              !time ||
              Boolean(dateError)
            }
          />
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
            nextDisabled={
              name.trim().length < 2 || phone.replace(/\D/g, "").length < 10
            }
          />
        </Step>
      )}

      {step > TOTAL_STEPS && (
        <Step stepKey="resumo">
          <SummaryCard rows={summaryRows} whatsappUrl={whatsappUrl} onBack={back} />
        </Step>
      )}
    </OrderLayout>
  );
}
