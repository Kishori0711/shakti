import { configureStore } from "@reduxjs/toolkit"
import chatbotReducer from "@/features/chatbot/chatbotSlice";
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
     auth: authReducer,
  }
})

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
