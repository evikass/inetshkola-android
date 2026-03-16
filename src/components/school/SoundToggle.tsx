'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { soundManager, useSound } from '@/lib/sounds'

// Re-export useSound for other components
export { useSound }

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    setEnabled(soundManager.isEnabled())
  }, [])

  const toggleSound = () => {
    const newState = !enabled
    setEnabled(newState)
    soundManager.setEnabled(newState)
  }

  return (
    <button
      onClick={toggleSound}
      className={`p-2 rounded-xl transition-all ${
        enabled 
          ? 'bg-white/10 text-white hover:bg-white/20' 
          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
      }`}
      title={enabled ? 'Выключить звуки' : 'Включить звуки'}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  )
}
