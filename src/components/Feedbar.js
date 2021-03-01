import React from 'react'
import styled from 'styled-components'
import FeedbarHome from './feedbarsub/FeedbarHome'
import FeedbarTweetpage from './feedbarsub/FeedbarTweetpage'

function Feedbar() {
    return (
        <FeedbarContainer>
            {/* <FeedbarHome/> */}
            <FeedbarTweetpage/>
        </FeedbarContainer>
    )
}

export default Feedbar

const FeedbarContainer = styled.div`
    height: 100vh;
    flex: 0.5;
    display: flex;
    flex-direction: column;
`;