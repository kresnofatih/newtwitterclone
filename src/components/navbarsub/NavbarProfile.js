import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentUser} from '../../features/userSlice'
import { setProfile } from '../../features/profileSlice';
import { openScreen } from '../../features/appSlice';
import { auth } from '../../Fire';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function NavbarProfile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    return (
        <NavbarProfileContainer>
            <NavbarProfileLeft onClick={()=>{
                dispatch(setProfile(currentUser));
                dispatch(openScreen({screen: 'Profile'}));
            }}>
                <NavbarProfileAvatar
                    alt={currentUser?.displayName}
                    src={currentUser?.photoURL}
                />
                <NavbarProfileInfo>
                    <h4>{currentUser?.displayName}</h4>
                    <p>@{currentUser?.displayName}</p>
                </NavbarProfileInfo>
            </NavbarProfileLeft>
            <NavbarProfileRight>
                <NavigateNextIcon onClick={()=>{
                    auth.signOut();
                    window.location.reload();
                }}/>
            </NavbarProfileRight>
        </NavbarProfileContainer>
    )
}

export default NavbarProfile

const NavbarProfileLeft = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    :hover {
        cursor: pointer;
    }
`;
const NavbarProfileRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    :hover {
        cursor: pointer;
    }
`;

const NavbarProfileContainer = styled.div`
    margin: 0;
    margin-bottom: 10px;
    margin-right: 20px;
    padding: 15px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    :hover {
        /* cursor: pointer; */
        background-color: var(--twitter-dblue);
        border-radius: 50ch;
    }
`;

const NavbarProfileAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const NavbarProfileInfo = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > p {
        color: gray;
        font-size: 12px;
    }
`;