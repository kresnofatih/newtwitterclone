import React from 'react'
import styled from 'styled-components'

function FeedbarNotifBlank() {
    return (
        <FeedbarNotifBlankContainer>
            <img src="https://firebasestorage.googleapis.com/v0/b/newtwitterclone-b646c.appspot.com/o/app%2Fclip-waiting.png?alt=media&token=6d5e1199-9056-4c26-9edd-77e2162d59cb" alt=""/>
            <h2>You have no Notification Records!</h2>
            <h5>Start interacting with others!</h5>
        </FeedbarNotifBlankContainer>
    )
}

export default FeedbarNotifBlank

const FeedbarNotifBlankContainer = styled.div`
    border-top: 1px solid var(--twitter-dgray);
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
        text-align: center;
    }
    > h5 {
        margin-top: 5px;
        font-weight: 200;
        font-size: 18px;
        text-align: center;
    }
`