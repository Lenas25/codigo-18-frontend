import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState:{
        userName: 'Lena Suarez',
    },
    reducers:{
        setUserName: (state, param) => {
            state.userName = param.payload;
        }
    }
})


export const userSliceReducer = userSlice.reducer;

export const {setUserName} = userSlice.actions;