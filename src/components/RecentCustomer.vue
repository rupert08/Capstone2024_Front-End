<!-- src/components/RecentCustomer.vue -->
<template>
  <div class="recent-customers">
    <h3>Recent Customers</h3>
    <p>Total Customers: {{ totalCustomers }}</p>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in recentCustomers" :key="customer.userId">
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.contact.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCustomers } from '@/services/customerService';

export default {
  data() {
    return {
      recentCustomers: [],
      totalCustomers: 0
    };
  },
  async created() {
    await this.fetchRecentCustomers();
  },
  methods: {
    async fetchRecentCustomers() {
      try {
        const customers = await getCustomers();
        this.totalCustomers = customers.length;
        this.recentCustomers = customers.slice(-3).reverse(); // Get the last 3 added customers
      } catch (error) {
        console.error('Error fetching recent customers:', error);
      }
    }
  }
};
</script>

<style scoped>
.recent-customers {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
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