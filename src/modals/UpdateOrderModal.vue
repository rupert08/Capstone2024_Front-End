<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>

      <h3>Update Order</h3>

      <form v-if="order">
        <!-- Order Date -->
        <label for="orderDate">Order Date:</label>
        <input type="date" v-model="orderForm.orderDate" required />

        <!-- Order Status -->
        <label for="orderStatus">Order Status:</label>
        <v-select :options="orderStatusOptions" v-model="orderForm.orderStatus" required></v-select>

        <!-- Payment Method -->
        <label for="paymentMethod">Payment Method:</label>
        <v-select :options="paymentMethodOptions" v-model="orderForm.paymentMethod" required></v-select>

        <!-- Shipping/Collected -->
        <label for="shipping">Shipping/Collected:</label>
        <v-select :options="shippingOptions" v-model="shippingOrCollectedString" required></v-select>

        <!-- Total Amount -->
        <label for="totalAmount">Total Amount:</label>
        <input type="number" v-model="orderForm.totalAmount" required />

        <button type="button" @click="submitUpdate">Update Order</button>
        <button type="button" @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    vSelect,
  },
  props: {
    isVisible: Boolean,
    order: Object,
  },
  data() {
    return {
      orderForm: { ...this.order }, // Initialize form with the current order data
      orderStatusOptions: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      paymentMethodOptions: ['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'CASH_ON_DELIVERY'],
      shippingOptions: ['Shipping', 'Collected'],
    };
  },
  computed: {
    shippingOrCollectedString: {
      get() {
        return this.orderForm.shippingOrCollected ? 'Shipping' : 'Collected';
      },
      set(value) {
        this.orderForm.shippingOrCollected = value === 'Shipping';
      },
    },
  },
  watch: {
    order: {
      immediate: true,
      handler(newOrder) {
        this.orderForm = { ...newOrder };
      },
    },
  },
  methods: {
    submitUpdate() {
      this.$emit('update-order', this.order.orderID, this.orderForm); // Ensure orderID is passed correctly
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    }
  },
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
// Compare this snippet from src/modals/UpdateOrderModal.vue: