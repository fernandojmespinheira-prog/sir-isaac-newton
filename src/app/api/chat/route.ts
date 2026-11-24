import { NextResponse } from "next/server";
import { getProvider, isConfigured } from "@/services/ai";
import { AIError, ERROR_INFO } from "@/services/ai/errors";
import type { ChatMessage, ChatReply } from "@/types/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30; // segundos (Vercel)

const MAX_TURNS = 20; // contexto enviado ao modelo
const MAX_CHARS = 2000;

export async function GET() {
  return NextResponse.json({ available: isConfigured() });
}

export async function POST(req: Request) {
  // FUTURO: limite de uso por IP/sessão (ex.: Upstash Ratelimit) antes de chamar o provedor.
  let messages: ChatMessage[];
  try {
    const body = await req.json();
    if (!Array.isArray(body?.messages)) throw new Error("bad");
    messages = body.messages.slice(-MAX_TURNS).map((m: ChatMessage) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content ?? "").slice(0, MAX_CHARS),
    }));
    while (messages[0]?.role === "assistant") messages.shift(); // o histórico deve começar pelo estudante
    if (!messages.length || messages[messages.length - 1].role !== "user") throw new Error("bad");
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  try {
    const reply = await getProvider().reply(messages);
    return NextResponse.json<ChatReply>({ reply });
  } catch (e) {
    const code = e instanceof AIError ? e.code : "unknown";
    console.error("[api/chat]", code, e instanceof Error ? e.message : e); // só nos logs do servidor
    const { status, message } = ERROR_INFO[code];
    return NextResponse.json({ error: message }, { status });
  }
}
