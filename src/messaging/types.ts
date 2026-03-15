import type { SocketMessageMap } from "@/types/messages/ws";

export type MessageType<T extends Record<string, any>> = keyof T;

export type MessagePayload<T extends Record<string, any>, K extends keyof T> = 
  T[K] extends { request: infer R } ? R : never;

export type MessageResponse<T extends Record<string, any>, K extends keyof T> = 
  T[K] extends { response: infer R } ? R : never;