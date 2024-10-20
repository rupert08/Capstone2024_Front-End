<template>
  <div class="container">
    <header class="header">
      <h1 class="center-align">Login</h1>
    </header>
    <form @submit.prevent="login">
      <div class="row">
        <div class="input-field col s12">
          <input id="username" type="email" v-model="username" required>
          <label for="username">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" v-model="password" required>
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row center-align">
        <label>
          <input type="checkbox" v-model="isAdmin" />
          <span>Login as Admin</span>
        </label>
      </div>
      <div class="row center-align">
        <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
      </div>
    </form>
    <div class="row center-align">
      <p v-if="message">{{ message }}</p>
      <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/services/loginService';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      message: '',
      isAdmin: false // Add a flag to determine if the user is an admin
    };
  },
  methods: {
    async login() {
      try {
        const loginData = {
          username: this.username,
          password: this.password
        };
        const response = await loginUser(loginData, this.isAdmin);

        console.log("Login response:", response); // Log the response

        if (response.error) {
          this.message = response.error;
        } else if (response && response.role) {
          const { role } = response;
          localStorage.setItem('token', response.token); // Store the token
          if (role === 'admin') {
            this.$router.push({ name: 'AdminDashboard' });
          } else if (role === 'customer') {
            this.$router.push({ name: 'HomePage' });
          } else {
            this.message = 'Unknown user role.';
          }
        } else {
          this.message = 'Invalid email or password.';
        }
      } catch (error) {
        console.log("Login error:", error); // Log the error
        this.message = `Failed to login: ${error.message}`;
      }
    }
  }
};
</script>

<style scoped>
.center-align {
  text-align: center;
}
</style>