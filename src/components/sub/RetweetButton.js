import React, { useState } from 'react'
import styled from 'styled-components'
import RepeatIcon from '@material-ui/icons/Repeat';
import { useDispatch, useSelector } from 'react-redux';
import { postRetweetToUserTweets, postRetweetToUserRetweets,
    postRetweetToUserFollowersHome, postRetweetToUserHome,
    incrementNumOfRetweetsToFriendTweet,
    incrementNumOfRetweetsToFriendHome,
    incrementNumOfRetweetsToFriendFollowersHome,
    getCurrentUserEmail, checkTweetRetweeted, incrementNextTweetId, incrementNumOfTweets
} from '../../features/userSlice'
import firebase from 'firebase'


function RetweetButton({friendTweetData, friendData}) {
    const currentUserEmail = useSelector(getCurrentUserEmail);
    const dispatch = useDispatch();
    const [tweetRetweeted, setTweetRetweeted] = useState(false);
    checkTweetRetweeted(
        currentUserEmail,
        friendTweetData.email,
        friendTweetData.tweetId,
        (state)=>setTweetRetweeted(state));
    return (
        <RetweetButtonContainer>
        {tweetRetweeted ? (
            <Retweeted/>
        ):(
            <NotRetweeted
                onClick={()=>{
                    const retweetData = {
                        displayName: friendTweetData.displayName,
                        photoURL: friendTweetData.photoURL,
                        imageURL: friendTweetData.imageURL,
                        numOfReplies: friendTweetData.numOfReplies,
                        numOfRetweets: friendTweetData.numOfRetweets,
                        numOfLikes: friendTweetData.numOfLikes,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        message: friendTweetData.message,
                        tweetId: friendTweetData.tweetId,
                        email: friendTweetData.email
                    }
                    dispatch(postRetweetToUserTweets(retweetData));
                    dispatch(postRetweetToUserRetweets(retweetData));
                    dispatch(postRetweetToUserHome(retweetData));
                    dispatch(postRetweetToUserFollowersHome(retweetData));
                    dispatch(incrementNumOfRetweetsToFriendTweet({
                        friendEmail: friendTweetData.email,
                        friendTweetId: friendTweetData.tweetId
                    }));
                    dispatch(incrementNumOfRetweetsToFriendHome({
                        friendEmail: friendTweetData.email,
                        friendTweetId: friendTweetData.tweetId
                    }));
                    dispatch(incrementNumOfRetweetsToFriendFollowersHome({
                        friendEmail: friendTweetData.email,
                        friendTweetId: friendTweetData.tweetId,
                        friendFollowers: friendData.followers
                    }));
                    dispatch(incrementNextTweetId());
                    dispatch(incrementNumOfTweets());
                }}
            />
        )}
        </RetweetButtonContainer>
    )
}

export default RetweetButton

const RetweetButtonContainer = styled.div``;

const NotRetweeted = styled(RepeatIcon)`
    :hover {
        color: var(--twitter-blue);
    }
    `;
const Retweeted = styled(RepeatIcon)`
    color: orange;
`;