'use client'

import { useMemo } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { Calendar, Star, Zap, Gift, BookOpen, Gamepad2, Brain, Music, Palette, Globe, Calculator, Languages, Leaf } from 'lucide-react'

interface ThemeDay {
  name: string
  subject: string
  icon: React.ReactNode
  color: string
  gradient: string
  bonus: number
  description: string
}

const getThemeDay = (dayOfWeek: number): ThemeDay => {
  const themes: Record<number, ThemeDay> = {
    1: { // Понедельник
      name: 'Математический понедельник',
      subject: 'Математика',
      icon: <Calculator className="w-6 h-6" />,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-500',
      bonus: 15,
      description: '+15% баллов за математические игры!'
    },
    2: { // Вторник
      name: 'Литературный вторник',
      subject: 'Литература',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-amber-400',
      gradient: 'from-amber-500 to-orange-500',
      bonus: 15,
      description: '+15% баллов за литературные игры!'
    },
    3: { // Среда
      name: 'Языковая среда',
      subject: 'Русский язык',
      icon: <Languages className="w-6 h-6" />,
      color: 'text-red-400',
      gradient: 'from-red-500 to-pink-500',
      bonus: 15,
      description: '+15% баллов за языковые игры!'
    },
    4: { // Четверг
      name: 'Научный четверг',
      subject: 'Биология',
      icon: <Leaf className="w-6 h-6" />,
      color: 'text-green-400',
      gradient: 'from-green-500 to-emerald-500',
      bonus: 15,
      description: '+15% баллов за научные игры!'
    },
    5: { // Пятница
      name: 'Игровая пятница',
      subject: 'Все предметы',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-violet-500',
      bonus: 20,
      description: '+20% баллов за все игры!'
    },
    6: { // Суббота
      name: 'Творческая суббота',
      subject: 'Искусство',
      icon: <Palette className="w-6 h-6" />,
      color: 'text-pink-400',
      gradient: 'from-pink-500 to-rose-500',
      bonus: 10,
      description: '+10% бонусных баллов за активность!'
    },
    0: { // Воскресенье
      name: 'День отдыха',
      subject: 'Любой предмет',
      icon: <Gift className="w-6 h-6" />,
      color: 'text-yellow-400',
      gradient: 'from-yellow-500 to-amber-500',
      bonus: 25,
      description: '+25% бонусных баллов за занятия в выходной!'
    }
  }
  return themes[dayOfWeek] || themes[1]
}

export default function ThemeDayBanner() {
  const { selectedClass } = useSchool()
  
  const today = new Date().getDay()
  const theme = useMemo(() => getThemeDay(today), [today])
  
  return (
    <div className={`relative overflow-hidden rounded-2xl p-4 md:p-5 
                    bg-gradient-to-r ${theme.gradient}
                    shadow-xl mb-6`}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-1/2 h-full bg-white/10 rotate-12 animate-pulse" />
      </div>
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Icon */}
        <div className="p-3 rounded-xl bg-white/20 shadow-lg">
          {theme.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-white/80" />
            <span className="text-white/80 text-sm">Тема дня</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mb-1">
            {theme.name}
          </h3>
          <p className="text-white/90 text-sm md:text-base">
            {theme.description}
          </p>
        </div>
        
        {/* Bonus badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm">
          <Zap className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">+{theme.bonus}%</span>
        </div>
      </div>
    </div>
  )
}

// Hook for getting bonus multiplier
export function useThemeBonus(): { bonus: number; subject: string } {
  const today = new Date().getDay()
  const theme = getThemeDay(today)
  return { bonus: theme.bonus, subject: theme.subject }
}
