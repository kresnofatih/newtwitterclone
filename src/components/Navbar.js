import React from 'react'
import styled from 'styled-components'
import NavbarOption from './navbarsub/NavbarOption'
import TwitterIcon from '@material-ui/icons/Twitter';
import ExploreIcon from '@material-ui/icons/Explore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PersonIcon from '@material-ui/icons/Person';
import NavbarProfile from './navbarsub/NavbarProfile';
import NavbarTweeet from './navbarsub/NavbarTweeet';
import {useDispatch} from 'react-redux'
import {getCurrentScreen, openScreen} from '../features/appSlice'
import {useSelector} from 'react-redux'
import {getCurrentUser} from '../features/userSlice'
import { setProfile } from '../features/profileSlice';
import { auth } from '../Fire';

function Navbar() {
    const currentUser = useSelector(getCurrentUser);
    const currentScreen = useSelector(getCurrentScreen);
    const dispatch = useDispatch();
    const redirectScreen = (pagename) => {
        dispatch(openScreen({
            screen: pagename
        }))
    }
    return (
        <NavbarContainer>
            <NavbarContainerUpper>
                <NavbarOption Icon={TwitterIcon}onClick={()=>redirectScreen('Home')}/>
                <NavbarOption Icon={HomeIcon} text={'Home'} onClick={()=>redirectScreen('Home')}/>
                <NavbarOption Icon={ExploreIcon} text={'Explore'} onClick={()=>redirectScreen('Explore')}/>
                <NavbarOption Icon={NotificationsIcon} text={'Notifications'} onClick={()=>redirectScreen('Notifications')}/>
                <NavbarOption Icon={BookmarkIcon} text={'Bookmarks'} onClick={()=>redirectScreen('Bookmarks')}/>
                <NavbarOption 
                    Icon={PersonIcon} 
                    text={'Profile'} 
                    onClick={()=>{
                        dispatch(setProfile(currentUser));
                        redirectScreen('Profile');
                    }}
                />
                {currentScreen!=='Home' &&
                    <NavbarTweeet/>
                }
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

    @media (max-width: 815px){
        flex: 0.3;
    }
    @media (max-width: 730px){
        flex: 0.1;
    }

`;
const NavbarContainerUpper = styled.div``;
const NavbarContainerLower = styled.label``;