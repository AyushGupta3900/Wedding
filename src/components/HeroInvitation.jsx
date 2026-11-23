import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ChevronDown, Sparkles, Heart, Flower2 } from 'lucide-react'
import { FloralCorner, FloralBorder, MandalaDivider, RoyalCoupleEmblem } from './FloralDecorations'
import { useLanguage } from '../context/LanguageContext'

export default function HeroInvitation() {
  const { lang, t } = useLanguage()
  const [showerCount, setShowerCount] = useState(128)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hero_pushpa_count')
      if (saved) {
        setShowerCount(parseInt(saved))
      }
    } catch (e) {}
  }, [])

  const handleShowerPetals = () => {
    const nextCount = showerCount + 1
    setShowerCount(nextCount)
    try {
      localStorage.setItem('hero_pushpa_count', nextCount.toString())
    } catch (e) {}

    // Multi-angle romantic flower petal cannon burst
    try {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.15, y: 0.65 },
        colors: ['#D4AF37', '#B76E79', '#7B1834', '#FFAA00', '#FDE8E9'],
        scalar: 1.2,
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.85, y: 0.65 },
        colors: ['#D4AF37', '#B76E79', '#7B1834', '#FFAA00', '#FDE8E9'],
        scalar: 1.2,
      })
    } catch (e) {}

    // Chime sound
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(659.25, now) // E5
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.25)
      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 1.4)
    } catch (e) {}
  }

  const scrollToNext = () => {
    const countdownEl = document.getElementById('countdown-section')
    if (countdownEl) {
      countdownEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between py-10 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDB]">
      
      {/* Top & Corner Royal Paisley Ornaments */}
      <FloralCorner className="top-0 left-0 w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52" position="top-left" />
      <FloralCorner className="top-0 right-0 w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52" position="top-right" />
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <FloralBorder />
      </div>

      {/* Main Royal Content Container - Loads cleanly without layout shift */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 max-w-3xl w-full mx-auto text-center pt-4 sm:pt-6 flex flex-col items-center justify-center my-auto"
      >
        
        {/* Auspicious Lord Ganesha & Vedic Shloka */}
        <div className="mb-4 flex flex-col items-center">
          {/* Golden Ganesha Statue with Radiant Sunburst Halo */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-2 flex items-center justify-center">
            {/* Glowing Golden Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-amber-400/40 via-amber-200/20 to-transparent blur-lg pointer-events-none" />
            <div className="absolute inset-1 rounded-full border border-[#D4AF37]/50 pointer-events-none" />
            
            <img 
              src="/static/opt/10.png" 
              alt="Lord Ganesha" 
              width="112"
              height="112"
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(123,24,52,0.25)] relative z-10 transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/static/opt/12.png'
              }}
            />
          </div>
          
          <h3 className="font-serif italic text-burgundy-950 text-base sm:text-lg tracking-[0.25em] font-bold block drop-shadow-xs">
            {t.hero.ganesh}
          </h3>
          <p className="font-serif text-xs sm:text-sm text-stone-600 italic mt-1 max-w-md mx-auto leading-relaxed">
            {lang === 'hi' 
              ? "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
              : "Mangalam Bhagwan Vishnuh • Mangalam Garudadhwajah • Mangalam Pundarikakshah"}
          </p>

          {/* Shadi Ceremony Ribbon Badge */}
          <div className="inline-flex items-center gap-2 mt-3 px-5 py-1 rounded-full bg-gradient-to-r from-amber-100/90 via-amber-50 to-amber-100/90 border border-[#D4AF37] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-serif uppercase tracking-[0.25em] text-burgundy-950 font-bold">
              {t.hero.ceremony}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>
        </div>

        {/* Cordially Invited Announcement */}
        <div className="mb-2">
          <span className="text-xs uppercase tracking-[0.35em] text-burgundy-800 font-semibold font-serif block">
            {t.hero.invited}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gold-gradient font-bold drop-shadow-sm mt-1 tracking-tight">
            {t.hero.shadi}
          </h1>

          {/* Auspicious Date Pill */}
          <div className="inline-flex items-center justify-center gap-3 mt-2 px-6 py-1.5 rounded-full bg-burgundy-900 text-amber-200 border border-amber-300/40 shadow-sm">
            <span className="text-xs sm:text-sm font-serif tracking-[0.25em] font-bold">
              {lang === 'hi' ? "सोमवार • ३० नवम्बर २०२६" : "MONDAY • 30 NOVEMBER 2026"}
            </span>
          </div>
        </div>

        {/* Grand Romantic Serif Names with Gold Accents */}
        <div className="my-4 sm:my-5">
          <div className="relative inline-block px-4 py-2">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-stone-900 tracking-wide drop-shadow-sm">
              {t.hero.groom}
            </h2>

            <div className="my-2 flex items-center justify-center gap-3">
              <span className="h-[1.5px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#ECC880]" />
              <span className="font-serif italic text-3xl sm:text-4xl text-burgundy-700 font-bold select-none px-2">
                {t.hero.and}
              </span>
              <span className="h-[1.5px] w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#ECC880]" />
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-stone-900 tracking-wide drop-shadow-sm">
              {t.hero.bride}
            </h2>
          </div>
        </div>

        {/* Traditional Indian Wedding Couple Arch (2.png) */}
        <div className="w-full my-4">
          <RoyalCoupleEmblem />
        </div>

        {/* Interactive Pushpa Varsha (Flower Petals Blessing) Action */}
        <div className="my-2 flex flex-col items-center">
          <motion.button
            onClick={handleShowerPetals}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-900 text-amber-200 border border-amber-300/50 shadow-md hover:shadow-lg transition-all cursor-pointer font-serif font-bold text-xs uppercase tracking-wider"
          >
            <Flower2 className="w-4 h-4 text-rose-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{lang === 'hi' ? "🌸 वर-वधू पर पुष्प वर्षा करें" : "🌸 Shower Flower Petals"}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </motion.button>
          
          <span className="text-[11px] text-stone-600 font-serif italic mt-1.5 flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            <span>{showerCount} {lang === 'hi' ? "बार मंगल पुष्प वर्षा अर्पित की गई" : "fragrant petals showered with love"}</span>
          </span>
        </div>

        {/* Royal Parchment Invitation Scroll Card */}
        <div className="max-w-xl mx-auto px-2 mt-2">
          <div className="relative p-5 sm:p-6 rounded-2xl bg-white/92 backdrop-blur-md border-2 border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(123,24,52,0.12)]">
            <div className="absolute inset-1.5 rounded-xl border border-[#D4AF37]/30 pointer-events-none" />
            
            <p className="relative z-10 font-serif text-sm sm:text-base text-burgundy-950 font-medium leading-relaxed italic">
              {t.hero.message}
            </p>
            
            <div className="relative z-10 mt-3 pt-2 border-t border-[#D4AF37]/30 flex items-center justify-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-burgundy-900 font-bold font-serif">
              <Heart className="w-3 h-3 text-burgundy-700 fill-burgundy-700" />
              <span>{t.hero.bond}</span>
              <Heart className="w-3 h-3 text-burgundy-700 fill-burgundy-700" />
            </div>
          </div>
        </div>

      </motion.div>

      {/* Elegant Scroll Down Prompt */}
      <div 
        className="relative z-20 pt-4 pb-2 text-center cursor-pointer select-none"
        onClick={scrollToNext}
      >
        <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy-800 font-bold block mb-1 font-serif">
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <ChevronDown className="w-5 h-5 text-burgundy-700 mx-auto" />
        </motion.div>
      </div>
    </section>
  )
}
