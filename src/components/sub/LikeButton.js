import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { postTweetToUserLiked, incrementNumOfLikesFriendTweet, incrementNumOfLikesFriendHome, incrementNumOfLikesFriendFollowersHome, checkTweetLiked, getCurrentUserEmail } from '../../features/userSlice';

function LikeButton({friendTweetData, friendData}) {
    const currentUserEmail = useSelector(getCurrentUserEmail);
    const dispatch = useDispatch();
    const [tweetLiked, setTweetLiked] = React.useState(false);
    checkTweetLiked(currentUserEmail, friendTweetData.email, friendTweetData.tweetId, (state)=>setTweetLiked(state));
    return (
        <LikeButtonContainer>
            {tweetLiked ? (
                <Liked/>
            ):(
                <NotLikedYet onClick={()=>{
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
                    }));
                    dispatch(incrementNumOfLikesFriendHome({
                        friendEmail: friendTweetData.email,
                        friendTweetId: friendTweetData.tweetId
                    }))
                    dispatch(incrementNumOfLikesFriendFollowersHome({
                        friendEmail: friendTweetData.email,
                        friendTweetId: friendTweetData.tweetId,
                        friendFollowers: friendData.followers
                    }));
                }}/>
            )}
        </LikeButtonContainer>
    )
}

export default LikeButton

const LikeButtonContainer = styled.div`
    > .MuiSvgIcon-root {
        :hover {
            cursor: pointer;
        }
    }
`;

const Liked = styled(FavoriteIcon)`
    color: palevioletred;
`;
const NotLikedYet = styled(FavoriteBorderIcon)`
    :hover {
        color: var(--twitter-blue);
    }
`;