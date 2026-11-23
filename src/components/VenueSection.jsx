import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Navigation, Copy, Check, ExternalLink } from 'lucide-react'
import { VenuePalaceIllustration } from './FloralDecorations'
import { useLanguage } from '../context/LanguageContext'

export default function VenueSection() {
  const [copied, setCopied] = useState(false)
  const { lang, t } = useLanguage()

  const venueName = t.venue.venueName
  const venueAddress = t.venue.address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Rudra Club n Resort, Kanpur Road, Lalganj")}`

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`Rudra Club n Resort, Kanpur Road, Lalganj, Uttar Pradesh`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    lang === 'hi' 
      ? "शुभ विवाह — सर्वेश सोनी एवं संजना वर्मा" 
      : "Shadi Ceremony — Sarvesh Soni & Sanjana Verma"
  )}&dates=20261130T143000Z/20261130T220000Z&details=${encodeURIComponent(
    lang === 'hi'
      ? "विवाह स्थल: रुद्र क्लब एंड रिसॉर्ट, कानपुर रोड, लालगंज"
      : "Venue: Rudra Club n Resort, Kanpur Road, Lalganj"
  )}&location=${encodeURIComponent("Rudra Club n Resort, Kanpur Road, Lalganj")}`

  return (
    <section id="venue-section" className="relative py-20 px-4 sm:px-6 bg-[#FAF6EE] text-stone-800 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-rosegold-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-burgundy-50 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-burgundy-800">
            <MapPin className="w-4 h-4 text-rosegold-500" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">{t.venue.tag}</span>
            <MapPin className="w-4 h-4 text-rosegold-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-950 tracking-tight">
            {t.venue.heading}
          </h2>
          <p className="mt-1 text-sm sm:text-base font-serif italic text-burgundy-900 font-medium">
            {t.venue.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <VenuePalaceIllustration />
        </motion.div>

        {/* Venue Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-rosegold-300/50 shadow-luxury"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-burgundy-700 font-bold block mb-1">
                {t.venue.cardTag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4">
                {venueName}
              </h3>

              <div className="space-y-4 text-stone-700">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-rosegold-100/80 text-burgundy-800 mt-0.5">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-stone-600">
                      {t.venue.dateLabel}
                    </h4>
                    <p className="font-serif text-base sm:text-lg font-semibold text-stone-900 mt-0.5">
                      {t.venue.dateTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-rosegold-100/80 text-burgundy-800 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-stone-600">
                      {t.venue.addressLabel}
                    </h4>
                    <p className="font-serif text-base sm:text-lg font-semibold text-stone-900 mt-0.5">
                      {venueAddress}
                    </p>
                  </div>
                </div>

                {/* Venue Amenities & Facilities */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1.5 font-serif">
                    {lang === 'hi' ? "रिसॉर्ट मुख्य सुविधाएं" : "Venue Amenities & Facilities"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { icon: "🚗", labelEn: "Valet Parking", labelHi: "वैलेट पार्किंग" },
                      { icon: "❄️", labelEn: "AC Banquet Hall", labelHi: "AC बैंक्वेट हॉल" },
                      { icon: "🌿", labelEn: "Royal Lawn", labelHi: "शाही लॉन" },
                      { icon: "🍽️", labelEn: "Dining Pavilion", labelHi: "भोजन मंडप" },
                    ].map((amenity, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#D4AF37]/40 text-burgundy-900 text-[11px] font-serif font-bold shadow-2xs hover:border-[#D4AF37] transition-colors"
                      >
                        <span>{amenity.icon}</span>
                        <span>{lang === 'hi' ? amenity.labelHi : amenity.labelEn}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons - Fully responsive grid/flex on mobile */}
            <div className="pt-6 mt-6 border-t border-rosegold-200/60 flex flex-col xs:flex-row flex-wrap gap-2.5">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 w-full xs:w-auto touch-manipulation cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-amber-200" />
                {t.venue.mapsBtn}
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rosegold-100 hover:bg-rosegold-200 text-burgundy-900 text-xs font-semibold uppercase tracking-wider transition-all border border-rosegold-300 active:scale-95 w-full xs:w-auto touch-manipulation cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-burgundy-800" />
                {t.venue.calendarBtn}
              </a>

              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium border border-stone-200 shadow-sm transition-all w-full xs:w-auto touch-manipulation cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">{t.venue.copiedBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>{t.venue.copyBtn}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Card: Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-rosegold-300/50 shadow-luxury bg-[#FAF2E6] flex flex-col min-h-[340px]"
          >
            <div className="relative flex-1 w-full bg-[#F4EBD9] overflow-hidden">
              <svg className="w-full h-full min-h-[260px]" viewBox="0 0 500 350" preserveAspectRatio="none">
                <path d="M-20 80 Q 200 120 520 70" stroke="#E6D3BA" strokeWidth="18" fill="none"/>
                <path d="M120 -20 Q 150 180 180 370" stroke="#E6D3BA" strokeWidth="14" fill="none"/>
                <path d="M-30 220 Q 250 180 530 240" stroke="#D9BEA0" strokeWidth="26" fill="none"/>
                <path d="M-30 220 Q 250 180 530 240" stroke="#FFFDFB" strokeWidth="3" strokeDasharray="10 8" fill="none"/>
                <path d="M350 -10 C 370 120, 310 250, 480 370" stroke="#C5D3D1" strokeWidth="36" fill="none" opacity="0.6"/>
                <rect x="210" y="70" width="160" height="110" rx="20" fill="#E2EAD8" opacity="0.8"/>
                <circle cx="290" cy="125" r="35" fill="#D3DFC5" opacity="0.6"/>
                <rect x="220" y="80" width="140" height="90" rx="12" stroke="#8A4A57" strokeWidth="1" strokeDasharray="4 3" fill="none"/>
              </svg>

              <div className="absolute top-[42%] left-[58%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="absolute -inset-3 rounded-full bg-burgundy-500/25 animate-ping" />
                <div className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-burgundy-800 text-white shadow-xl border border-rosegold-300">
                  <MapPin className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span className="text-xs font-semibold tracking-wide whitespace-nowrap">Rudra Club n Resort</span>
                </div>
                <div className="w-2.5 h-2.5 bg-burgundy-800 rotate-45 -mt-1 shadow-md border-r border-b border-rosegold-300" />
              </div>

              <div className="absolute bottom-16 left-6 px-2.5 py-1 rounded-md bg-stone-900/60 backdrop-blur-sm text-[10px] uppercase font-bold tracking-widest text-amber-100">
                Kanpur Road • Lalganj
              </div>
            </div>

            <div className="p-4 bg-white/90 border-t border-rosegold-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-serif font-bold text-stone-900 block">
                  {t.venue.mapFooterTitle}
                </span>
                <p className="text-[11px] text-stone-500">
                  {t.venue.mapFooterSub}
                </p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-burgundy-50 hover:bg-burgundy-100 text-burgundy-900 text-xs font-bold transition-colors flex items-center gap-1"
              >
                {t.venue.directionsBtn}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
