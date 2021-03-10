import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getCurrentUserEmail } from '../../features/userSlice'
import { db } from '../../Fire'
import Loading from '../Loading'
import Tweet from '../sub/Tweet'
import FeedbarHead from './FeedbarHead'

function FeedbarBookmarks() {
    const currentUserEmail = useSelector(getCurrentUserEmail);
    const [userBookmarks, loading] = useCollection(
        db
        .collection('users')
        .doc(currentUserEmail)
        .collection('bookmarks')
        .orderBy('timestamp', 'desc')
    );
    return (
        <FeedbarBookmarksContainer>
            <FeedbarHead pagename={'Bookmarks'}/>
            <FeedbarBookmarksBody>
                {userBookmarks?.docs.map(doc=>{
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
                            hideTweetCount={true}
                        />
                    )
                })}
                {loading &&
                    // <Spinner name="ball-pulse-sync" color="steelblue"/>
                    <Loading/>
                }
            </FeedbarBookmarksBody>
        </FeedbarBookmarksContainer>
    )
}

export default FeedbarBookmarks

const FeedbarBookmarksContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--twitter-dgray);
    border-right: 1px solid var(--twitter-dgray);
`;

const FeedbarBookmarksBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
`;