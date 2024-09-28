<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/admin">Admin Home</router-link>
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
      return this.$root.user.role === 'admin';
    },
    userName() {
      return this.$root.user.name;
    },
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