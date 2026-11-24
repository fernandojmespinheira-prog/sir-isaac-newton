import { NextResponse } from "next/server";
import { getMode, getProvider } from "@/services/ai";
import type { ChatMessage, ChatReply } from "@/types/chat";

const MAX_TURNS = 20; // contexto enviado ao modelo
const MAX_CHARS = 2000;

export async function GET() {
  return NextResponse.json({ mode: getMode() });
}

export async function POST(req: Request) {
  // FUTURO: limite de uso por IP/sessão (ex.: Upstash Ratelimit) antes de chamar o provedor.
  try {
    const body = await req.json();
    if (!Array.isArray(body?.messages)) throw new Error("bad");
    const messages: ChatMessage[] = body.messages.slice(-MAX_TURNS).map((m: ChatMessage) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content ?? "").slice(0, MAX_CHARS),
    }));
    if (!messages.length || messages[messages.length - 1].role !== "user") throw new Error("bad");
    const provider = getProvider();
    const reply = await provider.reply(messages);
    return NextResponse.json<ChatReply>({ reply, demo: provider.demo });
  } catch {
    return NextResponse.json({ error: "Não foi possível obter a resposta." }, { status: 500 });
  }
}
