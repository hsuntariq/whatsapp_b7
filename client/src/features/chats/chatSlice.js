import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from './chatService';

const initialState = {
    chats: [],
    chatLoading: false,
    chatSuccess: false,
    chatError: false,
    chatMessage: ''
}



export const addChatData = createAsyncThunk('chats/add-chat', async (data, thunkAPI) => {
    try {
        return await chatService.addChat(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


// add the message

export const addChatMessage = createAsyncThunk('chats/add-message', async (data, thunkAPI) => {
    try {
        return await chatService.addMessage(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})



// create the slice,make your state global

export const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        reset: (state) => {
            state.chatError = false;
            state.chatSuccess = false
            state.chatLoading = false;
            state.chatMessage = ''

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addChatData.pending, (state) => {
                state.chatLoading = true
            })
            .addCase(addChatData.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.chatMessage = action.payload
            })
            .addCase(addChatData.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                state.chats = action.payload
            })
            .addCase(addChatMessage.pending, (state) => {
                state.chatLoading = true
            })
            .addCase(addChatMessage.rejected, (state, action) => {
                state.chatLoading = false;
                state.chatError = true;
                state.chatMessage = action.payload
            })
            .addCase(addChatMessage.fulfilled, (state, action) => {
                state.chatLoading = false;
                state.chatSuccess = true;
                state.chats = action.payload
            })
    }
})



export const { reset } = chatSlice.actions;
export default chatSlice.reducer

