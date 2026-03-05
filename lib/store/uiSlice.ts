import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  techModalOpen: boolean;
}

const initialState: UiState = {
  techModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTechModalOpen(state, action: PayloadAction<boolean>) {
      state.techModalOpen = action.payload;
    },
  },
});

export const { setTechModalOpen } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
