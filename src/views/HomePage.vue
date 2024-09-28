<template>
  <div class="container">
    <header class="header">
      <h1 class="center-align">Welcome to Our Hardware Store</h1>
    </header>
    <div class="center-align" style="margin-bottom: 20px;">
      <router-link to="/about" class="btn">About Us</router-link>
    </div>
    <div class="row">
      <!-- Sidebar for Categories -->
      <div class="col s12 m3 categories-sidebar">
        <div class="collection with-header">
          <div class="collection-header"><h5>Categories</h5></div>
          <a v-if="categories.length === 0" class="collection-item">No categories available</a>
          <a v-for="category in categories" :key="category.id" href="#!" class="collection-item">
            <img v-if="category.image" :src="category.image" alt="Category Image" class="circle category-image">
            {{ category.name }}
          </a>
        </div>
      </div>

      <!-- Product Section -->
      <div class="col s12 m9">
        <div class="row">
          <div v-if="products.length === 0" class="col s12"><p>No products available</p></div>
          <div class="col s12 m6 l4" v-for="product in products" :key="product.id">
            <div class="card">
              <div class="card-image">
                <img :src="product.image" alt="Product Image">
                <span class="card-title">{{ product.name }}</span>
              </div>
              <div class="card-content">
                <p>{{ product.description }}</p>
                <p><strong>Price:</strong> ${{ product.price }}</p>
              </div>
              <div class="card-action">
                <a href="/cart">Add to Cart</a>
                <a :href="'/product/' + product.id">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { getProducts } from '@/services/productService.js';
import { getCategories } from '@/services/categoryService';

export default {
  name: 'HomePage',
  setup() {
    const products = ref([]);
    const categories = ref([]);

    onMounted(async () => {
  try {
    products.value = await getProducts();
    categories.value = await getCategories();
    console.log(categories.value); // Check if images are correctly loaded
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

    return {
      products,
      categories,
    };
  },
};
</script>

<style scoped>
/* Align Categories Vertically and Improve Styling */
.categories-sidebar {
  padding-right: 20px;
  border-right: 1px solid #e0e0e0;
}

.collection .collection-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.collection .collection-item img.category-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}

.collection-header {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.card {
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-title {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
}

.card-content {
  padding: 15px;
}

.card-action {
  background: #f5f5f5;
  padding: 10px;
  text-align: center;
}

.card-action a {
  color: #007bff;
  text-decoration: none;
  margin: 0 10px;
}

.card-action a:hover {
  text-decoration: underline;
}
</style>