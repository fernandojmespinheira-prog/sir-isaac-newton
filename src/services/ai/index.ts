import type { AIProvider } from "@/types/chat";
import { AIError } from "./errors";
import { geminiProvider } from "./gemini";
import { openaiProvider } from "./openai";

/** Provedor ativo: AI_PROVIDER (padrão "gemini"). Valor desconhecido é erro explícito: nunca há alternativa silenciosa. */
function providerName(): "gemini" | "openai" {
  const name = (process.env.AI_PROVIDER || "gemini").trim().toLowerCase();
  if (name === "gemini" || name === "openai") return name;
  throw new AIError("config", `AI_PROVIDER inválido: "${name}"`);
}

export function getProvider(): AIProvider {
  return providerName() === "openai" ? openaiProvider : geminiProvider;
}

export function isConfigured(): boolean {
  try {
    return providerName() === "openai" ? !!process.env.OPENAI_API_KEY : !!process.env.GEMINI_API_KEY;
  } catch {
    return false;
  }
}
