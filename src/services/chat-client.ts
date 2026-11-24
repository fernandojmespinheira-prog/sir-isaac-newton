import type { ChatMessage, ChatReply } from "@/types/chat";

/** Única porta de saída da interface. Não depende de nenhum provedor de IA. */
export async function sendChat(messages: ChatMessage[]): Promise<ChatReply> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: messages.map(({ role, content }) => ({ role, content })) }),
  });
  if (!res.ok) throw new Error("request failed");
  return res.json();
}
export async function fetchMode(): Promise<"demo" | "openai"> {
  return (await (await fetch("/api/chat")).json()).mode;
}
