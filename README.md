# Figo Store - Nuxt 3 E-commerce

A full-featured e-commerce application built with Nuxt 3, Prisma, and Pinia.

## Features

- **Storefront**: Browse products, view details, add to cart, checkout
- **User Authentication**: Register, login, JWT-based auth
- **Cart System**: Persistent cart with Pinia + localStorage
- **Order Management**: Track orders, view order history
- **Admin Dashboard**: Manage products, orders, view statistics
- **Responsive Design**: Mobile-friendly UI

## Tech Stack

- **Framework**: Nuxt 3
- **Database**: SQLite with Prisma ORM
- **State Management**: Pinia
- **Authentication**: JWT with bcrypt
- **Styling**: CSS with custom properties
- **Validation**: Zod

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

### 3. Database Setup

```bash
# Run migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate

# Seed the database with sample data
npm run db:seed
```

This creates:
- Admin user: `admin@figo.com` / `admin123`
- Sample categories and products

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
├── app/pages/           # Nuxt pages
├── components/          # Vue components
├── layouts/             # Nuxt layouts
├── stores/              # Pinia stores
├── server/api/          # API routes
├── server/middleware/   # Server middleware
├── server/utils/        # Server utilities
└── prisma/              # Database schema and seed
```

## Default Credentials

- **Admin**: admin@figo.com / admin123

## Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma client
npm run db:seed      # Seed database
