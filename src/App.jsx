import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnvelopeSplash from './components/EnvelopeSplash'
import HeroInvitation from './components/HeroInvitation'
import CountdownTimer from './components/CountdownTimer'
import InteractiveDiya from './components/InteractiveDiya'
import ShadiItinerary from './components/ShadiItinerary'
import VenueSection from './components/VenueSection'
import RSVPSection from './components/RSVPSection'
import AudioPlayer from './components/AudioPlayer'
import PetalShower from './components/PetalShower'
import SparkleCursor from './components/SparkleCursor'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Flower2, Heart, Globe } from 'lucide-react'

function WeddingContent() {
  const [isOpened, setIsOpened] = useState(false)
  const [showPetals, setShowPetals] = useState(true)
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-stone-800 relative selection:bg-amber-200 selection:text-burgundy-950 overflow-x-hidden">
      
      {/* Golden Stardust Sparkle Cursor Trail */}
      <SparkleCursor />

      {/* 1. Opening Envelope & Wax Seal Splash Screen */}
      <AnimatePresence>
        {!isOpened && (
          <EnvelopeSplash onOpen={() => setIsOpened(true)} />
        )}
      </AnimatePresence>

      {/* Main Wedding Invitation Content */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen w-full flex flex-col items-center bg-[#FAF7F0]"
        >
          {/* Royal Luxury Gold Viewport Border Insets */}
          <div className="fixed inset-2 sm:inset-3 border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl pointer-events-none z-30" />
          <div className="fixed inset-3 sm:inset-4 border border-[#7B1834]/20 rounded-xl sm:rounded-2xl pointer-events-none z-30" />

          {/* Floating Falling Rose Petals Shower */}
          <PetalShower active={showPetals} count={24} />

          {/* Sticky Full-Width Luxury Navigation Bar */}
          <header className="sticky top-0 z-40 w-full bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#D4AF37]/40 py-2 px-3 sm:py-2.5 sm:px-8 flex items-center justify-between transition-all shadow-xs">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full bg-gradient-to-tr from-burgundy-950 via-burgundy-900 to-burgundy-800 text-amber-200 font-serif italic text-[11px] sm:text-xs font-bold flex items-center justify-center shadow-sm border border-amber-300/50">
                {lang === 'hi' ? "स&स" : "S&S"}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-serif italic font-bold text-burgundy-950 text-xs sm:text-base leading-none tracking-wide truncate">
                  {t.header.names}
                </span>
                <span className="text-[10px] text-stone-600 font-serif tracking-wider hidden md:block mt-0.5">
                  {t.header.sub}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher Pill */}
              <div className="flex items-center bg-white border border-[#D4AF37]/50 rounded-full p-0.5 shadow-xs">
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 sm:px-3 rounded-full text-[11px] sm:text-xs font-serif font-bold transition-all ${
                    lang === 'en'
                      ? 'bg-gradient-to-r from-burgundy-900 to-burgundy-800 text-amber-100 shadow-xs'
                      : 'text-stone-600 hover:text-burgundy-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('hi')}
                  className={`px-2 py-0.5 sm:px-3 rounded-full text-[11px] sm:text-xs font-serif font-bold transition-all ${
                    lang === 'hi'
                      ? 'bg-gradient-to-r from-burgundy-900 to-burgundy-800 text-amber-100 shadow-xs'
                      : 'text-stone-600 hover:text-burgundy-900'
                  }`}
                >
                  हिंदी
                </button>
              </div>

              {/* Petal Shower Toggle Button */}
              <button
                onClick={() => setShowPetals(!showPetals)}
                title={showPetals ? "Pause Rose Petal Shower" : "Enable Rose Petal Shower"}
                className={`flex items-center gap-1 p-1.5 sm:px-3 sm:py-1 rounded-full text-xs font-serif transition-colors border ${
                  showPetals 
                    ? 'bg-rose-50 text-burgundy-900 border-rose-200 shadow-xs font-semibold' 
                    : 'bg-white text-stone-500 border-stone-200'
                }`}
              >
                <Flower2 className={`w-3.5 h-3.5 ${showPetals ? 'text-burgundy-700' : 'text-stone-400'}`} />
                <span className="hidden sm:inline">{showPetals ? t.header.petalsOn : t.header.petalsOff}</span>
              </button>

              {/* Attendance Action Anchor */}
              <a
                href="#rsvp-section"
                className="px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-burgundy-900 to-burgundy-800 hover:from-burgundy-950 hover:to-burgundy-900 text-amber-100 text-[11px] sm:text-xs font-serif uppercase tracking-wider sm:tracking-widest transition-all shadow-sm border border-amber-300/40 font-bold whitespace-nowrap"
              >
                {t.header.rsvp}
              </a>
            </div>
          </header>

          {/* Invitation Sections Container - Full width with balanced max-w presentation */}
          <main className="w-full">
            {/* 2. Hero & Shadi Invitation Section */}
            <HeroInvitation />

            {/* 3. Live Countdown Timer Section */}
            <CountdownTimer />

            {/* 4. Auspicious Interactive Diya Section */}
            <InteractiveDiya />

            {/* 5. Order of Celebrations / Shadi Night Itinerary */}
            <ShadiItinerary />

            {/* 6. Venue & Interactive Map Section */}
            <VenueSection />

            {/* 7. Interactive RSVP Section */}
            <RSVPSection />
          </main>

          {/* Grand Royal Footer */}
          <footer className="w-full py-10 px-4 text-center bg-[#180309] text-amber-200/90 text-xs border-t-2 border-[#D4AF37] relative z-20">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-300">
              <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-serif tracking-widest uppercase text-xs sm:text-sm font-bold">
                {lang === 'hi' ? "शुभ विवाह • सर्वेश सोनी संग संजना वर्मा" : "Shadi Ceremony • Sarvesh Soni & Sanjana Verma"}
              </span>
              <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
            <p className="font-serif italic text-sm sm:text-base text-amber-100/90">
              {lang === 'hi' ? "सोमवार, ३० नवम्बर २०२६ • सायं ८:०० बजे से" : "Monday, November 30, 2026 • 8:00 PM onwards"}
            </p>
            <p className="text-xs text-stone-400 mt-1 font-serif">
              Rudra Club n Resort, Kanpur Road, Lalganj, Uttar Pradesh
            </p>
          </footer>

          {/* Floating Audio Toggle (Bottom-Right corner) */}
          <AudioPlayer autoStart={true} />
        </motion.div>
      )}

    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <WeddingContent />
    </LanguageProvider>
  )
}
