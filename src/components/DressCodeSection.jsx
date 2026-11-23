import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Check, Info } from 'lucide-react'

export default function DressCodeSection() {
  const [activeTone, setActiveTone] = useState(0)

  // Dress Code palette guidance: Rose Gold, Burgundy, and Brown tones
  const colorTones = [
    {
      id: 'rosegold',
      name: 'Rose Gold',
      hex: '#B76E79',
      secondary: '#EAA2A6',
      accent: '#F9ECEB',
      description: 'Glimmering metallic & blush touches, silk lehengas, rose-gold embroidery, or elegant blazers.',
      vibe: 'Elegance & Radiance',
    },
    {
      id: 'burgundy',
      name: 'Burgundy',
      hex: '#7B1834',
      secondary: '#5E1025',
      accent: '#CD5B78',
      description: 'Deep royal wine, velvet bandhgalas, maroon anarkalis, or jewel-toned evening suits.',
      vibe: 'Regal & Romantic',
    },
    {
      id: 'brown',
      name: 'Earthy Brown',
      hex: '#5C3826',
      secondary: '#7A4B3A',
      accent: '#A67C52',
      description: 'Warm chocolate, mocha, fawn, and rich raw silk kurtas, sherwanis, or tailored trousers.',
      vibe: 'Warmth & Sophistication',
    },
  ]

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#F5EEDB] via-[#FAF6EE] to-[#FAF6EE] text-stone-800 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-burgundy-700">
            <Sparkles className="w-4 h-4 text-rosegold-500" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">Attire Guidance</span>
            <Sparkles className="w-4 h-4 text-rosegold-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-burgundy-950 tracking-tight">
            Dress Code
          </h2>
          <p className="mt-2 text-sm sm:text-base font-serif italic text-stone-600 max-w-xl mx-auto">
            We kindly invite our beloved guests to dress in harmonious hues of <span className="font-semibold text-burgundy-900">Rose Gold</span>, <span className="font-semibold text-burgundy-900">Burgundy</span>, and <span className="font-semibold text-burgundy-900">Brown</span> tones for the Shadi.
          </p>
        </motion.div>

        {/* Illustrated Coordinated Outfits Lineup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-rosegold-300/40 shadow-luxury"
        >
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-burgundy-600 font-semibold">
              Coordinated Ensemble Lineup
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              Ethnic & Evening Silhouettes
            </h3>
          </div>

          {/* Illustrated Figures / Outfits */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-end justify-center py-4">
            
            {/* Figure 1: Rose Gold Lehenga / Saree */}
            <div className="flex flex-col items-center text-center group cursor-pointer" onClick={() => setActiveTone(0)}>
              <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-[#FDF5F2] to-[#FCEAE6] border border-rosegold-300/60 p-3 flex flex-col items-center justify-between group-hover:shadow-md transition-all">
                {/* SVG Silhouette: Rose Gold Lehenga */}
                <svg viewBox="0 0 100 160" className="w-20 h-auto my-auto drop-shadow-sm">
                  {/* Blouse */}
                  <path d="M35 30 L 65 30 L 60 55 L 40 55 Z" fill="#B76E79" />
                  {/* Dupatta drape */}
                  <path d="M32 30 C 25 50, 20 80, 26 120 C 35 125, 45 110, 38 75 Z" fill="#EAA2A6" opacity="0.85"/>
                  {/* Flared Lehenga Skirt */}
                  <path d="M40 58 L 60 58 L 85 140 C 50 148, 15 142, 15 140 Z" fill="#C97D7D" />
                  {/* Gold Zari borders */}
                  <path d="M15 137 C 50 145, 85 137, 85 137" stroke="#ECC880" strokeWidth="3" />
                  <circle cx="50" cy="20" r="8" fill="#ECC880" opacity="0.5"/>
                </svg>
                <div className="w-full text-center border-t border-rosegold-200 pt-1.5">
                  <span className="text-[11px] font-semibold text-rosegold-700 block">Rose Gold</span>
                  <span className="text-[10px] text-stone-500">Lehenga / Gown</span>
                </div>
              </div>
            </div>

            {/* Figure 2: Royal Burgundy Sherwani / Bandhgala */}
            <div className="flex flex-col items-center text-center group cursor-pointer" onClick={() => setActiveTone(1)}>
              <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-[#FAF0F3] to-[#F5E1E6] border border-burgundy-200/70 p-3 flex flex-col items-center justify-between group-hover:shadow-md transition-all">
                {/* SVG Silhouette: Burgundy Sherwani */}
                <svg viewBox="0 0 100 160" className="w-20 h-auto my-auto drop-shadow-sm">
                  {/* Collar */}
                  <path d="M40 25 L 60 25 L 56 32 L 44 32 Z" fill="#ECC880" />
                  {/* Long Sherwani Jacket */}
                  <path d="M32 32 L 68 32 L 72 105 L 50 108 L 28 105 Z" fill="#7B1834" />
                  {/* Buttons line */}
                  <line x1="50" y1="35" x2="50" y2="105" stroke="#ECC880" strokeWidth="1.5" strokeDasharray="3 4"/>
                  {/* Pocket square */}
                  <rect x="36" y="44" width="7" height="3" fill="#B76E79" />
                  {/* Churidar Trousers */}
                  <path d="M34 105 L 47 145 L 50 145 L 53 145 L 66 105" stroke="#F5EEDB" strokeWidth="6" strokeLinecap="round" fill="none"/>
                  <circle cx="50" cy="18" r="8" fill="#ECC880" opacity="0.5"/>
                </svg>
                <div className="w-full text-center border-t border-burgundy-100 pt-1.5">
                  <span className="text-[11px] font-semibold text-burgundy-800 block">Royal Burgundy</span>
                  <span className="text-[10px] text-stone-500">Sherwani / Bandhgala</span>
                </div>
              </div>
            </div>

            {/* Figure 3: Earthy Chocolate Brown Tuxedo / Kurta */}
            <div className="flex flex-col items-center text-center group cursor-pointer" onClick={() => setActiveTone(2)}>
              <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-[#F8F4EF] to-[#EFE7DE] border border-stone-300/60 p-3 flex flex-col items-center justify-between group-hover:shadow-md transition-all">
                {/* SVG Silhouette: Brown Evening Suit / Kurta */}
                <svg viewBox="0 0 100 160" className="w-20 h-auto my-auto drop-shadow-sm">
                  {/* Lapels & Jacket */}
                  <path d="M30 32 L 70 32 L 72 95 L 50 100 L 28 95 Z" fill="#5C3826" />
                  {/* Inner shirt & bow/tie */}
                  <polygon points="45,32 55,32 50,48" fill="#FFFDF9" />
                  <polygon points="48,46 52,46 50,52" fill="#B76E79" />
                  {/* Slacks */}
                  <path d="M36 96 L 47 145 L 53 145 L 64 96" stroke="#42271A" strokeWidth="8" strokeLinecap="round" fill="none"/>
                  <circle cx="50" cy="18" r="8" fill="#ECC880" opacity="0.5"/>
                </svg>
                <div className="w-full text-center border-t border-stone-200 pt-1.5">
                  <span className="text-[11px] font-semibold text-stone-800 block">Warm Brown</span>
                  <span className="text-[10px] text-stone-500">Tuxedo / Silk Kurta</span>
                </div>
              </div>
            </div>

            {/* Figure 4: Fusion / Saree / Anarkali */}
            <div className="flex flex-col items-center text-center group cursor-pointer" onClick={() => setActiveTone(1)}>
              <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-[#FAF4F0] to-[#F7ECE4] border border-rosegold-300/60 p-3 flex flex-col items-center justify-between group-hover:shadow-md transition-all">
                {/* SVG Silhouette: Anarkali / Saree Fusion */}
                <svg viewBox="0 0 100 160" className="w-20 h-auto my-auto drop-shadow-sm">
                  {/* Bodice */}
                  <path d="M35 30 L 65 30 L 62 60 L 38 60 Z" fill="#621027" />
                  {/* Cascading Pleats */}
                  <path d="M38 60 L 62 60 L 80 142 C 50 146, 20 142, 20 142 Z" fill="#A42A4B" opacity="0.9"/>
                  {/* Diagonal Rose Gold Pallu */}
                  <path d="M30 32 L 68 85 L 60 90 L 25 38 Z" fill="#DFA3A1" />
                  <circle cx="50" cy="20" r="8" fill="#ECC880" opacity="0.5"/>
                </svg>
                <div className="w-full text-center border-t border-rosegold-200 pt-1.5">
                  <span className="text-[11px] font-semibold text-burgundy-900 block">Burgundy & Rose</span>
                  <span className="text-[10px] text-stone-500">Anarkali / Saree</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Color Palette Swatches & Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {colorTones.map((tone, idx) => (
            <motion.div
              key={tone.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setActiveTone(idx)}
              className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                activeTone === idx
                  ? 'bg-white shadow-luxury border-rosegold-400 scale-[1.02]'
                  : 'bg-white/60 hover:bg-white border-stone-200/70'
              }`}
            >
              {/* Color Swatch Pill */}
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="w-7 h-7 rounded-full shadow-sm border-2 border-white ring-1 ring-stone-200 flex items-center justify-center"
                  style={{ backgroundColor: tone.hex }}
                >
                  {activeTone === idx && <Check className="w-3.5 h-3.5 text-white" />}
                </span>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg leading-tight">
                    {tone.name}
                  </h4>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500">
                    {tone.vibe}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {tone.description}
              </p>

              {/* Color chips */}
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-stone-100">
                <span className="w-5 h-5 rounded-md" style={{ backgroundColor: tone.hex }} title="Primary" />
                <span className="w-5 h-5 rounded-md" style={{ backgroundColor: tone.secondary }} title="Secondary" />
                <span className="w-5 h-5 rounded-md border border-stone-200" style={{ backgroundColor: tone.accent }} title="Accent" />
                <span className="text-[10px] text-stone-400 font-mono ml-auto">{tone.hex}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Polite note */}
        <div className="mt-8 text-center text-xs text-stone-500 font-serif italic flex items-center justify-center gap-2">
          <Info className="w-3.5 h-3.5 text-rosegold-400" />
          <span>Traditional formal Indian or Western formal attire welcomed warmly</span>
        </div>

      </div>
    </section>
  )
}
