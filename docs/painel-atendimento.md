# Painel de atendimento (substitui o Atendechat)

Endereço: `https://www.benditabanoffee.com.br/painel`

## O que tem na fase 1

- **Conversas**: mensagens do WhatsApp em tempo real (atualiza a cada poucos segundos), filtros
  (aguardando, em atendimento, com o robô), busca, respostas rápidas, **Assumir** e **Devolver ao robô**.
- **Robô** com menu: cardápio (link da Saipos), horários e endereço, encomendas, eventos e
  "falar com a equipe". Quando alguém da equipe responde, o robô para naquela conversa; se o cliente
  digitar `menu`, volta para o robô.
- **Contatos**: busca, etiquetas coloridas e anotações.
- **Encomendas do site**: tortas, cestas e eventos dos configuradores caem no painel (o cliente
  continua sendo levado ao WhatsApp como antes) e andam por etapas: nova → confirmada → em produção
  → pronta → entregue.

## Regra de 24 horas do WhatsApp

Pela regra da Meta, a empresa só pode mandar mensagem livre até 24h depois da última mensagem do
cliente. Depois disso o painel avisa e bloqueia o envio — o cliente precisa escrever de novo
(mensagens com modelo aprovado ficam para a fase 2).

## Configuração (uma vez)

1. **Banco de dados** — Vercel → projeto `benditabanoffee` → Storage → criar banco **Neon (Postgres)**
   e conectar ao projeto. Isso cria a variável `DATABASE_URL`. As tabelas são criadas sozinhas.
2. **Segredo da sessão** — Vercel → Settings → Environment Variables → `SESSION_SECRET`
   (gere com `openssl rand -base64 32`).
3. **Usuários do painel** — no computador, com a `DATABASE_URL` de produção:
   ```bash
   DATABASE_URL="..." npm run painel:usuario -- "Nome" email@exemplo.com "senha-forte"
   ```
4. **WhatsApp (API oficial)** — em developers.facebook.com:
   - criar um app do tipo **Empresa** ligado ao portfólio da **Bendita Banoffee** e adicionar o produto **WhatsApp**;
   - adicionar o número da Bendita e concluir a verificação da empresa no Meta Business;
   - criar um **usuário do sistema** com permissão no app e gerar um token permanente →
     `WHATSAPP_TOKEN`;
   - copiar o **Phone number ID** → `WHATSAPP_PHONE_NUMBER_ID` e o **App secret** →
     `WHATSAPP_APP_SECRET`;
   - em WhatsApp → Configuração → Webhook: URL
     `https://www.benditabanoffee.com.br/api/whatsapp/webhook`, token de verificação = o valor de
     `WHATSAPP_VERIFY_TOKEN`; assinar o campo **messages**.
5. Fazer um novo deploy na Vercel para carregar as variáveis.

## Desenvolvimento local

```bash
npm run painel:usuario -- "Teste" teste@bendita.local "uma-senha"
npm run dev
```

Sem variáveis configuradas, o painel usa o banco local `.data/pglite` e o WhatsApp fica em
**modo simulação** (as respostas aparecem no painel, mas não são enviadas).
