'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import useSound from '@/hooks/useSound'
import { Ruler, Weight, Clock, Thermometer, Droplets, Zap, RotateCcw, Trophy } from 'lucide-react'

interface Question {
  type: 'length' | 'weight' | 'time' | 'temperature' | 'volume' | 'speed'
  question: string
  correctAnswer: number
  unit: string
  options: number[]
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const QUESTIONS: Question[] = [
  // Лёгкий уровень - длина
  { type: 'length', question: 'Сколько сантиметров в 1 метре?', correctAnswer: 100, unit: 'см', options: [10, 100, 1000, 10000], explanation: 'В 1 метре 100 сантиметров', difficulty: 'easy' },
  { type: 'length', question: 'Сколько миллиметров в 1 сантиметре?', correctAnswer: 10, unit: 'мм', options: [1, 10, 100, 1000], explanation: 'В 1 сантиметре 10 миллиметров', difficulty: 'easy' },
  { type: 'length', question: 'Сколько метров в 1 километре?', correctAnswer: 1000, unit: 'м', options: [10, 100, 1000, 10000], explanation: 'В 1 километре 1000 метров', difficulty: 'easy' },
  // Лёгкий уровень - вес
  { type: 'weight', question: 'Сколько граммов в 1 килограмме?', correctAnswer: 1000, unit: 'г', options: [10, 100, 1000, 10000], explanation: 'В 1 килограмме 1000 граммов', difficulty: 'easy' },
  { type: 'weight', question: 'Сколько килограммов в 1 тонне?', correctAnswer: 1000, unit: 'кг', options: [10, 100, 1000, 10000], explanation: 'В 1 тонне 1000 килограммов', difficulty: 'easy' },
  { type: 'weight', question: 'Что тяжелее: 1 кг ваты или 1 кг железа?', correctAnswer: 1, unit: '', options: [0, 1, 2, 3], explanation: 'Одинаково! И ваты, и железа по 1 кг', difficulty: 'easy' },
  // Лёгкий уровень - время
  { type: 'time', question: 'Сколько секунд в 1 минуте?', correctAnswer: 60, unit: 'сек', options: [10, 30, 60, 100], explanation: 'В 1 минуте 60 секунд', difficulty: 'easy' },
  { type: 'time', question: 'Сколько минут в 1 часе?', correctAnswer: 60, unit: 'мин', options: [10, 30, 60, 100], explanation: 'В 1 часе 60 минут', difficulty: 'easy' },
  { type: 'time', question: 'Сколько часов в 1 сутках?', correctAnswer: 24, unit: 'ч', options: [12, 24, 48, 100], explanation: 'В 1 сутках 24 часа', difficulty: 'easy' },
  // Средний уровень - длина
  { type: 'length', question: 'Переведите 2.5 м в сантиметры:', correctAnswer: 250, unit: 'см', options: [25, 250, 2500, 25000], explanation: '2.5 м × 100 = 250 см', difficulty: 'medium' },
  { type: 'length', question: 'Переведите 3500 мм в метры:', correctAnswer: 3.5, unit: 'м', options: [0.35, 3.5, 35, 350], explanation: '3500 мм ÷ 1000 = 3.5 м', difficulty: 'medium' },
  { type: 'length', question: 'Переведите 0.5 км в метры:', correctAnswer: 500, unit: 'м', options: [5, 50, 500, 5000], explanation: '0.5 км × 1000 = 500 м', difficulty: 'medium' },
  // Средний уровень - вес
  { type: 'weight', question: 'Переведите 2.3 кг в граммы:', correctAnswer: 2300, unit: 'г', options: [23, 230, 2300, 23000], explanation: '2.3 кг × 1000 = 2300 г', difficulty: 'medium' },
  { type: 'weight', question: 'Переведите 5000 г в килограммы:', correctAnswer: 5, unit: 'кг', options: [0.5, 5, 50, 500], explanation: '5000 г ÷ 1000 = 5 кг', difficulty: 'medium' },
  { type: 'weight', question: 'Сколько граммов в 0.5 кг?', correctAnswer: 500, unit: 'г', options: [5, 50, 500, 5000], explanation: '0.5 кг × 1000 = 500 г', difficulty: 'medium' },
  // Средний уровень - время
  { type: 'time', question: 'Сколько секунд в 5 минутах?', correctAnswer: 300, unit: 'сек', options: [30, 300, 3000, 500], explanation: '5 × 60 = 300 секунд', difficulty: 'medium' },
  { type: 'time', question: 'Сколько минут в 3 часах?', correctAnswer: 180, unit: 'мин', options: [30, 60, 180, 300], explanation: '3 × 60 = 180 минут', difficulty: 'medium' },
  { type: 'time', question: 'Сколько часов в 2 сутках?', correctAnswer: 48, unit: 'ч', options: [24, 48, 72, 96], explanation: '2 × 24 = 48 часов', difficulty: 'medium' },
  // Средний уровень - температура
  { type: 'temperature', question: 'При какой температуре вода замерзает?', correctAnswer: 0, unit: '°C', options: [-10, 0, 10, 100], explanation: 'Вода замерзает при 0°C', difficulty: 'medium' },
  { type: 'temperature', question: 'При какой температуре вода кипит?', correctAnswer: 100, unit: '°C', options: [50, 90, 100, 200], explanation: 'Вода кипит при 100°C (на уровне моря)', difficulty: 'medium' },
  { type: 'temperature', question: 'Нормальная температура тела человека:', correctAnswer: 36.6, unit: '°C', options: [35, 36.6, 37.5, 40], explanation: 'Нормальная температура тела 36.6°C', difficulty: 'medium' },
  // Сложный уровень
  { type: 'length', question: 'Переведите 1 милю в километры (примерно):', correctAnswer: 1.6, unit: 'км', options: [1, 1.6, 2, 2.5], explanation: '1 миля ≈ 1.609 км', difficulty: 'hard' },
  { type: 'length', question: 'Переведите 1 дюйм в сантиметры:', correctAnswer: 2.54, unit: 'см', options: [1, 2.54, 5, 10], explanation: '1 дюйм = 2.54 см', difficulty: 'hard' },
  { type: 'length', question: 'Переведите 1 фут в сантиметры:', correctAnswer: 30.48, unit: 'см', options: [10, 30.48, 50, 100], explanation: '1 фут = 30.48 см (12 дюймов)', difficulty: 'hard' },
  { type: 'volume', question: 'Сколько миллилитров в 1 литре?', correctAnswer: 1000, unit: 'мл', options: [10, 100, 1000, 10000], explanation: 'В 1 литре 1000 миллилитров', difficulty: 'hard' },
  { type: 'volume', question: 'Сколько литров в 1 кубическом метре?', correctAnswer: 1000, unit: 'л', options: [10, 100, 1000, 10000], explanation: 'В 1 м³ содержится 1000 литров', difficulty: 'hard' },
  { type: 'speed', question: 'Переведите 36 км/ч в м/с:', correctAnswer: 10, unit: 'м/с', options: [5, 10, 15, 20], explanation: '36 км/ч ÷ 3.6 = 10 м/с', difficulty: 'hard' },
  { type: 'speed', question: 'Переведите 72 км/ч в м/с:', correctAnswer: 20, unit: 'м/с', options: [10, 15, 20, 25], explanation: '72 км/ч ÷ 3.6 = 20 м/с', difficulty: 'hard' },
  { type: 'time', question: 'Сколько секунд в 1 часе?', correctAnswer: 3600, unit: 'сек', options: [60, 600, 3600, 36000], explanation: '60 минут × 60 секунд = 3600 секунд', difficulty: 'hard' },
  { type: 'time', question: 'Сколько дней в високосном году?', correctAnswer: 366, unit: 'дней', options: [365, 366, 367, 370], explanation: 'В високосном году 366 дней', difficulty: 'hard' },
  { type: 'time', question: 'Сколько секунд в 2.5 часах?', correctAnswer: 9000, unit: 'сек', options: [150, 1500, 9000, 90000], explanation: '2.5 × 3600 = 9000 секунд', difficulty: 'hard' },
]

const TYPE_ICONS = {
  length: Ruler,
  weight: Weight,
  time: Clock,
  temperature: Thermometer,
  volume: Droplets,
  speed: Zap
}

const TYPE_NAMES = {
  length: 'Длина',
  weight: 'Вес',
  time: 'Время',
  temperature: 'Температура',
  volume: 'Объём',
  speed: 'Скорость'
}

export default function MeasurementQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [questionsUsed, setQuestionsUsed] = useState<Set<number>>(new Set())
  const [mode, setMode] = useState<'menu' | 'game'>('menu')

  const getFilteredQuestions = useCallback(() => {
    return QUESTIONS.filter(q => q.difficulty === difficulty)
  }, [difficulty])

  const getNextQuestion = useCallback(() => {
    const filtered = getFilteredQuestions()
    const available = filtered
      .map((q, i) => ({ q, originalIndex: QUESTIONS.indexOf(q) }))
      .filter(item => !questionsUsed.has(item.originalIndex))
    
    if (available.length === 0) {
      setGameOver(true)
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    return available[randomIndex].q
  }, [getFilteredQuestions, questionsUsed])

  useEffect(() => {
    if (mode === 'game' && !currentQuestion && !gameOver) {
      const q = getNextQuestion()
      if (q) setCurrentQuestion(q)
    }
  }, [mode, currentQuestion, gameOver, getNextQuestion])

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    setScore(0)
    setStreak(0)
    setTotalQuestions(0)
    setQuestionsUsed(new Set())
    setGameOver(false)
    setSelectedAnswer(null)
    setShowResult(false)
    setMode('game')
    const filtered = QUESTIONS.filter(q => q.difficulty === diff)
    const randomIndex = Math.floor(Math.random() * filtered.length)
    setCurrentQuestion(filtered[randomIndex])
    setQuestionsUsed(new Set([QUESTIONS.indexOf(filtered[randomIndex])]))
  }

  const handleAnswer = (answer: number) => {
    if (!currentQuestion || showResult) return
    
    setSelectedAnswer(answer)
    setShowResult(true)
    setTotalQuestions(prev => prev + 1)
    
    const isCorrect = answer === currentQuestion.correctAnswer
    
    if (isCorrect) {
      playSound('correct')
      const newStreak = streak + 1
      setStreak(newStreak)
      const bonus = Math.floor(newStreak / 3) * 2
      const xp = 10 + bonus
      setScore(prev => prev + xp)
      addXP(xp)
    } else {
      playSound('wrong')
      setStreak(0)
    }
    
    setTimeout(() => {
      const originalIndex = QUESTIONS.indexOf(currentQuestion)
      const newUsed = new Set(questionsUsed).add(originalIndex)
      setQuestionsUsed(newUsed)
      setSelectedAnswer(null)
      setShowResult(false)
      
      const filtered = QUESTIONS.filter(q => q.difficulty === difficulty)
      const available = filtered.filter(q => !newUsed.has(QUESTIONS.indexOf(q)))
      
      if (available.length === 0) {
        setGameOver(true)
      } else {
        const nextQ = available[Math.floor(Math.random() * available.length)]
        setCurrentQuestion(nextQ)
      }
    }, 2000)
  }

  const resetGame = () => {
    setMode('menu')
    setCurrentQuestion(null)
    setGameOver(false)
  }

  if (mode === 'menu') {
    return (
      <div className="bg-gradient-to-br from-teal-900/50 to-cyan-900/50 rounded-2xl p-6 backdrop-blur-sm border border-teal-500/30">
        <h2 className="text-2xl font-bold text-teal-300 mb-6 flex items-center gap-2">
          <Ruler className="w-7 h-7" />
          Измерения
        </h2>
        
        <p className="text-teal-200 mb-6">
          Проверьте свои знания единиц измерения: длина, вес, время, температура, объём и скорость!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => startGame(diff)}
              className={`p-4 rounded-xl font-bold transition-all hover:scale-105 ${
                diff === 'easy' 
                  ? 'bg-green-500/20 border-green-500/50 hover:bg-green-500/30 text-green-300' 
                  : diff === 'medium'
                    ? 'bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/30 text-yellow-300'
                    : 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30 text-red-300'
              } border`}
            >
              {diff === 'easy' ? 'Легко' : diff === 'medium' ? 'Средне' : 'Сложно'}
              <div className="text-xs opacity-75 mt-1">
                {diff === 'easy' ? 'Основные единицы' : diff === 'medium' ? 'Переводы' : 'Все измерения'}
              </div>
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Object.entries(TYPE_NAMES).map(([key, name]) => {
            const Icon = TYPE_ICONS[key as keyof typeof TYPE_ICONS]
            return (
              <div key={key} className="bg-white/10 rounded-lg p-2 text-center">
                <Icon className="w-5 h-5 mx-auto text-teal-400 mb-1" />
                <div className="text-xs text-teal-200">{name}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="bg-gradient-to-br from-teal-900/50 to-cyan-900/50 rounded-2xl p-6 backdrop-blur-sm border border-teal-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-teal-300 mb-2">Отлично!</h2>
        <p className="text-teal-200 mb-4">
          Результат: {score} XP за {totalQuestions} вопросов
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => startGame(difficulty)}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 rounded-xl font-bold text-white transition-colors"
          >
            Ещё раз
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-teal-200 transition-colors"
          >
            Меню
          </button>
        </div>
      </div>
    )
  }

  if (!currentQuestion) return null

  const TypeIcon = TYPE_ICONS[currentQuestion.type]

  return (
    <div className="bg-gradient-to-br from-teal-900/50 to-cyan-900/50 rounded-2xl p-6 backdrop-blur-sm border border-teal-500/30">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-teal-300">
          <TypeIcon className="w-5 h-5" />
          <span className="text-sm">{TYPE_NAMES[currentQuestion.type]}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-teal-300">Серия: {streak}🔥</span>
          <span className="text-teal-300">Очки: {score}</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-4 mb-6">
        <p className="text-lg text-white text-center">{currentQuestion.question}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option
          const isCorrect = option === currentQuestion.correctAnswer
          
          let buttonClass = 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
          if (showResult) {
            if (isCorrect) {
              buttonClass = 'bg-green-500/30 border-green-400 text-green-300'
            } else if (isSelected && !isCorrect) {
              buttonClass = 'bg-red-500/30 border-red-400 text-red-300'
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
              className={`p-4 rounded-xl font-bold border transition-all ${buttonClass}`}
            >
              {option} {currentQuestion.unit}
            </button>
          )
        })}
      </div>

      {showResult && (
        <div className={`mt-4 p-3 rounded-lg ${
          selectedAnswer === currentQuestion.correctAnswer
            ? 'bg-green-500/20 text-green-300'
            : 'bg-red-500/20 text-red-300'
        }`}>
          {currentQuestion.explanation}
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-teal-400">
          Вопрос {totalQuestions + 1} из {getFilteredQuestions().length}
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Меню
        </button>
      </div>
    </div>
  )
}
