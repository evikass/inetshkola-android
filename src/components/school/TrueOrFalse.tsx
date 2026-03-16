'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { CheckCircle, XCircle, Trophy, RotateCcw, Timer, Zap, Star } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface TrueFalseQuestion {
  statement: string
  isTrue: boolean
  explanation: string
  category: string
}

const questions: TrueFalseQuestion[] = [
  // Наука
  { statement: 'Земля вращается вокруг Солнца', isTrue: true, explanation: 'Земля делает один оборот вокруг Солнца за 365,25 дней', category: 'Наука' },
  { statement: 'Вода кипит при 50 градусах Цельсия', isTrue: false, explanation: 'Вода кипит при 100 градусах Цельсия при нормальном давлении', category: 'Наука' },
  { statement: 'Луна — это звезда', isTrue: false, explanation: 'Луна — это спутник Земли', category: 'Наука' },
  { statement: 'ДНК содержит генетическую информацию', isTrue: true, explanation: 'ДНК — носитель генетической информации всех живых организмов', category: 'Наука' },
  { statement: 'Свет движется быстрее звука', isTrue: true, explanation: 'Скорость света ~300 000 км/с, звука ~340 м/с', category: 'Наука' },
  { statement: 'Рыбы дышат лёгкими', isTrue: false, explanation: 'Рыбы дышат жабрами', category: 'Наука' },
  // География
  { statement: 'Россия — самая большая страна мира', isTrue: true, explanation: 'Площадь России 17,1 млн км²', category: 'География' },
  { statement: 'Нил — самая длинная река мира', isTrue: true, explanation: 'Длина Нила около 6650 км', category: 'География' },
  { statement: 'Австралия — самый большой остров', isTrue: true, explanation: 'Австралия считается островом-материком', category: 'География' },
  { statement: 'Антарктида — самый жаркий материк', isTrue: false, explanation: 'Антарктида — самый холодный материк', category: 'География' },
  { statement: 'Байкал — самое глубокое озеро мира', isTrue: true, explanation: 'Глубина Байкала 1642 метра', category: 'География' },
  // История
  { statement: 'Юрий Гагарин — первый космонавт', isTrue: true, explanation: 'Гагарин полетел в космос 12 апреля 1961 года', category: 'История' },
  { statement: 'Великая Отечественная война началась в 1945 году', isTrue: false, explanation: 'Война началась 22 июня 1941 года', category: 'История' },
  { statement: 'Пушкин написал "Войну и мир"', isTrue: false, explanation: '"Войну и мир" написал Лев Толстой', category: 'История' },
  { statement: 'Петербург был основан в 1703 году', isTrue: true, explanation: 'Петербург основан Петром I 27 мая 1703 года', category: 'История' },
  // Природа
  { statement: 'Киты — это рыбы', isTrue: false, explanation: 'Киты — это млекопитающие', category: 'Природа' },
  { statement: 'Пингвины умеют летать', isTrue: false, explanation: 'Пингвины не умеют летать, но отлично плавают', category: 'Природа' },
  { statement: 'Солнце — это звезда', isTrue: true, explanation: 'Солнце — жёлтый карлик, ближайшая к Земле звезда', category: 'Природа' },
  { statement: 'Дельфины — млекопитающие', isTrue: true, explanation: 'Дельфины дышат лёгкими и кормят детёнышей молоком', category: 'Природа' },
  { statement: 'Кактусы растут в тропическом лесу', isTrue: false, explanation: 'Кактусы растут в пустынях и засушливых местах', category: 'Природа' },
  // Животные
  { statement: 'У паука 8 ног', isTrue: true, explanation: 'Пауки относятся к классу паукообразных, у них 8 ног', category: 'Животные' },
  { statement: 'Гепард — самое быстрое животное', isTrue: true, explanation: 'Гепард разгоняется до 120 км/ч', category: 'Животные' },
  { statement: 'Слоны умеют прыгать', isTrue: false, explanation: 'Слоны — единственные млекопитающие, которые не могут прыгать', category: 'Животные' },
  { statement: 'У змей есть веки', isTrue: false, explanation: 'У змей нет век, их глаза всегда открыты', category: 'Животные' },
]

type GameMode = 'classic' | 'speed' | 'endless'

const modeConfig: Record<GameMode, { time: number; questions: number; xpBase: number }> = {
  classic: { time: 0, questions: 10, xpBase: 8 },
  speed: { time: 30, questions: 15, xpBase: 10 },
  endless: { time: 0, questions: 999, xpBase: 6 }
}

export default function TrueOrFalse() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<TrueFalseQuestion | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'result' | 'finished'>('setup')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const getNextQuestion = useCallback(() => {
    const available = questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => !usedQuestions.has(q.index))
    
    if (available.length === 0) {
      setUsedQuestions(new Set())
      return questions[Math.floor(Math.random() * questions.length)]
    }
    
    const chosen = available[Math.floor(Math.random() * available.length)]
    setUsedQuestions(prev => new Set([...prev, chosen.index]))
    return chosen
  }, [usedQuestions])

  const startGame = useCallback((mode: GameMode) => {
    setGameMode(mode)
    setTimeLeft(modeConfig[mode].time)
    setQuestionIndex(0)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setStreak(0)
    setUsedQuestions(new Set())
    setResult(null)
    setGameState('playing')
    setCurrentQuestion(getNextQuestion())
  }, [getNextQuestion])

  useEffect(() => {
    if (gameMode === 'speed' && gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    } else if (timeLeft === 0 && gameMode === 'speed' && gameState === 'playing') {
      setGameState('finished')
    }
  }, [timeLeft, gameMode, gameState])

  const handleAnswer = useCallback((answer: boolean) => {
    if (!currentQuestion || result) return
    
    const isCorrect = answer === currentQuestion.isTrue
    setResult(isCorrect ? 'correct' : 'wrong')
    
    if (isCorrect) {
      const baseXP = modeConfig[gameMode!].xpBase
      const streakBonus = streak >= 2 ? Math.floor(baseXP * 0.25) : 0
      addXP(baseXP + streakBonus)
      playSound?.('success')
      setScore(s => s + baseXP + streakBonus)
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      setStreak(0)
    }
    
    setTimeout(() => {
      const nextIndex = questionIndex + 1
      if (gameMode !== 'endless' && nextIndex >= modeConfig[gameMode!].questions) {
        setGameState('finished')
      } else {
        setQuestionIndex(nextIndex)
        setCurrentQuestion(getNextQuestion())
        setResult(null)
      }
    }, 1500)
  }, [currentQuestion, result, streak, gameMode, questionIndex, addXP, playSound, getNextQuestion])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-rose-900/90 to-pink-900/90 rounded-2xl p-6 backdrop-blur-sm border border-rose-500/30">
        <h2 className="text-2xl font-bold text-rose-200 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Правда или ложь
        </h2>
        <p className="text-rose-100/80 mb-6">
          Определи, верно ли утверждение! Быстро и точно!
        </p>
        <div className="flex flex-col gap-3">
          {(['classic', 'speed', 'endless'] as GameMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => startGame(mode)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-r from-rose-500/30 to-pink-500/30 hover:from-rose-500/40 hover:to-pink-500/40 text-rose-200"
            >
              <div className="font-bold flex items-center gap-2">
                {mode === 'classic' ? <Star className="w-4 h-4" /> : 
                 mode === 'speed' ? <Timer className="w-4 h-4" /> : 
                 <Zap className="w-4 h-4" />}
                {mode === 'classic' ? 'Классика' : mode === 'speed' ? 'На скорость' : 'Бесконечный'}
              </div>
              <div className="text-sm opacity-70">
                {mode === 'classic' ? '10 вопросов • 8 XP' :
                 mode === 'speed' ? '30 секунд • 10 XP' :
                 'Без ограничений • 6 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const totalAnswered = correct + wrong
    const accuracy = totalAnswered > 0 ? Math.round(correct / totalAnswered * 100) : 0
    
    return (
      <div className="bg-gradient-to-br from-rose-900/90 to-pink-900/90 rounded-2xl p-6 backdrop-blur-sm border border-rose-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-rose-200 mb-2">Игра окончена!</h2>
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
        
        <div className="bg-rose-500/20 rounded-xl p-3 mb-6 max-w-xs mx-auto">
          <div className="text-2xl font-bold text-rose-300">{accuracy}%</div>
          <div className="text-rose-400 text-sm">Точность</div>
        </div>
        
        <button
          onClick={() => setGameState('setup')}
          className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-rose-900/90 to-pink-900/90 rounded-2xl p-6 backdrop-blur-sm border border-rose-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-rose-200 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Правда или ложь
        </h2>
        <div className="flex items-center gap-3">
          {gameMode === 'speed' && (
            <span className="text-rose-200 bg-rose-500/30 px-3 py-1 rounded-full text-sm font-mono">
              {timeLeft}с
            </span>
          )}
          <span className="text-rose-300 text-sm">
            {questionIndex + 1}/{gameMode === 'endless' ? '∞' : modeConfig[gameMode!].questions}
          </span>
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">{score} XP</span>
        </div>
      </div>

      {/* Streak */}
      {streak >= 2 && (
        <div className="text-center mb-2">
          <span className="text-yellow-300 text-sm">🔥 Серия x{streak}</span>
        </div>
      )}

      {/* Category */}
      <div className="text-center mb-4">
        <span className="text-rose-300/70 text-sm">{currentQuestion?.category}</span>
      </div>

      {/* Statement */}
      <div className="text-center mb-6">
        <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          {currentQuestion?.statement}
        </p>
      </div>

      {/* Result */}
      {result && (
        <div className={`text-center mb-4 p-4 rounded-xl ${result === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <p className={`font-bold ${result === 'correct' ? 'text-green-300' : 'text-red-300'} mb-2`}>
            {result === 'correct' ? '✓ Правильно!' : '✗ Неправильно!'}
          </p>
          <p className="text-rose-200 text-sm">{currentQuestion?.explanation}</p>
        </div>
      )}

      {/* Buttons */}
      {!result && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="w-36 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all hover:scale-105 flex flex-col items-center gap-1"
          >
            <CheckCircle className="w-8 h-8" />
            ПРАВДА
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="w-36 py-4 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl transition-all hover:scale-105 flex flex-col items-center gap-1"
          >
            <XCircle className="w-8 h-8" />
            ЛОЖЬ
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 flex justify-center gap-4 text-sm text-rose-300/70">
        <span className="text-green-300">✓ {correct}</span>
        <span className="text-red-300">✗ {wrong}</span>
      </div>
    </div>
  )
}
