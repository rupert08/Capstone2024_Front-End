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
            <button @click="openUpdateModal(product)">Update</button>
            <button @click="removeProduct(product.productId)">Delete</button>
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
    <UpdateProductModal
      :isVisible="isUpdateModalVisible"
      @close="closeUpdateModal"
      @update-product="updateProduct"
      :productData="productToUpdate"
      :categories="categories"
    />
  </div>
</template>

<script>
import AddProductModal from '@/modals/AddProductModal.vue';
import UpdateProductModal from '@/modals/UpdateProductModal.vue';
import { getProducts, deleteProduct, createProduct, updateProduct } from '@/services/productService';
import { getCategories } from '@/services/categoryService';

export default {
  components: {
    AddProductModal,
    UpdateProductModal
  },
  data() {
    return {
      products: [],
      categories: [],
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      productToUpdate: null,
      sortKey: '',
      sortAsc: true
    };
  },
  async created() {
    await this.fetchProducts();
    await this.fetchCategories();
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
        console.log(this.categories);
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
    openUpdateModal(product) {
      this.productToUpdate = product;
      this.isUpdateModalVisible = true;
    },
    closeUpdateModal() {
      this.isUpdateModalVisible = false;
    },
    async addProduct(formData) {
      try {
        await createProduct(formData);
        await this.fetchProducts();
        this.closeAddModal();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    async updateProduct(formData) {
      try {
        await updateProduct(formData);
        await this.fetchProducts();
        this.closeUpdateModal();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    async removeProduct(productId) {
      console.log('Deleting product with ID:', productId);
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await deleteProduct(productId);
          await this.fetchProducts();
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