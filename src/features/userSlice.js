import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {db, stg} from '../Fire'
import firebase from 'firebase'

export const foundInUserFollowing = (currentUser, friendEmail)=> {
  if(currentUser.following.includes(friendEmail)){
    return true;
  } else {
    return false;
  };
}

export const postTweetToTrends = createAsyncThunk(
  'users/postTweetToTrends',
  async(postTweetData)=>{
    const hashtags = postTweetData.message
        .split(" ")
        .filter(stg=>stg.startsWith("#"))
        .map(stg=>stg.replace(/#/g, ""));
    const hashtagsDocs = await db.collection('trends').where('trendname', 'in', hashtags).get();
    return {
      tweetImageURL: postTweetData.imageURL,
      tweetMessage: postTweetData.message,
      hashtagsDocs: hashtagsDocs,
      hashtags: hashtags
    }
  }
)

export const listenUserDataFromDb = (account, setUserDataFromDb) =>{
  if(account!==null){
    db.collection('users').where('email', '==', account.email).onSnapshot(snapshot=>{
      setUserDataFromDb();
    });
  }
}

export const postToTaggedFriendsNotif = createAsyncThunk(
  'users/postToTaggedFriendsNotif',
  async(postTweetData)=>{
    const displayNames = postTweetData.message.replace(/,/g, "").split(" ").filter(stg=>stg.startsWith("@")).map(stg=>stg.replace(/@/g, ""))
    const uniqueDisplayNameArray = [...new Set(displayNames)];
    const taggedFriends = await db
      .collection('users')
      .where('displayName', 'in', uniqueDisplayNameArray)
      .get();
    const taggedFriendsEmail = [];
    if(!taggedFriends.empty){
      taggedFriends.docs.forEach(doc=>{
        taggedFriendsEmail.push(doc.data().email);
      });
    };
    return {
      tweetImageURL: postTweetData.imageURL,
      tweetMessage: postTweetData.message,
      taggedFriendsEmail: taggedFriendsEmail
    } 
  }
)

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
      db.collection('users').doc(state.email).collection('tweets').doc(state.email+state.nextTweetId).set({
        displayName: state.displayName,
        photoURL: state.photoURL,
        imageURL: action.payload.imageURL,
        numOfReplies: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: action.payload.message,
        tweetId: state.nextTweetId,
        email: state.email
      });
    },
    postTweetToUserHome: (state, action)=>{
      db.collection('users').doc(state.email).collection('home').doc(state.email+state.nextTweetId).set({
        displayName: state.displayName,
        photoURL: state.photoURL,
        imageURL: action.payload.imageURL,
        numOfReplies: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: action.payload.message,
        tweetId: state.nextTweetId,
        email: state.email
      });
    },
    postTweetToFollowersHome: (state, action)=>{
      state.followers.forEach((email)=>{
        db.collection('users').doc(email).collection('home').doc(state.email+state.nextTweetId).set({
          displayName: state.displayName,
          photoURL: state.photoURL,
          imageURL: action.payload.imageURL,
          numOfReplies: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: action.payload.message,
          tweetId: state.nextTweetId,
          email: state.email
        });
      })
    },
    postTweetToFriendTweetReply: (state, action)=>{
      db.collection('users').doc(action.payload.friendEmail)
        .collection('tweets').doc(action.payload.friendEmail+action.payload.friendTweetId)
        .collection('replies').doc(state.email+state.nextTweetId).set({
          displayName: state.displayName,
          photoURL: state.photoURL,
          imageURL: action.payload.imageURL,
          numOfReplies: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: action.payload.message,
          tweetId: state.nextTweetId,
          email: state.email
        });
    },
    incrementNumOfRepliesFriendTweet: (state, action)=>{
      db
        .collection('users')
        .doc(action.payload.friendEmail)
        .collection('tweets')
        .doc(action.payload.friendEmail+action.payload.friendTweetId)
        .update({
          numOfReplies: firebase.firestore.FieldValue.increment(1)
        });
    },
    incrementNumOfRepliesFriendHome: (state, action)=>{
      db
        .collection('users')
        .doc(action.payload.friendEmail)
        .collection('home')
        .doc(action.payload.friendEmail+action.payload.friendTweetId)
        .update({
          numOfReplies: firebase.firestore.FieldValue.increment(1)
        });
    },
    incrementNumOfTweetsFriendFollowersHome: (state, action)=>{
      action.payload.friendFollowers.forEach(followerEmail=>{
        db
        .collection('users')
        .doc(followerEmail)
        .collection('home')
        .doc(action.payload.friendEmail+action.payload.friendTweetId)
        .update({
          numOfReplies: firebase.firestore.FieldValue.increment(1)
        });
      })
    },
    incrementNumOfTweetsTrends: (state, action)=>{
      const hashtags = action.payload.friendRepliedMessage
        .split(" ")
        .filter(stg=>stg.startsWith("#"))
        .map(stg=>stg.replace(/#/g, ""));
      hashtags.forEach(hashtag=>{
        db
        .collection('trends')
        .doc(hashtag)
        .collection('tweets')
        .doc(action.payload.friendEmail+action.payload.friendTweetId)
        .update({
          numOfReplies: firebase.firestore.FieldValue.increment(1)
        })
      })
    },
    storeImageToFireStorage: (state, action)=>{
      // action.payload.file
      const stgRef = stg.ref();
      const fileRef = stgRef.child('users/'+state.email+'/images/'+Date.now());
      fileRef
        .put(action.payload.file)
        .then(()=>{
          fileRef.getDownloadURL().then(url=>{
            action.payload.callback(url);
          });
        });
    },
    storeProfileAvatarToFireStorage: (state, action)=>{
      const stgRef = stg.ref();
      const fileRef = stgRef.child('users/'+state.email+'/avatars/'+Date.now());
      fileRef
        .put(action.payload.file)
        .then(()=>{
          fileRef.getDownloadURL().then(url=>{
            action.payload.callback(url);
          });
        });
    },
    postImageURLToUserGallery:(state, action)=>{
      db.collection('users').doc(state.email).collection('gallery').doc(state.email+state.nextTweetId).set({
        imageURL: action.payload.imageURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
      Object.assign(state, action.payload);
    },
    [postToTaggedFriendsNotif.fulfilled]: (state, action)=>{
      if(action.payload.taggedFriendsEmail.length>0){
        action.payload.taggedFriendsEmail.forEach(email=>{
          db.collection('users').doc(email).collection('notifications').doc(state.email+state.nextTweetId).set({
            displayName: state.displayName,
            photoURL: state.photoURL,
            imageURL: action.payload.tweetImageURL,
            numOfReplies: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: action.payload.tweetMessage,
            tweetId: state.nextTweetId,
            email: state.email
          });
        })
      }
    },
    [postTweetToTrends.fulfilled]: (state, action)=>{
      action.payload.hashtags.forEach(ht=>{
        let num = 0;
        action.payload.hashtagsDocs.forEach(doc=>{
          if(ht===doc.data().trendname){
            db.collection('trends').doc(ht).collection('tweets').doc(state.email+state.nextTweetId).set({
              displayName: state.displayName,
              photoURL: state.photoURL,
              imageURL: action.payload.tweetImageURL,
              numOfReplies: 0,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              message: action.payload.tweetMessage,
              tweetId: state.nextTweetId,
              email: state.email
            });
            db.collection('trends').doc(ht).update({
              numOfTweets: firebase.firestore.FieldValue.increment(1)
            });
            num+=1;
          }
        });
        if(num===0){
          db.collection('trends').doc(ht).set({
            numOfTweets: 0,
            trendname: ht
          });
          db.collection('trends').doc(ht).collection('tweets').doc(state.email+state.nextTweetId).set({
            displayName: state.displayName,
            photoURL: state.photoURL,
            imageURL: action.payload.tweetImageURL,
            numOfReplies: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: action.payload.tweetMessage,
            tweetId: state.nextTweetId,
            email: state.email
          });
          db.collection('trends').doc(ht).update({
            numOfTweets: firebase.firestore.FieldValue.increment(1)
          });
        };
      })
    },
  },
});

export const {postTweetToUserTweets, 
              postTweetToUserHome,
              incrementNextTweetId,
              incrementNumOfTweets,
              followFriend,
              unfollowFriend,
              postTweetToFollowersHome,
              storeImageToFireStorage,
              storeProfileAvatarToFireStorage,
              postImageURLToUserGallery,
              postTweetToFriendTweetReply,
              incrementNumOfTweetsFriendFollowersHome,
              incrementNumOfRepliesFriendHome,
              incrementNumOfRepliesFriendTweet,
              incrementNumOfTweetsTrends
            } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getCurrentUser = state => state.user;

export const getCurrentUserEmail = state => state.user.email;

export default userSlice.reducer;
