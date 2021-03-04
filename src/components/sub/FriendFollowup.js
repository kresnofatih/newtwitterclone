import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { followFriend, unfollowFriend } from '../../features/userSlice';

function FriendFollowup({followingStatus, friendEmail}) {
    const dispatch = useDispatch();
    const [followUpAction, setFollowUpAction] = useState('');
    const doFollowUpAction = () => {
        if(followUpAction==='follow'){
            dispatch(followFriend({friendEmail: friendEmail}));
        } else if (followUpAction==='following'){
            dispatch(unfollowFriend({friendEmail: friendEmail}));
        }
    }
    useEffect(()=>{
        if(followingStatus===true){
            setFollowUpAction('following');
        } else if(followingStatus===false){
            setFollowUpAction('follow');
        }
    }, [followingStatus])
    return (
        <FriendFollowupContainer onClick={doFollowUpAction}>
            {followUpAction}
        </FriendFollowupContainer>
    )
}

export default FriendFollowup

const FriendFollowupContainer = styled.label`
    padding: 5px 20px;
    border: 2px solid var(--twitter-blue);
    border-radius: 50ch;
    font-weight: 600;
    color: white;

    :hover {
        cursor: pointer;
        background-color: var(--twitter-blue);
    }
`;