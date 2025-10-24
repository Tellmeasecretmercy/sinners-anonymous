import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sinners Anonymous - Digital Confessional',
  description: 'Confess your sins anonymously. Pay what they\'re worth. Find absolution through digital confession.',
  keywords: 'anonymous confession, digital confessional, sin confession, guilt relief, anonymous therapy',
  openGraph: {
    title: 'Sinners Anonymous - Digital Confessional',
    description: 'Confess your sins anonymously and find absolution',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
