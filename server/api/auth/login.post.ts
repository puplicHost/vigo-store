import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '~~/server/utils/prisma'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const result = loginSchema.safeParse(body)
  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input data' })
  }

  const { email, password } = result.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const config = useRuntimeConfig()
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '7d' }
  )

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  }
})
