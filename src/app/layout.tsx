import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from './components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Sinners Anonymous - Digital Confessional | Anonymous Sin Confession',
  description: 'Confess your sins anonymously in our digital confessional. Pay what your guilt is worth and find spiritual relief. Safe, private, and judgment-free.',
  keywords: [
    'anonymous confession',
    'digital confessional', 
    'sin confession',
    'guilt relief',
    'anonymous therapy',
    'spiritual confession',
    'private confession',
    'online confessional',
    'anonymous secrets',
    'guilt counseling'
  ],
  authors: [{ name: 'Sinners Anonymous' }],
  creator: 'Sinners Anonymous',
  publisher: 'Sinners Anonymous',
  openGraph: {
    title: 'Sinners Anonymous - Digital Confessional',
    description: 'Confess your sins anonymously and find spiritual relief. Pay what your guilt is worth.',
    url: 'https://www.sinnersanonymous.space',
    siteName: 'Sinners Anonymous',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sinners Anonymous - Digital Confessional',
    description: 'Confess your sins anonymously and find spiritual relief',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'spirituality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.sinnersanonymous.space" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
