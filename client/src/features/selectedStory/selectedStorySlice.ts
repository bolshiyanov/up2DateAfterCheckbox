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

      // Проверяем, есть ли ID уже в массиве selectedIds
      let index = state.selectedIds.indexOf(id);

      if (index !== -1) {
        // Если ID уже выбран, создаем новый массив без ID
        state.selectedIds = state.selectedIds.filter(
          (selectedId) => selectedId !== id
        );

        console.log(" state2.selectedIds", state.selectedIds);
      } else {
        // Если ID не выбран, создаем новый массив с добавленным ID
        state.selectedIds = [...state.selectedIds, id];
        
        console.log(" state1.selectedIds", state.selectedIds);
      }
    },
  },
});

export const { toggleId } = selectedIdsSlice.actions;
export default selectedIdsSlice.reducer;
