import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 12
  const skip = (page - 1) * limit
  
  const where: any = {}
  
  if (query.category) {
    where.category = { slug: query.category as string }
  }
  
  if (query.search) {
    where.OR = [
      { name: { contains: query.search as string } },
      { description: { contains: query.search as string } },
    ]
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ])

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
})
