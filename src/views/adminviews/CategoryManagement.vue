<template>
  <div class="management-section">
    <h3>Manage Categories</h3>
    <button @click="openAddModal">Add Category</button>

    <!-- Filter and Search Section -->
    <div class="filter-search-section">
      <input v-model="searchQuery" @input="searchCategories" placeholder="Search categories..." />
      <select v-model="filterKey" @change="filterCategories">
        <option value="">All</option>
        <option value="name">Name</option>
        <option value="description">Description</option>
      </select>
    </div>

    <!-- Amount of Categories -->
    <div class="category-count">
      Amount of Categories: {{ categories.length }}
    </div>

    <table>
      <thead>
        <tr>
          <th @click="sortBy('id')">ID</th>
          <th @click="sortBy('name')">Name</th>
          <th @click="sortBy('description')">Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in filteredCategories" :key="category.id">
          <td>{{ category.categoryId }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <button @click="openUpdateModal(category)">Update</button>
            <button @click="removeCategory(category.categoryId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Category Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h4>Add Category</h4>
        <form @submit.prevent="submitAdd">
          <div class="input-field">
            <input v-model="newCategory.name" type="text" required />
            <label class="active">Name</label>
          </div>
          <div class="input-field">
            <input v-model="newCategory.description" type="text" required />
            <label class="active">Description</label>
          </div>
          <button type="submit" class="btn">Add</button>
          <button type="button" class="btn red" @click="closeAddModal">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Update Category Modal -->
    <div v-if="showUpdateModal" class="modal">
      <div class="modal-content">
        <h4>Update Category</h4>
        <form @submit.prevent="submitUpdate">
          <div class="input-field">
            <input v-model="selectedCategory.name" type="text" required />
            <label class="active">Name</label>
          </div>
          <div class="input-field">
            <input v-model="selectedCategory.description" type="text" required />
            <label class="active">Description</label>
          </div>
          <button type="submit" class="btn">Update</button>
          <button type="button" class="btn red" @click="closeUpdateModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategories, deleteCategory, updateCategory, createCategory } from '@/services/categoryService';

export default {
  data() {
    return {
      categories: [],
      filteredCategories: [],
      sortKey: '',
      sortAsc: true,
      showAddModal: false,
      showUpdateModal: false,
      selectedCategory: null,
      newCategory: {
        name: '',
        description: ''
      },
      searchQuery: '',
      filterKey: ''
    };
  },
  async created() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        this.categories = await getCategories();
        this.filteredCategories = this.categories;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async removeCategory(categoryId) {
      if (confirm('Are you sure you want to delete this category?')) {
        try {
          await deleteCategory(categoryId);
          await this.fetchCategories();
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
      this.newCategory = { name: '', description: '' };
    },
    async submitAdd() {
      try {
        await createCategory(this.newCategory);
        await this.fetchCategories();
        this.closeAddModal();
      } catch (error) {
        console.error('Error adding category:', error);
      }
    },
    openUpdateModal(category) {
      this.selectedCategory = { ...category };
      this.showUpdateModal = true;
    },
    closeUpdateModal() {
      this.showUpdateModal = false;
      this.selectedCategory = null;
    },
    async submitUpdate() {
      try {
        await updateCategory(this.selectedCategory);
        await this.fetchCategories();
        this.closeUpdateModal();
      } catch (error) {
        console.error('Error updating category:', error);
      }
    },
    searchCategories() {
      this.filteredCategories = this.categories.filter(category => {
        return category.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               category.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    filterCategories() {
      if (this.filterKey) {
        this.filteredCategories = this.categories.filter(category => {
          return category[this.filterKey].toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
        this.filteredCategories = this.categories;
      }
    }
  }
};
</script>

<style scoped>
.management-section {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.filter-search-section {
  margin-bottom: 20px;
}

.filter-search-section input,
.filter-search-section select {
  margin-right: 10px;
  padding: 5px;
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
  cursor: pointer;
}

button {
  padding: 5px 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.input-field {
  margin-bottom: 20px;
}
</style>