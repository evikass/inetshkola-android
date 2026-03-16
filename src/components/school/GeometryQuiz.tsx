'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Trophy, Star, Zap, RotateCcw, CircleDot } from 'lucide-react'

interface GeometryQuestion {
  question: string
  answer: string
  options: string[]
  explanation: string
  category: string
  image?: string
}

const geometryQuestions: GeometryQuestion[] = [
  // Фигуры
  { question: 'Сколько сторон у треугольника?', answer: '3', options: ['3', '4', '5', '6'], explanation: 'Треугольник имеет 3 стороны', category: 'Фигуры' },
  { question: 'Сколько сторон у квадрата?', answer: '4', options: ['3', '4', '5', '6'], explanation: 'Квадрат имеет 4 равные стороны', category: 'Фигуры' },
  { question: 'Сколько сторон у пятиугольника?', answer: '5', options: ['4', '5', '6', '7'], explanation: 'Пятиугольник имеет 5 сторон', category: 'Фигуры' },
  { question: 'Сколько сторон у шестиугольника?', answer: '6', options: ['5', '6', '7', '8'], explanation: 'Шестиугольник имеет 6 сторон', category: 'Фигуры' },
  { question: 'Сколько углов у прямоугольника?', answer: '4', options: ['3', '4', '5', '6'], explanation: 'Прямоугольник имеет 4 угла', category: 'Фигуры' },
  { question: 'У какой фигуры все стороны равны?', answer: 'Квадрат', options: ['Прямоугольник', 'Квадрат', 'Треугольник', 'Ромб'], explanation: 'У квадрата все 4 стороны равны', category: 'Фигуры' },
  
  // Углы
  { question: 'Сколько градусов в прямом угле?', answer: '90°', options: ['45°', '90°', '180°', '360°'], explanation: 'Прямой угол равен 90°', category: 'Углы' },
  { question: 'Сколько градусов в развёрнутом угле?', answer: '180°', options: ['90°', '180°', '270°', '360°'], explanation: 'Развёрнутый угол равен 180°', category: 'Углы' },
  { question: 'Угол меньше 90° называется?', answer: 'Острый', options: ['Острый', 'Тупой', 'Прямой', 'Развёрнутый'], explanation: 'Острый угол меньше 90°', category: 'Углы' },
  { question: 'Угол больше 90° называется?', answer: 'Тупой', options: ['Острый', 'Тупой', 'Прямой', 'Развёрнутый'], explanation: 'Тупой угол больше 90°, но меньше 180°', category: 'Углы' },
  { question: 'Сколько градусов в полном угле?', answer: '360°', options: ['180°', '270°', '360°', '90°'], explanation: 'Полный угол равен 360°', category: 'Углы' },
  
  // Периметр
  { question: 'Периметр квадрата со стороной 4?', answer: '16', options: ['8', '12', '16', '20'], explanation: 'P = 4 × 4 = 16', category: 'Периметр' },
  { question: 'Периметр прямоугольника 3×5?', answer: '16', options: ['8', '15', '16', '30'], explanation: 'P = 2 × (3 + 5) = 16', category: 'Периметр' },
  { question: 'Периметр треугольника со сторонами 3, 4, 5?', answer: '12', options: ['12', '60', '6', '15'], explanation: 'P = 3 + 4 + 5 = 12', category: 'Периметр' },
  { question: 'Периметр квадрата со стороной 5?', answer: '20', options: ['10', '15', '20', '25'], explanation: 'P = 4 × 5 = 20', category: 'Периметр' },
  
  // Площадь
  { question: 'Площадь квадрата со стороной 4?', answer: '16', options: ['8', '12', '16', '20'], explanation: 'S = 4 × 4 = 16', category: 'Площадь' },
  { question: 'Площадь прямоугольника 3×5?', answer: '15', options: ['8', '15', '16', '30'], explanation: 'S = 3 × 5 = 15', category: 'Площадь' },
  { question: 'Площадь квадрата со стороной 6?', answer: '36', options: ['12', '24', '36', '42'], explanation: 'S = 6 × 6 = 36', category: 'Площадь' },
  { question: 'Площадь прямоугольника 4×7?', answer: '28', options: ['11', '22', '28', '32'], explanation: 'S = 4 × 7 = 28', category: 'Площадь' },
  
  // Окружность
  { question: 'Отрезок от центра до точки окружности?', answer: 'Радиус', options: ['Диаметр', 'Радиус', 'Хорда', 'Дуга'], explanation: 'Радиус соединяет центр с точкой окружности', category: 'Окружность' },
  { question: 'Отрезок через центр окружности?', answer: 'Диаметр', options: ['Радиус', 'Диаметр', 'Хорда', 'Дуга'], explanation: 'Диаметр проходит через центр', category: 'Окружность' },
  { question: 'Диаметр равен двум...?', answer: 'Радиусам', options: ['Хордам', 'Радиусам', 'Дугам', 'Секторам'], explanation: 'D = 2R', category: 'Окружность' },
  { question: 'Граница круга называется?', answer: 'Окружность', options: ['Круг', 'Окружность', 'Сектор', 'Сегмент'], explanation: 'Окружность — граница круга', category: 'Окружность' },
  
  // Объёмные фигуры
  { question: 'Сколько граней у куба?', answer: '6', options: ['4', '6', '8', '12'], explanation: 'У куба 6 граней', category: 'Объём' },
  { question: 'Сколько рёбер у куба?', answer: '12', options: ['6', '8', '12', '24'], explanation: 'У куба 12 рёбер', category: 'Объём' },
  { question: 'Сколько вершин у куба?', answer: '8', options: ['4', '6', '8', '12'], explanation: 'У куба 8 вершин', category: 'Объём' },
  { question: 'Какая фигура имеет 8 граней?', answer: 'Октаэдр', options: ['Куб', 'Октаэдр', 'Тетраэдр', 'Додекаэдр'], explanation: 'Октаэдр имеет 8 треугольных граней', category: 'Объём' },
  
  // Теоремы
  { question: 'Сумма углов треугольника?', answer: '180°', options: ['90°', '180°', '270°', '360°'], explanation: 'Сумма углов любого треугольника равна 180°', category: 'Теоремы' },
  { question: 'Теорема Пифагора: a² + b² = ?', answer: 'c²', options: ['c', 'c²', '2c', 'c/2'], explanation: 'В прямоугольном треугольнике a² + b² = c²', category: 'Теоремы' },
]

type Difficulty = 'easy' | 'medium' | 'hard'

export default function GeometryQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentQuestion, setCurrentQuestion] = useState<GeometryQuestion | null>(null)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())

  const getQuestions = useCallback((diff: Difficulty) => {
    const categories = diff === 'easy'
      ? ['Фигуры', 'Углы']
      : diff === 'medium'
      ? ['Фигуры', 'Углы', 'Периметр', 'Площадь']
      : ['Фигуры', 'Углы', 'Периметр', 'Площадь', 'Окружность', 'Объём', 'Теоремы']
    
    return geometryQuestions.filter(q => categories.includes(q.category))
  }, [])

  const generateQuestion = useCallback(() => {
    const available = getQuestions(difficulty).filter((_, index) => !usedQuestions.has(index))
    if (available.length === 0) {
      setUsedQuestions(new Set())
      return
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const q = available[randomIndex]
    const globalIndex = geometryQuestions.indexOf(q)
    
    setCurrentQuestion(q)
    setUsedQuestions(prev => new Set(prev).add(globalIndex))
  }, [difficulty, usedQuestions, getQuestions])

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff)
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

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-lime-500/20 to-green-500/20 backdrop-blur-sm rounded-3xl p-6 border border-lime-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📐</div>
          <h2 className="text-2xl font-bold text-lime-300">Геометрия</h2>
          <p className="text-lime-200/70 text-sm mt-1">Фигуры, углы, формулы</p>
        </div>
        
        <div className="grid gap-3 max-w-xs mx-auto">
          <button onClick={() => startGame('easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
            <div className="font-bold text-green-300">🟢 Легко</div>
            <div className="text-xs text-green-200/70">Фигуры и углы</div>
          </button>
          <button onClick={() => startGame('medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
            <div className="font-bold text-yellow-300">🟡 Средне</div>
            <div className="text-xs text-yellow-200/70">+ Периметр и площадь</div>
          </button>
          <button onClick={() => startGame('hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
            <div className="font-bold text-red-300">🔴 Сложно</div>
            <div className="text-xs text-red-200/70">+ Окружности и объём</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-lime-500/20 to-green-500/20 backdrop-blur-sm rounded-3xl p-6 border border-lime-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-lime-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <CircleDot className="w-8 h-8 mx-auto text-lime-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-lime-500/30 hover:bg-lime-500/40 rounded-xl text-lime-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-lime-500/20 to-green-500/20 backdrop-blur-sm rounded-3xl p-6 border border-lime-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-lime-300 font-bold">{question}/10</span>
          <span className="text-green-300 text-sm">{currentQuestion?.category}</span>
        </div>
        {streak > 1 && (
          <span className="text-orange-400 text-sm flex items-center gap-1">
            <Zap className="w-4 h-4" /> {streak}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-lime-400 to-green-400 transition-all duration-300"
          style={{ width: `${(question / 10) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <p className="text-xl text-white font-medium">{currentQuestion?.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {currentQuestion?.options.map((option, index) => {
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
              className={`p-4 rounded-xl text-white text-lg font-medium transition-all ${bgClass}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {showFeedback && currentQuestion && (
        <div className={`text-center py-3 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <span className="text-2xl">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <p className={`font-medium mt-1 ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>
            {showFeedback === 'correct' ? 'Правильно!' : `Ответ: ${currentQuestion.answer}`}
          </p>
          <p className="text-white/60 text-sm mt-1">{currentQuestion.explanation}</p>
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
