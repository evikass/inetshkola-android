'use client'

import { useState, useEffect } from 'react'
import { BarChart, TrendingUp, Target, Clock, Star, Flame, BookOpen, Gamepad2, Award, Calendar } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

interface DayStats {
  date: string
  lessons: number
  games: number
  points: number
  accuracy: number
}

export default function StatsDashboard() {
  const { progress } = useSchool()
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week')
  const [historyData, setHistoryData] = useState<DayStats[]>([])

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('studyHistory')
    if (saved) {
      setHistoryData(JSON.parse(saved))
    }
  }, [])

  // Calculate stats
  const accuracy = progress.totalAnswers > 0 
    ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) 
    : 0
  
  const totalLessons = Object.keys(progress.completedTopics).length
  const averageAccuracy = historyData.length > 0
    ? Math.round(historyData.reduce((sum, d) => sum + d.accuracy, 0) / historyData.length)
    : accuracy

  // Generate chart data for last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  const chartData = last7Days.map(date => {
    const dayData = historyData.find(d => d.date === date)
    return {
      day: new Date(date).toLocaleDateString('ru-RU', { weekday: 'short' }),
      points: dayData?.points || 0,
      lessons: dayData?.lessons || 0,
      games: dayData?.games || 0
    }
  })

  const maxPoints = Math.max(...chartData.map(d => d.points), 1)

  // Subject progress
  const subjectStats = [
    { name: 'Математика', emoji: '🔢', progress: 65, color: 'from-blue-500 to-cyan-500' },
    { name: 'Русский язык', emoji: '📝', progress: 48, color: 'from-red-500 to-rose-500' },
    { name: 'История', emoji: '🏛️', progress: 32, color: 'from-amber-500 to-orange-500' },
    { name: 'Английский', emoji: '🇬🇧', progress: 55, color: 'from-purple-500 to-pink-500' },
    { name: 'Биология', emoji: '🔬', progress: 28, color: 'from-green-500 to-emerald-500' },
  ]

  // Achievements summary
  const achievementsCount = progress.achievements.length
  const totalAchievements = 20

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      
      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-400/30">
          <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
            <Star className="w-4 h-4" />
            <span>Очки</span>
          </div>
          <div className="text-2xl font-bold text-white">{progress.totalPoints.toLocaleString()}</div>
        </div>
        
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-400/30">
          <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
            <Flame className="w-4 h-4" />
            <span>Серия</span>
          </div>
          <div className="text-2xl font-bold text-white">{progress.streak} дней</div>
        </div>
        
        <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30">
          <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
            <Target className="w-4 h-4" />
            <span>Точность</span>
          </div>
          <div className="text-2xl font-bold text-white">{accuracy}%</div>
        </div>
        
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
          <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Уроки</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalLessons}</div>
        </div>
      </div>

      {/* Activity chart */}
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-white">Активность</span>
          </div>
          <div className="flex gap-1">
            {(['week', 'month', 'all'] as const).map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg text-xs transition-all ${
                  selectedPeriod === period 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {period === 'week' ? 'Неделя' : period === 'month' ? 'Месяц' : 'Всё'}
              </button>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end justify-between gap-2 h-32 mb-2">
          {chartData.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all duration-500"
                style={{ height: `${(day.points / maxPoints) * 100}%`, minHeight: day.points > 0 ? '8px' : '0' }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-white/40">
          {chartData.map((day, i) => (
            <span key={i} className="flex-1 text-center">{day.day}</span>
          ))}
        </div>
      </div>

      {/* Subject progress */}
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <span className="font-bold text-white">Прогресс по предметам</span>
        </div>
        
        <div className="space-y-3">
          {subjectStats.map(subject => (
            <div key={subject.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span>{subject.emoji}</span>
                  <span className="text-sm text-white/80">{subject.name}</span>
                </div>
                <span className="text-sm text-white/60">{subject.progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${subject.color} transition-all duration-500`}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-purple-400 text-sm mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>Игр сыграно</span>
          </div>
          <div className="text-xl font-bold text-white">{progress.gamesPlayed}</div>
        </div>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-blue-400 text-sm mb-1">
            <Clock className="w-4 h-4" />
            <span>Ответов</span>
          </div>
          <div className="text-xl font-bold text-white">{progress.totalAnswers}</div>
        </div>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-yellow-400 text-sm mb-1">
            <Award className="w-4 h-4" />
            <span>Достижений</span>
          </div>
          <div className="text-xl font-bold text-white">{achievementsCount}/{totalAchievements}</div>
        </div>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-green-400 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Средняя точность</span>
          </div>
          <div className="text-xl font-bold text-white">{averageAccuracy}%</div>
        </div>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-orange-400 text-sm mb-1">
            <Calendar className="w-4 h-4" />
            <span>Сегодня</span>
          </div>
          <div className="text-xl font-bold text-white">+{progress.todayPoints} очков</div>
        </div>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-pink-400 text-sm mb-1">
            <Star className="w-4 h-4" />
            <span>Любимый предмет</span>
          </div>
          <div className="text-xl font-bold text-white truncate">
            {progress.favoriteSubject || '—'}
          </div>
        </div>
      </div>
    </div>
  )
}
