export type Role = "user" | "assistant";
export interface ChatMessage { role: Role; content: string }
export interface ChatReply { reply: string; demo: boolean }
/** Contrato que todo provedor de IA deve cumprir. A interface só conhece /api/chat, nunca o provedor. */
export interface AIProvider { demo: boolean; reply(messages: ChatMessage[]): Promise<string> }
