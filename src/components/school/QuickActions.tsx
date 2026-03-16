'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, X, BookOpen, Gamepad2, Trophy, Target, 
  Star, Clock, Flame, Bookmark, RotateCcw, Home,
  ChevronUp
} from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  action: () => void
}

export default function QuickActions() {
  const { 
    setView, selectedGrade, totalPoints, totalStars, 
    streak, resetProgress 
  } = useSchool()
  const [isOpen, setIsOpen] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  
  const actions: QuickAction[] = [
    {
      id: 'home',
      label: 'На главную',
      icon: <Home className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      action: () => {
        setView('classes')
        setIsOpen(false)
      }
    },
    {
      id: 'lessons',
      label: 'Уроки',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      action: () => {
        if (selectedGrade !== null) {
          setView('subjects')
          setIsOpen(false)
        }
      }
    },
    {
      id: 'games',
      label: 'Игры',
      icon: <Gamepad2 className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      action: () => {
        if (selectedGrade !== null) {
          setView('games')
          setIsOpen(false)
        }
      }
    },
    {
      id: 'achievements',
      label: 'Достижения',
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
      action: () => {
        // Открывает панель достижений через глобальное событие
        window.dispatchEvent(new CustomEvent('openAchievements'))
        setIsOpen(false)
      }
    },
    {
      id: 'stats',
      label: 'Статистика',
      icon: <Target className="w-5 h-5" />,
      color: 'from-indigo-500 to-violet-500',
      action: () => {
        window.dispatchEvent(new CustomEvent('openStats'))
        setIsOpen(false)
      }
    },
    {
      id: 'reset',
      label: 'Сбросить',
      icon: <RotateCcw className="w-5 h-5" />,
      color: 'from-red-500 to-rose-500',
      action: () => {
        setShowResetConfirm(true)
      }
    }
  ]
  
  const handleReset = () => {
    resetProgress()
    setShowResetConfirm(false)
    setIsOpen(false)
    setView('classes')
  }
  
  return (
    <>
      {/* Кнопка открытия */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-4 bottom-4 z-40 p-4 rounded-full shadow-lg
                    transition-all duration-300
                    ${isOpen 
                      ? 'bg-white/20 rotate-45' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-orange-500/30'
                    }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Zap className="w-6 h-6 text-white" />
        )}
      </motion.button>
      
      {/* Меню действий */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed right-4 bottom-20 z-40 origin-bottom-right"
          >
            <div className="bg-slate-900/95 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-white/10">
              {/* Статус */}
              <div className="flex items-center gap-3 px-2 pb-3 mb-2 border-b border-white/10">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4" />
                  <span className="font-bold">{totalStars}</span>
                </div>
                <div className="flex items-center gap-1 text-orange-400">
                  <Flame className="w-4 h-4" />
                  <span className="font-bold">{streak}</span>
                </div>
                <div className="flex items-center gap-1 text-purple-400">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold">{totalPoints}</span>
                </div>
              </div>
              
              {/* Кнопки */}
              <div className="grid grid-cols-3 gap-2">
                {actions.map((action, idx) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={action.action}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl
                              bg-gradient-to-br ${action.color}
                              hover:opacity-90 transition-opacity
                              text-white`}
                  >
                    {action.icon}
                    <span className="text-xs font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>
              
              {/* Подсказка */}
              <p className="text-white/30 text-xs text-center mt-2">
                Быстрые действия
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Подтверждение сброса */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4
                       bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900 rounded-2xl p-6 max-w-sm w-full
                         border border-white/10 shadow-xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Сбросить прогресс?</h3>
                <p className="text-white/60 mb-6">
                  Все достижения, звёзды и очки будут удалены. Это действие нельзя отменить.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20
                              text-white rounded-xl transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-600
                              text-white rounded-xl transition-colors"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Кнопка "Наверх" */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed right-4 bottom-20 z-30 p-3 rounded-full
                   bg-white/10 hover:bg-white/20 backdrop-blur-sm
                   text-white/50 hover:text-white transition-colors"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </>
  )
}
