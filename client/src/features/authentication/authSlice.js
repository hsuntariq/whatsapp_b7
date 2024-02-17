import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



// get the user from the localstorge
const getUser = JSON.parse(localStorage.getItem('myUser'))

// define the initialState of your app

const initialState = {
    user: getUser ? getUser : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}


// create the slice

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ''
        }
    },
    extraReducers: () => { }
})



export const { reset } = authSlice.actions;
export default authSlice.reducer