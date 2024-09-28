<!-- src/views/adminviews/ProductManagement.vue -->
<template>
  <div class="management-section">
    <h3>Manage Products</h3>
    <button @click="addProduct">Add Product</button>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('id')">ID</th>
          <th @click="sortBy('name')">Name</th>
          <th @click="sortBy('category')">Category</th>
          <th @click="sortBy('price')">Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.productId">
          <td>{{ product.productId }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category.name }}</td>
          <td>{{ 'R' + product.price }}</td>
          <td>
            <button @click="updateProduct(product.productId)">Update</button>
            <button @click="deleteProduct(product.productId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getProducts, deleteProduct } from '@/services/productService';

export default {
  data() {
    return {
      products: [],
      sortKey: '',
      sortAsc: true
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        this.products = await getProducts();
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortAsc = !this.sortAsc;
      this.products.sort((a, b) => {
        let modifier = 1;
        if (!this.sortAsc) modifier = -1;
        if (a[key] < b[key]) return -1 * modifier;
        if (a[key] > b[key]) return 1 * modifier;
        return 0;
      });
    },
    addProduct() {
      // Implement add product logic here
    },
    updateProduct(productId) {
      alert(`Update product functionality for product ID ${productId} will be implemented later.`);
    },
    async deleteProduct(productId) {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await deleteProduct(productId);
          this.fetchProducts(); // Refresh the product list after deletion
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.management-section {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

button {
  padding: 5px 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>