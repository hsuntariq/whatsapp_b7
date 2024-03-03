import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice'
import chatReducer from '../features/chats/chatSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer
  },
});
