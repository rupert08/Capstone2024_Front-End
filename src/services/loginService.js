import axios from 'axios';

const API_URL = '/ecommerce/admin/';


export const loginAdmin = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}login`, loginData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
