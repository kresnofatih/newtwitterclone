import React from 'react'
import styled from 'styled-components'
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

function NavbarTweeet() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <>
            <NavbarTweetContainer onClick={handleToggle}>
                <h4>Tweet</h4>
            </NavbarTweetContainer>
            <Backdrop className={classes.backdrop} open={open}>
                <TweeetboxContainer>
                    <CloseIcon onClick={handleClose}/>
                    <FeedbarTweetbox additionalCallbacks={handleClose}/>
                </TweeetboxContainer>
            </Backdrop>
        </>
    )
}


export default NavbarTweeet

const NavbarTweetContainer = styled.label`
    margin: 20px 0;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    padding: 15px 10px;
    background-color: var(--twitter-blue);
    color: white;
    border-radius: 50ch;

    :hover {
        cursor: pointer;
        
        > h4 {
            font-style: italic;
        }
    }
`;

const TweeetboxContainer = styled.div`
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