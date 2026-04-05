import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@figo.com' },
    update: {},
    create: {
      email: 'admin@figo.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })
  console.log('Admin user created:', admin.email)

  // Create categories
  const categories = [
    { name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and devices' },
    { name: 'Clothing', slug: 'clothing', description: 'Fashion for everyone' },
    { name: 'Home & Garden', slug: 'home-garden', description: 'Everything for your home' },
    { name: 'Sports', slug: 'sports', description: 'Sports equipment and gear' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('Categories created')

  // Create sample products
  const electronics = await prisma.category.findUnique({ where: { slug: 'electronics' } })
  const clothing = await prisma.category.findUnique({ where: { slug: 'clothing' } })

  if (electronics) {
    const products = [
      {
        name: 'Wireless Headphones',
        slug: 'wireless-headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        stock: 50,
        categoryId: electronics.id,
      },
      {
        name: 'Smart Watch',
        slug: 'smart-watch',
        description: 'Fitness tracker and smartwatch with heart rate monitor',
        price: 199.99,
        stock: 30,
        categoryId: electronics.id,
      },
      {
        name: 'Bluetooth Speaker',
        slug: 'bluetooth-speaker',
        description: 'Portable bluetooth speaker with 360 sound',
        price: 49.99,
        stock: 100,
        categoryId: electronics.id,
      },
    ]

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      })
    }
    console.log('Electronics products created')
  }

  if (clothing) {
    const products = [
      {
        name: 'Cotton T-Shirt',
        slug: 'cotton-t-shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 19.99,
        stock: 200,
        categoryId: clothing.id,
      },
      {
        name: 'Denim Jeans',
        slug: 'denim-jeans',
        description: 'Classic fit denim jeans',
        price: 59.99,
        stock: 80,
        categoryId: clothing.id,
      },
    ]

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      })
    }
    console.log('Clothing products created')
  }

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
