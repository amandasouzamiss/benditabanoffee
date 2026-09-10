"use client";

import { useMemo, useState } from "react";
import {
  site,
  eventGuestRanges,
  eventLocations,
  eventServices,
  eventTypes,
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

export default function EventoConfigurator() {
  const [step, setStep] = useState(1);

  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const minDate = useMemo(() => minOrderDate(orderLeadDays.eventos), []);
  const dateError = date && isClosedDay(date);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const toggleService = (id: string) =>
    setServices((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    );

  const locationInfo = eventLocations.find((l) => l.id === location);
  const guestsLabel = eventGuestRanges.find((g) => g.id === guests)?.label ?? "";
  const servicesLabels = services
    .map((id) => eventServices.find((s) => s.id === id)?.label ?? id)
    .join(", ");

  const locationText =
    location === "externo"
      ? `Vocês vão até: ${[address, district, city].filter(Boolean).join(", ")}`
      : locationInfo?.label ?? "";

  const locationComplete =
    location === "espaco" ||
    (location === "externo" && address.trim() && district.trim() && city.trim());

  const whatsappUrl = useMemo(
    () =>
      buildWhatsappUrl(site.ordersWhatsappNumber, [
        "*Encomenda — Evento*",
        "",
        `🎉 Tipo de evento: ${eventType}`,
        `📍 ${locationText}`,
        `📅 Data: ${formatDatePtBr(date)}`,
        guestsLabel && `👥 ${guestsLabel}`,
        servicesLabels && `🍰 O que imaginam: ${servicesLabels}`,
        notes && `💬 Observações: ${notes}`,
        "",
        `👤 ${name}`,
        `📱 ${phone}`,
      ]),
    [eventType, locationText, date, guestsLabel, servicesLabels, notes, name, phone],
  );

  const summaryRows = [
    { label: "Tipo de evento", value: eventType },
    { label: "Local", value: locationText },
    { label: "Data", value: formatDatePtBr(date) },
    guestsLabel && { label: "Convidados", value: guestsLabel },
    servicesLabels && { label: "O que imaginam", value: servicesLabels },
    notes && { label: "Observações", value: notes },
    { label: "Contato", value: `${name}\n${phone}` },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <OrderLayout
      eyebrow="Encomenda de evento"
      title={
        <>
          Monte o seu
          <span className="mt-1 block font-title italic font-normal text-[#9C521B]">
            evento com a Bendita
          </span>
        </>
      }
      intro="Cinco passos e a gente já recebe tudo o que precisa para planejar o seu evento. Valor e forma de pagamento são combinados pelo WhatsApp."
      backHref="/eventos"
      backLabel="Voltar para eventos"
      step={Math.min(step, TOTAL_STEPS)}
      totalSteps={TOTAL_STEPS}
    >
      {step === 1 && (
        <Step stepKey={1}>
          <StepHeading title="Qual é o tipo de evento?" />
          <div className="grid gap-3 sm:grid-cols-2">
            {eventTypes.map((option) => (
              <OptionCard
                key={option}
                selected={eventType === option}
                onSelect={() => setEventType(option)}
                title={option}
              />
            ))}
          </div>
          <StepNav showBack={false} onNext={next} nextDisabled={!eventType} />
        </Step>
      )}

      {step === 2 && (
        <Step stepKey={2}>
          <StepHeading
            title="Onde vai acontecer?"
            hint="A gente atende no espaço da Bendita ou vai até o local do seu evento."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {eventLocations.map((option) => (
              <OptionCard
                key={option.id}
                selected={location === option.id}
                onSelect={() => setLocation(option.id)}
                title={option.label}
                description={option.detail}
              />
            ))}
          </div>

          {location === "externo" && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Endereço e número">
                  <TextInput
                    type="text"
                    autoComplete="street-address"
                    placeholder="Rua Exemplo, 123 — salão de festas"
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
            </div>
          )}

          <StepNav
            onBack={back}
            onNext={next}
            nextDisabled={!location || !locationComplete}
          />
        </Step>
      )}

      {step === 3 && (
        <Step stepKey={3}>
          <StepHeading
            title="Quando e para quantas pessoas?"
            hint={`Eventos com no mínimo ${orderLeadDays.eventos} dias de antecedência. Terça-feira a loja fica fechada.`}
          />
          <div className="mb-6">
            <Field label="Data do evento">
              <TextInput
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
            {dateError && (
              <p className="mt-3 text-sm font-semibold text-[#9C521B]">
                A loja fica fechada às terças — escolha outro dia, por favor.
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {eventGuestRanges.map((option) => (
              <OptionCard
                key={option.id}
                selected={guests === option.id}
                onSelect={() => setGuests(option.id)}
                title={option.label}
              />
            ))}
          </div>

          <StepNav
            onBack={back}
            onNext={next}
            nextDisabled={!date || Boolean(dateError) || !guests}
          />
        </Step>
      )}

      {step === 4 && (
        <Step stepKey={4}>
          <StepHeading
            title="O que você imagina para o evento?"
            hint="Opcional — selecione quantos quiser."
          />
          <div className="flex flex-wrap gap-2.5">
            {eventServices.map((service) => (
              <CheckCard
                key={service.id}
                checked={services.includes(service.id)}
                onToggle={() => toggleService(service.id)}
                label={service.label}
              />
            ))}
          </div>
          <div className="mt-5">
            <Field label="Outras observações" optional>
              <TextArea
                placeholder="Tema da festa, restrições alimentares, horário de montagem…"
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
            hint="Usamos só para confirmar os detalhes do evento."
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
