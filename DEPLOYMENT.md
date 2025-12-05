# Deployment Guide - Al Barakah Mart

## Prerequisites

1. GitHub account
2. Vercel account
3. PostgreSQL database (for production)

## Step 1: Prepare for Deployment

### Update Database for Production

1. Get a PostgreSQL database URL from:
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - [Supabase](https://supabase.com/)
   - [Railway](https://railway.app/)
   - [Neon](https://neon.tech/)

2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}
```

## Step 2: GitHub Setup

1. Initialize Git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub

3. Push to GitHub:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Step 3: Vercel Deployment

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

5. Add Environment Variables:
```
DATABASE_URL=your_postgresql_url
NEXTAUTH_SECRET=your_secret_key_min_32_characters
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name (optional)
CLOUDINARY_API_KEY=your_api_key (optional)
CLOUDINARY_API_SECRET=your_api_secret (optional)
```

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and add environment variables

## Step 4: Post-Deployment Setup

1. Run database migrations:
```bash
npx prisma migrate deploy
```

2. Seed the database (optional):
```bash
npx tsx prisma/seed-bengali-products.ts
```

3. Create admin user:
```bash
npx tsx prisma/create-simple-admin.ts
```

## Environment Variables Reference

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random string (min 32 characters)
- `NEXTAUTH_URL`: Your production URL

### Optional
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Troubleshooting

### Build Errors

If you get build errors:
1. Check all environment variables are set
2. Ensure PostgreSQL database is accessible
3. Run `npx prisma generate` locally and commit the generated files

### Database Connection Issues

1. Verify DATABASE_URL is correct
2. Check if database allows external connections
3. Ensure IP whitelist includes Vercel IPs

### NextAuth Issues

1. Verify NEXTAUTH_SECRET is set
2. Ensure NEXTAUTH_URL matches your domain
3. Check callback URLs in your auth provider

## Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update NEXTAUTH_URL environment variable

## Monitoring

- View logs in Vercel dashboard
- Set up error tracking (optional): Sentry, LogRocket
- Monitor performance with Vercel Analytics

## Support

For deployment issues, contact: 01609132361 (WhatsApp)
