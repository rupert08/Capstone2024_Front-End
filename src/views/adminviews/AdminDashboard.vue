<!-- src/views/adminviews/AdminDashboard.vue -->
<template>
  <div id="dashboard">
    <AdminSidebar />
    <div class="content">
      <div class="header">
        <h1>Admin Dashboard</h1>
        <input type="text" placeholder="Search..." class="search-bar" />
      </div>
      <RecentCustomer />
      <ProductManagement />
      <RecentCategories />
      <OrderManagement />


    </div>
  </div>
</template>

<script>
import AdminSidebar from './AdminSidebar.vue';
import ProductManagement from './ProductManagement.vue';
import OrderManagement from './OrderManagement.vue';
import RecentCustomer from '@/components/RecentCustomer.vue';
import RecentCategories from '@/components/RecentCategories.vue';

export default {
  components: {
    AdminSidebar,
    ProductManagement,
    OrderManagement,
    RecentCategories,
    RecentCustomer
  }
}
</script>

<style scoped>
#dashboard {
  display: flex;
  padding: 20px;
}
.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f4f7fc;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>