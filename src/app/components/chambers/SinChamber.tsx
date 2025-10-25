'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Flame, ArrowLeft, Send, DollarSign } from 'lucide-react'
import SinnersAnonymousBuyMeCoffeeButton from '../SinnersAnonymousBuyMeCoffeeButton'
import { trackConfessionalEntry, trackSinStart, trackAmountSelection, trackPaymentInitiated, trackSinCompleted } from '../../lib/analytics'

interface SinChamberProps {
  onBack: () => void
}

export default function SinChamber({ onBack }: SinChamberProps) {
  const [sin, setSin] = useState('')
  const [amount, setAmount] = useState('5.00')
  const [showPaymentButton, setShowPaymentButton] = useState(false) // NEW STATE
  const [isComplete, setIsComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [hasStartedTyping, setHasStartedTyping] = useState(false)

  useEffect(() => {
    setIsClient(true)
    trackConfessionalEntry()
  }, [])

  // MANY hellish flame particles
  const flameParticles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3
    }))
  }, [isClient])

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    const numValue = parseFloat(numericValue) || 1.00
    if (numValue < 1.00) {
      setAmount('1.00')
      trackAmountSelection('1.00')
    } else {
      const newAmount = numValue.toFixed(2)
      setAmount(newAmount)
      trackAmountSelection(newAmount)
    }
  }

  const handlePresetAmount = (preset: string) => {
    setAmount(preset)
    trackAmountSelection(preset)
  }

  const handleSinChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setSin(newValue)
    
    if (newValue.length === 1 && !hasStartedTyping) {
      trackSinStart()
      setHasStartedTyping(true)
    }
  }

  // UPDATED: Show payment button instead of completing immediately
  const handleConfessAndPay = () => {
    if (!sin.trim()) return
    trackPaymentInitiated(amount)
    setShowPaymentButton(true) // Show payment button
  }

  // Completion state with MANY particles
  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0000 25%, #4a0000 50%, #1a0000 75%, #0f0f0f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* MANY consuming flame particles */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {[...Array(70)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                backgroundColor: '#dc2626',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 20px #dc2626',
              }}
              animate={{
                y: [0, -250, 0],
                x: [0, (Math.random() - 0.5) * 150, 0],
                opacity: [0, 1, 0],
                scale: [0, 3, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          style={{ 
            textAlign: 'center', 
            maxWidth: 'clamp(20rem, 80vw, 45rem)', 
            position: 'relative', 
            zIndex: 10 
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", duration: 1.5 }}
            style={{ marginBottom: 'clamp(2rem, 6vw, 3rem)' }}
          >
            <Flame 
              size={typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 120} 
              color="#dc2626" 
              strokeWidth={1.5} 
            />
          </motion.div>
          
          <h2 style={{
            fontSize: 'clamp(2rem, 7vw, 3.5rem)',
            marginBottom: 'clamp(1rem, 4vw, 2rem)',
            color: '#fef3c7',
            fontFamily: 'serif',
            fontWeight: 300,
            textShadow: '0 0 30px #dc262650'
          }}>
            Your Secret is Safe with Me
          </h2>
          
          <p style={{
            color: '#cbd5e1',
            marginBottom: 'clamp(2rem, 6vw, 3.5rem)',
            lineHeight: 1.6,
            fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
            fontWeight: 300
          }}>
            Your secret is safe with me now. I have taken your burden. 
            You are lighter... until you need me again.
          </p>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 50px rgba(220, 38, 38, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2rem, 6vw, 3.5rem)',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '2rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)'
            }}
          >
            Return When You Need Me Again
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0000 25%, #4a0000 50%, #1a0000 75%, #0f0f0f 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* MANY hellish flame particles */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {flameParticles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                backgroundColor: '#dc2626',
                borderRadius: '50%',
                opacity: 0.7,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow: '0 0 15px #dc2626',
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 2, 1],
                backgroundColor: ['#dc2626', '#ef4444', '#dc2626'],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 'clamp(1rem, 4vw, 2rem)'
        }}
      >
        <div style={{ maxWidth: 'clamp(20rem, 90vw, 55rem)', width: '100%' }}>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 3rem)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(1rem, 4vw, 2rem)' }}>
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 8, -8, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  padding: 'clamp(1rem, 3vw, 2rem)',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.5), rgba(153, 27, 27, 0.5))',
                  border: '3px solid rgba(220, 38, 38, 0.7)',
                  boxShadow: '0 0 40px rgba(220, 38, 38, 0.4)'
                }}
              >
                <Flame 
                  size={typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 70} 
                  color="#dc2626" 
                  strokeWidth={1.5} 
                />
              </motion.div>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 8vw, 5.5rem)',
              fontFamily: 'serif',
              color: '#fef3c7',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              fontWeight: 300,
              textShadow: '0 0 30px #dc262650'
            }}>
              Tell Me What You&apos;ve Done
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
              color: '#cbd5e1',
              lineHeight: 1.5,
              maxWidth: '40rem',
              margin: '0 auto'
            }}>
              Your secrets are safe with me. I&apos;ve heard worse... try me.
              What darkness do you carry?
            </p>
          </motion.div>

          {/* Confession Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            <div style={{ position: 'relative' }}>
              <textarea
                value={sin}
                onChange={handleSinChange}
                placeholder="Tell me your darkest secret... I'm listening. Confess everything. What haunts your soul?"
                maxLength={666}
                style={{
                  width: '100%',
                  height: 'clamp(22rem, 55vh, 28rem)', // BIGGER TEXTAREA
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  backgroundColor: 'rgba(26, 0, 0, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '3px solid rgba(220, 38, 38, 0.4)',
                  borderRadius: 'clamp(1rem, 3vw, 2rem)',
                  color: '#fef3c7',
                  fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                  fontFamily: 'serif',
                  lineHeight: 1.6,
                  resize: 'none',
                  outline: 'none',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 15px 50px rgba(0, 0, 0, 0.6)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(220, 38, 38, 0.8)'
                  e.target.style.boxShadow = '0 0 0 6px rgba(220, 38, 38, 0.3), 0 15px 50px rgba(0, 0, 0, 0.6)'
                  e.target.style.backgroundColor = 'rgba(26, 0, 0, 0.9)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(220, 38, 38, 0.4)'
                  e.target.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.6)'
                  e.target.style.backgroundColor = 'rgba(26, 0, 0, 0.7)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 'clamp(1rem, 3vw, 2rem)',
                right: 'clamp(1rem, 3vw, 2rem)',
                fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                color: '#dc2626',
                opacity: 0.9,
                fontWeight: '700',
                textShadow: '0 0 10px #dc2626'
              }}>
                {sin.length}/500
              </div>
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            <div style={{
              background: 'rgba(26, 0, 0, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '3px solid rgba(220, 38, 38, 0.4)',
              borderRadius: 'clamp(1rem, 3vw, 2rem)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: '#fef3c7',
                fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                fontFamily: 'serif',
                textShadow: '0 0 20px #dc262650'
              }}>
                Every Secret Has a Price
              </h3>
              
              <p style={{
                color: '#dc2626',
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
                lineHeight: 1.4,
                fontWeight: '500'
              }}>
                What is your sin worth to you? Pay what it costs to unburden your soul.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.5rem, 2vw, 0.8rem)',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)'
              }}>
                <DollarSign size={typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 32} color="#dc2626" />
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    fontWeight: 'bold',
                    color: '#fef3c7',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    textAlign: 'center',
                    width: 'clamp(120px, 30vw, 160px)',
                    fontFamily: 'monospace',
                    textShadow: '0 0 15px #dc262650'
                  }}
                  placeholder="5.00"
                />
                <span style={{ color: '#cbd5e1', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>USD</span>
              </div>

              <div style={{
                display: 'flex',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
              }}>
                {['1.00', '5.00', '10.00', '25.00', '50.00', '100.00'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetAmount(preset)}
                    style={{
                      padding: 'clamp(0.7rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
                      background: amount === preset 
                        ? 'rgba(220, 38, 38, 0.5)' 
                        : 'rgba(220, 38, 38, 0.15)',
                      border: `3px solid ${amount === preset ? '#dc2626' : 'rgba(220, 38, 38, 0.4)'}`,
                      borderRadius: 'clamp(0.5rem, 2vw, 1rem)',
                      color: amount === preset ? '#fef3c7' : '#cbd5e1',
                      cursor: 'pointer',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                      fontWeight: '700',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              <p style={{
                color: '#991b1b',
                fontSize: 'clamp(0.8rem, 2.2vw, 1rem)',
                fontStyle: 'italic',
                marginTop: 'clamp(1rem, 3vw, 1.5rem)',
                fontWeight: '500'
              }}>
                Minimum $1.00 • Heavier secrets demand greater payment
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            style={{
              display: 'flex',
              gap: 'clamp(1rem, 4vw, 2.5rem)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              style={{
                padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
                backgroundColor: 'transparent',
                border: '3px solid #64748b',
                color: '#cbd5e1',
                borderRadius: '2rem',
                fontWeight: '600',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
              }}
            >
              <ArrowLeft size={typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24} />
              Flee from My Presence
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: sin.trim() ? 1.05 : 1,
                boxShadow: sin.trim() ? '0 20px 50px rgba(220, 38, 38, 0.5)' : 'none'
              }}
              whileTap={{ scale: sin.trim() ? 0.95 : 1 }}
              onClick={handleConfessAndPay} // UPDATED: Shows payment button
              disabled={!sin.trim()}
              style={{
                padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2.5rem, 6vw, 3.5rem)',
                borderRadius: '2rem',
                fontWeight: '700',
                transition: 'all 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                minWidth: 'clamp(250px, 60vw, 320px)',
                justifyContent: 'center',
                cursor: sin.trim() ? 'pointer' : 'not-allowed',
                background: sin.trim() 
                  ? 'linear-gradient(135deg, #dc2626, #991b1b)'
                  : '#64748b',
                color: sin.trim() ? '#ffffff' : '#94a3b8',
                border: 'none',
                fontSize: 'clamp(1rem, 3vw, 1.2rem)'
              }}
            >
              <Send size={typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24} />
              Confess Sin for ${amount}
            </motion.button>
          </motion.div>

          {/* NEW: Buy Me a Coffee Button appears here when clicked */}
          <motion.div
            initial={false}
            animate={{
              height: showPaymentButton ? 'auto' : 0,
              opacity: showPaymentButton ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: 'hidden', marginTop: showPaymentButton ? '2rem' : 0 }}
          >
            {showPaymentButton && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <SinnersAnonymousBuyMeCoffeeButton 
                  amount={amount}
                  onPaymentSuccess={() => {
                    setIsComplete(true)
                    trackSinCompleted(amount)
                  }} 
                />
              </motion.div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              marginTop: 'clamp(3rem, 8vw, 5rem)',
              textAlign: 'center',
              color: '#cbd5e1',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
            }}
          >
            <p style={{ marginBottom: '0.5rem', opacity: 0.9 }}>
              Your secrets are safe and anonymous forever
            </p>
            <p style={{ opacity: 0.8, color: '#dc2626', fontStyle: 'italic', fontSize: 'clamp(0.8rem, 2.2vw, 1.1rem)' }}>
              &quot;Tell me what you cannot bear to carry alone...&quot;
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
