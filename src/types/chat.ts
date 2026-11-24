export type Role = "user" | "assistant";
export interface ChatMessage { role: Role; content: string }
export interface ChatReply { reply: string }
/** Contrato que todo provedor de IA deve cumprir. A interface só conhece /api/chat, nunca o provedor. */
export interface AIProvider { reply(messages: ChatMessage[]): Promise<string> }
