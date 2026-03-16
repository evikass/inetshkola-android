'use client'

import { useState, useEffect } from 'react'
import { Flame, Calendar, ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface StreakDay {
  date: string
  hasActivity: boolean
  points: number
  lessons: number
  games: number
}

export default function StreakCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [streakData, setStreakData] = useState<Record<string, StreakDay>>({})
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  useEffect(() => {
    // Load streak data from localStorage
    const savedProgress = localStorage.getItem('schoolProgress')
    const savedStreakData = localStorage.getItem('streakCalendar')
    
    if (savedStreakData) {
      setStreakData(JSON.parse(savedStreakData))
    }
    
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setCurrentStreak(progress.streak || 0)
    }
    
    // Calculate longest streak from data
    if (savedStreakData) {
      const data = JSON.parse(savedStreakData)
      let maxStreak = 0
      let tempStreak = 0
      const sortedDates = Object.keys(data).sort()
      
      for (let i = 0; i < sortedDates.length; i++) {
        if (data[sortedDates[i]].hasActivity) {
          tempStreak++
          maxStreak = Math.max(maxStreak, tempStreak)
        } else {
          tempStreak = 0
        }
      }
      setLongestStreak(maxStreak)
    }
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    return { daysInMonth, firstDay }
  }

  const { daysInMonth, firstDay } = getDaysInMonth(currentMonth)

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const getDayStyle = (dateStr: string) => {
    const dayData = streakData[dateStr]
    if (!dayData || !dayData.hasActivity) {
      return 'bg-white/5 border-white/10'
    }
    
    // Gradient based on activity level
    if (dayData.points >= 100) return 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-400'
    if (dayData.points >= 50) return 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-400'
    if (dayData.points >= 20) return 'bg-gradient-to-br from-blue-400 to-cyan-500 border-blue-400'
    return 'bg-gradient-to-br from-purple-400 to-pink-500 border-purple-400'
  }

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0]
  }

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const today = getTodayString()

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-white/5 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Календарь активности</h3>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-white/70 text-sm">Текущая серия</span>
          </div>
          <div className="text-3xl font-black text-orange-400">{currentStreak}</div>
          <div className="text-white/50 text-xs">дней</div>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white/70 text-sm">Лучшая серия</span>
          </div>
          <div className="text-3xl font-black text-yellow-400">{longestStreak}</div>
          <div className="text-white/50 text-xs">дней</div>
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="text-lg font-bold text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs text-white/50 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: (firstDay + 6) % 7 }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dateStr = formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          const dayData = streakData[dateStr]
          const isToday = dateStr === today
          
          return (
            <div
              key={day}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm
                transition-all cursor-default ${getDayStyle(dateStr)}
                ${isToday ? 'ring-2 ring-white ring-offset-2 ring-offset-purple-900' : ''}`}
              title={dayData ? `${dayData.points} очков, ${dayData.lessons} уроков, ${dayData.games} игр` : ''}
            >
              <span className={`font-medium ${dayData?.hasActivity ? 'text-white' : 'text-white/40'}`}>
                {day}
              </span>
              {dayData?.hasActivity && (
                <span className="text-[8px] mt-0.5">🔥</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-purple-400 to-pink-500" />
          <span className="text-white/60">Мало</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-blue-400 to-cyan-500" />
          <span className="text-white/60">Норма</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-green-400 to-emerald-500" />
          <span className="text-white/60">Хорошо</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-yellow-400 to-orange-500" />
          <span className="text-white/60">Отлично</span>
        </div>
      </div>
    </div>
  )
}
