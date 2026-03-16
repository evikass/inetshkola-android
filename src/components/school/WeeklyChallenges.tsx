'use client'

import { useState, useMemo } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { Calendar, Star, Zap, Trophy, Gift, CheckCircle, Clock, ChevronRight, X, Target, Flame, BookOpen, Gamepad2, Medal } from 'lucide-react'

interface WeeklyChallenge {
  id: string
  title: string
  description: string
  icon: 'lessons' | 'games' | 'streak' | 'points'
  target: number
  reward: number
  bonusReward?: string
}

const getWeekNumber = (): number => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const diff = now.getTime() - start.getTime()
  const oneWeek = 604800000
  return Math.ceil(diff / oneWeek)
}

const getWeekChallenges = (weekNum: number): WeeklyChallenge[] => {
  const seed = weekNum * 7
  const challenges: WeeklyChallenge[] = [
    {
      id: `week_${weekNum}_lessons`,
      title: 'Книжный червь',
      description: 'Пройди 5 уроков за неделю',
      icon: 'lessons',
      target: 5,
      reward: 50,
      bonusReward: 'Значок "Читатель"'
    },
    {
      id: `week_${weekNum}_games`,
      title: 'Игроман',
      description: 'Сыграй 7 игр за неделю',
      icon: 'games',
      target: 7,
      reward: 60,
      bonusReward: 'Значок "Геймер"'
    },
    {
      id: `week_${weekNum}_streak`,
      title: 'Марафонец',
      description: 'Занимайся 5 дней подряд',
      icon: 'streak',
      target: 5,
      reward: 70
    },
    {
      id: `week_${weekNum}_points`,
      title: 'Охотник за баллами',
      description: 'Набери 200 баллов за неделю',
      icon: 'points',
      target: 200,
      reward: 100
    }
  ]

  return challenges
}

export default function WeeklyChallenges() {
  const { progress } = useSchool()
  const [isOpen, setIsOpen] = useState(false)

  const weekNum = getWeekNumber()
  const challenges = useMemo(() => getWeekChallenges(weekNum), [weekNum])

  const completedLessons = Object.keys(progress.completedTopics).length
  const gamesPlayed = progress.gamesPlayed
  const streak = progress.streak
  const totalPoints = progress.totalPoints

  const getProgress = (challenge: WeeklyChallenge): number => {
    switch (challenge.icon) {
      case 'lessons': return Math.min(completedLessons, challenge.target)
      case 'games': return Math.min(gamesPlayed, challenge.target)
      case 'streak': return Math.min(streak, challenge.target)
      case 'points': return Math.min(totalPoints, challenge.target)
      default: return 0
    }
  }

  const completedCount = challenges.filter(c => getProgress(c) >= c.target).length
  const totalRewards = challenges.reduce((sum, c) => sum + c.reward, 0)

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'lessons': return <BookOpen className="w-6 h-6" />
      case 'games': return <Gamepad2 className="w-6 h-6" />
      case 'streak': return <Flame className="w-6 h-6" />
      case 'points': return <Zap className="w-6 h-6" />
      default: return <Star className="w-6 h-6" />
    }
  }

  const getIconColor = (icon: string): string => {
    switch (icon) {
      case 'lessons': return 'from-blue-400 to-cyan-500'
      case 'games': return 'from-green-400 to-emerald-500'
      case 'streak': return 'from-orange-400 to-red-500'
      case 'points': return 'from-yellow-400 to-amber-500'
      default: return 'from-purple-400 to-pink-500'
    }
  }

  return (
    <>
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-40 p-4 rounded-full 
                   bg-gradient-to-br from-violet-500 to-purple-600 
                   shadow-xl hover:scale-110 transition-transform
                   flex items-center gap-2 text-white font-bold"
      >
        <Calendar className="w-6 h-6" />
        <span className="hidden sm:inline">{completedCount}/{challenges.length}</span>
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 
                        bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto
                          bg-gradient-to-br from-gray-900 to-violet-900 
                          rounded-3xl border-4 border-violet-500/30 shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-violet-600 p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/20">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Недельные челленджи</h2>
                  <p className="text-violet-200">Неделя {weekNum} • {completedCount}/{challenges.length} выполнено</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Total rewards */}
            <div className="p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-b border-yellow-400/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-300 font-medium">Возможная награда:</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 font-bold">
                  <Zap className="w-5 h-5" />
                  <span>{totalRewards} баллов</span>
                </div>
              </div>
            </div>

            {/* Challenges list */}
            <div className="p-6 space-y-4">
              {challenges.map((challenge) => {
                const currentProgress = getProgress(challenge)
                const isCompleted = currentProgress >= challenge.target
                const progressPercent = Math.min((currentProgress / challenge.target) * 100, 100)

                return (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-2xl border-2 transition-all
                      ${isCompleted 
                        ? 'bg-green-500/20 border-green-400/50' 
                        : 'bg-white/5 border-white/10'}`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${getIconColor(challenge.icon)}
                                       text-white shadow-lg`}>
                        {getIcon(challenge.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-bold ${isCompleted ? 'text-green-300' : 'text-white'}`}>
                            {challenge.title}
                          </h3>
                          {isCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
                        </div>
                        <p className="text-sm text-gray-400">{challenge.description}</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500
                            ${isCompleted 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                              : 'bg-gradient-to-r from-violet-400 to-purple-500'}`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-400">{currentProgress}/{challenge.target}</span>
                        <span className="text-purple-300">{Math.round(progressPercent)}%</span>
                      </div>
                    </div>

                    {/* Reward */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Zap className="w-4 h-4" />
                        <span className="font-bold">+{challenge.reward}</span>
                      </div>
                      {challenge.bonusReward && (
                        <div className="flex items-center gap-1 text-purple-300 text-sm">
                          <Medal className="w-4 h-4" />
                          {challenge.bonusReward}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-800/50 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>Новые челленджи каждый понедельник</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
