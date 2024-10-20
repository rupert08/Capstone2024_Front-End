<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <h3>Update Product</h3>

      <form v-if="updatedProduct">
        <div>
          <label for="name">Product Name</label>
          <input type="text" id="name" v-model="updatedProduct.name" />
        </div>

        <div>
          <label for="description">Description</label>
          <input type="text" id="description" v-model="updatedProduct.description" />
        </div>

        <div>
          <label for="price">Price</label>
          <input type="number" id="price" v-model="updatedProduct.price" />
        </div>

        <div class="control_wrapper">
          <label for="category">Category</label>
          <div class="control_wrapper">
            <ejs-combobox
                id="combobox"
                :dataSource="categories ? categories : []"
                placeholder="Select a category"
                v-model="updatedProduct.categoryId"
                :fields="{ text: 'name', value: 'categoryId' }"
            ></ejs-combobox>
          </div>
        </div>

        <button type="button" @click="submitUpdate">Update</button>
        <button type="button" @click="closeModal">Cancel</button>
      </form>

      <!-- Debugging purposes, display message if product is null -->
      <p v-else>No product selected for update</p>
    </div>
  </div>
</template>

<script>
import { updateProduct } from '@/services/productService';
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
    productData: {
      type: Object,
      default: () => null,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      updatedProduct: this.productData ? { ...this.productData } : {},
    };
  },
  watch: {
    productData(newProduct) {
      if (newProduct) {
        this.updatedProduct = { ...newProduct };
      }
    },
  },
  methods: {
    async submitUpdate() {
      const formData = new FormData();

      const updatedProduct = {
        name: this.updatedProduct.name,
        description: this.updatedProduct.description,
        price: this.updatedProduct.price.toFixed(2),
        category: { categoryId: this.updatedProduct.categoryId },
      };

      formData.append('product', new Blob([JSON.stringify(updatedProduct)], { type: 'application/json' }));

      console.log('Form Data:', formData);
      try {
        await updateProduct(this.updatedProduct.productId, formData);
        this.$emit('update-product', formData);
        this.$emit('close');
      } catch (error) {
        console.error('Error updating product:', error);
      }
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
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
  background-color: white;
  border-radius: 8px;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #2980b9;
}

button.cancel-button {
  background-color: #e74c3c;
}

button.cancel-button:hover {
  background-color: #c0392b;
}

@import '~@syncfusion/ej2-base/styles/material.css';
@import '~@syncfusion/ej2-inputs/styles/material.css';
@import '~@syncfusion/ej2-vue-dropdowns/styles/material.css';
</style>