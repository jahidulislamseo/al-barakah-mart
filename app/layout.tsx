import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/providers'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Al Barakah Mart | Premium Organic Grocery",
  description: "Your one-stop shop for fresh organic fruits, vegetables, meat, and daily essentials. Fast delivery across Dhaka.",
  openGraph: {
    title: "Al Barakah Mart | Premium Organic Grocery",
    description: "Fresh organic groceries delivered to your doorstep.",
    type: "website",
    locale: "en_US",
    siteName: "Al Barakah Mart"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  )
}
