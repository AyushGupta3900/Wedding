import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Flame, Heart } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function InteractiveDiya() {
  const [isLit, setIsLit] = useState(false)
  const [count, setCount] = useState(148)
  const { lang, t } = useLanguage()

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shadi_diya_lit')
      if (saved) {
        setIsLit(true)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const handleLightDiya = () => {
    if (!isLit) {
      setIsLit(true)
      setCount((prev) => prev + 1)

      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.68 },
          colors: ['#ECC880', '#D4AF37', '#FF8C00', '#B76E79', '#FFF3B0'],
          scalar: 0.95,
        })
      } catch (e) {
        // ignore
      }

      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        const ctx = new AudioContext()
        const now = ctx.currentTime
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(587.33, now)
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15)
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 1.8)
      } catch (e) {
        // ignore
      }

      try {
        localStorage.setItem('shadi_diya_lit', 'true')
      } catch (e) {
        // ignore
      }
    }
  }

  return (
    <section className="relative py-14 px-4 bg-gradient-to-b from-[#FAF6EE] via-[#FDF5EB] to-[#F5EEDB] text-center overflow-hidden">
      <div className="max-w-xl mx-auto relative z-10">
        
        {/* Sacred Header */}
        <div className="inline-flex items-center gap-1.5 mb-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 shadow-sm">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-[11px] uppercase tracking-widest text-amber-900 font-bold font-serif">
            {t.diya.tag}
          </span>
          <Sparkles className="w-3 h-3 text-amber-500" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-950 mt-1">
          {t.diya.heading}
        </h3>
        
        <p className="text-xs sm:text-sm font-serif italic text-stone-600 mt-2 max-w-md mx-auto">
          {t.diya.sub}
        </p>

        {/* Interactive Diya Vessel */}
        <div className="relative my-6 flex flex-col items-center justify-center">
          
          <div className={`absolute top-6 w-36 h-36 rounded-full transition-all duration-1000 pointer-events-none ${
            isLit 
              ? 'bg-gradient-radial from-amber-400/40 via-orange-400/15 to-transparent blur-2xl scale-125' 
              : 'bg-transparent scale-90'
          }`} />

          <button
            onClick={handleLightDiya}
            disabled={isLit}
            title={isLit ? t.diya.litState : t.diya.tapPrompt}
            className={`group relative p-2 focus:outline-none transition-transform active:scale-95 ${
              !isLit ? 'cursor-pointer hover:scale-105' : 'cursor-default'
            }`}
          >
            <svg viewBox="0 0 200 160" className="w-44 h-36 sm:w-52 sm:h-40 drop-shadow-xl overflow-visible">
              <defs>
                <linearGradient id="brassMetallic3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="25%" stopColor="#ECC880" />
                  <stop offset="60%" stopColor="#D4AF37" />
                  <stop offset="85%" stopColor="#B3801D" />
                  <stop offset="100%" stopColor="#6E4A0C" />
                </linearGradient>

                <radialGradient id="brassBaseGrad3" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F5D78E" />
                  <stop offset="70%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8A5A12" />
                </radialGradient>

                <radialGradient id="diyaFlameCore3" cx="50%" cy="80%" r="60%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="20%" stopColor="#FFF7CC" />
                  <stop offset="50%" stopColor="#FFAA00" />
                  <stop offset="85%" stopColor="#FF4500" />
                  <stop offset="100%" stopColor="#990000" />
                </radialGradient>

                <linearGradient id="innerFlameGlow3" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#FFCC00" />
                  <stop offset="60%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Brass Pooja Thali Base */}
              <ellipse cx="100" cy="138" rx="72" ry="14" fill="url(#brassBaseGrad3)" stroke="#6E4A0C" strokeWidth="1" opacity="0.8" />
              <ellipse cx="100" cy="138" rx="64" ry="10" stroke="#FFF0C2" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.6"/>

              {/* Marigold Petals on Plate */}
              <circle cx="48" cy="138" r="4" fill="#FF8C00" opacity="0.8"/>
              <circle cx="58" cy="142" r="3.5" fill="#FFD700" opacity="0.8"/>
              <circle cx="152" cy="138" r="4" fill="#FF8C00" opacity="0.8"/>
              <circle cx="142" cy="142" r="3.5" fill="#FFD700" opacity="0.8"/>
              <circle cx="100" cy="144" r="3.5" fill="#CD5B78" opacity="0.7"/>

              {/* Diya Pedestal */}
              <path d="M 85,126 L 80,135 L 120,135 L 115,126 Z" fill="url(#brassMetallic3)" stroke="#5A3A05" strokeWidth="0.8"/>
              <ellipse cx="100" cy="126" rx="22" ry="5" fill="#8A5A12" />

              {/* Diya Bowl Body */}
              <path
                d="M 35,92 
                   C 35,116 65,126 100,126 
                   C 135,126 165,116 165,92 
                   C 152,86 128,82 100,82 
                   C 72,82 48,86 35,92 Z"
                fill="url(#brassMetallic3)"
                stroke="#6E4A0C"
                strokeWidth="1.2"
              />

              {/* Inner Oil Reservoir */}
              <ellipse cx="100" cy="92" rx="55" ry="11" fill={isLit ? "#FFC44D" : "#5A3810"} />
              <ellipse cx="100" cy="92" rx="46" ry="8" fill={isLit ? "#FFE885" : "#3D2408"} opacity="0.9" />

              {/* Engraved Floral Rim */}
              <path
                d="M 45,92 Q 58,100 72,94 Q 86,100 100,94 Q 114,100 128,94 Q 142,100 155,92"
                fill="none"
                stroke="#ECC880"
                strokeWidth="1.5"
                strokeDasharray="2 3"
                opacity="0.85"
              />

              {/* Spout */}
              <path d="M 94,84 Q 100,75 106,84 Z" fill="url(#brassMetallic3)" />

              {/* Cotton Wick — Anchored in the oil pool at (100, 84) to (100, 70) */}
              <path
                d="M 100,86 C 100,78 99,74 100,70"
                stroke="#3D2408"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Sacred Flame — Anchored directly to wick tip at (100, 70) */}
              {isLit && (
                <motion.g
                  animate={{
                    scaleY: [1, 1.06, 0.96, 1.04, 1],
                    scaleX: [1, 0.96, 1.04, 0.98, 1],
                    rotate: [-1.2, 1.5, -0.8, 1.2, -1.2],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: "100px 70px" }}
                >
                  <path
                    d="M 100,70 
                       C 114,64 120,48 114,32 
                       C 108,18 100,8 100,8 
                       C 100,8 92,18 86,32 
                       C 80,48 86,64 100,70 Z"
                    fill="url(#diyaFlameCore3)"
                    filter="drop-shadow(0 0 8px rgba(255, 170, 0, 0.85))"
                  />

                  <path
                    d="M 100,70 
                       C 107,66 111,54 107,42 
                       C 104,32 100,24 100,24 
                       C 100,24 96,32 93,42 
                       C 89,54 93,66 100,70 Z"
                    fill="url(#innerFlameGlow3)"
                  />

                  <ellipse cx="100" cy="67" rx="3.5" ry="5.5" fill="#FFFFFF" opacity="0.95" />
                  <circle cx="100" cy="69" r="2" fill="#FFE58F" />
                </motion.g>
              )}
            </svg>
          </button>

          {/* Diya Action / Status Caption */}
          <div className="mt-2">
            {isLit ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-semibold shadow-sm"
              >
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span>{t.diya.litState}</span>
              </motion.div>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs tracking-wider text-burgundy-900 font-bold animate-pulse">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                {t.diya.tapPrompt}
                <Flame className="w-3.5 h-3.5 text-amber-600" />
              </span>
            )}
          </div>

          {/* Live Blessing Count */}
          <div className="mt-2 text-xs text-stone-600 font-serif">
            <span className="font-bold text-burgundy-900">{count}</span> {t.diya.counter}
          </div>

        </div>

      </div>
    </section>
  )
}
