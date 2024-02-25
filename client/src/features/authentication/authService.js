import axios from 'axios';

const base_url = 'http://localhost:3001/api/user';

const regUser = async (userData) => {
    const response = await axios.post(`${base_url}/register`, userData);
    if (response.data) {
        localStorage.setItem('myUser', JSON.stringify(response.data))
    }

    return response.data
}

const logUser = async (userData) => {
    const response = await axios.post(`${base_url}/login`, userData);
    if (response.data) {
        localStorage.setItem('myUser', JSON.stringify(response.data))
    }
    return response.data
}


const getUsers = async () => {
    const response = await axios.get(`${base_url}/get-users`);
    return response.data;
}



export const authService = {
    regUser,
    logUser,
    getUsers
}