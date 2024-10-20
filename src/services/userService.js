import axios from 'axios';

export async function getUserDetails(token) {
    const response = await axios.get('/ecommerce/user/details', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export async function logoutUser() {
    // Send a request to the server to invalidate the token
    const response = await axios.post('/ecommerce/user/logout');
    return response.data;
}