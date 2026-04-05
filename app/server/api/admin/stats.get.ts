import { prisma } from '~/server/utils/prisma'
import { requireAdmin } from '../../utils/adminOnly'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const [productsCount, ordersCount, usersCount, revenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'CANCELLED' } },
    }),
  ])

  return {
    products: productsCount,
    orders: ordersCount,
    users: usersCount,
    revenue: revenue._sum.total || 0,
  }
})
