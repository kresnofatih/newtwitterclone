import React, { useEffect } from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentProfile, listenProfileDataFromDb, setProfileDataFromDb} from '../../features/profileSlice'

function FeedbarProfilebox() {
    const currentProfile = useSelector(getCurrentProfile);
    const dispatch = useDispatch();
    useEffect(()=>{
        listenProfileDataFromDb(currentProfile.email, ()=>{dispatch(setProfileDataFromDb(currentProfile.email))})
    }, [])
    return (
        <FeedbarProfileboxContainer>
            <FeedbarProfileBg>
                <img src={currentProfile?.bgPhotoURL} alt={currentProfile?.displayName}/>  
            </FeedbarProfileBg>
            <FeedbarProfileDetails>
                <FeedbarProfileDetailsUpper>
                    <FeedbarProfileAvatar 
                        src={currentProfile?.photoURL}
                        alt={currentProfile?.displayName}    
                    />
                    <label>follow</label>
                </FeedbarProfileDetailsUpper>
                <h2>{currentProfile?.displayName}</h2>
                <h3>@{currentProfile?.displayName}</h3>
                <FeedbarProfileFollowCount>
                    <h3>{currentProfile?.numOfFollowing}<p>Following</p></h3>
                    <h3>{currentProfile?.numOfFollowers}<p>Followers</p></h3>
                    <h3>{currentProfile?.numOfTweets}<p>Tweets</p></h3>
                </FeedbarProfileFollowCount>
            </FeedbarProfileDetails>
        </FeedbarProfileboxContainer>
    )
}

export default FeedbarProfilebox

const FeedbarProfileboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--twitter-dgray);
`;

const FeedbarProfileBg = styled.div`
    height: 200px;
    overflow-y: hidden;
    overflow-x: hidden;
    
    > img {
        width: 100%;
    }
`;

const FeedbarProfileDetails = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;

    > h2 {
        font-size: 20px;
    }
    > h3 {
        font-size: 18px;
        font-weight: 300;
        color: var(--twitter-dgray);
    }
`;
const FeedbarProfileDetailsUpper = styled.div`
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    > label {
        padding: 5px 20px;
        border: 2px solid var(--twitter-blue);
        border-radius: 50ch;
        font-weight: 600;
        color: white;

        :hover {
            cursor: pointer;
            background-color: var(--twitter-blue);
        }
    }

    
`;
const FeedbarProfileAvatar = styled(Avatar)`
    margin-top: -60px;
    height: 100px !important;
    width: 100px !important;

    :hover {
        cursor: pointer;
    }
`;

const FeedbarProfileFollowCount = styled.div`
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;

    > h3 {
        margin-right: 30px;
        display: flex;
        font-size: 16px;
        flex-direction: row;
    }
    > h3 > p {
        margin-left: 5px;
        font-weight: 200;
        color: var(--twitter-lgray);
    }
`;