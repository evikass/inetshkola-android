'use client'

import { useSchool } from '@/context/SchoolContext'
import { Flame, Zap, Trophy, Star, Target } from 'lucide-react'
import { calculateLevel, levelProgress, getRank, xpForNextLevel } from '@/data/constants'

export default function LevelProgress() {
  const { progress, selectedClass } = useSchool()
  
  if (!selectedClass) return null

  const level = calculateLevel(progress.totalPoints)
  const rank = getRank(level)
  const progressPercent = levelProgress(progress.totalPoints)
  const xpToNext = xpForNextLevel(level)

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {/* Level and Rank */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${rank.color} text-white font-bold shadow-lg`}>
            <span className="text-xl mr-2">{rank.emoji}</span>
            <span className="text-lg">{rank.name}</span>
          </div>
          <div className="text-white/80">
            <span className="text-2xl font-black text-yellow-400">Ур. {level}</span>
          </div>
        </div>
        <div className="text-white/60 text-sm">
          {progress.totalPoints} / {xpToNext} XP
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="relative h-4 bg-white/10 rounded-full overflow-hidden mb-4">
        <div 
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${rank.color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white drop-shadow-lg">
            {Math.round(progressPercent)}%
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-colors">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{progress.totalPoints}</span>
          <span className="text-white/60 text-sm">очков</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-colors">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="text-white font-bold">{progress.streak}</span>
          <span className="text-white/60 text-sm">дней</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-colors">
          <Target className="w-5 h-5 text-green-400" />
          <span className="text-white font-bold">{progress.todayLessons || 0}</span>
          <span className="text-white/60 text-sm">уроков</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-colors">
          <Trophy className="w-5 h-5 text-purple-400" />
          <span className="text-white font-bold">{progress.achievements?.length || 0}</span>
          <span className="text-white/60 text-sm">наград</span>
        </div>
      </div>
    </div>
  )
}
