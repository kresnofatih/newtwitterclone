import React from 'react'
import styled from 'styled-components'

function FeedbarBookmarkBlank() {
    return (
        <FeedbarBookmarkBlankContainer>
            <img src="https://firebasestorage.googleapis.com/v0/b/newtwitterclone-b646c.appspot.com/o/app%2Fclip-994.png?alt=media&token=d6e4aaef-dc1e-44eb-87bc-9aecf050b1e6" alt=""/>
            <h2>You have no Bookmarks!</h2>
            <h5>Bookmark a Tweet Now!</h5>
        </FeedbarBookmarkBlankContainer>
    )
}

export default FeedbarBookmarkBlank

const FeedbarBookmarkBlankContainer = styled.div`
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
`;
