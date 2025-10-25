'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-Y4072WJ49C'

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: 'Sinners Anonymous',
            custom_map: {'custom_parameter': 'sin_type'}
          });
        `}
      </Script>
    </>
  )
}
