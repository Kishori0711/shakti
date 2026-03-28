import { createSlice } from "@reduxjs/toolkit";
import { updatePasswordThunk } from "./profileForgotPasswordThunk";

type ProfileForgotPasswordState = {
  loading: boolean;
  success: boolean;
  message: string;
  error: string | null;
};

const initialState: ProfileForgotPasswordState = {
  loading: false,
  success: false,
  message: "",
  error: null,
};

const profileForgotPasswordSlice = createSlice({
  name: "profileForgotPassword",
  initialState,
  reducers: {
    resetProfileForgotPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },
    clearProfileForgotPasswordError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = "";
        state.error = null;
      })
      .addCase(updatePasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = !!action.payload?.success;
        state.message = action.payload?.message || "Password updated successfully";
        state.error = null;
      })
      .addCase(updatePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = "";
        state.error = (action.payload as string) || "Request failed";
      });
  },
});

export const {
  resetProfileForgotPasswordState,
  clearProfileForgotPasswordError,
} = profileForgotPasswordSlice.actions;

export default profileForgotPasswordSlice.reducer;