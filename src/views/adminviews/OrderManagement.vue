<template>
  <div class="order-management">
    <h1>Order Management</h1>

    <h2>Orders</h2>
    <table>
      <thead>
      <tr>
        <th>Order ID</th>
        <th>Order Date</th>
        <th>Order Status</th>
        <th>Cart ID</th>
        <th>Payment Method</th>
        <th>Shipping/Collected</th>
        <th>Shipping ID</th>
        <th>Total Amount</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.orderID">
        <td>{{ order.orderID }}</td>
        <td>{{ order.orderDate }}</td>
        <td>{{ order.orderStatus }}</td>
        <td>{{order.cart.cartId}}</td>
        <td>{{ order.paymentMethod }}</td>
        <td>{{ order.shippingOrCollected ? 'Shipping' : 'Collected' }}</td>
        <td>{{order.shipping.shippingID}}</td>
        <td>{{ order.totalAmount }}</td>
        <td>
          <button @click="openUpdateModal(order)">Update</button>
          <button @click="deleteOrder(order.orderID)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Update Order Modal -->
    <UpdateOrderModal
        :isVisible="isUpdateModalVisible"
        :order="selectedOrder"
        @close="closeUpdateModal"
        @update-order="updateOrder"
    />
  </div>
</template>

<script>
import { getOrders, /*createOrder,*/ updateOrder, deleteOrder } from '@/services/orderService';
import UpdateOrderModal from '@/modals/UpdateOrderModal.vue';

export default {
  components: {
    UpdateOrderModal
  },
  data() {
    return {
      isUpdateModalVisible: false,
      orders: [],
      selectedOrder: null,
    };
  },
  methods: {
    openUpdateModal(order) {
      this.selectedOrder = order;
      this.isUpdateModalVisible = true;
    },
    closeUpdateModal() {
      this.isUpdateModalVisible = false;
    },
    async updateOrder(orderID, updatedOrder) {
      try {
        await updateOrder(orderID, updatedOrder);
        await this.fetchOrders();
        this.closeUpdateModal();
      } catch (error) {
        console.error('Error updating order:', error);
      }
    },
    async deleteOrder(orderID) {
      try {
        await deleteOrder(orderID);
        await this.fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    },
    async fetchOrders() {
      try {
        this.orders = await getOrders();
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
  background-color: white;
  border-radius: 8px;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>