'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Clock, Trophy, Star, Zap, RotateCcw } from 'lucide-react'

interface TimeQuestion {
  hours: number
  minutes: number
  type: 'digital' | 'analog' | 'words'
}

type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionMode = 'read' | 'set'

export default function TimeQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [mode, setMode] = useState<QuestionMode>('read')
  const [currentQuestion, setCurrentQuestion] = useState<TimeQuestion | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [userHours, setUserHours] = useState(12)
  const [userMinutes, setUserMinutes] = useState(0)

  const getTimeLimit = useCallback((diff: Difficulty) => {
    return diff === 'easy' ? 20 : diff === 'medium' ? 15 : 10
  }, [])

  const formatTime = (hours: number, minutes: number): string => {
    const h = hours.toString().padStart(2, '0')
    const m = minutes.toString().padStart(2, '0')
    return `${h}:${m}`
  }

  const formatTimeWords = (hours: number, minutes: number): string => {
    const hourNames = ['двенадцать', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать']
    const hour = hours % 12 || 12
    
    if (minutes === 0) {
      return `${hourNames[hour % 12]} часов ровно`
    } else if (minutes === 15) {
      return `четверть ${hourNames[(hour + 1) % 12 || 12]}`
    } else if (minutes === 30) {
      return `половина ${hourNames[(hour + 1) % 12 || 12]}`
    } else if (minutes === 45) {
      return `без четверти ${hourNames[(hour + 1) % 12 || 12]}`
    } else if (minutes < 30) {
      return `${hourNames[hour % 12]} ${minutes} минут`
    } else {
      return `без ${60 - minutes} минут ${hourNames[(hour + 1) % 12 || 12]}`
    }
  }

  const generateQuestion = useCallback(() => {
    let hours: number, minutes: number
    
    if (difficulty === 'easy') {
      hours = Math.floor(Math.random() * 12) + 1 // 1-12
      minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)] // Только четверти
    } else if (difficulty === 'medium') {
      hours = Math.floor(Math.random() * 24) // 0-23
      minutes = Math.floor(Math.random() * 12) * 5 // По 5 минут
    } else {
      hours = Math.floor(Math.random() * 24)
      minutes = Math.floor(Math.random() * 60)
    }
    
    const questionData: TimeQuestion = { hours, minutes, type: 'digital' }
    setCurrentQuestion(questionData)
    
    // Generate options
    const correctAnswer = formatTime(hours, minutes)
    const wrongAnswers: string[] = []
    
    while (wrongAnswers.length < 3) {
      const wrongHours = Math.floor(Math.random() * 24)
      const wrongMinutes = difficulty === 'easy' 
        ? [0, 15, 30, 45][Math.floor(Math.random() * 4)]
        : Math.floor(Math.random() * 12) * 5
      const wrongTime = formatTime(wrongHours, wrongMinutes)
      
      if (wrongTime !== correctAnswer && !wrongAnswers.includes(wrongTime)) {
        wrongAnswers.push(wrongTime)
      }
    }
    
    setOptions([...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5))
    setUserHours(12)
    setUserMinutes(0)
  }, [difficulty])

  const startGame = useCallback((diff: Difficulty, gameMode: QuestionMode) => {
    setDifficulty(diff)
    setMode(gameMode)
    setScore(0)
    setQuestion(1)
    setCorrectAnswers(0)
    setStreak(0)
    setTimeLeft(getTimeLimit(diff))
    setGameState('playing')
    generateQuestion()
  }, [getTimeLimit, generateQuestion])

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
  }, [gameState, timeLeft])

  const handleTimeout = useCallback(() => {
    playSound('error')
    setShowFeedback('wrong')
    setStreak(0)
    
    setTimeout(() => {
      nextQuestion()
    }, 1500)
  }, [playSound])

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

  const handleAnswer = (answer: string) => {
    if (showFeedback || !currentQuestion) return
    
    setSelectedAnswer(answer)
    const correctAnswer = formatTime(currentQuestion.hours, currentQuestion.minutes)
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

  const handleSetTime = () => {
    if (showFeedback || !currentQuestion) return
    
    const correctHours = currentQuestion.hours
    const correctMinutes = currentQuestion.minutes
    const isCorrect = userHours === correctHours && userMinutes === correctMinutes
    
    setSelectedAnswer(formatTime(userHours, userMinutes))
    
    if (isCorrect) {
      playSound('success')
      const timeBonus = Math.round(timeLeft * 2)
      const streakBonus = streak * 5
      const xpGain = 15 + timeBonus + streakBonus
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

  // Draw analog clock
  const AnalogClock = ({ hours, minutes }: { hours: number; minutes: number }) => {
    const hourAngle = ((hours % 12) + minutes / 60) * 30 - 90
    const minuteAngle = minutes * 6 - 90
    
    return (
      <svg viewBox="0 0 100 100" className="w-48 h-48 mx-auto">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180
          const x1 = 50 + 40 * Math.cos(angle)
          const y1 = 50 + 40 * Math.sin(angle)
          const x2 = 50 + 45 * Math.cos(angle)
          const y2 = 50 + 45 * Math.sin(angle)
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          )
        })}
        <line
          x1="50" y1="50"
          x2={50 + 20 * Math.cos(hourAngle * Math.PI / 180)}
          y2={50 + 20 * Math.sin(hourAngle * Math.PI / 180)}
          stroke="white" strokeWidth="4" strokeLinecap="round"
        />
        <line
          x1="50" y1="50"
          x2={50 + 30 * Math.cos(minuteAngle * Math.PI / 180)}
          y2={50 + 30 * Math.sin(minuteAngle * Math.PI / 180)}
          stroke="white" strokeWidth="2" strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="3" fill="white" />
      </svg>
    )
  }

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-6 border border-amber-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">⏰</div>
          <h2 className="text-2xl font-bold text-amber-300">Часы и время</h2>
          <p className="text-amber-200/70 text-sm mt-1">Научись определять время</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-amber-200/70 text-sm text-center">Режим игры:</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setMode('read')} className={`p-3 rounded-xl transition-all ${mode === 'read' ? 'bg-amber-500/40 border-amber-300' : 'bg-white/10'} border border-amber-400/30`}>
                <div className="text-lg">⏱️</div>
                <div className="text-xs text-amber-200">Прочитай часы</div>
              </button>
              <button onClick={() => setMode('set')} className={`p-3 rounded-xl transition-all ${mode === 'set' ? 'bg-orange-500/40 border-orange-300' : 'bg-white/10'} border border-orange-400/30`}>
                <div className="text-lg">🕐</div>
                <div className="text-xs text-orange-200">Установи время</div>
              </button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <button onClick={() => startGame('easy', mode)} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
              <div className="font-bold text-green-300">🟢 Легко</div>
              <div className="text-xs text-green-200/70">1-12 часов, четверти</div>
            </button>
            <button onClick={() => startGame('medium', mode)} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
              <div className="font-bold text-yellow-300">🟡 Средне</div>
              <div className="text-xs text-yellow-200/70">24 часа, по 5 минут</div>
            </button>
            <button onClick={() => startGame('hard', mode)} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
              <div className="font-bold text-red-300">🔴 Сложно</div>
              <div className="text-xs text-red-200/70">24 часа, точно</div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-6 border border-amber-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-amber-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Clock className="w-8 h-8 mx-auto text-amber-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-amber-500/30 hover:bg-amber-500/40 rounded-xl text-amber-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-6 border border-amber-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-amber-300 font-bold">{question}/10</span>
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
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300"
          style={{ width: `${(question / 10) * 100}%` }}
        />
      </div>

      {/* Clock Display */}
      {currentQuestion && (
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 rounded-full text-sm mb-4 bg-amber-500/30 text-amber-300">
            {mode === 'read' ? '⏱️ Который час?' : '🕐 Установи время'}
          </div>
          
          {mode === 'read' ? (
            <AnalogClock hours={currentQuestion.hours} minutes={currentQuestion.minutes} />
          ) : (
            <div className="text-center">
              <div className="text-4xl font-mono text-white mb-4">{formatTime(currentQuestion.hours, currentQuestion.minutes)}</div>
              <p className="text-amber-200/70">Установи стрелки на это время</p>
            </div>
          )}
        </div>
      )}

      {/* Answer Options */}
      {mode === 'read' ? (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {options.map((option, index) => {
            let bgClass = 'bg-white/10 hover:bg-white/20'
            
            if (showFeedback && currentQuestion) {
              const correctAnswer = formatTime(currentQuestion.hours, currentQuestion.minutes)
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
                className={`p-4 rounded-xl text-white font-mono text-lg transition-all ${bgClass}`}
              >
                {option}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="space-y-4 mb-4">
          {/* Time Setters */}
          <div className="flex justify-center items-center gap-4">
            <div className="text-center">
              <div className="text-white/70 text-sm mb-2">Часы</div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setUserHours(prev => (prev - 1 + 24) % 24)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                >−</button>
                <span className="text-3xl font-mono text-white w-12 text-center">{userHours.toString().padStart(2, '0')}</span>
                <button 
                  onClick={() => setUserHours(prev => (prev + 1) % 24)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                >+</button>
              </div>
            </div>
            <span className="text-3xl text-white">:</span>
            <div className="text-center">
              <div className="text-white/70 text-sm mb-2">Минуты</div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setUserMinutes(prev => (prev - 5 + 60) % 60)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                >−</button>
                <span className="text-3xl font-mono text-white w-12 text-center">{userMinutes.toString().padStart(2, '0')}</span>
                <button 
                  onClick={() => setUserMinutes(prev => (prev + 5) % 60)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                >+</button>
              </div>
            </div>
          </div>
          
          {/* Preview Clock */}
          <div className="flex justify-center">
            <AnalogClock hours={userHours} minutes={userMinutes} />
          </div>
          
          <button
            onClick={handleSetTime}
            disabled={showFeedback !== null}
            className="w-full py-3 rounded-xl bg-amber-500/30 hover:bg-amber-500/40 text-amber-300 font-bold transition-all"
          >
            Проверить
          </button>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && currentQuestion && (
        <div className={`text-center py-2 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <span className="text-lg">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <span className={`ml-2 font-medium ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>
            {showFeedback === 'correct' ? 'Правильно!' : `Правильное время: ${formatTime(currentQuestion.hours, currentQuestion.minutes)}`}
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
