<template>
  <div class="sidebar">
    <h2>Welcome!</h2>
    <ul>
      <li><router-link to="/admin/customers">Manage Customers</router-link></li>
      <li><router-link to="/admin/products">Manage Products</router-link></li>
      <li><router-link to="/admin/categories">Manage Categories</router-link></li>
      <li><router-link to="/admin/orders">Manage Orders</router-link></li>
      <li><router-link to="/">Logout</router-link></li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #333;
  color: #fff;
  padding: 20px;
}

.sidebar h2 {
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.sidebar ul li a {
  color: #fff;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar ul li a:hover {
  background-color: #555;
}
</style>