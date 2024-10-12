<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <h3>Update Customer</h3>

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
          <input type="email" id="email" v-model="updatedCustomerContact.email" />
        </div>

        <div>
          <label for="phone">Phone</label>
          <input type="tel" id="phone" v-model="updatedCustomerContact.phoneNumber" />
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
      required: true,
    },
    customer: {
      type: Object,
      default: () => null, 
    },
  },
  data() {
    return {
      updatedCustomer: this.customer ? { ...this.customer } : {},
      updatedCustomerContact: this.customer?.contact
        ? { ...this.customer.contact }
        : {},
    };
  },
  watch: {
    
    customer(newCustomer) {
      if (newCustomer) {
        this.updatedCustomer = { ...newCustomer };
        this.updatedCustomerContact = { ...newCustomer.contact };
      }
    },
  },
  methods: {
    submitUpdate() {
      this.updatedCustomer.contact = this.updatedCustomerContact;

      this.$emit("update-customer", this.customer.userId, this.updatedCustomer);
      this.$emit("close"); 
    },
    closeModal() {
      this.$emit("close");
    },
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
