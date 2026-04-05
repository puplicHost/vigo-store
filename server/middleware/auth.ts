import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return
  }

  const token = authHeader.substring(7)
  
  try {
    const config = useRuntimeConfig()
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: number
      email: string
      role: string
    }
    
    event.context.user = decoded
  } catch (error) {
    // Invalid token, but don't throw error to allow public routes
  }
})
