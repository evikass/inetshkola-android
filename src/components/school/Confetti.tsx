'use client'

import { useEffect, useState } from 'react'

interface ConfettiParticle {
  id: number
  x: number
  color: string
  delay: number
  size: number
  duration: number
}

export default function Confetti({ trigger = true }: { trigger?: boolean }) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!trigger) return

    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a855f7', '#ec4899', '#22c55e', '#f97316', '#06b6d4']
    const newParticles: ConfettiParticle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      size: 6 + Math.random() * 10,
      duration: 2 + Math.random() * 2
    }))

    setParticles(newParticles)
    setVisible(true)

    const timer = setTimeout(() => setVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [trigger])

  if (!visible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </div>
  )
}
