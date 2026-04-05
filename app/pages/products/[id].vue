<template>
  <div class="min-h-screen bg-background">
    <main class="pt-32 pb-24 max-w-screen-2xl mx-auto px-8">
      <!-- Product Main Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <!-- Left Side: Image Gallery -->
        <div class="lg:col-span-7 flex flex-col md:flex-row gap-6">
          <!-- Thumbnail Strip -->
          <div class="order-2 md:order-1 flex md:flex-col gap-4 overflow-x-auto no-scrollbar md:w-24">
            <div 
              v-for="(image, idx) in productImages" 
              :key="idx"
              @click="selectedImage = idx"
              class="flex-shrink-0 w-20 h-24 md:w-full md:h-28 rounded-lg overflow-hidden bg-surface-container-high cursor-pointer transition-all hover:ring-1 ring-primary ring-offset-2"
              :class="{ 'ring-1': selectedImage === idx, 'opacity-60': selectedImage !== idx }"
            >
              <img :src="image" :alt="product?.name" class="w-full h-full object-cover" />
            </div>
          </div>
          <!-- Main Large Image -->
          <div class="order-1 md:order-2 flex-grow aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low shadow-sm">
            <img 
              :src="productImages[selectedImage] || '/placeholder-product.jpg'" 
              :alt="product?.name"
              class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        <!-- Right Side: Content -->
        <div class="lg:col-span-5 space-y-8 sticky top-32">
          <div v-if="pending" class="space-y-4 animate-pulse">
            <div class="h-8 bg-surface-container rounded w-3/4"></div>
            <div class="h-6 bg-surface-container rounded w-1/2"></div>
            <div class="h-4 bg-surface-container rounded w-full"></div>
          </div>

          <div v-else-if="error" class="text-center py-8">
            <span class="material-symbols-outlined text-4xl text-error mb-4">error</span>
            <p class="text-on-surface-variant">Product not found</p>
          </div>

          <template v-else-if="product">
            <div class="space-y-4">
              <div class="flex justify-between items-start">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                  :class="product.stock > 0 ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-error-container text-on-error-container'"
                >
                  {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
                </span>
                <div class="flex items-center gap-1 text-on-surface-variant">
                  <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                  <span class="text-sm font-medium">4.9</span>
                  <span class="text-sm text-outline mx-1">•</span>
                  <span class="text-sm text-outline underline">124 reviews</span>
                </div>
              </div>
              
              <h1 class="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">{{ product.name }}</h1>
              
              <div class="flex items-baseline gap-4">
                <span class="text-3xl font-light text-on-surface">${{ product.price }}</span>
                <span v-if="product.originalPrice" class="text-xl text-outline line-through">${{ product.originalPrice }}</span>
              </div>
              
              <p class="text-on-surface-variant leading-relaxed text-lg">{{ product.description }}</p>
            </div>

            <!-- Interactions -->
            <div class="space-y-6 pt-4">
              <div class="flex items-center gap-6">
                <!-- Quantity -->
                <div class="flex items-center bg-surface-container-low rounded-lg p-1">
                  <button 
                    @click="quantity > 1 && quantity--"
                    :disabled="quantity <= 1"
                    class="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded transition-colors disabled:opacity-50"
                  >
                    <span class="material-symbols-outlined">remove</span>
                  </button>
                  <span class="w-12 text-center font-semibold">{{ quantity }}</span>
                  <button 
                    @click="quantity++"
                    class="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded transition-colors"
                  >
                    <span class="material-symbols-outlined">add</span>
                  </button>
                </div>
                
                <!-- Add to Cart -->
                <button 
                  @click="addToCart"
                  :disabled="product.stock === 0"
                  class="flex-grow bg-primary-container text-white h-12 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] shadow-md shadow-primary/10 disabled:opacity-50"
                >
                  <span class="material-symbols-outlined">shopping_bag</span>
                  {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
                </button>
              </div>
              
              <button class="w-full flex items-center justify-center gap-2 py-3 text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors border-2 border-primary/10">
                <span class="material-symbols-outlined">favorite</span>
                Save to Wishlist
              </button>
            </div>

            <!-- Shipping Accordion -->
            <div class="pt-8 space-y-4">
              <details class="group border-t border-outline-variant/30 py-4 cursor-pointer">
                <summary class="flex justify-between items-center text-primary list-none">
                  <span class="font-semibold flex items-center gap-3">
                    <span class="material-symbols-outlined">local_shipping</span>
                    Shipping & Delivery
                  </span>
                  <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <p class="mt-4 text-sm text-on-surface-variant leading-relaxed">
                  Complimentary shipping on orders over $500. Standard delivery arrives in 3-5 business days. White-glove delivery available for large scale pieces.
                </p>
              </details>
              
              <details class="group border-t border-outline-variant/30 py-4 cursor-pointer">
                <summary class="flex justify-between items-center text-primary list-none">
                  <span class="font-semibold flex items-center gap-3">
                    <span class="material-symbols-outlined">eco</span>
                    Materials & Sustainability
                  </span>
                  <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <p class="mt-4 text-sm text-on-surface-variant leading-relaxed">
                  All our products are crafted using sustainable materials and eco-friendly processes. We prioritize local artisans and carbon-neutral shipping methods.
                </p>
              </details>
              
              <details class="group border-t border-b border-outline-variant/30 py-4 cursor-pointer">
                <summary class="flex justify-between items-center text-primary list-none">
                  <span class="font-semibold flex items-center gap-3">
                    <span class="material-symbols-outlined">history</span>
                    Returns & Exchanges
                  </span>
                  <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <p class="mt-4 text-sm text-on-surface-variant leading-relaxed">
                  We accept returns within 30 days of delivery. Items must be in original condition with all packaging. Exchanges are subject to availability.
                </p>
              </details>
            </div>
          </template>
        </div>
      </div>

      <!-- Related Products Section -->
      <section v-if="relatedProducts.length > 0" class="mt-32 space-y-12">
        <div class="flex justify-between items-end">
          <div class="space-y-2">
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Curated Pairing</span>
            <h2 class="text-3xl font-headline font-bold text-primary">You Might Also Like</h2>
          </div>
          <NuxtLink to="/" class="text-primary font-semibold border-b-2 border-primary/20 pb-1 hover:border-primary transition-all">
            View Entire Collection
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <NuxtLink 
            v-for="item in relatedProducts" 
            :key="item.id"
            :to="`/products/${item.id}`"
            class="group space-y-4"
          >
            <div class="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-high relative">
              <img
                :src="useProductImage(item)"
                :alt="item.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button class="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-lg">
                <span class="material-symbols-outlined">add</span>
              </button>
            </div>
            <div class="space-y-1">
              <h3 class="font-semibold text-lg text-primary">{{ item.name }}</h3>
              <p class="text-outline text-sm">{{ item.category?.name }}</p>
              <p class="font-medium">${{ item.price }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const cartStore = useCartStore()

const productId = route.params.id
const selectedImage = ref(0)
const quantity = ref(1)

// Fetch product
const { data: productData, pending, error } = await useFetch(`/api/products/${productId}`)
const product = computed(() => productData.value)

// Product images
const productImages = computed(() => useProductImages(product.value))

// Fetch related products
const { data: allProducts } = await useFetch('/api/products?limit=8')
const relatedProducts = computed(() => {
  if (!allProducts.value?.products || !product.value) return []
  return allProducts.value.products
    .filter(p => p.id !== product.value.id && p.categoryId === product.value.categoryId)
    .slice(0, 4)
})

function addToCart() {
  if (product.value && product.value.stock > 0) {
    cartStore.addItem(product.value, quantity.value)
    // Show success message or open cart drawer
    alert('Added to cart!')
  }
}

useHead(() => ({
  title: product.value ? `${product.value.name} | The Curated Tactile` : 'Product | The Curated Tactile',
  meta: [
    { name: 'description', content: product.value?.description || 'Product details' }
  ]
}))
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
