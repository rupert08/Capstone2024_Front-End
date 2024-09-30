<!-- src/views/adminviews/ProductManagement.vue -->
<template>
  <div class="management-section">
    <h3>Manage Products</h3>
    <button @click="openAddModal">Add Product</button>
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
    <!-- Modals -->
    <AddProductModal
    :isVisible="isAddModalVisible"
    @close="closeAddModal"
    @add-product="addProduct"
    :categories="categories"
    />
  </div>
</template>

<script>

import AddProductModal from '@/modals/AddProductModal.vue';
import { getProducts, deleteProduct, createProduct } from '@/services/productService';
import { getCategories } from '@/services/categoryService';  // Import category fetching function

export default {
  components: {
    AddProductModal,
    //UpdateCustomerModal
  },
  data() {
    return {
      products: [],
      categories: [],
      isAddModalVisible: false, 
      sortKey: '',
      sortAsc: true
    };
  },
  async created() {
    await this.fetchProducts();
    await this.fetchCategories();  // Fetch categories on component load
    
  },
  methods: {
    async fetchProducts() {
      try {
        this.products = await getProducts();
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchCategories() {
  try {
    this.categories = await getCategories();
    console.log(this.categories); // Log to verify that categories are fetched
    this.filteredCategories = this.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
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
    openAddModal() {
      this.isAddModalVisible = true;
    },
    closeAddModal() {
      this.isAddModalVisible = false;
    },

    async addProduct(newProduct) {
    try {
        console.log(newProduct); // Add this line to verify the emitted data
        await createProduct(newProduct); // Make sure this function is working as expected
        await this.fetchProducts(); // Refresh the products list after addition
        this.closeAddModal();
    } catch (error) {
        console.error('Error adding product:', error);
    }
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