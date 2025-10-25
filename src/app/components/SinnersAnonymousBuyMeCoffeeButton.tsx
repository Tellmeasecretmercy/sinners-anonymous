'use client'

import { useEffect, useState } from 'react'

interface SinnersAnonymousBuyMeCoffeeButtonProps {
  amount?: string
  onPaymentSuccess?: () => void
}

export default function SinnersAnonymousBuyMeCoffeeButton({ 
  amount = "5.00", 
  onPaymentSuccess
}: SinnersAnonymousBuyMeCoffeeButtonProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  
  useEffect(() => {
    // Clean up any existing scripts first
    const existingScripts = document.querySelectorAll('script[src*="buymeacoffee"]')
    existingScripts.forEach(script => script.remove())

    // Remove any existing Buy Me a Coffee elements
    const existingButtons = document.querySelectorAll('[data-name="sinnersanonymous"]')
    existingButtons.forEach(button => button.remove())

    // Create and load the Buy Me a Coffee script
    const script = document.createElement('script')
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js'
    script.async = true
    
    // Set all the data attributes for Sinners Anonymous
    script.setAttribute('data-name', 'sinnersanonymous')
    script.setAttribute('data-size', 'default')
    script.setAttribute('data-limit', '5')
    script.setAttribute('data-page-url', 'https://www.buymeacoffee.com/sinnersanonymous')
    script.setAttribute('data-color', '#dc2626') // Red theme
    script.setAttribute('data-font', 'Cookie')
    script.setAttribute('data-text', `Confess Sin ($${amount})`)
    script.setAttribute('data-outline-color', '#000000')
    script.setAttribute('data-font-color', '#ffffff')
    script.setAttribute('data-coffee-color', '#dc2626')

    // Handle script load
    script.onload = () => {
      console.log('Sinners Anonymous Buy Me a Coffee script loaded successfully')
      setIsLoaded(true)
      
      // Show fallback after 3 seconds if button doesn't appear
      setTimeout(() => {
        const bmcButton = document.querySelector('a[href*="buymeacoffee.com/sinnersanonymous"]')
        if (!bmcButton) {
          setShowFallback(true)
        }
      }, 3000)
    }

    script.onerror = () => {
      console.error('Failed to load Sinners Anonymous Buy Me a Coffee script')
      setShowFallback(true)
    }

    // Add script to document head
    document.head.appendChild(script)

    // Set up click handler for payment simulation
    const handlePaymentClick = () => {
      // Store payment details for success page
      localStorage.setItem('lastSinAmount', amount)
      
      // Simulate payment delay
      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess()
        }
      }, 3000)
    }

    // Listen for clicks on Buy Me a Coffee buttons
    const checkForButton = setInterval(() => {
      const bmcButton = document.querySelector('a[href*="buymeacoffee.com/sinnersanonymous"]')
      if (bmcButton) {
        bmcButton.addEventListener('click', handlePaymentClick)
        clearInterval(checkForButton)
        console.log('Sinners Anonymous Buy Me a Coffee button found and click handler attached')
      }
    }, 500)

    // Cleanup after 10 seconds if button not found
    setTimeout(() => {
      clearInterval(checkForButton)
      if (!document.querySelector('a[href*="buymeacoffee.com/sinnersanonymous"]')) {
        setShowFallback(true)
      }
    }, 10000)

    return () => {
      // Cleanup
      clearInterval(checkForButton)
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [amount, onPaymentSuccess])

  const handleFallbackClick = () => {
    // Store payment details for success page
    localStorage.setItem('lastSinAmount', amount)
    
    // Open Buy Me a Coffee in new window
    window.open('https://www.buymeacoffee.com/sinnersanonymous', '_blank')
    
    // Simulate payment completion after delay
    setTimeout(() => {
      if (onPaymentSuccess) {
        onPaymentSuccess()
      }
    }, 5000)
  }

  return (
    <div style={{
      background: 'rgba(26, 0, 0, 0.7)',
      backdropFilter: 'blur(16px)',
      border: '3px solid rgba(220, 38, 38, 0.4)',
      borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
      padding: 'clamp(1.5rem, 4vw, 2rem)',
      textAlign: 'center',
      marginTop: '1rem'
    }}>
      <h3 style={{
        color: '#fef3c7',
        fontSize: 'clamp(1.1rem, 3vw, 1.2rem)',
        marginBottom: '1rem',
        fontFamily: 'serif',
        textShadow: '0 0 15px #dc262650'
      }}>
        Complete Your Confession
      </h3>
      
      <p style={{
        color: '#cbd5e1',
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        lineHeight: 1.5
      }}>
        Your sin will be taken from you forever. Pay what it&apos;s worth to be free.
      </p>

      {/* Buy Me a Coffee button container */}
      <div style={{ 
        marginBottom: '1rem',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {!isLoaded && !showFallback && (
          <div style={{
            color: '#cbd5e1',
            fontSize: '0.9rem',
            opacity: 0.7
          }}>
            Preparing confession booth...
          </div>
        )}
        
        {/* Fallback manual button */}
        {showFallback && (
          <button
            onClick={handleFallbackClick}
            style={{
              display: 'inline-block',
              padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.6)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.4)'
            }}
          >
            🔥 Confess Sin (${amount})
          </button>
        )}
      </div>

      <p style={{
        color: '#94a3b8',
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        fontStyle: 'italic',
        opacity: 0.8
      }}>
        Anonymous • Secure • Your burden will be lifted
      </p>
    </div>
  )
}
