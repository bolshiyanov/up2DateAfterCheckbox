// selectedIdsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedIdsState {
  ids: string[];
}

const initialState: SelectedIdsState = {
  ids: [],
};

const selectedIdsSlice = createSlice({
  name: "selectedIds",
  initialState,
  reducers: {
    toggleId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        // If the ID is already in the array, remove it
        state.ids = state.ids.filter((selectedId) => selectedId !== id);
      } else {
        // If the ID is not in the array, add it
        state.ids = [...state.ids, id];
      }
    },
  },
});

export const { toggleId } = selectedIdsSlice.actions;
export default selectedIdsSlice.reducer;
