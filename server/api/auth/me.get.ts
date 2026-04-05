import jwt from 'jsonwebtoken'
import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const token = authHeader.substring(7)
  
  try {
    const config = useRuntimeConfig()
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: number }
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true }
    })
    
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'User not found' })
    }
    
    return { user }
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})
