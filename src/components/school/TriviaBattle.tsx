'use client'

import { useState, useCallback, useEffect } from 'react'
import { Swords, Trophy, Heart, Zap, RotateCcw, Star, ChevronRight } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Category {
  id: string
  name: string
  emoji: string
  color: string
  questions: Question[]
}

const categories: Category[] = [
  {
    id: 'science',
    name: 'Наука',
    emoji: '🔬',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { question: 'Какая планета ближайшая к Солнцу?', options: ['Венера', 'Меркурий', 'Марс', 'Земля'], correct: 1, explanation: 'Меркурий — ближайшая к Солнцу планета Солнечной системы.' },
      { question: 'Какой газ преобладает в атмосфере Земли?', options: ['Кислород', 'Углекислый газ', 'Азот', 'Водород'], correct: 2, explanation: 'Азот составляет около 78% атмосферы Земли.' },
      { question: 'Сколько костей в теле взрослого человека?', options: ['156', '206', '306', '256'], correct: 1, explanation: 'В теле взрослого человека 206 костей.' },
      { question: 'Какая самая большая молекула в организме человека?', options: ['ДНК', 'Белок', 'Жир', 'Углевод'], correct: 0, explanation: 'ДНК — самая большая молекула в организме человека.' },
      { question: 'Какой химический элемент обозначается символом Fe?', options: ['Фтор', 'Фосфор', 'Железо', 'Фермий'], correct: 2, explanation: 'Fe — символ железа (от латинского Ferrum).' },
    ]
  },
  {
    id: 'history',
    name: 'История',
    emoji: '📜',
    color: 'from-amber-500 to-orange-500',
    questions: [
      { question: 'В каком году началась Великая Отечественная война?', options: ['1939', '1941', '1940', '1942'], correct: 1, explanation: '22 июня 1941 года Германия напала на СССР.' },
      { question: 'Кто был первым космонавтом?', options: ['Нил Армстронг', 'Юрий Гагарин', 'Герман Титов', 'Алексей Леонов'], correct: 1, explanation: 'Юрий Гагарин совершил первый полёт в космос 12 апреля 1961 года.' },
      { question: 'В каком году был основан Санкт-Петербург?', options: ['1700', '1703', '1710', '1715'], correct: 1, explanation: 'Санкт-Петербург был основан 27 мая 1703 года.' },
      { question: 'Кто написал "Войну и мир"?', options: ['Достоевский', 'Тургенев', 'Лев Толстой', 'Пушкин'], correct: 2, explanation: 'Роман "Война и мир" написал Лев Николаевич Толстой.' },
      { question: 'Какое событие произошло в 1812 году?', options: ['Отмена крепостного права', 'Отечественная война', 'Восстание декабристов', 'Крымская война'], correct: 1, explanation: 'В 1812 году произошла Отечественная война с Наполеоном.' },
    ]
  },
  {
    id: 'geography',
    name: 'География',
    emoji: '🌍',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { question: 'Какая страна самая большая по площади?', options: ['Китай', 'США', 'Канада', 'Россия'], correct: 3, explanation: 'Россия — крупнейшая страна мира по площади (17,1 млн км²).' },
      { question: 'Какая самая длинная река в мире?', options: ['Амазонка', 'Нил', 'Миссисипи', 'Янцзы'], correct: 1, explanation: 'Нил — самая длинная река в мире (около 6650 км).' },
      { question: 'Сколько материков на Земле?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'На Земле 7 материков: Евразия, Африка, Северная Америка, Южная Америка, Австралия, Антарктида.' },
      { question: 'Столица Австралии?', options: ['Сидней', 'Мельбурн', 'Канберра', 'Брисбен'], correct: 2, explanation: 'Канберра — столица Австралии.' },
      { question: 'Какое море самое солёное в мире?', options: ['Красное', 'Мёртвое', 'Средиземное', 'Чёрное'], correct: 1, explanation: 'Мёртвое море — самое солёное в мире (около 340 г/л).' },
    ]
  },
  {
    id: 'literature',
    name: 'Литература',
    emoji: '📚',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { question: 'Кто написал "Евгений Онегин"?', options: ['Лермонтов', 'Пушкин', 'Гоголь', 'Тургенев'], correct: 1, explanation: 'Роман в стихах "Евгений Онегин" написал А.С. Пушкин.' },
      { question: 'Кто автор романа "Преступление и наказание"?', options: ['Лев Толстой', 'Достоевский', 'Чехов', 'Тургенев'], correct: 1, explanation: 'Роман написал Фёдор Михайлович Достоевский.' },
      { question: 'Какое произведение написал Булгаков?', options: ['Война и мир', 'Мастер и Маргарита', 'Анна Каренина', 'Отцы и дети'], correct: 1, explanation: '"Мастер и Маргарита" — роман Михаила Булгакова.' },
      { question: 'Кто написал поэму "Руслан и Людмила"?', options: ['Жуковский', 'Пушкин', 'Лермонтов', 'Байрон'], correct: 1, explanation: 'Поэму "Руслан и Людмила" написал А.С. Пушкин.' },
      { question: 'Главный герой романа "Робинзон Крузо"?', options: ['Робинзон Крузо', 'Гулливер', 'Том Сойер', 'Одиссей'], correct: 0, explanation: 'Роман Даниэля Дефо называется "Робинзон Крузо".' },
    ]
  },
  {
    id: 'nature',
    name: 'Природа',
    emoji: '🌿',
    color: 'from-teal-500 to-green-500',
    questions: [
      { question: 'Какое животное самое быстрое на суше?', options: ['Лев', 'Гепард', 'Антилопа', 'Леопард'], correct: 1, explanation: 'Гепард может развивать скорость до 120 км/ч.' },
      { question: 'Сколько ног у паука?', options: ['6', '8', '10', '4'], correct: 1, explanation: 'У пауков 8 ног — это признак класса паукообразных.' },
      { question: 'Какое дерево самое высокое в мире?', options: ['Дуб', 'Секвойя', 'Сосна', 'Эвкалипт'], correct: 1, explanation: 'Секвойя — самое высокое дерево, достигает 115 метров.' },
      { question: 'Какой орган отвечает за очистку крови?', options: ['Сердце', 'Лёгкие', 'Печень', 'Желудок'], correct: 2, explanation: 'Печень фильтрует кровь и удаляет токсины.' },
      { question: 'Какая птица не умеет летать?', options: ['Орёл', 'Пингвин', 'Ласточка', 'Голубь'], correct: 1, explanation: 'Пингвины не умеют летать, но отлично плавают.' },
    ]
  }
]

export default function TriviaBattle() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [streak, setStreak] = useState(0)
  const [gameState, setGameState] = useState<'category' | 'playing' | 'result'>('category')
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

  const startCategory = useCallback((category: Category) => {
    setSelectedCategory(category)
    // Shuffle and pick 5 questions
    const shuffled = [...category.questions].sort(() => Math.random() - 0.5).slice(0, 5)
    setQuestions(shuffled)
    setCurrentQuestionIndex(0)
    setScore(0)
    setLives(3)
    setStreak(0)
    setGameState('playing')
    setSelectedAnswer(null)
    setShowExplanation(false)
  }, [])

  const handleAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null || !questions[currentQuestionIndex]) return
    
    const currentQuestion = questions[currentQuestionIndex]
    setSelectedAnswer(answerIndex)
    
    if (answerIndex === currentQuestion.correct) {
      const baseXP = 10
      const streakBonus = streak >= 2 ? Math.floor(baseXP * 0.2 * (streak - 1)) : 0
      const totalXP = baseXP + streakBonus
      addXP(totalXP)
      playSound?.('success')
      setScore(s => s + totalXP)
      setStreak(streak + 1)
    } else {
      playSound?.('error')
      setLives(lives - 1)
      setStreak(0)
    }
    
    setShowExplanation(true)
  }, [selectedAnswer, currentQuestionIndex, questions, streak, lives, addXP, playSound])

  const nextQuestion = useCallback(() => {
    if (lives <= 0 || currentQuestionIndex >= questions.length - 1) {
      setGameState('result')
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }, [lives, currentQuestionIndex, questions.length])

  const resetGame = useCallback(() => {
    setGameState('category')
    setSelectedCategory(null)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }, [])

  // Check for game over
  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') {
      setTimeout(() => setGameState('result'), 1000)
    }
  }, [lives, gameState])

  if (gameState === 'category') {
    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-2xl p-6 backdrop-blur-sm border border-slate-500/30">
        <h2 className="text-2xl font-bold text-slate-200 mb-2 flex items-center gap-2">
          <Swords className="w-6 h-6 text-red-400" />
          Битва знаний
        </h2>
        <p className="text-slate-300/70 mb-6">Выбери категорию и проверь свои знания!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => startCategory(cat)}
              className={`p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-br ${cat.color}`}
            >
              <div className="text-2xl mb-1">{cat.emoji}</div>
              <div className="font-bold text-white">{cat.name}</div>
              <div className="text-white/70 text-sm">5 вопросов</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    const totalQuestions = questions.length
    const correctAnswers = streak > 0 ? Math.min(streak, score / 10) : Math.floor(score / 10)
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : percentage >= 20 ? 1 : 0

    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-2xl p-6 backdrop-blur-sm border border-slate-500/30">
        <h2 className="text-2xl font-bold text-slate-200 mb-4 flex items-center gap-2 justify-center">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Результаты
        </h2>
        
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`w-10 h-10 inline ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
              />
            ))}
          </div>
          <div className="text-3xl font-bold text-white mb-1">{score} XP</div>
          <div className="text-slate-400">{selectedCategory?.emoji} {selectedCategory?.name}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-300">{Math.floor(score/10)}</div>
            <div className="text-green-400 text-xs">Правильно</div>
          </div>
          <div className="bg-blue-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-blue-300">{percentage}%</div>
            <div className="text-blue-400 text-xs">Точность</div>
          </div>
          <div className="bg-red-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-red-300">{3 - lives}</div>
            <div className="text-red-400 text-xs">Ошибок</div>
          </div>
        </div>
        
        <button
          onClick={resetGame}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Новая битва
        </button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-2xl p-6 backdrop-blur-sm border border-slate-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{selectedCategory?.emoji}</span>
          <span className="text-slate-300 font-medium">{selectedCategory?.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-yellow-300 bg-yellow-500/20 px-3 py-1 rounded-full text-sm font-bold">
            {score} XP
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${i < lives ? 'text-red-400 fill-red-400' : 'text-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
          {streak >= 2 && <span className="text-orange-400">🔥 Серия x{streak}</span>}
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          {currentQuestion?.question}
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {currentQuestion?.options.map((option, index) => {
            let buttonClass = 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 border-slate-600'
            
            if (selectedAnswer !== null) {
              if (index === currentQuestion.correct) {
                buttonClass = 'bg-green-500/30 text-green-300 border-green-500'
              } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correct) {
                buttonClass = 'bg-red-500/30 text-red-300 border-red-500'
              }
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-3 rounded-xl text-left transition-all border-2 ${buttonClass} ${selectedAnswer === null ? 'hover:scale-[1.01]' : ''}`}
              >
                <span className="font-medium">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-4 rounded-xl mb-4 ${selectedAnswer === currentQuestion?.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <p className={`${selectedAnswer === currentQuestion?.correct ? 'text-green-300' : 'text-red-300'}`}>
            {currentQuestion?.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {selectedAnswer !== null && lives > 0 && currentQuestionIndex < questions.length - 1 && (
        <button
          onClick={nextQuestion}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          Следующий вопрос
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
      
      {selectedAnswer !== null && (lives <= 0 || currentQuestionIndex >= questions.length - 1) && (
        <button
          onClick={() => setGameState('result')}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Trophy className="w-5 h-5" />
          Результаты
        </button>
      )}
    </div>
  )
}
