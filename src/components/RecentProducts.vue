<!-- src/components/RecentProducts.vue -->
<template>
    <div class="recent-products">
      <h3>Recent Products</h3>
      
      <!-- Amount of Products -->
    <div class="product-count">
      Amount of Products: {{ totalProducts }}
    </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in recentProducts" :key="product.productId">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.category.name }}</td>
            <td>{{ 'R' + product.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { getProducts } from '@/services/productService';
  
  export default {
    data() {
      return {
        recentProducts: [],
        totalProducts: 0
      };
    },
    async created() {
      await this.fetchRecentProducts();
    },
    methods: {
      async fetchRecentProducts() {
        try {
          const products = await getProducts();
          this.totalProducts = products.length;
          this.recentProducts = products.slice(-3).reverse(); // Get the last 3 added products
        } catch (error) {
          console.error('Error fetching recent products:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .recent-products {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .product-count {
  margin-bottom: 10px;
  font-weight: bold;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  </style>