<template>
  <div class="container">
    <h1>Your Orders</h1>
    <ul class="list-group">
      <li v-for="order in orders" :key="order.id" class="list-group-item">
        Order #{{ order.id }} - Total: ${{ order.total }}
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} - ${{ item.price }} x {{ item.quantity }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        // Sample data, you can replace this with real data
        {
          id: 1,
          total: 39.98,
          items: [
            { id: 1, name: 'Hammer', price: 19.99, quantity: 1 },
            { id: 2, name: 'Screwdriver', price: 9.99, quantity: 2 },
          ],
        },
        {
          id: 2,
          total: 19.99,
          items: [
            { id: 3, name: 'Wrench', price: 19.99, quantity: 1 },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
