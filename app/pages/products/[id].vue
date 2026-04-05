<template>
  <div class="product-detail">
    <div v-if="pending" class="loading">Loading...</div>
    <div v-else-if="error || !product" class="error">Product not found</div>
    <div v-else class="container">
      <div class="product-layout">
        <div class="product-image">
          <img :src="product.images || '/placeholder-product.jpg'" :alt="product.name" />
        </div>
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="category">{{ product.category?.name }}</p>
          <p class="price">${{ product.price.toFixed(2) }}</p>
          <p class="description">{{ product.description || 'No description available' }}</p>
          <p class="stock">{{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}</p>
          
          <div v-if="product.stock > 0" class="actions">
            <div class="quantity">
              <button @click="quantity > 1 && quantity--">-</button>
              <span>{{ quantity }}</span>
              <button @click="quantity < product.stock && quantity++">+</button>
            </div>
            <button @click="addToCart" class="btn-add">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const cartStore = useCartStore()
const quantity = ref(1)

const { data: product, pending, error } = await useFetch(`/api/products/${route.params.id}`)

function addToCart() {
  if (!product.value) return
  
  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    quantity: quantity.value,
    image: product.value.images,
  })
  alert('Added to cart!')
}

useHead(() => ({
  title: product.value ? `${product.value.name} - Figo Store` : 'Product - Figo Store',
}))
</script>

<style scoped>
.product-detail {
  padding: 2rem 0;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.product-image {
  background: #f3f4f6;
  border-radius: 0.5rem;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: auto;
  display: block;
}

.product-info h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.category {
  color: #6b7280;
  margin-bottom: 1rem;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 1rem;
}

.description {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.stock {
  color: #16a34a;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.quantity {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  overflow: hidden;
}

.quantity button {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  font-size: 1rem;
}

.quantity span {
  padding: 0.5rem 1rem;
  min-width: 3rem;
  text-align: center;
}

.btn-add {
  padding: 0.75rem 2rem;
  background: #2563eb;
  color: white;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
}

.btn-add:hover {
  background: #1d4ed8;
}

@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
