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
                    <input type="number" id="price" v-model="newProduct.price" step="0.01" required />
                </div>

                <label>Select a category:</label>
  <div v-for="category in categories" :key="category.categoryId">
    <input 
      type="radio" 
      :id="'category-' + category.categoryId"
      :value="category.categoryId" 
      v-model="newProduct.categoryId" 
      required
    />
    <label :for="'category-' + category.categoryId">{{ category.name }}</label>

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
export default {
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
                categoryId: '', // Ensure this is initialized to an empty string
                image: null,
            },
        };
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            this.newProduct.image = file;
        },
        submitProduct() {
            const formData = new FormData();
            formData.append('name', this.newProduct.name);
            formData.append('description', this.newProduct.description);
            formData.append('price', this.newProduct.price);
            formData.append('categoryId', this.newProduct.categoryId); // Submit the selected category's ID
            formData.append('image', this.newProduct.image);

            this.$emit('add-product', formData); // Emit formData
            this.closeModal(); // Close the modal after emitting
        },

        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
/* Modal background */
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

/* Modal content */
.modal-content {
    position: relative;
    margin: 10% auto;
    padding: 20px;
    width: 40%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Close button */
.close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
}

/* Form styling */
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

/* Buttons styling */
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

input[type="radio"] {
  margin-right: 10px;
}

div {
  margin-bottom: 10px;
}
</style>
