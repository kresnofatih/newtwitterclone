import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RepeatIcon from '@material-ui/icons/Repeat';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTweet, getTweetFriendDataFromDb, listenTweetDataFromDb, setTweetDataFromDb } from '../../features/tweetSlice';
import { openScreen } from '../../features/appSlice';
import { setProfile } from '../../features/profileSlice';
import ReplyButton from './ReplyButton';
import LikeButton from './LikeButton';

function Tweetpost() {
    const dispatch = useDispatch();
    const currentTweet = useSelector(getCurrentTweet);
    const [tweetFriendData, setTweetFriendData] = useState('');
    const redirectScreen = (pagename) => {
        dispatch(openScreen({screen: pagename}))
    }
    const openProfileFromTweet = ()=>{
        dispatch(setProfile(tweetFriendData));
        redirectScreen('Profile');
    }
    useEffect(()=>{
        getTweetFriendDataFromDb(currentTweet.email, (data)=>setTweetFriendData(data));
        listenTweetDataFromDb(currentTweet.email, currentTweet.tweetId, ()=>{
            dispatch(setTweetDataFromDb({email: currentTweet.email, tweetId: currentTweet.tweetId}))
        });
    }, [])
    return (
        <TweetpostContainer>
            <TweetpostHeader>
                <TweetpostAvatar
                    alt=""
                    src={currentTweet.photoURL}
                    onClick={openProfileFromTweet}
                />
                <TweetpostName>
                    <h4>{currentTweet.displayName}</h4>
                    <h5>@{currentTweet.displayName}</h5>
                </TweetpostName>
            </TweetpostHeader>
            <h6>{currentTweet.message}</h6>
            <img alt="" src={currentTweet.imageURL}/>
            <p>{new Date(currentTweet?.timestamp?.toDate()).toUTCString()}</p>
            <TweetpostMetrics>
                <TweetpostMetric>
                    <h6>{currentTweet.numOfRetweets}</h6>
                    <p>Retweets</p>
                </TweetpostMetric>
                <TweetpostMetric>
                    <h6>{currentTweet.numOfReplies}</h6>
                    <p>Replies</p>
                </TweetpostMetric>
                <TweetpostMetric>
                    <h6>{currentTweet.numOfLikes}</h6>
                    <p>Likes</p>
                </TweetpostMetric>
            </TweetpostMetrics>
            <Tweetpostbuttons>
                <ReplyButton 
                    friendData={tweetFriendData} 
                    friendTweetData={{
                        friendTweetId: currentTweet.tweetId,
                        friendRepliedMessage: currentTweet.message
                    }}
                />
                <RepeatIcon/>
                <LikeButton 
                    friendData={tweetFriendData}
                    friendTweetData={{
                        displayName: currentTweet.displayName,
                        photoURL: currentTweet.photoURL,
                        imageURL: currentTweet.imageURL,
                        numOfReplies: currentTweet.numOfReplies,
                        numOfLikes: currentTweet.numOfLikes,
                        numOfRetweets: currentTweet.numOfRetweets,
                        timestamp: currentTweet.timestamp,
                        message: currentTweet.message,
                        tweetId: currentTweet.tweetId,
                        email: currentTweet.email
                    }}
                />
                <SaveAltIcon/>
            </Tweetpostbuttons>
        </TweetpostContainer>
    )
}

export default Tweetpost

const TweetpostContainer = styled.div`
    padding: 10px 20px;
    border-bottom: 1px solid var(--twitter-dgray);

    > h6 {
        padding: 10px 0;
        font-size: 20px;
        font-weight: 200;
    }

    > p {
        padding: 10px 0;
        padding-bottom: 20px;
        font-size: 14px;
        font-weight: 200;
        color: var(--twitter-lgray);
    }
    > img {
        width: 100%;
        margin: 10px 0;
        border-radius: 20px;
    }
`;

const TweetpostHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

const TweetpostAvatar = styled(Avatar)`
    margin-right: 10px;
    :hover {
        cursor: pointer;
    }
`;

const TweetpostName = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    :hover {
        cursor: pointer;
    }

    > h5 {
        font-weight: 200;
    }
`;

const TweetpostMetrics = styled.div`
    display: flex;
    justify-content: flex-start;
    border-top: 1px solid var(--twitter-dgray);
    border-bottom: 1px solid var(--twitter-dgray);
`;

const TweetpostMetric = styled.label`
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 30px;


    > h6 {
        margin-right: 5px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }

    > p {
        font-size: 16px;
        font-weight: 200;
        color: var(--twitter-lgray);
        
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }
`;

const Tweetpostbuttons = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-self: center;

    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }
`;