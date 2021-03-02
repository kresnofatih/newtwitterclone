import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useSelector} from 'react-redux'
import {getCurrentUser} from '../../features/userSlice'

function NavbarProfile() {
    const currentUser = useSelector(getCurrentUser);
    return (
        <NavbarProfileContainer>
            <NavbarProfileLeft>
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
                <MoreHorizIcon/>
            </NavbarProfileRight>
        </NavbarProfileContainer>
    )
}

export default NavbarProfile

const NavbarProfileLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;
const NavbarProfileRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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
        cursor: pointer;
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
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > p {
        color: gray;
        font-size: 12px;
    }
`;