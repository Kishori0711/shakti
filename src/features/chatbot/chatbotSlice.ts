import { createSlice } from "@reduxjs/toolkit"
import { ChatbotState } from "./chatbotTypes"
import {
  fetchPersonasThunk,
  startNewChatThunk,
  sendMessageThunk,
  getChatHistoryThunk,
  endChatSessionThunk,
} from "./chatbotThunk"

const initialState: ChatbotState = {
  personas: [],
  personasLoading: false,
  personasError: null,

  sessionId: null,
  currentPersona: null,
  greeting: null,

  messages: [],
  messageLoading: false,
  messageError: null,

  history: null,
  historyLoading: false,
}

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,

  reducers: {
    resetChat: (state) => {
      state.sessionId = null
      state.currentPersona = null
      state.greeting = null
      state.messages = []
      state.messageError = null
    },

    clearMessages: (state) => {
      state.messages = []
    },
  },

  extraReducers: (builder) => {
    builder

      // personas
      .addCase(fetchPersonasThunk.pending, (state) => {
        state.personasLoading = true
        state.personasError = null
      })
      .addCase(fetchPersonasThunk.fulfilled, (state, action) => {
        state.personasLoading = false
        state.personas = action.payload
      })
      .addCase(fetchPersonasThunk.rejected, (state, action) => {
        state.personasLoading = false
        state.personasError = action.payload as string
      })

      // start chat
      .addCase(startNewChatThunk.fulfilled, (state, action) => {
        state.sessionId = action.payload.session_id
        state.greeting = action.payload.greeting

        const selectedPersona = state.personas.find(
          (p) => p.slug === action.payload.persona_name
        )

        state.currentPersona = selectedPersona || null

        state.messages = [
          {
            id: "greeting-" + Date.now(),
            role: "assistant",
            content: action.payload.greeting,
            timestamp: new Date().toISOString(),
          },
        ]
      })

      // send message - PENDING (user message add karo)
      .addCase(sendMessageThunk.pending, (state, action) => {
        state.messageLoading = true
        
        // User ka message immediately display ho jaye
        state.messages.push({
          id: "user-" + Date.now(),
          role: "user",
          content: action.meta.arg.userMessage,
          timestamp: new Date().toISOString(),
        })
      })
      
      // send message - FULFILLED (AI response add karo)
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.messageLoading = false

        state.messages.push({
          id: "assistant-" + Date.now(),
          role: "assistant",
          content: action.payload.botMessage,
          timestamp: new Date().toISOString(),
        })
      })

      .addCase(sendMessageThunk.rejected, (state) => {
        state.messageLoading = false
      })

      // history
      .addCase(getChatHistoryThunk.pending, (state) => {
        state.historyLoading = true
      })
      .addCase(getChatHistoryThunk.fulfilled, (state, action) => {
        state.historyLoading = false
        state.history = action.payload
      })

      // end session
      .addCase(endChatSessionThunk.fulfilled, (state) => {
        state.sessionId = null
        state.currentPersona = null
        state.messages = []
        state.greeting = null
      })
  },
})

export const { resetChat, clearMessages } = chatbotSlice.actions
export default chatbotSlice.reducer