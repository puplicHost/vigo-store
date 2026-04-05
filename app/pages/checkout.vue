<template>
  <div class="min-h-screen bg-background">
    <main class="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <!-- Progress Bar -->
      <div class="mb-16">
        <div class="flex items-center justify-between max-w-2xl mx-auto relative">
          <div class="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-highest -translate-y-1/2 z-0"></div>
          <div class="absolute top-1/2 left-0 w-1/2 h-0.5 bg-primary -translate-y-1/2 z-0"></div>
          
          <div class="relative z-10 flex flex-col items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">check</span>
            </div>
            <span class="text-xs font-headline font-bold uppercase tracking-widest text-primary">Cart</span>
          </div>
          
          <div class="relative z-10 flex flex-col items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold ring-4 ring-primary-fixed">
              2
            </div>
            <span class="text-xs font-headline font-bold uppercase tracking-widest text-primary">Info</span>
          </div>
          
          <div class="relative z-10 flex flex-col items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-surface-container-lowest text-outline border border-outline-variant flex items-center justify-center font-bold">
              3
            </div>
            <span class="text-xs font-headline font-bold uppercase tracking-widest text-outline">Payment</span>
          </div>
          
          <div class="relative z-10 flex flex-col items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-surface-container-lowest text-outline border border-outline-variant flex items-center justify-center font-bold">
              4
            </div>
            <span class="text-xs font-headline font-bold uppercase tracking-widest text-outline">Confirm</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <!-- Left Column: Checkout Forms -->
        <div class="lg:col-span-7 space-y-12">
          <!-- Contact Section -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-headline font-bold text-primary">Contact Information</h2>
              <span v-if="!user" class="text-sm text-stone-500">
                Already have an account? 
                <NuxtLink to="/auth/login" class="text-primary font-medium underline">Log in</NuxtLink>
              </span>
            </div>
            <div class="bg-surface-container-low p-8 rounded-xl space-y-4">
              <div class="space-y-1">
                <label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Email Address</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  class="w-full bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div class="flex items-center gap-3">
                <input v-model="form.newsletter" type="checkbox" class="rounded text-primary focus:ring-primary border-outline-variant" />
                <label class="text-sm text-on-surface-variant">Keep me updated on new arrivals and editorial stories.</label>
              </div>
            </div>
          </section>

          <!-- Shipping Address -->
          <section>
            <h2 class="text-2xl font-headline font-bold text-primary mb-6">Shipping Address</h2>
            <div class="bg-surface-container-low p-8 rounded-xl space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">First Name</label>
                  <input v-model="form.firstName" type="text" class="w-full bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container" />
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Last Name</label>
                  <input v-model="form.lastName" type="text" class="w-full bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container" />
                </div>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Address</label>
                <input v-model="form.address" type="text" placeholder="House number and street name" class="w-full bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container" />
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="space-y-1">
                  <label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">City</label>
                  <input v-model="form.city" type="text" class="w-full bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container" />
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">State</label>
                  <select v-model="form.state" class="w-full bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container">
                    <option value="">Select</option>
                    <option>New York</option>
                    <option>California</option>
                    <option>Texas</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Zip Code</label>
                  <input v-model="form.zipCode" type="text" class="w-full bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container" />
                </div>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Phone Number</label>
                <input v-model="form.phone" type="tel" placeholder="+1 (555) 000-0000" class="w-full bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container" />
              </div>
            </div>
          </section>

          <!-- Payment Method -->
          <section>
            <h2 class="text-2xl font-headline font-bold text-primary mb-6">Payment Method</h2>
            <div class="bg-surface-container-low p-8 rounded-xl border-2 border-primary-fixed-dim">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary">credit_card</span>
                  <span class="font-medium">Cash on Delivery</span>
                </div>
              </div>
              <p class="text-sm text-on-surface-variant">
                Pay when your order arrives. Our delivery partner will collect the payment at your door.
              </p>
            </div>
          </section>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-8">
            <NuxtLink to="/cart" class="flex items-center gap-2 text-primary font-medium group">
              <span class="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
              Return to Cart
            </NuxtLink>
            <button 
              @click="placeOrder"
              :disabled="submitting"
              class="bg-primary text-on-primary px-12 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
            >
              {{ submitting ? 'Processing...' : 'Complete Purchase' }}
            </button>
          </div>
        </div>

        <!-- Right Column: Order Summary -->
        <div class="lg:col-span-5">
          <div class="bg-surface-container rounded-2xl p-8 sticky top-32 shadow-sm border border-outline-variant/10">
            <h3 class="text-xl font-headline font-bold text-primary mb-8">Order Summary</h3>
            
            <!-- Items -->
            <div class="space-y-6 mb-8">
              <div v-for="item in cartItems" :key="item.product.id" class="flex gap-4">
                <div class="relative w-20 h-24 bg-surface-container-highest rounded-lg overflow-hidden flex-shrink-0">
                  <img :src="useProductImage(item.product)" class="w-full h-full object-cover" />
                  <span class="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{{ item.quantity }}</span>
                </div>
                <div class="flex-grow py-1">
                  <p class="font-bold text-on-surface">{{ item.product.name }}</p>
                  <p class="text-sm text-on-surface-variant">{{ item.product.category?.name }}</p>
                  <p class="text-sm font-bold text-primary mt-1">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <!-- Totals -->
            <div class="space-y-4 pt-8 border-t border-outline-variant/20">
              <div class="flex justify-between text-sm">
                <span class="text-on-surface-variant">Subtotal</span>
                <span class="font-medium text-on-surface">${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-on-surface-variant">Shipping</span>
                <span class="font-medium text-on-surface">{{ shipping > 0 ? '$' + shipping.toFixed(2) : 'Free' }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-on-surface-variant">Taxes</span>
                <span class="font-medium text-on-surface">${{ tax.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-end pt-4">
                <div>
                  <p class="text-xl font-headline font-extrabold text-primary">Total</p>
                  <p class="text-[10px] text-stone-400 uppercase tracking-widest">USD (Includes duties)</p>
                </div>
                <span class="text-3xl font-headline font-extrabold text-primary">${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Secure Badge -->
            <div class="mt-10 flex items-center justify-center gap-2 py-4 bg-surface-container-low rounded-xl text-stone-500">
              <span class="material-symbols-outlined text-sm">verified_user</span>
              <span class="text-xs font-bold uppercase tracking-widest">100% Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const user = useState('user')
const cartStore = useCartStore()
const router = useRouter()

const submitting = ref(false)

const form = ref({
  email: user.value?.email || '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  newsletter: false
})

const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.totalPrice)

const shipping = computed(() => {
  if (cartTotal.value >= 500) return 0
  return 15
})

const tax = computed(() => cartTotal.value * 0.08)
const total = computed(() => cartTotal.value + shipping.value + tax.value)

async function placeOrder() {
  // Validation
  if (cartItems.value.length === 0) {
    alert('Your cart is empty')
    return
  }

  if (!form.value.firstName || !form.value.lastName) {
    alert('Please enter your full name')
    return
  }

  if (!form.value.address || !form.value.city || !form.value.state || !form.value.zipCode) {
    alert('Please complete your shipping address')
    return
  }

  if (!form.value.phone || form.value.phone.length < 5) {
    alert('Please enter a valid phone number')
    return
  }

  submitting.value = true
  
  try {
    const orderData = {
      items: cartItems.value.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      })),
      address: `${form.value.address}, ${form.value.city}, ${form.value.state} ${form.value.zipCode}`,
      city: form.value.city,
      phone: form.value.phone
    }

    const response = await $fetch('/api/orders', {
      method: 'POST',
      body: orderData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    // Clear cart and redirect to success
    cartStore.clearCart()
    router.push(`/order-success?orderId=${response.id}`)
  } catch (err) {
    alert('Failed to place order. Please try again.')
    console.error(err)
  } finally {
    submitting.value = false
  }
}

useHead({
  title: 'Checkout | The Curated Tactile'
})
</script>
