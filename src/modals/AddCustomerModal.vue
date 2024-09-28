<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <h3>Add Customer</h3>

      <!-- Form for Adding Customer -->
      <form @submit.prevent="submitAdd">
        <div>
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="newCustomer.firstName" />
        </div>

        <div>
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="newCustomer.lastName" />
        </div>

        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="newCustomer.contact.email" />
        </div>

        <div>
          <label for="phone">Phone</label>
          <input type="tel" id="phone" v-model="newCustomer.contact.phoneNumber" />
        </div>

        <button type="submit">Add Customer</button>
        <button type="button" @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newCustomer: {
        firstName: '',
        lastName: '',
        contact: {
          email: '',
          phoneNumber: ''
        }
      }
    };
  },
  methods: {
    submitAdd() {
      // Emit the add event and pass the new customer data
      this.$emit('add', this.newCustomer);
    },
    closeModal() {
      // Emit the close event to close the modal
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