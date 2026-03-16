'use client'

import { useState, useEffect } from 'react'
import { Palette, Sun, Moon, Sparkles, Waves, Leaf, Flame } from 'lucide-react'

export type ThemeType = 'cosmic' | 'sunset' | 'ocean' | 'forest' | 'fire' | 'light' | 'dark'

interface Theme {
  id: ThemeType
  name: string
  icon: React.ReactNode
  gradient: string
  bgClass: string
}

const THEMES: Theme[] = [
  { 
    id: 'cosmic', 
    name: 'Космос', 
    icon: <Sparkles className="w-4 h-4" />, 
    gradient: 'from-indigo-900 via-purple-900 to-pink-900',
    bgClass: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'
  },
  { 
    id: 'sunset', 
    name: 'Закат', 
    icon: <Sun className="w-4 h-4" />, 
    gradient: 'from-orange-900 via-rose-900 to-purple-900',
    bgClass: 'bg-gradient-to-br from-orange-900 via-rose-900 to-purple-900'
  },
  { 
    id: 'ocean', 
    name: 'Океан', 
    icon: <Waves className="w-4 h-4" />, 
    gradient: 'from-cyan-900 via-blue-900 to-indigo-900',
    bgClass: 'bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900'
  },
  { 
    id: 'forest', 
    name: 'Лес', 
    icon: <Leaf className="w-4 h-4" />, 
    gradient: 'from-green-900 via-emerald-900 to-teal-900',
    bgClass: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900'
  },
  { 
    id: 'fire', 
    name: 'Огонь', 
    icon: <Flame className="w-4 h-4" />, 
    gradient: 'from-red-900 via-orange-900 to-amber-900',
    bgClass: 'bg-gradient-to-br from-red-900 via-orange-900 to-amber-900'
  },
  { 
    id: 'light', 
    name: 'Светлая', 
    icon: <Sun className="w-4 h-4" />, 
    gradient: 'from-slate-100 via-white to-blue-100',
    bgClass: 'bg-gradient-to-br from-slate-100 via-white to-blue-100'
  },
  { 
    id: 'dark', 
    name: 'Тёмная', 
    icon: <Moon className="w-4 h-4" />, 
    gradient: 'from-gray-900 via-slate-900 to-zinc-900',
    bgClass: 'bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900'
  },
]

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeType>('cosmic')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const saved = localStorage.getItem('appTheme') as ThemeType
    if (saved && THEMES.find(t => t.id === saved)) {
      setThemeState(saved)
    }
  }, [])

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
    localStorage.setItem('appTheme', newTheme)
  }

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0]

  return { theme, setTheme, currentTheme, themes: THEMES }
}

export default function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-purple-400 text-xs bg-purple-400/20 px-3 py-1 rounded-full 
          hover:bg-purple-400/30 transition-colors flex items-center gap-1"
      >
        <Palette className="w-3 h-3" />
        Тема
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 p-3 rounded-2xl 
            bg-gray-900/95 backdrop-blur-lg border border-white/10 shadow-xl
            animate-slideIn min-w-[160px]">
            <div className="text-xs text-white/50 mb-2 px-1">Выберите тему:</div>
            <div className="space-y-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm
                    transition-all hover:bg-white/10
                    ${theme === t.id ? 'bg-white/20 text-white' : 'text-white/70'}`}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${t.gradient} 
                    border-2 ${theme === t.id ? 'border-white' : 'border-white/30'}`} 
                  />
                  {t.icon}
                  <span>{t.name}</span>
                  {theme === t.id && (
                    <span className="ml-auto text-green-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
