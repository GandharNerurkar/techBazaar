# TechBazaar

TechBazaar is a full-stack e-commerce storefront built with Next.js, Prisma, PostgreSQL, Tailwind CSS, and Flowbite. It includes customer-facing shopping flows, JWT-based authentication, wishlist and cart management, checkout with saved addresses, product reviews, and an admin dashboard for managing categories and products.

## Features

- Browse featured, best-seller, and discounted products from the home page
- Explore products by category
- Sign up and log in with hashed passwords
- Maintain a cart and wishlist
- Add delivery addresses and place orders
- Leave ratings and reviews on products
- Admin-only category and product management
- Cloudinary image upload support for categories and products

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Flowbite / Flowbite React
- Framer Motion
- JWT authentication
- Cloudinary

## Project Structure

```text
.
|-- prisma/                 # Prisma schema and migrations
|-- public/                 # Static assets
|-- src/
|   |-- components/         # UI building blocks
|   |-- context/            # App, user, cart, and wishlist state
|   |-- helpers/            # Auth, DB, Cloudinary, and utility helpers
|   |-- pages/              # Pages and API routes
|   `-- styles/             # Global and shared styles
|-- package.json
`-- README.md
```

## Environment Variables

Create a `.env` file in the project root with these values:

```env
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/TechBazaar_DB
JWT_SECRET=your-long-random-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up PostgreSQL

Create a PostgreSQL database, then update `DATABASE_URL` in `.env`.

### 3. Run Prisma migrations

```bash
npx prisma migrate dev
```

This will create the database tables defined in `prisma/schema.prisma`.

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` generates the Prisma client and builds the Next.js app
- `npm run start` starts the production server
- `npm run lint` runs ESLint

## Authentication And Roles

- New users are created through the signup flow and default to the `USER` role.
- Admin routes such as `/admin`, `/admin/add-product`, and `/admin/category/add-category` require a logged-in user with the `ADMIN` role in the database.
- To create an admin account for local development, sign up normally and then update that user's `role` field in PostgreSQL to `ADMIN`.

## Core App Routes

### Storefront

- `/` home page
- `/login` login page
- `/signup` registration page
- `/cart` shopping cart
- `/wishlist` wishlist
- `/checkout` checkout flow
- `/:category` category listing
- `/:category/:product` product details

### Admin

- `/admin` admin dashboard
- `/admin/add-product` add a new product
- `/admin/category/add-category` add a new category
- `/admin/category/[name]` manage a category

## API Routes

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Catalog

- `POST /api/category`
- `PUT /api/category`
- `DELETE /api/category?id=...`
- `POST /api/product`
- `GET /api/product/name/[name]`
- `PATCH /api/product/[productid]`
- `DELETE /api/product/[productid]`
- `GET /api/product/[productid]/review`
- `POST /api/product/[productid]/review`

### User Data

- `GET/POST /api/cart`
- `DELETE /api/cart/[cartitem]`
- `GET/POST /api/wishlist`
- `DELETE /api/wishlist/[wishlistitem]`
- `GET/POST/PUT/DELETE /api/user/address`
- `POST /api/order`

## Notes

- Product and category image uploads use Cloudinary.
- The current admin forms only accept PNG image uploads.
- Prisma client generation runs automatically on `npm install` through `postinstall`.
- There is no dedicated test suite configured in this repository yet.

## Production Build

```bash
npm run build
npm run start
```

## Future Improvements

- Add seed data for categories, products, and an initial admin user
- Add automated tests for API routes and critical user flows
- Replace custom JWT auth with a more centralized auth/session strategy
- Add payment gateway integration for checkout
