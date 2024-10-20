<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <h3>Add Product</h3>

      <form @submit.prevent="submitProduct">
        <div class="form-group">
          <label for="productName">Product Name</label>
          <input type="text" id="productName" v-model="newProduct.name" required />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" id="description" v-model="newProduct.description" required />
        </div>

        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" id="price" v-model="newProduct.price" step="0.01" min="0" required />
        </div>

        <div class="control_wrapper">
          <label for="category">Category</label>
          <div class="control_wrapper">
            <ejs-combobox
                id="combobox"
                :dataSource="categories ? categories : []"
                placeholder="Select a category"
                v-model="newProduct.categoryId"
                :fields="{ text: 'name', value: 'categoryId' }"
            ></ejs-combobox>
          </div>
        </div>

        <div class="form-group">
          <label for="image">Image</label>
          <input type="file" id="image" @change="handleImageUpload" accept="image/*" />
        </div>

        <button type="submit" class="add-button">Add</button>
        <button type="button" class="cancel-button" @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ComboBoxComponent as EjsCombobox } from "@syncfusion/ej2-vue-dropdowns";

export default {
  components: {
    EjsCombobox
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newProduct: {
        name: '',
        description: '',
        price: null,
        categoryId: '',
        image: null,
      },
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      console.log(file);
      this.newProduct.image = file;
    },
    submitProduct() {
      const formData = new FormData();

      // Product object
      const product = {
        name: this.newProduct.name,
        description: this.newProduct.description,
        price: this.newProduct.price.toFixed(2),
        category: { categoryId: this.newProduct.categoryId }
      };

      // Convert object as JSON blob
      formData.append('product', new Blob([JSON.stringify(product)], { type: "application/json" }));

      if (this.newProduct.image) {
        formData.append('image', this.newProduct.image);
      }

      console.log('Form Data:', formData);
      this.$emit('add-product', formData);
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    },
  },
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
  background-color: rgba(0, 0, 0, 0.5);
}


.modal-content {
  position: relative;
  margin: 10% auto;
  padding: 20px;
  width: 40%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.add-button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.add-button:hover {
  background-color: #2980b9;
}

.cancel-button:hover {
  background-color: #c0392b;
}

@import '~@syncfusion/ej2-base/styles/material.css';
@import '~@syncfusion/ej2-inputs/styles/material.css';
@import '~@syncfusion/ej2-vue-dropdowns/styles/material.css';
</style>