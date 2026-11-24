import type { ChatMessage } from "@/types/chat";

export function Message({ m }: { m: ChatMessage }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-wrap rounded-sm border border-parchment bg-white/60 px-4 py-3 leading-relaxed sm:max-w-[70%]">{m.content}</p>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <span aria-hidden className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold font-serif text-lg text-gold-dark">N</span>
      <div className="max-w-[90%] border-l border-gold/60 pl-4 sm:max-w-[75%]">
        <p className="font-serif text-lg font-semibold">
          Isaac Newton
        </p>
        <p className="mt-1 whitespace-pre-wrap text-[1.05rem] leading-[1.75]">{m.content}</p>
      </div>
    </div>
  );
}
