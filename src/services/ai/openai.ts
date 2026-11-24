import type { AIProvider } from "@/types/chat";
// import OpenAI from "openai";            // 1) npm i openai
// import { SYSTEM_PROMPT } from "@/config/newton";

/** Provedor OpenAI — ainda NÃO implementado (nenhuma chamada real é feita). */
export const openaiProvider: AIProvider = {
  demo: false,
  async reply(/* messages */) {
    // 2) Descomente e remova o throw (e adicione `messages` aos parâmetros):
    // const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const r = await client.responses.create({
    //   model: process.env.OPENAI_MODEL ?? "gpt-4.1",
    //   instructions: SYSTEM_PROMPT,
    //   input: messages,
    // });
    // return r.output_text;
    throw new Error("Integração OpenAI ainda não implementada.");
  },
};
