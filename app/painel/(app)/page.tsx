import { whatsappConfigurado } from "@/lib/whatsapp";
import Caixa from "./Caixa";

export default async function ConversasPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const inicial = Number(c) > 0 ? Number(c) : null;
  return <Caixa conversaInicial={inicial} simulacao={!whatsappConfigurado()} />;
}
