import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getCurrentTrendName, openScreen } from '../../features/appSlice';
import { db } from '../../Fire';
import Loading from '../Loading';
import Tweet from '../sub/Tweet';
import FeedbarHead from './FeedbarHead'

function FeedbarTrendPage() {
    const currentTrendName = useSelector(getCurrentTrendName);
    const [trendname, setTrendname] = useState('anime');
    const [trendTweets, loading] = useCollection(
        db
            .collection('trends')
            .doc(trendname)
            .collection('tweets')
            .orderBy('timestamp', 'desc')
    );
    const dispatch = useDispatch();
    const backToExplore = ()=>{
        dispatch(openScreen({screen: 'Explore'}));
    }
    useEffect(()=>{
        setTrendname(currentTrendName);
    }, [currentTrendName])
    return (
        <FeedbarTrendPageContainer>
            <FeedbarHead pagename="Trend"/>
            <FeedbarTrendPageBody>
                <TrendHead>
                    <img src="https://firebasestorage.googleapis.com/v0/b/newtwitterclone-b646c.appspot.com/o/app%2Fclip-financial-report.png?alt=media&token=821b83ce-b546-46cb-83bc-7e7f28c058e2" alt=""/>
                    <h2>You searched for #{trendname}!</h2>
                    <h5>Search for other trends in Twitter Clone!</h5>
                    <BackToExploreBtn onClick={backToExplore}>
                        Explore
                    </BackToExploreBtn>
                </TrendHead>
                {loading &&
                    <Loading/>
                }
                {trendTweets?.docs.map(doc=>{
                    const {tweetId,
                        photoURL,
                        displayName,
                        email,
                        message,
                        timestamp,
                        imageURL,
                        numOfReplies,
                        numOfRetweets,
                        numOfLikes,
                        retweet
                    } = doc.data();
                    return (
                        <Tweet
                            key={tweetId+'.'+displayName}
                            tweetId={tweetId}
                            photoURL={photoURL}
                            displayName={displayName}
                            message={message}
                            timestamp={timestamp}
                            imageURL={imageURL}
                            numOfReplies={numOfReplies}
                            numOfLikes={numOfLikes}
                            numOfRetweets={numOfRetweets}
                            email={email}
                            retweet={retweet}
                            hideTweetCount={true}
                        />
                    )
                })}
            </FeedbarTrendPageBody>
        </FeedbarTrendPageContainer>
    )
}

export default FeedbarTrendPage

const BackToExploreBtn = styled.label`
    margin-top: 20px;
    width: 100px;
    padding: 5px 20px;
    border: 2px solid var(--twitter-blue);
    border-radius: 50ch;
    font-weight: 600;
    color: white;

    :hover {
        cursor: pointer;
        background-color: var(--twitter-blue);
    }
`;

const TrendHead = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 50px;

    > img {
        width: 70%;
        margin-bottom: 30px;
    }

    > h2 {
        color: var(--twitter-blue);
        font-weight: 300;
    }
    > h5 {
        margin-top: 5px;
        font-weight: 200;
        font-size: 18px;
    }
`;

const FeedbarTrendPageContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--twitter-dgray);
    border-right: 1px solid var(--twitter-dgray);
`;

const FeedbarTrendPageBody = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    overflow-y: auto;
    scrollbar-width: none;
`
