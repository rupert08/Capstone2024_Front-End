<template>
  <div class="recent-categories-section">
    <h3>Recent Categories</h3>

    <!-- Amount of Categories -->
    <div class="category-count">
      Amount of Categories: {{ totalCategories }}
    </div>

    <table>
      <thead>
        <tr>
<!--          <th>ID</th>-->
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in recentCategories" :key="category.id">
<!--          <td>{{ category.categoryId }}</td>-->
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCategories } from '@/services/categoryService';

export default {
  data() {
    return {
      recentCategories: [],
      totalCategories: 0
    };
  },
  async created() {
    await this.fetchRecentCategories();
    await this.fetchTotalCategories();
  },
  methods: {
    async fetchRecentCategories() {
      try {
        const categories = await getCategories();
        this.recentCategories = categories.slice(-3);
      } catch (error) {
        console.error('Error fetching recent categories:', error);
      }
    },
    async fetchTotalCategories() {
      try {
        const categories = await getCategories();
        this.totalCategories = categories.length;
      } catch (error) {
        console.error('Error fetching total categories:', error);
      }
    }
  }
};
</script>

<style scoped>
.recent-categories-section {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.category-count {
  margin-bottom: 10px;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>