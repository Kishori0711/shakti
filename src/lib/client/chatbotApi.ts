import axios from "axios";

const chatbotApi = axios.create({
  baseURL: "/api/chatbot", 
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default chatbotApi;