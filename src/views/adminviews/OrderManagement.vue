<template>
  <div class="management-section">
    <h3>Manage Orders</h3>
    <table>
      <thead>
      <tr>
        <th>Order ID</th>
        <th>Customer Name</th>
        <th>Order Date</th>
        <th>Total Amount</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ order.customerName }}</td>
        <td>{{ order.date }}</td>
        <td>{{ order.totalAmount }}</td>
        <td>{{ order.status }}</td>
        <td><button @click="deleteOrder(order.id)">Delete</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        { id: 1, customerName: 'John Wick', date: '2024-08-28', totalAmount: 'R150.00', status: 'Shipped' },
        { id: 2, customerName: 'Jane Slome', date: '2024-08-29', totalAmount: 'R200.00', status: 'Processing' }
      ]
    };
  },
  methods: {
    deleteOrder(id) {
      this.orders = this.orders.filter(order => order.id !== id);
    }
  }
};
</script>

<style scoped>
.management-section {
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

button {
  padding: 5px 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
