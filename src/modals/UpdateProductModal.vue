<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <h3>Update Product</h3>

      <!-- Only show the form if product data is available -->
      <form v-if="updatedProduct">
        <div>
          <label for="name">Product Name</label>
          <input type="text" id="name" v-model="updatedProduct.name" />
        </div>

        <div>
          <label for="description">Description</label>
          <input type="text" id="description" v-model="updatedProduct.description" />
        </div>

        <div>
          <label for="price">Price</label>
          <input type="number" id="price" v-model="updatedProduct.price" />
        </div>

        <div class="control_wrapper">
                    <label for="category">Category</label>
                    <div class="control_wrapper">
                        <ejs-combobox
    id="combobox"
    :dataSource="categories ? categories : []"
    placeholder="Select a category"
    v-model="newProduct.categoryId"
    :fields="{ text: 'name', value: 'categoryId' }"
></ejs-combobox>
        </div>
                </div>

        <div>
          <label for="image">Image</label>
          <input type="file" id="image" @change="handleImageUpload" />
        </div>

        <button type="button" @click="submitUpdate">Update Product</button>
        <button type="button" @click="closeModal">Cancel</button>
      </form>

      <!-- Display a message if updatedProduct is null -->
      <p v-else>No product selected for update</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ComboBoxComponent as EjsCombobox } from "@syncfusion/ej2-vue-dropdowns";

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

export default {
    components: {
        EjsCombobox 
    },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    productData: {
      type: Object,
      default: () => null, // Default to null to avoid type errors
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      updatedProduct: this.productData ? { ...this.productData } : {},
      newImage: null,
    };
  },
  watch: {
    // Update the form data when the productData prop changes
    productData(newProduct) {
      if (newProduct) {
        this.updatedProduct = { ...newProduct };
      }
    },
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.newImage = file;
    },
    async submitUpdate() {
      const formData = new FormData();

      // Create a product object
      const updatedProduct = {
        name: this.updatedProduct.name,
        description: this.updatedProduct.description,
        price: this.updatedProduct.price.toFixed(2),
        category: { categoryId: this.updatedProduct.categoryId },
      };

      // Append the product object as a JSON blob
      formData.append('product', new Blob([JSON.stringify(updatedProduct)], { type: 'application/json' }));

      if (this.newImage) {
        formData.append('image', this.newImage);
      }

      console.log('Form Data:', formData); // Log form data
      try {
        await updateProduct(this.updatedProduct.productId, formData);
        this.$emit('update-product', formData);
        this.$emit('close'); // Close the modal after submission
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    closeModal() {
      // Emit the close event to close the modal
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
  background-color: white;
  border-radius: 8px;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #2980b9;
}

button.cancel-button {
  background-color: #e74c3c;
}

button.cancel-button:hover {
  background-color: #c0392b;
}

@import '~@syncfusion/ej2-base/styles/material.css';
@import '~@syncfusion/ej2-inputs/styles/material.css';
@import '~@syncfusion/ej2-vue-dropdowns/styles/material.css';
</style>