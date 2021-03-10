import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';
import userReducer from '../features/userSlice';
import profileReducer from '../features/profileSlice';
import tweetReducer from '../features/tweetSlice';
import imgbtnReducer from '../features/imgbtnSlice';
import editprofileReducer from '../features/editprofileSlice';

export default configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    profile: profileReducer,
    tweet: tweetReducer,
    imgbtn: imgbtnReducer,
    editprofile: editprofileReducer
  },
});
