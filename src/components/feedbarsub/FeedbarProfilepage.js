import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Tweet from '../sub/Tweet'
import FeedbarHead from './FeedbarHead'
import FeedbarProfilebox from './FeedbarProfilebox'
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '../../Fire';
import {useSelector} from 'react-redux'
import { getCurrentProfile } from '../../features/profileSlice'
import FeedbarProfileBlank from './FeedbarProfileBlank'
import Loading from '../Loading'

function FeedbarProfilepage() {
    const currentProfile = useSelector(getCurrentProfile);
    const [viewTweets, setViewTweets] = useState('tweets');
    const [currentView, setCurrentView] = useState('tweets'); // or likes
    const [profileTweets, loading] = useCollection(
        db
        .collection('users')
        .doc(currentProfile.email)
        .collection(currentView)
        .orderBy('timestamp', 'desc')
    );
    useEffect(()=>{
        setCurrentView(viewTweets);
    }, [viewTweets])
    return (
        <FeedbarProfilepageContainer>
            <FeedbarHead pagename={'Profile'}/>
            <FeedbarProfileBody>
                <FeedbarProfilebox/>
                {currentView==='tweets' && (
                    <ProfileTabGroup>
                        <ProfileTabsSelected>
                            Tweets
                        </ProfileTabsSelected>
                        <ProfileTabsUnselected onClick={()=>setViewTweets('retweets')}>
                            Retweets
                        </ProfileTabsUnselected>
                        <ProfileTabsUnselected onClick={()=>setViewTweets('liked')}>
                            Liked
                        </ProfileTabsUnselected>
                    </ProfileTabGroup>

                )}
                {currentView==='liked' && (
                        <ProfileTabGroup>
                            <ProfileTabsUnselected onClick={()=>setViewTweets('tweets')}>
                                Tweets
                            </ProfileTabsUnselected>
                            <ProfileTabsUnselected onClick={()=>setViewTweets('retweets')}>
                                Retweets
                            </ProfileTabsUnselected>
                            <ProfileTabsSelected>
                                Liked
                            </ProfileTabsSelected>
                        </ProfileTabGroup>
                )}
                {currentView==='retweets' && (
                        <ProfileTabGroup>
                            <ProfileTabsUnselected onClick={()=>setViewTweets('tweets')}>
                                Tweets
                            </ProfileTabsUnselected>
                            <ProfileTabsSelected>
                                Retweets
                            </ProfileTabsSelected>
                            <ProfileTabsUnselected onClick={()=>setViewTweets('liked')}>
                                Liked
                            </ProfileTabsUnselected>
                        </ProfileTabGroup>
                )}
                {profileTweets?.size===0 &&
                    <FeedbarProfileBlank name={currentView}/>
                }
                {profileTweets?.docs.map(doc=>{
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
                            hideTweetCount={retweet ? true : (currentView==='liked' ? true : false)}
                        />
                    )
                })}
                {loading &&
                    <Loading/>
                }
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
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid var(--twitter-blue);
`;

const ProfileTabsUnselected = styled.label`
    padding: 10px 0;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid transparent;

    :hover {
        cursor: pointer;
        color: var(--twitter-blue);
    }
`;