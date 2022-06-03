import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    userInfo: null | string
}

const initialState:InitialState = {
    userInfo: localStorage.getItem('user') || null
}

export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo : (state,action: PayloadAction<string>) => {
            state.userInfo = action.payload
        },
        deleteUserInfo : (state) => {
            state.userInfo = null
        }
    }

})

export const { setUserInfo,deleteUserInfo } = userSlice.actions

export default userSlice.reducer