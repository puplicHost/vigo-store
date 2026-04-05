import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'

const orderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
  price: z.number(),
})

const createOrderSchema = z.object({
  items: z.array(orderItemSchema),
  address: z.string().min(5),
  city: z.string().min(2),
  phone: z.string().min(5),
})

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)
  
  const result = createOrderSchema.safeParse(body)
  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input data' })
  }

  const { items, address, city, phone } = result.data
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const order = await prisma.order.create({
    data: {
      userId: user.userId,
      total,
      address,
      city,
      phone,
      status: 'PENDING',
      items: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: { include: { product: true } },
    },
  })

  return order
})
