import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosError } from "axios";
import api from "@/lib/client/mainApi";

// ---- API response types
export type SendOtpResponse = {
  success: boolean;
  message: string;
};

export type TokenResponse = {
  access_token: string;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};

// (Type kept as-is; API call removed)
export type CurrentUserResponse = {
  id: string;
  email: string | null;
  phone: string | null;
  status: string;
  onboarding_complete: boolean;
  screening_complete: boolean;
  is_deleted: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  authProvider: string | null;
  deleted_at: string | null;
  profile_completion: number;
  created_at: string;
  updated_at: string;
  profile: {
    id: string;
    user_id: string;
    first_name: string | null;
    last_name: string | null;
    profile_photo_url: string | null;
    timezone: string | null;
    preferred_language: string | null;
    dob: string | null;
    career_stage: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  } | null;
  role: string[];
};

function getErrorMessage(err: unknown) {
  const error = err as AxiosError<{ message?: string; error?: string }>;
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong"
  );
}

/**
 * 1) Send Register OTP
 * POST /api/v1/auth/send-register-otp
 */
export const sendRegisterOtp = createAsyncThunk<
  SendOtpResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/sendRegisterOtp", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await api.post<SendOtpResponse>(
      "/api/v1/auth/send-register-otp",
      { email, password, role: "user" }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/**
 * 2) Verify OTP / Register
 * POST /api/v1/auth/register
 */
export const verifyRegisterOtp = createAsyncThunk<
  TokenResponse,
  { email: string; otp: string },
  { rejectValue: string }
>("auth/verifyRegisterOtp", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const res = await api.post<TokenResponse>("/api/v1/auth/register", {
      email,
      otp,
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/**
 * 3) Resend Register OTP
 * POST /api/v1/auth/resend-register-otp
 */
export const resendRegisterOtp = createAsyncThunk<
  SendOtpResponse,
  { email: string },
  { rejectValue: string }
>("auth/resendRegisterOtp", async ({ email }, { rejectWithValue }) => {
  try {
    const res = await api.post<SendOtpResponse>(
      "/api/v1/auth/resend-register-otp",
      { email }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/**
 * 4) Login
 * POST /api/v1/auth/login
 */
export const login = createAsyncThunk<
  TokenResponse,
  { email: string; password: string; rememberMe: boolean },
  { rejectValue: string }
>("auth/login", async (body, { rejectWithValue }) => {
  try {
    const res = await api.post<TokenResponse>("/api/v1/auth/login", body);
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/**
 * 5) Firebase
 * POST /api/v1/auth/firebase
 */
export const firebaseAuth = createAsyncThunk<
  TokenResponse,
  { idToken: string },
  { rejectValue: string }
>("auth/firebaseAuth", async ({ idToken }, { rejectWithValue }) => {
  try {
    const res = await api.post<TokenResponse>("/api/v1/auth/firebase", {
      idToken,
      role: "user",
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/**
 * 6) Google continue
 * POST /api/v1/auth/google
 */
export const googleAuth = createAsyncThunk<
  TokenResponse,
  { idToken: string },
  { rejectValue: string }
>("auth/googleAuth", async ({ idToken }, { rejectWithValue }) => {
  try {
    const res = await api.post<TokenResponse>("/api/v1/auth/google", {
      idToken,
      role: "user",
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/**
 * ✅ 7) Logout (FIXED)
 * POST /api/v1/auth/logout
 *
 * - Try logout with raw axios (no interceptors)
 * - If 401 -> refresh -> retry logout
 * - If refresh fails -> still resolve as logged out (UI logout)
 */
export const logout = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.post<LogoutResponse>(
      "/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    const e = err as AxiosError;

    if (e.response?.status === 401) {
      try {
        await axios.post(
          "/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );

        const res2 = await axios.post<LogoutResponse>(
          "/api/v1/auth/logout",
          {},
          { withCredentials: true }
        );

        return res2.data;
      } catch {
        // refresh failed => session already dead => treat as logged out
        return { success: true, message: "Logged out" };
      }
    }

    return rejectWithValue(getErrorMessage(err));
  }
});