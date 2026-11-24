# Sir Isaac Newton

Next.js (App Router) + React + TypeScript + Tailwind CSS 3. Páginas: `/` (início) e `/conversa` (chatbot).

## Executar localmente
    npm install
    cp .env.example .env.local
    npm run dev        # http://localhost:3000

Requer Node 18.18+ e internet na primeira execução (as fontes vêm do Google Fonts via next/font).

## Modo de demonstração (padrão)
Com `AI_MODE=demo`, `/api/chat` usa `src/services/ai/demo.ts`: respostas fixas, marcadas como fictícias na interface.

## Conectar a OpenAI depois
1. `npm i openai`
2. Em `.env.local`: `AI_MODE=openai`, `OPENAI_API_KEY=sk-...` (só no servidor; nunca use `NEXT_PUBLIC_`).
3. Em `src/services/ai/openai.ts`: descomente o código e remova o `throw`.
4. Ajuste a personalidade em `src/config/newton.ts` (`SYSTEM_PROMPT`).
5. Limites de uso: ponto marcado em `src/app/api/chat/route.ts`.

Nenhum outro arquivo (nem a interface) precisa mudar. O contexto da conversa já é enviado a cada requisição (últimas 20 mensagens).

## Mapa
- `src/app` — páginas e rota `/api/chat`
- `src/components` — ChatView, Message, OrbitIllustration
- `src/services` — `chat-client.ts` (navegador) e `ai/` (servidor: provedores)
- `src/config/newton.ts` — saudação, sugestões, prompt de sistema
- `src/types/chat.ts` — tipos e contrato `AIProvider`

## Hospedagem e incorporação no Google Sites

O app precisa de um servidor Node (a rota `/api/chat`), então hospede-o fora do Google Sites, por exemplo na Vercel:
1. Envie o projeto para um repositório no GitHub.
2. Na Vercel: *Add New → Project*, importe o repositório e, em *Environment Variables*, defina `AI_MODE=demo` (depois, as variáveis da OpenAI).
3. Após o deploy, você terá um endereço público em HTTPS, como `https://seu-projeto.vercel.app`. O site continua funcionando de forma independente nesse endereço.

### Incorporar com "Incorporar por URL"
1. No editor do Google Sites, abra a página desejada. No painel à direita, aba **Inserir**, clique em **Incorporar**.
2. Na aba **Por URL**, cole o endereço. Use `https://seu-projeto.vercel.app/conversa` para abrir direto no chat, ou apenas `https://seu-projeto.vercel.app` para começar pela página inicial. Clique em **Avançar**.
3. Escolha **Página inteira** (não "Visualização") e clique em **Inserir**.
4. Arraste as bordas do bloco para ocupar toda a largura e uma altura confortável (sugestão: 650 px ou mais). O chat se ajusta ao tamanho do bloco.
5. Clique em **Publicar** e teste no computador e no celular.

Toda a navegação (início → conversa) acontece dentro do próprio quadro; nenhuma janela nova é aberta.

### Segurança da incorporação
`next.config.js` envia `Content-Security-Policy: frame-ancestors` autorizando `'self'`, `sites.google.com`, `*.google.com` e `*.googleusercontent.com`. Nenhum `X-Frame-Options` é enviado (ele não permite lista de domínios e bloquearia o Google Sites). Outras origens não conseguem incorporar o site.

- **Seu Google Sites usa domínio próprio?** Adicione-o em `EMBED_ALLOWED_ORIGINS` (ex.: `https://www.meusite.com.br`) e faça novo deploy.
- **Quadro em branco ou "recusou-se a conectar"?** Abra o console do navegador (F12): a mensagem cita a origem bloqueada; inclua-a em `EMBED_ALLOWED_ORIGINS`. Se usar proxy ou CDN, confirme que ele não adiciona `X-Frame-Options`. Confira os cabeçalhos com `curl -I https://seu-projeto.vercel.app/conversa`.
- A conversa não usa cookies nem armazenamento do navegador, portanto não é afetada pelo bloqueio de cookies de terceiros.
