

// src/features/chatbot/chatbotThunk.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import chatbot from "@/lib/client/chatbotApi"
import { getErrorMessage } from "@/utils/apiErrorHandler";
import type {
  Persona,
  StartChatResponse,
  MessageResponse,
  ChatHistory,
} from "@/types/chatbot";

// ============================================
// 1️⃣ FETCH PERSONAS
// ============================================

export const fetchPersonasThunk = createAsyncThunk(
  "chatbot/fetchPersonas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatbot.get<{ personas: Persona[] }>(
        "/v1/Chatbot/user/personas"
      );

      return response.data.personas;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ============================================
// 2️⃣ START NEW CHAT
// ============================================

export const startNewChatThunk = createAsyncThunk(
  "chatbot/startChat",
  async (
    { personaName, userId }: { personaName: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await chatbot.post<StartChatResponse>(
        "/v1/Chatbot/user/start",
        {
          persona_name: personaName,
          user_id: userId,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ============================================
// 3️⃣ SEND MESSAGE
// ============================================

export const sendMessageThunk = createAsyncThunk(
  "chatbot/sendMessage",
  async (
    { sessionId, userMessage }: { sessionId: string; userMessage: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await chatbot.post<MessageResponse>(
        "/v1/Chatbot/user/message",
        {
          session_id: sessionId,
          user_message: userMessage,
        }
      );

      return {
        userMessage,
        botMessage: response.data.bot_message,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ============================================
// 4️⃣ GET CHAT HISTORY
// ============================================

export const getChatHistoryThunk = createAsyncThunk(
  "chatbot/getHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatbot.get<ChatHistory>(
        "/v1/Chatbot/user/history"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ============================================
// 5️⃣ END CHAT SESSION
// ============================================

export const endChatSessionThunk = createAsyncThunk(
  "chatbot/endSession",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      await chatbot.post("/v1/Chatbot/user/end-session", {
        session_id: sessionId,
      });

      return sessionId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);