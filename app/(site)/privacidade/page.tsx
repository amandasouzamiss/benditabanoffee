import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../../data/site";

const description =
  "Como a Bendita Banoffee trata os dados de quem usa o site, faz encomendas e conversa com a gente pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Política de Privacidade | Bendita Banoffee",
  description,
  alternates: { canonical: "/privacidade" },
  openGraph: {
    title: "Política de Privacidade | Bendita Banoffee",
    description,
    url: "/privacidade",
  },
};

const secoes = [
  {
    titulo: "Quais dados coletamos",
    itens: [
      "Encomendas pelo site (tortas, cestas e eventos): nome, telefone e os detalhes do pedido, como sabores, tamanho, data, endereço de entrega e observações.",
      "Conversas pelo WhatsApp: número de telefone, nome do perfil e as mensagens trocadas com a nossa equipe e com o nosso assistente automático.",
      "Navegação no site: dados de uso coletados pelo Google Analytics, como páginas visitadas, tipo de aparelho e cidade aproximada. Não usamos esses dados para identificar você.",
    ],
  },
  {
    titulo: "Para que usamos",
    itens: [
      "Responder suas mensagens, preparar e entregar suas encomendas e organizar eventos.",
      "Enviar informações que você pediu, como cardápio, horários e orçamentos.",
      "Entender como o site é usado para melhorá-lo.",
    ],
    texto:
      "Não vendemos seus dados e não enviamos mensagens promocionais pelo WhatsApp sem a sua permissão.",
  },
  {
    titulo: "Com quem compartilhamos",
    itens: [
      "Meta (WhatsApp Business Platform), que entrega as mensagens do WhatsApp.",
      "Vercel e Neon, que hospedam o site e o nosso sistema de atendimento.",
      "Google (Google Analytics), para as estatísticas de visita.",
      "Saipos, plataforma dos pedidos online — os pedidos feitos por lá seguem também a política deles.",
    ],
    texto: "Esses serviços só recebem o necessário para funcionar. Também podemos compartilhar dados quando a lei exigir.",
  },
  {
    titulo: "Por quanto tempo guardamos",
    texto:
      "Guardamos conversas e encomendas pelo tempo necessário para atender você e cumprir obrigações legais. Depois disso, ou quando você pedir, os dados são excluídos.",
  },
  {
    titulo: "Seus direitos",
    texto:
      "Pela Lei Geral de Proteção de Dados (LGPD), você pode a qualquer momento pedir para saber quais dados temos sobre você, corrigi-los ou excluí-los, e retirar o consentimento que deu.",
  },
];

export default function PrivacidadePage() {
  return (
    <section className="bg-[#FEEFE1] pb-24 pt-28 sm:pt-32">
      <div className="container-site">
        <div className="max-w-2xl">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9C521B] sm:text-xs">
            Privacidade
          </span>

          <h1 className="mt-4 text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[#482C1B] sm:text-5xl lg:text-6xl">
            Política de
            <span className="mt-1 block font-title italic font-normal text-[#9C521B]">privacidade</span>
          </h1>

          <p className="mt-6 text-base leading-8 text-[#482C1B]/70">
            A {site.name}, em Nova Prata/RS, cuida dos dados de quem usa o nosso site, faz encomendas e
            conversa com a gente pelo WhatsApp. Aqui explicamos o que coletamos e o que fazemos com isso.
          </p>
          <p className="mt-2 text-sm text-[#482C1B]/50">Atualizada em 3 de novembro de 2026.</p>

          <div className="mt-12 space-y-10 text-[#482C1B]">
            {secoes.map((secao) => (
              <div key={secao.titulo}>
                <h2 className="font-title text-3xl font-semibold">{secao.titulo}</h2>
                {secao.itens && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[#482C1B]/75">
                    {secao.itens.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {secao.texto && <p className="mt-4 leading-7 text-[#482C1B]/75">{secao.texto}</p>}
              </div>
            ))}

            <div id="exclusao" className="scroll-mt-28 rounded-3xl bg-white/70 p-6 sm:p-8">
              <h2 className="font-title text-3xl font-semibold">Como pedir a exclusão dos seus dados</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-[#482C1B]/75">
                <li>
                  Mande uma mensagem no WhatsApp{" "}
                  <Link href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#9C521B] underline">
                    {site.phone}
                  </Link>{" "}
                  pedindo a exclusão dos seus dados.
                </li>
                <li>Confirmamos o pedido pelo mesmo número.</li>
                <li>Em até 15 dias, apagamos suas conversas, encomendas e dados de contato do nosso sistema e avisamos você.</li>
              </ol>
            </div>

            <div>
              <h2 className="font-title text-3xl font-semibold">Fale com a gente</h2>
              <p className="mt-4 whitespace-pre-line leading-7 text-[#482C1B]/75">
                {site.address}
                {"\n"}WhatsApp {site.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
