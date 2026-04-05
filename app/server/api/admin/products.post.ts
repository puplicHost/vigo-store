import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  categoryId: z.number().int(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const result = productSchema.safeParse(body)
  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input data' })
  }

  const product = await prisma.product.create({
    data: result.data,
    include: { category: true },
  })

  return product
})
