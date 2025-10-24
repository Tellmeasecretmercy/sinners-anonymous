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
    }, 4500) // Longer intro for dramatic effect

    return () => clearTimeout(introTimer)
  }, [])

  // Generate stable flame particles only on client
  const flameParticles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 4
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
      
      {/* Flickering Flame Particles - Only render on client */}
      {isClient && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          {flameParticles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                width: '6px',
                height: '6px',
                backgroundColor: '#dc2626',
                borderRadius: '50%',
                opacity: 0.6,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow: '0 0 10px #dc2626',
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
                backgroundColor: ['#dc2626', '#ef4444', '#dc2626'],
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

      {/* Dark Confessor Intro Animation */}
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
              justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
              style={{ textAlign: 'center' }}
            >
              <motion.h1
                initial={{ letterSpacing: '0.5em', textShadow: '0 0 0px #dc2626' }}
                animate={{ 
                  letterSpacing: '0.2em',
                  textShadow: '0 0 30px #dc2626'
                }}
                transition={{ duration: 3.5 }}
                style={{
                  fontSize: 'clamp(3rem, 12vw, 8rem)',
                  fontFamily: 'serif',
                  color: '#fef3c7',
                  marginBottom: '1rem',
                  fontWeight: 400
                }}
              >
                SINNERS
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1.5 }}
                style={{
                  fontSize: 'clamp(2rem, 8vw, 4rem)',
                  fontFamily: 'serif',
                  color: '#dc2626',
                  marginBottom: '2rem',
                  fontWeight: 300,
                  fontStyle: 'italic'
                }}
              >
                Anonymous
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                style={{
                  fontSize: '1.4rem',
                  color: '#cbd5e1',
                  fontWeight: 300,
                  fontStyle: 'italic'
                }}
              >
                I collect the secrets others cannot bear...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - The Dark Confessor's Door */}
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
              padding: '2rem 1rem'
            }}
          >
            
            {/* Dark Confessor Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h2 style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontFamily: 'serif',
                color: '#fef3c7',
                marginBottom: '1rem',
                fontWeight: 300,
                textShadow: '0 0 25px #dc262650'
              }}>
                Come Here, You Sinners
              </h2>
              
              <p style={{
                fontSize: 'clamp(1.125rem, 4vw, 1.6rem)',
                color: '#cbd5e1',
                maxWidth: '45rem',
                margin: '0 auto',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                I'm listening... Your secrets are safe with me. 
                Tell me what you've done. I've heard worse.
              </p>
            </motion.div>

            {/* The Single Dark Confessional Door */}
            <motion.div
              initial={{ opacity: 0, y: 100, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                duration: 2.5, 
                delay: 1,
                type: "spring",
                stiffness: 70
              }}
              whileHover={{ 
                scale: 1.05,
                y: -20,
                rotateY: 5,
                transition: { duration: 0.4 }
              }}
              style={{
                position: 'relative',
                cursor: 'pointer',
                perspective: '1000px',
                maxWidth: '420px',
                width: '100%'
              }}
              onClick={() => setSelectedChamber('sin')}
            >
              {/* Gothic Door Structure */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '520px',
                transformStyle: 'preserve-3d'
              }}>
                
                {/* Door Frame */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(145deg, #1f1f1f, #0a0a0a)',
                  borderRadius: '1.5rem 1.5rem 0.5rem 0.5rem',
                  padding: '12px',
                  boxShadow: '0 35px 70px rgba(0, 0, 0, 0.9)'
                }}>
                  
                  {/* Door Panel */}
                  <motion.div
                    whileHover={{
                      boxShadow: '0 0 50px #dc262660',
                      borderColor: '#dc2626'
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(145deg, #2a0000, #1a0000)',
                      borderRadius: '1.25rem 1.25rem 0.25rem 0.25rem',
                      border: '3px solid #dc262640',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '3rem 2rem',
                      transition: 'all 0.5s ease',
                      backdropFilter: 'blur(10px)',
                      position: 'relative'
                    }}
                  >
                    
                    {/* Gothic Door Handle */}
                    <div style={{
                      position: 'absolute',
                      right: '25px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '18px',
                      height: '65px',
                      background: 'linear-gradient(145deg, #8b0000, #4a0000)',
                      borderRadius: '9px',
                      boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.6)'
                    }} />
                    
                    {/* Flame Icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, 8, -8, 0]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        marginBottom: '2rem',
                        padding: '1.8rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #dc262650, #ef444470)',
                        border: '3px solid #dc2626',
                        boxShadow: '0 0 35px #dc262640'
                      }}
                    >
                      <Flame 
                        size={55} 
                        color="#dc2626"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    
                    {/* Door Title */}
                    <h3 style={{
                      fontSize: '2.4rem',
                      fontFamily: 'serif',
                      color: '#fef3c7',
                      marginBottom: '1rem',
                      textAlign: 'center',
                      fontWeight: 400,
                      textShadow: '0 0 20px #dc262650'
                    }}>
                      Tell Me Your Secrets
                    </h3>
                    
                    {/* Door Subtitle */}
                    <p style={{
                      color: '#dc2626',
                      fontSize: '1.2rem',
                      textAlign: 'center',
                      marginBottom: '1.5rem',
                      fontStyle: 'italic',
                      fontWeight: 500
                    }}>
                      I'm listening... what have you done?
                    </p>
                    
                    {/* Description */}
                    <p style={{
                      color: '#cbd5e1',
                      fontSize: '1.05rem',
                      textAlign: 'center',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem'
                    }}>
                      I collect the sins others cannot bear.
                      Tell me what haunts you.
                    </p>
                    
                    {/* Benefit */}
                    <p style={{
                      color: '#dc2626',
                      fontSize: '1rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      textShadow: '0 0 12px #dc262630'
                    }}>
                      Every secret has a price • I've heard worse
                    </p>
                  </motion.div>
                </div>
                
                {/* Door Shadow */}
                <div style={{
                  position: 'absolute',
                  bottom: '-35px',
                  left: '15px',
                  right: '15px',
                  height: '35px',
                  background: 'radial-gradient(ellipse, rgba(220, 38, 38, 0.4) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(18px)'
                }} />
              </div>
              
              {/* Dark Confessor Name Plate */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                style={{
                  position: 'absolute',
                  bottom: '-85px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '0.8rem 2.5rem',
                  background: 'rgba(26, 0, 0, 0.95)',
                  borderRadius: '1.5rem',
                  border: '2px solid #dc2626',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 25px #dc262640'
                }}
              >
                <p style={{
                  color: '#fef3c7',
                  fontSize: '1.1rem',
                  margin: 0,
                  fontWeight: '600',
                  textShadow: '0 0 12px #dc262650',
                  fontStyle: 'italic'
                }}>
                  Enter... I'm Waiting
                </p>
              </motion.div>
            </motion.div>

            {/* Dark Confessor Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 3 }}
              style={{
                marginTop: '8rem',
                textAlign: 'center',
                color: '#94a3b8'
              }}
            >
              <p style={{ 
                fontSize: '1.1rem',
                fontWeight: 300,
                marginBottom: '0.8rem'
              }}>
               Your secrets are safe with me. Anonymous. Eternal. Protected.
              </p>
              <p style={{ 
                fontSize: '1rem',
                color: '#dc2626',
                fontStyle: 'italic',
                fontWeight: 400
              }}>
                "Come to me, all you who are heavy laden with sin..."
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
