import type { AIProvider } from "@/types/chat";
import { geminiProvider } from "./gemini";
import { openaiProvider } from "./openai";

/** Gemini é o padrão. Para trocar de provedor: AI_PROVIDER=openai (nenhuma mudança na interface). */
export function getProvider(): AIProvider {
  return process.env.AI_PROVIDER === "openai" ? openaiProvider : geminiProvider;
}
export function isConfigured(): boolean {
  return process.env.AI_PROVIDER === "openai" ? !!process.env.OPENAI_API_KEY : !!process.env.GEMINI_API_KEY;
}
