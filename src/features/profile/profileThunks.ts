import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import mainApi from "@/lib/client/mainApi";

// ---------- Types ----------
export type UserProfile = {
  id: string;
  email: string;
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
  profile: null | {
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
  };
  role: string[];
};

export type SendEmailOtpPayload = { email: string };

export type UpdateEmailWithOtpPayload = {
  email: string;
  otp: string;
};

export type UpdateProfileInfoPayload = {
  first_name?: string;
  last_name?: string;
  dob?: string; // YYYY-MM-DD
  career_stage?: string;
  timezone?: string;
  preferred_language?: string;
  file?: File | null;
};

// ✅ NEW: Delete profile photo response
export type DeleteProfilePhotoResponse = {
  success: boolean;
  message: string;
  data: string;
};

// ✅ NEW: Profile completion response
export type ProfileCompletionResponse = {
  profile_completion: string;
  filled_fields: number;
  total_fields: number;
  missing_fields: string[];
};

// ✅ NEW: Delete user profile (soft delete) response
export type DeleteUserProfileResponse = {
  success: boolean;
  message: string;
};

// ---------- Helpers ----------
function getErrorMessage(err: unknown, fallback: string) {
  const e = err as AxiosError<any>;
  return e?.response?.data?.message || e?.message || fallback;
}

function appendIf(fd: FormData, key: string, val?: string | null) {
  if (val === undefined || val === null) return;
  const v = String(val).trim();
  if (!v) return;
  fd.append(key, v);
}

// ---------- Thunks ----------

// GET profile (cookie auth)
export const fetchUserProfileThunk = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>("profile/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await mainApi.get<UserProfile>("/api/v1/users/profile");
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, "Failed to fetch profile"));
  }
});

// Send email OTP
export const sendEmailOtpThunk = createAsyncThunk<
  any,
  SendEmailOtpPayload,
  { rejectValue: string }
>("profile/sendEmailOtp", async (payload, { rejectWithValue }) => {
  try {
    const res = await mainApi.post(
      "/api/v1/users/profile/send-email-otp",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, "Failed to send OTP"));
  }
});

// Update email with OTP (PATCH)
export const updateEmailWithOtpThunk = createAsyncThunk<
  UserProfile,
  UpdateEmailWithOtpPayload,
  { rejectValue: string }
>("profile/updateEmailWithOtp", async (payload, { rejectWithValue }) => {
  try {
    const fd = new FormData();
    fd.append("email", payload.email);
    fd.append("otp", payload.otp);

    const res = await mainApi.patch<UserProfile>("/api/v1/users/profile", fd);
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, "Failed to update email"));
  }
});

// Update personal info (PATCH)
export const updateProfileInfoThunk = createAsyncThunk<
  UserProfile,
  UpdateProfileInfoPayload,
  { rejectValue: string }
>("profile/updateProfileInfo", async (payload, { rejectWithValue }) => {
  try {
    const fd = new FormData();
    appendIf(fd, "first_name", payload.first_name);
    appendIf(fd, "last_name", payload.last_name);
    appendIf(fd, "dob", payload.dob);
    appendIf(fd, "career_stage", payload.career_stage);
    appendIf(fd, "timezone", payload.timezone);
    appendIf(fd, "preferred_language", payload.preferred_language);
    if (payload.file) fd.append("file", payload.file);

    const res = await mainApi.patch<UserProfile>("/api/v1/users/profile", fd);
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, "Failed to update profile"));
  }
});

// ✅ NEW: Delete profile photo (PATCH)
export const deleteProfilePhotoThunk = createAsyncThunk<
  DeleteProfilePhotoResponse,
  void,
  { rejectValue: string }
>("profile/deleteProfilePhoto", async (_, { rejectWithValue }) => {
  try {
    const res = await mainApi.patch<DeleteProfilePhotoResponse>(
      "/api/v1/users/delete-profile-photo"
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(
      getErrorMessage(err, "Failed to delete profile photo")
    );
  }
});

// ✅ NEW: Get profile completion (GET)
export const fetchProfileCompletionThunk = createAsyncThunk<
  ProfileCompletionResponse,
  void,
  { rejectValue: string }
>("profile/fetchCompletion", async (_, { rejectWithValue }) => {
  try {
    const res = await mainApi.get<ProfileCompletionResponse>(
      "/api/v1/users/profile-completion"
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(
      getErrorMessage(err, "Failed to fetch profile completion")
    );
  }
});


// ✅ NEW: Delete user profile (DELETE)
export const deleteUserProfileThunk = createAsyncThunk<
  DeleteUserProfileResponse,
  void,
  { rejectValue: string }
>("profile/deleteUserProfile", async (_, { rejectWithValue }) => {
  try {
    const res = await mainApi.delete<DeleteUserProfileResponse>(
      "/api/v1/users/profile"
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, "Failed to delete profile"));
  }
});