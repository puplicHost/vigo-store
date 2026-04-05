<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="container">
        <h1>Edit Product</h1>
        
        <div v-if="pending" class="loading">Loading...</div>
        <form v-else @submit.prevent="handleSubmit" class="product-form">
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
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="navigateTo('/dashboard/products')" class="btn-cancel">Cancel</button>
            <button type="submit" :disabled="loading" class="btn-submit">
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute()
const productId = route.params.id

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
const { data: product, pending } = await useFetch(`/api/products/${productId}`)

watchEffect(() => {
  if (product.value) {
    form.name = product.value.name
    form.slug = product.value.slug
    form.description = product.value.description || ''
    form.price = product.value.price
    form.stock = product.value.stock
    form.categoryId = product.value.categoryId
  }
})

async function handleSubmit() {
  loading.value = true
  error.value = ''
  
  try {
    await $fetch(`/api/admin/products/${productId}`, {
      method: 'PUT',
      body: form,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    navigateTo('/dashboard/products')
  } catch (err) {
    error.value = err?.data?.statusMessage || 'Failed to update product'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Edit Product - Figo Admin',
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

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-cancel {
  padding: 0.75rem 1.5rem;
  background: #e5e7eb;
  color: #374151;
  border-radius: 0.375rem;
  font-weight: 600;
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  border-radius: 0.375rem;
  font-weight: 600;
}

.btn-submit:disabled {
  background: #9ca3af;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
}

.error {
  color: #ef4444;
}
</style>
