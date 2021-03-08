import React from 'react'
import styled from 'styled-components'
import Tweet from '../sub/Tweet'
import FeedbarHead from './FeedbarHead'
import FeedbarTweetbox from './FeedbarTweetbox'
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../Fire';
import {useSelector} from 'react-redux'
import {getCurrentUser} from '../../features/userSlice'

function FeedbarHome() {
    const currentUser = useSelector(getCurrentUser);
    const [homeTweets, loading] = useCollection(
        db
            .collection('users')
            .doc(currentUser.email)
            .collection('home')
            .orderBy('timestamp', 'desc')
    );
    return (
        <FeedbarHomeContainer>
            <FeedbarHead pagename={'Home'}/>
            <FeedbarHomeBody>
                <FeedbarTweetbox/>
                {homeTweets?.docs.map(doc=>{
                    const {tweetId,
                        photoURL,
                        displayName,
                        email,
                        message,
                        timestamp,
                        imageURL,
                        numOfReplies,
                        numOfRetweets,
                        numOfLikes
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
                        />
                    )
                })}
            </FeedbarHomeBody>
        </FeedbarHomeContainer>
    )
}

export default FeedbarHome

const FeedbarHomeContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--twitter-dgray);
    border-right: 1px solid var(--twitter-dgray);
`

const FeedbarHomeBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
`
