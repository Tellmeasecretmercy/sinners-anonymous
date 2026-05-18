'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import SinChamber from './components/chambers/SinChamber'

type ChamberType = 'sin' | null

export default function HomePage() {
  const [selectedChamber, setSelectedChamber] = useState<ChamberType>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [showDoor, setShowDoor] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const introTimer = setTimeout(() => {
      setShowIntro(false)
      setShowDoor(true)
    }, 4000)
    return () => clearTimeout(introTimer)
  }, [])

  // Candlelight particles — warm amber + deep red
  const candleParticles = useMemo(() => {
    if (!isClient) return []
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const count = isMobile ? 40 : 70
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 6,
      size: 2 + Math.random() * 5,
      isGold: i % 3 === 0
    }))
  }, [isClient])

  // Floating smoke wisps
  const smokeWisps = useMemo(() => {
    if (!isClient) return []
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const count = isMobile ? 15 : 25
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 10,
      size: 4 + Math.random() * 6
    }))
  }, [isClient])

  // Background sparks
  const sparks = useMemo(() => {
    if (!isClient) return []
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const count = isMobile ? 15 : 30
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 8
    }))
  }, [isClient])

  if (selectedChamber === 'sin') {
    return <SinChamber onBack={() => setSelectedChamber(null)} />
  }

  return (
    <div style={{
      minHeight: '100vh',
      // Dark wood + candlelight — confession booth
      background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0a00 25%, #2d1200 55%, #1a0a00 80%, #0a0a0a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* ── PARTICLE SYSTEM ── */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>

          {/* Candlelight particles */}
          {candleParticles.map((p) => (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.isGold ? '#c9a96e' : '#dc2626',
                borderRadius: '50%',
                left: `${p.left}%`,
                top: `${p.top}%`,
                boxShadow: p.isGold
                  ? `0 0 ${p.size * 2}px #c9a96e`
                  : `0 0 ${p.size * 2}px #dc2626`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Smoke wisps rising from bottom */}
          {smokeWisps.map((w) => (
            <motion.div
              key={`smoke-${w.id}`}
              style={{
                position: 'absolute',
                width: `${w.size}px`,
                height: `${w.size}px`,
                backgroundColor: 'rgba(201, 169, 110, 0.15)',
                borderRadius: '50%',
                left: `${w.left}%`,
                bottom: 0,
                filter: 'blur(4px)'
              }}
              animate={{
                y: [0, -300],
                x: [0, Math.sin(w.id) * 40, 0],
                opacity: [0, 0.3, 0],
                scale: [1, 4, 6],
              }}
              transition={{
                duration: w.duration,
                repeat: Infinity,
                delay: w.delay,
                ease: 'easeOut'
              }}
            />
          ))}

          {/* Gold sparks */}
          {sparks.map((s) => (
            <motion.div
              key={`spark-${s.id}`}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                backgroundColor: '#c9a96e',
                borderRadius: '50%',
                left: `${s.left}%`,
                top: `${s.top}%`,
                boxShadow: '0 0 4px #c9a96e',
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                delay: s.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />

      {/* ── INTRO SCREEN ── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000000',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 4vw, 2rem)'
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{
                textAlign: 'center',
                maxWidth: '90vw'
              }}
            >
              {/* Candle flicker on intro */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                style={{
                  fontSize: 'clamp(3rem, 10vw, 5rem)',
                  marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                  filter: 'drop-shadow(0 0 30px #c9a96e)'
                }}
              >
                <motion.span
                  animate={{
                    filter: [
                      'drop-shadow(0 0 20px #c9a96e)',
                      'drop-shadow(0 0 40px #c9a96e)',
                      'drop-shadow(0 0 15px #c9a96e)',
                      'drop-shadow(0 0 35px #c9a96e)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🕯️
                </motion.span>
              </motion.div>

              {/* Bless me Father */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                style={{
                  fontSize: 'clamp(1.8rem, 7vw, 5rem)',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  color: '#fef3c7',
                  marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.2,
                  textShadow: '0 0 40px #c9a96e20'
                }}
              >
                Bless me, Father.
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.5 }}
                style={{
                  fontSize: 'clamp(1.2rem, 5vw, 3.2rem)',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  color: '#dc2626',
                  marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  textShadow: '0 0 30px #dc262640'
                }}
              >
                For I have sinned.
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                style={{
                  width: '60px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #c9a96e60, transparent)',
                  margin: '0 auto clamp(1rem, 3vw, 1.5rem)'
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3, duration: 1 }}
                style={{
                  fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
                  color: '#94a3b8',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1.6
                }}
              >
                The booth is open.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <AnimatePresence>
        {showDoor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              padding: 'clamp(1rem, 3vw, 2rem)'
            }}
          >

            {/* ── HEADER ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{
                textAlign: 'center',
                marginBottom: 'clamp(2.5rem, 6vw, 5rem)',
                padding: '0 clamp(0.5rem, 2vw, 1rem)'
              }}
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  color: '#c9a96e',
                  fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                  fontWeight: 300
                }}
              >
                The Confession Booth
              </motion.p>

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
                fontSize: 'clamp(1.3rem, 4.5vw, 2.8rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#dc2626',
                marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                textShadow: '0 0 30px #dc262630'
              }}>
                For I have sinned.
              </h2>

              {/* Divider */}
              <div style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #c9a96e50, transparent)',
                margin: '0 auto clamp(1.2rem, 3vw, 2rem)'
              }} />

              <p style={{
                fontSize: 'clamp(0.95rem, 2.8vw, 1.2rem)',
                color: '#94a3b8',
                maxWidth: '36rem',
                margin: '0 auto',
                lineHeight: 1.7,
                fontWeight: 300,
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic'
              }}>
                No priest. No judgment. No one who knows your name.
                <br />
                Just you, your truth, and the silence of the booth.
              </p>
            </motion.div>

            {/* ── THE CONFESSION BOOTH DOOR ── */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.8,
                delay: 0.6,
                type: 'spring',
                stiffness: 70
              }}
              whileHover={{
                scale: 1.02,
                y: -8,
                transition: { duration: 0.4 }
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                position: 'relative',
                cursor: 'pointer',
                maxWidth: 'clamp(260px, 80vw, 360px)',
                width: '100%'
              }}
              onClick={() => setSelectedChamber('sin')}
            >
              {/* Ambient glow behind door */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }}
              />

              {/* Door structure */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(380px, 58vh, 500px)',
              }}>

                {/* Outer frame — dark wood */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(145deg, #2a1a0a, #0f0800)',
                  borderRadius: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem) 0.3rem 0.3rem',
                  padding: 'clamp(8px, 2vw, 12px)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(201,169,110,0.1)'
                }}>

                  {/* Inner door panel */}
                  <motion.div
                    whileHover={{
                      boxShadow: '0 0 40px rgba(201,169,110,0.15), inset 0 0 30px rgba(201,169,110,0.03)',
                      borderColor: 'rgba(201,169,110,0.4)'
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(160deg, #1a0d00, #0f0800, #1a0d00)',
                      borderRadius: 'clamp(0.7rem, 2vw, 1.2rem) clamp(0.7rem, 2vw, 1.2rem) 0.2rem 0.2rem',
                      border: '1px solid rgba(201,169,110,0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                      transition: 'all 0.5s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Wood grain texture overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        rgba(201,169,110,0.01) 2px,
                        rgba(201,169,110,0.01) 4px
                      )`,
                      pointerEvents: 'none'
                    }} />

                    {/* Door handle */}
                    <div style={{
                      position: 'absolute',
                      right: 'clamp(12px, 3vw, 18px)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 'clamp(8px, 2vw, 12px)',
                      height: 'clamp(40px, 8vw, 60px)',
                      background: 'linear-gradient(145deg, #c9a96e, #8a6a30)',
                      borderRadius: '6px',
                      boxShadow: '0 0 10px rgba(201,169,110,0.3), inset 0 2px 4px rgba(0,0,0,0.5)'
                    }} />

                    {/* Cross above candle */}
                    <div style={{
                      position: 'relative',
                      width: 'clamp(20px, 5vw, 28px)',
                      height: 'clamp(28px, 7vw, 38px)',
                      marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        transform: 'translateX(-50%)',
                        width: '3px',
                        height: '100%',
                        background: 'linear-gradient(180deg, #c9a96e, #8a6a30)',
                        borderRadius: '2px',
                        boxShadow: '0 0 8px #c9a96e60'
                      }} />
                      <div style={{
                        position: 'absolute',
                        left: '15%',
                        top: '28%',
                        width: '70%',
                        height: '3px',
                        background: 'linear-gradient(90deg, #c9a96e, #8a6a30)',
                        borderRadius: '2px',
                        boxShadow: '0 0 8px #c9a96e60'
                      }} />
                    </div>

                    {/* Candle */}
                    <motion.div
                      animate={{
                        filter: [
                          'drop-shadow(0 0 15px #c9a96e)',
                          'drop-shadow(0 0 25px #c9a96e)',
                          'drop-shadow(0 0 10px #c9a96e)',
                          'drop-shadow(0 0 20px #c9a96e)',
                        ]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        fontSize: 'clamp(2rem, 6vw, 3rem)',
                        marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
                      }}
                    >
                      🕯️
                    </motion.div>

                    {/* Door title */}
                    <h3 style={{
                      fontSize: 'clamp(1.1rem, 3.5vw, 1.7rem)',
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      color: '#fef3c7',
                      marginBottom: 'clamp(0.4rem, 1.5vw, 0.7rem)',
                      textAlign: 'center',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      textShadow: '0 0 20px #c9a96e30'
                    }}>
                      Enter the Booth
                    </h3>

                    {/* Subtitle */}
                    <p style={{
                      color: '#dc2626',
                      fontSize: 'clamp(0.8rem, 2.3vw, 1rem)',
                      textAlign: 'center',
                      marginBottom: 'clamp(0.8rem, 2.5vw, 1.2rem)',
                      fontStyle: 'italic',
                      fontFamily: 'Georgia, serif'
                    }}>
                      It&apos;s been a while since your last confession.
                    </p>

                    {/* Description */}
                    <p style={{
                      color: '#94a3b8',
                      fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                      textAlign: 'center',
                      lineHeight: 1.6,
                      marginBottom: 'clamp(0.8rem, 2.5vw, 1.2rem)',
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                      fontWeight: 300
                    }}>
                      Say what you cannot say anywhere else.
                      <br />
                      Be heard. Be released.
                    </p>

                    {/* Price note */}
                    <p style={{
                      color: '#c9a96e',
                      fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
                      textAlign: 'center',
                      fontWeight: 400,
                      letterSpacing: '0.05em',
                      opacity: 0.8
                    }}>
                     
                    </p>

                  </motion.div>
                </div>
              </div>

              {/* Name plate */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                style={{
                  position: 'absolute',
                  bottom: 'clamp(-45px, -9vw, -60px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: 'clamp(0.4rem, 1.5vw, 0.6rem) clamp(1.2rem, 3vw, 2rem)',
                  background: 'rgba(15, 8, 0, 0.95)',
                  borderRadius: '0.4rem',
                  border: '1px solid rgba(201,169,110,0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(201,169,110,0.1)',
                  whiteSpace: 'nowrap'
                }}
              >
                <p style={{
                  color: '#c9a96e',
                  fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                  margin: 0,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.05em'
                }}>
                  The booth is open 🕯️
                </p>
              </motion.div>
            </motion.div>

            {/* ── FOOTER ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 2 }}
              style={{
                marginTop: 'clamp(4rem, 10vw, 8rem)',
                textAlign: 'center',
                maxWidth: '32rem',
                padding: '0 clamp(1rem, 3vw, 2rem)'
              }}
            >
              {/* Divider */}
              <div style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #c9a96e30, transparent)',
                margin: '0 auto clamp(1rem, 3vw, 1.5rem)'
              }} />

              <p style={{
                fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
                fontWeight: 300,
                color: '#475569',
                marginBottom: '0.75rem',
                lineHeight: 1.6
              }}>
                Anonymous. Encrypted. Gone forever.
              </p>

              <p style={{
                fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
                color: '#c9a96e',
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif',
                opacity: 0.6,
                lineHeight: 1.7
              }}>
                &quot;Come to me, all you who are weary and burdened,
                <br />
                and I will give you rest.&quot;
                <br />
                <span style={{ fontSize: '0.85em', opacity: 0.7 }}>— Matthew 11:28</span>
              </p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
