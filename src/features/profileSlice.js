import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../Fire';

export const listenProfileDataFromDb = (profileEmail, setProfileDataFromDb)=>{
  db.collection('users').where('email', '==', profileEmail).onSnapshot(snapshot=>{
    setProfileDataFromDb();
  })
}

export const setProfileDataFromDb = createAsyncThunk(
  'profile/setProfileDataFromDb',
  async(email)=>{
    const profileDoc = await db.collection('users').doc(email).get();
    return profileDoc.data()
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    email: 'displayName@gmail.com',
    displayName: 'displayName',
    photoURL: 'https://i.pinimg.com/originals/9b/89/53/9b8953e917e3a44e0b03b60b603bd469.jpg',
    numOfFollowers: 27,
    numOfFollowing: 22,
    numOfTweets: 2656,
    nextTweetId: 2689,
    numOfNotifications: 78,
    followers: [],
    following: [],
    blocks: [],
    blockedbys: [],
    bgPhotoURL: 'https://images.unsplash.com/photo-1542319150-fb62a2e8c476?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80'
  },
  reducers: {
    setProfile: (state, action) =>{
      Object.assign(state, action.payload);
    },
  },
  extraReducers: {
    [setProfileDataFromDb.fulfilled]: (state, action)=>{
      Object.assign(state, action.payload);
    },
  },
});

export const { setProfile } = profileSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getCurrentProfile = state => state.profile;

export const getCurrentProfileEmail = state => state.profile.email;

export default profileSlice.reducer;
