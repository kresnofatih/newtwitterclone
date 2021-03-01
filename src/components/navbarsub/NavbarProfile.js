import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function NavbarProfile() {
    return (
        <NavbarProfileContainer>
            <NavbarProfileLeft>
                <NavbarProfileAvatar
                    alt="userdisplayname"
                    src="https://i.imgur.com/hlMIFj7.jpg"
                />
                <NavbarProfileInfo>
                    <h4>Kresno Fatih</h4>
                    <p>@KresnoFatih</p>
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