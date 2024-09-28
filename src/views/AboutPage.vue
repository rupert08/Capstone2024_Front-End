<template>
  <div class="about-container">
    <div class="hero">
      <h1>About Us</h1>
    </div>
    <div class="content">
      <p>Welcome to our hardware store! We offer a wide range of power tools and hand tools for all your needs.</p>
      <p>Our mission is to provide high-quality products at competitive prices. We are committed to excellent customer service and strive to meet all your hardware needs.</p>
    </div>
    <div class="contact-details">
      <h2>Contact Us</h2>
      <p><i class="fas fa-phone"></i> Phone: (123) 456-7890</p>
      <p><i class="fas fa-envelope"></i> Email: info@hardwarestore.com</p>
      <p><i class="fas fa-map-marker-alt"></i> Address: 123 Hardware St, Tooltown, TX</p>
    </div>
    <div class="footer">
      <p>Follow us on:</p>
      <a href="#"><i class="fab fa-facebook-f"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
    </div>
    <button class="back-to-top" @click="scrollToTop">Back to Top</button>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.about-container {
  font-family: 'Roboto', Arial, sans-serif;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #f9f9f9;
  position: relative;
}

.hero {
  background-image: url('https://th.bing.com/th/id/R.b3f7eb583e429509370ab6db99ebe26c?rik=6d5u%2fHAkr4cbsg&pid=ImgRaw&r=0');
  background-size: cover;
  background-position: center;
  color: #ffffff;
  text-align: center;
  padding: 50px 20px;
  position: relative;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
}

.hero h1 {
  position: relative;
  z-index: 2;
  font-size: 3em;
  margin: 0;
  font-family: 'Georgia', serif;
  color: #a8f4ff;
}

.content {
  padding: 40px 20px;
  max-width: 800px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

.content p {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333333;
}

.contact-details {
  padding: 40px 20px;
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
  border: 1px solid #0098a1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: rgba(182, 244, 255, 0.5);
  transition: transform 0.3s;
  animation: fadeIn 1s ease-in-out 0.5s;
}

.contact-details:hover {
  transform: scale(1.05);
}

.contact-details h2 {
  font-size: 2em;
  margin-bottom: 20px;
  font-family: 'Georgia', serif;
  color: #333333;
}

.contact-details p {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 10px;
  color: #555555;
}

.contact-details i {
  margin-right: 10px;
  transition: color 0.3s;
}

.contact-details p:hover i {
  color: #007bff;
}

.footer {
  text-align: center;
  padding: 20px;
  background-color: #333;
  color: #fff;
}

.footer a {
  color: #fff;
  margin: 0 10px;
  text-decoration: none;
  font-size: 1.5em;
}

.footer a:hover {
  color: #007bff;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-to-top:hover {
  background-color: #0056b3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>