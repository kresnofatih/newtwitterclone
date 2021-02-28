import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/counterSlice';

export default configureStore({
  reducer: {
    app: appReducer,
  },
});
