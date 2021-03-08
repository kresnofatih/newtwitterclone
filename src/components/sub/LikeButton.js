import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { postTweetToUserLiked, incrementNumOfLikesFriendTweet } from '../../features/userSlice';

function LikeButton({friendTweetData}) {
    const dispatch = useDispatch();
    return (
        <LikeButtonContainer>
            <FavoriteBorderIcon onClick={()=>{
                console.log(friendTweetData);
                dispatch(postTweetToUserLiked({
                    displayName: friendTweetData.displayName,
                    photoURL: friendTweetData.photoURL,
                    imageURL: friendTweetData.imageURL,
                    numOfReplies: friendTweetData.numOfReplies,
                    numOfRetweets: friendTweetData.numOfRetweets,
                    numOfLikes: friendTweetData.numOfLikes,
                    timestamp: friendTweetData.timestamp,
                    message: friendTweetData.message,
                    tweetId: friendTweetData.tweetId,
                    email: friendTweetData.email
                }));
                dispatch(incrementNumOfLikesFriendTweet({
                    friendEmail: friendTweetData.email,
                    friendTweetId: friendTweetData.tweetId
                }))
            }}/>
        </LikeButtonContainer>
    )
}

export default LikeButton

const LikeButtonContainer = styled.div`
    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }
`;