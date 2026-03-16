'use client'

import { useState, useEffect, useCallback } from 'react'
import { Zap, Clock, Trophy, Target, Play, RotateCcw, Medal, AlertTriangle } from 'lucide-react'
import { useSound } from '@/lib/sounds'
import { useSchool } from '@/context/SchoolContext'

interface SpeedQuestion {
  q: string
  answer: number
  options: number[]
}

type Difficulty = 'easy' | 'medium' | 'hard'

const DIFFICULTY_CONFIG = {
  easy: { range: [1, 20], operations: ['+', '-'], time: 60 },
  medium: { range: [1, 50], operations: ['+', '-', '×'], time: 90 },
  hard: { range: [1, 100], operations: ['+', '-', '×', '÷'], time: 120 },
}

export default function SpeedTest() {
  const { addPoints } = useSchool()
  const { playCorrect, playWrong, playAchievement } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [questions, setQuestions] = useState<SpeedQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [avgTime, setAvgTime] = useState(0)
  const [lastAnswerTime, setLastAnswerTime] = useState(0)
  const [questionStartTime, setQuestionStartTime] = useState(0)
  const [totalAnswerTime, setTotalAnswerTime] = useState(0)

  const generateQuestion = useCallback((diff: Difficulty): SpeedQuestion => {
    const config = DIFFICULTY_CONFIG[diff]
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
        a = Math.floor(Math.random() * 12) + 1
        b = Math.floor(Math.random() * 12) + 1
        answer = a * b
        break
      case '÷':
        b = Math.floor(Math.random() * 12) + 1
        answer = Math.floor(Math.random() * 12) + 1
        a = b * answer
        break
      default:
        a = 1; b = 1; answer = 2
    }
    
    // Generate options
    const options = new Set<number>([answer])
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 10) - 5
      if (offset !== 0) {
        options.add(Math.max(0, answer + offset))
      }
    }
    
    return {
      q: `${a} ${op} ${b} = ?`,
      answer,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    }
  }, [])

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff)
    const config = DIFFICULTY_CONFIG[diff]
    
    // Generate questions on the fly
    setQuestions([])
    setCurrentIndex(0)
    setScore(0)
    setCorrect(0)
    setTimeLeft(config.time)
    setAvgTime(0)
    setTotalAnswerTime(0)
    setQuestionStartTime(Date.now())
    setGameState('playing')
  }, [])

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          endGame()
          return 0
        }
        return t - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameState])

  // Generate next question
  useEffect(() => {
    if (gameState === 'playing' && questions.length <= currentIndex) {
      const newQ = generateQuestion(difficulty)
      setQuestions(prev => [...prev, newQ])
    }
  }, [gameState, currentIndex, questions.length, difficulty, generateQuestion])

  const endGame = useCallback(() => {
    setGameState('result')
    if (score > 0) {
      addPoints(score)
      playAchievement()
    }
  }, [score, addPoints, playAchievement])

  const handleAnswer = (option: number) => {
    const currentQ = questions[currentIndex]
    if (!currentQ) return
    
    const answerTime = (Date.now() - questionStartTime) / 1000
    setTotalAnswerTime(t => t + answerTime)
    setLastAnswerTime(answerTime)
    
    const isCorrect = option === currentQ.answer
    
    if (isCorrect) {
      playCorrect()
      const timeBonus = Math.max(0, Math.floor(10 - answerTime))
      const diffMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2
      const points = Math.round((10 + timeBonus) * diffMultiplier)
      setScore(s => s + points)
      setCorrect(c => c + 1)
    } else {
      playWrong()
    }
    
    // Next question
    setCurrentIndex(i => i + 1)
    setQuestionStartTime(Date.now())
    
    // Update average time
    const newTotal = totalAnswerTime + answerTime
    const newCount = currentIndex + 1
    setAvgTime(newTotal / newCount)
  }

  const currentQuestion = questions[currentIndex]
  const config = DIFFICULTY_CONFIG[difficulty]
  const timePercent = (timeLeft / config.time) * 100

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 
        border-2 border-yellow-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mb-4">
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Спид-тест</h2>
          <p className="text-white/60 text-sm mt-1">Решай примеры на скорость!</p>
        </div>

        <div className="space-y-3">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => {
            const cfg = DIFFICULTY_CONFIG[diff]
            const colors = {
              easy: 'from-green-500 to-emerald-500',
              medium: 'from-yellow-500 to-orange-500',
              hard: 'from-red-500 to-rose-500'
            }
            const labels = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' }
            const ops = { easy: '+ −', medium: '+ − ×', hard: '+ − × ÷' }
            
            return (
              <button
                key={diff}
                onClick={() => startGame(diff)}
                className={`w-full p-4 rounded-2xl bg-gradient-to-r ${colors[diff]} text-white 
                  font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-between`}
              >
                <div className="flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  <span>{labels[diff]}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-normal opacity-80">
                  <span>{ops[diff]}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {cfg.time}с
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    const accuracy = currentIndex > 0 ? Math.round((correct / currentIndex) * 100) : 0
    
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 
        border-2 border-yellow-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
            {accuracy >= 80 ? (
              <Trophy className="w-10 h-10 text-yellow-400" />
            ) : accuracy >= 50 ? (
              <Medal className="w-10 h-10 text-orange-400" />
            ) : (
              <Target className="w-10 h-10 text-white/60" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">
            {accuracy >= 80 ? 'Молния! ⚡' : accuracy >= 50 ? 'Хороший результат!' : 'Попробуй ещё!'}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-white/60">Очки</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-green-400">{correct}/{currentIndex}</div>
            <div className="text-sm text-white/60">Правильно</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-blue-400">{accuracy}%</div>
            <div className="text-sm text-white/60">Точность</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-purple-400">{avgTime.toFixed(1)}с</div>
            <div className="text-sm text-white/60">Сред. время</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => startGame(difficulty)}
            className="flex-1 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-2xl 
              font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Ещё раз
          </button>
          <button
            onClick={() => setGameState('menu')}
            className="px-6 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"
          >
            <Target className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 
      border-2 border-yellow-400/30 backdrop-blur-sm">
      
      {/* Timer */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Clock className="w-4 h-4" />
            <span className={timeLeft <= 10 ? 'text-red-400 animate-pulse font-bold' : ''}>{timeLeft}с</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold">
            <Zap className="w-4 h-4" />
            <span>{score}</span>
          </div>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              timePercent > 50 ? 'bg-green-500' : timePercent > 25 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between mb-4 text-sm text-white/60">
        <span>Ответов: {currentIndex}</span>
        <span>Правильно: {correct}</span>
        {lastAnswerTime > 0 && <span>Последний: {lastAnswerTime.toFixed(1)}с</span>}
      </div>

      {/* Question */}
      {currentQuestion && (
        <>
          <h3 className="text-3xl font-bold text-white mb-6 text-center">{currentQuestion.q}</h3>

          {/* Options grid */}
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="p-6 rounded-2xl text-2xl font-bold bg-white/10 text-white hover:bg-yellow-500/30 
                  hover:scale-105 transition-all active:scale-95"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Warning */}
      {timeLeft <= 10 && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center gap-2 text-red-300 text-sm animate-pulse">
          <AlertTriangle className="w-4 h-4" />
          Время заканчивается!
        </div>
      )}
    </div>
  )
}
