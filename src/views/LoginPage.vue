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
      <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
      <button class="btn btn-secondary waves-effect waves-light" type="button" @click="cancel">Back</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { loginAdmin } from '@/services/loginService'; 

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async login() {
  try {
    const loginData = {
      username: this.username,
      password: this.password
    };
    const response = await loginAdmin(loginData);

    if (response.status === 200) {
      this.$router.push({ name: 'AdminDashboard' });
    } else if (response.status === 412) {
      this.message = 'Invalid email or password.';
    } else {
      this.message = `An error occurred: ${response.status}`;
    }
  } catch (error) {
    // Detailed error message
    this.message = `Failed to login: ${error.response ? error.response.data.message : 'Connection error'}`;
  }
},
    cancel() {
      window.history.back();
    }
  }
};
</script>

<style scoped>
/* Styles remain the same */
</style>
