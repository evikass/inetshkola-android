'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, X, TrendingUp, TrendingDown, Clock, Star, Target,
  Calendar, BookOpen, Gamepad2, Award, BarChart3, PieChart,
  ChevronRight, Eye, Settings, Bell, Download, Printer
} from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

interface StudySession {
  date: string
  subject: string
  duration: number // минуты
  lessonsCompleted: number
  gamesPlayed: number
  pointsEarned: number
}

// Демо-данные сессий (в реальном приложении хранятся в localStorage)
const generateDemoSessions = (): StudySession[] => {
  const sessions: StudySession[] = []
  const subjects = ['Русский язык', 'Математика', 'Окружающий мир', 'Литература']
  const today = new Date()
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    sessions.push({
      date: date.toISOString().split('T')[0],
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      duration: Math.floor(Math.random() * 30) + 10,
      lessonsCompleted: Math.floor(Math.random() * 3) + 1,
      gamesPlayed: Math.floor(Math.random() * 2),
      pointsEarned: Math.floor(Math.random() * 50) + 10
    })
  }
  return sessions
}

export default function ParentDashboard() {
  const { totalPoints, totalStars, selectedGrade, achievements } = useSchool()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'subjects'>('overview')
  
  // Используем ленивую инициализацию для sessions
  const [sessions, setSessions] = useState<StudySession[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('studySessions')
    if (saved) {
      return JSON.parse(saved)
    } else {
      const demo = generateDemoSessions()
      localStorage.setItem('studySessions', JSON.stringify(demo))
      return demo
    }
  })
  
  // Статистика
  const stats = useMemo(() => {
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0)
    const totalLessons = sessions.reduce((sum, s) => sum + s.lessonsCompleted, 0)
    const totalGames = sessions.reduce((sum, s) => sum + s.gamesPlayed, 0)
    const avgDuration = sessions.length > 0 ? Math.round(totalDuration / sessions.length) : 0
    
    // За последнюю неделю
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekSessions = sessions.filter(s => new Date(s.date) >= weekAgo)
    const weekDuration = weekSessions.reduce((sum, s) => sum + s.duration, 0)
    
    // По предметам
    const bySubject: Record<string, { duration: number; lessons: number }> = {}
    sessions.forEach(s => {
      if (!bySubject[s.subject]) {
        bySubject[s.subject] = { duration: 0, lessons: 0 }
      }
      bySubject[s.subject].duration += s.duration
      bySubject[s.subject].lessons += s.lessonsCompleted
    })
    
    return {
      totalDuration,
      totalLessons,
      totalGames,
      avgDuration,
      weekDuration,
      weekSessions: weekSessions.length,
      bySubject
    }
  }, [sessions])
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} мин`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours} ч ${mins} мин`
  }
  
  const subjectColors: Record<string, string> = {
    'Русский язык': 'bg-red-500',
    'Математика': 'bg-blue-500',
    'Окружающий мир': 'bg-green-500',
    'Литература': 'bg-purple-500',
    'Иностранный язык': 'bg-pink-500'
  }
  
  return (
    <>
      {/* Кнопка открытия */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed left-4 bottom-4 z-40
                     bg-gradient-to-r from-emerald-500 to-teal-500
                     p-4 rounded-full shadow-lg shadow-emerald-500/30
                     border-2 border-white/20 group"
        >
          <Users className="w-6 h-6 text-white" />
          <span className="absolute left-full ml-3 bg-gray-900/90 text-white 
                          px-3 py-2 rounded-lg text-sm whitespace-nowrap
                          opacity-0 group-hover:opacity-100 transition-opacity">
            Для родителей
          </span>
        </motion.button>
      )}
      
      {/* Модальное окно */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4
                       bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800
                         rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden
                         shadow-2xl border-2 border-white/10 flex flex-col"
            >
              {/* Заголовок */}
              <div className="p-6 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/30 rounded-xl">
                      <Users className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Родительская панель</h3>
                      <p className="text-emerald-300 text-sm">
                        {selectedGrade !== null ? `${selectedGrade} класс` : 'Класс не выбран'}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Табы */}
                <div className="flex gap-2 mt-4">
                  {[
                    { id: 'overview', label: 'Обзор', icon: BarChart3 },
                    { id: 'history', label: 'История', icon: Calendar },
                    { id: 'subjects', label: 'Предметы', icon: BookOpen }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all
                                flex items-center justify-center gap-2
                                ${activeTab === tab.id
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-white/5 text-white/50 hover:bg-white/10'
                                }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Контент */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    {/* Карточки статистики */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-white/50 mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">Время учёбы</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                          {formatDuration(stats.totalDuration)}
                        </p>
                        <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                          <TrendingUp className="w-3 h-3" />
                          +{formatDuration(stats.weekDuration)} за неделю
                        </p>
                      </div>
                      
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-white/50 mb-2">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-sm">Уроков пройдено</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.totalLessons}</p>
                        <p className="text-xs text-white/30 mt-1">
                          ~{stats.avgDuration} мин на урок
                        </p>
                      </div>
                      
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-white/50 mb-2">
                          <Gamepad2 className="w-4 h-4" />
                          <span className="text-sm">Игр сыграно</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.totalGames}</p>
                      </div>
                      
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-white/50 mb-2">
                          <Star className="w-4 h-4" />
                          <span className="text-sm">Награды</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{totalStars} ⭐</p>
                        <p className="text-xs text-yellow-400 mt-1">{totalPoints} XP</p>
                      </div>
                    </div>
                    
                    {/* Активность за неделю */}
                    <div className="bg-white/5 rounded-2xl p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        Активность за неделю
                      </h4>
                      <div className="flex gap-1">
                        {Array.from({ length: 7 }).map((_, idx) => {
                          const day = new Date()
                          day.setDate(day.getDate() - (6 - idx))
                          const dayStr = day.toISOString().split('T')[0]
                          const daySessions = sessions.filter(s => s.date === dayStr)
                          const duration = daySessions.reduce((sum, s) => sum + s.duration, 0)
                          const maxDuration = 60
                          const height = Math.min(100, (duration / maxDuration) * 100)
                          
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center">
                              <div className="w-full h-20 bg-white/5 rounded flex items-end">
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: `${height}%` }}
                                  transition={{ delay: idx * 0.05 }}
                                  className={`w-full rounded-t ${duration > 30 ? 'bg-emerald-500' : duration > 0 ? 'bg-emerald-500/50' : 'bg-white/10'}`}
                                />
                              </div>
                              <span className="text-[10px] text-white/30 mt-1">
                                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][day.getDay() - 1] || 'Вс'}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* Достижения */}
                    <div className="bg-white/5 rounded-2xl p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        Достижения
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {achievements.slice(0, 6).map((ach, idx) => (
                          <div
                            key={idx}
                            className={`px-3 py-1 rounded-full text-sm ${
                              ach.unlocked
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : 'bg-white/5 text-white/30'
                            }`}
                          >
                            {ach.icon} {ach.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'history' && (
                  <div className="space-y-2">
                    {sessions.slice(0, 10).map((session, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="bg-white/5 rounded-xl p-3 flex items-center gap-3"
                      >
                        <div className={`w-2 h-12 rounded-full ${subjectColors[session.subject] || 'bg-gray-500'}`} />
                        <div className="flex-1">
                          <p className="text-white font-medium">{session.subject}</p>
                          <p className="text-white/50 text-sm">
                            {new Date(session.date).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">{formatDuration(session.duration)}</p>
                          <p className="text-white/30 text-sm">
                            {session.lessonsCompleted} уроков • {session.pointsEarned} XP
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'subjects' && (
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-2xl p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-purple-400" />
                        Распределение по предметам
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(stats.bySubject).map(([subject, data], idx) => {
                          const total = Object.values(stats.bySubject).reduce((s, d) => s + d.duration, 0)
                          const percent = Math.round((data.duration / total) * 100)
                          
                          return (
                            <div key={subject}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-white">{subject}</span>
                                <span className="text-white/50">{formatDuration(data.duration)}</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percent}%` }}
                                  transition={{ delay: idx * 0.1 }}
                                  className={`h-full ${subjectColors[subject] || 'bg-gray-500'}`}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* Рекомендации */}
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
                      <h4 className="text-emerald-300 font-medium mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Рекомендации
                      </h4>
                      <ul className="text-emerald-200/80 text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5" />
                          <span>Рекомендуется заниматься 20-30 минут в день</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5" />
                          <span>Чередуйте предметы для лучшего запоминания</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5" />
                          <span>Игры помогают закрепить материал</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Футер */}
              <div className="p-4 border-t border-white/10 flex gap-2">
                <button
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl
                            transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Печать
                </button>
                <button
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl
                            transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Экспорт
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
