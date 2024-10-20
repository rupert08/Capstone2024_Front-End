<template>
  <div class="container">
    <header class="header">
      <h1 class="center-align">Welcome to Our Hardware Store</h1>
    </header>
    <div class="center-align" style="margin-bottom: 20px;">
      <router-link to="/about" class="btn">About Us</router-link>
    </div>

    <!-- Ant Design Slider for Images with Custom Arrows -->
    <a-carousel :autoplay="true" class="image-slider" ref="carousel" :dots="false">
      <template #prev>
        <div class="custom-arrow custom-arrow-left" @click="prevSlide">‹</div>
      </template>
      <template #next>
        <div class="custom-arrow custom-arrow-right" @click="nextSlide">›</div>
      </template>
      <div v-for="(product, index) in sliderProducts" :key="index">
        <img :src="product.imageName || 'https://via.placeholder.com/800x400'" alt="Product Image" class="slider-image" />
      </div></a-carousel>


    <div class="row">
      <!-- Sidebar for Categories -->
      <div class="col s12 m3 categories-sidebar">
        <div class="collection with-header">
          <div class="collection-header"><h5>Categories</h5></div>
          <a v-if="categories.length === 0" class="collection-item">No categories available</a>
          <a v-for="category in categories" :key="category.categoryId" href="#!" class="collection-item" @click="filterProductsByCategory(category.categoryId)">
            <img v-if="category.image" :src="category.image" alt="Category Image" class="circle category-image">
            {{ category.name }}
          </a>
        </div>
      </div>

      <!-- Product Section -->
      <div class="col s12 m9">
        <div class="row">
          <div v-if="filteredProducts.length === 0" class="col s12"><p>No products available</p></div>
          <div class="col s12 m6 l4" v-for="product in filteredProducts" :key="product.productId">
            <div class="card">
              <div class="card-image">
                <!-- Display product image if available, otherwise show a default image -->
                <img :src="product.imageName ? getProductImage(product.productId) : '/image/'" alt="Product Image">
                <span class="card-title">{{ product.name }}</span>
              </div>
              <div class="card-content">
                <p>{{ product.description }}</p>
                <p><strong>Price:</strong> ${{ product.price }}</p>
              </div>
              <div class="card-action">
                <a href="javascript:void(0)" class="btn" @click="addToCart(product)">Add to Cart</a>
                 <!-- View Details button to trigger the modal -->
                <a href="javascript:void(0)" class="btn" @click="openModal(product)">View Details</a>
<!--                <a href="/cart">Add to Cart</a>-->
<!--                <a :href="'/product/' + product.categoryId">View Details</a>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <!-- Modal for Product Details -->
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span> <!-- Close button for modal -->

      <!-- Flexbox layout for image and details -->
      <div class="modal-flex-container">
        <!-- Left side: product image -->
        <div class="product-image-modal">
          <img :src="selectedProduct.productUrl || 'default-placeholder-image.jpg'" alt="Product Image">
        </div>
        <!-- Right side: product details -->
        <div class="product-details-modal">
          <h4>{{ selectedProduct.name }}</h4>
          <p>{{ selectedProduct.description }}</p>
          <p><strong>Price:</strong> ${{ selectedProduct.price }}</p>

          <!-- Select Fields for Color and Logo -->
          <label for="color">Color:</label>
          <select v-model="selectedColor">
            <option disabled value="">Choose an option</option>
            <option v-for="color in availableColors" :key="color" :value="color">{{ color }}</option>
          </select>


          <div v-if="showNotification" class="notification-popup show">
            <p>{{ notificationMessage }}</p>
          </div>

          <label for="logo">Logo:</label>
          <select v-model="selectedLogo">
            <option disabled value="">Choose an option</option>
            <option v-for="logo in availableLogos" :key="logo" :value="logo">{{ logo }}</option>
          </select>

          <!-- Quantity Selector -->
          <div class="quantity-selector">
            <button @click="decreaseQuantity">-</button>
            <input type="number" v-model="quantity" min="1">
            <button @click="increaseQuantity">+</button>
          </div>
          <a href="javascript:void(0)" class="btn" @click="addToCart(selectedProduct)">Add to Cart</a>
          <!--            <button class="btn" @click="addToCart(selectedProduct)">Add to Cart</button>-->
        </div>
      </div>
    </div>
  </div>




</template>

<script>
import { getProducts } from '@/services/productService.js';
import { getCategories } from '@/services/categoryService';
import { Carousel } from 'ant-design-vue';
// import { ref, onMounted } from 'vue';
// import axios from 'axios';

export default {
  name: 'HomePage',
  components: {
    'a-carousel': Carousel
  },
  props: {
    updateCartCount: Function
  },

  data() {
    return {
      products: [],
      filteredProducts: [],
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
        this.filteredProducts = this.products; // Initialize filteredProducts with all products
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
    // Construct the image URL for the product
    getProductImage(productId) {
      return `http://localhost:5119/ecommerce/products/${productId}/image`;
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortAsc = !this.sortAsc;
      this.filteredProducts.sort((a, b) => {
        let modifier = 1;
        if (!this.sortAsc) modifier = -1;
        if (a[key] < b[key]) return -1 * modifier;
        if (a[key] > b[key]) return 1 * modifier;
        return 0;
      });
    },
    filterProductsByCategory(categoryId) {
      this.filteredProducts = this.products.filter(product => product.categoryId === categoryId);
    }
  }
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