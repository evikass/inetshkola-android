'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Trophy, Star, Zap, RotateCcw } from 'lucide-react'

interface PunctuationQuestion {
  sentence: string
  correct: string
  options: string[]
  explanation: string
  category: string
}

const punctuationQuestions: PunctuationQuestion[] = [
  // Точка
  { sentence: 'Солнце светит ярко___', correct: '.', options: ['.', ',', '!', '?'], explanation: 'В конце повествовательного предложения ставится точка', category: 'Точка' },
  { sentence: 'Дети играли во дворе___', correct: '.', options: ['.', ',', '!', '?'], explanation: 'Это повествовательное предложение', category: 'Точка' },
  { sentence: 'Мама приготовила вкусный обед___', correct: '.', options: ['.', ',', '!', '?'], explanation: 'Простое повествовательное предложение', category: 'Точка' },
  
  // Вопросительный знак
  { sentence: 'Ты пойдёшь в школу___', correct: '?', options: ['.', ',', '!', '?'], explanation: 'Вопросительное предложение требует вопросительного знака', category: 'Вопрос' },
  { sentence: 'Где ты был___', correct: '?', options: ['.', ',', '!', '?'], explanation: 'Предложение с вопросительным словом "где"', category: 'Вопрос' },
  { sentence: 'Что ты делаешь___', correct: '?', options: ['.', ',', '!', '?'], explanation: 'Вопросительное предложение', category: 'Вопрос' },
  { sentence: 'Кто пришёл___', correct: '?', options: ['.', ',', '!', '?'], explanation: 'Вопрос к подлежащему', category: 'Вопрос' },
  
  // Восклицательный знак
  { sentence: 'Какой красивый цветок___', correct: '!', options: ['.', ',', '!', '?'], explanation: 'Восклицательное предложение выражает эмоцию', category: 'Восклицание' },
  { sentence: 'Берегись___', correct: '!', options: ['.', ',', '!', '?'], explanation: 'Побудительное предложение с эмоцией', category: 'Восклицание' },
  { sentence: 'Ура___ Мы победили___', correct: '!', options: ['.', ',', '!', '?'], explanation: 'Междометие и эмоциональное предложение', category: 'Восклицание' },
  { sentence: 'Как здорово___', correct: '!', options: ['.', ',', '!', '?'], explanation: 'Восклицательное предложение', category: 'Восклицание' },
  
  // Запятая при перечислении
  { sentence: 'В саду растут яблони___ груши и сливы.', correct: ',', options: [',', '.', '!', ':'], explanation: 'Запятая разделяет однородные члены при перечислении', category: 'Перечисление' },
  { sentence: 'Мы купили хлеб___ молоко и сыр.', correct: ',', options: [',', '.', '!', ':'], explanation: 'Запятая между однородными дополнениями', category: 'Перечисление' },
  { sentence: 'Ласточки___ стрижи и воробьи — это птицы.', correct: ',', options: [',', '.', '!', ':'], explanation: 'Запятая при перечислении', category: 'Перечисление' },
  { sentence: 'Красный___ синий и жёлтый — основные цвета.', correct: ',', options: [',', '.', '!', ':'], explanation: 'Запятая между прилагательными', category: 'Перечисление' },
  
  // Запятая в сложном предложении
  { sentence: 'Солнце село___ и звёзды засветились.', correct: ',', options: [',', '.', '!', ':'], explanation: 'Запятая перед союзом "и" в сложном предложении', category: 'Сложное предложение' },
  { sentence: 'Дождь закончился___ но земля была мокрой.', correct: ',', options: [',', '.', '!', ':'], explanation: 'Запятая перед противительным союзом "но"', category: 'Сложное предложение' },
  { sentence: 'Я хотел пойти___ но не смог.', correct: ',', options: [',', '.', '!', ':'], explanation: 'Запятая разделяет части сложного предложения', category: 'Сложное предложение' },
  
  // Двоеточие
  { sentence: 'В магазине продают___ хлеб, молоко, сыр.', correct: ':', options: [':', ',', '.', '-'], explanation: 'Двоеточие ставится перед перечислением после обобщающего слова', category: 'Двоеточие' },
  { sentence: 'Я увидел___ кошка спит на диване.', correct: ':', options: [':', ',', '.', '-'], explanation: 'Двоеточие после слов объяснения', category: 'Двоеточие' },
  
  // Тире
  { sentence: 'Москва___ столица России.', correct: '—', options: ['—', ':', ',', '.'], explanation: 'Тире между подлежащим и сказуемым (оба существительные)', category: 'Тире' },
  { sentence: 'Волга___ самая длинная река Европы.', correct: '—', options: ['—', ':', ',', '.'], explanation: 'Тире при нулевой связке', category: 'Тире' },
  
  // Кавычки
  { sentence: 'Я читал книгу ___Война и мир___.', correct: '«»', options: ['«»', '()', '""', '[]'], explanation: 'Названия произведений берутся в кавычки', category: 'Кавычки' },
  { sentence: 'Газета ___Известия___ выходит ежедневно.', correct: '«»', options: ['«»', '()', '""', '[]'], explanation: 'Названия газет и журналов в кавычках', category: 'Кавычки' },
  
  // Сложные случаи
  { sentence: 'Здравствуйте___ как ваши дела?', correct: ',', options: [',', '.', '!', ':'], explanation: 'Запятая после приветствия', category: 'Обращение' },
  { sentence: 'Иван___ подай мне книгу.', correct: ',', options: [',', '.', '!', ':'], explanation: 'Обращение выделяется запятыми', category: 'Обращение' },
  { sentence: 'К сожалению___ мы опоздали.', correct: ',', options: [',', '.', '!', ':'], explanation: 'Вводные слова выделяются запятыми', category: 'Вводные слова' },
]

type Difficulty = 'easy' | 'medium' | 'hard'

export default function PunctuationQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentQuestion, setCurrentQuestion] = useState<PunctuationQuestion | null>(null)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())

  const getQuestions = useCallback((diff: Difficulty) => {
    const categories = diff === 'easy' 
      ? ['Точка', 'Вопрос', 'Восклицание', 'Перечисление']
      : diff === 'medium'
      ? ['Точка', 'Вопрос', 'Восклицание', 'Перечисление', 'Сложное предложение', 'Обращение']
      : ['Точка', 'Вопрос', 'Восклицание', 'Перечисление', 'Сложное предложение', 'Двоеточие', 'Тире', 'Кавычки', 'Обращение', 'Вводные слова']
    
    return punctuationQuestions.filter(q => categories.includes(q.category))
  }, [])

  const generateQuestion = useCallback(() => {
    const available = getQuestions(difficulty).filter((_, index) => !usedQuestions.has(index))
    if (available.length === 0) {
      setUsedQuestions(new Set())
      return
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const q = available[randomIndex]
    const globalIndex = punctuationQuestions.indexOf(q)
    
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
    const isCorrect = answer === currentQuestion.correct
    
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
    }, 2500)
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
      <div className="bg-gradient-to-br from-cyan-500/20 to-sky-500/20 backdrop-blur-sm rounded-3xl p-6 border border-cyan-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">✏️</div>
          <h2 className="text-2xl font-bold text-cyan-300">Знаки препинания</h2>
          <p className="text-cyan-200/70 text-sm mt-1">Выбери правильный знак</p>
        </div>
        
        <div className="grid gap-3 max-w-xs mx-auto">
          <button onClick={() => startGame('easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
            <div className="font-bold text-green-300">🟢 Легко</div>
            <div className="text-xs text-green-200/70">. ? ! и перечисления</div>
          </button>
          <button onClick={() => startGame('medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
            <div className="font-bold text-yellow-300">🟡 Средне</div>
            <div className="text-xs text-yellow-200/70">+ сложные предложения</div>
          </button>
          <button onClick={() => startGame('hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
            <div className="font-bold text-red-300">🔴 Сложно</div>
            <div className="text-xs text-red-200/70">: — «» и все правила</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-cyan-500/20 to-sky-500/20 backdrop-blur-sm rounded-3xl p-6 border border-cyan-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-cyan-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <span className="text-3xl">✏️</span>
              <div className="text-2xl font-bold text-white mt-2">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-cyan-500/30 hover:bg-cyan-500/40 rounded-xl text-cyan-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-cyan-500/20 to-sky-500/20 backdrop-blur-sm rounded-3xl p-6 border border-cyan-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-cyan-300 font-bold">{question}/10</span>
          <span className="text-sky-300 text-sm">{currentQuestion?.category}</span>
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
          className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 transition-all duration-300"
          style={{ width: `${(question / 10) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <p className="text-xl text-white leading-relaxed">
          {currentQuestion?.sentence.split('___')[0]}
          <span className="inline-block w-8 h-8 mx-1 bg-white/20 rounded border-2 border-dashed border-white/40 align-middle" />
          {currentQuestion?.sentence.split('___')[1]}
        </p>
      </div>

      {/* Options */}
      <div className="flex justify-center gap-3 mb-6">
        {currentQuestion?.options.map((option, index) => {
          let bgClass = 'bg-white/10 hover:bg-white/20'
          
          if (showFeedback) {
            if (option === currentQuestion.correct) {
              bgClass = 'bg-green-500/40'
            } else if (option === selectedAnswer && option !== currentQuestion.correct) {
              bgClass = 'bg-red-500/40'
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback !== null}
              className={`w-14 h-14 rounded-xl text-2xl text-white font-bold transition-all ${bgClass}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center py-3 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <span className="text-2xl">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <p className={`font-medium mt-1 ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>
            {showFeedback === 'correct' ? 'Правильно!' : `Правильный ответ: ${currentQuestion?.correct}`}
          </p>
          <p className="text-white/60 text-sm mt-2">{currentQuestion?.explanation}</p>
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
