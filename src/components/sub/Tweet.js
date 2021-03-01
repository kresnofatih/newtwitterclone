import React from 'react'
import styled from 'styled-components'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Avatar from '@material-ui/core/Avatar'

function Tweet({photoURL, displayName, message, timestamp, image, retweet}) {
    return (
        <TweetContainer>
            <TweetLeft>
                <TweetAvatar
                    alt="displayname"
                    src="https://i.pinimg.com/originals/9b/89/53/9b8953e917e3a44e0b03b60b603bd469.jpg"
                />
            </TweetLeft>
            <TweetRight>
                <label>KresnoFatih&nbsp;<p>@KresnoFatih . 12 Feb</p></label>
                <h5>Minderan amat jd org. Haha. Sama</h5>
                <img alt="" src="https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg"/>
                <TweetCountContainer>
                    <TweetCount>
                        <ChatBubbleOutlineIcon/>
                        &nbsp;
                        &nbsp;
                        <p>20</p>
                    </TweetCount>
                    <TweetCount>
                        <RepeatIcon/>
                        &nbsp;
                        &nbsp;
                        <p>20</p>
                    </TweetCount>
                    <TweetCount>
                        <FavoriteBorderIcon/>
                        &nbsp;
                        &nbsp;
                        <p>20</p>
                    </TweetCount>
                    <SaveAltIcon/>
                </TweetCountContainer>
            </TweetRight>
        </TweetContainer>
    )
}

export default Tweet

const TweetContainer = styled.label`
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    border-bottom: 1px solid var(--twitter-dgray);

    :hover {
        cursor: pointer;
    }
`;

const TweetLeft = styled.div``;

const TweetRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    padding-left: 10px;

    > label {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 16px;

        :hover {
            cursor:pointer;
        }
    }
    > label > p{
        font-weight: 100;
        color: var(--twitter-lgray);
        font-size: 12px;
    }
    > h5 {
        margin: 2px 0;
        font-weight: 100;
        color: white;
        font-size: 14px;
    }
    > img {
        width: 100%;
        margin: 10px 0;
        border-radius: 20px;
    }
`;

const TweetCountContainer = styled.div`
    padding: 5px 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
        }
    }
`;

const TweetCount = styled.div`
    flex: 0.25;
    display: flex;

    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
        }
    }
`;

const TweetAvatar = styled(Avatar)`
    :hover {
        cursor: pointer;
    }
`;