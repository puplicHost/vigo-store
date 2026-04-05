import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { requireAdmin } from '../../../utils/adminOnly'

const updateSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  categoryId: z.number().int(),
})

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid product ID' })
  }

  const body = await readBody(event)
  const result = updateSchema.safeParse(body)
  
  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input data' })
  }

  const product = await prisma.product.update({
    where: { id },
    data: result.data,
    include: { category: true },
  })

  return product
})
