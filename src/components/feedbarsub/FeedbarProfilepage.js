import React from 'react'
import styled from 'styled-components'
import FeedbarHead from './FeedbarHead'
import FeedbarProfilebox from './FeedbarProfilebox'

function FeedbarProfilepage() {
    return (
        <FeedbarProfilepageContainer>
            <FeedbarHead pagename={'Profile'}/>
            <FeedbarProfileBody>
                <FeedbarProfilebox/>
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