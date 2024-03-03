import axios from "axios";
const base_url = 'http://localhost:3001/api/chats';

const addChat = async (userData) => {
    const response = await axios.post(`${base_url}/add-chat`, userData);
    return response.data
}


const addMessage = async (chatData) => {
    const response = await axios.post(`${base_url}/add-message`, chatData);
    return response.data
}




export const chatService = {
    addChat,
    addMessage
}