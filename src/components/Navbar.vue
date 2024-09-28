<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/home">Home</router-link>
    </div>
    <div class="navbar-menu">
      <router-link v-if="!isAdmin" to="/cart">
        <i class="fas fa-shopping-cart"></i> {{ cartTotal }}
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
      <span v-if="isLoggedIn">{{ userName }}</span>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$root.user.isLoggedIn;
    },
    isAdmin() {
      return this.$root.user.isAdmin;
    },
    userName() {
      return this.$root.user.name;
    },
    cartTotal() {
      return this.$root.cartTotal;
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  color: #fff;
}

.navbar a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

.navbar a:hover {
  text-decoration: underline;
}
</style>