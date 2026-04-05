<template>
  <div class="product-card glass-card">
    <div class="product-image">
      <img :src="imageUrl" :alt="product.name" loading="lazy" />
      <div v-if="product.stock === 0" class="badge out-of-stock">Out of Stock</div>
    </div>
    <div class="product-info">
      <p class="category">{{ product.category?.name || 'Uncategorized' }}</p>
      <h3>{{ product.name }}</h3>
      <div class="info-footer">
        <p class="price">${{ product.price.toFixed(2) }}</p>
        <div class="actions">
          <NuxtLink :to="`/products/${product.id}`" class="btn-icon" title="View Details">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
          </NuxtLink>
          <button @click="addToCart" class="btn-icon cart-btn" title="Add to Cart" :disabled="product.stock === 0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: { type: Object, required: true },
})

const cartStore = useCartStore()

const imageUrl = computed(() => useProductImage(props.product))

function addToCart() {
  if (props.product.stock === 0) return
  
  cartStore.addItem(props.product, 1)
}
</script>

<style scoped>
.product-card {
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-glow);
  border-color: var(--accent-primary);
}

.product-image {
  height: 240px;
  position: relative;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.product-image img {
  max-height: 100%;
  width: auto;
  object-fit: contain;
  transition: var(--transition);
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.out-of-stock {
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.product-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.category {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.product-info h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
  flex: 1;
}

.info-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.actions {
  display: flex;
  gap: 0.75rem;
}

.btn-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--glass-border);
  transition: var(--transition);
}

.btn-icon:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

.cart-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
