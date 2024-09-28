<template>
  <footer class="footer">
    <nav>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a @click="navigateToAbout">About Us</a>
      <a href="#">Contact</a>
    </nav>
    <p>&copy; 2023 Hardware Store. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'PageFooter',
  methods: {
    navigateToAbout() {
      window.location.href = '/about';
    }
  }
};
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  margin-top: 20px;
  border-radius: 10px;
  position: static;
  bottom: 0;
  width: 100%;
  max-height: 150px;
  overflow: auto;
}
.footer nav  {
  background-color: #17a2b8;
}
.footer nav a {
  background-color: #17a2b8;
  color: #fff;
  margin: 0 10px;
  text-decoration: none;
}
.footer nav a:hover {
  text-decoration: underline;
}
</style>