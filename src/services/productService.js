// import axios from 'axios';
//
// const API_URL = '/ecommerce/products/'; // Define the API URL for products
//
// export function getProducts () {
//     return axios.get(`${API_URL}getAll`)
//         .then(response => {
//             console.log('Products response:', response.data); // Log the response data
//             return response.data; // Ensure this is returning an array of products
//         })
//         .catch(error => {
//             console.error('Error fetching products:', error);
//             throw error;
//         });
// }
//   export function deleteProduct (productId) {
//     return axios.delete(`${API_URL}delete/${id}`)
//       .then(response => {
//         console.log('Product deleted:', response.data);
//         return response.data;
//       })
//       .catch(error => {
//         console.error('Error deleting product:', error);
//         throw error;
//       });
//   }
//
// src/services/productService.mjs
import axios from 'axios';

const API_URL = '/ecommerce/products/';


export function getProducts() {
  return axios.get(`${API_URL}getAll`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching products:', error);
      throw error;
    });
}
export function createProduct(formData) {
    return axios.post(`${API_URL}addProduct`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating product:', error);
            throw error;
        });
}
export function updateProduct(productId, formData) {
    return axios.put(`${API_URL}update/${productId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error updating product:', error);
            throw error;
        });
}

export function deleteProduct(productId) {
  return axios.delete(`${API_URL}delete/${productId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting product:', error);
      throw error;
    });
}