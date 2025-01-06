import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  cupcake: 'cupcake',
  dracula: 'dracula'
};

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem('user')) || null;
}

function getThemeFromLocalStorage() {
  const theme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', theme);
  return theme || themes.cupcake;
}

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage()
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    },
    toggleTheme: (state) => {
      state.theme =
        state.theme === themes.cupcake ? themes.dracula : themes.cupcake;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    }
  }
});

export const getUser = (store) => store.user.user;

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
