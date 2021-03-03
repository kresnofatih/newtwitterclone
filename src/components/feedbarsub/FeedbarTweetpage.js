import React from 'react'
import styled from 'styled-components'
import Tweet from '../sub/Tweet'
import Tweetpost from '../sub/Tweetpost'
import FeedbarHead from './FeedbarHead'

function FeedbarTweetpage() {
    return (
        <FeedbarTweetpageContainer>
            <FeedbarHead pagename={'Tweet'}/>
            <FeedbarTweetpageBody>
                <Tweetpost/>
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