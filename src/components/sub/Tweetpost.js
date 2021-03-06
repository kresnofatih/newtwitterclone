import React, { useEffect } from 'react'
import styled from 'styled-components'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTweet, listenTweetDataFromDb, setTweetDataFromDb } from '../../features/tweetSlice';

function Tweetpost() {
    const currentTweet = useSelector(getCurrentTweet);
    const dispatch = useDispatch();
    useEffect(()=>{
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
                    <h6>0</h6>
                    <p>Retweets</p>
                </TweetpostMetric>
                <TweetpostMetric>
                    <h6>{currentTweet.numOfReplies}</h6>
                    <p>Replies</p>
                </TweetpostMetric>
                <TweetpostMetric>
                    <h6>0</h6>
                    <p>Likes</p>
                </TweetpostMetric>
            </TweetpostMetrics>
            <Tweetpostbuttons>
                <ChatBubbleOutlineIcon/>
                <RepeatIcon/>
                <FavoriteBorderIcon/>
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