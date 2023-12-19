import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface commentsState {
  comments: { id: string; description: string }[];
}

const initialState: commentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state) => {
      const storedData = localStorage.getItem("comments");
      const parsedData = storedData ? JSON.parse(storedData) : [];

      state.comments = parsedData;
    },
    editComments: (
      state,
      action: PayloadAction<{ id: string; description: string }>
    ) => {
      const { id, description } = action.payload;
      const index = state.comments.findIndex((item) => item.id === id);

      if (index !== -1) {
        // Edit existing comment
        state.comments[index].description = description;
      } else {
        // Add new comment
        state.comments.push({ id, description });
      }

      // Save the updated array to localStorage
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },
    
    removeComment: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      console.log(' idToRemove', idToRemove)
      state.comments = state.comments.filter((item) => item.id !== idToRemove);

      console.log(' state.comments', state.comments)
     
      // Save the updated array to localStorage
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },
  },
});

export const { setComments, editComments, removeComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
