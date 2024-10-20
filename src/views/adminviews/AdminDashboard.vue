<template>
  <div id="dashboard">
    <AdminSidebar />
    <div class="content">
      <div class="header">
        <h1>Admin Dashboard</h1>
<!--        <input type="text" placeholder="Search..." class="search-bar" />-->
      </div>
      <RecentCustomer />
      <RecentProducts />
      <RecentCategories />
      <div class="kpi-section">
        <div class="kpi total-orders">
          <h3>Total Orders</h3>
          <p>{{ totalOrders }}</p>
        </div>
        <div class="kpi pending-orders">
          <h3>Pending Orders</h3>
          <p>{{ pendingOrders }}</p>
        </div>
        <div class="kpi delivered-orders">
          <h3>Delivered Orders</h3>
          <p>{{ deliveredOrders }}</p>
        </div>
      </div>
      <h2>Recent Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>Payment Method</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in recentOrders" :key="order.orderID">
            <td>{{ order.orderID }}</td>
            <td>{{ order.orderDate }}</td>
            <td>{{ order.orderStatus }}</td>
            <td>{{ order.paymentMethod }}</td>
            <td>{{ order.totalAmount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminSidebar from './AdminSidebar.vue';
// import ProductManagement from './ProductManagement.vue';
import RecentCustomer from '@/components/RecentCustomer.vue';
import RecentCategories from '@/components/RecentCategories.vue';
import { getOrders } from '@/services/orderService';
import RecentProducts from "@/components/RecentProducts.vue";

export default {
  components: {
    AdminSidebar,
    // ProductManagement,
    RecentProducts,
    RecentCategories,
    RecentCustomer
  },
  data() {
    return {
      orders: [],
      totalOrders: 0,
      pendingOrders: 0,
      deliveredOrders: 0,
      recentOrders: []
    };
  },
  methods: {
    fetchOrders() {
      getOrders()
        .then(data => {
          this.orders = data;
          this.calculateKPIs();
          this.getRecentOrders();
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    },
    calculateKPIs() {
      this.totalOrders = this.orders.length;
      this.pendingOrders = this.orders.filter(order => order.orderStatus === 'PENDING').length;
      this.deliveredOrders = this.orders.filter(order => order.orderStatus === 'DELIVERED').length;
    },
    getRecentOrders() {
      this.recentOrders = this.orders.slice(-3).reverse();
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped>
#dashboard {
  display: flex;
  padding: 20px;
  background-color: rgba(150, 194, 115, 0.48); /* Add a light transparent background */
}
.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #64C7C7; /* Add a white transparent background */

}
.header {
  text-align: center;
  margin-bottom: 20px;
}
.search-bar {
  display: block;
  margin: 10px auto;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.kpi-section {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.kpi {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.total-orders {
  background-color: #e0f7fa;
}
.pending-orders {
  background-color: #fff3e0;
}
.delivered-orders {
  background-color: #e8f5e9;
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