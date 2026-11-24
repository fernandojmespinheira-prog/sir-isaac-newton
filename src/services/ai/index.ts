import type { AIProvider } from "@/types/chat";
import { demoProvider } from "./demo";
import { openaiProvider } from "./openai";

/** Só usa OpenAI se AI_MODE=openai E a chave existir no servidor. */
export function getMode(): "demo" | "openai" {
  return process.env.AI_MODE === "openai" && process.env.OPENAI_API_KEY ? "openai" : "demo";
}
export function getProvider(): AIProvider {
  return getMode() === "openai" ? openaiProvider : demoProvider;
}
