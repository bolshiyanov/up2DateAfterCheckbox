import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedGlobalCategoryState {
  value: string | null;
}

const initialState: SelectedGlobalCategoryState = {
  value: "Boats Rides",
};

const selectedGlobalCategorySlice = createSlice({
  name: "selectedGlobalCategory",
  initialState,
  reducers: {
    toggleValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleValue } = selectedGlobalCategorySlice.actions;

export default selectedGlobalCategorySlice.reducer;


