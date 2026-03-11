import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  login,
  resendRegisterOtp,
  sendRegisterOtp,
  verifyRegisterOtp,
  firebaseAuth,
  googleAuth,
  logout,
} from "./authThunks";

export type AuthState = {
  pendingEmail: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  sendOtpLoading: boolean;
  resendOtpLoading: boolean;
  verifyOtpLoading: boolean;
  loginLoading: boolean;
  firebaseLoading: boolean;
  googleLoading: boolean;
  logoutLoading: boolean;

  message: string | null;
  error: string | null;
};

const initialState: AuthState = {
  pendingEmail: null,
  accessToken: null,
  isAuthenticated: false,

  sendOtpLoading: false,
  resendOtpLoading: false,
  verifyOtpLoading: false,
  loginLoading: false,
  firebaseLoading: false,
  googleLoading: false,
  logoutLoading: false,

  message: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    clearAuthMessage(state) {
      state.message = null;
    },
    setPendingEmail(state, action: PayloadAction<string | null>) {
      state.pendingEmail = action.payload;
    },
    clearAuthState(state) {
      state.pendingEmail = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRegisterOtp.pending, (state) => {
        state.sendOtpLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendRegisterOtp.fulfilled, (state, action) => {
        state.sendOtpLoading = false;
        state.message = action.payload.message;
        state.pendingEmail = action.meta.arg.email;
      })
      .addCase(sendRegisterOtp.rejected, (state, action) => {
        state.sendOtpLoading = false;
        state.error = action.payload || "Failed to send OTP";
      });

    builder
      .addCase(resendRegisterOtp.pending, (state) => {
        state.resendOtpLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resendRegisterOtp.fulfilled, (state, action) => {
        state.resendOtpLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resendRegisterOtp.rejected, (state, action) => {
        state.resendOtpLoading = false;
        state.error = action.payload || "Failed to resend OTP";
      });

    builder
      .addCase(verifyRegisterOtp.pending, (state) => {
        state.verifyOtpLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyRegisterOtp.fulfilled, (state, action) => {
        state.verifyOtpLoading = false;
        state.accessToken = action.payload.access_token;
        state.isAuthenticated = true;
        state.message = "Registered successfully";
      })
      .addCase(verifyRegisterOtp.rejected, (state, action) => {
        state.verifyOtpLoading = false;
        state.error = action.payload || "OTP verification failed";
      });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.accessToken = action.payload.access_token;
        state.isAuthenticated = true;
        state.message = "Login successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload || "Login failed";
      });

    builder
      .addCase(firebaseAuth.pending, (state) => {
        state.firebaseLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(firebaseAuth.fulfilled, (state, action) => {
        state.firebaseLoading = false;
        state.accessToken = action.payload.access_token;
        state.isAuthenticated = true;
        state.message = "Login successful";
      })
      .addCase(firebaseAuth.rejected, (state, action) => {
        state.firebaseLoading = false;
        state.error = action.payload || "Firebase auth failed";
      });

    builder
      .addCase(googleAuth.pending, (state) => {
        state.googleLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.googleLoading = false;
        state.accessToken = action.payload.access_token;
        state.isAuthenticated = true;
        state.message = "Login successful";
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.googleLoading = false;
        state.error = action.payload || "Google auth failed";
      });

    builder
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.pendingEmail = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.message = action.payload.message || "Logout successful";
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const {
  clearAuthError,
  clearAuthMessage,
  setPendingEmail,
  clearAuthState,
} = authSlice.actions;

export default authSlice.reducer;