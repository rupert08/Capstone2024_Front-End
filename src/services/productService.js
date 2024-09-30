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

export function deleteProduct(productId) {
  return axios.delete(`${API_URL}delete/${productId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting product:', error);
      throw error;
    });
}

export function createProduct(product, image) {
  const formData = new FormData();
  
  // Append the product details to the form data
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price);
  formData.append('category', product.categoryId);

  
  // Append the image file if it exists
  if (image) {
    formData.append('image', image);
  }

  formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
  
  return axios.post(`${API_URL}addProduct`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating product:', error);
      throw error;
    });
}