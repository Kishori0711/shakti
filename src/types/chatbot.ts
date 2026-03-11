// src/types/chatbot.ts

export interface Persona {
  name: string
  slug: string
  tagline: string
  tone: string
  traits: string[]
}

export interface StartChatResponse {
  session_id: string
  persona_name: string
  greeting: string
  created_at: string
}

export interface MessageResponse {
  session_id: string
  bot_message: string
  status: string
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface ChatHistory {
  session_id: string
  persona_name: string
  messages: Message[]
}

export interface ChatbotState {
  // Personas
  personas: Persona[]
  personasLoading: boolean
  personasError: string | null

  // Current Session
  sessionId: string | null
  currentPersona: Persona | null
  greeting: string | null

  // Messages
  messages: Message[]
  messageLoading: boolean
  messageError: string | null

  // History
  history: ChatHistory | null
  historyLoading: boolean
}