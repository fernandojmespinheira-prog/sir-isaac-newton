import type { AIProvider } from "@/types/chat";

/** Provedor de demonstração: não usa IA. Toda resposta é fixa e marcada como fictícia. */
export const demoProvider: AIProvider = {
  demo: true,
  async reply(messages) {
    await new Promise((r) => setTimeout(r, 900)); // simula o processamento
    const last = messages[messages.length - 1]?.content ?? "";
    return `[RESPOSTA DEMONSTRATIVA — texto fictício, não gerado por inteligência artificial]\n\nRecebi vossa questão: “${last.slice(0, 140)}”. Quando a integração com a IA estiver ativa, aqui surgirá uma resposta de Newton, com perguntas e explicações construídas a partir de vossa curiosidade.`;
  },
};
