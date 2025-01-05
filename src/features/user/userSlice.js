import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  theme: 'winter'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {},
    logoutUser: (state, action) => {},
    toggleTheme: (state, action) => {}
  }
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
