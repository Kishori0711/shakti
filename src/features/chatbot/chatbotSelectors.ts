import { RootState } from "@/store/store";

export const selectPersonas = (state: RootState) => state.chatbot.personas;

export const selectMessages = (state: RootState) => state.chatbot.messages;

export const selectSessionId = (state: RootState) => state.chatbot.sessionId;

export const selectMessageLoading = (state: RootState) =>
  state.chatbot.messageLoading;

export const selectCurrentPersona = (state: RootState) =>
  state.chatbot.currentPersona;

export const selectChatLoading = (state: RootState) =>
  state.chatbot.messageLoading;
