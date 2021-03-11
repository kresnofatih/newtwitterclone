import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    screen: 'Home',
    trendName: 'anime'
  },
  reducers: {
    openScreen: (state, action)=> {
      state.screen = action.payload.screen;
    },
    setTrendName: (state, action)=> {
      state.trendName = action.payload.trendName;
    },
  },
});

export const { openScreen, setTrendName } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getCurrentScreen = state => state.app.screen;
export const getCurrentTrendName = state => state.app.trendName;

export default appSlice.reducer;
