import React from 'react'
import styled from 'styled-components'

function FeedbarHomeBlank() {
    return (
        <FeedbarHomeBlankContainer>
            <img src="https://firebasestorage.googleapis.com/v0/b/newtwitterclone-b646c.appspot.com/o/app%2Fclip-message-sent.png?alt=media&token=98445e32-b878-41e7-8f1b-0e4e13cff0eb" alt=""/>
            <h2>Welcome to Twitter Clone!</h2>
            <h5>Home Page Empty? Make your first Tweet Now!</h5>
        </FeedbarHomeBlankContainer>
    )
}

export default FeedbarHomeBlank

const FeedbarHomeBlankContainer = styled.div`
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
    }
    > h5 {
        margin-top: 5px;
        font-weight: 200;
        font-size: 18px;
    }
`