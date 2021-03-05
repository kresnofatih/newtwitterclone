import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../Fire';

export const getTweetFriendDataFromDb = async(email, callback)=>{
    const TweetFriendDoc = await db.collection('users').doc(email).get();
    if(TweetFriendDoc.exists){
        // console.log(email, TweetFriendDoc.data());
        callback(TweetFriendDoc.data());
    }
}

export const listenTweetDataFromDb = (email, tweetId, setTweetDataFromDb)=>{
    db
    .collection('users')
    .doc(email)
    .collection('tweets')
    .where('tweetId', '==', tweetId)
    .onSnapshot(snapshot=>{
        setTweetDataFromDb();
    });
}

export const setTweetDataFromDb = createAsyncThunk(
    'tweet/setTweetDataFromDb',
    async(tweetIdentifier)=>{
        const tweetDoc = await db.collection('users')
            .doc(tweetIdentifier.email)
            .collection('tweets')
            .where('tweetId', '==', tweetIdentifier.tweetId)
            .get();
        return tweetDoc.docs[0].data()
    }
)

export const tweetSlice = createSlice({
    name: 'tweet',
    initialState: {
        displayName: 'DisplayName',
        photoURL: 'https://i.pinimg.com/originals/9b/89/53/9b8953e917e3a44e0b03b60b603bd469.jpg',
        imageURL: 'https://media3.giphy.com/media/vXyIMuWbGTMtO/giphy.gif?cid=9af6c5eash8wyxh80bd8qbubg70wfe5fj56uuzb1aklym18u&rid=giphy.gif',
        numOfReplies: 999,
        message: 'testTweet',
        tweetId: 999,
        email: 'displayname@twitterclone.qa'
    },
    reducers: {
        test: (state, action)=> {
            //
        },
    },
    extraReducers: {
        [setTweetDataFromDb.fulfilled]: (state, action)=>{
            Object.assign(state, action.payload);
        },
    },
});

export const {test} = tweetSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getCurrentTweet = state => state.tweet;

export default tweetSlice.reducer;