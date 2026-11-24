import type { AIProvider } from "@/types/chat";
import { AIError } from "./errors";
// import OpenAI from "openai";            // 1) npm i openai
// import { SYSTEM_PROMPT } from "@/config/newton";

/** Provedor OpenAI — ainda NÃO implementado. Ative com AI_PROVIDER=openai depois de implementar. */
export const openaiProvider: AIProvider = {
  async reply(/* messages */) {
    // 2) Descomente, adicione `messages` aos parâmetros e remova o throw:
    // const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const r = await client.responses.create({
    //   model: process.env.OPENAI_MODEL ?? "gpt-4.1",
    //   instructions: SYSTEM_PROMPT,
    //   input: messages,
    // });
    // return r.output_text;
    throw new AIError("config", "Provedor OpenAI ainda não implementado.");
  },
};
