import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFutureEventsThunk,
  fetchRecommendedEventsThunk,
} from "./events.thunks";
import { EventApiItem } from "./events.types";

type EventsState = {
  recommended: EventApiItem[];
  future: EventApiItem[];
  loadingRecommended: boolean;
  loadingFuture: boolean;
  error: string | null;
};

const initialState: EventsState = {
  recommended: [],
  future: [],
  loadingRecommended: false,
  loadingFuture: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearEventsError(state) {
      state.error = null;
    },
    resetFutureEvents(state) {
      state.future = [];
      state.loadingFuture = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedEventsThunk.pending, (state) => {
        state.loadingRecommended = true;
        state.error = null;
      })
      .addCase(fetchRecommendedEventsThunk.fulfilled, (state, action) => {
        state.loadingRecommended = false;
        state.recommended = action.payload.data || [];
      })
      .addCase(fetchRecommendedEventsThunk.rejected, (state, action) => {
        state.loadingRecommended = false;
        state.error = action.payload as string;
      })

      .addCase(fetchFutureEventsThunk.pending, (state) => {
        state.loadingFuture = true;
        state.error = null;
      })
      .addCase(fetchFutureEventsThunk.fulfilled, (state, action) => {
        state.loadingFuture = false;
        state.future = action.payload.data || [];
      })
      .addCase(fetchFutureEventsThunk.rejected, (state, action) => {
        state.loadingFuture = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEventsError, resetFutureEvents } = eventsSlice.actions;
export default eventsSlice.reducer;