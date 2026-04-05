<template>
  <div class="min-h-screen bg-background">
    <main class="min-h-screen flex flex-col items-center justify-center pt-20 px-6">
      <div class="max-w-2xl w-full text-center space-y-12 py-16">
        <!-- Animated Checkmark -->
        <div class="relative flex justify-center">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-48 h-48 rounded-full border border-primary/10 animate-pulse"></div>
          </div>
          <div class="relative bg-surface-container-lowest p-8 rounded-full shadow-lg shadow-primary/5">
            <svg class="w-20 h-20 text-primary-container" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-6">
          <h1 class="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-primary leading-tight">
            Order Confirmed
          </h1>
          <div class="flex flex-col items-center gap-2">
            <p class="text-stone-400 font-label tracking-widest text-xs uppercase">Order Reference</p>
            <span class="font-headline text-xl font-medium text-on-surface">#{{ orderId }}</span>
          </div>
          <p class="text-on-surface-variant text-lg max-w-md mx-auto leading-relaxed">
            Your order is being prepared with the utmost care in our workshop. A confirmation email with tracking details has been dispatched to your inbox.
          </p>
        </div>

        <!-- Action -->
        <div class="pt-4">
          <NuxtLink 
            to="/"
            class="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-semibold rounded-lg shadow-xl shadow-primary/10 transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <span>Continue Shopping</span>
            <span class="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Order Details Card -->
      <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div class="md:col-span-2 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between">
          <div>
            <h3 class="font-headline text-2xl font-bold text-primary mb-6">Delivery Details</h3>
            <div class="grid grid-cols-2 gap-8">
              <div>
                <p class="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Shipping To</p>
                <p class="font-medium text-on-surface">
                  {{ orderDetails?.address || 'Your Address' }}
                </p>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Method</p>
                <p class="font-medium text-on-surface">Express Courier (Carbon Neutral)</p>
              </div>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-outline-variant/15 flex items-center gap-4">
            <span class="material-symbols-outlined text-primary">eco</span>
            <p class="text-sm text-on-surface-variant italic">This shipment is 100% plastic-free and carbon offset.</p>
          </div>
        </div>

        <div class="bg-primary text-on-primary rounded-xl p-8 flex flex-col justify-center items-center text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mb-2">
            <span class="material-symbols-outlined text-on-primary-container text-3xl">card_membership</span>
          </div>
          <h4 class="font-headline text-xl font-bold">The Tactile Circle</h4>
          <p class="text-sm text-primary-fixed/80">Thank you for your purchase. Join our circle for exclusive offers.</p>
          <NuxtLink to="/" class="text-xs font-bold uppercase tracking-widest hover:underline pt-2">
            Shop More
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const orderId = computed(() => route.query.orderId || '000000')
const orderDetails = ref(null)

useHead({
  title: 'Order Confirmed | The Curated Tactile'
})
</script>
