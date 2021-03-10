import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getCurrentTempBgPhotoUrl, setTempBgPhotoUrl } from '../../features/editprofileSlice';
import { getCurrentProfileEmail } from '../../features/profileSlice';
import { getCurrentUserEmail, storeProfileBgToFireStorage } from '../../features/userSlice';

function ProfileBg({source, alternative, uploadDisabled}) {
    const currentUserEmail = useSelector(getCurrentUserEmail);
    const currentProfileEmail = useSelector(getCurrentProfileEmail);
    const currentBgPhotoUrl = useSelector(getCurrentTempBgPhotoUrl);
    const dispatch = useDispatch();
    const changeProfileBg = e=>{
        const file = e.target.files[0];
        dispatch(storeProfileBgToFireStorage({file: file, callback: (url)=>{
            dispatch(setTempBgPhotoUrl({tempBgPhotoUrl: url}));
        }}));
    }
    const changeableProfileBg = (currentUserEmail===currentProfileEmail) ? "profileBgUploader" : '';
    
    return (
        <ProfileBgContainer>
            {!uploadDisabled ? (
                <>
                    <input type="file" id="profileBgUploader" onChange={e=>changeProfileBg(e)}/>
                    <label for={changeableProfileBg}><img src={currentBgPhotoUrl ? currentBgPhotoUrl : source} alt={alternative}/></label>
                </>

            ):(
                <label>
                    <img src={source} alt={alternative}/>
                </label>
            )}
        </ProfileBgContainer>
    )
}

export default ProfileBg

const ProfileBgContainer = styled.div`
    height: 200px;
    overflow-y: hidden;
    overflow-x: hidden;
    
    > label {
        width: 100%;
        :hover {
            cursor: pointer;
        }
    }
    > label > img {
        width: 100%;
    }
    >input {
        display: none;
    }
`;