'use client'

import { useState, useEffect } from 'react'
import { X, Sparkles, Star } from 'lucide-react'
import { useSound } from '@/lib/sounds'

interface Sticker {
  id: string
  emoji: string
  name: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const STICKERS: Sticker[] = [
  // Common
  { id: 'star', emoji: '⭐', name: 'Звёздочка', rarity: 'common' },
  { id: 'heart', emoji: '❤️', name: 'Сердечко', rarity: 'common' },
  { id: 'flower', emoji: '🌸', name: 'Цветок', rarity: 'common' },
  { id: 'sun', emoji: '☀️', name: 'Солнышко', rarity: 'common' },
  { id: 'moon', emoji: '🌙', name: 'Луна', rarity: 'common' },
  // Rare
  { id: 'rainbow', emoji: '🌈', name: 'Радуга', rarity: 'rare' },
  { id: 'rocket', emoji: '🚀', name: 'Ракета', rarity: 'rare' },
  { id: 'unicorn', emoji: '🦄', name: 'Единорог', rarity: 'rare' },
  { id: 'crystal', emoji: '💎', name: 'Кристалл', rarity: 'rare' },
  // Epic
  { id: 'crown', emoji: '👑', name: 'Корона', rarity: 'epic' },
  { id: 'trophy', emoji: '🏆', name: 'Трофей', rarity: 'epic' },
  { id: 'fire', emoji: '🔥', name: 'Огонь', rarity: 'epic' },
  // Legendary
  { id: 'dragon', emoji: '🐉', name: 'Дракон', rarity: 'legendary' },
  { id: 'phoenix', emoji: '🔥', name: 'Феникс', rarity: 'legendary' },
]

const RARITY_COLORS = {
  common: 'from-gray-400 to-gray-500',
  rare: 'from-blue-400 to-cyan-500',
  epic: 'from-purple-400 to-pink-500',
  legendary: 'from-yellow-400 to-orange-500',
}

const RARITY_GLOW = {
  common: 'shadow-gray-400/50',
  rare: 'shadow-blue-400/50',
  epic: 'shadow-purple-400/50',
  legendary: 'shadow-yellow-400/50 animate-pulse',
}

interface StickerRewardProps {
  onClose: () => void
  reason: string
}

export default function StickerReward({ onClose, reason }: StickerRewardProps) {
  const [sticker, setSticker] = useState<Sticker | null>(null)
  const [showSticker, setShowSticker] = useState(false)
  const { playAchievement } = useSound()

  useEffect(() => {
    // Random sticker based on rarity weights
    const rand = Math.random()
    let pool: Sticker[]
    if (rand < 0.5) {
      pool = STICKERS.filter(s => s.rarity === 'common')
    } else if (rand < 0.8) {
      pool = STICKERS.filter(s => s.rarity === 'rare')
    } else if (rand < 0.95) {
      pool = STICKERS.filter(s => s.rarity === 'epic')
    } else {
      pool = STICKERS.filter(s => s.rarity === 'legendary')
    }
    
    const selected = pool[Math.floor(Math.random() * pool.length)]
    setSticker(selected)
    
    // Save to collection
    setTimeout(() => {
      const saved = localStorage.getItem('stickerCollection')
      const collection = saved ? JSON.parse(saved) : []
      if (!collection.includes(selected.id)) {
        collection.push(selected.id)
        localStorage.setItem('stickerCollection', JSON.stringify(collection))
      }
    }, 500)

    // Animate in
    setTimeout(() => {
      setShowSticker(true)
      playAchievement()
    }, 300)
  }, [playAchievement])

  if (!sticker) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-900 border-4 border-white/20 shadow-2xl animate-bounceIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <h2 className="text-2xl font-black text-white">Новая наклейка!</h2>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>

          <p className="text-purple-200 mb-6">{reason}</p>

          {/* Sticker reveal */}
          <div className={`relative w-40 h-40 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${RARITY_COLORS[sticker.rarity]} 
            flex items-center justify-center shadow-2xl ${RARITY_GLOW[sticker.rarity]}
            transition-all duration-500 ${showSticker ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <span className="text-8xl animate-bounce">{sticker.emoji}</span>
            
            {/* Sparkle effects */}
            {sticker.rarity !== 'common' && (
              <>
                <div className="absolute -top-2 -left-2 text-2xl animate-ping">✨</div>
                <div className="absolute -top-2 -right-2 text-2xl animate-ping" style={{ animationDelay: '0.2s' }}>✨</div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-ping" style={{ animationDelay: '0.4s' }}>✨</div>
                <div className="absolute -bottom-2 -right-2 text-2xl animate-ping" style={{ animationDelay: '0.6s' }}>✨</div>
              </>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">{sticker.name}</h3>
            <p className={`text-sm font-medium capitalize ${
              sticker.rarity === 'legendary' ? 'text-yellow-400' :
              sticker.rarity === 'epic' ? 'text-purple-300' :
              sticker.rarity === 'rare' ? 'text-blue-300' : 'text-gray-300'
            }`}>
              {sticker.rarity === 'common' && 'Обычная'}
              {sticker.rarity === 'rare' && 'Редкая'}
              {sticker.rarity === 'epic' && 'Эпическая'}
              {sticker.rarity === 'legendary' && 'Легендарная!'}
            </p>
          </div>

          <button onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold 
              hover:scale-105 transition-transform shadow-lg">
            <Star className="w-5 h-5 inline mr-2" />
            Забрал!
          </button>
        </div>
      </div>
    </div>
  )
}
