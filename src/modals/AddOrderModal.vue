<!--<template>-->
<!--  <div v-if="isVisible" class="modal">-->
<!--    <div class="modal-content">-->
<!--      <span class="close" @click="closeModal">&times;</span>-->

<!--      <h3>Add Order</h3>-->

<!--      <form @submit.prevent="submitAdd">-->
<!--        &lt;!&ndash; Order Date &ndash;&gt;-->
<!--        <label for="orderDate">Order Date:</label>-->
<!--        <input type="date" v-model="orderForm.orderDate" required />-->

<!--        &lt;!&ndash; Order Status &ndash;&gt;-->
<!--        <label for="orderStatus">Order Status:</label>-->
<!--        <v-select :options="orderStatusOptions" v-model="orderForm.orderStatus" required></v-select>-->

<!--        &lt;!&ndash; Payment Method &ndash;&gt;-->
<!--        <label for="paymentMethod">Payment Method:</label>-->
<!--        <v-select :options="paymentMethodOptions" v-model="orderForm.paymentMethod" required></v-select>-->

<!--        &lt;!&ndash; Shipping/Collected &ndash;&gt;-->
<!--        <label for="shipping">Shipping/Collected:</label>-->
<!--        <v-select :options="shippingOptions" v-model="shippingOrCollectedString" required></v-select>-->

<!--        &lt;!&ndash; Total Amount &ndash;&gt;-->
<!--        <label for="totalAmount">Total Amount:</label>-->
<!--        <input type="number" v-model="orderForm.totalAmount" required />-->

<!--        <button type="submit">Add Order</button>-->
<!--        <button type="button" @click="closeModal">Cancel</button>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import vSelect from 'vue-select';-->
<!--import 'vue-select/dist/vue-select.css';-->

<!--export default {-->
<!--  components: {-->
<!--    vSelect,-->
<!--  },-->
<!--  props: {-->
<!--    isVisible: Boolean,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      orderForm: {-->
<!--        orderDate: '',-->
<!--        orderStatus: '',-->
<!--        paymentMethod: '',-->
<!--        shippingOrCollected: false,-->
<!--        totalAmount: 0-->
<!--      },-->
<!--      orderStatusOptions: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],-->
<!--      paymentMethodOptions: ['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'CASH_ON_DELIVERY'],-->
<!--      shippingOptions: ['Shipping', 'Collected'],-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    shippingOrCollectedString: {-->
<!--      get() {-->
<!--        return this.orderForm.shippingOrCollected ? 'Shipping' : 'Collected';-->
<!--      },-->
<!--      set(value) {-->
<!--        this.orderForm.shippingOrCollected = value === 'Shipping';-->
<!--      },-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    submitAdd() {-->
<!--      this.$emit('add-order', this.orderForm);-->
<!--      this.closeModal();-->
<!--    },-->
<!--    closeModal() {-->
<!--      this.$emit('close');-->
<!--    }-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.modal {-->
<!--  display: block;-->
<!--  position: fixed;-->
<!--  z-index: 1000;-->
<!--  left: 0;-->
<!--  top: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background-color: rgba(0, 0, 0, 0.4);-->
<!--}-->

<!--.modal-content {-->
<!--  position: relative;-->
<!--  margin: 10% auto;-->
<!--  padding: 20px;-->
<!--  width: 50%;-->
<!--  background-color: white;-->
<!--  border-radius: 8px;-->
<!--}-->

<!--.close {-->
<!--  position: absolute;-->
<!--  right: 10px;-->
<!--  top: 10px;-->
<!--  cursor: pointer;-->
<!--}-->
<!--</style>-->