import React from 'react'
import styled from 'styled-components'
import Tweet from '../sub/Tweet'
import FeedbarHead from './FeedbarHead'
import FeedbarTweetbox from './FeedbarTweetbox'

function FeedbarHome() {
    return (
        <FeedbarHomeContainer>
            <FeedbarHead pagename={'Home'}/>
            <FeedbarHomeBody>
                <FeedbarTweetbox/>
                <Tweet/>
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
`
