import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getCurrentUser, resetNumOfNotifications } from '../../features/userSlice'
import Tweet from '../sub/Tweet'
import FeedbarHead from './FeedbarHead'
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../Fire';
import FeedbarNotifBlank from './FeedbarNotifBlank'

function FeedbarNotif() {
    const currentUser = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const [userNotifs, loading] = useCollection(
        db
        .collection('users')
        .doc(currentUser.email)
        .collection('notifications')
        .orderBy('timestamp', 'desc')
    );
    useEffect(()=>{
        dispatch(resetNumOfNotifications());
    }, [])
    return (
        <FeedbarNotifContainer>
            <FeedbarHead pagename={'Notifications'}/>
            <FeedbarNotifBody>
            {userNotifs?.size===0 &&
                <FeedbarNotifBlank/>
            }
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
    ::-webkit-scrollbar {
        width: 0;
    }
`;