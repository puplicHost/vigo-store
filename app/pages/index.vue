<template>
  <div class="min-h-screen bg-background">
    <!-- Main Content -->
    <main class="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto">
      <!-- Editorial Header -->
      <header class="mb-16">
        <span class="font-label text-xs uppercase tracking-[0.2em] text-outline mb-4 block">Collection 2024</span>
        <h1 class="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-primary max-w-3xl leading-[0.9]">
          Tactile Objects <br/>for Modern Living.
        </h1>
      </header>

      <div class="flex flex-col md:flex-row gap-12">
        <!-- Left Filter Panel -->
        <aside class="w-full md:w-64 flex-shrink-0">
          <div class="sticky top-28 space-y-10">
            <!-- Categories -->
            <section>
              <h3 class="font-headline font-bold text-lg mb-6 text-on-surface">Categories</h3>
              <div class="space-y-4">
                <label v-for="cat in categories" :key="cat.id" class="flex items-center group cursor-pointer">
                  <input 
                    type="checkbox" 
                    :value="cat.slug" 
                    v-model="selectedCategories"
                    class="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-fixed transition-all cursor-pointer"
                  />
                  <span class="ml-3 text-on-surface-variant font-medium group-hover:text-primary transition-colors" :class="{ 'text-primary font-semibold': selectedCategories.includes(cat.slug) }">
                    {{ cat.name }}
                  </span>
                </label>
              </div>
            </section>

            <!-- Price Range -->
            <section>
              <h3 class="font-headline font-bold text-lg mb-6 text-on-surface">Price Range</h3>
              <div class="px-2">
                <input 
                  type="range" 
                  v-model="maxPrice" 
                  min="0" 
                  max="1000" 
                  class="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between mt-4 text-xs font-medium text-outline">
                  <span>$0</span>
                  <span>${{ maxPrice }}</span>
                </div>
              </div>
            </section>

            <!-- Sort -->
            <section>
              <h3 class="font-headline font-bold text-lg mb-6 text-on-surface">Sort By</h3>
              <select v-model="sortBy" class="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary-fixed transition-all cursor-pointer">
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </section>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1">
          <!-- Loading State -->
          <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-16">
            <div v-for="i in 6" :key="i" class="animate-pulse">
              <div class="aspect-[4/5] bg-surface-container rounded-xl mb-6"></div>
              <div class="h-4 bg-surface-container rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-surface-container rounded w-1/2"></div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-16">
            <span class="material-symbols-outlined text-4xl text-error mb-4">error</span>
            <p class="text-on-surface-variant">Failed to load products. Please try again.</p>
          </div>

          <!-- Products Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-16">
            <article v-for="product in filteredProducts" :key="product.id" class="group relative">
              <NuxtLink :to="`/products/${product.id}`">
                <div class="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container mb-6 transition-all duration-700 editorial-shadow">
                  <img
                    :src="useProductImage(product)"
                    :alt="product.name"
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <button class="absolute top-4 right-4 p-2 bg-white/60 backdrop-blur-md rounded-full text-on-surface-variant hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-xl">favorite</span>
                  </button>
                  <span v-if="product.stock < 10" class="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Limited Run
                  </span>
                  <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button
                      @click.prevent="addToCart(product)"
                      class="w-full bg-primary-container text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 editorial-shadow hover:opacity-90"
                    >
                      <span class="material-symbols-outlined text-lg">add_shopping_cart</span>
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-headline font-bold text-xl text-primary leading-tight">{{ product.name }}</h4>
                    <p class="text-on-surface-variant font-medium">{{ product.category?.name }}</p>
                    <div class="flex items-center gap-1 mt-2 text-secondary">
                      <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                      <span class="text-xs font-bold text-on-surface">4.8 (24)</span>
                    </div>
                  </div>
                  <span class="font-headline font-extrabold text-lg text-primary">${{ product.price }}</span>
                </div>
              </NuxtLink>
            </article>
          </div>

          <!-- Pagination -->
          <nav v-if="!pending && !error && filteredProducts.length > 0" class="mt-24 flex justify-center items-center gap-4">
            <button class="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant text-primary hover:bg-primary-fixed transition-colors">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <div class="flex items-center gap-2">
              <button class="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white font-bold">1</button>
              <button class="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-primary font-bold">2</button>
              <button class="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-primary font-bold">3</button>
            </div>
            <button class="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant text-primary hover:bg-primary-fixed transition-colors">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Filters
const selectedCategories = ref([])
const maxPrice = ref(1000)
const sortBy = ref('featured')

// Fetch data
const { data: productsData, pending, error } = await useFetch('/api/products')
const { data: categories } = await useFetch('/api/categories')

const products = computed(() => productsData.value?.products || [])

// Filter and sort products
const filteredProducts = computed(() => {
  let result = [...products.value]

  // Filter by category
  if (selectedCategories.value.length > 0) {
    result = result.filter(p => selectedCategories.value.includes(p.category?.slug))
  }

  // Filter by price
  result = result.filter(p => p.price <= maxPrice.value)

  // Sort
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
  }

  return result
})

const cartStore = useCartStore()

function addToCart(product) {
  cartStore.addItem(product, 1)
  // Optional: Show toast notification
}

useHead({
  title: 'The Curated Tactile | Shop All',
  meta: [
    { name: 'description', content: 'Tactile Objects for Modern Living. Curated collection of ceramics, textiles, lighting, and woodenware.' }
  ]
})
</script>
