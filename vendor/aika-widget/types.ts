// Mirrors the Worker's response shapes. Kept in this package so the
// widget has zero runtime dependency on the worker package.

export interface AikaMessage {
  role: "user" | "assistant";
  content: string;
}

export type RouteKind = "BOOK_CALL" | "SEND_MESSAGE" | "READ_CASE_STUDY";

export interface AikaRoute {
  kind: RouteKind;
  path?: string;
}

export interface AikaChatResponse {
  message: string;
  route?: AikaRoute;
  turns_remaining: number;
  daily_remaining: number;
}
