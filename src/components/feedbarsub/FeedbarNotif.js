import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getCurrentUser } from '../../features/userSlice'
import Tweet from '../sub/Tweet'
import FeedbarHead from './FeedbarHead'
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../Fire';

function FeedbarNotif() {
    const currentUser = useSelector(getCurrentUser);
    const [userNotifs, loading] = useCollection(
        db
        .collection('users')
        .doc(currentUser.email)
        .collection('notifications')
        .orderBy('timestamp', 'desc')
    );
    return (
        <FeedbarNotifContainer>
            <FeedbarHead pagename={'Notifications'}/>
            <FeedbarNotifBody>
            {userNotifs?.docs.map(doc=>{
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
                        hideTweetCount={true}
                    />
                )
            })}
            </FeedbarNotifBody>
        </FeedbarNotifContainer>
    )
}

export default FeedbarNotif

const FeedbarNotifContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--twitter-dgray);
    border-right: 1px solid var(--twitter-dgray);
`;

const FeedbarNotifBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
`;