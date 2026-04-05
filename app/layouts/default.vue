<template>
  <div class="min-h-screen bg-background font-body text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
    <!-- Navigation -->
    <nav class="glass-nav fixed top-0 w-full z-50 shadow-sm">
      <div class="flex justify-between items-center px-8 h-20 max-w-screen-2xl mx-auto font-headline tracking-tight">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <span class="text-xl font-bold tracking-tighter text-primary">The Curated Tactile</span>
        </NuxtLink>

        <!-- Desktop Links -->
        <div class="hidden md:flex gap-10 items-center">
          <NuxtLink to="/" class="text-on-surface-variant hover:text-primary transition-all duration-300" :class="{ 'text-primary border-b-2 border-primary pb-1': $route.path === '/' }">
            Shop
          </NuxtLink>
          <NuxtLink to="/products" class="text-on-surface-variant hover:text-primary transition-all duration-300" :class="{ 'text-primary border-b-2 border-primary pb-1': $route.path.startsWith('/products') }">
            Collection
          </NuxtLink>
          <NuxtLink to="/orders" class="text-on-surface-variant hover:text-primary transition-all duration-300" :class="{ 'text-primary border-b-2 border-primary pb-1': $route.path === '/orders' }">
            Orders
          </NuxtLink>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-6">
          <!-- Cart -->
          <NuxtLink to="/cart" class="relative transition-all duration-300 hover:opacity-80 text-primary">
            <span class="material-symbols-outlined text-2xl">shopping_bag</span>
            <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {{ cartCount }}
            </span>
          </NuxtLink>

          <!-- Auth -->
          <template v-if="!user">
            <NuxtLink to="/auth/login" class="hidden md:block bg-primary text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90 active:scale-95">
              Sign In
            </NuxtLink>
          </template>
          <template v-else>
            <div class="flex items-center gap-4">
              <NuxtLink v-if="user.role === 'ADMIN'" to="/dashboard" class="hidden md:block text-primary font-medium">
                Dashboard
              </NuxtLink>
              <button @click="logout" class="text-on-surface-variant hover:text-error transition-colors">
                <span class="material-symbols-outlined">logout</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-20">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-surface-container-high w-full py-12 px-8 mt-16">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 font-headline text-sm">
        <!-- Brand -->
        <div class="space-y-4">
          <span class="text-lg font-bold text-primary">The Curated Tactile</span>
          <p class="text-on-surface-variant max-w-xs leading-relaxed">
            Defining digital luxury through curated objects and editorial experiences. Made for the intentional home.
          </p>
        </div>

        <!-- Links -->
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-3">
            <h4 class="font-bold text-primary uppercase tracking-wider text-xs">Customer Care</h4>
            <NuxtLink to="#" class="block text-on-surface-variant hover:text-primary transition-colors">Shipping</NuxtLink>
            <NuxtLink to="#" class="block text-on-surface-variant hover:text-primary transition-colors">Contact Us</NuxtLink>
            <NuxtLink to="#" class="block text-on-surface-variant hover:text-primary transition-colors">Returns</NuxtLink>
          </div>
          <div class="space-y-3">
            <h4 class="font-bold text-primary uppercase tracking-wider text-xs">Explore</h4>
            <NuxtLink to="#" class="block text-on-surface-variant hover:text-primary transition-colors">Sustainability</NuxtLink>
            <NuxtLink to="#" class="block text-on-surface-variant hover:text-primary transition-colors">Store Locator</NuxtLink>
            <NuxtLink to="#" class="block text-on-surface-variant hover:text-primary transition-colors">Editorial</NuxtLink>
          </div>
        </div>

        <!-- Copyright & Social -->
        <div class="space-y-6 md:text-right">
          <p class="text-on-surface-variant">© 2024 The Curated Tactile. All rights reserved.</p>
          <div class="flex md:justify-end gap-6 text-primary">
            <a href="#" class="hover:opacity-70 transition-opacity">
              <span class="material-symbols-outlined">camera</span>
            </a>
            <a href="#" class="hover:opacity-70 transition-opacity">
              <span class="material-symbols-outlined">share</span>
            </a>
            <a href="#" class="hover:opacity-70 transition-opacity">
              <span class="material-symbols-outlined">mail</span>
            </a>
          </div>
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
  localStorage.removeItem('token')
  navigateTo('/')
}
</script>

<style>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
