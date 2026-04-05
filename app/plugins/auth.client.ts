export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useState('user', () => null)
  
  if (process.client) {
    const token = localStorage.getItem('token')
    if (token && !user.value) {
      try {
        const response = await $fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        user.value = response.user
      } catch {
        localStorage.removeItem('token')
      }
    }
  }
})
