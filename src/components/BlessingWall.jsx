import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Flower2, Send, MessageCircleHeart, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function BlessingWall() {
  const { lang, t } = useLanguage()

  const initialBlessings = [
    {
      id: 1,
      name: lang === 'hi' ? "रमेश एवं सुनीता गुप्ता" : "Ramesh & Sunita Gupta",
      relation: lang === 'hi' ? "परिवार" : "Family",
      message: lang === 'hi' 
        ? "सर्वेश और संजना को वैवाहिक जीवन के इस मंगल प्रवेश पर हार्दिक बधाई एवं असीम स्नेह।"
        : "May your sacred union be blessed with endless happiness, prosperity, and everlasting harmony. Congratulations!",
      date: "Recent",
    },
    {
      id: 2,
      name: lang === 'hi' ? "अमित एवं नेहा वर्मा" : "Amit & Neha Verma",
      relation: lang === 'hi' ? "सगे-संबंधी" : "Cousins",
      message: lang === 'hi'
        ? "बहुत-बहुत बधाई! दोनों की जोड़ी सदा सलामत रहे। शादी के उत्सव में मिलने का बेसब्री से इंतज़ार है!"
        : "So thrilled for you both, Sarvesh and Sanjana! Can't wait to dance our hearts out at Rudra Resort!",
      date: "Recent",
    },
  ]

  const [blessings, setBlessings] = useState(initialBlessings)
  const [newBlessing, setNewBlessing] = useState({ name: '', message: '' })
  const [petalsShowered, setPetalsShowered] = useState(384)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_blessings_wall')
      if (saved) {
        setBlessings(JSON.parse(saved))
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const handleShowerPetals = () => {
    setPetalsShowered((prev) => prev + 12)
    try {
      confetti({
        particleCount: 50,
        spread: 90,
        origin: { y: 0.8 },
        colors: ['#CD5B78', '#B76E79', '#DFA3A1', '#ECC880', '#7B1834'],
        shapes: ['circle'],
        scalar: 1.2,
      })
    } catch (e) {
      // ignore
    }
  }

  const handleAddBlessing = (e) => {
    e.preventDefault()
    if (!newBlessing.name.trim() || !newBlessing.message.trim()) return

    const blessingItem = {
      id: Date.now(),
      name: newBlessing.name.trim(),
      relation: lang === 'hi' ? "अतिथि" : "Guest",
      message: newBlessing.message.trim(),
      date: lang === 'hi' ? "अभी" : "Just now",
    }

    const updated = [blessingItem, ...blessings]
    setBlessings(updated)
    setNewBlessing({ name: '', message: '' })

    try {
      localStorage.setItem('wedding_blessings_wall', JSON.stringify(updated))
    } catch (err) {
      // ignore
    }

    handleShowerPetals()
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FAF6EE] via-[#FDFBF7] to-[#FAF6EE] text-stone-800 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-burgundy-800">
            <MessageCircleHeart className="w-4 h-4 text-rosegold-500" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">
              {t.blessings.tag}
            </span>
            <MessageCircleHeart className="w-4 h-4 text-rosegold-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-950 tracking-tight">
            {t.blessings.heading}
          </h2>
          <p className="mt-1 text-sm sm:text-base font-serif italic text-burgundy-900 font-medium">
            {t.blessings.sub}
          </p>

          {/* Shower Rose Petals Interactive Button */}
          <div className="mt-6 flex flex-col items-center justify-center">
            <button
              onClick={handleShowerPetals}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-rosegold-400 via-rosegold-500 to-burgundy-700 text-white font-serif tracking-wider text-sm shadow-md hover:shadow-lg transform active:scale-95 transition-all border border-amber-200/40"
            >
              <Flower2 className="w-4 h-4 animate-bounce" />
              <span className="font-bold">{t.blessings.showerBtn}</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </button>
            <span className="text-xs text-stone-600 font-serif italic mt-2">
              <span className="font-bold text-burgundy-900">{petalsShowered}</span> {t.blessings.showeredCount}
            </span>
          </div>
        </motion.div>

        {/* Leave a Note Quick Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-rosegold-300/60 shadow-luxury mb-10"
        >
          <form onSubmit={handleAddBlessing} className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-stone-900">
              {t.blessings.formTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder={t.blessings.namePlaceholder}
                value={newBlessing.name}
                onChange={(e) => setNewBlessing({ ...newBlessing, name: e.target.value })}
                className="px-4 py-2.5 rounded-xl bg-parchment-50 border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              />
              <input
                type="text"
                placeholder={t.blessings.msgPlaceholder}
                value={newBlessing.message}
                onChange={(e) => setNewBlessing({ ...newBlessing, message: e.target.value })}
                className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-parchment-50 border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                {t.blessings.postBtn}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Blessings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {blessings.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-2xl bg-white/75 backdrop-blur-sm border border-rosegold-200/80 shadow-sm flex flex-col justify-between"
              >
                <p className="font-serif italic text-sm text-stone-800 leading-relaxed mb-4">
                  "{b.message}"
                </p>
                <div className="pt-3 border-t border-rosegold-100 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-stone-900">{b.name}</h5>
                    <span className="text-[10px] text-burgundy-700 font-semibold">{b.relation}</span>
                  </div>
                  <Heart className="w-3.5 h-3.5 text-rosegold-500 fill-rosegold-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
