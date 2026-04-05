import { prisma } from '~~/server/utils/prisma'
import { requireAdmin } from '../../utils/adminOnly'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const orders = await prisma.order.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return orders
})
