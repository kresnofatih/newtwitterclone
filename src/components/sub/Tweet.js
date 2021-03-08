import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RepeatIcon from '@material-ui/icons/Repeat';
import Avatar from '@material-ui/core/Avatar'
import {useDispatch} from 'react-redux'
import {openScreen} from '../../features/appSlice'
import { setProfile} from '../../features/profileSlice';
import { getTweetFriendDataFromDb, setTweetDataFromDb } from '../../features/tweetSlice';
import ReplyButton from './ReplyButton';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';

function Tweet({
    tweetId, 
    email, 
    photoURL, 
    displayName, 
    message, 
    timestamp, 
    imageURL, 
    numOfReplies,
    numOfLikes,
    numOfRetweets,
    hideTweetCount
}) {
    const [tweetFriendData, setTweetFriendData] = useState('')
    const dispatch = useDispatch();
    const redirectScreen = (pagename) => {
        dispatch(openScreen({screen: pagename}))
    }
    const openProfileFromTweet = ()=>{
        dispatch(setProfile(tweetFriendData));
        redirectScreen('Profile');
    }
    useEffect(()=>{
        getTweetFriendDataFromDb(email, (data)=>setTweetFriendData(data));
    }, [])
    return (
        <TweetContainer>
            <TweetLeft>
                <TweetAvatar
                    alt={displayName}
                    src={photoURL}
                    onClick={openProfileFromTweet}
                />
            </TweetLeft>
            <TweetRight>
                <label>{displayName}&nbsp;<p>@{displayName}{' . '}{new Date(timestamp?.toDate()).toUTCString()}</p></label>
                <TweetContent onClick={()=>{
                    dispatch(setTweetDataFromDb({email: email, tweetId: tweetId})).then(()=>{
                        redirectScreen('Tweet');
                    });
                }}>
                    <h5>{message}</h5>
                    <img alt="" src={imageURL}/>
                </TweetContent>
                {!hideTweetCount &&
                    <TweetCountContainer>
                        <TweetCount>
                            <ReplyButton 
                                friendData={tweetFriendData} 
                                friendTweetData={{
                                    friendTweetId: tweetId,
                                    friendRepliedMessage: message
                                }}
                            />&nbsp;&nbsp;<p>{numOfReplies}</p>
                        </TweetCount>
                        <TweetCount>
                            <RepeatIcon/>&nbsp;&nbsp;<p>0</p>
                        </TweetCount>
                        <TweetCount>
                            <LikeButton 
                                friendData={tweetFriendData}
                                friendTweetData={{
                                    displayName: displayName,
                                    photoURL: photoURL,
                                    imageURL: imageURL,
                                    numOfReplies: numOfReplies,
                                    numOfLikes: numOfLikes,
                                    numOfRetweets: numOfRetweets,
                                    timestamp: timestamp,
                                    message: message,
                                    tweetId: tweetId,
                                    email: email
                                }}
                            />&nbsp;&nbsp;<p>{numOfLikes}</p>
                        </TweetCount>
                        <BookmarkButton
                            friendData={tweetFriendData}
                            friendTweetData={{
                                displayName: displayName,
                                photoURL: photoURL,
                                imageURL: imageURL,
                                numOfReplies: numOfReplies,
                                numOfLikes: numOfLikes,
                                numOfRetweets: numOfRetweets,
                                timestamp: timestamp,
                                message: message,
                                tweetId: tweetId,
                                email: email
                            }}
                        />
                    </TweetCountContainer>
                }
            </TweetRight>
        </TweetContainer>
    )
}

export default Tweet

const TweetContainer = styled.label`
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    border-top: 1px solid var(--twitter-dgray);

    :hover {
        cursor: pointer;
    }
`;

const TweetContent = styled.label`
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    margin: 0 !important;

    :hover {
        cursor: pointer !important;
    }
    
    > h5 {
        margin: 2px 0 !important;
        font-weight: 100 !important;
        color: white !important;
        font-size: 14px !important;
    }
    > img {
        width: auto !important;
        max-width: 100% !important;
        max-height: 400px !important;
        margin: 10px 0 !important;
        border-radius: 20px !important;
    }
`;

const TweetLeft = styled.div``;

const TweetRight = styled.label`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    padding-left: 10px;

    :hover {
        cursor: pointer;
    }

    > label {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 16px;

        :hover {
            cursor:pointer;
        }
    }
    > label > p {
        font-weight: 100;
        color: var(--twitter-dgray);
        font-size: 12px;
    }
`;

const TweetCountContainer = styled.div`
    padding: 5px 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
        }
    }
`;

const TweetCount = styled.div`
    flex: 0.25;
    display: flex;

    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
        }
    }
`;

const TweetAvatar = styled(Avatar)`
    :hover {
        cursor: pointer;
    }
`;