import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritedRidesState {
  favoritedRides: string[];
}

const initialState: FavoritedRidesState = {
  favoritedRides: [],
};

const favoritedRidesSlice = createSlice({
  name: "favoritedRides",
  initialState,
  reducers: {
    setFavoritedRides: (state) => {
     
      const storedData = localStorage.getItem("favoritedRides");
      const parsedData = storedData ? JSON.parse(storedData) : [];

      state.favoritedRides = parsedData;
    },
    addOrRemoveRides: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      let index = state.favoritedRides.indexOf(id);

      if (index !== -1) {
        state.favoritedRides = state.favoritedRides.filter(
          (item) => item !== id
        );
      } else {
        state.favoritedRides = [...state.favoritedRides, id];
      }

      // Сохраняем обновленный массив в localStorage
      localStorage.setItem(
        "favoritedRides",
        JSON.stringify(state.favoritedRides)
      );
    },
  },
});

export const { setFavoritedRides, addOrRemoveRides } =
  favoritedRidesSlice.actions;
export default favoritedRidesSlice.reducer;
