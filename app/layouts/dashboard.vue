<template>
  <div class="min-h-screen bg-[#F1EFE8]">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-screen w-[240px] bg-surface-container-low border-r border-stone-200/50 flex flex-col p-4 gap-2 font-headline font-medium z-50">
      <div class="mb-8 px-2 py-4">
        <h1 class="text-lg font-black text-primary">Admin Panel</h1>
        <p class="text-xs text-stone-500 font-normal">Manage Store</p>
      </div>
      
      <nav class="flex-1 space-y-1">
        <NuxtLink 
          to="/dashboard" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
          :class="$route.path === '/dashboard' ? 'bg-primary text-white shadow-md translate-x-1' : 'text-stone-600 hover:bg-stone-200/50'"
        >
          <span class="material-symbols-outlined text-[20px]">dashboard</span>
          <span>Dashboard</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/dashboard/products" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
          :class="$route.path.startsWith('/dashboard/products') ? 'bg-primary text-white shadow-md translate-x-1' : 'text-stone-600 hover:bg-stone-200/50'"
        >
          <span class="material-symbols-outlined text-[20px]" :class="$route.path.startsWith('/dashboard/products') ? '' : 'group-hover:text-primary'">inventory_2</span>
          <span>Products</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/dashboard/orders" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
          :class="$route.path === '/dashboard/orders' ? 'bg-primary text-white shadow-md translate-x-1' : 'text-stone-600 hover:bg-stone-200/50'"
        >
          <span class="material-symbols-outlined text-[20px]" :class="$route.path === '/dashboard/orders' ? '' : 'group-hover:text-primary'">shopping_cart</span>
          <span>Orders</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-stone-600 hover:bg-stone-200/50"
        >
          <span class="material-symbols-outlined text-[20px] group-hover:text-primary">store</span>
          <span>View Store</span>
        </NuxtLink>
      </nav>
      
      <div class="mt-auto pt-4 border-t border-stone-200/30">
        <NuxtLink 
          to="/dashboard/products/add"
          class="block w-full bg-primary text-white py-3 rounded-lg font-bold text-sm shadow-md hover:opacity-90 transition-all text-center mb-4"
        >
          + New Product
        </NuxtLink>
        <button 
          @click="logout"
          class="w-full text-stone-500 hover:text-primary flex items-center gap-3 px-4 py-3 transition-colors"
        >
          <span class="material-symbols-outlined text-[20px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-[240px] min-h-screen">
      <!-- Top Navigation -->
      <header class="h-20 px-8 flex justify-between items-center bg-surface/80 backdrop-blur-xl z-40 sticky top-0 editorial-shadow-sm">
        <div class="flex items-center gap-4">
          <nav class="flex text-sm text-stone-500 font-headline">
            <span>Admin</span>
            <span class="mx-2">/</span>
            <span class="text-primary font-semibold">{{ pageTitle }}</span>
          </nav>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3 pl-6 border-l border-stone-200">
            <div class="text-right">
              <p class="text-sm font-bold text-primary font-headline">{{ user?.name || 'Admin' }}</p>
              <p class="text-[10px] uppercase tracking-wider text-stone-500">Store Manager</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
              <span class="material-symbols-outlined w-full h-full flex items-center justify-center text-primary text-2xl">person</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const user = useState('user')
const route = useRoute()

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Dashboard'
  if (path.startsWith('/dashboard/products')) return 'Products'
  if (path === '/dashboard/orders') return 'Orders'
  return 'Admin'
})

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  user.value = null
  localStorage.removeItem('token')
  navigateTo('/auth/login')
}
</script>

<style>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
