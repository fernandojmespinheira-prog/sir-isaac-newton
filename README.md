# Sir Isaac Newton

Next.js (App Router) + React + TypeScript + Tailwind CSS 3. Páginas: `/` (início) e `/conversa` (chatbot).

## Executar localmente
    npm install
    cp .env.example .env.local
    npm run dev        # http://localhost:3000

Requer Node 18.18+ e internet na primeira execução (as fontes vêm do Google Fonts via next/font).

## Google Gemini (mecanismo de resposta)
A rota `/api/chat` chama o Gemini pelo SDK oficial `@google/genai`, somente no servidor. Variáveis (veja `.env.example`):
- `GEMINI_API_KEY` (obrigatória) — nunca use o prefixo `NEXT_PUBLIC_` e nunca commite `.env.local`.
- `GEMINI_MODEL` (opcional, padrão `gemini-3.5-flash`) — troque aqui sem alterar código; confira o nome atual em https://ai.google.dev/gemini-api/docs/models.

Teste local: coloque a chave em `.env.local` e rode `npm run dev`.
Erros (limite de uso, indisponibilidade, configuração, resposta bloqueada) viram mensagens em português na conversa; os detalhes técnicos ficam só nos logs do servidor.

## Publicar novamente na Vercel
1. `npm install` (atualiza `package-lock.json`) e teste com `npm run dev`.
2. Na Vercel: *Project → Settings → Environment Variables* → adicione `GEMINI_API_KEY` (Production e Preview; opcionalmente `GEMINI_MODEL`).
3. Envie as mudanças: `git add . && git commit -m "Integra Gemini" && git push`. A Vercel faz o deploy automaticamente.
4. Variáveis só valem em deploys novos: se você as criou depois do deploy, use *Deployments → ⋯ → Redeploy*.
5. Verifique: abra `/api/chat` (deve mostrar `{"available":true}`) e envie uma pergunta em `/conversa`. Sem Git: `npx vercel --prod`.

## Trocar de provedor (ex.: OpenAI)
Implemente `src/services/ai/openai.ts` (há um esqueleto comentado), rode `npm i openai`, defina `AI_PROVIDER=openai` e `OPENAI_API_KEY`. A interface, a rota e o prompt (`src/config/newton.ts`) não mudam. Limites de uso por IP: ponto marcado em `src/app/api/chat/route.ts`.

## Hospedagem e incorporação no Google Sites

O app precisa de um servidor Node (a rota `/api/chat`), então hospede-o fora do Google Sites, por exemplo na Vercel:
1. Envie o projeto para um repositório no GitHub.
2. Na Vercel: *Add New → Project*, importe o repositório e, em *Environment Variables*, defina `GEMINI_API_KEY`.
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
