'use client'

import { useState, useCallback } from 'react'
import { Globe, Check, X, Trophy, MapPin, RotateCcw } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface GeoQuestion {
  question: string
  options: string[]
  correct: number
  fact: string
  category: 'countries' | 'capitals' | 'flags' | 'landmarks' | 'nature'
}

const questions: GeoQuestion[] = [
  // Страны
  { question: 'Какая страна самая большая по площади?', options: ['Китай', 'США', 'Россия', 'Канада'], correct: 2, fact: 'Россия занимает 17,1 млн км² — это больше, чем Плутон!', category: 'countries' },
  { question: 'Какая страна самая населённая?', options: ['Индия', 'США', 'Китай', 'Индонезия'], correct: 2, fact: 'Китай — самая населённая страна мира (1,4 млрд человек)', category: 'countries' },
  { question: 'В какой стране находится Амазонка?', options: ['Перу', 'Бразилия', 'Колумбия', 'Венесуэла'], correct: 1, fact: 'Амазонка протекает преимущественно по территории Бразилии', category: 'countries' },
  // Столицы
  { question: 'Столица Франции?', options: ['Лион', 'Марсель', 'Париж', 'Ницца'], correct: 2, fact: 'Париж — город любви и столица Франции', category: 'capitals' },
  { question: 'Столица Японии?', options: ['Осака', 'Киото', 'Токио', 'Нагоя'], correct: 2, fact: 'Токио — самый населённый мегаполис мира', category: 'capitals' },
  { question: 'Столица Австралии?', options: ['Сидней', 'Мельбурн', 'Канберра', 'Брисбен'], correct: 2, fact: 'Канберра специально построена как столица между Сиднеем и Мельбурном', category: 'capitals' },
  { question: 'Столица Египта?', options: ['Александрия', 'Каир', 'Луксор', 'Гиза'], correct: 1, fact: 'Каир — крупнейший город Африки', category: 'capitals' },
  { question: 'Столица Канады?', options: ['Торонто', 'Ванкувер', 'Оттава', 'Монреаль'], correct: 2, fact: 'Оттава выбрана столицей как компромисс между англо- и франкоговорящими', category: 'capitals' },
  // Природа
  { question: 'Какая гора самая высокая?', options: ['Килиманджаро', 'Эверест', 'Эльбрус', 'Мак-Кинли'], correct: 1, fact: 'Эверест — 8848 метров над уровнем моря', category: 'nature' },
  { question: 'Самое глубокое озеро в мире?', options: ['Каспийское море', 'Байкал', 'Виктория', 'Танганьика'], correct: 1, fact: 'Байкал — глубина 1642 метра, содержит 20% мировой пресной воды', category: 'nature' },
  { question: 'Самая длинная река?', options: ['Амазонка', 'Нил', 'Миссисипи', 'Янцзы'], correct: 1, fact: 'Нил — около 6650 км длиной', category: 'nature' },
  { question: 'Самый большой океан?', options: ['Атлантический', 'Индийский', 'Тихий', 'Северный Ледовитый'], correct: 2, fact: 'Тихий океан занимает треть поверхности Земли', category: 'nature' },
  // Достопримечательности
  { question: 'Где находится Тадж-Махал?', options: ['Пакистан', 'Индия', 'Бангладеш', 'Непал'], correct: 1, fact: 'Тадж-Махал находится в Агре, Индия', category: 'landmarks' },
  { question: 'Где находятся пирамиды Гизы?', options: ['Ирак', 'Иран', 'Египет', 'Судан'], correct: 2, fact: 'Пирамиды Гизы — одно из семи чудес света', category: 'landmarks' },
  { question: 'В каком городе находится Колизей?', options: ['Афины', 'Рим', 'Милан', 'Флоренция'], correct: 1, fact: 'Колизей в Риме вмещал до 50 000 зрителей', category: 'landmarks' },
  { question: 'Где находится Великая Китайская стена?', options: ['Монголия', 'Китай', 'Корея', 'Япония'], correct: 1, fact: 'Стена длиной более 21 000 км', category: 'landmarks' },
]

const categoryNames: Record<string, string> = {
  countries: 'Страны',
  capitals: 'Столицы',
  nature: 'Природа',
  landmarks: 'Достопримечательности',
  flags: 'Флаги'
}

export default function GeographyQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<GeoQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())

  const getNextQuestion = useCallback(() => {
    const available = questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => selectedCategory ? q.category === selectedCategory : true)
      .filter(q => !usedQuestions.has(q.index))
    
    if (available.length === 0) {
      setUsedQuestions(new Set())
      const allQuestions = questions.filter(q => selectedCategory ? q.category === selectedCategory : true)
      return allQuestions[Math.floor(Math.random() * allQuestions.length)]
    }
    
    const chosen = available[Math.floor(Math.random() * available.length)]
    setUsedQuestions(prev => new Set([...prev, chosen.index]))
    return chosen
  }, [selectedCategory, usedQuestions])

  const startGame = useCallback((category: string | null) => {
    setSelectedCategory(category)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setLives(3)
    setUsedQuestions(new Set())
    setGameState('playing')
    setSelectedAnswer(null)
  }, [])

  const handleAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null || !currentQuestion) return
    
    setSelectedAnswer(answerIndex)
    
    if (answerIndex === currentQuestion.correct) {
      addXP(10)
      playSound?.('success')
      setScore(s => s + 10)
      setCorrect(c => c + 1)
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      setLives(l => l - 1)
    }
  }, [selectedAnswer, currentQuestion, addXP, playSound])

  const nextQuestion = useCallback(() => {
    if (lives <= 0) {
      setGameState('finished')
      return
    }
    const next = getNextQuestion()
    setCurrentQuestion(next)
    setSelectedAnswer(null)
  }, [lives, getNextQuestion])

  // Initialize first question
  useState(() => {
    if (gameState === 'playing' && !currentQuestion) {
      setCurrentQuestion(getNextQuestion())
    }
  })

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-emerald-900/90 to-teal-900/90 rounded-2xl p-6 backdrop-blur-sm border border-emerald-500/30">
        <h2 className="text-2xl font-bold text-emerald-200 mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6" />
          География
        </h2>
        <p className="text-emerald-100/80 mb-6">
          Проверь свои знания о мире! Выбери категорию или играй во все:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => startGame(null)}
            className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-r from-emerald-500/30 to-teal-500/30 hover:from-emerald-500/40 hover:to-teal-500/40 text-emerald-200"
          >
            <div className="font-bold flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Все категории
            </div>
            <div className="text-sm opacity-70">{questions.length} вопросов</div>
          </button>
          {Object.entries(categoryNames).map(([key, name]) => (
            <button
              key={key}
              onClick={() => startGame(key)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-emerald-800/50 hover:bg-emerald-700/50 text-emerald-200"
            >
              <div className="font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {name}
              </div>
              <div className="text-sm opacity-70">
                {questions.filter(q => q.category === key).length} вопросов
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    return (
      <div className="bg-gradient-to-br from-emerald-900/90 to-teal-900/90 rounded-2xl p-6 backdrop-blur-sm border border-emerald-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-emerald-200 mb-2">Игра окончена!</h2>
        <p className="text-3xl font-bold text-white mb-4">{score} XP</p>
        
        <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
          <div className="bg-green-500/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-green-300">{correct}</div>
            <div className="text-green-400 text-sm">Правильно</div>
          </div>
          <div className="bg-red-500/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-red-300">{wrong}</div>
            <div className="text-red-400 text-sm">Ошибок</div>
          </div>
        </div>
        
        <button
          onClick={() => setGameState('setup')}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  if (!currentQuestion) {
    // Initialize question
    setCurrentQuestion(getNextQuestion())
    return null
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900/90 to-teal-900/90 rounded-2xl p-6 backdrop-blur-sm border border-emerald-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-200 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          География
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-emerald-300 text-sm">{categoryNames[currentQuestion.category] || 'Все'}</span>
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">{score} XP</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={i < lives ? 'text-red-400' : 'text-gray-600'}>❤️</span>
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          {currentQuestion.question}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = 'bg-emerald-800/50 hover:bg-emerald-700/50 text-emerald-200 border-emerald-600'
            
            if (selectedAnswer !== null) {
              if (index === currentQuestion.correct) {
                buttonClass = 'bg-green-500/30 text-green-300 border-green-500'
              } else if (index === selectedAnswer) {
                buttonClass = 'bg-red-500/30 text-red-300 border-red-500'
              }
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-3 rounded-xl text-left transition-all border-2 ${buttonClass}`}
              >
                <span className="font-medium">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Fact */}
      {selectedAnswer !== null && (
        <div className={`p-4 rounded-xl mb-4 ${selectedAnswer === currentQuestion.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <p className="text-emerald-100 text-sm">
            💡 {currentQuestion.fact}
          </p>
        </div>
      )}

      {/* Next button */}
      {selectedAnswer !== null && lives > 0 && (
        <button
          onClick={nextQuestion}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl transition-all"
        >
          Следующий вопрос
        </button>
      )}
      
      {selectedAnswer !== null && lives <= 0 && (
        <button
          onClick={() => setGameState('finished')}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl transition-all"
        >
          Результаты
        </button>
      )}
    </div>
  )
}
