import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function CountdownTimer() {
  const { lang, t } = useLanguage()
  const targetDate = new Date('2026-11-30T20:00:00+05:30').getTime()

  const calculateTimeLeft = () => {
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: t.countdown.days, value: String(timeLeft.days).padStart(2, '0') },
    { label: t.countdown.hours, value: String(timeLeft.hours).padStart(2, '0') },
    { label: t.countdown.minutes, value: String(timeLeft.minutes).padStart(2, '0') },
    { label: t.countdown.seconds, value: String(timeLeft.seconds).padStart(2, '0') },
  ]

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    lang === 'hi' 
      ? "शुभ विवाह — सर्वेश सोनी एवं संजना वर्मा (Shadi Ceremony)" 
      : "Shadi Ceremony — Sarvesh Soni & Sanjana Verma"
  )}&dates=20261130T143000Z/20261130T220000Z&details=${encodeURIComponent(
    lang === 'hi'
      ? "विवाह स्थल: रुद्र क्लब एंड रिसॉर्ट, कानपुर रोड, लालगंज"
      : "Venue: Rudra Club n Resort, Kanpur Road, Lalganj"
  )}&location=${encodeURIComponent("Rudra Club n Resort, Kanpur Road, Lalganj")}`

  return (
    <section 
      id="countdown-section"
      className="relative py-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#F5EEDB] via-[#EFE5C8] to-[#F5EEDB] text-stone-800"
    >
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <svg className="absolute top-0 inset-x-0 w-full h-44" viewBox="0 0 1000 160">
          <circle cx="120" cy="30" r="1.5" fill="#D4AF37" opacity="0.8" />
          <circle cx="280" cy="60" r="2" fill="#D4AF37" opacity="0.9" />
          <circle cx="450" cy="25" r="1.5" fill="#ECC880" opacity="0.7" />
          <circle cx="620" cy="50" r="2" fill="#D4AF37" opacity="0.9" />
          <circle cx="780" cy="35" r="1.5" fill="#ECC880" opacity="0.8" />
          <circle cx="910" cy="70" r="2" fill="#D4AF37" opacity="0.85" />
        </svg>

        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-auto preserve-3d"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160 C320,120 420,220 720,170 C1020,120 1180,210 1440,160 L1440,320 L0,320 Z"
            fill="#D9A7A0"
            opacity="0.4"
          />
          <path
            d="M0,210 C360,160 560,250 900,190 C1200,150 1340,240 1440,210 L1440,320 L0,320 Z"
            fill="#B76E79"
            opacity="0.25"
          />
          <path
            d="M0,260 C400,210 680,280 1080,240 C1280,220 1380,260 1440,250 L1440,320 L0,320 Z"
            fill="#7B1834"
            opacity="0.15"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-burgundy-800">
            <Clock className="w-4 h-4 text-rosegold-500" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold">
              {t.countdown.tag}
            </span>
            <Clock className="w-4 h-4 text-rosegold-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-950 tracking-tight">
            {t.countdown.heading}
          </h2>
          <p className="mt-1 text-sm sm:text-base font-serif italic text-burgundy-900 font-medium">
            {t.countdown.sub}
          </p>
        </motion.div>

        {/* Live Countdown Display - Guaranteed 4-column balanced grid on all mobile widths */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative grid grid-cols-4 gap-1.5 sm:gap-4 p-3 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md border-2 border-rosegold-300/60 shadow-luxury max-w-md sm:max-w-xl mx-auto"
        >
          {timeUnits.map((unit) => (
            <div 
              key={unit.label}
              className="flex flex-col items-center justify-center py-2.5 px-1 sm:py-4 sm:px-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFFDFB] to-[#FBF5ED] border border-rosegold-300 shadow-xs group hover:border-rosegold-500 transition-colors"
            >
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-display font-bold text-burgundy-900 tracking-tight leading-none">
                {unit.value}
              </span>
              <span className="text-[10px] sm:text-xs font-serif font-bold text-burgundy-800 mt-1 sm:mt-1.5 truncate max-w-full">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Quick Add to Calendar Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-burgundy-900 hover:bg-burgundy-950 text-white text-xs uppercase tracking-wider font-semibold shadow-md transition-all border border-amber-300/40 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>{t.countdown.saveDate}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-burgundy-800 font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-rosegold-500" />
          <span>{t.countdown.note}</span>
          <Sparkles className="w-3.5 h-3.5 text-rosegold-500" />
        </motion.div>
      </div>
    </section>
  )
}
