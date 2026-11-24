/** Diagrama orbital em estilo de gravura (Kepler/Principia). Substituível por uma gravura real de Newton em /public. */
export function OrbitIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1" className={`text-gold-dark ${className}`}
      role="img" aria-label="Diagrama de órbita planetária em estilo de gravura">
      <circle cx="200" cy="200" r="190" strokeOpacity=".35" />
      <ellipse cx="185" cy="200" rx="150" ry="105" transform="rotate(-20 200 200)" />
      <ellipse cx="195" cy="200" rx="95" ry="62" transform="rotate(-20 200 200)" strokeOpacity=".6" />
      <path d="M30 200H370M200 30V370" strokeOpacity=".25" strokeDasharray="2 6" />
      <path d="M200 200L335 150L305 262Z" strokeOpacity=".7" />
      <circle cx="200" cy="200" r="9" fill="currentColor" />
      <circle cx="335" cy="150" r="5" fill="currentColor" />
      <text x="200" y="382" textAnchor="middle" fontSize="12" fill="currentColor" stroke="none" letterSpacing="3" className="font-serif">PRINCIPIA · MDCLXXXVII</text>
    </svg>
  );
}
