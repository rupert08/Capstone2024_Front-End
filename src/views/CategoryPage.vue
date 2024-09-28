<template>
  <div>
    <h1>Categories</h1>
    <ul>
      <!-- Display categories in the template -->
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getCategories } from '@/services/categoryService'; // Import the named function

export default {
  name: 'CategoryPage',
  data() {
    return {
      categories: []  // Initialize categories array
    };
  },
  async created() {
    try {
      this.categories = await getCategories();  // Fetch categories on component creation
    } catch (error) {
      console.error('Error fetching categories:', error); 
    }
  }
};
</script>

<style scoped>
/* Add styles here */
</style>
