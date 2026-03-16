'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Zap, Flag, Trophy, RotateCcw, Car, Star } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface Problem {
  question: string
  answer: number
  type: 'add' | 'sub' | 'mul' | 'div'
}

type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'

const difficultyConfig: Record<Difficulty, {
  time: number
  operations: ('add' | 'sub' | 'mul' | 'div')[]
  range: [number, number]
  xpPerCorrect: number
}> = {
  beginner: { time: 60, operations: ['add', 'sub'], range: [1, 10], xpPerCorrect: 5 },
  intermediate: { time: 90, operations: ['add', 'sub', 'mul'], range: [1, 20], xpPerCorrect: 8 },
  advanced: { time: 120, operations: ['add', 'sub', 'mul', 'div'], range: [1, 50], xpPerCorrect: 12 },
  expert: { time: 120, operations: ['add', 'sub', 'mul', 'div'], range: [1, 100], xpPerCorrect: 20 }
}

function generateProblem(difficulty: Difficulty): Problem {
  const config = difficultyConfig[difficulty]
  const op = config.operations[Math.floor(Math.random() * config.operations.length)]
  const [min, max] = config.range
  
  let a: number, b: number, answer: number, question: string
  
  switch (op) {
    case 'add':
      a = Math.floor(Math.random() * (max - min + 1)) + min
      b = Math.floor(Math.random() * (max - min + 1)) + min
      answer = a + b
      question = `${a} + ${b} = ?`
      break
    case 'sub':
      a = Math.floor(Math.random() * (max - min + 1)) + min
      b = Math.floor(Math.random() * a) + 1
      answer = a - b
      question = `${a} - ${b} = ?`
      break
    case 'mul':
      a = Math.floor(Math.random() * Math.min(12, max)) + 1
      b = Math.floor(Math.random() * Math.min(12, max)) + 1
      answer = a * b
      question = `${a} × ${b} = ?`
      break
    case 'div':
      b = Math.floor(Math.random() * 11) + 2
      answer = Math.floor(Math.random() * 11) + 1
      a = b * answer
      question = `${a} ÷ ${b} = ?`
      break
    default:
      a = 1; b = 1; answer = 2; question = '1 + 1 = ?'
  }
  
  return { question, answer, type: op }
}

export default function MathRacing() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [position, setPosition] = useState(0)
  const [speedBonus, setSpeedBonus] = useState(0)
  
  const problemStartTime = useRef<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const totalProblems = 20
  const trackLength = 100

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff)
    setTimeLeft(difficultyConfig[diff].time)
    setGameState('playing')
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setCombo(0)
    setMaxCombo(0)
    setPosition(0)
    setSpeedBonus(0)
    setCurrentProblem(generateProblem(diff))
    problemStartTime.current = Date.now()
  }, [])

  const finishGame = useCallback(() => {
    setGameState('finished')
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    } else if (timeLeft === 0 && gameState === 'playing') {
      // Используем setTimeout для отложенного вызова
      const timer = setTimeout(() => finishGame(), 0)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, gameState, finishGame])

  const checkAnswer = useCallback(() => {
    if (!currentProblem || !difficulty) return
    
    const userNum = parseInt(userAnswer)
    const config = difficultyConfig[difficulty]
    
    if (userNum === currentProblem.answer) {
      const timeTaken = (Date.now() - problemStartTime.current) / 1000
      let xpGained = config.xpPerCorrect
      
      // Speed bonus
      let speedB = 0
      if (timeTaken < 2) {
        speedB = Math.floor(xpGained * 0.5)
        xpGained += speedB
      } else if (timeTaken < 4) {
        speedB = Math.floor(xpGained * 0.25)
        xpGained += speedB
      }
      
      // Combo bonus
      const newCombo = combo + 1
      if (newCombo > maxCombo) setMaxCombo(newCombo)
      if (newCombo >= 3) {
        const comboBonus = Math.floor(xpGained * 0.2 * Math.min(newCombo - 2, 5))
        xpGained += comboBonus
      }
      
      addXP(xpGained)
      playSound?.('success')
      setScore(s => s + xpGained)
      setCorrect(c => c + 1)
      setCombo(newCombo)
      setSpeedBonus(s => s + speedB)
      setPosition(Math.min(trackLength, Math.floor((correct + 1) / totalProblems * 100)))
      
      // Check if finished all problems
      if (correct + 1 >= totalProblems) {
        finishGame()
        return
      }
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      setCombo(0)
    }
    
    setUserAnswer('')
    setCurrentProblem(generateProblem(difficulty))
    problemStartTime.current = Date.now()
  }, [currentProblem, userAnswer, difficulty, combo, maxCombo, correct, addXP, playSound])

  const resetGame = useCallback(() => {
    setGameState('setup')
    setDifficulty(null)
    setCurrentProblem(null)
    setUserAnswer('')
  }, [])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-amber-900/90 to-orange-900/90 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30">
        <h2 className="text-2xl font-bold text-amber-200 mb-4 flex items-center gap-2">
          <Car className="w-6 h-6" />
          Математическая гонка
        </h2>
        <p className="text-amber-100/80 mb-6">
          Решай примеры как можно быстрее! Зарабатывай бонусы за скорость и серии правильных ответов.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(Object.keys(difficultyConfig) as Difficulty[]).map((d) => {
            const config = difficultyConfig[d]
            const colors: Record<Difficulty, string> = {
              beginner: 'from-green-500/40 to-green-600/40 hover:from-green-500/50 hover:to-green-600/50 text-green-200',
              intermediate: 'from-yellow-500/40 to-yellow-600/40 hover:from-yellow-500/50 hover:to-yellow-600/50 text-yellow-200',
              advanced: 'from-orange-500/40 to-orange-600/40 hover:from-orange-500/50 hover:to-orange-600/50 text-orange-200',
              expert: 'from-red-500/40 to-red-600/40 hover:from-red-500/50 hover:to-red-600/50 text-red-200'
            }
            const labels: Record<Difficulty, string> = {
              beginner: 'Новичок',
              intermediate: 'Любитель',
              advanced: 'Продвинутый',
              expert: 'Эксперт'
            }
            return (
              <button
                key={d}
                onClick={() => startGame(d)}
                className={`p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-br ${colors[d]}`}
              >
                <div className="font-bold text-lg">{labels[d]}</div>
                <div className="text-sm opacity-70 mt-1">
                  {config.time} сек • {config.operations.length} операции • {config.xpPerCorrect} XP
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const accuracy = correct + wrong > 0 ? Math.round(correct / (correct + wrong) * 100) : 0
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0
    
    return (
      <div className="bg-gradient-to-br from-amber-900/90 to-orange-900/90 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30">
        <h2 className="text-2xl font-bold text-amber-200 mb-4 flex items-center gap-2">
          <Flag className="w-6 h-6" />
          Финиш!
        </h2>
        
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`w-10 h-10 inline ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
              />
            ))}
          </div>
          <div className="text-amber-100 text-lg">
            Набрано очков: <span className="font-bold text-2xl">{score}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-500/20 rounded-xl p-3 text-center">
            <div className="text-3xl font-bold text-green-300">{correct}</div>
            <div className="text-green-400 text-sm">Правильно</div>
          </div>
          <div className="bg-red-500/20 rounded-xl p-3 text-center">
            <div className="text-3xl font-bold text-red-300">{wrong}</div>
            <div className="text-red-400 text-sm">Ошибок</div>
          </div>
          <div className="bg-yellow-500/20 rounded-xl p-3 text-center">
            <div className="text-3xl font-bold text-yellow-300">{accuracy}%</div>
            <div className="text-yellow-400 text-sm">Точность</div>
          </div>
          <div className="bg-purple-500/20 rounded-xl p-3 text-center">
            <div className="text-3xl font-bold text-purple-300">{maxCombo}</div>
            <div className="text-purple-400 text-sm">Макс. комбо</div>
          </div>
        </div>
        
        {speedBonus > 0 && (
          <div className="bg-cyan-500/20 rounded-xl p-3 text-center mb-4">
            <Zap className="w-5 h-5 inline text-cyan-300 mr-2" />
            <span className="text-cyan-200">Бонус за скорость: +{speedBonus} XP</span>
          </div>
        )}
        
        <button
          onClick={resetGame}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-amber-900/90 to-orange-900/90 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-amber-200 flex items-center gap-2">
          <Car className="w-5 h-5" />
          Гонка
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-amber-200 bg-amber-500/30 px-3 py-1 rounded-full text-sm font-mono">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">
            {score} XP
          </span>
        </div>
      </div>

      {/* Race track */}
      <div className="mb-6">
        <div className="h-4 bg-amber-950/50 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
            style={{ width: `${position}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: `${position}%` }}
          >
            <Car className="w-6 h-6 text-amber-200 -translate-x-1/2" />
          </div>
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <Flag className="w-4 h-4 text-white/50" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-amber-300/50 mt-1">
          <span>Старт</span>
          <span>{position}%</span>
          <span>Финиш</span>
        </div>
      </div>

      {/* Combo indicator */}
      {combo >= 3 && (
        <div className="text-center mb-4 animate-pulse">
          <span className="text-yellow-300 font-bold">
            🔥 КОМБО x{combo}! (+{Math.floor(difficultyConfig[difficulty!].xpPerCorrect * 0.2 * Math.min(combo - 2, 5))} бонус)
          </span>
        </div>
      )}

      {/* Problem */}
      <div className="text-center mb-6">
        <div className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
          {currentProblem?.question}
        </div>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          autoFocus
          className="w-full max-w-xs text-center text-3xl font-bold bg-amber-800/50 border-2 border-amber-500/50 rounded-xl p-3 text-amber-100 focus:outline-none focus:border-amber-400"
          placeholder="?"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-center gap-3">
        <button
          onClick={checkAnswer}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-all hover:scale-105"
        >
          Ответить
        </button>
      </div>

      {/* Stats bar */}
      <div className="mt-6 flex justify-center gap-4 text-sm">
        <span className="text-green-300">✓ {correct}</span>
        <span className="text-red-300">✗ {wrong}</span>
        <span className="text-amber-300">Цель: {totalProblems}</span>
      </div>
    </div>
  )
}
