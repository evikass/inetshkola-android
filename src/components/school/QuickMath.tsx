'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Zap, Trophy, RotateCcw, Timer, Target, Star } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

type Operation = '+' | '-' | '×' | '÷'

interface Problem {
  a: number
  b: number
  op: Operation
  answer: number
}

type GameMode = 'zen' | 'blitz' | 'marathon'

const modeConfig: Record<GameMode, { time: number; target: number; xpBase: number }> = {
  zen: { time: 0, target: 20, xpBase: 3 },
  blitz: { time: 30, target: 999, xpBase: 4 },
  marathon: { time: 120, target: 50, xpBase: 5 }
}

const difficultyConfig: Record<'easy' | 'medium' | 'hard', { range: [number, number]; operations: Operation[] }> = {
  easy: { range: [1, 10], operations: ['+', '-'] },
  medium: { range: [1, 20], operations: ['+', '-', '×'] },
  hard: { range: [1, 50], operations: ['+', '-', '×', '÷'] }
}

export default function QuickMath() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  const generateProblem = useCallback((): Problem => {
    const config = difficultyConfig[difficulty]
    const [min, max] = config.range
    const op = config.operations[Math.floor(Math.random() * config.operations.length)]
    
    let a: number, b: number, answer: number
    
    switch (op) {
      case '+':
        a = Math.floor(Math.random() * (max - min + 1)) + min
        b = Math.floor(Math.random() * (max - min + 1)) + min
        answer = a + b
        break
      case '-':
        a = Math.floor(Math.random() * (max - min + 1)) + min
        b = Math.floor(Math.random() * a) + 1
        answer = a - b
        break
      case '×':
        a = Math.floor(Math.random() * Math.min(12, max)) + 1
        b = Math.floor(Math.random() * Math.min(12, max)) + 1
        answer = a * b
        break
      case '÷':
        b = Math.floor(Math.random() * 11) + 2
        answer = Math.floor(Math.random() * 11) + 1
        a = b * answer
        break
      default:
        a = 1; b = 1; answer = 2
    }
    
    return { a, b, op, answer }
  }, [difficulty])

  const startGame = useCallback((mode: GameMode, diff: 'easy' | 'medium' | 'hard') => {
    setGameMode(mode)
    setDifficulty(diff)
    setTimeLeft(modeConfig[mode].time)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setStreak(0)
    setMaxStreak(0)
    setUserAnswer('')
    setFeedback(null)
    setGameState('playing')
    startTimeRef.current = Date.now()
    setCurrentProblem(generateProblem())
  }, [generateProblem])

  useEffect(() => {
    if (gameMode && modeConfig[gameMode].time > 0 && gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    } else if (timeLeft === 0 && gameMode && modeConfig[gameMode].time > 0 && gameState === 'playing') {
      // Используем setTimeout для отложенного setState
      const timer = setTimeout(() => setGameState('finished'), 0)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, gameMode, gameState])

  // Check for zen/marathon completion
  useEffect(() => {
    if (gameMode && gameState === 'playing') {
      const target = modeConfig[gameMode].target
      if (target < 999 && correct >= target) {
        // Используем setTimeout для отложенного setState
        const timer = setTimeout(() => setGameState('finished'), 0)
        return () => clearTimeout(timer)
      }
    }
  }, [correct, gameMode, gameState])

  const checkAnswer = useCallback(() => {
    if (!currentProblem || !userAnswer.trim()) return
    
    const userNum = parseInt(userAnswer)
    const isCorrect = userNum === currentProblem.answer
    
    setFeedback(isCorrect ? 'correct' : 'wrong')
    
    if (isCorrect) {
      const baseXP = modeConfig[gameMode!].xpBase
      const streakBonus = streak >= 3 ? Math.floor(baseXP * 0.5) : streak >= 2 ? Math.floor(baseXP * 0.25) : 0
      addXP(baseXP + streakBonus)
      playSound?.('success')
      setScore(s => s + baseXP + streakBonus)
      setCorrect(c => c + 1)
      setStreak(s => {
        const newStreak = s + 1
        if (newStreak > maxStreak) setMaxStreak(newStreak)
        return newStreak
      })
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      setStreak(0)
    }
    
    setTimeout(() => {
      setUserAnswer('')
      setFeedback(null)
      setCurrentProblem(generateProblem())
    }, 200)
  }, [currentProblem, userAnswer, gameMode, streak, maxStreak, addXP, playSound, generateProblem])

  // Keyboard handling
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      if (e.key >= '0' && e.key <= '9') {
        setUserAnswer(prev => prev + e.key)
      } else if (e.key === 'Backspace') {
        setUserAnswer(prev => prev.slice(0, -1))
      } else if (e.key === 'Enter' || e.key === ' ') {
        checkAnswer()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [gameState, checkAnswer])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-amber-900/90 to-yellow-900/90 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30">
        <h2 className="text-2xl font-bold text-amber-200 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Быстрая математика
        </h2>
        <p className="text-amber-100/80 mb-6">
          Решай примеры на скорость! Используй клавиатуру для быстрых ответов.
        </p>
        
        <div className="mb-4">
          <p className="text-amber-200 text-sm mb-2">Сложность:</p>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  difficulty === d
                    ? d === 'easy' ? 'bg-green-500 text-white' :
                      d === 'medium' ? 'bg-yellow-500 text-white' :
                      'bg-red-500 text-white'
                    : 'bg-amber-800/50 text-amber-200 hover:bg-amber-700/50'
                }`}
              >
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          {(['zen', 'blitz', 'marathon'] as GameMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => startGame(mode, difficulty)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-r from-amber-500/30 to-yellow-500/30 hover:from-amber-500/40 hover:to-yellow-500/40 text-amber-200"
            >
              <div className="font-bold flex items-center gap-2">
                {mode === 'zen' ? <Target className="w-4 h-4" /> : 
                 mode === 'blitz' ? <Timer className="w-4 h-4" /> : 
                 <Star className="w-4 h-4" />}
                {mode === 'zen' ? 'Дзен' : mode === 'blitz' ? 'Блиц' : 'Марафон'}
              </div>
              <div className="text-sm opacity-70">
                {mode === 'zen' ? '20 примеров • 3 XP' :
                 mode === 'blitz' ? '30 секунд • 4 XP' :
                 '50 примеров за 2 мин • 5 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const total = correct + wrong
    const accuracy = total > 0 ? Math.round(correct / total * 100) : 0
    
    return (
      <div className="bg-gradient-to-br from-amber-900/90 to-yellow-900/90 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-amber-200 mb-2">Отлично!</h2>
        <p className="text-3xl font-bold text-white mb-4">{score} XP</p>
        
        <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
          <div className="bg-green-500/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-green-300">{correct}</div>
            <div className="text-green-400 text-sm">Правильно</div>
          </div>
          <div className="bg-red-500/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-red-300">{wrong}</div>
            <div className="text-red-400 text-sm">Ошибок</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
          <div className="bg-amber-500/20 rounded-xl p-3">
            <div className="text-xl font-bold text-amber-300">{accuracy}%</div>
            <div className="text-amber-400 text-sm">Точность</div>
          </div>
          <div className="bg-yellow-500/20 rounded-xl p-3">
            <div className="text-xl font-bold text-yellow-300">{maxStreak}</div>
            <div className="text-yellow-400 text-sm">Макс. серия</div>
          </div>
        </div>
        
        <button
          onClick={() => setGameState('setup')}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  if (!currentProblem) return null

  return (
    <div className="bg-gradient-to-br from-amber-900/90 to-yellow-900/90 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-amber-200 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Быстрая математика
        </h2>
        <div className="flex items-center gap-3">
          {gameMode && modeConfig[gameMode].time > 0 && (
            <span className="text-amber-200 bg-amber-500/30 px-3 py-1 rounded-full text-sm font-mono">
              {timeLeft}с
            </span>
          )}
          {gameMode && modeConfig[gameMode].target < 999 && (
            <span className="text-amber-300 text-sm">
              {correct}/{modeConfig[gameMode].target}
            </span>
          )}
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">{score} XP</span>
        </div>
      </div>

      {/* Streak */}
      {streak >= 3 && (
        <div className="text-center mb-2">
          <span className="text-yellow-300 text-sm flex items-center justify-center gap-1">
            <Star className="w-3 h-3" />
            Серия x{streak}! +{Math.floor(modeConfig[gameMode!].xpBase * 0.5)} бонус
          </span>
        </div>
      )}

      {/* Problem */}
      <div className={`text-center mb-6 p-6 rounded-xl transition-all ${
        feedback === 'correct' ? 'bg-green-500/30 scale-105' :
        feedback === 'wrong' ? 'bg-red-500/30' :
        'bg-amber-800/30'
      }`}>
        <p className="text-5xl md:text-6xl font-bold text-white">
          {currentProblem.a} {currentProblem.op} {currentProblem.b} = ?
        </p>
      </div>

      {/* Answer display */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-amber-100 min-h-[48px]">
          {userAnswer || '_'}
        </div>
        <p className="text-amber-300/60 text-sm mt-1">Нажми Enter или Пробел</p>
      </div>

      {/* Number pad for mobile */}
      <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'].map((key) => (
          <button
            key={key}
            onClick={() => {
              if (key === 'C') setUserAnswer('')
              else if (key === '⌫') setUserAnswer(prev => prev.slice(0, -1))
              else setUserAnswer(prev => prev + key)
            }}
            className={`p-3 rounded-xl font-bold text-lg transition-all active:scale-95 ${
              key === 'C' ? 'bg-red-500/30 text-red-300' :
              key === '⌫' ? 'bg-amber-700/50 text-amber-300' :
              'bg-amber-700/30 text-amber-200 hover:bg-amber-600/30'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Submit button */}
      <div className="text-center">
        <button
          onClick={checkAnswer}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-all text-lg"
        >
          Ответить
        </button>
      </div>

      {/* Stats */}
      <div className="mt-4 flex justify-center gap-4 text-sm text-amber-300/70">
        <span className="text-green-300">✓ {correct}</span>
        <span className="text-red-300">✗ {wrong}</span>
      </div>
    </div>
  )
}
