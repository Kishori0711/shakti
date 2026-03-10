import { configureStore } from "@reduxjs/toolkit";
import chatbotReducer from "@/features/chatbot/chatbotSlice";

export const store = configureStore({
  reducer: {
  chatbot: chatbotReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
