'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { ArrowLeft, Send, DollarSign } from 'lucide-react'
import SinnersAnonymousBuyMeCoffeeButton from '../SinnersAnonymousBuyMeCoffeeButton'
import { trackConfessionalEntry, trackSinStart, trackAmountSelection, trackPaymentInitiated, trackSinCompleted } from '../../lib/analytics'

interface SinChamberProps {
  onBack: () => void
}

export default function SinChamber({ onBack }: SinChamberProps) {
  const [sin, setSin] = useState('')
  const [amount, setAmount] = useState('5.00')
  const [showPaymentButton, setShowPaymentButton] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [hasStartedTyping, setHasStartedTyping] = useState(false)

  useEffect(() => {
    setIsClient(true)
    trackConfessionalEntry()
  }, [])

  // Candlelight particles — softer than hellfire, more confession booth
  const candleParticles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 4,
      size: 3 + Math.random() * 5
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

  const handleConfessAndPay = () => {
    if (!sin.trim()) return
    trackPaymentInitiated(amount)
    setShowPaymentButton(true)
  }

  // ── COMPLETION SCREEN ──────────────────────────────────────────
  if (isComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0a00 30%, #2d1200 60%, #0a0a0a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        position: 'relative',
        overflow: 'hidden'
      }}>

        {/* Soft rising particles — like incense smoke */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                backgroundColor: i % 3 === 0 ? '#c9a96e' : '#dc2626',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: i % 3 === 0
                  ? '0 0 12px #c9a96e'
                  : '0 0 12px #dc2626',
              }}
              animate={{
                y: [0, -200, 0],
                x: [0, (Math.random() - 0.5) * 80, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 7 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 7,
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
            maxWidth: 'clamp(20rem, 80vw, 48rem)',
            position: 'relative',
            zIndex: 10
          }}
        >
          {/* Cross / absolution symbol */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", duration: 1.5 }}
            style={{
              marginBottom: 'clamp(2rem, 6vw, 3rem)',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div style={{
              width: 'clamp(60px, 15vw, 90px)',
              height: 'clamp(60px, 15vw, 90px)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Vertical bar */}
              <div style={{
                position: 'absolute',
                width: '6px',
                height: '100%',
                background: 'linear-gradient(180deg, #c9a96e, #dc2626)',
                borderRadius: '3px',
                boxShadow: '0 0 20px #c9a96e80'
              }} />
              {/* Horizontal bar */}
              <div style={{
                position: 'absolute',
                width: '70%',
                height: '6px',
                background: 'linear-gradient(90deg, #c9a96e, #dc2626)',
                borderRadius: '3px',
                top: '30%',
                boxShadow: '0 0 20px #c9a96e80'
              }} />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              color: '#c9a96e',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              fontWeight: 300
            }}
          >
            Ego te absolvo
          </motion.p>

          <h2 style={{
            fontSize: 'clamp(2rem, 7vw, 3.5rem)',
            marginBottom: 'clamp(1rem, 4vw, 2rem)',
            color: '#fef3c7',
            fontFamily: 'Georgia, serif',
            fontWeight: 300,
            lineHeight: 1.3,
            textShadow: '0 0 40px #c9a96e30'
          }}>
            You are absolved.
          </h2>

          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
            margin: '0 auto clamp(1.5rem, 4vw, 2.5rem)'
          }} />

          <p style={{
            color: '#cbd5e1',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            lineHeight: 1.8,
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            fontWeight: 300,
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic'
          }}>
            Your confession has been received.
            <br />
            Your burden has been lifted.
            <br />
            Go, and sin no more.
          </p>

          <p style={{
            color: '#c9a96e',
            fontSize: 'clamp(0.85rem, 2.2vw, 1rem)',
            marginBottom: 'clamp(2rem, 6vw, 3.5rem)',
            opacity: 0.7,
            fontStyle: 'italic'
          }}>
            &quot;Come to me, all you who are weary and burdened,
            <br />
            and I will give you rest.&quot; — Matthew 11:28
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 50px rgba(201, 169, 110, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2rem, 6vw, 3.5rem)',
              background: 'linear-gradient(135deg, #c9a96e, #a07840)',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: '2rem',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              letterSpacing: '0.05em'
            }}
          >
            Leave the Booth
          </motion.button>
        </motion.div>
      </div>
    )
  }

  // ── MAIN CONFESSION SCREEN ─────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      // Dark wood + candlelight — confession booth aesthetic
      background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0a00 25%, #2d1200 50%, #1a0a00 75%, #0a0a0a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Candlelight ambient particles */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {candleParticles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.id % 4 === 0 ? '#c9a96e' : '#dc2626',
                borderRadius: '50%',
                opacity: 0.5,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow: particle.id % 4 === 0
                  ? '0 0 10px #c9a96e'
                  : '0 0 10px #dc2626',
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle vignette overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
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

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 3.5rem)' }}
          >
            {/* Candle icon */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                filter: 'drop-shadow(0 0 20px #c9a96e80)'
              }}
            >
              🕯️
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                color: '#c9a96e',
                fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                fontWeight: 300,
                fontFamily: 'Georgia, serif'
              }}
            >
              The Confession Booth
            </motion.p>

            {/* Main headline */}
            <h1 style={{
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: '#fef3c7',
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              textShadow: '0 0 60px #c9a96e20'
            }}>
              Bless me, Father.
            </h1>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: '#dc2626',
              marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              textShadow: '0 0 30px #dc262640'
            }}>
              For I have sinned.
            </h2>

            {/* Divider */}
            <div style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #c9a96e60, transparent)',
              margin: '0 auto clamp(1.5rem, 4vw, 2rem)'
            }} />

            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#cbd5e1',
              lineHeight: 1.7,
              maxWidth: '38rem',
              margin: '0 auto',
              fontFamily: 'Georgia, serif',
              fontWeight: 300,
              fontStyle: 'italic',
              opacity: 0.85
            }}>
              No priest. No judgment. No one who knows your name.
              <br />
              Just you, your truth, and the silence of the booth.
            </p>
          </motion.div>

          {/* ── CONFESSION TEXTAREA ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            {/* Label */}
            <p style={{
              color: '#c9a96e',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
              fontWeight: 300,
              textAlign: 'center'
            }}>
              Speak your confession
            </p>

            <div style={{ position: 'relative' }}>
              <textarea
                value={sin}
                onChange={handleSinChange}
                placeholder="It's been a while since my last confession...

Tell me what you've done. What you've left undone. What haunts you in the quiet hours.

This booth holds no record. No one will know. Say it."
                maxLength={1000}
                style={{
                  width: '100%',
                  height: 'clamp(22rem, 55vh, 28rem)',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  backgroundColor: 'rgba(15, 5, 0, 0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(201, 169, 110, 0.2)',
                  borderRadius: 'clamp(0.5rem, 2vw, 1rem)',
                  color: '#fef3c7',
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  lineHeight: 1.8,
                  resize: 'none',
                  outline: 'none',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(201, 169, 110, 0.02)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(201, 169, 110, 0.5)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(201, 169, 110, 0.1), 0 20px 60px rgba(0,0,0,0.8)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(201, 169, 110, 0.2)'
                  e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.8)'
                }}
              />

              {/* Character count */}
              <div style={{
                position: 'absolute',
                bottom: 'clamp(1rem, 3vw, 1.5rem)',
                right: 'clamp(1rem, 3vw, 1.5rem)',
                fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                color: '#c9a96e',
                opacity: 0.6,
                fontFamily: 'monospace'
              }}>
                {sin.length}/1000
              </div>
            </div>
          </motion.div>

          {/* ── PRICING SECTION ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            <div style={{
              background: 'rgba(15, 5, 0, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(201, 169, 110, 0.15)',
              borderRadius: 'clamp(0.5rem, 2vw, 1rem)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              textAlign: 'center'
            }}>

              <p style={{
                color: '#c9a96e',
                fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                fontWeight: 300
              }}>
                Your Offering
              </p>

              <h3 style={{
                color: '#fef3c7',
                fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
                marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
                fontFamily: 'Georgia, serif',
                fontWeight: 300,
                fontStyle: 'italic'
              }}>
                What is your peace worth to you?
              </h3>

              <p style={{
                color: '#94a3b8',
                fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
                lineHeight: 1.6,
                fontStyle: 'italic',
                opacity: 0.8
              }}>
                In the old church, you lit a candle. Here, you pay what your burden is worth.
                <br />
                Heavier sins demand greater offerings.
              </p>

              {/* Amount input */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.5rem, 2vw, 0.8rem)',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)'
              }}>
                <DollarSign
                  size={typeof window !== 'undefined' && window.innerWidth < 768 ? 22 : 28}
                  color="#c9a96e"
                />
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    fontWeight: 300,
                    color: '#fef3c7',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(201, 169, 110, 0.3)',
                    outline: 'none',
                    textAlign: 'center',
                    width: 'clamp(120px, 30vw, 160px)',
                    fontFamily: 'Georgia, serif',
                    textShadow: '0 0 20px #c9a96e30',
                    paddingBottom: '4px'
                  }}
                  placeholder="5.00"
                />
                <span style={{
                  color: '#94a3b8',
                  fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                  fontWeight: 300
                }}>
                  USD
                </span>
              </div>

              {/* Preset amounts */}
              <div style={{
                display: 'flex',
                gap: 'clamp(0.4rem, 1.5vw, 0.75rem)',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
              }}>
                {[
                  { value: '1.00', label: '$1', desc: 'A whisper' },
                  { value: '5.00', label: '$5', desc: 'A secret' },
                  { value: '10.00', label: '$10', desc: 'A sin' },
                  { value: '25.00', label: '$25', desc: 'A burden' },
                  { value: '50.00', label: '$50', desc: 'A confession' },
                  { value: '100.00', label: '$100', desc: 'A reckoning' },
                ].map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => handlePresetAmount(preset.value)}
                    style={{
                      padding: 'clamp(0.6rem, 1.5vw, 0.9rem) clamp(0.8rem, 2vw, 1.2rem)',
                      background: amount === preset.value
                        ? 'rgba(201, 169, 110, 0.2)'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${amount === preset.value
                        ? 'rgba(201, 169, 110, 0.6)'
                        : 'rgba(201, 169, 110, 0.15)'}`,
                      borderRadius: '0.5rem',
                      color: amount === preset.value ? '#fef3c7' : '#94a3b8',
                      cursor: 'pointer',
                      fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                      fontWeight: amount === preset.value ? '600' : '400',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <span>{preset.label}</span>
                    <span style={{
                      fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
                      opacity: 0.6,
                      fontStyle: 'italic'
                    }}>
                      {preset.desc}
                    </span>
                  </button>
                ))}
              </div>

              <p style={{
                color: '#c9a96e',
                fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                fontStyle: 'italic',
                opacity: 0.6
              }}>
                Minimum $1.00 • Anonymous • No record kept
              </p>
            </div>
          </motion.div>

          {/* ── ACTION BUTTONS ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            style={{
              display: 'flex',
              gap: 'clamp(1rem, 4vw, 2rem)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBack}
              style={{
                padding: 'clamp(1rem, 3vw, 1.3rem) clamp(1.5rem, 4vw, 2.5rem)',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#64748b',
                borderRadius: '0.5rem',
                fontWeight: '400',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vw, 0.75rem)',
                fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic'
              }}
            >
              <ArrowLeft size={16} />
              Leave the booth
            </motion.button>

            <motion.button
              whileHover={{
                scale: sin.trim() ? 1.03 : 1,
                boxShadow: sin.trim()
                  ? '0 20px 50px rgba(201, 169, 110, 0.25)'
                  : 'none'
              }}
              whileTap={{ scale: sin.trim() ? 0.97 : 1 }}
              onClick={handleConfessAndPay}
              disabled={!sin.trim()}
              style={{
                padding: 'clamp(1rem, 3vw, 1.3rem) clamp(2rem, 5vw, 3rem)',
                borderRadius: '0.5rem',
                fontWeight: '600',
                transition: 'all 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vw, 0.75rem)',
                minWidth: 'clamp(220px, 55vw, 300px)',
                justifyContent: 'center',
                cursor: sin.trim() ? 'pointer' : 'not-allowed',
                background: sin.trim()
                  ? 'linear-gradient(135deg, #c9a96e, #a07840)'
                  : 'rgba(255,255,255,0.05)',
                color: sin.trim() ? '#0a0a0a' : '#475569',
                border: sin.trim()
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.05)',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
                letterSpacing: '0.03em'
              }}
            >
              <Send size={16} />
              Confess & Pay ${amount}
            </motion.button>
          </motion.div>

          {/* ── PAYMENT BUTTON (revealed after confess click) ── */}
          <motion.div
            initial={false}
                        animate={{
              height: showPaymentButton ? 'auto' : 0,
              opacity: showPaymentButton ? 1 : 0
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ overflow: 'hidden', marginTop: showPaymentButton ? '2rem' : 0 }}
          >
            {showPaymentButton && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Absolution message above payment */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
                }}>
                  <p style={{
                    color: '#c9a96e',
                    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    opacity: 0.8,
                    lineHeight: 1.7
                  }}>
                    Your confession has been heard.
                    <br />
                    Complete your offering to receive absolution.
                  </p>
                </div>

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

          {/* ── FOOTER ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            style={{
              marginTop: 'clamp(3rem, 8vw, 5rem)',
              textAlign: 'center',
            }}
          >
            {/* Divider */}
            <div style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #c9a96e40, transparent)',
              margin: '0 auto clamp(1.5rem, 4vw, 2rem)'
            }} />

            {/* Scripture */}
            <p style={{
              color: '#c9a96e',
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              opacity: 0.6,
              lineHeight: 1.8,
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
            }}>
              &quot;Confess your sins to one another...
              <br />
              that you may be healed.&quot;
              <br />
              <span style={{ fontSize: '0.85em', opacity: 0.7 }}>— James 5:16</span>
            </p>

            {/* Privacy note */}
            <p style={{
              color: '#475569',
              fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
              letterSpacing: '0.1em',
              fontWeight: 300
            }}>
              Anonymous • Encrypted • Gone forever 🕯️
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
