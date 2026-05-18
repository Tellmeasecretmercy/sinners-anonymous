'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { ArrowLeft, Send, DollarSign } from 'lucide-react'
import SinnersAnonymousBuyMeCoffeeButton from '../SinnersAnonymousBuyMeCoffeeButton'
import { trackConfessionalEntry, trackSinStart, trackAmountSelection, trackPaymentInitiated, trackSinCompleted } from '../../lib/analytics'

interface SinChamberProps {
  onBack: () => void
}

// 4 distinct stages
type Stage = 'confess' | 'heard' | 'seal' | 'absolved'

export default function SinChamber({ onBack }: SinChamberProps) {
  const [stage, setStage] = useState<Stage>('confess')
  const [sin, setSin] = useState('')
  const [amount, setAmount] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [hasStartedTyping, setHasStartedTyping] = useState(false)

  useEffect(() => {
    setIsClient(true)
    trackConfessionalEntry()
  }, [])

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

  const handleSinChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setSin(newValue)
    if (newValue.length === 1 && !hasStartedTyping) {
      trackSinStart()
      setHasStartedTyping(true)
    }
  }

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    const numValue = parseFloat(numericValue) || 0
    if (numValue < 1.00 && numericValue !== '') {
      setAmount('1.00')
      trackAmountSelection('1.00')
    } else {
      setAmount(numericValue)
      if (numValue >= 1) trackAmountSelection(numericValue)
    }
  }

  const handleConfess = () => {
    if (!sin.trim()) return
    setStage('heard')
    // Auto advance to seal after 3 seconds
    setTimeout(() => setStage('seal'), 3000)
  }

  const handlePaymentSuccess = () => {
    trackSinCompleted(amount)
    setStage('absolved')
  }

  // ── SHARED BACKGROUND ─────────────────────────────────────────
  const Background = () => (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0a00 25%, #2d1200 50%, #1a0a00 75%, #0a0a0a 100%)',
        zIndex: 0
      }} />

      {isClient && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
          {candleParticles.map((p) => (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.id % 4 === 0 ? '#c9a96e' : '#dc2626',
                borderRadius: '50%',
                left: `${p.left}%`,
                top: `${p.top}%`,
                boxShadow: p.id % 4 === 0 ? '0 0 10px #c9a96e' : '0 0 10px #dc2626',
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />
    </>
  )

  // ── STAGE 1: CONFESS ──────────────────────────────────────────
  if (stage === 'confess') {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Background />

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
          <div style={{ maxWidth: 'clamp(20rem, 90vw, 52rem)', width: '100%' }}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2 }}
              style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                  marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                  filter: 'drop-shadow(0 0 20px #c9a96e80)'
                }}
              >
                🕯️
              </motion.div>

              <p style={{
                color: '#c9a96e',
                fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
                fontWeight: 300,
                fontFamily: 'Georgia, serif'
              }}>
                The Confession Booth
              </p>

              <h1 style={{
                fontSize: 'clamp(2rem, 7vw, 4.5rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#fef3c7',
                marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                textShadow: '0 0 60px #c9a96e15'
              }}>
                Bless me, Father.
              </h1>

              <h2 style={{
                fontSize: 'clamp(1.3rem, 4vw, 2.5rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#dc2626',
                marginBottom: 'clamp(1.2rem, 3vw, 2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                textShadow: '0 0 30px #dc262630'
              }}>
                For I have sinned.
              </h2>

              <div style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #c9a96e50, transparent)',
                margin: '0 auto clamp(1rem, 2.5vw, 1.5rem)'
              }} />

              <p style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                color: '#94a3b8',
                lineHeight: 1.7,
                maxWidth: '36rem',
                margin: '0 auto',
                fontFamily: 'Georgia, serif',
                fontWeight: 300,
                fontStyle: 'italic'
              }}>
                No priest. No judgment. No one who knows your name.
                <br />
                Just you, your truth, and the silence of the booth.
              </p>
            </motion.div>

            {/* Confession textarea — the ONLY thing on this screen */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
            >
              <p style={{
                color: '#c9a96e',
                fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                fontWeight: 300,
                textAlign: 'center',
                opacity: 0.8
              }}>
                Speak your confession
              </p>

              <div style={{ position: 'relative' }}>
                <textarea
                  value={sin}
                  onChange={handleSinChange}
                  autoFocus
                  placeholder={`It's been a while since my last confession...

Tell me what you've done. What you've left undone. What haunts you in the quiet hours.

This booth holds no record. No one will know. Say it.`}
                  maxLength={1000}
                  style={{
                    width: '100%',
                    height: 'clamp(20rem, 50vh, 26rem)',
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    backgroundColor: 'rgba(15, 5, 0, 0.85)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(201, 169, 110, 0.2)',
                    borderRadius: 'clamp(0.5rem, 2vw, 1rem)',
                    color: '#fef3c7',
                    fontSize: 'clamp(1rem, 2.8vw, 1.2rem)',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    lineHeight: 1.8,
                    resize: 'none',
                    outline: 'none',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(201,169,110,0.02)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(201, 169, 110, 0.5)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.08), 0 20px 60px rgba(0,0,0,0.8)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(201, 169, 110, 0.2)'
                    e.target.style.boxShadow = '0 20px 60px rgba(0,0,0,0.8)'
                  }}
                />

                <div style={{
                  position: 'absolute',
                  bottom: 'clamp(1rem, 2.5vw, 1.5rem)',
                  right: 'clamp(1rem, 2.5vw, 1.5rem)',
                  fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                  color: '#c9a96e',
                  opacity: 0.4,
                  fontFamily: 'monospace'
                }}>
                  {sin.length}/1000
                </div>
              </div>
            </motion.div>

            {/* Action buttons — NO payment visible here */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              style={{
                display: 'flex',
                gap: 'clamp(0.75rem, 3vw, 1.5rem)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                style={{
                  padding: 'clamp(0.9rem, 2.5vw, 1.2rem) clamp(1.5rem, 4vw, 2.5rem)',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#475569',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  transition: 'all 0.3s ease'
                }}
              >
                <ArrowLeft size={14} />
                Leave the booth
              </motion.button>

              <motion.button
                whileHover={{
                  scale: sin.trim() ? 1.03 : 1,
                  boxShadow: sin.trim() ? '0 15px 40px rgba(201,169,110,0.2)' : 'none'
                }}
                whileTap={{ scale: sin.trim() ? 0.97 : 1 }}
                onClick={handleConfess}
                disabled={!sin.trim()}
                style={{
                  padding: 'clamp(0.9rem, 2.5vw, 1.2rem) clamp(2rem, 5vw, 3rem)',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  minWidth: 'clamp(200px, 50vw, 280px)',
                  justifyContent: 'center',
                  cursor: sin.trim() ? 'pointer' : 'not-allowed',
                  background: sin.trim()
                    ? 'linear-gradient(135deg, #c9a96e, #a07840)'
                    : 'rgba(255,255,255,0.04)',
                  color: sin.trim() ? '#0a0a0a' : '#334155',
                  border: 'none',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  letterSpacing: '0.03em',
                  transition: 'all 0.4s ease'
                }}
              >
                <Send size={15} />
                Confess
              </motion.button>
            </motion.div>

            {/* Footer — no payment mention */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              style={{
                marginTop: 'clamp(2.5rem, 6vw, 4rem)',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #c9a96e30, transparent)',
                margin: '0 auto clamp(1rem, 2.5vw, 1.5rem)'
              }} />
              <p style={{
                color: '#c9a96e',
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                opacity: 0.5,
                lineHeight: 1.7
              }}>
                &quot;Confess your sins to one another...
                that you may be healed.&quot;
                <br />
                <span style={{ fontSize: '0.85em', opacity: 0.8 }}>— James 5:16</span>
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    )
  }

  // ── STAGE 2: HEARD — transition moment ───────────────────────
  if (stage === 'heard') {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Background />

        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 'clamp(1rem, 4vw, 2rem)'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{ textAlign: 'center', maxWidth: '36rem' }}
          >
            {/* Pulsing candle */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                filter: [
                  'drop-shadow(0 0 20px #c9a96e)',
                  'drop-shadow(0 0 50px #c9a96e)',
                  'drop-shadow(0 0 20px #c9a96e)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontSize: 'clamp(3rem, 10vw, 5rem)',
                marginBottom: 'clamp(2rem, 5vw, 3rem)'
              }}
            >
              🕯️
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                color: '#c9a96e',
                fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                fontWeight: 300
              }}
            >
              Your confession has been heard
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#fef3c7',
                fontWeight: 300,
                lineHeight: 1.3,
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                textShadow: '0 0 40px #c9a96e20'
              }}
            >
              The booth holds your words now.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              style={{
                color: '#94a3b8',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                lineHeight: 1.7,
                opacity: 0.8
              }}
            >
              One thing remains...
            </motion.p>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut'
                  }}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#c9a96e'
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  // ── STAGE 3: SEAL — payment appears here ─────────────────────
  if (stage === 'seal') {
    const isValidAmount = parseFloat(amount) >= 1

    return (
      <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Background />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
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
          <div style={{ maxWidth: 'clamp(20rem, 90vw, 48rem)', width: '100%' }}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
            >
              <p style={{
                color: '#c9a96e',
                fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
                fontWeight: 300
              }}>
                One final act
              </p>

              <h2 style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#fef3c7',
                fontWeight: 300,
                lineHeight: 1.3,
                marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
                textShadow: '0 0 40px #c9a96e15'
              }}>
                Seal your confession.
              </h2>

              <div style={{
                width: '50px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #c9a96e50, transparent)',
                margin: '0 auto clamp(1rem, 2.5vw, 1.5rem)'
              }} />

              <p style={{
                color: '#94a3b8',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                lineHeight: 1.7,
                maxWidth: '32rem',
                margin: '0 auto'
              }}>
                In the old church, you lit a candle after confession.
                <br />
                This is your candle. Pay what your peace is worth.
              </p>
            </motion.div>

            {/* Amount — clean, single input, no presets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                background: 'rgba(15, 5, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(201, 169, 110, 0.15)',
                borderRadius: 'clamp(0.5rem, 2vw, 1rem)',
                padding: 'clamp(2rem, 5vw, 3rem)',
                textAlign: 'center',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)'
              }}
            >
              <p style={{
                color: '#94a3b8',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
                lineHeight: 1.6,
                opacity: 0.8
              }}>
                Heavier burdens deserve greater offerings.
                <br />
                Only you know what yours is worth.
              </p>

              {/* Single clean amount input */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                marginBottom: 'clamp(0.75rem, 2vw, 1rem)'
              }}>
                <DollarSign
                  size={typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 32}
                  color="#c9a96e"
                  style={{ opacity: 0.7 }}
                />
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  autoFocus
                  placeholder="0.00"
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    fontWeight: 300,
                    color: '#fef3c7',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `1px solid ${isValidAmount
                      ? 'rgba(201,169,110,0.5)'
                      : 'rgba(201,169,110,0.2)'}`,
                    outline: 'none',
                    textAlign: 'center',
                    width: 'clamp(140px, 35vw, 200px)',
                    fontFamily: 'Georgia, serif',
                    textShadow: isValidAmount ? '0 0 30px #c9a96e40' : 'none',
                    paddingBottom: '6px',
                    transition: 'all 0.3s ease'
                  }}
                />
                <span style={{
                  color: '#475569',
                  fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                  fontWeight: 300
                }}>
                  USD
                </span>
              </div>

              <p style={{
                color: '#c9a96e',
                fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                opacity: 0.5,
                fontStyle: 'italic'
              }}>
                Minimum $1.00
              </p>
            </motion.div>

            {/* Payment button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isValidAmount ? 1 : 0.4, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <SinnersAnonymousBuyMeCoffeeButton
                amount={amount}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </motion.div>

            {/* Skip/back options */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(1rem, 3vw, 2rem)',
                marginTop: 'clamp(1.5rem, 4vw, 2rem)',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={onBack}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#334155',
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#475569')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#334155')}
              >
                <ArrowLeft size={12} />
                Leave without sealing
              </button>
            </motion.div>

          </div>
        </motion.div>
      </div>
    )
  }

  // ── STAGE 4: ABSOLVED ─────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Background />

      {/* Rising incense particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
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
              boxShadow: i % 3 === 0 ? '0 0 12px #c9a96e' : '0 0 12px #dc2626',
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
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
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
        <div style={{
          textAlign: 'center',
          maxWidth: 'clamp(20rem, 80vw, 48rem)'
        }}>

          {/* Cross */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', duration: 1.5 }}
            style={{
              marginBottom: 'clamp(2rem, 6vw, 3rem)',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div style={{
              width: 'clamp(50px, 12vw, 80px)',
              height: 'clamp(50px, 12vw, 80px)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                width: '5px',
                height: '100%',
                background: 'linear-gradient(180deg, #c9a96e, #dc2626)',
                borderRadius: '3px',
                boxShadow: '0 0 20px #c9a96e80'
              }} />
              <div style={{
                position: 'absolute',
                width: '70%',
                height: '5px',
                background: 'linear-gradient(90deg, #c9a96e, #dc2626)',
                borderRadius: '3px',
                top: '30%',
                boxShadow: '0 0 20px #c9a96e80'
              }} />
            </div>
          </motion.div>

          {/* Ego te absolvo */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              color: '#c9a96e',
              fontSize: 'clamp(0.8rem, 2.2vw, 1rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              fontWeight: 300
            }}
          >
            Ego te absolvo
          </motion.p>

          {/* Main message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            style={{
              fontSize: 'clamp(2rem, 7vw, 3.5rem)',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              color: '#fef3c7',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 300,
              lineHeight: 1.3,
              textShadow: '0 0 40px #c9a96e20'
            }}
          >
            You are absolved.
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
              margin: '0 auto clamp(1.5rem, 4vw, 2rem)'
            }}
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{
              color: '#cbd5e1',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              lineHeight: 1.9,
              fontSize: 'clamp(1rem, 2.8vw, 1.2rem)',
              fontWeight: 300,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic'
            }}
          >
            Your confession has been received.
            <br />
            Your burden has been lifted.
            <br />
            Go, and sin no more.
          </motion.p>

          {/* Scripture */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            style={{
              color: '#c9a96e',
              fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
              marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
              opacity: 0.6,
              fontStyle: 'italic',
              fontFamily: 'Georgia, serif',
              lineHeight: 1.7
            }}
          >
            &quot;Come to me, all you who are weary and burdened,
            <br />
            and I will give you rest.&quot;
            <br />
            <span style={{ fontSize: '0.85em', opacity: 0.8 }}>— Matthew 11:28</span>
          </motion.p>

          {/* Return button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 20px 50px rgba(201,169,110,0.25)'
            }}
            whileTap={{ scale: 0.96 }}
            onClick={onBack}
            style={{
              padding: 'clamp(1rem, 3vw, 1.3rem) clamp(2.5rem, 6vw, 4rem)',
              background: 'linear-gradient(135deg, #c9a96e, #a07840)',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              letterSpacing: '0.05em',
              fontFamily: 'Georgia, serif'
            }}
          >
            Leave the Booth
          </motion.button>

          {/* Privacy note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            style={{
              marginTop: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#334155',
              fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
              letterSpacing: '0.1em',
              fontWeight: 300
            }}
          >
            Anonymous • Encrypted • Gone forever 🕯️
          </motion.p>

        </div>
      </motion.div>
    </div>
  )
}

