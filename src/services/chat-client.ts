import type { ChatMessage, ChatReply } from "@/types/chat";

/** Única porta de saída da interface. Não depende de nenhum provedor de IA. */
export async function sendChat(messages: ChatMessage[]): Promise<ChatReply> {
  let res: Response;
  try {
    res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.map(({ role, content }) => ({ role, content })) }),
    });
  } catch {
    throw new Error("Sem conexão com o servidor. Verifique sua internet e tente novamente.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error ?? "Não foi possível obter a resposta. Tente novamente.");
  return data;
}

export async function fetchAvailability(): Promise<boolean> {
  return (await (await fetch("/api/chat")).json()).available;
}
