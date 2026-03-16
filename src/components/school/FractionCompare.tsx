'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Trophy, Star, Zap, RotateCcw, Scale } from 'lucide-react'

interface FractionQuestion {
  numerator1: number
  denominator1: number
  numerator2: number
  denominator2: number
  correctAnswer: '<' | '=' | '>'
  explanation: string
}

type Difficulty = 'easy' | 'medium' | 'hard'

export default function FractionCompare() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentQuestion, setCurrentQuestion] = useState<FractionQuestion | null>(null)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<'<' | '=' | '>' | null>(null)

  const generateQuestion = useCallback(() => {
    let n1: number, d1: number, n2: number, d2: number
    
    if (difficulty === 'easy') {
      // Same denominators
      d1 = d2 = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)]
      n1 = Math.floor(Math.random() * (d1 - 1)) + 1
      n2 = Math.floor(Math.random() * (d2 - 1)) + 1
      while (n2 === n1) {
        n2 = Math.floor(Math.random() * (d2 - 1)) + 1
      }
    } else if (difficulty === 'medium') {
      // Different denominators, but easy to compare
      const pairs = [[2, 4], [3, 6], [2, 6], [3, 9], [4, 8]]
      const [dA, dB] = pairs[Math.floor(Math.random() * pairs.length)]
      d1 = Math.random() > 0.5 ? dA : dB
      d2 = Math.random() > 0.5 ? dA : dB
      n1 = Math.floor(Math.random() * (d1 - 1)) + 1
      n2 = Math.floor(Math.random() * (d2 - 1)) + 1
    } else {
      // Any denominators
      d1 = Math.floor(Math.random() * 9) + 2
      d2 = Math.floor(Math.random() * 9) + 2
      n1 = Math.floor(Math.random() * (d1 - 1)) + 1
      n2 = Math.floor(Math.random() * (d2 - 1)) + 1
    }
    
    const value1 = n1 / d1
    const value2 = n2 / d2
    
    let correctAnswer: '<' | '=' | '>'
    if (value1 < value2) correctAnswer = '<'
    else if (value1 > value2) correctAnswer = '>'
    else correctAnswer = '='
    
    // Generate explanation
    let explanation = ''
    if (d1 === d2) {
      explanation = `Одинаковые знаменатели: сравниваем числители ${n1} и ${n2}`
    } else {
      const commonD = d1 * d2
      const newN1 = n1 * d2
      const newN2 = n2 * d1
      explanation = `Приводим к общему знаменателю ${commonD}: ${n1}/${d1} = ${newN1}/${commonD}, ${n2}/${d2} = ${newN2}/${commonD}`
    }
    
    setCurrentQuestion({
      numerator1: n1,
      denominator1: d1,
      numerator2: n2,
      denominator2: d2,
      correctAnswer,
      explanation
    })
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

  const handleAnswer = (answer: '<' | '=' | '>') => {
    if (showFeedback || !currentQuestion) return
    
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.correctAnswer
    
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
    }, 2000)
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

  const renderFraction = (num: number, den: number, size: 'large' | 'small' = 'large') => {
    const textSize = size === 'large' ? 'text-4xl' : 'text-2xl'
    return (
      <div className="flex flex-col items-center">
        <span className={`${textSize} font-bold text-white`}>{num}</span>
        <div className={`w-full bg-white/40 ${size === 'large' ? 'h-1' : 'h-0.5'}`} />
        <span className={`${textSize} font-bold text-white`}>{den}</span>
      </div>
    )
  }

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-6 border border-indigo-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🧮</div>
          <h2 className="text-2xl font-bold text-indigo-300">Сравнение дробей</h2>
          <p className="text-indigo-200/70 text-sm mt-1">Какая дробь больше?</p>
        </div>
        
        <div className="grid gap-3 max-w-xs mx-auto">
          <button onClick={() => startGame('easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
            <div className="font-bold text-green-300">🟢 Легко</div>
            <div className="text-xs text-green-200/70">Одинаковые знаменатели</div>
          </button>
          <button onClick={() => startGame('medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
            <div className="font-bold text-yellow-300">🟡 Средне</div>
            <div className="text-xs text-yellow-200/70">Похожие знаменатели</div>
          </button>
          <button onClick={() => startGame('hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
            <div className="font-bold text-red-300">🔴 Сложно</div>
            <div className="text-xs text-red-200/70">Любые знаменатели</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-6 border border-indigo-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-indigo-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Scale className="w-8 h-8 mx-auto text-indigo-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-indigo-500/30 hover:bg-indigo-500/40 rounded-xl text-indigo-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-6 border border-indigo-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-indigo-300 font-bold">{question}/10</span>
        {streak > 1 && (
          <span className="text-orange-400 text-sm flex items-center gap-1">
            <Zap className="w-4 h-4" /> {streak}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-400 to-blue-400 transition-all duration-300"
          style={{ width: `${(question / 10) * 100}%` }}
        />
      </div>

      {/* Fractions */}
      <div className="flex items-center justify-center gap-6 mb-8">
        {currentQuestion && renderFraction(currentQuestion.numerator1, currentQuestion.denominator1)}
        
        <div className="text-4xl text-white/60 font-mono">?</div>
        
        {currentQuestion && renderFraction(currentQuestion.numerator2, currentQuestion.denominator2)}
      </div>

      {/* Answer Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => handleAnswer('<')}
          disabled={showFeedback !== null}
          className={`w-20 h-20 rounded-xl text-4xl font-bold transition-all ${
            showFeedback && currentQuestion?.correctAnswer === '<'
              ? 'bg-green-500/40 text-green-300'
              : showFeedback && selectedAnswer === '<' && currentQuestion?.correctAnswer !== '<'
              ? 'bg-red-500/40 text-red-300'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          &lt;
        </button>
        <button
          onClick={() => handleAnswer('=')}
          disabled={showFeedback !== null}
          className={`w-20 h-20 rounded-xl text-4xl font-bold transition-all ${
            showFeedback && currentQuestion?.correctAnswer === '='
              ? 'bg-green-500/40 text-green-300'
              : showFeedback && selectedAnswer === '=' && currentQuestion?.correctAnswer !== '='
              ? 'bg-red-500/40 text-red-300'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          =
        </button>
        <button
          onClick={() => handleAnswer('>')}
          disabled={showFeedback !== null}
          className={`w-20 h-20 rounded-xl text-4xl font-bold transition-all ${
            showFeedback && currentQuestion?.correctAnswer === '>'
              ? 'bg-green-500/40 text-green-300'
              : showFeedback && selectedAnswer === '>' && currentQuestion?.correctAnswer !== '>'
              ? 'bg-red-500/40 text-red-300'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          &gt;
        </button>
      </div>

      {/* Feedback */}
      {showFeedback && currentQuestion && (
        <div className={`text-center py-3 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <span className="text-2xl">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <p className={`font-medium mt-1 ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>
            {showFeedback === 'correct' ? 'Правильно!' : `Ответ: ${currentQuestion.correctAnswer}`}
          </p>
          <p className="text-white/60 text-sm mt-2">{currentQuestion.explanation}</p>
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
