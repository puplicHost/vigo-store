<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-end">
      <div>
        <h2 class="text-3xl font-headline font-extrabold text-primary tracking-tight">Overview</h2>
        <p class="text-stone-500 mt-1">Real-time performance metrics and store status.</p>
      </div>
      <div class="flex gap-3">
        <button class="px-5 py-2.5 bg-surface-container-lowest text-primary border border-outline-variant/20 rounded-lg text-sm font-semibold hover:bg-surface-container-low transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined text-lg">download</span>
          Export Report
        </button>
        <button class="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold shadow-md hover:opacity-90 transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-lg">calendar_today</span>
          Last 30 Days
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Revenue -->
      <div class="bg-surface-container-lowest p-6 rounded-xl editorial-shadow-sm group hover:scale-[1.01] transition-transform">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg bg-primary-fixed/30 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span class="text-[12px] font-bold text-primary px-2 py-1 bg-on-primary-container/20 rounded-full flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">trending_up</span>
            +12.5%
          </span>
        </div>
        <p class="text-sm text-stone-500 font-medium">Total Revenue</p>
        <h3 class="text-2xl font-bold text-primary font-headline mt-1">${{ stats?.revenue?.toFixed(2) || '0.00' }}</h3>
      </div>

      <!-- Orders -->
      <div class="bg-surface-container-lowest p-6 rounded-xl editorial-shadow-sm group hover:scale-[1.01] transition-transform">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg bg-secondary-fixed/30 flex items-center justify-center text-secondary">
            <span class="material-symbols-outlined">shopping_bag</span>
          </div>
          <span class="text-[12px] font-bold text-primary px-2 py-1 bg-on-primary-container/20 rounded-full flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">trending_up</span>
            +8.2%
          </span>
        </div>
        <p class="text-sm text-stone-500 font-medium">Orders</p>
        <h3 class="text-2xl font-bold text-primary font-headline mt-1">{{ stats?.orders || 0 }}</h3>
      </div>

      <!-- Products -->
      <div class="bg-surface-container-lowest p-6 rounded-xl editorial-shadow-sm group hover:scale-[1.01] transition-transform">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg bg-tertiary-fixed/30 flex items-center justify-center text-tertiary">
            <span class="material-symbols-outlined">category</span>
          </div>
          <span class="text-[12px] font-bold text-secondary px-2 py-1 bg-secondary-fixed/30 rounded-full flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">trending_flat</span>
            0%
          </span>
        </div>
        <p class="text-sm text-stone-500 font-medium">Active Products</p>
        <h3 class="text-2xl font-bold text-primary font-headline mt-1">{{ stats?.products || 0 }}</h3>
      </div>

      <!-- Users -->
      <div class="bg-surface-container-lowest p-6 rounded-xl editorial-shadow-sm group hover:scale-[1.01] transition-transform">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg bg-on-primary-container/20 flex items-center justify-center text-primary-container">
            <span class="material-symbols-outlined">person</span>
          </div>
          <span class="text-[12px] font-bold text-primary px-2 py-1 bg-on-primary-container/20 rounded-full flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">trending_up</span>
            +24.1%
          </span>
        </div>
        <p class="text-sm text-stone-500 font-medium">Total Users</p>
        <h3 class="text-2xl font-bold text-primary font-headline mt-1">{{ stats?.users || 0 }}</h3>
      </div>
    </div>

    <!-- Recent Orders -->
    <section class="bg-surface-container-lowest rounded-xl editorial-shadow-sm overflow-hidden">
      <div class="p-6 border-b border-stone-100 flex justify-between items-center">
        <h3 class="text-xl font-headline font-bold text-primary">Recent Orders</h3>
        <NuxtLink to="/dashboard/orders" class="text-sm font-semibold text-primary-container hover:underline">View all orders</NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-surface-container-low text-stone-500 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th class="px-6 py-4">Order ID</th>
              <th class="px-6 py-4">Customer</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4">Amount</th>
              <th class="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-50 text-sm">
            <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-surface-container-low/50 transition-colors">
              <td class="px-6 py-4 font-bold text-primary">#ORD-{{ order.id }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
                    <span class="material-symbols-outlined text-sm">person</span>
                  </div>
                  <span>{{ order.user?.name || 'Guest' }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-stone-500">{{ formatDate(order.createdAt) }}</td>
              <td class="px-6 py-4 font-bold">${{ order.total.toFixed(2) }}</td>
              <td class="px-6 py-4 text-right">
                <span 
                  class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold"
                  :class="getStatusClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Inventory Alert -->
      <div class="lg:col-span-2 bg-primary-container rounded-xl p-8 text-on-primary-container relative overflow-hidden editorial-shadow-sm h-64 flex flex-col justify-center">
        <div class="z-10 relative">
          <h4 class="text-2xl font-headline font-bold mb-2">Inventory Alert</h4>
          <p class="max-w-md text-on-primary-container/80 mb-6">
            Monitor your product stock levels. Add more products to expand your catalog.
          </p>
          <NuxtLink to="/dashboard/products/add" class="px-6 py-2.5 bg-on-primary-container text-primary font-bold rounded-lg shadow-sm hover:bg-white transition-colors inline-block">
            Add New Product
          </NuxtLink>
        </div>
        <div class="absolute top-0 right-0 w-64 h-full bg-surface-tint/10 -rotate-12 translate-x-12 translate-y-8"></div>
      </div>

      <!-- Customer Sentiment -->
      <div class="bg-surface-container-highest rounded-xl p-8 editorial-shadow-sm flex flex-col justify-center border border-white/40">
        <h4 class="text-xl font-headline font-bold text-primary mb-4">Store Status</h4>
        <div class="space-y-4">
          <div class="flex justify-between items-center text-sm">
            <span class="text-stone-600">Active Products</span>
            <span class="font-bold text-primary">{{ stats?.products || 0 }}</span>
          </div>
          <div class="w-full bg-white rounded-full h-2">
            <div class="bg-primary h-2 rounded-full" :style="{ width: Math.min(100, (stats?.products || 0) / 10) + '%' }"></div>
          </div>
          <p class="text-xs text-stone-500 italic mt-4 leading-relaxed">
            "The tactile quality of the products exceeds expectations."
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['admin']
})

const { data: stats } = await useFetch('/api/admin/stats', {
  headers: {
    Authorization: `Bearer ${process.client ? localStorage.getItem('token') : ''}`
  }
})

const { data: ordersData } = await useFetch('/api/admin/orders', {
  headers: {
    Authorization: `Bearer ${process.client ? localStorage.getItem('token') : ''}`
  }
})

const recentOrders = computed(() => {
  return ordersData.value?.slice(0, 5) || []
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

useHead({
  title: 'Dashboard | Admin Panel'
})
</script>
