<template>
  <div class="orders-page">
    <div class="container">
      <h1>My Orders</h1>
      
      <div v-if="pending" class="loading">Loading orders...</div>
      <div v-else-if="error" class="error">Failed to load orders</div>
      <div v-else-if="orders.length === 0" class="empty">
        <p>You haven't placed any orders yet</p>
        <NuxtLink to="/products" class="btn-shop">Start Shopping</NuxtLink>
      </div>
      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-header">
            <div>
              <p class="order-id">Order #{{ order.id }}</p>
              <p class="order-date">{{ formatDate(order.createdAt) }}</p>
            </div>
            <span :class="`status-badge status-${order.status.toLowerCase()}`">
              {{ order.status }}
            </span>
          </div>
          
          <div class="order-items">
            <div v-for="item in order.items" :key="item.id" class="order-item">
              <span>{{ item.product?.name }} × {{ item.quantity }}</span>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="order-footer">
            <span>Total</span>
            <span class="order-total">${{ order.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const token = ref('')

const { data: orders, pending, error } = useFetch('/api/orders/my-orders', {
  headers: {
    Authorization: computed(() => `Bearer ${token.value}`),
  },
  watch: [token],
  immediate: false
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(() => {
  token.value = localStorage.getItem('token') || ''
  if (!token.value) {
    navigateTo('/auth/login')
  }
})

useHead({
  title: 'My Orders - Figo Store',
})
</script>

<style scoped>
.orders-page {
  padding: 2rem 0;
}

h1 {
  margin-bottom: 2rem;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 3rem;
}

.empty p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.btn-shop {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  border-radius: 0.375rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.order-id {
  font-weight: 600;
}

.order-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-processing {
  background: #dbeafe;
  color: #1e40af;
}

.status-shipped {
  background: #e0e7ff;
  color: #3730a3;
}

.status-delivered {
  background: #d1fae5;
  color: #065f46;
}

.status-cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  color: #4b5563;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.125rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.order-total {
  color: #2563eb;
}
</style>
