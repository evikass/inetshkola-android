'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { ArrowRightLeft, Trophy, Clock, Star, Zap, RotateCcw } from 'lucide-react'

interface WordPair {
  word: string
  synonym: string
  antonym: string
}

const wordPairs: WordPair[] = [
  { word: 'большой', synonym: 'огромный', antonym: 'маленький' },
  { word: 'быстрый', synonym: 'стремительный', antonym: 'медленный' },
  { word: 'весёлый', synonym: 'радостный', antonym: 'грустный' },
  { word: 'умный', synonym: 'мудрый', antonym: 'глупый' },
  { word: 'красивый', synonym: 'прекрасный', antonym: 'уродливый' },
  { word: 'сильный', synonym: 'мощный', antonym: 'слабый' },
  { word: 'добрый', synonym: 'хороший', antonym: 'злой' },
  { word: 'горячий', synonym: 'жаркий', antonym: 'холодный' },
  { word: 'лёгкий', synonym: 'простой', antonym: 'тяжёлый' },
  { word: 'чистый', synonym: 'опрятный', antonym: 'грязный' },
  { word: 'старый', synonym: 'древний', antonym: 'новый' },
  { word: 'богатый', synonym: 'состоятельный', antonym: 'бедный' },
  { word: 'смелый', synonym: 'храбрый', antonym: 'трусливый' },
  { word: 'громкий', synonym: 'звонкий', antonym: 'тихий' },
  { word: 'тёмный', synonym: 'мрачный', antonym: 'светлый' },
  { word: 'узкий', synonym: 'тонкий', antonym: 'широкий' },
  { word: 'высокий', synonym: 'возвышенный', antonym: 'низкий' },
  { word: 'твёрдый', synonym: 'прочный', antonym: 'мягкий' },
  { word: 'сухой', synonym: 'иссушенный', antonym: 'мокрый' },
  { word: 'далёкий', synonym: 'отдалённый', antonym: 'близкий' },
  { word: 'ранний', synonym: 'преждевременный', antonym: 'поздний' },
  { word: 'правда', synonym: 'истина', antonym: 'ложь' },
  { word: 'друг', synonym: 'товарищ', antonym: 'враг' },
  { word: 'радость', synonym: 'счастье', antonym: 'горе' },
  { word: 'начало', synonym: 'зарождение', antonym: 'конец' },
  { word: 'победа', synonym: 'успех', antonym: 'поражение' },
  { word: 'мир', synonym: 'спокойствие', antonym: 'война' },
  { word: 'работа', synonym: 'труд', antonym: 'отдых' },
  { word: 'любовь', synonym: 'привязанность', antonym: 'ненависть' },
  { word: 'зима', synonym: 'стужа', antonym: 'лето' },
]

type GameMode = 'synonym' | 'antonym' | 'mixed'
type Difficulty = 'easy' | 'medium' | 'hard'

export default function SynonymAntonym() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [mode, setMode] = useState<GameMode>('mixed')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentPair, setCurrentPair] = useState<WordPair | null>(null)
  const [currentType, setCurrentType] = useState<'synonym' | 'antonym'>('synonym')
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const getTimeLimit = useCallback((diff: Difficulty) => {
    return diff === 'easy' ? 15 : diff === 'medium' ? 10 : 7
  }, [])

  const getOptionCount = useCallback((diff: Difficulty) => {
    return diff === 'easy' ? 3 : diff === 'medium' ? 4 : 5
  }, [])

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const generateQuestion = useCallback((usedPairs: Set<number>) => {
    const availablePairs = wordPairs.filter((_, index) => !usedPairs.has(index))
    if (availablePairs.length === 0) return null
    
    const pair = availablePairs[Math.floor(Math.random() * availablePairs.length)]
    const type: 'synonym' | 'antonym' = mode === 'mixed' 
      ? (Math.random() > 0.5 ? 'synonym' : 'antonym') 
      : mode
    
    const correctAnswer = type === 'synonym' ? pair.synonym : pair.antonym
    const wrongAnswers = wordPairs
      .filter(p => p.word !== pair.word)
      .map(p => type === 'synonym' ? p.synonym : p.antonym)
      .filter(a => a !== correctAnswer)
    
    const shuffledWrong = shuffleArray(wrongAnswers).slice(0, getOptionCount(difficulty) - 1)
    const allOptions = shuffleArray([correctAnswer, ...shuffledWrong])
    
    setCurrentPair(pair)
    setCurrentType(type)
    setOptions(allOptions)
  }, [mode, difficulty, getOptionCount])

  const startGame = useCallback((gameMode: GameMode, diff: Difficulty) => {
    setMode(gameMode)
    setDifficulty(diff)
    setScore(0)
    setQuestion(1)
    setCorrectAnswers(0)
    setStreak(0)
    setTimeLeft(getTimeLimit(diff))
    setGameState('playing')
    generateQuestion(new Set())
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
      generateQuestion(new Set())
      setTimeLeft(getTimeLimit(difficulty))
    }
  }, [question, difficulty, generateQuestion, getTimeLimit])

  const handleAnswer = (answer: string) => {
    if (showFeedback || !currentPair) return
    
    setSelectedAnswer(answer)
    const correctAnswer = currentType === 'synonym' ? currentPair.synonym : currentPair.antonym
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
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 border border-purple-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📚</div>
          <h2 className="text-2xl font-bold text-purple-300">Синонимы и антонимы</h2>
          <p className="text-purple-200/70 text-sm mt-1">Найди правильное слово</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-purple-200/70 text-sm text-center">Режим игры:</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setMode('synonym')} className={`p-3 rounded-xl transition-all ${mode === 'synonym' ? 'bg-purple-500/40 border-purple-300' : 'bg-white/10'} border border-purple-400/30`}>
                <div className="text-lg">≈</div>
                <div className="text-xs text-purple-200">Синонимы</div>
              </button>
              <button onClick={() => setMode('antonym')} className={`p-3 rounded-xl transition-all ${mode === 'antonym' ? 'bg-pink-500/40 border-pink-300' : 'bg-white/10'} border border-pink-400/30`}>
                <div className="text-lg">≠</div>
                <div className="text-xs text-pink-200">Антонимы</div>
              </button>
              <button onClick={() => setMode('mixed')} className={`p-3 rounded-xl transition-all ${mode === 'mixed' ? 'bg-violet-500/40 border-violet-300' : 'bg-white/10'} border border-violet-400/30`}>
                <div className="text-lg">?</div>
                <div className="text-xs text-violet-200">Смешанно</div>
              </button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <button onClick={() => startGame(mode, 'easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
              <div className="font-bold text-green-300">🟢 Легко</div>
              <div className="text-xs text-green-200/70">3 варианта, 15 секунд</div>
            </button>
            <button onClick={() => startGame(mode, 'medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
              <div className="font-bold text-yellow-300">🟡 Средне</div>
              <div className="text-xs text-yellow-200/70">4 варианта, 10 секунд</div>
            </button>
            <button onClick={() => startGame(mode, 'hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
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
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 border border-purple-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-purple-300 mb-2">Игра завершена!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/{questionCount}</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <ArrowRightLeft className="w-8 h-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-purple-500/30 hover:bg-purple-500/40 rounded-xl text-purple-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  const correctAnswer = currentPair ? (currentType === 'synonym' ? currentPair.synonym : currentPair.antonym) : ''

  return (
    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 border border-purple-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-purple-300 font-bold">{question}/{questionCount}</span>
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
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
          style={{ width: `${(question / questionCount) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <div className={`inline-block px-4 py-1 rounded-full text-sm mb-4 ${
          currentType === 'synonym' 
            ? 'bg-purple-500/30 text-purple-300' 
            : 'bg-pink-500/30 text-pink-300'
        }`}>
          {currentType === 'synonym' ? '≈ Синоним' : '≠ Антоним'}
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-2xl font-bold text-white">{currentPair?.word}</span>
          <span className="text-2xl">{currentType === 'synonym' ? '≈' : '≠'}</span>
          <span className="text-2xl font-bold text-purple-300">?</span>
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
        className="w-full mt-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 flex items-center justify-center gap-2 transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        Пропустить
      </button>
    </div>
  )
}
