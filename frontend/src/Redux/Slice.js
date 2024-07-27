import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    UserId: null,
    role: null,
}

export const userAuthSlice = createSlice({
    name: "UserData",
    initialState,
    reducers: {
        loginData: (state, action) => {
            state.isAuthenticated = true;
            state.UserId = action.payload._id;
            state.role = action.payload.role
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.UserId = null;
            state.role = null

        }
    }
})

export const { loginData, logout } = userAuthSlice.actions
