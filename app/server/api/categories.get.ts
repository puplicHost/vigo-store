import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  })

  return categories
})
