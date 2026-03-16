'use client'

import { useState, useMemo } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { 
  BarChart3, TrendingUp, Target, Flame, BookOpen, Gamepad2, 
  Trophy, Star, Zap, Clock, Calendar, X, ChevronRight,
  Award, Crown, Medal, PieChart
} from 'lucide-react'

interface StatCard {
  label: string
  value: number | string
  icon: React.ReactNode
  color: string
  suffix?: string
}

interface WeekActivity {
  day: string
  active: boolean
  lessons: number
}

export default function StudyStats() {
  const { progress, selectedClass } = useSchool()
  const [isOpen, setIsOpen] = useState(false)

  const completedLessons = Object.keys(progress.completedTopics).length
  const gamesPlayed = progress.gamesPlayed
  const streak = progress.streak
  const totalPoints = progress.totalPoints
  const achievements = progress.achievements.length
  const correctAnswers = progress.correctAnswers
  const totalAnswers = progress.totalAnswers
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0

  // Calculate level
  const level = useMemo(() => {
    if (totalPoints >= 1000) return { name: 'Легенда', icon: '🌟', color: 'from-amber-400 to-yellow-500' }
    if (totalPoints >= 500) return { name: 'Эксперт', icon: '👑', color: 'from-rose-400 to-red-500' }
    if (totalPoints >= 300) return { name: 'Мастер', icon: '🏆', color: 'from-purple-400 to-pink-500' }
    if (totalPoints >= 150) return { name: 'Знаток', icon: '⭐', color: 'from-yellow-400 to-orange-500' }
    if (totalPoints >= 50) return { name: 'Ученик', icon: '📚', color: 'from-blue-400 to-cyan-500' }
    return { name: 'Новичок', icon: '🌱', color: 'from-green-400 to-emerald-500' }
  }, [totalPoints])

  // Stats cards
  const stats: StatCard[] = [
    { label: 'Уроков пройдено', value: completedLessons, icon: <BookOpen className="w-5 h-5" />, color: 'text-blue-400', suffix: 'уроков' },
    { label: 'Игр сыграно', value: gamesPlayed, icon: <Gamepad2 className="w-5 h-5" />, color: 'text-green-400', suffix: 'игр' },
    { label: 'Дней подряд', value: streak, icon: <Flame className="w-5 h-5" />, color: 'text-orange-400', suffix: 'дней' },
    { label: 'Всего баллов', value: totalPoints, icon: <Zap className="w-5 h-5" />, color: 'text-yellow-400', suffix: 'баллов' },
    { label: 'Достижений', value: achievements, icon: <Trophy className="w-5 h-5" />, color: 'text-purple-400', suffix: 'шт' },
    { label: 'Точность', value: `${accuracy}%`, icon: <Target className="w-5 h-5" />, color: 'text-pink-400' }
  ]

  // Weekly activity (simulated based on streak)
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const weekActivity = useMemo((): WeekActivity[] => {
    const activity: WeekActivity[] = []
    for (let i = 0; i < 7; i++) {
      activity.push({
        day: weekDays[i],
        active: i < Math.min(streak, 7) && i <= new Date().getDay(),
        lessons: i < Math.min(completedLessons % 10, streak) ? Math.floor(Math.random() * 3) + 1 : 0
      })
    }
    return activity
  }, [streak, completedLessons])

  return (
    <>
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full 
                   bg-gradient-to-br from-indigo-500 to-blue-600 
                   shadow-xl hover:scale-105 transition-transform
                   flex items-center gap-2 text-white font-bold"
      >
        <BarChart3 className="w-5 h-5" />
        <span className="hidden sm:inline">Статистика</span>
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 
                        bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto
                          bg-gradient-to-br from-gray-900 to-indigo-900 
                          rounded-3xl border-4 border-indigo-500/30 shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-indigo-600 p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/20">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Моя статистика</h2>
                  <p className="text-indigo-200">
                    {selectedClass !== null 
                      ? (selectedClass === 0 ? 'Подготовительный класс' : `${selectedClass} класс`)
                      : 'Выбери класс'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Level card */}
            <div className="p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-b border-white/10">
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${level.color} shadow-lg`}>
                  <span className="text-4xl">{level.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-indigo-300 text-sm mb-1">Твой уровень</p>
                  <h3 className="text-2xl font-black text-white">{level.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">{totalPoints} баллов</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white">{accuracy}%</div>
                  <div className="text-indigo-300 text-sm">точность</div>
                </div>
              </div>
            </div>

            {/* Weekly activity */}
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Активность за неделю
              </h3>
              <div className="flex justify-between gap-2">
                {weekActivity.map((day, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className={`h-16 rounded-xl mb-2 flex items-center justify-center
                      ${day.active 
                        ? 'bg-gradient-to-t from-indigo-500 to-purple-500' 
                        : 'bg-white/5'}`}>
                      {day.active && <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />}
                    </div>
                    <span className="text-xs text-gray-400">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-indigo-400" />
                Общая статистика
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className={`flex items-center gap-2 mb-2 ${stat.color}`}>
                      {stat.icon}
                      <span className="text-sm text-gray-400">{stat.label}</span>
                    </div>
                    <div className="text-2xl font-black text-white">
                      {stat.value}
                      {stat.suffix && <span className="text-sm text-gray-400 ml-1">{stat.suffix}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress summary */}
            <div className="p-6 bg-gray-800/50 border-t border-white/10">
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Правильных ответов: {correctAnswers}/{totalAnswers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Продолжай в том же духе!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
