//orderService.js
import axios from 'axios';

const API_URL = '/ecommerce/order/';

export function getOrders() {
  return axios.get(`${API_URL}getAll`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching orders:', error);
      throw error;
    });
}

export function createOrder(order) {
  return axios.post(`${API_URL}create`, order)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating order:', error);
      throw error;
    });
}

export function updateOrder(orderID,order) {
  return axios.put(`${API_URL}update/${orderID}`, order)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating order:', error);
      throw error;
    });
}

export function deleteOrder(orderID) {
  return axios.delete(`${API_URL}delete/${orderID}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting order:', error);
      throw error;
    });
}