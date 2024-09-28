// src/services/cartService.js
import axios from 'axios';

const API_URL = '/api/cart';

export async function getCartItems() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
}

export async function addToCart(item) {
  try {
    const response = await axios.post(API_URL, item);
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

export async function updateCartItem(id, item) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
}

export async function removeFromCart(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}