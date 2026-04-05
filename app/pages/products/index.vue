<template>
  <div class="products-page">
    <div class="container">
      <h1 class="section-title">Explore <span class="glowing-text">Our Collection</span></h1>
      
      <div class="filters glass-card">
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="search-input"
          />
        </div>
        <div class="filter-actions">
          <select v-model="selectedCategory" class="category-select glass-card">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.slug">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="pending" class="loading-state">
        <div class="spinner"></div>
      </div>
      <div v-else-if="error" class="error-state">
        <p>Failed to find our items.</p>
      </div>
      <div v-else-if="products.length === 0" class="empty-state">
        <p>No products found with these criteria.</p>
      </div>
      <div v-else>
        <div class="products-grid">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
        
        <div v-if="pagination.totalPages > 1" class="pagination">
          <button
            :disabled="page === 1"
            @click="page--"
            class="btn btn-secondary page-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span class="page-info">Page {{ page }} of {{ pagination.totalPages }}</span>
          <button
            :disabled="page === pagination.totalPages"
            @click="page++"
            class="btn btn-secondary page-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const searchQuery = ref('')
const selectedCategory = ref(route.query.category || '')
const page = ref(1)

const { data: categories } = await useFetch('/api/categories')

const { data: productsData, pending, error } = await useFetch(() => {
  const params = new URLSearchParams()
  params.append('page', page.value.toString())
  params.append('limit', '12')
  if (selectedCategory.value) params.append('category', selectedCategory.value)
  if (searchQuery.value) params.append('search', searchQuery.value)
  return `/api/products?${params.toString()}`
})

const products = computed(() => productsData.value?.products || [])
const pagination = computed(() => productsData.value?.pagination || { totalPages: 1 })

watch([searchQuery, selectedCategory], () => {
  page.value = 1
})

useHead({
  title: 'Products - Figo Store',
})
</script>

<style scoped>
.products-page {
  padding: 4rem 0;
}

.section-title {
  text-align: left;
  margin-bottom: 3rem;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1rem 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  position: relative;
  min-width: 300px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  outline: none;
  transition: var(--transition);
}

.search-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 10px var(--accent-glow);
}

.category-select {
  padding: 0.75rem 1.5rem;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  outline: none;
  cursor: pointer;
  border-radius: var(--border-radius);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 6rem 0;
  color: var(--text-secondary);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--glass-border);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 5rem;
}

.page-btn {
  background: var(--bg-tertiary);
  border: 1px solid var(--glass-border);
  padding: 0.75rem;
}

.page-btn:hover:not(:disabled) {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.page-info {
  color: var(--text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
