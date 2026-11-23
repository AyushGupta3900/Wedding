import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Heart, Globe } from 'lucide-react'
import AudioPlayer from './AudioPlayer'
import { useLanguage } from '../context/LanguageContext'

// Floating Golden Stardust / Firefly Particle
function Firefly({ delay, duration, startX, startY, size }) {
  return (
    <motion.div
      initial={{ 
        x: `${startX}vw`, 
        y: `${startY}vh`, 
        opacity: 0, 
        scale: 0.6 
      }}
      animate={{
        y: [`${startY}vh`, `${startY - 18}vh`, `${startY}vh`],
        x: [`${startX}vw`, `${startX + 4}vw`, `${startX - 3}vw`, `${startX}vw`],
        opacity: [0.15, 0.85, 0.3, 0.9, 0.2],
        scale: [0.7, 1.25, 0.8, 1.3, 0.7],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: '#FFE066',
        boxShadow: `0 0 ${size * 2}px ${size}px rgba(255, 215, 0, 0.6), 0 0 ${size * 4}px ${size * 2}px rgba(236, 200, 128, 0.3)`,
        pointerEvents: 'none',
      }}
    />
  )
}

// Gentle Ambient Rose Petal drifting in the dark velvet atmosphere
function AmbientSplashPetal({ id, left, delay, duration, size, rotation }) {
  return (
    <motion.div
      initial={{ y: '-8vh', x: `${left}vw`, rotate: rotation, opacity: 0 }}
      animate={{
        y: '108vh',
        x: [`${left}vw`, `${left + 5}vw`, `${left - 4}vw`, `${left + 2}vw`],
        rotate: [rotation, rotation + 180, rotation + 360],
        opacity: [0, 0.65, 0.75, 0.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute pointer-events-none z-10"
      style={{ width: size, height: size * 1.3, pointerEvents: 'none' }}
    >
      <svg 
        viewBox="0 0 30 40" 
        className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pointer-events-none"
        style={{ pointerEvents: 'none' }}
      >
        <path
          d="M15 0 C 25 10, 30 25, 20 38 C 10 42, 2 30, 0 20 C 0 10, 8 0, 15 0 Z"
          fill="url(#ambientPetalGrad)"
          opacity="0.85"
          style={{ pointerEvents: 'none' }}
        />
        <path
          d="M15 5 C 16 18, 14 28, 12 36"
          stroke="#FFE066"
          strokeWidth="0.6"
          strokeLinecap="round"
          opacity="0.4"
          style={{ pointerEvents: 'none' }}
        />
      </svg>
    </motion.div>
  )
}

export default function EnvelopeSplash({ onOpen }) {
  // Animation stages: 'idle' | 'unsealing' | 'flap_opening' | 'letter_rising' | 'zooming'
  const [animStage, setAnimStage] = useState('idle')
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, relX: 50, relY: 50 })
  const { lang, setLang, t } = useLanguage()

  // Generate randomized fireflies
  const fireflies = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      startX: Math.random() * 96 + 2,
      startY: Math.random() * 90 + 5,
      size: Math.random() * 3 + 2.5,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 6,
    }))
  }, [])

  // Generate ambient velvet rose petals
  const ambientPetals = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 94 + 3,
      size: Math.random() * 12 + 16,
      delay: Math.random() * 8,
      duration: Math.random() * 7 + 10,
      rotation: Math.random() * 360,
    }))
  }, [])

  const handleMouseMove = (e) => {
    if (animStage !== 'idle') return
    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const x = ((clientX - left) / width - 0.5) * 8
    const y = ((clientY - top) / height - 0.5) * 8
    const relX = ((clientX - left) / width) * 100
    const relY = ((clientY - top) / height) * 100
    setMousePos({ x, y, relX, relY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: 0, y: 0, relX: 50, relY: 50 })
  }

  // Auspicious Royal Unseal Chime Sound (C5 - E5 - G5 - C6 Major Chord with Shimmer)
  const playRoyalChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      const now = ctx.currentTime

      const freqs = [523.25, 659.25, 783.99, 1046.50]
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + idx * 0.08 + 0.4)

        gain.gain.setValueAtTime(0.06, now + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 1.8)
      })
    } catch (e) {
      // Audio not permitted or supported
    }
  }

  // Celebratory Multi-Stage Confetti & Petals
  const triggerCelebrationConfetti = () => {
    try {
      // 1. Immediate golden spark burst at the center wax seal
      confetti({
        particleCount: 65,
        spread: 85,
        origin: { x: 0.5, y: 0.52 },
        colors: ['#FFE066', '#D4AF37', '#ECC880', '#FFFFFF', '#FFAA00'],
        scalar: 1.15,
      })

      // 2. Twin celebratory cannons from bottom corners at 350ms
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 65,
          origin: { x: 0.1, y: 0.75 },
          colors: ['#D4AF37', '#B76E79', '#7B1834', '#FFE066'],
          scalar: 1.25,
        })
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 65,
          origin: { x: 0.9, y: 0.75 },
          colors: ['#D4AF37', '#B76E79', '#7B1834', '#FFE066'],
          scalar: 1.25,
        })
      }, 350)
    } catch (e) {
      // ignore
    }
  }

  const handleSealClick = () => {
    if (animStage !== 'idle') return

    // Stage 1: Unseal & Chime
    setAnimStage('unsealing')
    playRoyalChime()
    triggerCelebrationConfetti()

    // Stage 2: Flap lifts open
    setTimeout(() => {
      setAnimStage('flap_opening')
    }, 280)

    // Stage 3: Letter rises out of envelope
    setTimeout(() => {
      setAnimStage('letter_rising')
    }, 650)

    // Stage 4: Cinematic camera zoom into letter
    setTimeout(() => {
      setAnimStage('zooming')
    }, 1450)

    // Stage 5: Reveal main invitation content
    setTimeout(() => {
      onOpen()
    }, 2050)
  }

  const isOpening = animStage !== 'idle'

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between sm:justify-center bg-[#140207] overflow-y-auto py-5 sm:py-6 select-none px-3 sm:px-4 min-h-screen">
      
      {/* SVG Defs for Petal Gradients & Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="ambientPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8C1D40" />
            <stop offset="50%" stopColor="#A8284C" />
            <stop offset="100%" stopColor="#5E0D24" />
          </linearGradient>
        </defs>
      </svg>

      {/* Deep Royal Velvet Backdrop with Warm Radial Glow */}
      <motion.div 
        animate={isOpening ? { opacity: [1, 0.8, 0] } : { opacity: 1 }}
        transition={{ duration: 2.1 }}
        className="fixed inset-0 bg-gradient-radial from-[#380918] via-[#1B030A] to-[#0A0104] pointer-events-none"
        style={{ pointerEvents: 'none' }}
      />

      {/* Dynamic Floating Golden Fireflies / Stardust Bokeh */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" style={{ pointerEvents: 'none' }}>
        {fireflies.map((f) => (
          <Firefly key={f.id} {...f} />
        ))}
      </div>

      {/* Ambient Falling Rose Petals in Velvet Night */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" style={{ pointerEvents: 'none' }}>
        {ambientPetals.map((p) => (
          <AmbientSplashPetal key={p.id} {...p} />
        ))}
      </div>
      
      {/* Dynamic Golden Stardust Bokeh Ambient Blooms */}
      <div className="fixed inset-0 pointer-events-none opacity-40" style={{ pointerEvents: 'none' }}>
        <motion.div 
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-500/25 blur-3xl pointer-events-none" 
          style={{ pointerEvents: 'none' }}
        />
        <motion.div 
          animate={{
            scale: [1.2, 0.95, 1.2],
            opacity: [0.1, 0.28, 0.1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-rose-600/20 blur-3xl pointer-events-none" 
          style={{ pointerEvents: 'none' }}
        />
      </div>

      {/* Floating Audio Button */}
      <AudioPlayer autoStart={false} />

      {/* Top Header: Language Switcher & Auspicious Invocation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={isOpening ? { opacity: 0, y: -40, scale: 0.9 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-30 mb-2 sm:mb-5 flex flex-col items-center text-center max-w-full"
      >
        {/* Bilingual Language Switcher Pill */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[#2E0713]/95 backdrop-blur-md border border-[#D4AF37]/70 shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-2 sm:mb-3 text-xs relative z-40">
          <Globe className="w-3.5 h-3.5 text-amber-300 ml-2.5 mr-0.5 animate-pulse pointer-events-none" />
          <span className="text-[10px] uppercase tracking-wider text-amber-200/80 mr-1 hidden sm:inline font-serif font-bold pointer-events-none">
            Language / भाषा:
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); setLang('en'); }}
            className={`px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full font-serif font-bold transition-all cursor-pointer touch-manipulation text-[11px] sm:text-xs ${
              lang === 'en'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B3801D] text-[#1A030A] shadow-sm'
                : 'text-amber-100/70 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLang('hi'); }}
            className={`px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full font-serif font-bold transition-all cursor-pointer touch-manipulation text-[11px] sm:text-xs ${
              lang === 'hi'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B3801D] text-[#1A030A] shadow-sm'
                : 'text-amber-100/70 hover:text-white'
            }`}
          >
            हिंदी
          </button>
        </div>

        {/* Vedic Invocation */}
        <span className="font-serif italic text-amber-200 text-xs sm:text-base tracking-[0.2em] sm:tracking-[0.25em] font-bold block drop-shadow-sm pointer-events-none">
          {t.splash.ganesh}
        </span>
        <div className="flex items-center gap-2 mt-0.5 sm:mt-1 pointer-events-none">
          <span className="h-[1px] w-8 sm:w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-amber-300 font-bold font-serif flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            {t.splash.weddingOf}
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
          </span>
          <span className="h-[1px] w-8 sm:w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-gold-gradient tracking-wide mt-0.5 sm:mt-1 font-bold drop-shadow-md pointer-events-none px-2">
          {t.splash.names}
        </h2>
      </motion.div>

      {/* Grand 3D Royal Envelope Container - Clickable everywhere! */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[480px] sm:max-w-[560px] aspect-[1.38/1] sm:aspect-[1.42/1] perspective-1000 z-20 cursor-pointer my-auto"
      >
        <motion.div
          onClick={handleSealClick}
          animate={
            animStage === 'zooming'
              ? { scale: [1.02, 2.4], opacity: [1, 0], y: [-30, 20] }
              : animStage === 'letter_rising'
              ? { y: 25, transition: { duration: 0.8, ease: "easeOut" } }
              : isOpening
              ? { scale: 1.02, rotateY: 0, rotateX: 0 }
              : { 
                  rotateY: mousePos.x, 
                  rotateX: -mousePos.y,
                  transition: { type: 'spring', damping: 18 } 
                }
          }
          className="relative w-full h-full rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_0_2px_rgba(212,175,55,0.45)] bg-gradient-to-b from-[#2E0713] via-[#20030C] to-[#120106] overflow-visible flex flex-col items-center justify-center p-6 cursor-pointer touch-manipulation"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ornate Gold Foil Outer Border Insets */}
          <div className="absolute inset-2.5 rounded-xl border border-[#D4AF37]/40 pointer-events-none" style={{ pointerEvents: 'none' }} />
          <div className="absolute inset-3.5 rounded-lg border border-[#ECC880]/20 pointer-events-none" style={{ pointerEvents: 'none' }} />

          {/* Dynamic Interactive Candlelight Spotlight on Envelope Paper */}
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${mousePos.relX}% ${mousePos.relY}%, rgba(255, 215, 0, 0.12), transparent 70%)`,
              pointerEvents: 'none'
            }}
          />

          {/* Golden Royal Letter Gliding Upwards out of Envelope */}
          <motion.div
            initial={{ y: 0, opacity: 0, scale: 0.95 }}
            animate={
              animStage === 'zooming'
                ? { y: -260, scale: 2.2, opacity: 0 }
                : animStage === 'letter_rising' || animStage === 'flap_opening'
                ? { y: -180, opacity: 1, scale: 1.04 }
                : { y: 0, opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-4 left-5 right-5 h-60 rounded-t-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F3EADA] border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 flex flex-col items-center justify-center z-15 pointer-events-none text-center"
            style={{ pointerEvents: 'none' }}
          >
            {/* Auspicious Ganesha Emblem */}
            <motion.div 
              animate={isOpening ? { scale: [0.8, 1.1, 1], rotate: [0, -5, 0] } : {}}
              transition={{ duration: 0.8 }}
              className="w-12 h-12 mb-1 pointer-events-none"
              style={{ pointerEvents: 'none' }}
            >
              <img src="/static/opt/10.png" alt="Ganesh" className="w-full h-full object-contain filter drop-shadow-sm pointer-events-none" style={{ pointerEvents: 'none' }} />
            </motion.div>
            
            <span className="font-serif italic text-burgundy-950 text-xs tracking-widest block font-bold pointer-events-none">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <span className="font-serif text-lg sm:text-2xl font-bold text-stone-900 mt-1 block pointer-events-none">
              {t.splash.names}
            </span>
            <div className="h-[1.5px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-1 pointer-events-none" />
            <span className="text-xs uppercase tracking-widest text-burgundy-900 font-bold mt-0.5 pointer-events-none">
              {lang === 'hi' ? "शुभ विवाह • ३० नवम्बर २०२६" : "Shadi Ceremony • 30 November 2026"}
            </span>
            <span className="text-[10px] text-stone-600 font-serif italic mt-0.5 pointer-events-none">
              Rudra Club n Resort, Kanpur Road, Lalganj
            </span>
          </motion.div>

          {/* 3D Envelope Pocket Flaps */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{ pointerEvents: 'none' }}>
            <svg 
              className="w-full h-full pointer-events-none" 
              preserveAspectRatio="none" 
              viewBox="0 0 500 360"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient id="flapBottomGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#150208" />
                  <stop offset="100%" stopColor="#24040F" />
                </linearGradient>
                <linearGradient id="flapLeftGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2A0713" />
                  <stop offset="100%" stopColor="#1C020B" />
                </linearGradient>
                <linearGradient id="flapRightGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2A0713" />
                  <stop offset="100%" stopColor="#1C020B" />
                </linearGradient>
                <linearGradient id="flapTopGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#3C091A" />
                  <stop offset="85%" stopColor="#2C0613" />
                  <stop offset="100%" stopColor="#20030C" />
                </linearGradient>
                <linearGradient id="goldFlapRimGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ECC880" />
                  <stop offset="50%" stopColor="#FFF2B2" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                {/* Moving Golden Light Shimmer traveling down flap edges */}
                <linearGradient id="movingGoldBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                  <stop offset="45%" stopColor="#D4AF37" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="55%" stopColor="#FFE066" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
                  <animate attributeName="x1" from="-100%" to="200%" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="x2" from="0%" to="300%" dur="3.5s" repeatCount="indefinite" />
                </linearGradient>
                <filter id="flapShadow3" x="-10%" y="0%" width="120%" height="150%">
                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#080104" floodOpacity="0.85"/>
                </filter>
              </defs>

              {/* Bottom pocket flap */}
              <polygon points="0,360 250,205 500,360" fill="url(#flapBottomGrad3)" stroke="#520F22" strokeWidth="1" style={{ pointerEvents: 'none' }}/>
              {/* Left side fold */}
              <polygon points="0,0 0,360 250,205" fill="url(#flapLeftGrad3)" stroke="#520F22" strokeWidth="0.8" style={{ pointerEvents: 'none' }}/>
              {/* Right side fold */}
              <polygon points="500,0 500,360 250,205" fill="url(#flapRightGrad3)" stroke="#520F22" strokeWidth="0.8" style={{ pointerEvents: 'none' }}/>

              {/* Top envelope flap with 3D folding physics */}
              <motion.g
                animate={
                  animStage === 'idle'
                    ? { rotateX: 0, opacity: 1 }
                    : animStage === 'unsealing'
                    ? { rotateX: 25, opacity: 1 }
                    : { rotateX: 180, opacity: 0.15 }
                }
                transition={{ duration: 0.75, ease: "easeInOut" }}
                style={{ transformOrigin: "250px 0px", pointerEvents: 'none' }}
              >
                {/* Triangular top flap */}
                <polygon 
                  points="0,0 500,0 250,205" 
                  fill="url(#flapTopGrad3)" 
                  filter="url(#flapShadow3)"
                  style={{ pointerEvents: 'none' }}
                />
                {/* Gold foil embossed rim along flap edges */}
                <polyline 
                  points="0,0 250,205 500,0" 
                  stroke="url(#goldFlapRimGrad3)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  style={{ pointerEvents: 'none' }}
                />
                {/* Dynamic Travelling Shimmer Beam along rim */}
                <polyline 
                  points="0,0 250,205 500,0" 
                  stroke="url(#movingGoldBeam)" 
                  strokeWidth="2.8" 
                  strokeLinecap="round"
                  style={{ pointerEvents: 'none' }}
                />
                <polyline 
                  points="10,4 250,198 490,4" 
                  stroke="#ECC880" 
                  strokeWidth="1" 
                  opacity="0.85"
                  style={{ pointerEvents: 'none' }}
                />
              </motion.g>
            </svg>
          </div>

          {/* Golden Radiant Light Explosion when unsealed */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: 8, opacity: [0, 1, 0.9, 0] }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="absolute z-35 w-60 h-60 rounded-full pointer-events-none bg-gradient-radial from-amber-100 via-amber-300/80 to-transparent blur-xl"
                style={{ pointerEvents: 'none' }}
              />
            )}
          </AnimatePresence>

          {/* Pulsing Concentric Golden Aura Ripple Rings radiating from Wax Seal */}
          {animStage === 'idle' && (
            <div className="absolute z-15 pointer-events-none flex items-center justify-center" style={{ pointerEvents: 'none' }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.65, 0.3, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: i * 0.9,
                    ease: "easeOut",
                  }}
                  className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-amber-300/60 shadow-[0_0_15px_rgba(255,215,0,0.4)] pointer-events-none"
                  style={{ pointerEvents: 'none' }}
                />
              ))}
            </div>
          )}

          {/* Orbiting Celestial Golden Sparkles around Wax Seal */}
          {animStage === 'idle' && (
            <div className="absolute z-25 pointer-events-none w-36 h-36 sm:w-44 sm:h-44" style={{ pointerEvents: 'none' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative pointer-events-none"
                style={{ pointerEvents: 'none' }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_8px_#FFE066] pointer-events-none" style={{ pointerEvents: 'none' }} />
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_6px_#FFE066] pointer-events-none" style={{ pointerEvents: 'none' }} />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-100 shadow-[0_0_8px_#FFE066] pointer-events-none" style={{ pointerEvents: 'none' }} />
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_6px_#FFE066] pointer-events-none" style={{ pointerEvents: 'none' }} />
              </motion.div>
            </div>
          )}

          {/* Candlelight Pulsing Glow behind Wax Seal */}
          <div 
            className={`absolute z-20 w-44 h-44 rounded-full pointer-events-none transition-all duration-700 ${
              isHovered ? 'bg-amber-300/60 blur-2xl scale-135' : 'bg-amber-400/25 blur-xl scale-100'
            }`} 
            style={{ pointerEvents: 'none' }}
          />

          {/* Splitting / Cracking 3D Molten Wax Medallion Seal */}
          <motion.div
            onClick={(e) => {
              e.stopPropagation()
              handleSealClick()
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={animStage === 'idle' ? { scale: 1.1 } : {}}
            whileTap={animStage === 'idle' ? { scale: 0.92 } : {}}
            animate={
              animStage === 'unsealing'
                ? { scale: [1, 1.3], filter: "drop-shadow(0 0 45px rgba(255,224,102,1))" }
                : animStage !== 'idle'
                ? { scale: 0, opacity: 0, transition: { duration: 0.5 } }
                : { 
                    y: [0, -4, 0],
                    filter: isHovered 
                      ? "drop-shadow(0 0 25px rgba(255,215,0,0.85)) drop-shadow(0 14px 30px rgba(0,0,0,0.85))"
                      : "drop-shadow(0 0 12px rgba(212,175,55,0.4)) drop-shadow(0 14px 30px rgba(0,0,0,0.85))"
                  }
            }
            transition={
              animStage === 'idle'
                ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.4 }
            }
            className="relative z-40 w-28 h-28 sm:w-32 sm:h-32 rounded-full focus:outline-none cursor-pointer touch-manipulation flex items-center justify-center select-none"
          >
            <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible pointer-events-none" style={{ pointerEvents: 'none' }}>
              <defs>
                {/* Deep Ruby Molten Wax Gradient */}
                <radialGradient id="royalWaxGrad3" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFC7C7" />
                  <stop offset="18%" stopColor="#DF4F68" />
                  <stop offset="50%" stopColor="#A81938" />
                  <stop offset="80%" stopColor="#6E0B20" />
                  <stop offset="100%" stopColor="#3E0310" />
                </radialGradient>

                <linearGradient id="goldSealBevel3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="40%" stopColor="#ECC880" />
                  <stop offset="75%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8A5A12" />
                </linearGradient>

                <filter id="wax3DShading3" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0A0103" floodOpacity="0.8"/>
                </filter>
              </defs>

              {/* Natural Organic Scalloped Wax Droplet Contour */}
              <path
                d="M 60,3 
                   C 78,2 88,9 99,18 
                   C 110,27 117,38 118,54 
                   C 119,70 112,85 103,96 
                   C 94,107 79,117 62,118 
                   C 45,119 30,113 19,103 
                   C 8,93 2,79 3,63 
                   C 4,47 11,33 22,21 
                   C 33,10 45,4 60,3 Z"
                fill="url(#royalWaxGrad3)"
                filter="url(#wax3DShading3)"
              />

              {/* Stamped Golden Beaded Inner Rings */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="url(#goldSealBevel3)"
                strokeWidth="2.5"
                strokeDasharray="2 3"
                opacity="0.95"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke="#520B19"
                strokeWidth="1.5"
                opacity="0.9"
              />

              {/* Embossed S & S Monogram */}
              <text
                x="60"
                y="66"
                textAnchor="middle"
                fontFamily="'Playfair Display', Georgia, serif"
                fontSize="22"
                fontWeight="800"
                fontStyle="italic"
                fill="#FFF4E0"
                stroke="#420612"
                strokeWidth="0.8"
                letterSpacing="1"
              >
                {lang === 'hi' ? "स & स" : "S & S"}
              </text>

              {/* Tiny Golden Crown / Heart under Monogram */}
              <path
                d="M 55,73 C 57,71 60,73 60,74 C 60,73 63,71 65,73 C 65,75 60,78 60,78 C 60,78 55,75 55,73 Z"
                fill="#ECC880"
                stroke="#8A5A12"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>

          {/* Tap Prompt Below Wax Seal - Clickable! */}
          <div 
            onClick={(e) => {
              e.stopPropagation()
              handleSealClick()
            }}
            className="absolute bottom-4 sm:bottom-5 z-40 text-center cursor-pointer touch-manipulation"
          >
            <motion.span 
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs tracking-wider text-amber-200 font-bold flex items-center justify-center gap-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-serif cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin pointer-events-none" style={{ animationDuration: '4s' }} />
              <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300 inline pointer-events-none" />
              {t.splash.sealPrompt}
              <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300 inline pointer-events-none" />
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin pointer-events-none" style={{ animationDuration: '4s' }} />
            </motion.span>
          </div>

        </motion.div>
      </div>

      {/* Footer Date & Venue Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-30 mt-5 text-center pointer-events-none"
        style={{ pointerEvents: 'none' }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-amber-200/90 font-bold font-serif drop-shadow-xs">
          {lang === 'hi' 
            ? "३० नवम्बर २०२६ • रुद्र क्लब एंड रिसॉर्ट, लालगंज" 
            : "30 November 2026 • Rudra Club n Resort, Lalganj"}
        </span>
      </motion.div>

    </div>
  )
}
