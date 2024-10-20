<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <h4>Delete Order</h4>
      <p>Are you sure you want to delete this order?</p>
      <button @click="submitDelete">Delete</button>
      <button @click="close">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isVisible', 'order'],
  methods: {
    submitDelete() {
      this.$emit('delete-order', this.order.orderID);
    },
    close() {
      this.$emit('close');
    }
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
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
</style>