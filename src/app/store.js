import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';
import userReducer from '../features/userSlice';
import profileReducer from '../features/profileSlice';
import tweetReducer from '../features/tweetSlice';

export default configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    profile: profileReducer,
    tweet: tweetReducer,
  },
});
