'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { Target, Star, CheckCircle, Gift, Sparkles, Zap, X, RefreshCw, Trophy, BookOpen, Gamepad2, Flame } from 'lucide-react'

interface DailyTask {
  id: string
  title: string
  description: string
  points: number
  progress: number
  total: number
  type: 'lessons' | 'games' | 'points' | 'streak'
  icon: 'book' | 'game' | 'zap' | 'flame'
}

const getTodayKey = (): string => {
  return new Date().toISOString().split('T')[0]
}

export default function DailyTasks() {
  const { progress } = useSchool()
  const [isOpen, setIsOpen] = useState(false)
  const [taskBonusClaimed, setTaskBonusClaimed] = useState(false)

  const todayLessons = progress.todayLessons || 0
  const todayGames = progress.todayGames || 0
  const todayPoints = progress.todayPoints || 0
  const streak = progress.streak || 0

  const tasks: DailyTask[] = useMemo(() => [
    {
      id: 'complete_lesson',
      title: '📚 Пройди урок',
      description: 'Заверши один урок сегодня',
      points: 15,
      progress: Math.min(todayLessons, 1),
      total: 1,
      type: 'lessons',
      icon: 'book'
    },
    {
      id: 'play_game',
      title: '🎮 Сыграй в игру',
      description: 'Заверши одну игру сегодня',
      points: 20,
      progress: Math.min(todayGames, 1),
      total: 1,
      type: 'games',
      icon: 'game'
    },
    {
      id: 'earn_points',
      title: '⭐ Набери 30 баллов',
      description: 'Заработай баллы за сегодня',
      points: 25,
      progress: Math.min(todayPoints, 30),
      total: 30,
      type: 'points',
      icon: 'zap'
    },
    {
      id: 'streak_bonus',
      title: '🔥 Занимайся подряд',
      description: `Твоя серия: ${streak} дней`,
      points: streak >= 3 ? 30 : 0,
      progress: streak >= 3 ? 1 : 0,
      total: 1,
      type: 'streak',
      icon: 'flame'
    }
  ], [todayLessons, todayGames, todayPoints, streak])

  const completedTasks = tasks.filter(t => t.progress >= t.total).length
  const totalTasks = tasks.filter(t => t.points > 0).length
  const allCompleted = completedTasks === totalTasks && totalTasks > 0
  const totalReward = tasks.reduce((sum, t) => sum + (t.progress >= t.total ? t.points : 0), 0)

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'book': return <BookOpen className="w-5 h-5" />
      case 'game': return <Gamepad2 className="w-5 h-5" />
      case 'zap': return <Zap className="w-5 h-5" />
      case 'flame': return <Flame className="w-5 h-5" />
      default: return <Star className="w-5 h-5" />
    }
  }

  return (
    <>
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-4 rounded-full 
                   bg-gradient-to-br from-green-400 to-teal-500 
                   shadow-xl hover:scale-110 transition-transform
                   flex items-center gap-2 text-white font-bold"
      >
        <Target className="w-6 h-6" />
        <span className="hidden sm:inline">{completedTasks}/{totalTasks}</span>
        {completedTasks > 0 && completedTasks === totalTasks && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
        )}
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 
                        bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md 
                          bg-gradient-to-br from-gray-900 to-teal-900 
                          rounded-3xl border-4 border-teal-500/30 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-teal-600 p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/20">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Задания дня</h2>
                  <p className="text-teal-100">{completedTasks}/{totalTasks} выполнено</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* All completed message */}
            {allCompleted && !taskBonusClaimed && (
              <div className="p-6 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 
                              border-b border-yellow-400/30 text-center">
                <div className="flex justify-center gap-2 mb-2">
                  <Gift className="w-8 h-8 text-yellow-400" />
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-sparkle" />
                  <Trophy className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-xl font-bold text-yellow-300 mb-2">
                  Все задания выполнены! 🎉
                </p>
                <p className="text-yellow-200 mb-3">Ты заработал {totalReward} баллов!</p>
                <button
                  onClick={() => setTaskBonusClaimed(true)}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 
                             text-purple-900 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Забрать награду! ✨
                </button>
              </div>
            )}

            {/* Daily summary */}
            <div className="p-4 grid grid-cols-3 gap-3 border-b border-teal-500/20 bg-teal-800/30">
              <div className="text-center p-2 rounded-xl bg-white/5">
                <BookOpen className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <div className="text-lg font-black text-white">{todayLessons}</div>
                <div className="text-xs text-teal-300">уроков</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/5">
                <Gamepad2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <div className="text-lg font-black text-white">{todayGames}</div>
                <div className="text-xs text-teal-300">игр</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/5">
                <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <div className="text-lg font-black text-white">{todayPoints}</div>
                <div className="text-xs text-teal-300">баллов</div>
              </div>
            </div>

            {/* Tasks list */}
            <div className="p-6 space-y-4">
              {tasks.filter(t => t.points > 0).map((task) => {
                const isCompleted = task.progress >= task.total
                const progressPercent = Math.min((task.progress / task.total) * 100, 100)

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-2xl border-2 transition-all
                      ${isCompleted 
                        ? 'bg-green-500/20 border-green-400/50' 
                        : 'bg-white/5 border-white/10'}`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-2 rounded-xl transition-all
                        ${isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-600 text-gray-300'}`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          getIcon(task.icon)
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${isCompleted ? 'text-green-300' : 'text-white'}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-400">{task.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Zap className="w-4 h-4" />
                        <span className="font-bold">+{task.points}</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500
                          ${isCompleted 
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                            : 'bg-gradient-to-r from-teal-400 to-cyan-500'}`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="text-right text-sm text-gray-400 mt-1">
                      {Math.min(task.progress, task.total)}/{task.total}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-800/50 border-t border-white/10">
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Обновится завтра</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Zap className="w-4 h-4" />
                  <span>Заработано: {totalReward}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
