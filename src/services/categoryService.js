import axios from 'axios';

const API_URL = '/ecommerce/categories/';

export function getCategories() {
  return axios.get(`${API_URL}getAll`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching categories:', error);
      throw error;
    });
}

export function deleteCategory(categoryId) {
  return axios.delete(`${API_URL}delete/${categoryId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting category:', error);
      throw error;
    });
}

export function updateCategory(category) {
  return axios.put(`${API_URL}update`, category)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating category:', error);
      throw error;
    });
}

export function createCategory(category) {
  return axios.post(`${API_URL}create`, category)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating category:', error);
      throw error;
    });
}