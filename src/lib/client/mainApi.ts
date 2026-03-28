import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue: {
  resolve: () => void;
  reject: (error: AxiosError) => void;
}[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// ✅ Auth routes jahan refresh token call nahi hona chahiye
const AUTH_ROUTES = [
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/send-register-otp",
  "/api/v1/auth/resend-register-otp",
  "/api/v1/auth/refresh",
  "/api/v1/auth/logout",
  "/api/v1/auth/firebase",
  "/api/v1/auth/google",
];

const isAuthRoute = (url?: string): boolean => {
  if (!url) return false;
  return AUTH_ROUTES.some((route) => url.includes(route));
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRoute(originalRequest.url) // ✅ Auth routes skip
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          "/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );

        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;