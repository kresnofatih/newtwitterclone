import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getCurrentTweet } from '../../features/tweetSlice'
import { db } from '../../Fire'
import Tweet from '../sub/Tweet'
import Tweetpost from '../sub/Tweetpost'
import FeedbarHead from './FeedbarHead'

function FeedbarTweetpage() {
    const currentTweet = useSelector(getCurrentTweet);
    const [tweetReplies, loading] = useCollection(
        db
        .collection('users')
        .doc(currentTweet.email)
        .collection('tweets')
        .doc(currentTweet.email+currentTweet.tweetId)
        .collection('replies')
        .orderBy('timestamp', 'desc')
    );
    return (
        <FeedbarTweetpageContainer>
            <FeedbarHead pagename={'Tweet'}/>
            <FeedbarTweetpageBody>
                <Tweetpost/>
                {tweetReplies?.docs.map(doc=>{
                    const {tweetId, photoURL, displayName, email, message, timestamp, imageURL, numOfReplies, retweet} = doc.data();
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
                            email={email}
                            retweet={retweet}
                        />
                    )
                })}
            </FeedbarTweetpageBody>
        </FeedbarTweetpageContainer>
    )
}

export default FeedbarTweetpage

const FeedbarTweetpageContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--twitter-dgray);
    border-right: 1px solid var(--twitter-dgray);
`;

const FeedbarTweetpageBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
`