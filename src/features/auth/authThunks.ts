import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
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
 * body: { email, password, role: "user" }
 */
export const sendRegisterOtp = createAsyncThunk<
  SendOtpResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/sendRegisterOtp", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await api.post<SendOtpResponse>(
      "/api/v1/auth/send-register-otp",
      {
        email,
        password,
        role: "user",
      }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/**
 * 2) Verify OTP / Register
 * POST /api/v1/auth/register
 * body: { email, otp }
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
 * body: { email }
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
 * 5) Firebase (phone login/signup)
 * POST /api/v1/auth/firebase
 * body: { idToken, role: "user" }
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
 * body: { idToken, role: "user" }
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



export const logout = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await api.post<LogoutResponse>("/api/v1/auth/logout");
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});