import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getFollowingFollowers } from '../../features/profileSlice';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Friend from './Friend';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function FollowListButton({followers, profileFollowersList}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const followListName = followers ? 'Followers' : 'Following'
    const [followingData] = useState([]);
    const [hasFollowingData, setHasFollowingData] = useState(false);
    useEffect(()=>{
        setHasFollowingData(false);
        if(profileFollowersList.length>0){
            followingData.splice(0, followingData.length);
            getFollowingFollowers(profileFollowersList, (data)=>{
                followingData.push(data);
            }).then(()=>{
                setHasFollowingData(true);
            })
        }
    }, [profileFollowersList])
    return (
        <>
            <FollowListButtonObject onClick={handleToggle}>
                <p>{followListName}</p>
            </FollowListButtonObject>
            <Backdrop className={classes.backdrop} open={open}>
                <FollowListContainer>
                    <FollowListHead>
                        <CloseIcon onClick={handleClose}/>
                        <h3>{followListName}</h3>
                    </FollowListHead>
                    <FollowsContainer onClick={handleToggle}>
                    {hasFollowingData && followingData.map(data=>(
                        <Friend friendData={data} additionalCallbacks={handleClose}/>
                    ))}
                    </FollowsContainer>
                </FollowListContainer>
            </Backdrop>
        </>
    )
}

export default FollowListButton

const FollowListButtonObject = styled.label`
    margin-left: 5px;

    > p {
        font-weight: 200;
        color: var(--twitter-lgray);
        :hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
`;

const FollowListContainer = styled.div`
    overflow: hidden;
    width: 500px;
    background-color: black;
    border-radius: 20px;
    padding: 10px 0;
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

const FollowListHead = styled.div`
    padding: 10px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid var(--twitter-dgray);

    > .MuiSvgIcon-root {
        margin-right: 10px;
        margin-top: 3px;
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }
`;

const FollowsContainer = styled.label`
    display: flex;
    flex-direction: column;
`;