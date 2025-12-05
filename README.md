# Al Barakah Mart

Premium organic grocery e-commerce platform built with Next.js 16, Prisma, and NextAuth.

## Features

- 🛒 Full e-commerce functionality (cart, checkout, orders)
- 👤 User authentication with NextAuth v4
- 🔐 Admin dashboard for product management
- 📱 Responsive design with mobile support
- 💬 WhatsApp live chat integration
- 🔍 SEO-friendly URLs
- 🖼️ Image optimization with Next.js Image
- 📦 Product categories and filtering

## Tech Stack

- **Framework**: Next.js 16.0.7
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: NextAuth v4
- **Styling**: Tailwind CSS
- **UI Components**: Custom components
- **Image Upload**: Cloudinary (optional)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd al-barakah-mart
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-min-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed-bengali-products.ts
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Default Credentials

After seeding the database:

- **Admin**: admin@albarakah.com / admin123
- **User**: user@albarakah.com / user123

## Project Structure

```
al-barakah-mart/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   ├── product/           # Product pages
│   └── ...
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/                # Database schema and seeds
├── public/                # Static assets
└── pages/                 # Pages Router (NextAuth)
```

## License

MIT

## Support

For support, contact via WhatsApp: 01609132361
