import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "@/lib/client/mainApi"; // <-- apne path ke hisaab se change

export type UpdatePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type UpdatePasswordResponse = {
  success: boolean;
  message: string;
};

type ErrorResponse = {
  message?: string;
};

export const updatePasswordThunk = createAsyncThunk<
  UpdatePasswordResponse,
  UpdatePasswordPayload,
  { rejectValue: string }
>("profileForgotPassword/updatePassword", async (payload, { rejectWithValue }) => {
  try {
    // mainapi.ts me baseURL "/", withCredentials true, headers already set hain
    const { data } = await api.post<UpdatePasswordResponse>(
      "/api/v1/auth/update-password",
      payload
    );

    return data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});