<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-headline font-extrabold text-primary tracking-tight">Orders</h2>
        <p class="text-stone-500 mt-1">Manage customer orders</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-container-lowest p-4 rounded-xl">
      <div class="flex gap-4 w-full md:w-auto">
        <select v-model="statusFilter" class="px-4 py-2.5 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary">
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
      <div class="text-sm text-stone-500">
        {{ filteredOrders.length }} orders
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-surface-container-lowest rounded-xl editorial-shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-surface-container-low text-stone-500 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th class="px-6 py-4">Order ID</th>
              <th class="px-6 py-4">Customer</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4">Items</th>
              <th class="px-6 py-4">Total</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-50 text-sm">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-surface-container-low/50 transition-colors">
              <td class="px-6 py-4 font-bold text-primary">#ORD-{{ order.id }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
                    <span class="material-symbols-outlined text-sm">person</span>
                  </div>
                  <div>
                    <p class="font-medium">{{ order.user?.name || 'Guest' }}</p>
                    <p class="text-xs text-stone-500">{{ order.user?.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-stone-500">{{ formatDate(order.createdAt) }}</td>
              <td class="px-6 py-4">{{ order.items?.length || 0 }} items</td>
              <td class="px-6 py-4 font-bold">${{ order.total?.toFixed(2) }}</td>
              <td class="px-6 py-4 text-center">
                <select 
                  v-model="order.status"
                  @change="updateStatus(order.id, order.status)"
                  class="text-xs font-bold px-3 py-1.5 rounded-full border-0 cursor-pointer"
                  :class="getStatusClass(order.status)"
                >
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="p-2 text-primary hover:text-primary-container transition-colors">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredOrders.length === 0" class="text-center py-16 bg-surface-container-lowest rounded-xl">
      <span class="material-symbols-outlined text-6xl text-outline mb-4">shopping_cart</span>
      <p class="text-on-surface-variant">No orders found</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['admin']
})

const statusFilter = ref('')

const { data: orders, refresh } = await useFetch('/api/admin/orders', {
  headers: {
    Authorization: `Bearer ${process.client ? localStorage.getItem('token') : ''}`
  }
})

const filteredOrders = computed(() => {
  let result = orders.value || []
  
  if (statusFilter.value) {
    result = result.filter(o => o.status === statusFilter.value)
  }
  
  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function getStatusClass(status) {
  const classes = {
    'PENDING': 'bg-secondary-container/20 text-on-secondary-container',
    'PROCESSING': 'bg-blue-100 text-blue-700',
    'SHIPPED': 'bg-primary-fixed/40 text-primary',
    'DELIVERED': 'bg-primary-fixed/40 text-primary',
    'CANCELLED': 'bg-error-container text-on-error-container'
  }
  return classes[status] || 'bg-stone-100 text-stone-700'
}

async function updateStatus(orderId, status) {
  try {
    await $fetch(`/api/admin/orders/${orderId}`, {
      method: 'PUT',
      body: { status },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  } catch (err) {
    alert('Failed to update status')
    refresh()
  }
}

useHead({
  title: 'Orders | Admin Panel'
})
</script>
