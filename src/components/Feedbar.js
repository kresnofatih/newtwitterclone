import React from 'react'
import styled from 'styled-components'
import FeedbarHome from './feedbarsub/FeedbarHome'

function Feedbar() {
    return (
        <FeedbarContainer>
            <FeedbarHome/>
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