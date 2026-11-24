import { ApiError, GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/config/newton";
import type { AIProvider, ChatMessage } from "@/types/chat";
import { AIError } from "./errors";

let client: GoogleGenAI | null = null;

/** Provedor Gemini. Roda só no servidor: a chave (GEMINI_API_KEY) nunca chega ao navegador. */
export const geminiProvider: AIProvider = {
  async reply(messages: ChatMessage[]) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new AIError("config", "GEMINI_API_KEY ausente");
    client ??= new GoogleGenAI({ apiKey });

    try {
      const res = await client.models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
        // O histórico inteiro vai a cada chamada: é assim que Newton "lembra" da conversa.
        contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
        config: { systemInstruction: SYSTEM_PROMPT, maxOutputTokens: 2048 },
      });
      const text = res.text?.trim();
      if (!text) throw new AIError("blocked", "resposta vazia ou bloqueada");
      return text;
    } catch (e) {
      if (e instanceof AIError) throw e;
      if (e instanceof ApiError) {
        if (e.status === 429) throw new AIError("rate_limit", e.message);
        if (e.status === 401 || e.status === 403 || e.status === 404 || /api key|model/i.test(e.message)) throw new AIError("config", e.message);
        if (e.status >= 500) throw new AIError("unavailable", e.message);
      }
      throw new AIError("unavailable", e instanceof Error ? e.message : String(e));
    }
  },
};
