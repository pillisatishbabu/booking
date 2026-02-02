import { createSlice } from '@reduxjs/toolkit';
import { getToken, removeToken, setToken } from '../utils/authHelpers';

// Mock user for demo purposes since we don't have a real backend
const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
};

const initialState = {
    user: getToken() ? mockUser : null,
    isAuthenticated: !!getToken(),
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload; // In real app, payload would be user data
            setToken('mock-jwt-token');
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            removeToken();
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
