import React from 'react'
import styled from 'styled-components'
import Tweet from '../sub/Tweet'
import FeedbarHead from './FeedbarHead'

function FeedbarNotif() {
    return (
        <FeedbarNotifContainer>
            <FeedbarHead pagename={'Notifications'}/>
            <FeedbarNotifBody>
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>
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