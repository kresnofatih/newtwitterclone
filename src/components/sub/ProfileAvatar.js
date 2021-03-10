import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { storeProfileAvatarToFireStorage,
    getCurrentUserEmail
} from '../../features/userSlice';
import {getCurrentProfileEmail} from '../../features/profileSlice';
import { getCurrentTempPhotoUrl, setTempPhotoUrl } from '../../features/editprofileSlice';

function ProfileAvatar({source, alternative, uploadDisabled}) {
    const currentUserEmail = useSelector(getCurrentUserEmail);
    const currentProfileEmail = useSelector(getCurrentProfileEmail);
    const currentPhotoUrl = useSelector(getCurrentTempPhotoUrl);
    const dispatch = useDispatch();
    const changeProfileAvatar = e =>{
        const file = e.target.files[0];
        dispatch(storeProfileAvatarToFireStorage({file: file, callback: (url)=>{
            dispatch(setTempPhotoUrl({tempPhotoUrl: url}));
        }}));
    };
    const changeableProfileAvatar = (currentUserEmail===currentProfileEmail) ? "profileAvatarUploader" : '';
    return (
        <ProfileAvatarContainer>
            {!uploadDisabled ? (
                <>
                    <input type="file" id="profileAvatarUploader" onChange={e=>changeProfileAvatar(e)}/>
                    <label for={changeableProfileAvatar}>
                        <ProfileAvatarObject src={currentPhotoUrl ? currentPhotoUrl : source} alt={alternative}/>
                    </label>
                </>
            ):(
                <label>
                    <ProfileAvatarObject src={source} alt={alternative}/>
                </label>
            )}
        </ProfileAvatarContainer>
    )
}

export default ProfileAvatar

const ProfileAvatarContainer = styled.div`
    > input {
        display: none;
    }
`;

const ProfileAvatarObject = styled(Avatar)`
    margin-top: -60px;
    height: 100px !important;
    width: 100px !important;

    :hover {
        cursor: pointer;
    }
`;