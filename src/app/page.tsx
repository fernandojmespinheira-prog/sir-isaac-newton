import Link from "next/link";
import { OrbitIllustration } from "@/components/OrbitIllustration";

const AREAS = [
  ["Física e Filosofia Natural", "Movimento, forças e gravitação."],
  ["Matemática", "A linguagem com que a natureza se deixa descrever."],
  ["Astronomia", "Órbitas, cometas e o sistema do mundo."],
  ["História da Ciência", "O contexto das ideias e de quem as formulou."],
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-14 px-6 py-12">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="font-serif text-5xl font-semibold md:text-6xl">Sir Isaac Newton</h1>
          <p className="mt-2 font-serif text-xl italic text-stone">Um encontro entre a curiosidade, a ciência e o pensamento.</p>
          <p className="mt-8 font-serif text-2xl leading-snug">“A natureza se revela àqueles que se dedicam a investigá-la.”</p>
          <p className="mt-5 max-w-md leading-relaxed text-stone">
            Converse com uma simulação histórica de Isaac Newton. Ele pergunta, argumenta e investiga com você os fenômenos da natureza, passo a passo.
          </p>
          <Link href="/conversa" className="mt-8 inline-block rounded-sm bg-ink px-7 py-3 text-ivory transition-colors hover:bg-gold-dark">
            Iniciar conversa
          </Link>
        </div>
        <OrbitIllustration className="mx-auto w-full max-w-sm" />
      </div>
      <ul className="grid gap-6 border-t border-gold/50 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {AREAS.map(([title, text]) => (
          <li key={title}>
            <h2 className="font-serif text-xl font-semibold">{title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-stone">{text}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-stone">Simulação baseada em inteligência artificial, sem qualquer comunicação real com a pessoa histórica.</p>
    </main>
  );
}
