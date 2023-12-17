// selectedIdsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedIdsState {
  selectedId: string | null;
}

const initialState: SelectedIdsState = {
  selectedId: "101",
};

const selectedIdsSlice = createSlice({
  name: "selectedIds",
  initialState,
  reducers: {
    toggleId: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (state.selectedId === id) {
        // If the clicked ID is the same as the currently selected ID, deselect it
        state.selectedId = null;
      } else {
        // If a different ID is clicked, select it
        state.selectedId = id;
      }
    },
  },
});

export const { toggleId } = selectedIdsSlice.actions;
export default selectedIdsSlice.reducer;
