import React from 'react'
import styled from 'styled-components'
import NavbarOption from './navbarsub/NavbarOption'
import TwitterIcon from '@material-ui/icons/Twitter';
import ExploreIcon from '@material-ui/icons/Explore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NavbarProfile from './navbarsub/NavbarProfile';
import NavbarTweeet from './navbarsub/NavbarTweeet';

function Navbar() {
    return (
        <NavbarContainer>
            <NavbarContainerUpper>
                <NavbarOption Icon={TwitterIcon} onClick={()=>console.log('twitter logo')}/>
                <NavbarOption Icon={HomeIcon} text={'Home'}/>
                <NavbarOption Icon={ExploreIcon} text={'Explore'}/>
                <NavbarOption Icon={NotificationsIcon} text={'Notifications'}/>
                <NavbarOption Icon={EmailIcon} text={'Messages'}/>
                <NavbarOption Icon={BookmarkIcon} text={'Bookmarks'}/>
                <NavbarOption Icon={ListAltIcon} text={'Lists'}/>
                <NavbarOption Icon={PersonIcon} text={'Profile'}/>
                <NavbarOption Icon={MoreHorizIcon} text={'More'}/>
                <NavbarTweeet/>
            </NavbarContainerUpper>
            <NavbarContainerLower>
                <NavbarProfile/>
            </NavbarContainerLower>
        </NavbarContainer>
    )
}

export default Navbar

const NavbarContainer = styled.div`
    flex: 0.25;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const NavbarContainerUpper = styled.div``;
const NavbarContainerLower = styled.div``;