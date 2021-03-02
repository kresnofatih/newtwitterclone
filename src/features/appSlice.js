import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    screen: 'Home'
  },
  reducers: {
    openScreen: (state, action)=> {
      state.screen = action.payload.screen;
    },
  },
});

export const { openScreen } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getCurrentScreen = state => state.app.screen;

export default appSlice.reducer;
