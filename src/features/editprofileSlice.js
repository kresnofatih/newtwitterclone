import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const editprofileSlice = createSlice({
    name: 'editprofile',
    initialState: {
        tempBgPhotoUrl: '',
        tempPhotoUrl: ''
    },
    reducers: {
        setTempBgPhotoUrl: (state, action)=>{
            state.tempBgPhotoUrl = action.payload.tempBgPhotoUrl;
        },
        setTempPhotoUrl: (state, action)=>{
            state.tempPhotoUrl = action.payload.tempPhotoUrl;
        },
    },
});

export const {setTempBgPhotoUrl, setTempPhotoUrl} = editprofileSlice.actions;

export const getCurrentTempBgPhotoUrl = state => state.editprofile.tempBgPhotoUrl;
export const getCurrentTempPhotoUrl = state => state.editprofile.tempPhotoUrl;

export default editprofileSlice.reducer;