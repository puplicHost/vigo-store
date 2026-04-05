export function requireAdmin(event: any) {
  const user = event.context.user
  
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  
  if (user.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access required' })
  }
  
  return user
}
