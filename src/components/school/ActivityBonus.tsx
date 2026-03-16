'use client'

import { useMemo } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { Sparkles, Zap, Star, Gift, Crown, Rocket, Flame, Trophy, Diamond, Heart } from 'lucide-react'

interface BonusTier {
  minStreak: number
  name: string
  multiplier: number
  icon: React.ReactNode
  color: string
  description: string
}

const bonusTiers: BonusTier[] = [
  { minStreak: 0, name: 'Старт', multiplier: 1.0, icon: <Sparkles className="w-5 h-5" />, color: 'from-gray-400 to-gray-500', description: 'Начни серию!' },
  { minStreak: 3, name: 'Новичок', multiplier: 1.1, icon: <Star className="w-5 h-5" />, color: 'from-green-400 to-emerald-500', description: '+10% к баллам' },
  { minStreak: 7, name: 'Ученик', multiplier: 1.2, icon: <Zap className="w-5 h-5" />, color: 'from-blue-400 to-cyan-500', description: '+20% к баллам' },
  { minStreak: 14, name: 'Знаток', multiplier: 1.35, icon: <Flame className="w-5 h-5" />, color: 'from-orange-400 to-red-500', description: '+35% к баллам' },
  { minStreak: 21, name: 'Мастер', multiplier: 1.5, icon: <Trophy className="w-5 h-5" />, color: 'from-purple-400 to-pink-500', description: '+50% к баллам' },
  { minStreak: 30, name: 'Эксперт', multiplier: 1.75, icon: <Crown className="w-5 h-5" />, color: 'from-yellow-400 to-orange-500', description: '+75% к баллам' },
  { minStreak: 60, name: 'Легенда', multiplier: 2.0, icon: <Diamond className="w-5 h-5" />, color: 'from-rose-400 to-purple-500', description: 'x2 к баллам!' },
  { minStreak: 100, name: 'Миф', multiplier: 2.5, icon: <Rocket className="w-6 h-6" />, color: 'from-amber-400 to-yellow-300', description: 'x2.5 к баллам!' },
]

export function useBonusMultiplier(): { multiplier: number; tier: BonusTier; nextTier: BonusTier | null } {
  const { progress } = useSchool()
  const streak = progress.streak
  
  return useMemo(() => {
    let currentTier = bonusTiers[0]
    let nextTier: BonusTier | null = null
    
    for (let i = bonusTiers.length - 1; i >= 0; i--) {
      if (streak >= bonusTiers[i].minStreak) {
        currentTier = bonusTiers[i]
        nextTier = bonusTiers[i + 1] || null
        break
      }
    }
    
    return { multiplier: currentTier.multiplier, tier: currentTier, nextTier }
  }, [streak])
}

export default function ActivityBonus() {
  const { progress } = useSchool()
  const { multiplier, tier, nextTier } = useBonusMultiplier()
  const streak = progress.streak
  
  const progressToNext = nextTier 
    ? ((streak - tier.minStreak) / (nextTier.minStreak - tier.minStreak)) * 100
    : 100
  
  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${tier.color} text-white shadow-lg`}>
          {tier.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">{tier.name}</span>
            {multiplier > 1 && (
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">
                x{multiplier}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">{tier.description}</p>
        </div>
      </div>
      
      {nextTier && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">До {nextTier.name}</span>
            <span className="text-gray-400">{streak}/{nextTier.minStreak} дней</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${tier.color} transition-all duration-500`}
              style={{ width: `${Math.min(progressToNext, 100)}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Streak display */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-orange-400">
          <Flame className="w-5 h-5" />
          <span className="font-bold">{streak} дней</span>
        </div>
        <div className="flex items-center gap-2 text-yellow-400">
          <Zap className="w-5 h-5" />
          <span className="font-bold">x{multiplier}</span>
        </div>
      </div>
    </div>
  )
}
