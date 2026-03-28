import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import {
  fetchUserProfileThunk,
  sendEmailOtpThunk,
  updateEmailWithOtpThunk,
  updateProfileInfoThunk,
  deleteProfilePhotoThunk,
  fetchProfileCompletionThunk,
  deleteUserProfileThunk,
  type UserProfile,
  type ProfileCompletionResponse,
} from "./profileThunks";

import { logout } from "@/features/auth/authThunks";

type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export type ProfileState = {
  data: UserProfile | null;

  fetchStatus: AsyncStatus;
  otpStatus: AsyncStatus;
  updateEmailStatus: AsyncStatus;
  updateProfileStatus: AsyncStatus;
  deletePhotoStatus: AsyncStatus;
  completionStatus: AsyncStatus;

  completion: ProfileCompletionResponse | null;

  deleteProfileStatus: AsyncStatus;

  otpSent: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  data: null,

  fetchStatus: "idle",
  otpStatus: "idle",
  updateEmailStatus: "idle",
  updateProfileStatus: "idle",
  deletePhotoStatus: "idle",
  completionStatus: "idle",
  deleteProfileStatus: "idle",

  completion: null,

  otpSent: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetOtpState(state) {
      state.otpSent = false;
      state.otpStatus = "idle";
    },
    setProfileLocally(state, action: PayloadAction<UserProfile | null>) {
      state.data = action.payload;
    },
    clearProfileError(state) {
      state.error = null;
    },
    resetProfileState: () => initialState,
  },
  extraReducers: (builder) => {
    // logout => wipe profile
    builder.addCase(logout.fulfilled, () => initialState);

    // GET profile
    builder.addCase(fetchUserProfileThunk.pending, (state) => {
      state.fetchStatus = "loading";
      state.error = null;
    });
    builder.addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
      state.fetchStatus = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchUserProfileThunk.rejected, (state, action) => {
      state.fetchStatus = "failed";
      state.error = (action.payload as string) || "Failed to fetch profile";
    });

    // Send OTP
    builder.addCase(sendEmailOtpThunk.pending, (state) => {
      state.otpStatus = "loading";
      state.error = null;
      state.otpSent = false;
    });
    builder.addCase(sendEmailOtpThunk.fulfilled, (state) => {
      state.otpStatus = "succeeded";
      state.otpSent = true;
    });
    builder.addCase(sendEmailOtpThunk.rejected, (state, action) => {
      state.otpStatus = "failed";
      state.error = (action.payload as string) || "Failed to send OTP";
      state.otpSent = false;
    });

    // Update Email
    builder.addCase(updateEmailWithOtpThunk.pending, (state) => {
      state.updateEmailStatus = "loading";
      state.error = null;
    });
    builder.addCase(updateEmailWithOtpThunk.fulfilled, (state, action) => {
      state.updateEmailStatus = "succeeded";
      state.data = action.payload;
      state.otpSent = false;
      state.otpStatus = "idle";
    });
    builder.addCase(updateEmailWithOtpThunk.rejected, (state, action) => {
      state.updateEmailStatus = "failed";
      state.error = (action.payload as string) || "Failed to update email";
    });

    // Update Profile Info
    builder.addCase(updateProfileInfoThunk.pending, (state) => {
      state.updateProfileStatus = "loading";
      state.error = null;
    });
    builder.addCase(updateProfileInfoThunk.fulfilled, (state, action) => {
      state.updateProfileStatus = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(updateProfileInfoThunk.rejected, (state, action) => {
      state.updateProfileStatus = "failed";
      state.error = (action.payload as string) || "Failed to update profile";
    });

    // ✅ NEW: Delete Profile Photo
    builder.addCase(deleteProfilePhotoThunk.pending, (state) => {
      state.deletePhotoStatus = "loading";
      state.error = null;
    });
    builder.addCase(deleteProfilePhotoThunk.fulfilled, (state) => {
      state.deletePhotoStatus = "succeeded";
      // Clear photo URL from local state
      if (state.data?.profile) {
        state.data.profile.profile_photo_url = null;
      }
    });
    builder.addCase(deleteProfilePhotoThunk.rejected, (state, action) => {
      state.deletePhotoStatus = "failed";
      state.error =
        (action.payload as string) || "Failed to delete profile photo";
    });

    // ✅ NEW: Fetch Profile Completion
    builder.addCase(fetchProfileCompletionThunk.pending, (state) => {
      state.completionStatus = "loading";
      state.error = null;
    });
    builder.addCase(fetchProfileCompletionThunk.fulfilled, (state, action) => {
      state.completionStatus = "succeeded";
      state.completion = action.payload;
    });
    builder.addCase(fetchProfileCompletionThunk.rejected, (state, action) => {
      state.completionStatus = "failed";
      state.error =
        (action.payload as string) || "Failed to fetch profile completion";
    });
    // ✅ NEW: Delete User Profile (soft delete)
    builder.addCase(deleteUserProfileThunk.pending, (state) => {
      state.deleteProfileStatus = "loading";
      state.error = null;
    });
    builder.addCase(deleteUserProfileThunk.fulfilled, (state) => {
      state.deleteProfileStatus = "succeeded";
      // profile soft deleted => local profile wipe
      state.data = null;
      state.completion = null;
    });
    builder.addCase(deleteUserProfileThunk.rejected, (state, action) => {
      state.deleteProfileStatus = "failed";
      state.error = (action.payload as string) || "Failed to delete profile";
    });
  },
});

export const selectProfileData = (state: RootState) => state.profile.data;

export const selectFullName = createSelector([selectProfileData], (data) => {
  const first = data?.profile?.first_name?.trim() ?? "";
  const last = data?.profile?.last_name?.trim() ?? "";
  const full = `${first} ${last}`.trim();
  return full || null;
});

// ✅ NEW: Selectors
export const selectProfileCompletion = (state: RootState) =>
  state.profile.completion;
export const selectDeletePhotoStatus = (state: RootState) =>
  state.profile.deletePhotoStatus;

export const {
  resetOtpState,
  setProfileLocally,
  clearProfileError,
  resetProfileState,
} = profileSlice.actions;

export default profileSlice.reducer;
