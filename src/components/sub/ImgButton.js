import React from 'react'
import styled from 'styled-components'
import ImageIcon from '@material-ui/icons/Image';
import { useDispatch } from 'react-redux';
import {storeImageToFireStorage, postImageURLToUserGallery} from '../../features/userSlice'

function ImgButton({submitImage}) {
    const dispatch = useDispatch();
    const submitSelectedPhoto = e =>{
        const file = e.target.files[0];
        dispatch(storeImageToFireStorage({file: file, callback: (url)=>{
            submitImage(url);
        }}));
    }
    return (
        <ImgButtonContainer>
            <input
                type="file"
                id="imgUploader"
                onChange={e=>{
                    submitSelectedPhoto(e);
                }}
            />
            <ImgButtonObject for="imgUploader">
                <ImageIcon/>
            </ImgButtonObject>
        </ImgButtonContainer>
    )
}

export default ImgButton

const ImgButtonContainer = styled.div`
    > input {
        display: none;
    }
`;

const ImgButtonObject = styled.label`
    > .MuiSvgIcon-root {
        font-size: 25px;
        color: var(--twitter-blue);
        :hover {
            cursor: pointer;
        }
    }
`;