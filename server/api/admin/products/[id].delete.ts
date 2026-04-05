import { prisma } from '~~/server/utils/prisma'
import { requireAdmin } from '../../../utils/adminOnly'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid product ID' })
  }

  await prisma.product.delete({ where: { id } })

  return { message: 'Product deleted successfully' }
})
