import React from 'react'
import styled from 'styled-components'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Avatar from '@material-ui/core/Avatar'
import {useDispatch} from 'react-redux'
import {openScreen} from '../../features/appSlice'

function Tweet({tweetId, photoURL, displayName, message, timestamp, imageURL, numOfReplies}) {
    const dispatch = useDispatch();
    const redirectScreen = (pagename) => {
        dispatch(openScreen({
            screen: pagename
        }))
    }
    return (
        <TweetContainer onClick={()=>redirectScreen('Tweet')}>
            <TweetLeft>
                <TweetAvatar
                    alt={displayName}
                    src={photoURL}
                />
            </TweetLeft>
            <TweetRight>
                <label>{displayName}&nbsp;<p>@{displayName}{' . '}{new Date(timestamp?.toDate()).toUTCString()}</p></label>
                <h5>{message}</h5>
                <img alt="" src={imageURL}/>
                <TweetCountContainer>
                    <TweetCount>
                        <ChatBubbleOutlineIcon/>&nbsp;&nbsp;<p>{numOfReplies}</p>
                    </TweetCount>
                    <TweetCount>
                        <RepeatIcon/>&nbsp;&nbsp;<p>0</p>
                    </TweetCount>
                    <TweetCount>
                        <FavoriteBorderIcon/>&nbsp;&nbsp;<p>0</p>
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
    border-top: 1px solid var(--twitter-dgray);

    :hover {
        cursor: pointer;
    }
`;

const TweetLeft = styled.div``;

const TweetRight = styled.div`
    width: 100%;
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