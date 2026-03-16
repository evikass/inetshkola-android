'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Flag, Trophy, Clock, Star, Zap, Globe, RotateCcw } from 'lucide-react'

interface FlagData {
  country: string
  emoji: string
  continent: string
}

const flags: FlagData[] = [
  { country: 'Россия', emoji: '🇷🇺', continent: 'Европа/Азия' },
  { country: 'США', emoji: '🇺🇸', continent: 'Северная Америка' },
  { country: 'Китай', emoji: '🇨🇳', continent: 'Азия' },
  { country: 'Япония', emoji: '🇯🇵', continent: 'Азия' },
  { country: 'Германия', emoji: '🇩🇪', continent: 'Европа' },
  { country: 'Франция', emoji: '🇫🇷', continent: 'Европа' },
  { country: 'Великобритания', emoji: '🇬🇧', continent: 'Европа' },
  { country: 'Италия', emoji: '🇮🇹', continent: 'Европа' },
  { country: 'Испания', emoji: '🇪🇸', continent: 'Европа' },
  { country: 'Бразилия', emoji: '🇧🇷', continent: 'Южная Америка' },
  { country: 'Канада', emoji: '🇨🇦', continent: 'Северная Америка' },
  { country: 'Австралия', emoji: '🇦🇺', continent: 'Океания' },
  { country: 'Индия', emoji: '🇮🇳', continent: 'Азия' },
  { country: 'Мексика', emoji: '🇲🇽', continent: 'Северная Америка' },
  { country: 'Южная Корея', emoji: '🇰🇷', continent: 'Азия' },
  { country: 'Аргентина', emoji: '🇦🇷', continent: 'Южная Америка' },
  { country: 'Турция', emoji: '🇹🇷', continent: 'Азия/Европа' },
  { country: 'Индонезия', emoji: '🇮🇩', continent: 'Азия' },
  { country: 'Польша', emoji: '🇵🇱', continent: 'Европа' },
  { country: 'Нидерланды', emoji: '🇳🇱', continent: 'Европа' },
  { country: 'Швеция', emoji: '🇸🇪', continent: 'Европа' },
  { country: 'Норвегия', emoji: '🇳🇴', continent: 'Европа' },
  { country: 'Финляндия', emoji: '🇫🇮', continent: 'Европа' },
  { country: 'Дания', emoji: '🇩🇰', continent: 'Европа' },
  { country: 'Греция', emoji: '🇬🇷', continent: 'Европа' },
  { country: 'Португалия', emoji: '🇵🇹', continent: 'Европа' },
  { country: 'Бельгия', emoji: '🇧🇪', continent: 'Европа' },
  { country: 'Швейцария', emoji: '🇨🇭', continent: 'Европа' },
  { country: 'Австрия', emoji: '🇦🇹', continent: 'Европа' },
  { country: 'Чехия', emoji: '🇨🇿', continent: 'Европа' },
  { country: 'Венгрия', emoji: '🇭🇺', continent: 'Европа' },
  { country: 'Украина', emoji: '🇺🇦', continent: 'Европа' },
  { country: 'Беларусь', emoji: '🇧🇾', continent: 'Европа' },
  { country: 'Казахстан', emoji: '🇰🇿', continent: 'Азия' },
  { country: 'Узбекистан', emoji: '🇺🇿', continent: 'Азия' },
  { country: 'Египет', emoji: '🇪🇬', continent: 'Африка' },
  { country: 'ЮАР', emoji: '🇿🇦', continent: 'Африка' },
  { country: 'Нигерия', emoji: '🇳🇬', continent: 'Африка' },
  { country: 'Марокко', emoji: '🇲🇦', continent: 'Африка' },
  { country: 'Таиланд', emoji: '🇹🇭', continent: 'Азия' },
  { country: 'Вьетнам', emoji: '🇻🇳', continent: 'Азия' },
  { country: 'Филиппины', emoji: '🇵🇭', continent: 'Азия' },
  { country: 'Малайзия', emoji: '🇲🇾', continent: 'Азия' },
  { country: 'Сингапур', emoji: '🇸🇬', continent: 'Азия' },
  { country: 'Новая Зеландия', emoji: '🇳🇿', continent: 'Океания' },
  { country: 'Чили', emoji: '🇨🇱', continent: 'Южная Америка' },
  { country: 'Колумбия', emoji: '🇨🇴', continent: 'Южная Америка' },
  { country: 'Перу', emoji: '🇵🇪', continent: 'Южная Америка' },
  { country: 'Венесуэла', emoji: '🇻🇪', continent: 'Южная Америка' },
  { country: 'Куба', emoji: '🇨🇺', continent: 'Северная Америка' },
]

type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionType = 'flag' | 'country' | 'continent'

export default function FlagsQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [questionType, setQuestionType] = useState<QuestionType>('flag')
  const [currentFlag, setCurrentFlag] = useState<FlagData | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedFlags, setUsedFlags] = useState<Set<string>>(new Set())

  const getTimeLimit = useCallback((diff: Difficulty) => {
    return diff === 'easy' ? 15 : diff === 'medium' ? 10 : 7
  }, [])

  const getOptionCount = useCallback((diff: Difficulty) => {
    return diff === 'easy' ? 3 : diff === 'medium' ? 4 : 5
  }, [])

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const generateQuestion = useCallback(() => {
    const availableFlags = flags.filter(f => !usedFlags.has(f.country))
    if (availableFlags.length === 0) {
      setUsedFlags(new Set())
      return
    }
    
    const flag = availableFlags[Math.floor(Math.random() * availableFlags.length)]
    setUsedFlags(prev => new Set(prev).add(flag.country))
    
    let correctAnswer: string
    let wrongAnswers: string[]
    
    if (questionType === 'continent') {
      correctAnswer = flag.continent
      wrongAnswers = ['Европа', 'Азия', 'Африка', 'Северная Америка', 'Южная Америка', 'Океания']
        .filter(c => c !== flag.continent)
    } else {
      correctAnswer = flag.country
      wrongAnswers = flags
        .filter(f => f.country !== flag.country)
        .map(f => f.country)
    }
    
    const shuffledWrong = shuffleArray(wrongAnswers).slice(0, getOptionCount(difficulty) - 1)
    const allOptions = shuffleArray([correctAnswer, ...shuffledWrong])
    
    setCurrentFlag(flag)
    setOptions(allOptions)
  }, [difficulty, questionType, usedFlags, getOptionCount])

  const startGame = useCallback((diff: Difficulty, type: QuestionType) => {
    setDifficulty(diff)
    setQuestionType(type)
    setScore(0)
    setQuestion(1)
    setCorrectAnswers(0)
    setStreak(0)
    setUsedFlags(new Set())
    setTimeLeft(getTimeLimit(diff))
    setGameState('playing')
    setTimeout(() => generateQuestion(), 100)
  }, [getTimeLimit, generateQuestion])

  const nextQuestion = useCallback(() => {
    setShowFeedback(null)
    setSelectedAnswer(null)
    
    if (question >= 10) {
      setGameState('result')
    } else {
      setQuestion(prev => prev + 1)
      generateQuestion()
      setTimeLeft(getTimeLimit(difficulty))
    }
  }, [question, difficulty, generateQuestion, getTimeLimit])

  const handleTimeout = useCallback(() => {
    playSound('error')
    setShowFeedback('wrong')
    setStreak(0)
    
    setTimeout(() => {
      nextQuestion()
    }, 1500)
  }, [playSound, nextQuestion])

  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameState, timeLeft, handleTimeout])

  const handleAnswer = (answer: string) => {
    if (showFeedback || !currentFlag) return
    
    setSelectedAnswer(answer)
    
    let correctAnswer: string
    if (questionType === 'continent') {
      correctAnswer = currentFlag.continent
    } else {
      correctAnswer = currentFlag.country
    }
    
    const isCorrect = answer === correctAnswer
    
    if (isCorrect) {
      playSound('success')
      const timeBonus = Math.round(timeLeft * 2)
      const streakBonus = streak * 5
      const xpGain = 10 + timeBonus + streakBonus
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

  const questionCount = 10

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-3xl p-6 border border-blue-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏳️</div>
          <h2 className="text-2xl font-bold text-blue-300">Викторина флагов</h2>
          <p className="text-blue-200/70 text-sm mt-1">Угадай страну по флагу</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-blue-200/70 text-sm text-center">Тип вопроса:</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setQuestionType('flag')} className={`p-3 rounded-xl transition-all ${questionType === 'flag' ? 'bg-blue-500/40 border-blue-300' : 'bg-white/10'} border border-blue-400/30`}>
                <div className="text-lg">🏳️</div>
                <div className="text-xs text-blue-200">Флаг → Страна</div>
              </button>
              <button onClick={() => setQuestionType('country')} className={`p-3 rounded-xl transition-all ${questionType === 'country' ? 'bg-indigo-500/40 border-indigo-300' : 'bg-white/10'} border border-indigo-400/30`}>
                <div className="text-lg">🗺️</div>
                <div className="text-xs text-indigo-200">Страна → Флаг</div>
              </button>
              <button onClick={() => setQuestionType('continent')} className={`p-3 rounded-xl transition-all ${questionType === 'continent' ? 'bg-cyan-500/40 border-cyan-300' : 'bg-white/10'} border border-cyan-400/30`}>
                <div className="text-lg">🌍</div>
                <div className="text-xs text-cyan-200">Континент</div>
              </button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <button onClick={() => startGame('easy', questionType)} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
              <div className="font-bold text-green-300">🟢 Легко</div>
              <div className="text-xs text-green-200/70">3 варианта, 15 секунд</div>
            </button>
            <button onClick={() => startGame('medium', questionType)} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
              <div className="font-bold text-yellow-300">🟡 Средне</div>
              <div className="text-xs text-yellow-200/70">4 варианта, 10 секунд</div>
            </button>
            <button onClick={() => startGame('hard', questionType)} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
              <div className="font-bold text-red-300">🔴 Сложно</div>
              <div className="text-xs text-red-200/70">5 вариантов, 7 секунд</div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    const accuracy = Math.round((correctAnswers / questionCount) * 100)
    
    return (
      <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-3xl p-6 border border-blue-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-blue-300 mb-2">Викторина завершена!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Flag className="w-8 h-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/{questionCount}</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Globe className="w-8 h-8 mx-auto text-indigo-400 mb-2" />
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-blue-500/30 hover:bg-blue-500/40 rounded-xl text-blue-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  const getCorrectAnswer = () => {
    if (!currentFlag) return ''
    if (questionType === 'continent') return currentFlag.continent
    return currentFlag.country
  }

  const correctAnswer = getCorrectAnswer()

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-3xl p-6 border border-blue-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-blue-300 font-bold">{question}/{questionCount}</span>
          {streak > 1 && (
            <span className="text-orange-400 text-sm flex items-center gap-1">
              <Zap className="w-4 h-4" /> {streak} серия
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Clock className="w-4 h-4" />
          <span className={`font-mono ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : ''}`}>{timeLeft}с</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300"
          style={{ width: `${(question / questionCount) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-1 rounded-full text-sm mb-4 bg-blue-500/30 text-blue-300">
          {questionType === 'flag' ? '🏳️ Какая страна?' : questionType === 'country' ? '🗺️ Какой флаг?' : '🌍 Какой континент?'}
        </div>
        
        {questionType === 'flag' ? (
          <div className="text-8xl mb-4">{currentFlag?.emoji}</div>
        ) : questionType === 'country' ? (
          <div className="text-2xl font-bold text-white mb-4">{currentFlag?.country}</div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <div className="text-6xl">{currentFlag?.emoji}</div>
            <span className="text-xl text-white/60">{currentFlag?.country}</span>
          </div>
        )}
      </div>

      {/* Options */}
      <div className={`grid gap-2 mb-4 ${questionType === 'country' ? 'grid-cols-3' : ''}`}>
        {options.map((option, index) => {
          let bgClass = 'bg-white/10 hover:bg-white/20'
          
          if (showFeedback) {
            if (option === correctAnswer) {
              bgClass = 'bg-green-500/40'
            } else if (option === selectedAnswer && option !== correctAnswer) {
              bgClass = 'bg-red-500/40'
            }
          }
          
          // For country → flag mode, show flag emojis
          const flagData = questionType === 'country' ? flags.find(f => f.country === option) : null
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback !== null}
              className={`p-4 rounded-xl text-white font-medium transition-all ${bgClass}`}
            >
              {questionType === 'country' && flagData ? (
                <div className="text-4xl">{flagData.emoji}</div>
              ) : (
                option
              )}
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
        className="w-full mt-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 flex items-center justify-center gap-2 transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        Пропустить
      </button>
    </div>
  )
}
