import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '~~/server/utils/prisma'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const result = registerSchema.safeParse(body)
  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input data' })
  }

  const { email, password, name } = result.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'CUSTOMER',
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  })

  const config = useRuntimeConfig()
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '7d' }
  )

  return { user, token }
})
