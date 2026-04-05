import { defineStore } from 'pinia'

export interface CartItem {
  product: {
    id: number
    name: string
    price: number
    images?: string | string[]
    category?: { name: string }
  }
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  },
  
  actions: {
    addItem(product: any, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
      this.saveToLocalStorage()
    },
    
    removeItem(productId: number) {
      const index = this.items.findIndex(item => item.product.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToLocalStorage()
      }
    },
    
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
          this.saveToLocalStorage()
        }
      }
    },
    
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },
    
    loadFromLocalStorage() {
      if (import.meta.client) {
        const saved = localStorage.getItem('cart')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (e) {
            this.items = []
          }
        }
      }
    },
    
    saveToLocalStorage() {
      if (import.meta.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },
  },
})
