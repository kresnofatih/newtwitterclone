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
                <NavbarOption Icon={TwitterIcon} onClick={()=>{
                    auth.signOut();
                    window.location.reload();
                }}/>
                <NavbarOption Icon={HomeIcon} text={'Home'} onClick={()=>redirectScreen('Home')}/>
                <NavbarOption Icon={ExploreIcon} text={'Explore'} onClick={()=>redirectScreen('Explore')}/>
                <NavbarOption Icon={NotificationsIcon} text={'Notifications'} onClick={()=>redirectScreen('Notifications')}/>
                <NavbarOption Icon={EmailIcon} text={'Messages'}/>
                <NavbarOption Icon={BookmarkIcon} text={'Bookmarks'} onClick={()=>redirectScreen('Bookmarks')}/>
                <NavbarOption Icon={ListAltIcon} text={'Lists'}/>
                <NavbarOption 
                    Icon={PersonIcon} 
                    text={'Profile'} 
                    onClick={()=>{
                        dispatch(setProfile(currentUser));
                        redirectScreen('Profile');
                    }}
                />
                <NavbarOption Icon={MoreHorizIcon} text={'More'}/>
                {currentScreen!=='Home' &&
                    <NavbarTweeet/>
                }
            </NavbarContainerUpper>
            <NavbarContainerLower onClick={()=>{
                dispatch(setProfile(currentUser));
                redirectScreen('Profile');
            }}>
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
const NavbarContainerLower = styled.label``;