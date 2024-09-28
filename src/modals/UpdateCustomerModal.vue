<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <h3>Update Customer</h3>

      <!-- Only show the form if customer data is available -->
      <form v-if="customer">
        <div>
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="updatedCustomer.firstName" />
        </div>

        <div>
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="updatedCustomer.lastName" />
        </div>

        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="updatedCustomer.contact.email" />
        </div>

        <div>
          <label for="phone">Phone</label>
          <input type="tel" id="phone" v-model="updatedCustomer.contact.phoneNumber" />
        </div>

        <button type="button" @click="submitUpdate">Update Customer</button>
        <button type="button" @click="closeModal">Cancel</button>
      </form>

      <!-- Display a message if customer is null -->
      <p v-else>No customer selected for update</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    customer: {
      type: Object,
      default: () => null, // Default to null to avoid type errors
    }
  },
  data() {
    return {
      // Create a copy of the customer data to modify without affecting the original object
      updatedCustomer: this.customer ? { ...this.customer } : {}
    };
  },
  watch: {
    // Update the form data when the customer prop changes
    customer(newCustomer) {
      if (newCustomer) {
        this.updatedCustomer = { ...newCustomer };
      }
    }
  },
  methods: {
    submitUpdate() {
      // Emit the updated customer data back to the parent component
      this.$emit('update-customer', this.customer.userId, this.updatedCustomer);
      this.$emit('close'); // Close the modal after submission
    },
    closeModal() {
      // Emit the close event to close the modal
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
/* Add some basic styles for the modal */
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
