import axios from 'axios';

export const registerCustomer = async (customerData) => {
  try {
    const response = await axios.post('/api/register', customerData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to register customer');
  }
};