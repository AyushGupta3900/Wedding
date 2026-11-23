import React, { useMemo } from 'react'

export default function PetalShower({ count = 22, active = true }) {
  if (!active) return null

  // Generate randomized petal attributes
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 14,
      delay: Math.random() * 8,
      duration: 7 + Math.random() * 6,
      color: ['#A42A4B', '#CD5B78', '#E199AB', '#DFA3A1', '#B76E79'][i % 5],
      opacity: 0.55 + Math.random() * 0.35,
    }))
  }, [count])

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden" 
      style={{ pointerEvents: 'none' }}
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal pointer-events-none"
          style={{
            left: `${petal.left}%`,
            top: '-5%',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
            pointerEvents: 'none',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none"
            style={{ pointerEvents: 'none' }}
          >
            {/* Curved Rose Petal */}
            <path
              d="M15 0 C 25 10, 30 25, 20 38 C 10 42, 2 30, 0 20 C 0 10, 8 0, 15 0 Z"
              fill={petal.color}
              style={{ pointerEvents: 'none' }}
            />
            {/* Delicate petal vein */}
            <path
              d="M15 5 C 16 18, 14 28, 12 36"
              stroke="#FFF"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.3"
              style={{ pointerEvents: 'none' }}
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
