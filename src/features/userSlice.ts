import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    email: string,
}

export interface User {
    email:string
}

const initialState:InitialState = {
    email:''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo : (state,action: PayloadAction<User>) => {
            if(state != null) {
                state.email = action.payload.email
            }
        },
        deleteUserInfo : (state) => {
            state.email = ''
        }
    }

})

export const { setUserInfo,deleteUserInfo } = userSlice.actions

export default userSlice.reducer

// userInfo 안에 email, name 등을 넣어서 분류하고 각자 넣기
// 지금 signout계속 뜨는건 userInfo는 null이지만 user은 userInfo가 있기 때문..