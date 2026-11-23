import React, { useEffect, useRef } from 'react'

export default function SparkleCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    let lastTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#FFE066', '#D4AF37', '#ECC880', '#FFF2B2', '#FFD700', '#F5C270']

    class SparkleParticle {
      constructor(x, y) {
        this.x = x
        this.y = y
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 1.5 + 0.5
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed - 0.4 // gentle upward drift
        this.size = Math.random() * 3 + 2.5
        this.alpha = 1
        this.decay = Math.random() * 0.025 + 0.02
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.rotation = Math.random() * Math.PI
        this.rotSpeed = (Math.random() - 0.5) * 0.1
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.02 // very soft gravity
        this.alpha -= this.decay
        this.size *= 0.98
        this.rotation += this.rotSpeed
      }

      draw(context) {
        if (this.alpha <= 0) return
        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.rotation)
        context.globalAlpha = Math.max(0, this.alpha)

        // Draw 4-point golden star sparkle
        context.fillStyle = this.color
        context.shadowColor = '#FFE066'
        context.shadowBlur = 6

        const s = this.size
        context.beginPath()
        context.moveTo(0, -s * 1.8)
        context.quadraticCurveTo(0, 0, s * 1.8, 0)
        context.quadraticCurveTo(0, 0, 0, s * 1.8)
        context.quadraticCurveTo(0, 0, -s * 1.8, 0)
        context.quadraticCurveTo(0, 0, 0, -s * 1.8)
        context.closePath()
        context.fill()

        context.restore()
      }
    }

    const addSparkles = (x, y, count = 2) => {
      // Avoid excessive particles
      if (particles.length > 70) return
      for (let i = 0; i < count; i++) {
        particles.push(new SparkleParticle(x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8))
      }
    }

    const handlePointerMove = (e) => {
      const now = performance.now()
      if (now - lastTime < 24) return // Rate limit ~40fps emitter
      lastTime = now
      addSparkles(e.clientX, e.clientY, 2)
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        addSparkles(e.touches[0].clientX, e.touches[0].clientY, 1)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.update()
        if (p.alpha <= 0 || p.size <= 0.5) {
          particles.splice(i, 1)
        } else {
          p.draw(ctx)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handleTouchMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ 
        pointerEvents: 'none', 
        userSelect: 'none', 
        touchAction: 'none',
        WebkitTouchCallout: 'none'
      }}
    />
  )
}
