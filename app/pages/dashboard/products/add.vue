<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink to="/dashboard/products" class="p-2 text-stone-400 hover:text-primary transition-colors">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h2 class="text-3xl font-headline font-extrabold text-primary tracking-tight">Add Product</h2>
        <p class="text-stone-500 mt-1">Create a new product in your catalog</p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="saveProduct" class="bg-surface-container-lowest rounded-xl p-8 editorial-shadow-sm space-y-8">
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
              placeholder="e.g. Artisan Vase"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-on-surface-variant">Slug</label>
            <input 
              v-model="form.slug"
              type="text"
              required
              class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary"
              placeholder="e.g. artisan-vase"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-on-surface-variant">Description</label>
          <textarea 
            v-model="form.description"
            rows="4"
            class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary resize-none"
            placeholder="Describe your product..."
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
              placeholder="0.00"
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
              placeholder="0"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-on-surface-variant">Category</label>
            <select 
              v-model="form.categoryId"
              required
              class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Category</option>
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
            placeholder="https://example.com/image.jpg"
          />
          <p class="text-xs text-stone-500">Enter a URL for the product image</p>
        </div>
      </section>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-4 pt-6 border-t border-stone-100">
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
          <span>{{ saving ? 'Saving...' : 'Save Product' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

const router = useRouter()

const form = ref({
  name: '',
  slug: '',
  description: '',
  price: '',
  stock: '',
  categoryId: '',
  images: ''
})

const saving = ref(false)

const { data: categories } = await useFetch('/api/categories')

async function saveProduct() {
  saving.value = true
  
  try {
    const payload = {
      ...form.value,
      price: parseFloat(form.value.price),
      stock: parseInt(form.value.stock),
      categoryId: parseInt(form.value.categoryId),
      images: form.value.images ? [form.value.images] : []
    }
    
    await $fetch('/api/admin/products', {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    router.push('/dashboard/products')
  } catch (err) {
    alert('Failed to create product: ' + err.message)
  } finally {
    saving.value = false
  }
}

useHead({
  title: 'Add Product | Admin Panel'
})
</script>
