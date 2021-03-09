import React, { useState } from 'react'
import styled from 'styled-components'
import Tweet from '../sub/Tweet'
import FeedbarHead from './FeedbarHead'
import FeedbarProfilebox from './FeedbarProfilebox'
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../Fire';
import {useSelector} from 'react-redux'
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
    const [likedTweets, loading2] = useCollection(
        db
        .collection('users')
        .doc(currentProfile.email)
        .collection('liked')
        .orderBy('timestamp', 'desc')
    );
    const [viewTweets, setViewTweets] = useState(true);
    const twts = viewTweets ? profileTweets : likedTweets;
    return (
        <FeedbarProfilepageContainer>
            <FeedbarHead pagename={'Profile'}/>
            <FeedbarProfileBody>
                <FeedbarProfilebox/>
                {viewTweets ? (
                    <ProfileTabGroup>
                        <ProfileTabsSelected>
                            Tweets
                        </ProfileTabsSelected>
                        <ProfileTabsUnselected onClick={()=>setViewTweets(prev=>!prev)}>
                            Liked
                        </ProfileTabsUnselected>
                    </ProfileTabGroup>

                ):(
                    <ProfileTabGroup>
                        <ProfileTabsUnselected onClick={()=>setViewTweets(prev=>!prev)}>
                            Tweets
                        </ProfileTabsUnselected>
                        <ProfileTabsSelected>
                            Liked
                        </ProfileTabsSelected>
                    </ProfileTabGroup>
                )}
                {twts?.docs.map(doc=>{
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
                            hideTweetCount={!viewTweets}
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

const ProfileTabGroup = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--twitter-dgray);
`;

const ProfileTabsSelected = styled.label`
    padding: 10px 0;
    flex: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid var(--twitter-blue);
`;

const ProfileTabsUnselected = styled.label`
    padding: 10px 0;
    flex: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid transparent;

    :hover {
        cursor: pointer;
        color: var(--twitter-blue);
    }
`;