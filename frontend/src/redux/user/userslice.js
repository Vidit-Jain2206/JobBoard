import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.user = action.payload;
    },
    loggedOutUser: (state) => {
      state.user = null;
    },
  },
});

export const { signInUser, loggedOutUser } = userSlice.actions;

export default userSlice.reducer;
