'use client'

import { useState } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

export default function AnimatedBackground() {
  // Используем ленивую инициализацию для избежания setState в эффекте
  const [stars] = useState<Star[]>(() => Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 3,
    opacity: 0.2 + Math.random() * 0.5,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 3
  })))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
      
      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-sparkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-yellow-300/40 rounded-full animate-float" style={{ animationDuration: '6s' }} />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-300/30 rounded-full animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-purple-300/40 rounded-full animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-blue-300/20 rounded-full animate-float" style={{ animationDuration: '9s', animationDelay: '0.5s' }} />
    </div>
  )
}
