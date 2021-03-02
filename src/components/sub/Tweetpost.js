import React from 'react'
import styled from 'styled-components'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Avatar from '@material-ui/core/Avatar';

function Tweetpost() {
    return (
        <TweetpostContainer>
            <TweetpostHeader>
                <TweetpostAvatar
                    alt=""
                    src="https://i.pinimg.com/originals/9b/89/53/9b8953e917e3a44e0b03b60b603bd469.jpg"
                />
                <TweetpostName>
                    <h4>Kresno Fatih</h4>
                    <h5>@KresnoFatih</h5>
                </TweetpostName>
            </TweetpostHeader>
            <h6>Minderan amat jadi orang. Hahaha. Sama</h6>
            <img alt="" src="https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg"/>
            <p>7:47 PM . Feb 14, 2020</p>
            <TweetpostMetrics>
                <TweetpostMetric>
                    <h6>8763</h6>
                    <p>Retweets</p>
                </TweetpostMetric>
                <TweetpostMetric>
                    <h6>276</h6>
                    <p>Replies</p>
                </TweetpostMetric>
                <TweetpostMetric>
                    <h6>331</h6>
                    <p>Likes</p>
                </TweetpostMetric>
            </TweetpostMetrics>
            <Tweetpostbuttons>
                <ChatBubbleOutlineIcon/>
                <RepeatIcon/>
                <FavoriteBorderIcon/>
                <SaveAltIcon/>
            </Tweetpostbuttons>
        </TweetpostContainer>
    )
}

export default Tweetpost

const TweetpostContainer = styled.div`
    padding: 10px 20px;
    border-bottom: 1px solid var(--twitter-dgray);

    > h6 {
        padding: 10px 0;
        font-size: 20px;
        font-weight: 200;
    }

    > p {
        padding: 10px 0;
        padding-bottom: 20px;
        font-size: 14px;
        font-weight: 200;
        color: var(--twitter-lgray);
    }
    > img {
        width: 100%;
        margin: 10px 0;
        border-radius: 20px;
    }
`;

const TweetpostHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

const TweetpostAvatar = styled(Avatar)`
    margin-right: 10px;
    :hover {
        cursor: pointer;
    }
`;

const TweetpostName = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    :hover {
        cursor: pointer;
    }

    > h5 {
        font-weight: 200;
    }
`;

const TweetpostMetrics = styled.div`
    display: flex;
    justify-content: flex-start;
    border-top: 1px solid var(--twitter-dgray);
    border-bottom: 1px solid var(--twitter-dgray);
`;

const TweetpostMetric = styled.label`
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 30px;


    > h6 {
        margin-right: 5px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }

    > p {
        font-size: 16px;
        font-weight: 200;
        color: var(--twitter-lgray);
        
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }
`;

const Tweetpostbuttons = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-self: center;

    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }
`;