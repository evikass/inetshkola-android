'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Hash, Trophy, Star, Zap, RotateCcw, HelpCircle } from 'lucide-react'

interface RomanQuestion {
  roman: string
  arabic: number
}

const romanNumerals: RomanQuestion[] = [
  { roman: 'I', arabic: 1 },
  { roman: 'II', arabic: 2 },
  { roman: 'III', arabic: 3 },
  { roman: 'IV', arabic: 4 },
  { roman: 'V', arabic: 5 },
  { roman: 'VI', arabic: 6 },
  { roman: 'VII', arabic: 7 },
  { roman: 'VIII', arabic: 8 },
  { roman: 'IX', arabic: 9 },
  { roman: 'X', arabic: 10 },
  { roman: 'XI', arabic: 11 },
  { roman: 'XII', arabic: 12 },
  { roman: 'XIII', arabic: 13 },
  { roman: 'XIV', arabic: 14 },
  { roman: 'XV', arabic: 15 },
  { roman: 'XVI', arabic: 16 },
  { roman: 'XVII', arabic: 17 },
  { roman: 'XVIII', arabic: 18 },
  { roman: 'XIX', arabic: 19 },
  { roman: 'XX', arabic: 20 },
  { roman: 'XXI', arabic: 21 },
  { roman: 'XXV', arabic: 25 },
  { roman: 'XXX', arabic: 30 },
  { roman: 'XL', arabic: 40 },
  { roman: 'L', arabic: 50 },
  { roman: 'LX', arabic: 60 },
  { roman: 'LXX', arabic: 70 },
  { roman: 'LXXX', arabic: 80 },
  { roman: 'XC', arabic: 90 },
  { roman: 'C', arabic: 100 },
  { roman: 'CL', arabic: 150 },
  { roman: 'CC', arabic: 200 },
  { roman: 'CD', arabic: 400 },
  { roman: 'D', arabic: 500 },
  { roman: 'DC', arabic: 600 },
  { roman: 'CM', arabic: 900 },
  { roman: 'M', arabic: 1000 },
  { roman: 'MM', arabic: 2000 },
  { roman: 'MMXXIV', arabic: 2024 },
  { roman: 'MMXXV', arabic: 2025 },
]

type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionType = 'roman' | 'arabic'

export default function RomanNumerals() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [questionType, setQuestionType] = useState<QuestionType>('roman')
  const [currentQuestion, setCurrentQuestion] = useState<RomanQuestion | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const getQuestions = useCallback((diff: Difficulty) => {
    if (diff === 'easy') {
      return romanNumerals.filter(q => q.arabic <= 20)
    } else if (diff === 'medium') {
      return romanNumerals.filter(q => q.arabic <= 100)
    }
    return romanNumerals
  }, [])

  const generateQuestion = useCallback(() => {
    const available = getQuestions(difficulty).filter((_, index) => !usedQuestions.has(index))
    if (available.length === 0) {
      setUsedQuestions(new Set())
      return
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const q = available[randomIndex]
    const globalIndex = romanNumerals.indexOf(q)
    
    setCurrentQuestion(q)
    setUsedQuestions(prev => new Set(prev).add(globalIndex))
    
    // Generate options
    const correctAnswer = questionType === 'roman' ? q.arabic.toString() : q.roman
    const allQuestions = getQuestions(difficulty)
    const wrongAnswers = allQuestions
      .filter(item => item.arabic !== q.arabic)
      .map(item => questionType === 'roman' ? item.arabic.toString() : item.roman)
    
    const optionCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5
    const shuffledWrong = shuffleArray(wrongAnswers).slice(0, optionCount - 1)
    setOptions(shuffleArray([correctAnswer, ...shuffledWrong]))
  }, [difficulty, questionType, usedQuestions, getQuestions])

  const startGame = useCallback((diff: Difficulty, type: QuestionType) => {
    setDifficulty(diff)
    setQuestionType(type)
    setScore(0)
    setQuestion(1)
    setCorrectAnswers(0)
    setStreak(0)
    setUsedQuestions(new Set())
    setGameState('playing')
    generateQuestion()
  }, [generateQuestion])

  const handleAnswer = (answer: string) => {
    if (showFeedback || !currentQuestion) return
    
    setSelectedAnswer(answer)
    const correctAnswer = questionType === 'roman' ? currentQuestion.arabic.toString() : currentQuestion.roman
    const isCorrect = answer === correctAnswer
    
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

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-stone-500/20 to-neutral-500/20 backdrop-blur-sm rounded-3xl p-6 border border-stone-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔢</div>
          <h2 className="text-2xl font-bold text-stone-300">Римские цифры</h2>
          <p className="text-stone-200/70 text-sm mt-1">Переводи римские ↔ арабские</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-stone-200/70 text-sm text-center">Тип вопроса:</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setQuestionType('roman')} className={`p-3 rounded-xl transition-all ${questionType === 'roman' ? 'bg-stone-500/40 border-stone-300' : 'bg-white/10'} border border-stone-400/30`}>
                <div className="text-lg font-serif">XIV</div>
                <div className="text-xs text-stone-200">Рим → Араб</div>
              </button>
              <button onClick={() => setQuestionType('arabic')} className={`p-3 rounded-xl transition-all ${questionType === 'arabic' ? 'bg-neutral-500/40 border-neutral-300' : 'bg-white/10'} border border-neutral-400/30`}>
                <div className="text-lg font-mono">14</div>
                <div className="text-xs text-neutral-200">Араб → Рим</div>
              </button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <button onClick={() => startGame('easy', questionType)} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
              <div className="font-bold text-green-300">🟢 Легко</div>
              <div className="text-xs text-green-200/70">I-XX (1-20)</div>
            </button>
            <button onClick={() => startGame('medium', questionType)} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
              <div className="font-bold text-yellow-300">🟡 Средне</div>
              <div className="text-xs text-yellow-200/70">I-C (1-100)</div>
            </button>
            <button onClick={() => startGame('hard', questionType)} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
              <div className="font-bold text-red-300">🔴 Сложно</div>
              <div className="text-xs text-red-200/70">I-MMXXV (до 2025)</div>
            </button>
          </div>
          
          {/* Reference */}
          <div className="mt-4 p-4 bg-white/5 rounded-xl">
            <p className="text-stone-300 text-sm font-medium mb-2">📚 Шпаргалка:</p>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              <div><span className="text-stone-300 font-serif">I</span> = 1</div>
              <div><span className="text-stone-300 font-serif">V</span> = 5</div>
              <div><span className="text-stone-300 font-serif">X</span> = 10</div>
              <div><span className="text-stone-300 font-serif">L</span> = 50</div>
              <div><span className="text-stone-300 font-serif">C</span> = 100</div>
              <div><span className="text-stone-300 font-serif">D</span> = 500</div>
              <div><span className="text-stone-300 font-serif">M</span> = 1000</div>
              <div className="col-span-3 text-stone-400">IV=4, IX=9, XL=40, XC=90, CD=400, CM=900</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-stone-500/20 to-neutral-500/20 backdrop-blur-sm rounded-3xl p-6 border border-stone-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-stone-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Hash className="w-8 h-8 mx-auto text-stone-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-stone-500/30 hover:bg-stone-500/40 rounded-xl text-stone-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  const correctAnswer = currentQuestion 
    ? (questionType === 'roman' ? currentQuestion.arabic.toString() : currentQuestion.roman)
    : ''

  return (
    <div className="bg-gradient-to-br from-stone-500/20 to-neutral-500/20 backdrop-blur-sm rounded-3xl p-6 border border-stone-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-stone-300 font-bold">{question}/10</span>
        {streak > 1 && (
          <span className="text-orange-400 text-sm flex items-center gap-1">
            <Zap className="w-4 h-4" /> {streak}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-stone-400 to-neutral-400 transition-all duration-300"
          style={{ width: `${(question / 10) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-1 rounded-full text-sm mb-4 bg-stone-500/30 text-stone-300">
          {questionType === 'roman' ? '🔢 Рим → Араб' : '🔤 Араб → Рим'}
        </div>
        
        <div className="py-4">
          <span className={`text-5xl font-bold text-white ${questionType === 'arabic' ? 'font-serif' : 'font-mono'}`}>
            {questionType === 'roman' ? currentQuestion?.roman : currentQuestion?.arabic}
          </span>
        </div>
        <p className="text-stone-300/60 text-sm">= ?</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {options.map((option, index) => {
          let bgClass = 'bg-white/10 hover:bg-white/20'
          
          if (showFeedback) {
            if (option === correctAnswer) {
              bgClass = 'bg-green-500/40'
            } else if (option === selectedAnswer && option !== correctAnswer) {
              bgClass = 'bg-red-500/40'
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback !== null}
              className={`p-4 rounded-xl text-white text-xl font-medium transition-all ${bgClass} ${questionType === 'roman' ? 'font-mono' : 'font-serif'}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center py-2 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <span className="text-lg">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <span className={`ml-2 font-medium ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>
            {showFeedback === 'correct' ? 'Правильно!' : `Правильный ответ: ${correctAnswer}`}
          </span>
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
