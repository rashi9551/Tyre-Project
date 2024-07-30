import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    shopName: null,
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
            state.shopName = action.payload.shopName;
            state.role = 'role'
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.shopName = null
            state.UserId = null;
            state.role = null

        }
    }
})
export const adminAuthSlice = createSlice({
    name: "adminData",
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.isAuthenticated = true;
            state.role = 'admin'
        },
        adminLogout: (state) => {
            state.isAuthenticated = false;
            state.role = null
        }
    }
})


export const { loginData, logout } = userAuthSlice.actions;
export const { adminLogin, adminLogout } = adminAuthSlice.actions;
