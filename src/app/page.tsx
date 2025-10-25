'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Flame } from 'lucide-react'
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
    }, 3500)

    return () => clearTimeout(introTimer)
  }, [])

  // MASSIVE flame particle system for immersive experience
  const flameParticles = useMemo(() => {
    if (!isClient) return []
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const particleCount = isMobile ? 60 : 100 // INCREASED from 30!
    
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      size: 3 + Math.random() * 6,
      intensity: Math.random()
    }))
  }, [isClient])

  // NEW: Floating embers for atmosphere
  const floatingEmbers = useMemo(() => {
    if (!isClient) return []
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const emberCount = isMobile ? 30 : 50
    
    return Array.from({ length: emberCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 8,
      size: 2 + Math.random() * 4
    }))
  }, [isClient])

  // NEW: Background sparks
  const backgroundSparks = useMemo(() => {
    if (!isClient) return []
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const sparkCount = isMobile ? 20 : 35
    
    return Array.from({ length: sparkCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 10
    }))
  }, [isClient])

  if (selectedChamber === 'sin') {
    return <SinChamber onBack={() => setSelectedChamber(null)} />
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0000 25%, #4a0000 50%, #1a0000 75%, #0f0f0f 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* MASSIVE Flame Particle System */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          {/* Main flame particles */}
          {flameParticles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.intensity > 0.7 ? '#ef4444' : '#dc2626',
                borderRadius: '50%',
                opacity: 0.5 + particle.intensity * 0.3,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow: `0 0 ${8 + particle.size}px #dc2626`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 2, 1],
                backgroundColor: ['#dc2626', '#ef4444', '#f87171', '#dc2626'],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Floating embers */}
          {floatingEmbers.map((ember) => (
            <motion.div
              key={`ember-${ember.id}`}
              style={{
                position: 'absolute',
                width: `${ember.size}px`,
                height: `${ember.size}px`,
                backgroundColor: '#fca5a5',
                borderRadius: '50%',
                opacity: 0.4,
                left: `${ember.left}%`,
                top: `${ember.top}%`,
                boxShadow: '0 0 6px #fca5a5',
              }}
              animate={{
                y: [0, -120, 0],
                x: [0, Math.sin(ember.id) * 25, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: ember.duration,
                repeat: Infinity,
                delay: ember.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Background sparks */}
          {backgroundSparks.map((spark) => (
            <motion.div
              key={`spark-${spark.id}`}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                backgroundColor: '#fbbf24',
                borderRadius: '50%',
                opacity: 0.6,
                left: `${spark.left}%`,
                top: `${spark.top}%`,
                boxShadow: '0 0 4px #fbbf24',
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: spark.duration,
                repeat: Infinity,
                delay: spark.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Intro Animation - Mobile Optimized */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000000',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 4vw, 2rem)' // Better mobile padding
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              style={{ 
                textAlign: 'center',
                maxWidth: '90vw' // Prevent overflow on mobile
              }}
            >
              <motion.h1
                initial={{ letterSpacing: '0.3em' }}
                animate={{ letterSpacing: '0.1em' }}
                transition={{ duration: 2.5 }}
                style={{
                  fontSize: 'clamp(2rem, 8vw, 6rem)', // Better mobile scaling
                  fontFamily: 'serif',
                  color: '#fef3c7',
                  marginBottom: '0.5rem',
                  fontWeight: 400,
                  lineHeight: 1.1 // Tighter mobile line height
                }}
              >
                SINNERS
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.2 }}
                style={{
                  fontSize: 'clamp(1.2rem, 5vw, 3rem)', // Better mobile scaling
                  fontFamily: 'serif',
                  color: '#dc2626',
                  marginBottom: 'clamp(1rem, 4vw, 1.5rem)',
                  fontWeight: 300,
                  fontStyle: 'italic'
                }}
              >
                Anonymous
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                  fontSize: 'clamp(0.9rem, 2.8vw, 1.2rem)', // Better mobile scaling
                  color: '#cbd5e1',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                  maxWidth: '32rem',
                  margin: '0 auto'
                }}
              >
                I collect the secrets others cannot bear...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Mobile Optimized */}
      <AnimatePresence>
        {showDoor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              padding: 'clamp(1rem, 3vw, 2rem)' // Better mobile padding
            }}
          >
            
            {/* Header - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{ 
                textAlign: 'center', 
                marginBottom: 'clamp(2rem, 5vw, 4rem)',
                padding: '0 clamp(0.5rem, 2vw, 1rem)' // Mobile padding
              }}
            >
              <h2 style={{
                fontSize: 'clamp(1.8rem, 6vw, 4rem)', // Better mobile scaling
                fontFamily: 'serif',
                color: '#fef3c7',
                marginBottom: 'clamp(0.8rem, 2.5vw, 1rem)',
                fontWeight: 300,
                textShadow: '0 0 20px #dc262650',
                lineHeight: 1.2 // Better mobile line height
              }}>
                Come to Me, Sinners
              </h2>
              
              <p style={{
                fontSize: 'clamp(0.9rem, 3vw, 1.3rem)', // Better mobile scaling
                color: '#cbd5e1',
                maxWidth: '40rem',
                margin: '0 auto',
                lineHeight: 1.4, // Better mobile readability
                fontWeight: 300
              }}>
                Your secrets are safe with me. Tell me what you&apos;ve done. I&apos;ve heard worse.
              </p>
            </motion.div>

            {/* The Confessional Door - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.8, 
                delay: 0.6,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ 
                scale: 1.03,
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }} // Mobile tap feedback
              style={{
                position: 'relative',
                cursor: 'pointer',
                maxWidth: 'clamp(280px, 85vw, 380px)', // Better mobile width
                width: '100%'
              }}
              onClick={() => setSelectedChamber('sin')}
            >
              {/* Door Structure */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(350px, 55vh, 480px)', // Better mobile height
              }}>
                
                {/* Door Frame */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(145deg, #1f1f1f, #0a0a0a)',
                  borderRadius: 'clamp(0.8rem, 2.5vw, 1.2rem) clamp(0.8rem, 2.5vw, 1.2rem) 0.4rem 0.4rem',
                  padding: 'clamp(8px, 2vw, 10px)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)'
                }}>
                  
                  {/* Door Panel */}
                  <motion.div
                    whileHover={{
                      boxShadow: '0 0 30px #dc262660',
                      borderColor: '#dc2626'
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(145deg, #2a0000, #1a0000)',
                      borderRadius: 'clamp(0.6rem, 2vw, 1rem) clamp(0.6rem, 2vw, 1rem) 0.2rem 0.2rem',
                      border: '2px solid #dc262640',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 'clamp(1rem, 3vw, 2.5rem)',
                      transition: 'all 0.4s ease',
                      backdropFilter: 'blur(8px)',
                      position: 'relative'
                    }}
                  >
                    
                    {/* Door Handle */}
                    <div style={{
                      position: 'absolute',
                      right: 'clamp(12px, 3vw, 20px)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 'clamp(10px, 2.5vw, 16px)',
                      height: 'clamp(35px, 7vw, 55px)',
                      background: 'linear-gradient(145deg, #8b0000, #4a0000)',
                      borderRadius: '6px',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)'
                    }} />
                    
                    {/* Flame Icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        marginBottom: 'clamp(0.8rem, 3vw, 1.5rem)',
                        padding: 'clamp(0.8rem, 2.5vw, 1.5rem)',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #dc262650, #ef444470)',
                        border: '2px solid #dc2626',
                        boxShadow: '0 0 25px #dc262640'
                      }}
                    >
                      <Flame 
                        size={typeof window !== 'undefined' && window.innerWidth < 768 ? 28 : 45} 
                        color="#dc2626"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    
                    {/* Door Title */}
                    <h3 style={{
                      fontSize: 'clamp(1.2rem, 4vw, 2rem)', // Better mobile scaling
                      fontFamily: 'serif',
                      color: '#fef3c7',
                      marginBottom: 'clamp(0.4rem, 1.5vw, 0.8rem)',
                      textAlign: 'center',
                      fontWeight: 400,
                      textShadow: '0 0 15px #dc262650',
                      lineHeight: 1.2
                    }}>
                      Tell Me Your Secrets
                    </h3>
                    
                    {/* Door Subtitle */}
                    <p style={{
                      color: '#dc2626',
                      fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)', // Better mobile scaling
                      textAlign: 'center',
                      marginBottom: 'clamp(0.6rem, 2vw, 1.2rem)',
                      fontStyle: 'italic',
                      fontWeight: 500
                    }}>
                      What have you done?
                    </p>
                    
                    {/* Description */}
                    <p style={{
                      color: '#cbd5e1',
                      fontSize: 'clamp(0.75rem, 2.2vw, 0.95rem)', // Better mobile scaling
                      textAlign: 'center',
                      lineHeight: 1.3,
                      marginBottom: 'clamp(0.6rem, 2vw, 1.2rem)'
                    }}>
                      I collect what others cannot bear. Tell me what haunts you.
                    </p>
                    
                    {/* Benefit */}
                    <p style={{
                      color: '#dc2626',
                      fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', // Better mobile scaling
                      textAlign: 'center',
                      fontWeight: '600',
                      textShadow: '0 0 8px #dc262630'
                    }}>
                      Every secret has a price
                    </p>
                  </motion.div>
                </div>
              </div>
              
              {/* Name Plate - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                  position: 'absolute',
                  bottom: 'clamp(-50px, -10vw, -70px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: 'clamp(0.4rem, 1.5vw, 0.7rem) clamp(1rem, 3vw, 2rem)',
                  background: 'rgba(26, 0, 0, 0.95)',
                  borderRadius: 'clamp(0.6rem, 2vw, 1rem)',
                  border: '2px solid #dc2626',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px #dc262640'
                }}
              >
                <p style={{
                  color: '#fef3c7',
                  fontSize: 'clamp(0.75rem, 2.2vw, 1rem)', // Better mobile scaling
                  margin: 0,
                  fontWeight: '600',
                  textShadow: '0 0 10px #dc262650',
                  fontStyle: 'italic'
                }}>
                  Enter... I&apos;m Waiting
                </p>
              </motion.div>
            </motion.div>

            {/* Footer - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.8 }}
              style={{
                marginTop: 'clamp(3rem, 8vw, 7rem)',
                textAlign: 'center',
                color: '#94a3b8',
                maxWidth: '32rem',
                margin: 'clamp(3rem, 8vw, 7rem) auto 0',
                padding: '0 clamp(0.5rem, 2vw, 1rem)' // Mobile padding
              }}
            >
              <p style={{ 
                fontSize: 'clamp(0.8rem, 2.3vw, 1rem)', // Better mobile scaling
                fontWeight: 300,
                marginBottom: '0.5rem',
                lineHeight: 1.4
              }}>
                Your secrets are safe with me. Anonymous. Eternal. Protected.
              </p>
              <p style={{ 
                fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', // Better mobile scaling
                color: '#dc2626',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.3
              }}>
                &quot;Come to me, all you who are heavy laden...&quot;
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
