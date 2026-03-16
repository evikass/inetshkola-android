'use client'

import { useMemo } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { Crown, Star, Zap, Trophy, Medal, Rocket, Diamond, Sparkles, Flame, Target } from 'lucide-react'

interface Level {
  level: number
  name: string
  icon: React.ReactNode
  minPoints: number
  maxPoints: number
  color: string
  bgGradient: string
  badge: string
  description: string
}

const levels: Level[] = [
  { 
    level: 1, 
    name: 'Новичок', 
    icon: <Star className="w-5 h-5" />,
    minPoints: 0, 
    maxPoints: 49,
    color: 'text-gray-400',
    bgGradient: 'from-gray-400 to-gray-500',
    badge: '⭐',
    description: 'Начни своё путешествие!'
  },
  { 
    level: 2, 
    name: 'Ученик', 
    icon: <Medal className="w-5 h-5" />,
    minPoints: 50, 
    maxPoints: 149,
    color: 'text-green-400',
    bgGradient: 'from-green-400 to-emerald-500',
    badge: '🏅',
    description: 'Ты на правильном пути!'
  },
  { 
    level: 3, 
    name: 'Знаток', 
    icon: <Target className="w-5 h-5" />,
    minPoints: 150, 
    maxPoints: 299,
    color: 'text-blue-400',
    bgGradient: 'from-blue-400 to-cyan-500',
    badge: '🎯',
    description: 'Отличные знания!'
  },
  { 
    level: 4, 
    name: 'Мастер', 
    icon: <Trophy className="w-5 h-5" />,
    minPoints: 300, 
    maxPoints: 499,
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-400 to-orange-500',
    badge: '🏆',
    description: 'Ты настоящий мастер!'
  },
  { 
    level: 5, 
    name: 'Эксперт', 
    icon: <Crown className="w-5 h-5" />,
    minPoints: 500, 
    maxPoints: 999,
    color: 'text-purple-400',
    bgGradient: 'from-purple-400 to-pink-500',
    badge: '👑',
    description: 'Превосходные результаты!'
  },
  { 
    level: 6, 
    name: 'Легенда', 
    icon: <Diamond className="w-5 h-5" />,
    minPoints: 1000, 
    maxPoints: 2499,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-400 to-blue-500',
    badge: '💎',
    description: 'Ты легенда!'
  },
  { 
    level: 7, 
    name: 'Миф', 
    icon: <Rocket className="w-5 h-5" />,
    minPoints: 2500, 
    maxPoints: 4999,
    color: 'text-rose-400',
    bgGradient: 'from-rose-400 to-red-500',
    badge: '🚀',
    description: 'Невероятные достижения!'
  },
  { 
    level: 8, 
    name: 'Божество', 
    icon: <Sparkles className="w-6 h-6" />,
    minPoints: 5000, 
    maxPoints: Infinity,
    color: 'text-amber-400',
    bgGradient: 'from-amber-400 via-yellow-300 to-amber-500',
    badge: '✨',
    description: 'Высший уровень!'
  },
]

export function useLevel() {
  const { progress } = useSchool()
  const points = progress.totalPoints
  
  return useMemo(() => {
    let currentLevel = levels[0]
    let nextLevel: Level | null = null
    
    for (let i = levels.length - 1; i >= 0; i--) {
      if (points >= levels[i].minPoints) {
        currentLevel = levels[i]
        nextLevel = levels[i + 1] || null
        break
      }
    }
    
    const progressInLevel = nextLevel 
      ? points - currentLevel.minPoints 
      : currentLevel.maxPoints - currentLevel.minPoints
    const pointsNeeded = nextLevel 
      ? nextLevel.minPoints - currentLevel.minPoints 
      : currentLevel.maxPoints - currentLevel.minPoints
    const progressPercent = nextLevel 
      ? Math.min((progressInLevel / pointsNeeded) * 100, 100)
      : 100
    
    return { currentLevel, nextLevel, progressPercent, pointsNeeded, progressInLevel }
  }, [points])
}

export default function LevelBadge() {
  const { progress } = useSchool()
  const { currentLevel, nextLevel, progressPercent, progressInLevel, pointsNeeded } = useLevel()
  
  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10">
      {/* Level header */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-xl bg-gradient-to-br ${currentLevel.bgGradient} text-white shadow-lg`}>
          {currentLevel.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">Уровень {currentLevel.level}</span>
            <span className="text-2xl">{currentLevel.badge}</span>
          </div>
          <p className={`${currentLevel.color} font-medium`}>{currentLevel.name}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-400">
            <Zap className="w-4 h-4" />
            <span className="font-bold">{progress.totalPoints}</span>
          </div>
          <p className="text-xs text-gray-400">баллов</p>
        </div>
      </div>
      
      {/* Progress bar */}
      {nextLevel && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>До {nextLevel.name}</span>
            <span>{progressInLevel}/{pointsNeeded}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${currentLevel.bgGradient} transition-all duration-500`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Max level */}
      {!nextLevel && (
        <div className="text-center py-2">
          <p className="text-amber-400 font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            Максимальный уровень!
            <Sparkles className="w-5 h-5 animate-pulse" />
          </p>
        </div>
      )}
    </div>
  )
}
