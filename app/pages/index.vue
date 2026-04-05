<template>
  <div class="home-page">
    <section class="hero glass-card">
      <div class="container hero-content">
        <h1 class="hero-title animate-glow">
          Welcome to <span class="glowing-text">Figo Store</span>
        </h1>
        <p class="hero-subtitle">Discover premium gadgets and luxury essentials at your fingertips.</p>
        <NuxtLink to="/products" class="btn btn-primary">
          Shop the Collection
        </NuxtLink>
      </div>
    </section>

    <section class="featured">
      <div class="container">
        <h2 class="section-title">Featured Products</h2>
        <div v-if="pending" class="loading-state">
          <div class="spinner"></div>
          <p>Loading curated items...</p>
        </div>
        <div v-else-if="error" class="error-state">
          <p>Failed to load products. Please try again.</p>
        </div>
        <div v-else class="products-grid">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Shop by Category</h2>
        <div v-if="categoriesPending" class="loading-state">
          <div class="spinner"></div>
        </div>
        <div v-else class="categories-grid">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/products?category=${category.slug}`"
            class="category-card glass-card"
          >
            <div class="category-info">
              <h3>{{ category.name }}</h3>
              <p>{{ category._count.products }} products</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data: productsData, pending, error } = await useFetch('/api/products?limit=8')
const { data: categories, pending: categoriesPending } = await useFetch('/api/categories')

const products = computed(() => productsData.value?.products || [])

useHead({
  title: 'Figo Store - Premium Essentials',
  meta: [
    { name: 'description', content: 'Explore the finest collection of products curated for quality and style.' }
  ]
})
</script>

<style scoped>
.home-page {
  padding-bottom: 5rem;
}

.hero {
  margin: 2rem 1rem;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.featured,
.categories-section {
  padding: 5rem 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.category-card {
  padding: 2rem;
  text-align: center;
  transition: var(--transition);
}

.category-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-5px);
  box-shadow: var(--shadow-glow);
}

.category-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.category-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--glass-border);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
}
</style>
