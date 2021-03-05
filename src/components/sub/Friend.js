import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import FriendFollowup from './FriendFollowup';
import {useDispatch, useSelector} from 'react-redux'
import {openScreen} from '../../features/appSlice'
import { setProfile } from '../../features/profileSlice';
import { foundInUserFollowing, getCurrentUser } from '../../features/userSlice';

function Friend({friendData}) {
    const currentUser = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const openFriendProfile = () => {
        dispatch(setProfile(friendData));
        dispatch(openScreen({
            screen: 'Profile'
        }));
    }
    const foundInFollowing = foundInUserFollowing(currentUser, friendData.email);
    return (
        <FriendContainer>
            <FriendLeft onClick={openFriendProfile}>
                <FriendAvatar 
                    src={friendData.photoURL} 
                    alt={friendData.displayName}
                    onClick={openFriendProfile}
                />
                <FriendLeftInfo>
                    <h4>{friendData.displayName}</h4>
                    <p>@{friendData.displayName}</p>
                </FriendLeftInfo>
            </FriendLeft>
            {currentUser.email!==friendData.email &&
                <FriendFollowup 
                    followingStatus={foundInFollowing}
                    friendEmail={friendData.email}
                />
            }
        </FriendContainer>
    )
}

export default Friend

const FriendContainer = styled.label`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,0.1);

    :hover {
        cursor: pointer;
        background-color: var(--twitter-dblue);
    }
`;

const FriendLeft = styled.label`
    display: flex;
    align-items: center;

    :hover {
        cursor: pointer;
    }
`;

const FriendLeftInfo = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > p {
        color: gray;
        font-size: 12px;
    }
`;

const FriendAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;