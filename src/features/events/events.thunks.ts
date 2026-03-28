import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventFilters } from "./events.types";
import { getRecommendedEventsApi,getFutureEventsApi } from "./events.api";

export const fetchRecommendedEventsThunk = createAsyncThunk(
  "events/fetchRecommended",
  async (_, { rejectWithValue }) => {
    try {
      return await getRecommendedEventsApi();
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to fetch recommended events");
    }
  }
);

export const fetchFutureEventsThunk = createAsyncThunk(
  "events/fetchFuture",
  async (params: EventFilters | undefined, { rejectWithValue }) => {
    try {
      return await getFutureEventsApi(params);
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to fetch future events");
    }
  }
);