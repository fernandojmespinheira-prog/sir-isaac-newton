"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { fetchAvailability, sendChat } from "@/services/chat-client";
import { GREETING, SUGGESTIONS } from "@/config/newton";
import { Message } from "./Message";

type Ui = ChatMessage;

export default function ChatView() {
  const [messages, setMessages] = useState<Ui[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [available, setAvailable] = useState(true);
  const scrollRef = useRef<HTMLElement>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { fetchAvailability().then(setAvailable).catch(() => {}); }, []);
  useEffect(() => { const el = scrollRef.current; el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" }); }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Ui[] = [...messages, { role: "user", content }];
    setMessages(next); setInput(""); setError(""); setLoading(true);
    if (areaRef.current) areaRef.current.style.height = "auto";
    try {
      const { reply } = await sendChat(next);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível obter a resposta. Tente novamente.");
    } finally { setLoading(false); }
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-parchment bg-ivory px-4 py-3 sm:px-8">
        <div className="min-w-0">
          <Link href="/" className="font-serif text-2xl font-semibold leading-none hover:text-gold-dark">Sir Isaac Newton</Link>
          <p className="mt-1 truncate text-xs text-stone">Simulação histórica por inteligência artificial</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 text-xs text-stone sm:flex">
            <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />{available ? "Disponível" : "Indisponível"}
          </span>
          <button onClick={() => { setMessages([]); setError(""); setInput(""); }}
            className="rounded-sm border border-gold px-3 py-1.5 text-sm text-gold-dark transition-colors hover:bg-parchment">Nova conversa</button>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div role="log" aria-live="polite" className="mx-auto flex max-w-3xl flex-col gap-7">
          <Message m={{ role: "assistant", content: GREETING }} />
          {messages.length === 0 && (
            <div className="ml-11 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="rounded-sm border border-parchment bg-parchment/50 px-3 py-2 text-left text-sm transition-colors hover:border-gold hover:bg-parchment">{s}</button>
              ))}
            </div>
          )}
          {messages.map((m, i) => <Message key={i} m={m} />)}
          {loading && <p className="ml-11 animate-pulse font-serif italic text-stone">Newton reflete sobre vossa questão…</p>}
          {error && <p role="alert" className="ml-11 text-sm text-red-800">{error}</p>}
        </div>
      </main>

      <footer className="border-t border-parchment bg-ivory px-4 pb-3 pt-3 sm:px-8">
        <form className="mx-auto flex max-w-3xl items-end gap-2" onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <label htmlFor="msg" className="sr-only">Sua pergunta ou reflexão</label>
          <textarea id="msg" ref={areaRef} rows={1} value={input} placeholder="Escreva sua pergunta ou compartilhe uma reflexão..."
            onChange={(e) => setInput(e.target.value)}
            onInput={(e) => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 160) + "px"; }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(input); } }}
            className="max-h-40 flex-1 resize-none rounded-sm border border-gold/60 bg-white/70 px-4 py-3 placeholder:text-stone" />
          <button type="submit" disabled={loading || !input.trim()}
            className="rounded-sm bg-ink px-5 py-3 text-ivory transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-40">Enviar</button>
        </form>
        <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-stone">Simulação baseada em IA. Não é uma comunicação real com a pessoa histórica.</p>
      </footer>
    </div>
  );
}
