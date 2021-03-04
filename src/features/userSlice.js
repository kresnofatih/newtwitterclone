import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {db} from '../Fire'
import firebase from 'firebase'

export const foundInUserFollowing = (currentUser, friendEmail)=> {
  if(currentUser.following.includes(friendEmail)){
    return true;
  } else {
    return false;
  };
}

export const listenUserDataFromDb = (account, setUserDataFromDb) =>{
  if(account!==null){
    db.collection('users').where('email', '==', account.email).onSnapshot(snapshot=>{
      setUserDataFromDb();
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
        photoURL: 'https://cobaltsettlements.com/wp-content/uploads/2019/03/blank-profile.jpg',
        numOfFollowers: 0,
        numOfFollowing: 0,
        numOfTweets: 0,
        nextTweetId: 1,
        followers: [],
        following: [],
        blocks: [],
        blockedbys: [],
        bgPhotoURL: 'https://images.unsplash.com/photo-1542300058-b94b8ab7411b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80'
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
    email: 'displayName@gmail.com',
    displayName: 'displayName',
    photoURL: 'https://i.pinimg.com/originals/9b/89/53/9b8953e917e3a44e0b03b60b603bd469.jpg',
    numOfFollowers: 27,
    numOfFollowing: 22,
    numOfTweets: 267,
    nextTweetId: 269,
    followers: [],
    following: [],
    blocks: [],
    blockedbys: [],
    bgPhotoURL: 'https://images.unsplash.com/photo-1542319150-fb62a2e8c476?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80'
  },
  reducers: {
    postTweetToUserTweets: (state, action)=>{
      db.collection('users').doc(state.email).collection('tweets').add({
        displayName: state.displayName,
        photoURL: state.photoURL,
        imageURL: action.payload.imageURL,
        numOfReplies: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: action.payload.message,
        tweetId: state.nextTweetId
      });
    },
    postTweetToUserHome: (state, action)=>{
      db.collection('users').doc(state.email).collection('home').add({
        displayName: state.displayName,
        photoURL: state.photoURL,
        imageURL: action.payload.imageURL,
        numOfReplies: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: action.payload.message,
        tweetId: state.nextTweetId
      });
    },
    incrementNextTweetId: (state, action)=>{
      db.collection('users').doc(state.email).update({
        nextTweetId: firebase.firestore.FieldValue.increment(1)
      });
    },
    incrementNumOfTweets: (state, action)=>{
      db.collection('users').doc(state.email).update({
        numOfTweets: firebase.firestore.FieldValue.increment(1)
      });
    },
    followFriend: (state, action)=>{
      db.collection('users').doc(state.email).update({
        following: firebase.firestore.FieldValue.arrayUnion(action.payload.friendEmail),
        numOfFollowing: firebase.firestore.FieldValue.increment(1)
      });
      db.collection('users').doc(action.payload.friendEmail).update({
        followers: firebase.firestore.FieldValue.arrayUnion(state.email),
        numOfFollowers: firebase.firestore.FieldValue.increment(1)
      });
    },
    unfollowFriend: (state, action)=>{
      db.collection('users').doc(state.email).update({
        following: firebase.firestore.FieldValue.arrayRemove(action.payload.friendEmail),
        numOfFollowing: firebase.firestore.FieldValue.increment(-1)
      });
      db.collection('users').doc(action.payload.friendEmail).update({
        followers: firebase.firestore.FieldValue.arrayRemove(state.email),
        numOfFollowers: firebase.firestore.FieldValue.increment(-1)
      });
    },
  },
  extraReducers: {
    [setUserDataFromDb.fulfilled]: (state, action) => {
      // console.log(action.payload);
      Object.assign(state, action.payload);
    },
  },
});

export const {postTweetToUserTweets, 
              postTweetToUserHome,
              incrementNextTweetId,
              incrementNumOfTweets,
              followFriend,
              unfollowFriend
            } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getCurrentUser = state => state.user;

export default userSlice.reducer;
