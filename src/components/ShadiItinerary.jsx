import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Sparkles, Heart, Utensils, Music2, Star } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function ShadiItinerary() {
  const { lang, t } = useLanguage()

  const icons = [Music2, Heart, Utensils, Sparkles, Star]
  const accents = ["#B76E79", "#7B1834", "#B8860B", "#D4AF37", "#8A4A57"]

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#FAF6EE] text-stone-800 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-rosegold-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full bg-burgundy-50 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-burgundy-800">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold">
              {t.itinerary.tag}
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-950 tracking-tight">
            {t.itinerary.heading}
          </h2>
          <p className="mt-1 text-sm sm:text-base font-serif italic text-burgundy-900 font-semibold">
            {t.itinerary.sub}
          </p>
        </motion.div>

        {/* Clean, Non-Overlapping Timeline Sequence */}
        <div className="relative border-l-2 border-[#D4AF37]/50 ml-5 sm:ml-8 space-y-8 pl-6 sm:pl-8">
          {t.itinerary.items.map((item, idx) => {
            const Icon = icons[idx % icons.length]
            const accent = accents[idx % accents.length]

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Timeline Node Icon directly on the vertical line */}
                <div 
                  className="absolute -left-[37px] sm:-left-[45px] top-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF9] border-2 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform z-10"
                  style={{ borderColor: accent }}
                >
                  <Icon className="w-4 h-4 text-burgundy-900" />
                </div>

                {/* Timeline Card without unconfirmed time text */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#D4AF37]/40 shadow-sm hover:shadow-md transition-all group-hover:border-[#D4AF37]">
                  {/* Sequence Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-burgundy-50 border border-burgundy-200/80 text-burgundy-900 font-serif font-bold text-[11px] mb-2">
                    <span className="text-[#D4AF37]">✦</span>
                    <span>{lang === 'hi' ? `मांगलिक रस्म ${item.step}` : `Ceremony ${item.step}`}</span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900">
                      {item.title}
                    </h3>
                  </div>

                  <span className="text-xs font-semibold text-burgundy-700 block mt-0.5 font-serif">
                    {item.sub}
                  </span>

                  <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Auspicious Footnote */}
        <div className="mt-12 text-center text-xs font-serif italic text-stone-600 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{t.itinerary.note}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>

      </div>
    </section>
  )
}
