import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import {useSelector} from 'react-redux'
import {getCurrentUser,
    incrementNumOfRepliesFriendFollowersHome,
    incrementNumOfRepliesFriendHome,
    incrementNumOfRepliesFriendTweet,
    incrementNumOfTweetsTrends,
    postImageURLToUserGallery,
    postToTaggedFriendsNotif,
    postTweetToFollowersHome,
    postTweetToFriendTweetReply,
    postTweetToTrends
} from '../../features/userSlice'
import GifButton from '../sub/GifButton';
import {useDispatch} from 'react-redux'
import { postTweetToUserHome, 
    postTweetToUserTweets, 
    incrementNextTweetId,
    incrementNumOfTweets, 
} from '../../features/userSlice';
import ImgButton from '../sub/ImgButton';
import { getCurrentTempImgUrl, setTempImgUrl } from '../../features/imgbtnSlice';

function FeedbarTweetbox({additionalCallbacks, replyTweetData}) {
    // redux
    const currentUser = useSelector(getCurrentUser);
    const currentTempImgUrl = String(useSelector(getCurrentTempImgUrl));
    const dispatch = useDispatch();

    // tweet message
    const [tweetMessage, setTweetMessage] = useState('');
    const removeTweetMessage = ()=>setTweetMessage('');
    
    // tweet image
    const [tweetImageURL, setTweetImageURL] = useState('');
    const removeTweetImage = () => {
        dispatch(setTempImgUrl({tempImgUrl: ""}));
    };

    const postTheTweet = () => {
        const postTweetData = {imageURL: tweetImageURL, message: tweetMessage};
        dispatch(postTweetToUserTweets(postTweetData));
        dispatch(postTweetToUserHome(postTweetData));
        dispatch(postTweetToFollowersHome(postTweetData));
        dispatch(postToTaggedFriendsNotif(postTweetData));
        dispatch(postTweetToTrends(postTweetData));
        if(tweetImageURL){
            dispatch(postImageURLToUserGallery({imageURL: tweetImageURL}));
        }
        if(replyTweetData){
            dispatch(postTweetToFriendTweetReply({
                friendEmail: replyTweetData.friendEmail,
                friendTweetId: replyTweetData.friendTweetId,
                imageURL: tweetImageURL,
                message: tweetMessage
            }));
            dispatch(incrementNumOfRepliesFriendTweet({
                friendEmail: replyTweetData.friendEmail,
                friendTweetId: replyTweetData.friendTweetId,
            }));
            dispatch(incrementNumOfRepliesFriendHome({
                friendEmail: replyTweetData.friendEmail,
                friendTweetId: replyTweetData.friendTweetId,
            }));
            dispatch(incrementNumOfRepliesFriendFollowersHome({
                friendEmail: replyTweetData.friendEmail,
                friendTweetId: replyTweetData.friendTweetId,
                friendFollowers: replyTweetData.friendFollowers
            }));
            dispatch(incrementNumOfTweetsTrends({
                friendEmail: replyTweetData.friendEmail,
                friendTweetId: replyTweetData.friendTweetId,
                friendRepliedMessage: replyTweetData.friendRepliedMessage
            }));
        }
        dispatch(incrementNextTweetId());
        dispatch(incrementNumOfTweets());
        removeTweetImage();
        removeTweetMessage();
    }

    useEffect(()=>{
        setTweetImageURL(currentTempImgUrl);
        if(replyTweetData){
            setTweetMessage('@'+replyTweetData?.friendDisplayName+' ')
        }
    }, [replyTweetData, currentTempImgUrl])
    return (
        <FeedbarTweetboxContainer>
            <FeedbarTweetboxLeft>
                <TweetboxAvatar
                    alt={currentUser?.displayName}
                    src={currentUser?.photoURL}
                />
            </FeedbarTweetboxLeft>
            <FeedbarTweetboxRight>
                <input 
                    type="text" 
                    placeholder="What's Happening?" 
                    value={tweetMessage}
                    onChange={e=>setTweetMessage(e.target.value)}
                    autoFocus
                />
                {tweetImageURL &&
                    <>
                        <CloseIcon onClick={removeTweetImage}/>
                        <img src={tweetImageURL} alt=""/>
                    </>
                }
                <FeedbarTweetboxOptions>
                    <FeedbarTweetboxOptionsLeft>
                        <ImgButton/>&nbsp;&nbsp;
                        <GifButton/>
                    </FeedbarTweetboxOptionsLeft>
                    <TweetButton onClick={()=>{
                        postTheTweet();
                        if(additionalCallbacks){
                            additionalCallbacks();
                        }
                    }}>
                        Tweet
                    </TweetButton>
                </FeedbarTweetboxOptions>
            </FeedbarTweetboxRight>
        </FeedbarTweetboxContainer>
    )
}

export default FeedbarTweetbox

const FeedbarTweetboxContainer = styled.div`
    margin: 0;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    /* border-bottom: 1px solid var(--twitter-dgray); */
    background-color: black;
`;

const FeedbarTweetboxLeft = styled.div`
    flex: 0.1;
`;
const FeedbarTweetboxRight = styled.div`
    flex: 0.9;
    display: flex;
    flex-direction: column;

    > input {
        padding: 10px;
        padding-bottom: 20px;
        font-size: 16px;
        background-color: transparent;
        outline: none;
        border: none;
        color: white;
    }

    > img {
        max-height: 400px;
        width: auto;
        max-width: 100%;
        border-radius: 20px;
    }

    > .MuiSvgIcon-root {
        margin-bottom: -25px;
        z-index: 20;
        color: var(--twitter-blue);
        :hover {
            cursor:pointer;
        }
    }
`;

const FeedbarTweetboxOptions = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid var(--twitter-dgray);
`;
const FeedbarTweetboxOptionsLeft = styled.div`
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    
    > .MuiSvgIcon-root {
        font-size: 25px;
        color: var(--twitter-blue);
        :hover {
            cursor: pointer;
        }
    }
    `;

const TweetButton = styled.label`
    padding: 5px 10px;
    margin: 0;
    font-size: 14px;
    border-radius: 50ch;
    background-color: var(--twitter-blue);

    :hover {
        cursor: pointer;
    }
`;

const TweetboxAvatar = styled(Avatar)`
    :hover {
        cursor: pointer;
    }
`;