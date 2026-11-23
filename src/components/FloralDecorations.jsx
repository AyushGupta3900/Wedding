import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Ornate Traditional Indian Royal Paisley & Gold Corner Ornament
export const FloralCorner = ({ className = "w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52", position = "top-left" }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right': return 'scale-x-[-1]';
      case 'bottom-left': return 'scale-y-[-1]';
      case 'bottom-right': return 'scale-x-[-1] scale-y-[-1]';
      default: return '';
    }
  };

  return (
    <div className={`pointer-events-none select-none absolute z-10 ${getTransform()} ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        <defs>
          {/* Metallic Gold Gradient */}
          <linearGradient id={`goldCornerGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="35%" stopColor="#ECC880" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9B6C1E" />
          </linearGradient>

          {/* Deep Royal Crimson Gradient */}
          <linearGradient id={`crimsonGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B2C46" />
            <stop offset="50%" stopColor="#7B1834" />
            <stop offset="100%" stopColor="#4A0A17" />
          </linearGradient>

          {/* Marigold Orange Gradient */}
          <linearGradient id={`marigoldGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="60%" stopColor="#FFAA00" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Outer Corner Frame Lines with Gold Inset */}
        <path d="M 6,150 L 6,24 Q 6,6 24,6 L 150,6" stroke={`url(#goldCornerGrad-${position})`} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 14,125 L 14,28 Q 14,14 28,14 L 125,14" stroke="#7B1834" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <path d="M 22,100 L 22,32 Q 22,22 32,22 L 100,22" stroke={`url(#goldCornerGrad-${position})`} strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

        {/* Corner Nodes */}
        <circle cx="6" cy="6" r="4.5" fill={`url(#goldCornerGrad-${position})`} />
        <circle cx="6" cy="6" r="1.8" fill="#7B1834" />
        <circle cx="24" cy="24" r="3.5" fill={`url(#marigoldGrad-${position})`} stroke="#7B1834" strokeWidth="0.8" />

        {/* Ornate Indian Paisley (Kalka Motif) */}
        <g transform="translate(14, 14)">
          <path
            d="M 16,60 
               C 8,50 10,32 24,22 
               C 38,12 58,18 64,34 
               C 68,46 60,56 50,62 
               C 38,70 26,72 16,60 Z"
            fill={`url(#crimsonGrad-${position})`}
            stroke={`url(#goldCornerGrad-${position})`}
            strokeWidth="1.4"
          />

          {/* Curled Paisley Feather Tip */}
          <path
            d="M 64,34 
               C 68,24 78,16 88,20 
               C 96,24 98,34 92,42 
               C 86,48 80,46 78,40"
            stroke={`url(#goldCornerGrad-${position})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Inner Lotus Petal Fill */}
          <path
            d="M 26,30 
               C 32,22 46,24 50,34 
               C 54,42 46,50 38,54 
               C 30,58 22,50 24,40 Z"
            fill={`url(#marigoldGrad-${position})`}
            opacity="0.85"
          />
          <circle cx="36" cy="40" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="36" cy="40" r="1.8" fill="#7B1834" />
        </g>

        {/* Trailing Gold Vine */}
        <path d="M 6,70 Q 18,95 44,115 Q 70,135 110,145" stroke={`url(#goldCornerGrad-${position})`} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 70,6 Q 95,18 115,44 Q 135,70 145,110" stroke={`url(#goldCornerGrad-${position})`} strokeWidth="1.2" strokeLinecap="round" />

        {/* Marigold Beads */}
        <circle cx="44" cy="115" r="3" fill={`url(#marigoldGrad-${position})`} stroke={`url(#goldCornerGrad-${position})`} strokeWidth="0.8" />
        <circle cx="110" cy="145" r="3" fill="#7B1834" stroke={`url(#goldCornerGrad-${position})`} strokeWidth="0.8" />
        <circle cx="115" cy="44" r="3" fill={`url(#marigoldGrad-${position})`} stroke={`url(#goldCornerGrad-${position})`} strokeWidth="0.8" />
        <circle cx="145" cy="110" r="3" fill="#7B1834" stroke={`url(#goldCornerGrad-${position})`} strokeWidth="0.8" />
      </svg>
    </div>
  );
};

// Royal Indian Toran Garland Border with Marigold Flowers & Mango Leaves
export const FloralBorder = ({ className = "w-full h-10" }) => {
  return (
    <div className={`overflow-hidden select-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 1000 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="toranGold2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ECC880" />
            <stop offset="50%" stopColor="#FFF2B2" />
            <stop offset="100%" stopColor="#ECC880" />
          </linearGradient>
        </defs>

        {/* Scalloped Gold Garland Cord */}
        <path d="M 0,12 Q 125,28 250,12 T 500,12 T 750,12 T 1000,12" stroke="url(#toranGold2)" strokeWidth="1.6" fill="none"/>
        <path d="M 0,15 Q 125,31 250,15 T 500,15 T 750,15 T 1000,15" stroke="#7B1834" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.6"/>

        {/* Center Medallion */}
        <g transform="translate(488, 4)">
          <path d="M 12,0 L 22,10 L 12,20 L 2,10 Z" fill="#7B1834" stroke="url(#toranGold2)" strokeWidth="1.2"/>
          <circle cx="12" cy="10" r="3" fill="#FFAA00" />
        </g>

        {/* Symmetrical Mango Leaves & Marigold Beads */}
        {[125, 250, 375, 625, 750, 875].map((x) => (
          <g key={x} transform={`translate(${x - 6}, 16)`}>
            <path d="M 6,0 C 2,6 1,12 6,18 C 11,12 10,6 6,0 Z" fill="#4B6338" opacity="0.85" />
            <circle cx="6" cy="1" r="2.8" fill="#FFAA00" stroke="#D4AF37" strokeWidth="0.6"/>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Royal Mandala Divider with Auspicious Vedic Lotus
export const MandalaDivider = ({ className = "w-full max-w-sm mx-auto py-2.5" }) => {
  return (
    <div className={`relative flex items-center justify-center gap-3 select-none pointer-events-none ${className}`}>
      <span className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-[#ECC880]" />
      <svg viewBox="0 0 60 30" className="w-10 h-5 drop-shadow-xs">
        <defs>
          <linearGradient id="divGold2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9B6C1E" />
          </linearGradient>
        </defs>
        <path d="M 30,2 C 24,12 14,15 2,15 C 14,15 24,18 30,28 C 36,18 46,15 58,15 C 46,15 36,12 30,2 Z" fill="#7B1834" stroke="url(#divGold2)" strokeWidth="1.2"/>
        <circle cx="30" cy="15" r="3" fill="url(#divGold2)" />
        <circle cx="30" cy="15" r="1.2" fill="#7B1834" />
      </svg>
      <span className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#D4AF37] to-[#ECC880]" />
    </div>
  );
};

// Grand Royal Couple Arch with Silhouette (From static 2.png) with Interactive Swinging Bells
export const RoyalCoupleEmblem = ({ className = "w-full max-w-xs sm:max-w-sm mx-auto" }) => {
  const [ringingBell, setRingingBell] = useState(null)

  const playTempleBellChime = (freq = 1480, bellId = 1) => {
    try {
      setRingingBell(bellId)
      setTimeout(() => setRingingBell(null), 850)

      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + 0.3)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 1.2)
    } catch (e) {}
  }

  return (
    <div className={`relative ${className}`}>
      {/* Ornate Gold Foil Arched Frame */}
      <motion.div 
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', damping: 15 }}
        className="relative mx-auto w-64 h-72 sm:w-72 sm:h-80 rounded-t-full border-2 border-[#D4AF37] p-2.5 shadow-[0_15px_35px_rgba(123,24,52,0.12)] bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F5EEDB]"
      >
        <div className="w-full h-full rounded-t-full border border-[#D4AF37]/50 overflow-hidden relative flex flex-col items-center justify-end pb-3 bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#EFE2D3]">
          
          {/* Subtle Golden Full Moon / Mandap Halo */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-radial from-amber-300/30 via-rosegold-200/20 to-transparent blur-md pointer-events-none" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border border-[#D4AF37]/40 pointer-events-none" />

          {/* Interactive Swinging Traditional Temple Bells (Ghanti) */}
          <div className="absolute top-0 inset-x-0 w-full h-24 z-20 pointer-events-auto flex justify-between px-6 pt-3 select-none">
            {/* Left Bell */}
            <motion.button
              onClick={() => playTempleBellChime(1320, 'left')}
              title="Tap to ring temple bell"
              animate={ringingBell === 'left' ? { rotate: [-18, 14, -10, 6, 0] } : { rotate: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="cursor-pointer focus:outline-none p-1 transition-transform hover:scale-110"
              style={{ transformOrigin: "top center" }}
            >
              <svg viewBox="0 0 20 28" className="w-5 h-7 drop-shadow-xs">
                <path d="M 10,0 L 10,8" stroke="#D4AF37" strokeWidth="1.5" />
                <path d="M 3,8 C 3,4 17,4 17,8 L 19,18 L 1,18 Z" fill="#FAF4EA" stroke="#D4AF37" strokeWidth="1.2" />
                <circle cx="10" cy="20" r="2.5" fill="#D4AF37" />
              </svg>
            </motion.button>

            {/* Center Bell (Main Temple Ghanti) */}
            <motion.button
              onClick={() => playTempleBellChime(1560, 'center')}
              title="Tap to ring temple bell"
              animate={ringingBell === 'center' ? { rotate: [-20, 16, -12, 6, 0] } : { rotate: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="cursor-pointer focus:outline-none p-1 transition-transform hover:scale-110 -mt-1"
              style={{ transformOrigin: "top center" }}
            >
              <svg viewBox="0 0 24 32" className="w-6 h-8 drop-shadow-sm">
                <path d="M 12,0 L 12,9" stroke="#D4AF37" strokeWidth="1.8" />
                <path d="M 3,9 C 3,4 21,4 21,9 L 23,21 L 1,21 Z" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="1.5" />
                <circle cx="12" cy="23" r="3" fill="#D4AF37" />
              </svg>
            </motion.button>

            {/* Right Bell */}
            <motion.button
              onClick={() => playTempleBellChime(1760, 'right')}
              title="Tap to ring temple bell"
              animate={ringingBell === 'right' ? { rotate: [-18, 14, -10, 6, 0] } : { rotate: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="cursor-pointer focus:outline-none p-1 transition-transform hover:scale-110"
              style={{ transformOrigin: "top center" }}
            >
              <svg viewBox="0 0 20 28" className="w-5 h-7 drop-shadow-xs">
                <path d="M 10,0 L 10,8" stroke="#D4AF37" strokeWidth="1.5" />
                <path d="M 3,8 C 3,4 17,4 17,8 L 19,18 L 1,18 Z" fill="#FAF4EA" stroke="#D4AF37" strokeWidth="1.2" />
                <circle cx="10" cy="20" r="2.5" fill="#D4AF37" />
              </svg>
            </motion.button>
          </div>

          {/* Hanging Toran Garland Cord */}
          <svg className="absolute top-0 inset-x-0 w-full h-24 pointer-events-none" viewBox="0 0 280 100" fill="none">
            <path d="M 20,20 Q 140,45 260,20" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3"/>
          </svg>

          {/* Indian Wedding Couple Silhouette */}
          <div className="relative z-10 w-full flex justify-center items-end px-2 pt-10 h-48 sm:h-52">
            <img 
              src="/static/opt/2.png" 
              alt="Sarvesh & Sanjana" 
              loading="eager"
              decoding="async"
              className="max-h-48 sm:max-h-52 w-auto object-contain transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Golden Badge Caption */}
          <div className="relative z-10 text-center mt-2 px-4 py-1 rounded-full bg-white/90 border border-[#D4AF37]/50 shadow-xs">
            <span className="text-[11px] uppercase tracking-[0.22em] text-burgundy-900 font-bold font-serif">
              Eternal Union • Shubh Vivaah
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Pure Vector Arched Swans Illustration
export const SwansIllustration = ({ className = "w-full max-w-xs sm:max-w-sm mx-auto" }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', damping: 15 }}
        className="relative mx-auto w-56 h-64 sm:w-64 sm:h-72 rounded-t-full border-[1.5px] border-[#D4AF37] p-2 shadow-md bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE0]"
      >
        <div className="w-full h-full rounded-t-full border border-amber-300/60 overflow-hidden relative flex flex-col items-center justify-end pb-3 bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EB] to-[#EFE2D3]">
          <div className="relative z-10 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-burgundy-900 font-bold font-serif">
              Eternal Union • Shubh Vivaah
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Royal Palace & Resort Illustration
export const VenuePalaceIllustration = ({ className = "w-full max-w-md mx-auto" }) => {
  return (
    <div className={`relative ${className} p-2`}>
      <div className="relative rounded-3xl border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#FFFDFB] via-[#FBF5ED] to-[#F5EADB] p-6 shadow-md overflow-hidden text-center">
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-200/40 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-burgundy-100/40 blur-xl pointer-events-none" />

        <svg viewBox="0 0 400 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto mx-auto max-h-44 drop-shadow-sm">
          <path d="M 0,160 Q 200,130 400,160 L 400,170 L 0,170 Z" fill="#EBD9C8" opacity="0.5"/>
          
          {/* Palm Trees */}
          <g transform="translate(30, 70)" stroke="#68765B" strokeWidth="1.5" opacity="0.75">
            <path d="M 20,70 Q 22,30 18,10" />
            <path d="M 18,10 Q 5,2 0,12" />
            <path d="M 18,10 Q 15,-5 10,-2" />
            <path d="M 18,10 Q 25,-5 32,0" />
            <path d="M 18,10 Q 35,5 38,18" />
          </g>
          <g transform="translate(330, 70)" stroke="#68765B" strokeWidth="1.5" opacity="0.75">
            <path d="M 18,70 Q 16,30 20,10" />
            <path d="M 20,10 Q 8,2 2,12" />
            <path d="M 20,10 Q 16,-5 12,-2" />
            <path d="M 20,10 Q 28,-5 36,0" />
            <path d="M 20,10 Q 38,5 42,18" />
          </g>

          {/* Main Resort Pavilion */}
          <rect x="70" y="130" width="260" height="15" rx="3" fill="#E2CEBA" stroke="#8A4A57" strokeWidth="1.2"/>
          <line x1="85" y1="137" x2="315" y2="137" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3 3"/>

          <rect x="150" y="75" width="100" height="55" fill="#FAF4EB" stroke="#7B1834" strokeWidth="1.4"/>
          <path d="M 150,75 C 150,45 175,30 200,15 C 225,30 250,45 250,75 Z" fill="#F3E5D4" stroke="#8A4A57" strokeWidth="1.4"/>
          <line x1="200" y1="15" x2="200" y2="4" stroke="#D4AF37" strokeWidth="1.8"/>
          <circle cx="200" cy="3" r="3" fill="#ECC880" />
          
          <path d="M 175,130 V 98 C 175,86 200,84 200,84 C 200,84 225,86 225,98 V 130 Z" fill="#621027" opacity="0.9"/>
          <circle cx="200" cy="94" r="3" fill="#ECC880" />

          {/* Wings */}
          <rect x="90" y="88" width="60" height="42" fill="#FAF4EB" stroke="#7B1834" strokeWidth="1.2"/>
          <path d="M 90,88 C 90,70 105,60 120,52 C 135,60 150,70 150,88 Z" fill="#F3E5D4" stroke="#8A4A57" strokeWidth="1.2"/>
          <line x1="120" y1="52" x2="120" y2="44" stroke="#D4AF37" strokeWidth="1.2"/>
          <circle cx="120" cy="43" r="2.5" fill="#ECC880"/>

          <rect x="250" y="88" width="60" height="42" fill="#FAF4EB" stroke="#7B1834" strokeWidth="1.2"/>
          <path d="M 250,88 C 250,70 265,60 280,52 C 295,60 310,70 310,88 Z" fill="#F3E5D4" stroke="#8A4A57" strokeWidth="1.2"/>
          <line x1="280" y1="52" x2="280" y2="44" stroke="#D4AF37" strokeWidth="1.2"/>
          <circle cx="280" cy="43" r="2.5" fill="#ECC880"/>

          <circle cx="80" cy="126" r="4" fill="#D4AF37"/>
          <circle cx="320" cy="126" r="4" fill="#D4AF37"/>
        </svg>

        <p className="text-xs uppercase tracking-widest text-burgundy-900 font-bold mt-2 font-serif">
          Rudra Club n Resort • Kanpur Road, Lalganj
        </p>
      </div>
    </div>
  );
};
