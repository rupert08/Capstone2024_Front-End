<template>
  <div class="container">
    <header class="header">
      <h1>Shopping Cart</h1>
    </header>
    <div v-if="loading" class="spinner"></div>
    <ul v-else class="list-group">
      <li v-for="item in cartItems" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h5>{{ item.name }}</h5>
          <p>${{ item.price }} x {{ item.quantity }}</p>
        </div>
        <button @click="removeFromCart(item.id)" class="btn btn-danger btn-sm">Remove</button>
      </li>
    </ul>
    <div class="total mt-3">
      <strong>Total: ${{ total }}</strong>
    </div>
    <button @click="checkout" class="btn btn-primary mt-3">Proceed to Checkout</button>
    <button @click="goBack" class="btn btn-secondary mt-3">Back</button>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { getCartItems, removeFromCart } from '@/services/cartService';

export default {
  name: 'CartPage',
  setup() {
    const cartItems = ref([]);
    const loading = ref(true);

    const fetchCartItems = async () => {
      cartItems.value = await getCartItems();
      loading.value = false;
    };

    const handleRemoveFromCart = async (id) => {
      await removeFromCart(id);
      cartItems.value = cartItems.value.filter(item => item.id !== id);
    };

    const total = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    const goBack = () => {
      window.history.back();
    };

    const checkout = () => {
      if (total.value > 0) {
        window.location.href = '/orderpage';
      } else {
        alert('Your cart is empty!');
      }
    };

    onMounted(fetchCartItems);

    return {
      cartItems,
      total,
      loading,
      removeFromCart: handleRemoveFromCart,
      checkout,
      goBack
    };
  }
};
</script>

<style scoped>
:root {
  --primary-color: rgba(6, 237, 23, 0.9);
  --danger-color: #dc3545;
  --secondary-color: #6c757d;
  --link-color: #17a2b8;
  --background-color: #f9f9f9;
  --text-color: #333;
  --font-family: 'Georgia', serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  background-image: url('https://wallpaperaccess.com/full/1880033.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

h1 {
  font-family: var(--font-family);
  color: #a8f4ff;
  position: relative;
  z-index: 1;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
  transition: background-color 0.3s, transform 0.3s;
}

.list-group-item:hover {
  background-color: #f1f1f1;
  transform: scale(1.02);
}

.list-group-item h5 {
  margin: 0;
  font-size: 1.1em;
  color: var(--text-color);
}

.list-group-item p {
  margin: 0;
  color: #555;
}

.total {
  text-align: right;
  font-size: 1.3em;
  color: var(--text-color);
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  margin-right: 10px;
}

.btn-primary {
  background-color: #42b983;
  border: none;
  color: rgb(255, 255, 255);
  text-align: center;
}

.btn-primary:hover {
  background-color: rgba(0, 108, 11, 0.86);
  transform: scale(1.05);
}

.btn-danger {
  background-color: var(--danger-color);
  border: none;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #dc3545;
  border: none;
  color: #fff;
}

.btn-secondary:hover {
  background-color: rgba(255, 0, 0, 0.85);
  transform: scale(1.05);
}

.footer {
  text-align: center;
  padding: 20px;
  background-color: #333;
  color: #fff;
  margin-top: 20px;
  border-radius: 10px;
}

.footer nav a {
  color: #fff;
  margin: 0 10px;
  text-decoration: none;
}

.footer nav a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  .header {
    flex-direction: column;
    text-align: center;
  }

  .list-group-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn {
    width: auto;
  }
}
</style>