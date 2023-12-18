// selectedIdsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedIdsState {
  selectedIds: string[];
}

const initialState: SelectedIdsState = {
  selectedIds: ["101"],
};

const selectedIdsSlice = createSlice({
  name: "selectedIds",
  initialState,
  reducers: {
    toggleId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      let index = state.selectedIds.indexOf(id);

      if (index !== -1) {
        state.selectedIds = state.selectedIds.filter(
          (selectedId) => selectedId !== id
        );
      } else {
        state.selectedIds = [...state.selectedIds, id];
      }
    },
  },
});

export const { toggleId } = selectedIdsSlice.actions;
export default selectedIdsSlice.reducer;
