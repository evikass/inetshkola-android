'use client'

import { useState, useEffect, useCallback } from 'react'
import { Gift, Star, Target, Clock, CheckCircle, XCircle, Sparkles, Flame } from 'lucide-react'
import { useSound } from '@/lib/sounds'
import { useSchool } from '@/context/SchoolContext'

interface DailyTask {
  id: string
  title: string
  description: string
  target: number
  reward: number
  type: 'questions' | 'games' | 'streak' | 'accuracy'
}

const DAILY_TASKS: DailyTask[] = [
  { id: 'questions_10', title: 'Любознательный', description: 'Ответь на 10 вопросов', target: 10, reward: 50, type: 'questions' },
  { id: 'questions_25', title: 'Энциклопедист', description: 'Ответь на 25 вопросов', target: 25, reward: 100, type: 'questions' },
  { id: 'games_3', title: 'Игрок', description: 'Сыграй 3 игры', target: 3, reward: 30, type: 'games' },
  { id: 'games_5', title: 'Игроман', description: 'Сыграй 5 игр', target: 5, reward: 60, type: 'games' },
  { id: 'accuracy_80', title: 'Меткий', description: 'Достигни 80% точности', target: 80, reward: 75, type: 'accuracy' },
  { id: 'streak_5', title: 'На волне', description: 'Серия из 5 правильных', target: 5, reward: 40, type: 'streak' },
]

interface ChallengeQuestion {
  q: string
  options: string[]
  answer: string
}

const CHALLENGE_QUESTIONS: ChallengeQuestion[] = [
  { q: "5 × 9 = ?", options: ["40", "45", "50"], answer: "45" },
  { q: "Сколько месяцев в году?", options: ["10", "11", "12"], answer: "12" },
  { q: "Столица Франции?", options: ["Лондон", "Париж", "Берлин"], answer: "Париж" },
  { q: "2³ = ?", options: ["6", "8", "9"], answer: "8" },
  { q: "Какой океан самый большой?", options: ["Атлантический", "Тихий", "Индийский"], answer: "Тихий" },
  { q: "100 - 37 = ?", options: ["63", "67", "73"], answer: "63" },
  { q: "Кто написал 'Война и мир'?", options: ["Пушкин", "Толстой", "Достоевский"], answer: "Толстой" },
  { q: "Сколько дней в неделе?", options: ["5", "6", "7"], answer: "7" },
  { q: "15 × 4 = ?", options: ["55", "60", "65"], answer: "60" },
  { q: "Формула воды?", options: ["H2O", "CO2", "O2"], answer: "H2O" },
]

// Helper to get saved state
function getSavedState(todayKey: string) {
  if (typeof window === 'undefined') return { completed: false, correct: 0 }
  const saved = localStorage.getItem('dailyChallenge')
  if (saved) {
    const data = JSON.parse(saved)
    if (data.date === todayKey) {
      return { completed: data.completed, correct: data.correct || 0 }
    }
  }
  return { completed: false, correct: 0 }
}

// Helper to generate questions
function generateQuestions(todayKey: string) {
  const seed = todayKey.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  const shuffled = [...CHALLENGE_QUESTIONS].sort(() => (seed % 2) - 0.5)
  return shuffled.slice(0, 5)
}

export default function DailyChallenge() {
  const { progress, addPoints } = useSchool()
  const { playCorrect, playWrong, playAchievement } = useSound()
  
  const [todayKey] = useState(() => new Date().toDateString())
  const [questions] = useState<ChallengeQuestion[]>(() => generateQuestions(todayKey))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correct, setCorrect] = useState(() => getSavedState(todayKey).correct)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [completed, setCompleted] = useState(() => getSavedState(todayKey).completed)
  const [streak, setStreak] = useState(0)

  const calculateBonus = useCallback(() => {
    const accuracy = (correct / questions.length) * 100
    let bonus = correct * 10
    if (accuracy === 100) bonus += 50 // Perfect bonus
    if (accuracy >= 80) bonus += 30 // Great bonus
    return bonus
  }, [correct, questions.length])

  const handleAnswer = (option: string) => {
    if (selected || completed) return
    
    const question = questions[currentIndex]
    setSelected(option)
    
    if (option === question.answer) {
      playCorrect()
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
    } else {
      playWrong()
      setStreak(0)
    }
    
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1)
        setSelected(null)
      } else {
        // Challenge complete
        setShowResult(true)
        setCompleted(true)
        const bonus = calculateBonus()
        addPoints(bonus)
        playAchievement()
        
        // Save state
        localStorage.setItem('dailyChallenge', JSON.stringify({
          date: todayKey,
          completed: true,
          correct: correct + (option === question.answer ? 1 : 0)
        }))
      }
    }, 800)
  }

  const getTimeUntilReset = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const diff = tomorrow.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}ч ${minutes}мин`
  }

  if (completed && !showResult) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 
        border-2 border-amber-400/30 backdrop-blur-sm">
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Сегодняшний челлендж выполнен! ✅</h2>
          <p className="text-white/60 text-sm mb-4">Правильных ответов: {correct}/{questions.length}</p>
          
          <div className="p-4 rounded-2xl bg-white/10 mb-4">
            <div className="flex items-center justify-center gap-2 text-amber-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Следующий челлендж через:</span>
            </div>
            <div className="text-2xl font-bold text-white mt-1">{getTimeUntilReset()}</div>
          </div>
          
          <div className="text-sm text-white/50">
            Возвращайся завтра за новыми заданиями! 🎯
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    const accuracy = Math.round((correct / questions.length) * 100)
    const bonus = calculateBonus()
    
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 
        border-2 border-amber-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
            <Gift className="w-10 h-10 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {accuracy === 100 ? 'Идеально! 🌟' : accuracy >= 80 ? 'Отлично! 🎉' : 'Хорошо! 👍'}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-green-400">{correct}/{questions.length}</div>
            <div className="text-sm text-white/60">Правильно</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-yellow-400">+{bonus}</div>
            <div className="text-sm text-white/60">Бонус</div>
          </div>
        </div>

        {accuracy === 100 && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 
            border border-yellow-400/30 mb-4 text-center">
            <Sparkles className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-yellow-400 font-bold">Идеальный результат! +50 бонус</div>
          </div>
        )}

        <div className="text-center text-white/50 text-sm">
          Возвращайся завтра за новым челленджем!
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 
      border-2 border-amber-400/30 backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gift className="w-6 h-6 text-amber-400" />
          <span className="font-bold text-amber-300">Ежедневный челлендж</span>
        </div>
        <div className="text-sm text-white/60">
          {currentIndex + 1}/{questions.length}
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {questions.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 flex-1 rounded-full ${
              i < currentIndex ? 'bg-green-500' :
              i === currentIndex ? 'bg-amber-500' :
              'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Streak indicator */}
      {streak >= 2 && (
        <div className="flex items-center justify-center gap-1 text-orange-400 text-sm mb-4 animate-pulse">
          <Flame className="w-4 h-4" />
          Серия: {streak}
        </div>
      )}

      {/* Question */}
      {currentQuestion && (
        <>
          <h3 className="text-xl font-bold text-white mb-6 text-center">{currentQuestion.q}</h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selected === option
              const isCorrect = option === currentQuestion.answer
              const showCorrect = selected && isCorrect
              const showWrong = isSelected && !isCorrect
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selected}
                  className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center gap-3
                    ${showCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                      showWrong ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white' :
                      isSelected ? 'bg-amber-500/30 text-white' :
                      'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showCorrect && <CheckCircle className="w-5 h-5 ml-auto" />}
                  {showWrong && <XCircle className="w-5 h-5 ml-auto" />}
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* Hint */}
      <div className="mt-4 text-center text-xs text-white/40">
        Выполни челлендж и получи бонусные очки! 🎁
      </div>
    </div>
  )
}
