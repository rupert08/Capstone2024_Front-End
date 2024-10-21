<template>
  <div class="container">
    <header class="header">
      <h1 class="center-align">Welcome to Our Hardware Store</h1>
    </header>
    <a-carousel :autoplay="true" class="image-slider" ref="carousel" :dots="false">
      <template #prev>
        <div class="custom-arrow custom-arrow-left" @click="prevSlide">‹</div>
      </template>
      <template #next>
        <div class="custom-arrow custom-arrow-right" @click="nextSlide">›</div>
      </template>
      <div v-for="(product, index) in sliderProducts" :key="index">
        <img :src="product.imageName || 'https://via.placeholder.com/800x400'" alt="Product Image" class="slider-image" />
      </div>
    </a-carousel>

    <div class="row">
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

      <div class="col s12 m9">
        <div class="row">
          <div v-if="products.length === 0" class="col s12"><p>No products available</p></div>
          <div class="col s12 m6 l4" v-for="product in products" :key="product.id">
            <div class="card">
              <div class="card-image">
                <img :src="product.imageName ? getProductImage(product.productId) : '/image/'" alt="Product Image">
                <span class="card-title">{{ product.name }}</span>
              </div>
              <div class="card-content">
                <p>{{ product.description }}</p>
                <p><strong>Price:</strong> ${{ product.price }}</p>
              </div>
              <div class="card-action">
                <a href="javascript:void(0)" class="btn" @click="addToCart(product)">Add to Cart</a>
                <a href="javascript:void(0)" class="btn" @click="openModal(product)">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProductModal v-if="showModal" :product="selectedProduct" :showModal="showModal" @close-modal="closeModal" />
  </div>
</template>

<script>
import { getProducts } from '@/services/productService.js';
import { getCategories } from '@/services/categoryService';
import ProductModal from '@/modals/ProductModal.vue';

export default {
  name: 'HomePage',
  components: {
    ProductModal
  },
  data() {
    return {
      products: [],
      categories: [],
      sliderProducts: [],
      showModal: false,
      selectedProduct: null
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
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    getProductImage(productId) {
      return `http://localhost:5119/ecommerce/products/${productId}/image`;
    },
    addToCart(product) {
      console.log('Adding product to cart:', product);
    },
    openModal(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedProduct = null;
    },
    prevSlide() {
      this.$refs.carousel.prev();
    },
    nextSlide() {
      this.$refs.carousel.next();
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