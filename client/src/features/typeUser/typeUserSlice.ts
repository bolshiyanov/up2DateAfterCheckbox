// slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isAgent: boolean;
  isProvider: boolean;
  isSuperAdmin: boolean;
}

const initialState: AppState = {
  isAgent: false,
  isProvider: false,
  isSuperAdmin: false,
};

const typeUserSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAgent: (state) => {
      state.isAgent = true;
      state.isProvider = false;
      state.isSuperAdmin = false;
    },
    setIsProvider: (state) => {
      state.isAgent = false;
      state.isProvider = true;
      state.isSuperAdmin = false;
    },
    setIsSuperAdmin: (state) => {
      state.isAgent = false;
      state.isProvider = false;
      state.isSuperAdmin = true;
    },
  },
});

export const { setIsAgent, setIsProvider, setIsSuperAdmin } = typeUserSlice.actions;
export default typeUserSlice.reducer;
