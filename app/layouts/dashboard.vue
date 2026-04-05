<template>
  <div>
    <nav class="dashboard-nav">
      <div class="container">
        <NuxtLink to="/" class="logo">Figo Admin</NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/dashboard">Dashboard</NuxtLink>
          <NuxtLink to="/dashboard/products">Products</NuxtLink>
          <NuxtLink to="/dashboard/orders">Orders</NuxtLink>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
    <main class="dashboard-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
const user = useState('user')

onMounted(() => {
  if (!user.value || user.value.role !== 'ADMIN') {
    navigateTo('/')
  }
})

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  user.value = null
  navigateTo('/')
}
</script>

<style scoped>
.dashboard-nav {
  background: #1f2937;
  color: white;
  padding: 1rem 0;
}

.dashboard-nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  color: #d1d5db;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: white;
}

.logout-btn {
  color: #ef4444;
}

.dashboard-content {
  padding: 2rem 0;
  min-height: calc(100vh - 60px);
  background: #f3f4f6;
}
</style>
