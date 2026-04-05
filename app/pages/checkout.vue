<template>
  <div class="checkout-page">
    <div class="container">
      <h1>Checkout</h1>
      
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <NuxtLink to="/products" class="btn-continue">Continue Shopping</NuxtLink>
      </div>
      
      <div v-else class="checkout-layout">
        <form @submit.prevent="handleCheckout" class="checkout-form">
          <h2>Shipping Information</h2>
          <div class="form-group">
            <label for="address">Address</label>
            <input id="address" v-model="form.address" type="text" required />
          </div>
          <div class="form-group">
            <label for="city">City</label>
            <input id="city" v-model="form.city" type="text" required />
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input id="phone" v-model="form.phone" type="tel" required />
          </div>
          <button type="submit" :disabled="loading" class="btn-submit">
            {{ loading ? 'Processing...' : `Pay $${cartStore.totalPrice.toFixed(2)}` }}
          </button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
        
        <div class="order-summary">
          <h2>Order Summary</h2>
          <div v-for="item in cartStore.items" :key="item.id" class="summary-item">
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="summary-total">
            <span>Total</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCartStore()
const router = useRouter()

const form = reactive({
  address: '',
  city: '',
  phone: '',
})

const loading = ref(false)
const error = ref('')

onMounted(() => {
  cartStore.loadFromLocalStorage()
})

async function handleCheckout() {
  if (!localStorage.getItem('token')) {
    navigateTo('/auth/login')
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const items = cartStore.items.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }))
    
    await $fetch('/api/orders', {
      method: 'POST',
      body: {
        items,
        address: form.address,
        city: form.city,
        phone: form.phone,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    
    cartStore.clearCart()
    alert('Order placed successfully!')
    navigateTo('/orders')
  } catch (err) {
    error.value = err?.data?.statusMessage || 'Checkout failed'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Checkout - Figo Store',
})
</script>

<style scoped>
.checkout-page {
  padding: 2rem 0;
}

h1 {
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem;
}

.btn-continue {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #e5e7eb;
  color: #374151;
  border-radius: 0.375rem;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.checkout-form {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
}

.checkout-form h2 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.btn-submit {
  width: 100%;
  padding: 0.875rem;
  background: #2563eb;
  color: white;
  border-radius: 0.375rem;
  font-weight: 600;
  margin-top: 1rem;
}

.btn-submit:disabled {
  background: #9ca3af;
}

.error {
  color: #ef4444;
  margin-top: 1rem;
}

.order-summary {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  height: fit-content;
}

.order-summary h2 {
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  font-weight: bold;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
}
</style>
