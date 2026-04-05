<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-headline font-extrabold text-primary tracking-tight">Products</h2>
        <p class="text-stone-500 mt-1">Manage your product catalog</p>
      </div>
      <NuxtLink 
        to="/dashboard/products/add"
        class="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition-all flex items-center gap-2"
      >
        <span class="material-symbols-outlined">add</span>
        Add Product
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-container-lowest p-4 rounded-xl">
      <div class="flex gap-4 w-full md:w-auto">
        <div class="relative flex-1 md:w-80">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search products..."
            class="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>
        <select v-model="selectedCategory" class="px-4 py-2.5 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div class="text-sm text-stone-500">
        {{ filteredProducts.length }} products
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-surface-container-lowest rounded-xl editorial-shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-surface-container-low text-stone-500 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th class="px-6 py-4">Product</th>
              <th class="px-6 py-4">Category</th>
              <th class="px-6 py-4">Price</th>
              <th class="px-6 py-4">Stock</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-50 text-sm">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-surface-container-low/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                    <img :src="useProductImage(product)" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="font-bold text-primary">{{ product.name }}</p>
                    <p class="text-xs text-stone-500">{{ product.slug }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-stone-600">{{ product.category?.name }}</td>
              <td class="px-6 py-4 font-bold">${{ product.price.toFixed(2) }}</td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
                  :class="product.stock > 10 ? 'bg-primary-fixed/40 text-primary' : product.stock > 0 ? 'bg-secondary-container/20 text-on-secondary-container' : 'bg-error-container text-on-error-container'"
                >
                  {{ product.stock }} units
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink 
                    :to="`/dashboard/products/edit/${product.id}`"
                    class="p-2 text-stone-400 hover:text-primary transition-colors"
                  >
                    <span class="material-symbols-outlined">edit</span>
                  </NuxtLink>
                  <button 
                    @click="deleteProduct(product.id)"
                    class="p-2 text-stone-400 hover:text-error transition-colors"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredProducts.length === 0" class="text-center py-16 bg-surface-container-lowest rounded-xl">
      <span class="material-symbols-outlined text-6xl text-outline mb-4">inventory_2</span>
      <p class="text-on-surface-variant">No products found</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['admin']
})

const searchQuery = ref('')
const selectedCategory = ref('')

const { data: products } = await useFetch('/api/products', {
  headers: {
    Authorization: `Bearer ${process.client ? localStorage.getItem('token') : ''}`
  }
})

const { data: categories } = await useFetch('/api/categories')

const filteredProducts = computed(() => {
  let result = products.value?.products || []
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.slug.toLowerCase().includes(query)
    )
  }
  
  if (selectedCategory.value) {
    result = result.filter(p => p.categoryId === parseInt(selectedCategory.value))
  }
  
  return result
})

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return
  
  try {
    await $fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    // Refresh products
    const { data: refreshed } = await useFetch('/api/products')
    products.value = refreshed.value
  } catch (err) {
    alert('Failed to delete product')
  }
}

useHead({
  title: 'Products | Admin Panel'
})
</script>
