// Store.ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { api } from "./serivices/api";
import auth from '../features/auth/authSlice'
import employees from '../features/employees/employeesSlice'
import selectedIdsReducer from "../features/selectedStory/selectedStorySlice"
import selectedGlobalCategoryReducer from "../features/selectedGlobalCategory/selectedGlobalCategorySlice"
import favoritedRidesSlice from '../features/favoritSlice/favoritSlice'
import usersReducer from '../features/users/usersSlice'
import commentsSlice from '../features/commentSlice/commentSlice'
import { listenerMiddleware } from "../middleware/auth";

export const store = configureStore({
  reducer: {
    comments: commentsSlice,
    favoritedRides: favoritedRidesSlice,
    selectedGlobalCategory: selectedGlobalCategoryReducer,
    users: usersReducer,
    selectedIds: selectedIdsReducer,
    counter: counterReducer,
    [api.reducerPath]: api.reducer,
    auth,
    employees
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
