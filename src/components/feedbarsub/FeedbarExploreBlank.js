import React from 'react'
import styled from 'styled-components'

function FeedbarExploreBlank() {
    return (
        <FeedbarExploreBlankContainer>
            <img src="https://firebasestorage.googleapis.com/v0/b/newtwitterclone-b646c.appspot.com/o/app%2Fclip-remote-work.png?alt=media&token=3553d271-7e41-431b-87c4-5f832c51f93e" alt=""/>
            <h2>No Results Found!</h2>
            <h5>Let's get searching!</h5>
        </FeedbarExploreBlankContainer>
    )
}

export default FeedbarExploreBlank

const FeedbarExploreBlankContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 50px;

    > img {
        width: 70%;
        margin-bottom: 30px;
    }

    > h2 {
        color: var(--twitter-blue);
        font-weight: 300;
    }
    > h5 {
        margin-top: 5px;
        font-weight: 200;
        font-size: 18px;
    }
`;