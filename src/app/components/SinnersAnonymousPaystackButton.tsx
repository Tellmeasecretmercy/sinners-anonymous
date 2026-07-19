'use client'

import { motion } from 'framer-motion'

interface SinnersAnonymousPaystackButtonProps {
  amount: string
  onPaymentSuccess?: () => void
}

export default function SinnersAnonymousPaystackButton({
  amount = '5.00',
  onPaymentSuccess
}: SinnersAnonymousPaystackButtonProps) {

  const isValidAmount = parseFloat(amount) >= 1

  const handleClick = () => {
    localStorage.setItem('lastSinAmount', amount)
    window.open('https://paystack.shop/pay/rbbrpad1ix', '_blank')

    const handleFocus = () => {
      window.removeEventListener('focus', handleFocus)
      setTimeout(() => {
        if (onPaymentSuccess) onPaymentSuccess()
      }, 1500)
    }

    window.addEventListener('focus', handleFocus)

    setTimeout(() => {
      window.removeEventListener('focus', handleFocus)
    }, 180000)
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

      <motion.button
        onClick={handleClick}
        disabled={!isValidAmount}
        whileHover={{
          scale: isValidAmount ? 1.05 : 1,
          boxShadow: isValidAmount
            ? '0 6px 20px rgba(220, 38, 38, 0.6)'
            : 'none'
        }}
        whileTap={{ scale: isValidAmount ? 0.95 : 1 }}
        style={{
          display: 'inline-block',
          padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)',
          backgroundColor: isValidAmount ? '#dc2626' : '#64748b',
          color: '#ffffff',
          border: 'none',
          borderRadius: '25px',
          fontWeight: 'bold',
          fontSize: 'clamp(14px, 3.5vw, 16px)',
          cursor: isValidAmount ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          boxShadow: isValidAmount
            ? '0 4px 15px rgba(220, 38, 38, 0.4)'
            : 'none',
          marginBottom: '1rem'
        }}
      >
        🔥 Confess Sin (${amount})
      </motion.button>

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
