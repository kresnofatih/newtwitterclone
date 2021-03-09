import {createSlice} from '@reduxjs/toolkit';

export const imgbtnSlice = createSlice({
    name: 'imgbtn',
    initialState: {
        tempImgUrl: ''
    },
    reducers: {
        setTempImgUrl: (state, action)=>{
            state.tempImgUrl = action.payload.tempImgUrl;
        }
    },
});

export const {setTempImgUrl} = imgbtnSlice.actions;

export const getCurrentTempImgUrl = state => state.imgbtn.tempImgUrl;

export default imgbtnSlice.reducer;