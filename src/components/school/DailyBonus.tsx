'use client'

import { useState, useMemo } from 'react'
import { Gift, Star, Flame, Zap, X } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from '@/lib/sounds'
import { calculateLevel, getRank, XP_REWARDS } from '@/data/constants'

interface DailyBonusProps {
  onClose: () => void
}

export default function DailyBonus({ onClose }: DailyBonusProps) {
  const { progress, addPoints, unlockAchievement } = useSchool()
  const [claimed, setClaimed] = useState(false)
  const { playAchievement } = useSound()

  const level = calculateLevel(progress.totalPoints)
  const rank = getRank(level)

  // Calculate daily bonus based on streak and level using useMemo
  const bonusAmount = useMemo(() => {
    const baseBonus = XP_REWARDS.DAILY_LOGIN
    const streakBonus = Math.min(progress.streak, 7) * XP_REWARDS.STREAK_BONUS
    const levelBonus = Math.floor(level * 2)
    return baseBonus + streakBonus + levelBonus
  }, [progress.streak, level])

  const claimBonus = () => {
    if (claimed) return
    setClaimed(true)
    playAchievement()
    addPoints(bonusAmount)
    
    // Check streak achievements
    if (progress.streak >= 3) unlockAchievement('streak_3')
    if (progress.streak >= 7) unlockAchievement('streak_7')
    if (progress.streak >= 30) unlockAchievement('streak_30')
  }

  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 rounded-3xl bg-gradient-to-br ${rank.color} border-4 border-white/30 shadow-2xl animate-bounceIn`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <Gift className="w-14 h-14 text-white animate-bounce" />
          </div>

          <h2 className="text-3xl font-black text-white mb-2">
            {claimed ? '🎉 Получено!' : '🎁 Ежедневный бонус!'}
          </h2>

          <p className="text-white/80 mb-6">{today}</p>

          {/* Streak display */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-300">{progress.streak}</div>
              <div className="text-white/70 text-sm flex items-center justify-center gap-1">
                <Flame className="w-4 h-4" />дней подряд
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white">{level}</div>
              <div className="text-white/70 text-sm">уровень</div>
            </div>
          </div>

          {/* Bonus breakdown */}
          <div className="bg-white/10 rounded-2xl p-4 mb-6">
            <div className="flex justify-between text-white/80 mb-2">
              <span>Базовый бонус</span>
              <span className="font-bold">+{XP_REWARDS.DAILY_LOGIN} XP</span>
            </div>
            <div className="flex justify-between text-white/80 mb-2">
              <span>Бонус за серию ({Math.min(progress.streak, 7)} дней)</span>
              <span className="font-bold text-yellow-300">+{Math.min(progress.streak, 7) * XP_REWARDS.STREAK_BONUS} XP</span>
            </div>
            <div className="flex justify-between text-white/80 mb-2">
              <span>Бонус за уровень {level}</span>
              <span className="font-bold text-cyan-300">+{Math.floor(level * 2)} XP</span>
            </div>
            <div className="border-t border-white/20 my-2" />
            <div className="flex justify-between text-white text-xl font-bold">
              <span>Итого</span>
              <span className="text-yellow-300">+{bonusAmount} XP</span>
            </div>
          </div>

          {/* Claim button */}
          {!claimed ? (
            <button onClick={claimBonus}
              className="w-full py-4 bg-white text-purple-600 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-lg">
              <Star className="w-6 h-6 inline mr-2" />
              Забрать бонус!
            </button>
          ) : (
            <div className="space-y-4">
              <div className="py-4 bg-green-500/30 rounded-2xl text-white font-bold text-xl">
                <Zap className="w-6 h-6 inline mr-2 text-yellow-300" />
                +{bonusAmount} XP начислены!
              </div>
              <button onClick={onClose}
                className="w-full py-3 bg-white/20 text-white rounded-2xl font-bold hover:bg-white/30 transition-colors">
                Начать обучение
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
