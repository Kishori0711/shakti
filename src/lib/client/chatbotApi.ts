import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import authApi from "./mainApi";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const chatbotApi = axios.create({
  baseURL: "/chatbot",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

chatbotApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await authApi.post("/api/v1/auth/refresh");

        // retry original request
        return chatbotApi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed → logout user");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default chatbotApi;