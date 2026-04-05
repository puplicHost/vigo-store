import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@figo.com' },
    update: {},
    create: {
      email: 'admin@figo.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  })
  
  console.log('Admin created:', admin.email)
}

createAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
