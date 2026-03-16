'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Building2, Trophy, Star, Zap, RotateCcw, Globe } from 'lucide-react'

interface CapitalCity {
  country: string
  capital: string
  continent: string
  flag: string
}

const capitalCities: CapitalCity[] = [
  // Европа
  { country: 'Россия', capital: 'Москва', continent: 'Европа', flag: '🇷🇺' },
  { country: 'Франция', capital: 'Париж', continent: 'Европа', flag: '🇫🇷' },
  { country: 'Германия', capital: 'Берлин', continent: 'Европа', flag: '🇩🇪' },
  { country: 'Великобритания', capital: 'Лондон', continent: 'Европа', flag: '🇬🇧' },
  { country: 'Италия', capital: 'Рим', continent: 'Европа', flag: '🇮🇹' },
  { country: 'Испания', capital: 'Мадрид', continent: 'Европа', flag: '🇪🇸' },
  { country: 'Польша', capital: 'Варшава', continent: 'Европа', flag: '🇵🇱' },
  { country: 'Украина', capital: 'Киев', continent: 'Европа', flag: '🇺🇦' },
  { country: 'Греция', capital: 'Афины', continent: 'Европа', flag: '🇬🇷' },
  { country: 'Швеция', capital: 'Стокгольм', continent: 'Европа', flag: '🇸🇪' },
  { country: 'Нидерланды', capital: 'Амстердам', continent: 'Европа', flag: '🇳🇱' },
  { country: 'Бельгия', capital: 'Брюссель', continent: 'Европа', flag: '🇧🇪' },
  { country: 'Австрия', capital: 'Вена', continent: 'Европа', flag: '🇦🇹' },
  { country: 'Швейцария', capital: 'Берн', continent: 'Европа', flag: '🇨🇭' },
  { country: 'Чехия', capital: 'Прага', continent: 'Европа', flag: '🇨🇿' },
  { country: 'Венгрия', capital: 'Будапешт', continent: 'Европа', flag: '🇭🇺' },
  { country: 'Норвегия', capital: 'Осло', continent: 'Европа', flag: '🇳🇴' },
  { country: 'Дания', capital: 'Копенгаген', continent: 'Европа', flag: '🇩🇰' },
  { country: 'Финляндия', capital: 'Хельсинки', continent: 'Европа', flag: '🇫🇮' },
  { country: 'Португалия', capital: 'Лиссабон', continent: 'Европа', flag: '🇵🇹' },
  
  // Азия
  { country: 'Китай', capital: 'Пекин', continent: 'Азия', flag: '🇨🇳' },
  { country: 'Япония', capital: 'Токио', continent: 'Азия', flag: '🇯🇵' },
  { country: 'Индия', capital: 'Нью-Дели', continent: 'Азия', flag: '🇮🇳' },
  { country: 'Южная Корея', capital: 'Сеул', continent: 'Азия', flag: '🇰🇷' },
  { country: 'Турция', capital: 'Анкара', continent: 'Азия', flag: '🇹🇷' },
  { country: 'Таиланд', capital: 'Бангкок', continent: 'Азия', flag: '🇹🇭' },
  { country: 'Вьетнам', capital: 'Ханой', continent: 'Азия', flag: '🇻🇳' },
  { country: 'Индонезия', capital: 'Джакарта', continent: 'Азия', flag: '🇮🇩' },
  { country: 'Филиппины', capital: 'Манила', continent: 'Азия', flag: '🇵🇭' },
  { country: 'Малайзия', capital: 'Куала-Лумпур', continent: 'Азия', flag: '🇲🇾' },
  { country: 'Сингапур', capital: 'Сингапур', continent: 'Азия', flag: '🇸🇬' },
  { country: 'Казахстан', capital: 'Астана', continent: 'Азия', flag: '🇰🇿' },
  
  // Северная Америка
  { country: 'США', capital: 'Вашингтон', continent: 'Северная Америка', flag: '🇺🇸' },
  { country: 'Канада', capital: 'Оттава', continent: 'Северная Америка', flag: '🇨🇦' },
  { country: 'Мексика', capital: 'Мехико', continent: 'Северная Америка', flag: '🇲🇽' },
  { country: 'Куба', capital: 'Гавана', continent: 'Северная Америка', flag: '🇨🇺' },
  
  // Южная Америка
  { country: 'Бразилия', capital: 'Бразилиа', continent: 'Южная Америка', flag: '🇧🇷' },
  { country: 'Аргентина', capital: 'Буэнос-Айрес', continent: 'Южная Америка', flag: '🇦🇷' },
  { country: 'Чили', capital: 'Сантьяго', continent: 'Южная Америка', flag: '🇨🇱' },
  { country: 'Колумбия', capital: 'Богота', continent: 'Южная Америка', flag: '🇨🇴' },
  { country: 'Перу', capital: 'Лима', continent: 'Южная Америка', flag: '🇵🇪' },
  
  // Африка
  { country: 'Египет', capital: 'Каир', continent: 'Африка', flag: '🇪🇬' },
  { country: 'ЮАР', capital: 'Претория', continent: 'Африка', flag: '🇿🇦' },
  { country: 'Нигерия', capital: 'Абуджа', continent: 'Африка', flag: '🇳🇬' },
  { country: 'Марокко', capital: 'Рабат', continent: 'Африка', flag: '🇲🇦' },
  { country: 'Кения', capital: 'Найроби', continent: 'Африка', flag: '🇰🇪' },
  
  // Океания
  { country: 'Австралия', capital: 'Канберра', continent: 'Океания', flag: '🇦🇺' },
  { country: 'Новая Зеландия', capital: 'Веллингтон', continent: 'Океания', flag: '🇳🇿' },
]

type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionType = 'capital' | 'country'

export default function CapitalCities() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [questionType, setQuestionType] = useState<QuestionType>('capital')
  const [currentCity, setCurrentCity] = useState<CapitalCity | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedCities, setUsedCities] = useState<Set<number>>(new Set())

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const getCities = useCallback((diff: Difficulty) => {
    if (diff === 'easy') {
      return capitalCities.filter(c => ['Европа', 'Северная Америка'].includes(c.continent))
    } else if (diff === 'medium') {
      return capitalCities.filter(c => ['Европа', 'Азия', 'Северная Америка'].includes(c.continent))
    }
    return capitalCities
  }, [])

  const generateQuestion = useCallback(() => {
    const available = getCities(difficulty).filter((_, index) => !usedCities.has(index))
    if (available.length === 0) {
      setUsedCities(new Set())
      return
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const city = available[randomIndex]
    const globalIndex = capitalCities.indexOf(city)
    
    setCurrentCity(city)
    setUsedCities(prev => new Set(prev).add(globalIndex))
    
    // Generate options
    const correctAnswer = questionType === 'capital' ? city.capital : city.country
    const wrongAnswers = capitalCities
      .filter(c => c.country !== city.country)
      .map(c => questionType === 'capital' ? c.capital : c.country)
    
    const optionCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5
    const shuffledWrong = shuffleArray(wrongAnswers).slice(0, optionCount - 1)
    setOptions(shuffleArray([correctAnswer, ...shuffledWrong]))
  }, [difficulty, questionType, usedCities, getCities])

  const startGame = useCallback((diff: Difficulty, type: QuestionType) => {
    setDifficulty(diff)
    setQuestionType(type)
    setScore(0)
    setQuestion(1)
    setCorrectAnswers(0)
    setStreak(0)
    setUsedCities(new Set())
    setGameState('playing')
    generateQuestion()
  }, [generateQuestion])

  const handleAnswer = (answer: string) => {
    if (showFeedback || !currentCity) return
    
    setSelectedAnswer(answer)
    const correctAnswer = questionType === 'capital' ? currentCity.capital : currentCity.country
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
      <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-3xl p-6 border border-emerald-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏛️</div>
          <h2 className="text-2xl font-bold text-emerald-300">Столицы стран</h2>
          <p className="text-emerald-200/70 text-sm mt-1">Угадай столицу или страну</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-emerald-200/70 text-sm text-center">Тип вопроса:</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setQuestionType('capital')} className={`p-3 rounded-xl transition-all ${questionType === 'capital' ? 'bg-emerald-500/40 border-emerald-300' : 'bg-white/10'} border border-emerald-400/30`}>
                <div className="text-lg">🏛️</div>
                <div className="text-xs text-emerald-200">Страна → Столица</div>
              </button>
              <button onClick={() => setQuestionType('country')} className={`p-3 rounded-xl transition-all ${questionType === 'country' ? 'bg-teal-500/40 border-teal-300' : 'bg-white/10'} border border-teal-400/30`}>
                <div className="text-lg">🌍</div>
                <div className="text-xs text-teal-200">Столица → Страна</div>
              </button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <button onClick={() => startGame('easy', questionType)} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
              <div className="font-bold text-green-300">🟢 Легко</div>
              <div className="text-xs text-green-200/70">Европа и Сев. Америка</div>
            </button>
            <button onClick={() => startGame('medium', questionType)} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
              <div className="font-bold text-yellow-300">🟡 Средне</div>
              <div className="text-xs text-yellow-200/70">+ Азия</div>
            </button>
            <button onClick={() => startGame('hard', questionType)} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
              <div className="font-bold text-red-300">🔴 Сложно</div>
              <div className="text-xs text-red-200/70">Весь мир</div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-3xl p-6 border border-emerald-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-emerald-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Building2 className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Globe className="w-8 h-8 mx-auto text-teal-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-emerald-500/30 hover:bg-emerald-500/40 rounded-xl text-emerald-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  const correctAnswer = currentCity ? (questionType === 'capital' ? currentCity.capital : currentCity.country) : ''

  return (
    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-3xl p-6 border border-emerald-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-emerald-300 font-bold">{question}/10</span>
          <span className="text-teal-300 text-sm">{currentCity?.continent}</span>
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
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300"
          style={{ width: `${(question / 10) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-1 rounded-full text-sm mb-4 bg-emerald-500/30 text-emerald-300">
          {questionType === 'capital' ? '🏛️ Какая столица?' : '🌍 Какая страна?'}
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <span className="text-5xl">{currentCity?.flag}</span>
          <span className="text-2xl font-bold text-white">
            {questionType === 'capital' ? currentCity?.country : currentCity?.capital}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-2 mb-4">
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
              className={`p-4 rounded-xl text-white font-medium transition-all ${bgClass}`}
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
