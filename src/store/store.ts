import { configureStore } from "@reduxjs/toolkit"
import chatbotReducer from "@/features/chatbot/chatbotSlice";
import eventsReducer from "@/features/events/events.slice";
import authReducer from "../features/auth/authSlice"
import profileForgotPasswordReducer from "@/features/profileForgotPassword/profileForgotPasswordSlice"
import profileReducer from "@/features/profile/profileSlice";
import languageReducer from "@/features/language/languageSlice";

export const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
     auth: authReducer,
     profileForgotPassword: profileForgotPasswordReducer,
     profile: profileReducer, 
     language:languageReducer,
     events: eventsReducer,
  }
})

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
