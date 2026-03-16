'use client'

import { useSchool } from '@/context/SchoolContext'
import { Trophy, Star, Zap, Target, Flame, Gamepad2 } from 'lucide-react'

// Система уровней
const levels = [
  { level: 1, name: 'Новичок', minPoints: 0, icon: '🌱', color: 'from-green-400 to-emerald-500' },
  { level: 2, name: 'Ученик', minPoints: 50, icon: '📚', color: 'from-blue-400 to-cyan-500' },
  { level: 3, name: 'Знаток', minPoints: 150, icon: '⭐', color: 'from-yellow-400 to-orange-500' },
  { level: 4, name: 'Мастер', minPoints: 300, icon: '🏆', color: 'from-purple-400 to-pink-500' },
  { level: 5, name: 'Эксперт', minPoints: 500, icon: '👑', color: 'from-rose-400 to-red-500' },
  { level: 6, name: 'Легенда', minPoints: 1000, icon: '🌟', color: 'from-amber-400 to-yellow-500' },
]

export default function ProgressBarImproved() {
  const { progress, selectedClass } = useSchool()
  const points = progress.totalPoints
  const completedCount = Object.keys(progress.completedTopics).length
  const streak = progress.streak
  const gamesPlayed = progress.gamesPlayed

  // Находим текущий и следующий уровень
  const currentLevelIndex = levels.findIndex((l, i) => {
    const nextLevel = levels[i + 1]
    return points >= l.minPoints && (!nextLevel || points < nextLevel.minPoints)
  })
  const currentLevel = levels[Math.max(0, currentLevelIndex)]
  const nextLevel = levels[currentLevelIndex + 1]

  // Прогресс до следующего уровня
  const currentLevelPoints = currentLevel.minPoints
  const nextLevelPoints = nextLevel?.minPoints || (currentLevel.minPoints + 500)
  const pointsInLevel = points - currentLevelPoints
  const pointsNeeded = nextLevelPoints - currentLevelPoints
  const progressPercent = nextLevel 
    ? Math.min((pointsInLevel / pointsNeeded) * 100, 100)
    : 100

  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 
                    bg-gradient-to-r from-gray-900/90 via-purple-900/70 to-pink-900/90
                    border-2 border-white/20 shadow-2xl backdrop-blur-xl">
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/10 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative p-5 md:p-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Level badge */}
          <div className={`flex-shrink-0 p-3 md:p-4 rounded-2xl bg-gradient-to-br ${currentLevel.color} 
                          shadow-lg transform hover:scale-105 transition-transform`}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-1">{currentLevel.icon}</div>
              <div className="text-xs md:text-sm font-bold text-white/90">Ур. {currentLevel.level}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4 mb-3">
              {/* Level name */}
              <div>
                <h3 className="text-lg md:text-xl font-black text-white">{currentLevel.name}</h3>
                {nextLevel && (
                  <p className="text-purple-300 text-xs md:text-sm">
                    До {nextLevel.name}: {pointsNeeded - pointsInLevel} баллов
                  </p>
                )}
              </div>

              {/* Points */}
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text 
                               bg-gradient-to-r from-yellow-300 to-orange-300">
                  {points}
                </span>
                <span className="text-purple-300 text-sm hidden sm:inline">баллов</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-3 md:h-4 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${currentLevel.color}
                           transition-all duration-1000 ease-out`}
                style={{ width: `${progressPercent}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                     style={{ animation: 'shimmer 2s infinite' }} />
              </div>
              
              {/* Level markers */}
              {nextLevel && (
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  <span className="text-xs text-white/70">{currentLevel.icon}</span>
                  <span className="text-xs text-white/70">{nextLevel.icon}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-2 md:gap-3 flex-shrink-0 flex-wrap justify-center">
            {/* Streak */}
            <div className={`text-center p-2 md:p-3 rounded-xl transition-colors ${
              streak >= 7 ? 'bg-orange-500/20 ring-2 ring-orange-400/50' : 'bg-white/5 hover:bg-white/10'
            }`}>
              <div className="flex items-center gap-1 text-orange-400 mb-1">
                <Flame className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-lg md:text-xl font-bold">{streak}</span>
              </div>
              <div className="text-xs text-purple-300">дней</div>
            </div>

            {/* Games */}
            <div className="text-center p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-1 text-green-400 mb-1">
                <Gamepad2 className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-lg md:text-xl font-bold">{gamesPlayed}</span>
              </div>
              <div className="text-xs text-purple-300">игр</div>
            </div>
            
            {/* Lessons */}
            <div className="text-center p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-1 text-blue-400 mb-1">
                <Target className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-lg md:text-xl font-bold">{completedCount}</span>
              </div>
              <div className="text-xs text-purple-300">уроков</div>
            </div>
            
            {/* Achievements */}
            <div className="text-center p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-1 text-yellow-400 mb-1">
                <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-lg md:text-xl font-bold">{progress.achievements.length}</span>
              </div>
              <div className="text-xs text-purple-300">наград</div>
            </div>

            {selectedClass !== null && (
              <div className="text-center p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="text-lg md:text-xl font-bold text-purple-300 mb-1">
                  {selectedClass === 0 ? '🎒' : selectedClass}
                </div>
                <div className="text-xs text-purple-300">
                  {selectedClass === 0 ? 'подг' : 'класс'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
