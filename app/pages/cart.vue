<template>
  <div class="cart-page">
    <div class="container">
      <h1>Shopping Cart</h1>
      
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <NuxtLink to="/products" class="btn-continue">Continue Shopping</NuxtLink>
      </div>
      
      <div v-else class="cart-layout">
        <div class="cart-items">
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <img :src="item.image || '/placeholder-product.jpg'" :alt="item.name" class="item-image" />
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-price">${{ item.price.toFixed(2) }}</p>
            </div>
            <div class="item-quantity">
              <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            <p class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</p>
            <button @click="cartStore.removeItem(item.id)" class="btn-remove">×</button>
          </div>
        </div>
        
        <div class="cart-summary">
          <h2>Order Summary</h2>
          <div class="summary-row">
            <span>Items ({{ cartStore.totalItems }})</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <NuxtLink to="/checkout" class="btn-checkout">Proceed to Checkout</NuxtLink>
          <NuxtLink to="/products" class="btn-continue">Continue Shopping</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadFromLocalStorage()
})

useHead({
  title: 'Shopping Cart - Figo Store',
})
</script>

<style scoped>
.cart-page {
  padding: 2rem 0;
}

h1 {
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem;
}

.empty-cart p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.btn-continue {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #e5e7eb;
  color: #374151;
  border-radius: 0.375rem;
}

.cart-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.375rem;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.item-price {
  color: #6b7280;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-quantity button {
  width: 32px;
  height: 32px;
  background: #f3f4f6;
  border-radius: 0.25rem;
}

.item-total {
  font-weight: 600;
  min-width: 80px;
  text-align: right;
}

.btn-remove {
  color: #ef4444;
  font-size: 1.5rem;
  padding: 0.25rem;
}

.cart-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.cart-summary h2 {
  margin-bottom: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.125rem;
  border-bottom: none;
}

.btn-checkout {
  display: block;
  width: 100%;
  padding: 0.875rem;
  background: #2563eb;
  color: white;
  border-radius: 0.375rem;
  text-align: center;
  margin: 1rem 0;
  font-weight: 600;
}

@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    flex-wrap: wrap;
  }
}
</style>
