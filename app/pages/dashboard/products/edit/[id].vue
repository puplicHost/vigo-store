<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink to="/dashboard/products" class="p-2 text-stone-400 hover:text-primary transition-colors">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h2 class="text-3xl font-headline font-extrabold text-primary tracking-tight">Edit Product</h2>
        <p class="text-stone-500 mt-1">Update product details</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="bg-surface-container-lowest rounded-xl p-8 space-y-6 animate-pulse">
      <div class="h-8 bg-surface-container rounded w-1/4"></div>
      <div class="grid grid-cols-2 gap-6">
        <div class="h-12 bg-surface-container rounded"></div>
        <div class="h-12 bg-surface-container rounded"></div>
      </div>
      <div class="h-32 bg-surface-container rounded"></div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="updateProduct" class="bg-surface-container-lowest rounded-xl p-8 editorial-shadow-sm space-y-8">
      <!-- Basic Info -->
      <section class="space-y-6">
        <h3 class="text-lg font-headline font-bold text-primary">Basic Information</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-on-surface-variant">Product Name</label>
            <input 
              v-model="form.name"
              type="text"
              required
              class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-on-surface-variant">Slug</label>
            <input 
              v-model="form.slug"
              type="text"
              required
              class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-on-surface-variant">Description</label>
          <textarea 
            v-model="form.description"
            rows="4"
            class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary resize-none"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-on-surface-variant">Price ($)</label>
            <input 
              v-model.number="form.price"
              type="number"
              required
              min="0"
              step="0.01"
              class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-on-surface-variant">Stock</label>
            <input 
              v-model.number="form.stock"
              type="number"
              required
              min="0"
              class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-on-surface-variant">Category</label>
            <select 
              v-model="form.categoryId"
              required
              class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary"
            >
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Images -->
      <section class="space-y-6">
        <h3 class="text-lg font-headline font-bold text-primary">Images</h3>
        <div class="space-y-2">
          <label class="text-sm font-medium text-on-surface-variant">Image URL</label>
          <input 
            v-model="form.images"
            type="text"
            class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary"
          />
        </div>
        <div v-if="form.images" class="w-32 h-32 rounded-lg overflow-hidden bg-surface-container-high">
          <img :src="form.images" class="w-full h-full object-cover" />
        </div>
      </section>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-6 border-t border-stone-100">
        <button 
          type="button"
          @click="deleteProduct"
          :disabled="deleting"
          class="px-6 py-3 text-error font-semibold hover:bg-error/5 rounded-lg transition-colors flex items-center gap-2"
        >
          <span class="material-symbols-outlined">delete</span>
          {{ deleting ? 'Deleting...' : 'Delete' }}
        </button>
        
        <div class="flex items-center gap-4">
          <NuxtLink 
            to="/dashboard/products"
            class="px-6 py-3 text-primary font-semibold hover:bg-primary/5 rounded-lg transition-colors"
          >
            Cancel
          </NuxtLink>
          <button 
            type="submit"
            :disabled="saving"
            class="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <span v-if="saving" class="material-symbols-outlined animate-spin">refresh</span>
            <span>{{ saving ? 'Saving...' : 'Update Product' }}</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['admin']
})

const route = useRoute()
const router = useRouter()
const productId = route.params.id

const form = ref({
  name: '',
  slug: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: null,
  images: ''
})

const saving = ref(false)
const deleting = ref(false)

const { data: categories } = await useFetch('/api/categories')

const { data: product, pending } = await useFetch(`/api/products/${productId}`, {
  headers: {
    Authorization: `Bearer ${process.client ? localStorage.getItem('token') : ''}`
  }
})

// Populate form when data loads
watch(product, (newProduct) => {
  if (newProduct) {
    form.value = {
      name: newProduct.name,
      slug: newProduct.slug,
      description: newProduct.description || '',
      price: newProduct.price,
      stock: newProduct.stock,
      categoryId: newProduct.categoryId,
      images: Array.isArray(newProduct.images) ? newProduct.images[0] : newProduct.images || ''
    }
  }
}, { immediate: true })

async function updateProduct() {
  saving.value = true
  
  try {
    const payload = {
      ...form.value,
      images: form.value.images ? [form.value.images] : []
    }
    
    await $fetch(`/api/admin/products/${productId}`, {
      method: 'PUT',
      body: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    router.push('/dashboard/products')
  } catch (err) {
    alert('Failed to update product')
  } finally {
    saving.value = false
  }
}

async function deleteProduct() {
  if (!confirm('Are you sure you want to delete this product?')) return
  
  deleting.value = true
  
  try {
    await $fetch(`/api/admin/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    router.push('/dashboard/products')
  } catch (err) {
    alert('Failed to delete product')
    deleting.value = false
  }
}

useHead({
  title: 'Edit Product | Admin Panel'
})
</script>
