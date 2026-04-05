<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="container">
        <div class="page-header">
          <h1>Products</h1>
          <NuxtLink to="/dashboard/products/add" class="btn-add">+ Add Product</NuxtLink>
        </div>
        
        <div v-if="pending" class="loading">Loading...</div>
        <div v-else-if="error" class="error">Failed to load products</div>
        <div v-else>
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category?.name }}</td>
                <td>${{ product.price.toFixed(2) }}</td>
                <td>{{ product.stock }}</td>
                <td class="actions">
                  <NuxtLink :to="`/dashboard/products/edit/${product.id}`" class="btn-edit">Edit</NuxtLink>
                  <button @click="deleteProduct(product.id)" class="btn-delete">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const { data: productsData, pending, error, refresh } = await useFetch('/api/products?limit=100', {
  headers: {
    Authorization: `Bearer ${process.client ? localStorage.getItem('token') : ''}`,
  },
})

const products = computed(() => productsData.value?.products || [])

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return
  
  try {
    await $fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    refresh()
  } catch (err) {
    alert('Failed to delete product')
  }
}

useHead({
  title: 'Products - Figo Admin',
})

definePageMeta({
  layout: 'dashboard',
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-add {
  padding: 0.5rem 1rem;
  background: #16a34a;
  color: white;
  border-radius: 0.375rem;
}

.data-table {
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  background: #f9fafb;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit {
  padding: 0.25rem 0.75rem;
  background: #2563eb;
  color: white;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.btn-delete {
  padding: 0.25rem 0.75rem;
  background: #ef4444;
  color: white;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
}
</style>
