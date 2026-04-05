<template>
  <div class="app-wrapper">
    <nav class="navbar glass-card">
      <div class="container navbar-inner">
        <NuxtLink to="/" class="logo">
          <span class="logo-accent">Figo</span> Store
        </NuxtLink>
        
        <div class="nav-links">
          <NuxtLink to="/products" class="nav-item">Products</NuxtLink>
          
          <NuxtLink to="/cart" class="nav-item cart-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </NuxtLink>

          <div class="divider"></div>

          <template v-if="!user">
            <NuxtLink to="/auth/login" class="nav-item">Login</NuxtLink>
            <NuxtLink to="/auth/register" class="btn btn-primary btn-sm">Join</NuxtLink>
          </template>
          
          <template v-else>
            <NuxtLink v-if="user.role === 'admin'" to="/dashboard" class="nav-item admin-link">Dashboard</NuxtLink>
            <NuxtLink to="/orders" class="nav-item">Orders</NuxtLink>
            <button @click="logout" class="logout-btn nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </template>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-brand">
          <NuxtLink to="/" class="logo logo-sm">Figo Store</NuxtLink>
          <p>Curating fine goods for the modern enthusiast.</p>
        </div>
        <div class="footer-copyright">
          <p>&copy; 2024 Figo Store. Crafted with excellence.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const user = useState('user')
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  user.value = null
  navigateTo('/')
}
</script>

<style scoped>
.app-wrapper {
  background-color: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  margin: 1rem;
  padding: 0.75rem 0;
  position: sticky;
  top: 1rem;
  z-index: 1000;
  border-radius: 20px;
}

.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.logo-accent {
  color: var(--accent-primary);
}

.logo-sm {
  font-size: 1.25rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-item {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item:hover, .router-link-active {
  color: var(--text-primary);
}

.cart-link {
  position: relative;
  padding: 0.5rem;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--accent-primary);
  color: white;
  font-size: 0.7rem;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  border: 2px solid var(--bg-secondary);
}

.divider {
  width: 1px;
  height: 20px;
  background: var(--glass-border);
}

.admin-link {
  color: var(--accent-primary);
}

.btn-sm {
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
}

.logout-btn {
  color: var(--text-muted);
}

.logout-btn:hover {
  color: #ef4444;
}

.main-content {
  flex: 1;
  padding-top: 2rem;
}

.footer {
  margin-top: auto;
  border-top: 1px solid var(--glass-border);
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

.footer-brand p {
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.footer-copyright {
  color: var(--text-muted);
  font-size: 0.875rem;
}

@media (max-width: 640px) {
  .nav-links {
    gap: 1rem;
  }
  .divider,
  .nav-item:not(.cart-link) {
    display: none;
  }
}
</style>
