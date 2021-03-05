import React from 'react'
import styled from 'styled-components'
import Tweet from '../sub/Tweet'
import FeedbarHead from './FeedbarHead'
import FeedbarProfilebox from './FeedbarProfilebox'
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../Fire';
import {useSelector} from 'react-redux'
import {getCurrentUser} from '../../features/userSlice'
import { getCurrentProfile } from '../../features/profileSlice'

function FeedbarProfilepage() {
    const currentProfile = useSelector(getCurrentProfile);
    const [profileTweets, loading] = useCollection(
        db
        .collection('users')
        .doc(currentProfile.email)
        .collection('tweets')
        .orderBy('timestamp', 'desc')
    );
    return (
        <FeedbarProfilepageContainer>
            <FeedbarHead pagename={'Profile'}/>
            <FeedbarProfileBody>
                <FeedbarProfilebox/>
                {profileTweets?.docs.map(doc=>{
                    const {tweetId, photoURL, displayName, email, message, timestamp, imageURL, numOfReplies} = doc.data();
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
                        />
                    )
                })}
            </FeedbarProfileBody>
        </FeedbarProfilepageContainer>
    )
}

export default FeedbarProfilepage

const FeedbarProfilepageContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--twitter-dgray);
    border-right: 1px solid var(--twitter-dgray);
`;

const FeedbarProfileBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
`;