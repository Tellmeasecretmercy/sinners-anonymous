import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from './components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Sinners Anonymous — The Digital Confession Booth',
  description:
    'Bless me, Father. For I have sinned. An anonymous digital confession booth for the whole world. Say what you cannot say anywhere else. Pay what your peace is worth.',

  keywords: [
    // Confession booth — global Catholic/Christian
    'confession booth',
    'digital confession booth',
    'online confession',
    'anonymous confession',
    'bless me father',
    'confess your sins',
    'catholic confession online',
    'digital confessional',

    // Guilt & relief — universal
    'guilt relief',
    'anonymous secrets',
    'confess anonymously',
    'spiritual relief',
    'pay for absolution',
    'anonymous therapy',
    'emotional release',
    'unburden yourself',

    // Global reach keywords
    'online confessional',
    'sin confession',
    'private confession',
    'anonymous sin',
    'spiritual confession',
    'confess online',
    'tell your secret',
    'anonymous guilt',

    // Long tail
    'place to confess sins anonymously',
    'digital place to confess',
    'confess without judgment',
    'anonymous place to share secrets',
    'pay what your guilt is worth',
  ],

  authors: [{ name: 'Sinners Anonymous' }],
  creator: 'Sinners Anonymous',
  publisher: 'Sinners Anonymous',

  // ── Open Graph ──────────────────────────────────────────────
  openGraph: {
    title: 'Sinners Anonymous — The Digital Confession Booth',
    description:
      'Bless me, Father. For I have sinned. Anonymous. Private. Pay what your peace is worth.',
    url: 'https://www.sinnersanonymous.space',
    siteName: 'Sinners Anonymous',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.sinnersanonymous.space/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sinners Anonymous — The Digital Confession Booth',
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Sinners Anonymous — The Digital Confession Booth',
    description:
      'Bless me, Father. For I have sinned. Anonymous confessions. Pay what your peace is worth. 🕯️',
    images: ['https://www.sinnersanonymous.space/og-image.png'],
    creator: '@sinnersanon',
  },

  // ── Robots ───────────────────────────────────────────────────
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

  // ── Alternate languages (future-proofing for global) ─────────
  alternates: {
    canonical: 'https://www.sinnersanonymous.space',
    languages: {
      'en-US': 'https://www.sinnersanonymous.space',
      'es':    'https://www.sinnersanonymous.space/es', // Spanish — huge Catholic market
      'pt':    'https://www.sinnersanonymous.space/pt', // Portuguese — Brazil
      'tl':    'https://www.sinnersanonymous.space/tl', // Filipino — most Catholic in Asia
    },
  },

  category: 'spirituality',

  // ── App metadata ─────────────────────────────────────────────
  applicationName: 'Sinners Anonymous',
  appleWebApp: {
    capable: true,
    title: 'Sinners Anonymous',
    statusBarStyle: 'black-translucent',
  },
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

        {/* Theme — dark confession booth amber, not just red */}
        <meta name="theme-color" content="#1a0a00" />
        <meta name="msapplication-TileColor" content="#1a0a00" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured data — helps Google understand the site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Sinners Anonymous',
              alternateName: 'The Digital Confession Booth',
              url: 'https://www.sinnersanonymous.space',
              description:
                'An anonymous digital confession booth. Say what you cannot say anywhere else. Pay what your peace is worth.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.sinnersanonymous.space',
              },
            }),
          }}
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Fonts — serif for confession booth feel */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
