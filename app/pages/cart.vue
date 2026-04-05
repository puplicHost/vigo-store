<template>
  <div class="min-h-screen bg-background">
    <main class="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto">
      <!-- Cart Drawer Overlay -->
      <div class="fixed inset-0 z-50 flex justify-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" @click="$router.push('/')"></div>
        
        <!-- Sidebar Drawer -->
        <aside class="relative w-full max-w-md h-screen bg-surface-container-low shadow-2xl flex flex-col">
          <!-- Header -->
          <div class="p-8 flex justify-between items-center bg-surface-container-low">
            <h2 class="text-2xl font-headline font-bold tracking-tight text-primary">Your Cart</h2>
            <button @click="$router.push('/')" class="p-2 hover:bg-stone-200/50 rounded-full transition-colors">
              <span class="material-symbols-outlined text-stone-600">close</span>
            </button>
          </div>

          <!-- Free Shipping -->
          <div class="px-8 pb-4">
            <div class="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-primary text-xl">local_shipping</span>
              </div>
              <div>
                <p class="text-sm font-headline font-semibold text-primary">
                  {{ cartTotal >= 500 ? 'Complimentary Shipping Applied' : 'Free Shipping Over $500' }}
                </p>
                <p v-if="cartTotal < 500" class="text-xs text-stone-500">
                  Add ${{ (500 - cartTotal).toFixed(2) }} more for free shipping
                </p>
              </div>
            </div>
          </div>

          <!-- Cart Items -->
          <div class="flex-1 overflow-y-auto px-8 py-4 space-y-8">
            <div v-if="items.length === 0" class="text-center py-12">
              <span class="material-symbols-outlined text-6xl text-outline mb-4">shopping_bag</span>
              <p class="text-on-surface-variant">Your cart is empty</p>
              <NuxtLink to="/" class="inline-block mt-4 text-primary font-semibold hover:underline">
                Continue Shopping
              </NuxtLink>
            </div>

            <div v-for="item in items" :key="item.product.id" class="flex gap-6 group">
              <div class="w-24 h-32 bg-stone-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  :src="useProductImage(item.product)"
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div class="flex justify-between items-start">
                    <h3 class="font-headline font-bold text-stone-800 tracking-tight">{{ item.product.name }}</h3>
                    <button 
                      @click="removeItem(item.product.id)"
                      class="material-symbols-outlined text-stone-400 hover:text-error transition-colors text-xl"
                    >
                      delete
                    </button>
                  </div>
                  <p class="text-xs text-stone-500 mt-1 uppercase tracking-widest">{{ item.product.category?.name }}</p>
                </div>
                <div class="flex justify-between items-end">
                  <div class="flex items-center bg-white rounded-full p-1 shadow-sm">
                    <button 
                      @click="updateQuantity(item.product.id, item.quantity - 1)"
                      class="w-8 h-8 flex items-center justify-center hover:bg-stone-100 rounded-full transition-colors"
                    >
                      <span class="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span class="px-4 text-sm font-medium font-headline">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.product.id, item.quantity + 1)"
                      class="w-8 h-8 flex items-center justify-center hover:bg-stone-100 rounded-full transition-colors"
                    >
                      <span class="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                  <div class="font-headline font-bold text-primary">${{ (item.product.price * item.quantity).toFixed(2) }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer / Checkout -->
          <div v-if="items.length > 0" class="p-8 bg-white/50 backdrop-blur-md rounded-t-3xl border-t border-outline-variant/10">
            <div class="space-y-4 mb-8">
              <div class="flex justify-between items-center text-stone-500">
                <span class="font-headline text-sm">Subtotal</span>
                <span class="font-headline font-medium">${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center text-stone-500">
                <span class="font-headline text-sm">Shipping</span>
                <span class="font-headline font-medium uppercase text-[10px] tracking-widest text-primary">
                  {{ shipping > 0 ? '$' + shipping.toFixed(2) : 'Free' }}
                </span>
              </div>
              <div class="pt-4 flex justify-between items-center text-primary">
                <span class="font-headline font-bold text-lg">Total</span>
                <span class="font-headline font-extrabold text-2xl tracking-tighter">${{ total.toFixed(2) }}</span>
              </div>
            </div>
            <NuxtLink 
              to="/checkout"
              class="block w-full bg-primary-container text-white py-6 rounded-xl font-headline font-bold tracking-wide shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 text-center"
            >
              Proceed to Checkout
            </NuxtLink>
            <p class="text-center mt-6 text-xs text-stone-400 font-headline">
              Taxes and duties calculated at checkout
            </p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
const cartStore = useCartStore()

const items = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.totalPrice)

const shipping = computed(() => {
  if (cartTotal.value >= 500) return 0
  return 15
})

const total = computed(() => cartTotal.value + shipping.value)

function updateQuantity(productId, quantity) {
  if (quantity < 1) {
    cartStore.removeItem(productId)
  } else {
    cartStore.updateQuantity(productId, quantity)
  }
}

function removeItem(productId) {
  cartStore.removeItem(productId)
}

useHead({
  title: 'Your Cart | The Curated Tactile'
})
</script>
