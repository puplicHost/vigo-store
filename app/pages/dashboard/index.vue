<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="dashboard-page container">
        <h1>Dashboard</h1>
        
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Products</h3>
            <p class="stat-value">{{ stats?.products || 0 }}</p>
          </div>
          <div class="stat-card">
            <h3>Total Orders</h3>
            <p class="stat-value">{{ stats?.orders || 0 }}</p>
          </div>
          <div class="stat-card">
            <h3>Total Users</h3>
            <p class="stat-value">{{ stats?.users || 0 }}</p>
          </div>
          <div class="stat-card">
            <h3>Revenue</h3>
            <p class="stat-value">${{ stats?.revenue?.toFixed(2) || '0.00' }}</p>
          </div>
        </div>

        <div class="quick-actions">
          <h2>Quick Actions</h2>
          <div class="actions-grid">
            <NuxtLink to="/dashboard/products/add" class="action-card">
              <span class="icon">+</span>
              <span>Add Product</span>
            </NuxtLink>
            <NuxtLink to="/dashboard/orders" class="action-card">
              <span class="icon">📦</span>
              <span>View Orders</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const { data: stats } = await useFetch('/api/admin/stats', {
  headers: {
    Authorization: `Bearer ${process.client ? localStorage.getItem('token') : ''}`,
  },
})

useHead({
  title: 'Dashboard - Figo Admin',
})

definePageMeta({
  layout: 'dashboard',
})
</script>

<style scoped>
.dashboard-page {
  padding: 1rem 0;
}

h1 {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.stat-card h3 {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
}

.quick-actions {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.quick-actions h2 {
  margin-bottom: 1rem;
}

.actions-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: #2563eb;
  color: white;
  border-radius: 0.375rem;
  transition: background 0.2s;
}

.action-card:hover {
  background: #1d4ed8;
}

.icon {
  font-size: 1.25rem;
}
</style>
