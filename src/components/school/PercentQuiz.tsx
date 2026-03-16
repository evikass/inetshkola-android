'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Trophy, Star, Zap, RotateCcw, Percent } from 'lucide-react'

interface PercentQuestion {
  question: string
  answer: number
  type: 'toPercent' | 'fromPercent' | 'calculate'
  hint: string
}

type Difficulty = 'easy' | 'medium' | 'hard'

export default function PercentQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentQuestion, setCurrentQuestion] = useState<PercentQuestion | null>(null)
  const [options, setOptions] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const generateQuestion = useCallback(() => {
    const types: ('toPercent' | 'fromPercent' | 'calculate')[] = 
      difficulty === 'easy' ? ['toPercent'] 
      : difficulty === 'medium' ? ['toPercent', 'fromPercent'] 
      : ['toPercent', 'fromPercent', 'calculate']
    
    const type = types[Math.floor(Math.random() * types.length)]
    let question: PercentQuestion
    let correctAnswer: number
    let wrongAnswers: number[]
    
    if (type === 'toPercent') {
      // Convert decimal/fraction to percent
      const decimals = difficulty === 'easy' 
        ? [0.1, 0.2, 0.25, 0.5, 0.75, 0.5, 0.3, 0.4, 0.6, 0.8]
        : [0.15, 0.35, 0.45, 0.55, 0.65, 0.85, 0.125, 0.375]
      
      const decimal = decimals[Math.floor(Math.random() * decimals.length)]
      correctAnswer = decimal * 100
      question = {
        question: `${decimal} = ?%`,
        answer: correctAnswer,
        type: 'toPercent',
        hint: 'Умножь на 100'
      }
      wrongAnswers = [correctAnswer - 10, correctAnswer + 10, correctAnswer / 10, correctAnswer * 10]
        .filter(n => n > 0 && n !== correctAnswer && n <= 100)
      
    } else if (type === 'fromPercent') {
      // Convert percent to decimal
      const percents = difficulty === 'easy'
        ? [10, 20, 25, 50, 75, 30, 40, 60, 80]
        : [15, 35, 45, 55, 65, 85, 12.5, 37.5]
      
      const percent = percents[Math.floor(Math.random() * percents.length)]
      correctAnswer = percent / 100
      question = {
        question: `${percent}% = ?`,
        answer: correctAnswer,
        type: 'fromPercent',
        hint: 'Раздели на 100'
      }
      wrongAnswers = [percent, percent * 10, percent / 10, correctAnswer * 10]
        .filter(n => n !== correctAnswer)
      
    } else {
      // Calculate percentage of a number
      const bases = [100, 200, 50, 250, 300, 400, 500]
      const percents = [10, 20, 25, 50, 75, 15, 30]
      
      const base = bases[Math.floor(Math.random() * bases.length)]
      const percent = percents[Math.floor(Math.random() * percents.length)]
      correctAnswer = (base * percent) / 100
      question = {
        question: `${percent}% от ${base} = ?`,
        answer: correctAnswer,
        type: 'calculate',
        hint: `Найди ${percent}/100 от ${base}`
      }
      wrongAnswers = [
        Math.abs(base - correctAnswer),
        Math.abs(base + correctAnswer),
        correctAnswer * 2,
        correctAnswer / 2
      ].filter(n => n > 0 && n !== correctAnswer)
    }
    
    setCurrentQuestion(question)
    
    // Generate options
    const validWrongs = wrongAnswers.filter(n => 
      n > 0 && n !== correctAnswer && !isNaN(n) && isFinite(n)
    ).slice(0, 3)
    
    while (validWrongs.length < 3) {
      const fake = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10 + 5)
      if (fake > 0 && fake !== correctAnswer && !validWrongs.includes(fake)) {
        validWrongs.push(Math.round(fake * 100) / 100)
      }
    }
    
    setOptions(shuffleArray([correctAnswer, ...validWrongs.slice(0, 3)]))
  }, [difficulty])

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff)
    setScore(0)
    setQuestion(1)
    setCorrectAnswers(0)
    setStreak(0)
    setGameState('playing')
    generateQuestion()
  }, [generateQuestion])

  const handleAnswer = (answer: number) => {
    if (showFeedback || !currentQuestion) return
    
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.answer
    
    if (isCorrect) {
      playSound('success')
      const xpGain = 10 + streak * 3
      addXP(xpGain)
      setScore(prev => prev + xpGain)
      setCorrectAnswers(prev => prev + 1)
      setStreak(prev => prev + 1)
      setShowFeedback('correct')
    } else {
      playSound('error')
      setStreak(0)
      setShowFeedback('wrong')
    }
    
    setTimeout(() => {
      nextQuestion()
    }, 1500)
  }

  const nextQuestion = useCallback(() => {
    setShowFeedback(null)
    setSelectedAnswer(null)
    
    if (question >= 10) {
      setGameState('result')
    } else {
      setQuestion(prev => prev + 1)
      generateQuestion()
    }
  }, [question, generateQuestion])

  const formatAnswer = (n: number): string => {
    if (n < 1 && n > 0) {
      return n.toFixed(2)
    }
    return n % 1 === 0 ? n.toString() : n.toFixed(1)
  }

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-3xl p-6 border border-orange-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📊</div>
          <h2 className="text-2xl font-bold text-orange-300">Проценты</h2>
          <p className="text-orange-200/70 text-sm mt-1">Вычисляй проценты</p>
        </div>
        
        <div className="grid gap-3 max-w-xs mx-auto">
          <button onClick={() => startGame('easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
            <div className="font-bold text-green-300">🟢 Легко</div>
            <div className="text-xs text-green-200/70">Дроби → Проценты</div>
          </button>
          <button onClick={() => startGame('medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
            <div className="font-bold text-yellow-300">🟡 Средне</div>
            <div className="text-xs text-yellow-200/70">+ Проценты → Дроби</div>
          </button>
          <button onClick={() => startGame('hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
            <div className="font-bold text-red-300">🔴 Сложно</div>
            <div className="text-xs text-red-200/70">+ Вычисление % от числа</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-3xl p-6 border border-orange-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-orange-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Percent className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-orange-500/30 hover:bg-orange-500/40 rounded-xl text-orange-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-3xl p-6 border border-orange-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-orange-300 font-bold">{question}/10</span>
        {streak > 1 && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <Zap className="w-4 h-4" /> {streak}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-red-400 transition-all duration-300"
          style={{ width: `${(question / 10) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-1 rounded-full text-sm mb-4 bg-orange-500/30 text-orange-300">
          {currentQuestion?.type === 'toPercent' ? '📊 Дробь → Процент' 
            : currentQuestion?.type === 'fromPercent' ? '📈 Процент → Дробь' 
            : '🔢 Вычисли процент'}
        </div>
        <p className="text-3xl font-bold text-white">{currentQuestion?.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {options.map((option, index) => {
          let bgClass = 'bg-white/10 hover:bg-white/20'
          
          if (showFeedback && currentQuestion) {
            if (option === currentQuestion.answer) {
              bgClass = 'bg-green-500/40'
            } else if (option === selectedAnswer && option !== currentQuestion.answer) {
              bgClass = 'bg-red-500/40'
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback !== null}
              className={`p-4 rounded-xl text-white text-2xl font-bold transition-all ${bgClass}`}
            >
              {formatAnswer(option)}{currentQuestion?.type === 'toPercent' ? '%' : ''}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {showFeedback && currentQuestion && (
        <div className={`text-center py-2 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <span className="text-lg">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <span className={`ml-2 font-medium ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>
            {showFeedback === 'correct' ? 'Правильно!' : `Ответ: ${formatAnswer(currentQuestion.answer)}${currentQuestion.type === 'toPercent' ? '%' : ''}`}
          </span>
          {showFeedback === 'wrong' && (
            <p className="text-white/60 text-sm mt-1">{currentQuestion.hint}</p>
          )}
        </div>
      )}

      {/* Skip */}
      <button 
        onClick={() => {
          playSound('click')
          nextQuestion()
        }}
        disabled={showFeedback !== null}
        className="w-full mt-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        <RotateCcw className="w-4 h-4" />
        Пропустить
      </button>
    </div>
  )
}
