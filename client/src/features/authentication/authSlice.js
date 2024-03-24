import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { authService } from './authService';

const getUser = JSON.parse(localStorage.getItem('myUser'));


// define the initial State of the app

const initialState = {
    user: getUser ? getUser : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    allUsers: [],
}

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        return authService.regUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})



export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        return await authService.logUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


export const getUserData = createAsyncThunk('auth/get-users', async (_, thunkAPI) => {
    try {
        return await authService.getUsers()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


export const updateUserData = createAsyncThunk('auth/update-info', async (data, thunkAPI) => {
    try {
        return await authService.updateUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})






// make your state accessible from anywhere

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allUsers = action.payload;
            })
            .addCase(updateUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })

    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer