/**
 * Incorporação em iframe (Google Sites).
 * - Usamos CSP `frame-ancestors` (e NÃO X-Frame-Options, que não aceita lista de domínios).
 * - Domínios extras (ex.: domínio próprio do seu Google Sites): EMBED_ALLOWED_ORIGINS="https://meusite.com.br https://www.meusite.com.br"
 */
const extra = (process.env.EMBED_ALLOWED_ORIGINS || "").split(/[\s,]+/).filter(Boolean);
const ancestors = ["'self'", "https://sites.google.com", "https://*.google.com", "https://*.googleusercontent.com", ...extra].join(" ");

/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: `frame-ancestors ${ancestors}` },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    }];
  },
};
