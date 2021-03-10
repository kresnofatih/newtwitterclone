import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getCurrentProfile } from '../../features/profileSlice';
import ProfileAvatar from './ProfileAvatar';
import ProfileBg from './ProfileBg'
import TextField from '@material-ui/core/TextField';
import { checkDisplayNameUsed, postImageURLToUserGallery, updateUserBgPhotoUrl, updateUserDisplayName, updateUserPhotoUrl } from '../../features/userSlice';
import { getCurrentTempBgPhotoUrl, getCurrentTempPhotoUrl } from '../../features/editprofileSlice';

function EditProfileForm({additionalCallbacks}) {
    const currentPhotoUrl = useSelector(getCurrentTempPhotoUrl); // tempprofileavatar
    const currentBgPhotoUrl = useSelector(getCurrentTempBgPhotoUrl); // tempprofilebg
    const dispatch = useDispatch();
    const currentProfile = useSelector(getCurrentProfile);
    const [tempDisplayName, setTempDisplayName] = useState(currentProfile.displayName);
    const [displayNameUsed, setDisplayNameUsed] = useState(true);
    const [displayNameLengthEnough, setDisplayNameLengthEnough] = useState(false);
    useEffect(()=>{
        const delayDebounceFn = setTimeout(()=>{
            if(tempDisplayName.length>6){
                setDisplayNameLengthEnough(true);
                checkDisplayNameUsed(tempDisplayName, (state)=>setDisplayNameUsed(state));
            } else {
                setDisplayNameLengthEnough(false);
            }
        }, 1000)

        return ()=>clearTimeout(delayDebounceFn)
    }, [tempDisplayName])
    return (
        <EditProfileFormContainer>
            <ProfileBg source={currentProfile?.bgPhotoURL} alternative={currentProfile?.displayName}/>
            <ProfileAvatar
                source={currentProfile?.photoURL}
                alternative={currentProfile?.displayName}
            />
            <TextField 
                id="outlined-basic"
                error={displayNameLengthEnough ? (displayNameUsed ? tempDisplayName!==currentProfile.displayName : false) : true}
                helperText={displayNameLengthEnough ? (displayNameUsed ? (tempDisplayName!==currentProfile.displayName ? 'DisplayName Already Taken' : '') : '') : 'At least 6 characters'}
                label="DisplayName" 
                value={tempDisplayName}
                onChange={e=>setTempDisplayName(e.target.value)}
                variant="outlined"
            />
            {(displayNameUsed && tempDisplayName!==currentProfile.displayName) ? (
                <SaveText>
                    Save
                </SaveText>
            ):(
                <SaveButton onClick={()=>{
                    // profileavatar
                    dispatch(postImageURLToUserGallery({imageURL: currentPhotoUrl}));
                    dispatch(updateUserPhotoUrl({photoURL: currentPhotoUrl}));
                    // profilebg
                    dispatch(updateUserBgPhotoUrl({bgPhotoURL: currentBgPhotoUrl}));
                    dispatch(updateUserDisplayName({displayName: tempDisplayName}));
                    setDisplayNameUsed(true);
                    additionalCallbacks();
                }}>
                    Save
                </SaveButton>
            )}
        </EditProfileFormContainer>
    )
}

export default EditProfileForm

const SaveButton = styled.label`
    margin-bottom: 20px;
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
const SaveText = styled.label`
    margin-bottom: 20px;
    padding: 5px 20px;
    border: 2px solid var(--twitter-dgray);
    border-radius: 50ch;
    font-weight: 600;
    color: var(--twitter-dgray);

    :hover {
        cursor: pointer;
    }
`;

const EditProfileFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > .MuiTextField-root {
        margin-bottom: 10px;
        margin-top: 20px;
        width: 90%;

        > .MuiFormLabel-root {
            color: gray !important;
        }

        > .MuiInputBase-root {
            color: white;

            > .MuiOutlinedInput-notchedOutline {
                border-color: var(--twitter-blue);
            }
        }

        > .Mui-error {
            > .MuiOutlinedInput-notchedOutline {
                border-color: #f44336;
            }
        }

    }
`;