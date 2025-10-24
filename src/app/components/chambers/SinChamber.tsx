'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Flame, ArrowLeft, Send, DollarSign } from 'lucide-react'

interface SinChamberProps {
  onBack: () => void
}

export default function SinChamber({ onBack }: SinChamberProps) {
  const [sin, setSin] = useState('')
  const [amount, setAmount] = useState('5.00') // Higher default for sins!
  const [isComplete, setIsComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate hellish flame particles only on client
  const flameParticles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3
    }))
  }, [isClient])

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, '')
    
    // Ensure minimum $1
    const numValue = parseFloat(numericValue) || 1.00
    if (numValue < 1.00) {
      setAmount('1.00')
    } else {
      setAmount(numValue.toFixed(2))
    }
  }

  const handlePresetAmount = (preset: string) => {
    setAmount(preset)
  }

  const handleConfessAndPay = () => {
    if (!sin.trim()) return
    
    // For now, just show completion
    // Later we'll add PayPal integration
    setIsComplete(true)
  }

  // Dark Absolution completion state
  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0000 25%, #4a0000 50%, #1a0000 75%, #0f0f0f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Consuming flame particles */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {[...Array(60)].map((_, i) => (
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
          style={{ textAlign: 'center', maxWidth: '45rem', position: 'relative', zIndex: 10 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", duration: 1.5 }}
            style={{ marginBottom: '3rem' }}
          >
            <Flame size={120} color="#dc2626" strokeWidth={1.5} />
          </motion.div>
          
          <h2 style={{
            fontSize: '3.5rem',
            marginBottom: '2rem',
            color: '#fef3c7',
            fontFamily: 'serif',
            fontWeight: 300,
            textShadow: '0 0 30px #dc262650'
          }}>
            Your Secret is Mine Now
          </h2>
          
          <p style={{
            color: '#cbd5e1',
            marginBottom: '3.5rem',
            lineHeight: 1.8,
            fontSize: '1.4rem',
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
              padding: '1.5rem 3.5rem',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '2rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem'
            }}
          >
            Return When You Sin Again
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
      
      {/* Hellish flame particles - Only render on client */}
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
          padding: '1rem'
        }}
      >
        <div style={{ maxWidth: '55rem', width: '100%' }}>
          
          {/* Dark Confessor Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
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
                  padding: '2rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.5), rgba(153, 27, 27, 0.5))',
                  border: '3px solid rgba(220, 38, 38, 0.7)',
                  boxShadow: '0 0 40px rgba(220, 38, 38, 0.4)'
                }}
              >
                <Flame size={70} color="#dc2626" strokeWidth={1.5} />
              </motion.div>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontFamily: 'serif',
              color: '#fef3c7',
              marginBottom: '1.5rem',
              fontWeight: 300,
              textShadow: '0 0 30px #dc262650'
            }}>
              Tell Me What You've Done
            </h1>
            <p style={{
              fontSize: '1.5rem',
              color: '#cbd5e1',
              lineHeight: 1.6,
              maxWidth: '40rem',
              margin: '0 auto'
            }}>
              Your secrets are safe with me. I've heard worse... try me.
              What darkness do you carry?
            </p>
          </motion.div>

          {/* Sin Confession Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <div style={{ position: 'relative' }}>
              <textarea
                value={sin}
                onChange={(e) => setSin(e.target.value)}
                placeholder="Tell me your darkest secret... I'm listening. Confess everything. What haunts your soul?"
                maxLength={666} // Sinful character limit!
                style={{
                  width: '100%',
                  height: '20rem',
                  padding: '2.5rem',
                  backgroundColor: 'rgba(26, 0, 0, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '3px solid rgba(220, 38, 38, 0.4)',
                  borderRadius: '2rem',
                  color: '#fef3c7',
                  fontSize: '1.3rem',
                  fontFamily: 'serif',
                  lineHeight: 1.8,
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
                bottom: '2rem',
                right: '2rem',
                fontSize: '1rem',
                color: '#dc2626',
                opacity: 0.9,
                fontWeight: '700',
                textShadow: '0 0 10px #dc2626'
              }}>
                {sin.length}/666
              </div>
            </div>
          </motion.div>

          {/* Dark Confessor Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <div style={{
              background: 'rgba(26, 0, 0, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '3px solid rgba(220, 38, 38, 0.4)',
              borderRadius: '2rem',
              padding: '2.5rem',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: '#fef3c7',
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                fontFamily: 'serif',
                textShadow: '0 0 20px #dc262650'
              }}>
                Every Secret Has a Price
              </h3>
              
              <p style={{
                color: '#dc2626',
                fontSize: '1.2rem',
                marginBottom: '2rem',
                lineHeight: 1.5,
                fontWeight: '500'
              }}>
                What is your sin worth to you? Pay what it costs to unburden your soul.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                marginBottom: '2rem'
              }}>
                <DollarSign size={32} color="#dc2626" />
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#fef3c7',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    textAlign: 'center',
                    width: '160px',
                    fontFamily: 'monospace',
                    textShadow: '0 0 15px #dc262650'
                  }}
                  placeholder="5.00"
                />
                <span style={{ color: '#cbd5e1', fontSize: '2rem' }}>USD</span>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '1.5rem'
              }}>
                {['1.00', '5.00', '10.00', '25.00', '50.00', '100.00'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetAmount(preset)}
                    style={{
                      padding: '1rem 1.5rem',
                      background: amount === preset 
                        ? 'rgba(220, 38, 38, 0.5)' 
                        : 'rgba(220, 38, 38, 0.15)',
                      border: `3px solid ${amount === preset ? '#dc2626' : 'rgba(220, 38, 38, 0.4)'}`,
                      borderRadius: '1rem',
                      color: amount === preset ? '#fef3c7' : '#cbd5e1',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
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
                fontSize: '1rem',
                fontStyle: 'italic',
                marginTop: '1.5rem',
                fontWeight: '500'
              }}>
                Minimum $1.00 • Darker secrets demand higher tribute to the void
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
              gap: '2.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              style={{
                padding: '1.5rem 3rem',
                backgroundColor: 'transparent',
                border: '3px solid #64748b',
                color: '#cbd5e1',
                borderRadius: '2rem',
                fontWeight: '600',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                fontSize: '1.1rem'
              }}
            >
              <ArrowLeft size={24} />
              Flee from My Presence
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: sin.trim() ? 1.05 : 1,
                boxShadow: sin.trim() ? '0 20px 50px rgba(220, 38, 38, 0.5)' : 'none'
              }}
              whileTap={{ scale: sin.trim() ? 0.95 : 1 }}
              onClick={handleConfessAndPay}
              disabled={!sin.trim()}
              style={{
                padding: '1.5rem 3.5rem',
                borderRadius: '2rem',
                fontWeight: '700',
                transition: 'all 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                minWidth: '320px',
                justifyContent: 'center',
                cursor: sin.trim() ? 'pointer' : 'not-allowed',
                background: sin.trim() 
                  ? 'linear-gradient(135deg, #dc2626, #991b1b)'
                  : '#64748b',
                color: sin.trim() ? '#ffffff' : '#94a3b8',
                border: 'none',
                fontSize: '1.2rem'
              }}
            >
              <Send size={24} />
              Feed Me ${amount} & Your Sin
            </motion.button>
          </motion.div>

          {/* Dark Confessor Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              marginTop: '5rem',
              textAlign: 'center',
              color: '#cbd5e1',
              fontSize: '1rem'
            }}
          >
            <p style={{ marginBottom: '0.8rem', opacity: 0.9 }}>
             Your secrets are safe and anonymous forever
            </p>
            <p style={{ opacity: 0.8, color: '#dc2626', fontStyle: 'italic', fontSize: '1.1rem' }}>
              Tell me what you cannot bear to carry alone...
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
