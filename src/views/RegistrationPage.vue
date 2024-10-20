<template>
  <div class="container">
    <header class="header">
      <h1>Register</h1>
    </header>
    <form @submit.prevent="register">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" v-model="firstName" required>
          <label for="name">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="surname" type="text" v-model="lastName" required>
          <label for="surname">Surname</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" v-model="contact.email" required>
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="phone" type="tel" v-model="contact.phoneNumber" required>
          <label for="phone">Phone Number</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input :type="passwordFieldType" id="password" v-model="password" required>
          <label for="password">Password</label>
          <span @click="togglePasswordVisibility" class="eye-icon">{{ passwordFieldType === 'password' ? '👁️' : '🙈' }}</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input :type="passwordFieldType" id="confirmPassword" v-model="confirmPassword" required>
          <label for="confirmPassword">Confirm Password</label>
          <span @click="togglePasswordVisibility" class="eye-icon">{{ passwordFieldType === 'password' ? '👁️' : '🙈' }}</span>
        </div>
      </div>
      <div class="row">
        <button class="btn btn-primary waves-effect waves-light" type="submit" name="action">Register</button>
        <button class="btn btn-secondary waves-effect waves-light" type="button" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { createCustomer } from '@/services/customerService';

export default {
  name: 'RegistrationPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      contact:{
      email: '',
      phoneNumber: ''},
      password: '',
      confirmPassword: '',
      passwordFieldType: 'password'
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      try {
        const customerData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber, // Include phone number in the data
          password: this.password
        };
        await createCustomer(customerData);
        this.$emit('registered'); // Emit the registered event
      } catch (error) {
        alert('Failed to register customer');
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    cancel() {
      window.history.back();
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #2da86d;
  --secondary-color: #dc3545;
  --background-color: #f9f9f9;
  --text-color: #333;
  --font-family: 'Georgia', serif;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  background-image: url('https://wallpaperaccess.com/full/1880033.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

h1 {
  font-family: var(--font-family);
  color: #a8f4ff;
  position: relative;
  z-index: 1;
}

.input-field {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  margin-right: 10px;
}

.btn-primary {
  background-color: #42b983;
  border: none;
  color: #fff;
}

.btn-primary:hover {
  background-color: rgba(0, 117, 11, 0.86);
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #dc3545;
  border: none;
  color: #fff;
}

.btn-secondary:hover {
  background-color: rgba(168, 0, 0, 0.85);
  transform: scale(1.05);
}
</style>