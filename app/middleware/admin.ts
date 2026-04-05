export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useState('user')

  // Check if user is logged in
  if (!user.value) {
    return navigateTo('/auth/login')
  }

  // Check if user is admin
  if ((user.value as any).role !== 'ADMIN') {
    return navigateTo('/')
  }
})
