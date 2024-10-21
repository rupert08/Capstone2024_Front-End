<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <!-- Product details go here -->
      <h4>{{ product.name }}</h4>
      <img :src="getProductImage(product.productId)" alt="Product Image" class="product-image">
      <p>{{ product.description }}</p>
      <p><strong>Price:</strong> ${{ product.price }}</p>
      <!-- Add to Cart button or other modal actions -->
      <div class="button-group">
        <button class="btn" @click="addToCart(product)">Add to Cart</button>
        <button class="btn back-btn" @click="closeModal">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductModal',
  props: {
    product: Object,
    showModal: Boolean
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    addToCart(product) {
      // Add product to cart logic here
      console.log('Adding product to cart:', product);
    },
    getProductImage(productId) {
      return `http://localhost:5119/ecommerce/products/${productId}/image`;
    }
  }
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
  background-color: #ffffff;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #888;
  width: 600px;
  max-width: 600px;
  height: 400px;
  max-height: 400px;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close {
  color: #ff0000;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #ff6666;
  text-decoration: none;
  cursor: pointer;
}

.product-image {
  max-width: 50%;
  max-height: 50%;
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h4 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

p {
  color: #666;
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.btn {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
}

.btn:hover {
  background-color: #0056b3;
}

.back-btn {
  background-color: #6c757d;
}

.back-btn:hover {
  background-color: #5a6268;
}
</style>