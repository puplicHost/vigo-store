// Example: server/api/products.get.ts
import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const products = await prisma.product.findMany({
    include: { category: true }
  })
  return products
})
