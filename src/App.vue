<template>
  <div id="app" class="app-container">
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="left">
          <li>
            <router-link :to="homeRoute">
              <i class="material-icons">home</i>
            </router-link>
          </li>
        </ul>
        <a href="#" class="brand-logo">Hardware Store</a>
        <ul id="nav-mobile" class="right"></ul>
      </div>
    </nav>
    <div class="content">
      <router-view />
    </div>
    <PageFooter />
  </div>
</template>

<script>
import PageFooter from './components/Footer.vue';
import { getUserDetails } from '@/services/userService';

export default {
  name: 'App',
  components: {
    PageFooter
  },
  data() {
    return {
      cartCount: 0,
      cartValue: 0.00,
      isLoggedIn: false,
      user: {
        name: '',
        surname: '',
        role: '' // Add role to user data
      }
    };
  },
  mounted() {
    this.fetchCartData();
    this.checkUserStatus();
  },
  methods: {
    fetchCartData() {
      setTimeout(() => {
        this.cartCount = 0;
        this.cartValue = 0.00;
      }, 1000);
    },
    async checkUserStatus() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userDetails = await getUserDetails(token);
          this.user = userDetails;
          this.isLoggedIn = true;
        } catch (error) {
          this.isLoggedIn = false;
          localStorage.removeItem('token');
        }
      } else {
        this.isLoggedIn = false;
      }
    },
    logout() {
      if (confirm('Are you sure you want to logout?')) {
        this.isLoggedIn = false;
        this.user = { name: '', surname: '', role: '' };
        localStorage.removeItem('token'); // Remove the token
        this.$router.push('/'); // Redirect to login page
      }
    }
  },
  computed: {
    homeRoute() {
      if (this.isLoggedIn) {
        return this.user.role === 'admin' ? '/admin' : '/home';
      }
      return '/';
    }
  }
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure full viewport height */
}

.content {
  flex: 1; /* This will make the content area expand as necessary */
}

.nav-wrapper {
  padding: 0 20px;
  background-color: #333;
}

.nav-wrapper .left,
.nav-wrapper .right {
  display: flex;
  align-items: center;
}

ul#nav-mobile.left {
  margin: 0;
  padding: 0;
  flex: 1;
}

.brand-logo {
  color: white;
  flex: 2;
  text-align: center;
}

ul#nav-mobile li {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.material-icons {
  vertical-align: middle;
  color: white;
}

.cart-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-count {
  position: absolute;
  top: 4px;
  right: 43px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-value {
  margin-top: 13px;
  margin-left: 14px;
  font-weight: bold;
  vertical-align: middle;
  color: white;
}

.empty-cart {
  color: grey;
  margin-left: 10px;
}

ul#nav-mobile.right li {
  margin: 0;
}

ul#nav-mobile.right li a {
  color: white;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
</style>