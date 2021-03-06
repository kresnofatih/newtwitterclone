import React from 'react'
import styled from 'styled-components'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import FeedbarTweetbox from '../feedbarsub/FeedbarTweetbox';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function ReplyButton({friendData, friendTweetData}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <ReplyButtonContainer>
            <ChatBubbleOutlineIcon onClick={handleToggle}/>
            <Backdrop className={classes.backdrop} open={open}>
                <ReplyboxContainer>
                    <CloseIcon onClick={handleClose}/>
                    <FeedbarTweetbox 
                        additionalCallbacks={handleClose} 
                        replyTweetData={{
                            friendEmail: friendData.email,
                            friendTweetId: friendTweetData.friendTweetId,
                            friendRepliedMessage: friendTweetData.friendRepliedMessage,
                            friendDisplayName: friendData.displayName,
                            friendFollowers: friendData.followers
                        }}
                    />
                </ReplyboxContainer>
            </Backdrop>
        </ReplyButtonContainer>
    )
}

export default ReplyButton

const ReplyButtonContainer = styled.div`
    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }
`;

const ReplyboxContainer = styled.div`
    width: 500px;
    background-color: black;
    border-radius: 20px;
    padding: 10px 10px;
    border: 1px solid var(--twitter-blue);
    display: flex;
    flex-direction: column;

    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }
`;