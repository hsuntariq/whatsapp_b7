import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const getUser = JSON.parse(localStorage.getItem('myUser'));


// define the initial State of the app

const initialState = {
    user: getUser ? getUser : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3001/api/user/register', data);


        // check if data exists
        if (response.data) {
            localStorage.setItem('myUser', JSON.stringify(response.data))
        }

        console.log(response)
        return response.data

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
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer