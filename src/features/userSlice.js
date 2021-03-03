import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {db} from '../Fire'
import firebase from 'firebase'

export const listenUserDataFromDb = (account, callback) =>{
  if(account!==null){
    db.collection('users').where('email', '==', account.email).onSnapshot(snapshot=>{
      callback();
    });
  }
}

export const setUserDataFromDb = createAsyncThunk(
  'users/setUserDataFromDb',
  async(accountEmail)=>{
    const userSnapshot = await db.collection('users').doc(accountEmail).get();
    if(!userSnapshot.exists){
      await db.collection('users').doc(accountEmail).set({
        email: accountEmail,
        displayName: accountEmail.split('@')[0],
        photoURL: 'https://i.pinimg.com/originals/9b/89/53/9b8953e917e3a44e0b03b60b603bd469.jpg',
        numOfFollowers: 0,
        numOfFollowing: 0,
        numOfTweets: 0,
        nextTweetId: 1,
        bgPhotoURL: 'https://images.unsplash.com/photo-1542319150-fb62a2e8c476?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80'
      })
    };
    const userSnapshot2 = await db
      .collection('users')
      .doc(accountEmail)
      .get();
    return userSnapshot2.data()
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: 'kresnofatih@gmail.com',
    displayName: 'KresnoFatih',
    photoURL: 'https://i.pinimg.com/originals/9b/89/53/9b8953e917e3a44e0b03b60b603bd469.jpg',
    numOfFollowers: 27,
    numOfFollowing: 22,
    numOfTweets: 267,
    nextTweetId: 269,
    bgPhotoURL: 'https://images.unsplash.com/photo-1542319150-fb62a2e8c476?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80'
  },
  reducers: {
    changeDisplayName: (state, action)=> {
      state.displayName = action.payload.displayName;
    },
    postTweet: (state, action)=>{
      db.collection('tweets').add({
        displayName: state.displayName,
        photoURL: state.photoURL,
        imageURL: action.payload.imageURL,
        numOfReplies: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: action.payload.message,
        tweetId: state.nextTweetId
      });
    },
  },
  extraReducers: {
    [setUserDataFromDb.fulfilled]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, action.payload);
    },
  },
});

export const { changeDisplayName, postTweet, getUserFromDb } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getCurrentUser = state => state.user;

export default userSlice.reducer;
