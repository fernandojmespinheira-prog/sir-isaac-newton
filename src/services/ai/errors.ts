/** Erros padronizados: qualquer provedor (Gemini, OpenAI...) deve lançá-los, e a rota os traduz para o estudante. */
export type AIErrorCode = "rate_limit" | "unavailable" | "config" | "blocked" | "unknown";

export class AIError extends Error {
  constructor(public code: AIErrorCode, detail?: string) { super(detail ?? code); }
}

export const ERROR_INFO: Record<AIErrorCode, { status: number; message: string }> = {
  rate_limit: { status: 429, message: "O limite de uso do serviço foi atingido no momento. Aguarde alguns instantes e tente novamente." },
  unavailable: { status: 503, message: "O serviço de inteligência artificial está temporariamente indisponível. Tente novamente em instantes." },
  config: { status: 500, message: "O serviço de conversa não está configurado corretamente. Avise o responsável pelo site." },
  blocked: { status: 422, message: "Não foi possível formular uma resposta para essa mensagem. Tente reformulá-la." },
  unknown: { status: 500, message: "Não foi possível obter a resposta. Tente novamente." },
};
