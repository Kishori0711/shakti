import { Persona, Message, ChatHistory } from "@/types/chatbot"

export interface ChatbotState {
  personas: Persona[]
  personasLoading: boolean
  personasError: string | null

  sessionId: string | null
  currentPersona: Persona | null
  greeting: string | null

  messages: Message[]
  messageLoading: boolean
  messageError: string | null

  history: ChatHistory | null
  historyLoading: boolean
}