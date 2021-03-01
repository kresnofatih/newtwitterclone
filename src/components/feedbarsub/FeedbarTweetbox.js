import React from 'react'
import styled from 'styled-components'
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import PollIcon from '@material-ui/icons/Poll';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Avatar from '@material-ui/core/Avatar';

function FeedbarTweetbox() {
    return (
        <FeedbarTweetboxContainer>
            <FeedbarTweetboxLeft>
                <TweetboxAvatar
                    alt=""
                    src="https://3.bp.blogspot.com/-NbuCiSzSexA/WafsJZMb9fI/AAAAAAAAhiM/DnhbVyUGSi47tIUZTyh4CWMa7rw_iGnLgCLcBGAs/s1600/1408830065792.jpg"
                />
            </FeedbarTweetboxLeft>
            <FeedbarTweetboxRight>
                <input type="text" placeholder="What's Happening?"/>
                <FeedbarTweetboxOptions>
                    <FeedbarTweetboxOptionsLeft>
                        <ImageIcon/>
                        &nbsp;
                        &nbsp;
                        <GifIcon/>
                        &nbsp;
                        &nbsp;
                        <PollIcon/>
                        &nbsp;
                        &nbsp;
                        <EmojiEmotionsIcon/>
                    </FeedbarTweetboxOptionsLeft>
                    <TweetButton>
                        Tweet
                    </TweetButton>
                </FeedbarTweetboxOptions>
            </FeedbarTweetboxRight>
        </FeedbarTweetboxContainer>
    )
}

export default FeedbarTweetbox

const FeedbarTweetboxContainer = styled.div`
    margin: 0;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-bottom: 1px solid var(--twitter-dgray);
`;

const FeedbarTweetboxLeft = styled.div`
    flex: 0.1;
`;
const FeedbarTweetboxRight = styled.div`
    flex: 0.9;
    display: flex;
    flex-direction: column;

    > input {
        padding: 10px;
        padding-bottom: 20px;
        font-size: 16px;
        background-color: transparent;
        outline: none;
        border: none;
        color: white;
    }
`;

const FeedbarTweetboxOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid var(--twitter-dgray);
`;
const FeedbarTweetboxOptionsLeft = styled.div`
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    
    > .MuiSvgIcon-root {
        font-size: 25px;
        color: var(--twitter-blue);
        :hover {
            cursor: pointer;
        }
    }
    `;

const TweetButton = styled.label`
    padding: 5px 10px;
    margin: 0;
    font-size: 14px;
    border-radius: 50ch;
    background-color: var(--twitter-blue);

    :hover {
        cursor: pointer;
    }
`;

const TweetboxAvatar = styled(Avatar)`
    :hover {
        cursor: pointer;
    }
`;