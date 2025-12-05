# Al Barakah Mart 🛒
> **Premium Organic Grocery Store** - [Live Demo](https://al-barakah-mart.vercel.app/)

Al Barakah Mart is a full-featured e-commerce platform built with Next.js 16, designed for the Bangladeshi market with bilingual support (English/Bengali).

![Al Barakah Mart Banner](/public/images/banner_placeholder.png)

## 🚀 Key Features

- **Storefront**:
    - 🛍️ Browse products by category (Fruits, Vegetables, Meat, etc.)
    - 🔍 Real-time search functionality
    - 🌐 **Bilingual System**: Switch between English and Bengali instantly
    - 📱 Fully responsive mobile-first design

- **User Experience**:
    - 🛒 Dynamic Shopping Cart
    - ❤️ Wishlist functionality
    - 📦 **Order Tracking**: Visual timeline for order status
    - 👤 User Dashboard for order history and profile management

- **Checkout & Payment**:
    - 💳 **Manual Payment Integration**: Support for **bKash**, **Nagad**, and COD
    - 📝 Detailed payment instructions
    - 🚚 Delivery address management

- **Admin Power**:
    - 📊 Comprehensive Admin Dashboard
    - 📦 Product management (Add/Edit/Delete)
    - 👥 User management
    - 📝 Order status updates (Pending -> Delivered)

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Auth**: NextAuth.js v4
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hosting**: Vercel

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Database URL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jahidulislamseo/al-barakah-mart.git
   cd al-barakah-mart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *Note: Uses `legacy-peer-deps` automatically via `.npmrc`*

3. **Set up environment variables:**
   Create `.env` file:
   ```env
   DATABASE_URL="mongodb+srv://..."
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
   CLOUDINARY_API_KEY="..."
   CLOUDINARY_API_SECRET="..."
   ```

4. **Initialize Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed-users.ts
   ```

5. **Run Locally:**
   ```bash
   npm run dev
   ```

## 📦 Deployment (Vercel)

This project is optimized for Vercel deployment.

1. **Push to GitHub.**
2. **Import in Vercel.**
3. **Environment Variables:** Add all variables from `.env`.
4. **Build Command:** The project uses a custom build script to ensure Prisma generation:
   ```json
   "build": "prisma generate && next build"
   ```
   *No extra configuration needed!*

## 📞 Contact & Support

For any inquiries or support:
- **Phone / WhatsApp**: [+880 1609132361](https://wa.me/8801609132361)
- **Email**: [opjahidulislam@gmail.com](mailto:opjahidulislam@gmail.com)

---
© 2025 Al Barakah Mart. All rights reserved.
