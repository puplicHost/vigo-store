<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="container">
        <h1>Add Product</h1>
        
        <form @submit.prevent="handleSubmit" class="product-form">
          <div class="form-group">
            <label for="name">Product Name</label>
            <input id="name" v-model="form.name" type="text" required />
          </div>
          
          <div class="form-group">
            <label for="slug">Slug</label>
            <input id="slug" v-model="form.slug" type="text" required />
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="form.description" rows="4"></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="price">Price ($)</label>
              <input id="price" v-model.number="form.price" type="number" step="0.01" min="0" required />
            </div>
            
            <div class="form-group">
              <label for="stock">Stock</label>
              <input id="stock" v-model.number="form.stock" type="number" min="0" required />
            </div>
          </div>
          
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" v-model.number="form.categoryId" required>
              <option value="">Select a category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          
          <button type="submit" :disabled="loading" class="btn-submit">
            {{ loading ? 'Creating...' : 'Create Product' }}
          </button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  slug: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: '',
})

const loading = ref(false)
const error = ref('')

const { data: categories } = await useFetch('/api/categories')

async function handleSubmit() {
  loading.value = true
  error.value = ''
  
  try {
    await $fetch('/api/admin/products', {
      method: 'POST',
      body: form,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    navigateTo('/dashboard/products')
  } catch (err) {
    error.value = err?.data?.statusMessage || 'Failed to create product'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Add Product - Figo Admin',
})

definePageMeta({
  layout: 'dashboard',
})
</script>

<style scoped>
.product-form {
  max-width: 600px;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

textarea {
  resize: vertical;
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background: #16a34a;
  color: white;
  border-radius: 0.375rem;
  font-weight: 600;
  margin-top: 1rem;
}

.btn-submit:disabled {
  background: #9ca3af;
}

.error {
  color: #ef4444;
  margin-top: 1rem;
}
</style>
