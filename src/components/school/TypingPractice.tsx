'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Keyboard, Clock, Trophy, RotateCcw, Zap, AlertCircle } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

interface TypingText {
  id: string
  text: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const TYPING_TEXTS: TypingText[] = [
  // Easy - короткие слова и простые фразы
  { id: 'e1', text: 'мир труд май', category: 'Простые', difficulty: 'easy' },
  { id: 'e2', text: 'школа это интересно', category: 'Простые', difficulty: 'easy' },
  { id: 'e3', text: 'учиться это здорово', category: 'Простые', difficulty: 'easy' },
  { id: 'e4', text: 'книга лучший друг', category: 'Простые', difficulty: 'easy' },
  { id: 'e5', text: 'знания это сила', category: 'Простые', difficulty: 'easy' },
  // Medium - средние предложения
  { id: 'm1', text: 'математика — царица всех наук', category: 'Цитаты', difficulty: 'medium' },
  { id: 'm2', text: 'учиться никогда не поздно', category: 'Цитаты', difficulty: 'medium' },
  { id: 'm3', text: 'повторение — мать учения', category: 'Пословицы', difficulty: 'medium' },
  { id: 'm4', text: 'без труда не вытащишь рыбку из пруда', category: 'Пословицы', difficulty: 'medium' },
  { id: 'm5', text: 'век живи — век учись', category: 'Пословицы', difficulty: 'medium' },
  // Hard - длинные тексты и сложные слова
  { id: 'h1', text: 'пятью пять — двадцать пять, шестью шесть — тридцать шесть', category: 'Таблица умножения', difficulty: 'hard' },
  { id: 'h2', text: 'в дружбе сила, в знании — мудрость', category: 'Философия', difficulty: 'hard' },
  { id: 'h3', text: 'человек познаётся в беде и в радости', category: 'Философия', difficulty: 'hard' },
  { id: 'h4', text: 'алфавит начинается с буквы а и заканчивается буквой я', category: 'Грамматика', difficulty: 'hard' },
  { id: 'h5', text: 'россия — великая страна с богатой историей', category: 'География', difficulty: 'hard' },
]

export default function TypingPractice() {
  const { addPoints } = useSchool()
  const inputRef = useRef<HTMLInputElement>(null)
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [currentText, setCurrentText] = useState<TypingText | null>(null)
  const [typedText, setTypedText] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [errors, setErrors] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [totalChars, setTotalChars] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    const texts = TYPING_TEXTS.filter(t => t.difficulty === diff)
    const randomText = texts[Math.floor(Math.random() * texts.length)]
    setCurrentText(randomText)
    setTypedText('')
    setStartTime(null)
    setErrors(0)
    setCompleted(0)
    setTotalChars(0)
    setTimeElapsed(0)
    setGameState('playing')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || !startTime) return
    
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 100)
    
    return () => clearInterval(timer)
  }, [gameState, startTime])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    if (!startTime && value.length > 0) {
      setStartTime(Date.now())
    }
    
    // Count errors
    if (currentText) {
      let newErrors = 0
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== currentText.text[i]) {
          newErrors++
        }
      }
      setErrors(newErrors)
    }
    
    setTypedText(value)
    
    // Check completion
    if (currentText && value === currentText.text) {
      const timeSpent = (Date.now() - (startTime || Date.now())) / 1000
      const speed = Math.round((currentText.text.length / timeSpent) * 60)
      const accuracy = Math.round(((currentText.text.length - errors) / currentText.text.length) * 100)
      const points = Math.round((speed * accuracy) / 100 * (difficulty === 'hard' ? 2 : difficulty === 'medium' ? 1.5 : 1))
      
      addPoints(points)
      setCompleted(currentText.text.length)
      setTotalChars(currentText.text.length)
      setGameState('result')
    }
  }, [currentText, startTime, errors, difficulty, addPoints])

  const getSpeed = () => {
    if (!startTime || typedText.length === 0) return 0
    const timeSpent = (Date.now() - startTime) / 1000
    return Math.round((typedText.length / timeSpent) * 60)
  }

  const getAccuracy = () => {
    if (typedText.length === 0) return 100
    const correct = typedText.length - errors
    return Math.max(0, Math.round((correct / typedText.length) * 100))
  }

  // Render character with color
  const renderText = () => {
    if (!currentText) return null
    
    return currentText.text.split('').map((char, index) => {
      let colorClass = 'text-white/40' // Not typed yet
      
      if (index < typedText.length) {
        if (typedText[index] === char) {
          colorClass = 'text-green-400' // Correct
        } else {
          colorClass = 'text-red-400 bg-red-400/20' // Error
        }
      } else if (index === typedText.length) {
        colorClass = 'text-white bg-white/20' // Current position
      }
      
      return (
        <span key={index} className={`${colorClass} ${char === ' ' ? 'w-2' : ''}`}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      )
    })
  }

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-slate-500/20 to-gray-500/20 
        border-2 border-slate-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-500/20 mb-4">
            <Keyboard className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-white">Тренировка печати</h2>
          <p className="text-white/60 text-sm mt-1">Печатай быстро и без ошибок!</p>
        </div>

        <div className="space-y-3">
          {(['easy', 'medium', 'hard'] as const).map(diff => {
            const colors = {
              easy: 'from-green-500 to-emerald-500',
              medium: 'from-yellow-500 to-orange-500',
              hard: 'from-red-500 to-rose-500'
            }
            const labels = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' }
            
            return (
              <button
                key={diff}
                onClick={() => startGame(diff)}
                className={`w-full p-4 rounded-2xl bg-gradient-to-r ${colors[diff]} text-white 
                  font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-between`}
              >
                <span>{labels[diff]}</span>
                <span className="text-sm font-normal opacity-80">
                  {TYPING_TEXTS.filter(t => t.difficulty === diff).length} текстов
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    const speed = getSpeed()
    const accuracy = getAccuracy()
    const points = Math.round((speed * accuracy) / 100 * (difficulty === 'hard' ? 2 : difficulty === 'medium' ? 1.5 : 1))
    
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-slate-500/20 to-gray-500/20 
        border-2 border-slate-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {accuracy >= 95 ? 'Отлично! 🎉' : accuracy >= 80 ? 'Хорошо! 👍' : 'Попробуй ещё! 💪'}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-blue-400">{speed}</div>
            <div className="text-sm text-white/60">символов/мин</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-green-400">{accuracy}%</div>
            <div className="text-sm text-white/60">Точность</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-purple-400">{timeElapsed}с</div>
            <div className="text-sm text-white/60">Время</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-yellow-400">+{points}</div>
            <div className="text-sm text-white/60">Очки</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => startGame(difficulty)}
            className="flex-1 py-4 bg-gradient-to-r from-slate-500 to-gray-500 text-white rounded-2xl 
              font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Ещё раз
          </button>
          <button
            onClick={() => setGameState('menu')}
            className="px-6 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"
          >
            <Keyboard className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-3xl bg-gradient-to-br from-slate-500/20 to-gray-500/20 
      border-2 border-slate-400/30 backdrop-blur-sm">
      
      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-blue-400">
            <Zap className="w-4 h-4" />
            <span>{getSpeed()} сим/мин</span>
          </div>
          <div className="flex items-center gap-1 text-green-400">
            <span>{getAccuracy()}%</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-white/60 text-sm">
          <Clock className="w-4 h-4" />
          <span>{timeElapsed}с</span>
        </div>
      </div>

      {/* Text to type */}
      <div className="p-4 rounded-2xl bg-white/5 mb-4 font-mono text-lg leading-relaxed">
        {renderText()}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={handleInput}
        placeholder="Начни печатать..."
        className="w-full p-4 rounded-2xl bg-white/10 text-white text-lg font-mono
          border-2 border-white/20 focus:border-slate-400 focus:outline-none
          placeholder:text-white/30"
        autoFocus
      />

      {/* Errors indicator */}
      {errors > 0 && (
        <div className="mt-3 p-3 rounded-xl bg-red-500/20 border border-red-400/30 
          flex items-center gap-2 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4" />
          Ошибок: {errors}
        </div>
      )}

      {/* Progress */}
      {currentText && (
        <div className="mt-3">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-slate-500 to-gray-500 transition-all"
              style={{ width: `${(typedText.length / currentText.text.length) * 100}%` }}
            />
          </div>
          <div className="text-xs text-white/40 mt-1 text-center">
            {typedText.length} / {currentText.text.length} символов
          </div>
        </div>
      )}
    </div>
  )
}
