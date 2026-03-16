'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Target, Check, X, Trophy, RotateCcw, Timer, Star } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface OddOneQuestion {
  items: string[]
  oddOneIndex: number
  explanation: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const questions: OddOneQuestion[] = [
  // Easy
  { items: ['ЯБЛОКО', 'ГРУША', 'БАНАН', 'МОРКОВЬ'], oddOneIndex: 3, explanation: 'Морковь — овощ, остальные фрукты', category: 'Еда', difficulty: 'easy' },
  { items: ['СОБАКА', 'КОТ', 'КОРОВА', 'ТИГР'], oddOneIndex: 3, explanation: 'Тигр — дикое животное, остальные домашние', category: 'Животные', difficulty: 'easy' },
  { items: ['МАРС', 'ВЕНЕРА', 'ЛУНА', 'ЮПИТЕР'], oddOneIndex: 2, explanation: 'Луна — спутник, остальные планеты', category: 'Космос', difficulty: 'easy' },
  { items: ['КАРАНДАШ', 'РУЧКА', 'ЛИНЕЙКА', 'ХЛЕБ'], oddOneIndex: 3, explanation: 'Хлеб — еда, остальные канцелярия', category: 'Предметы', difficulty: 'easy' },
  { items: ['ЗИМА', 'ВЕСНА', 'ЛЕТО', 'НОЧЬ'], oddOneIndex: 3, explanation: 'Ночь — время суток, остальные времена года', category: 'Время', difficulty: 'easy' },
  { items: ['МОСКВА', 'ПАРИЖ', 'ЛОndon', 'БЕРЛИН'], oddOneIndex: 2, explanation: 'London на английском, остальные города на русском написаны', category: 'Города', difficulty: 'easy' },
  { items: ['КРАСНЫЙ', 'СИНИЙ', 'ЗЕЛЁНЫЙ', 'КВАДРАТ'], oddOneIndex: 3, explanation: 'Квадрат — фигура, остальные цвета', category: 'Цвета/Фигуры', difficulty: 'easy' },
  { items: ['РОССИЯ', 'ФРАНЦИЯ', 'ГЕРМАНИЯ', 'ЕВРОПА'], oddOneIndex: 3, explanation: 'Европа — континент, остальные страны', category: 'География', difficulty: 'easy' },
  // Medium
  { items: ['ВОЛГA', 'ЕНИСЕЙ', 'ЛЕНА', 'БАЙКАЛ'], oddOneIndex: 3, explanation: 'Байкал — озеро, остальные реки', category: 'Водоёмы', difficulty: 'medium' },
  { items: ['ПУШКИН', 'ЛЕРМОНТОВ', 'ТОЛСТОЙ', 'ПИКАССО'], oddOneIndex: 3, explanation: 'Пикассо — художник, остальные писатели', category: 'Культура', difficulty: 'medium' },
  { items: ['КИСЛОРОД', 'АЗОТ', 'УГЛЕРОД', 'ВОДА'], oddOneIndex: 3, explanation: 'Вода — соединение, остальные элементы', category: 'Химия', difficulty: 'medium' },
  { items: ['АЛЕКСАНДР', 'НАПОЛЕОН', 'ЦИЦЕРОН', 'ЦЕЗАРЬ'], oddOneIndex: 2, explanation: 'Цицерон — оратор, остальные полководцы', category: 'История', difficulty: 'medium' },
  { items: ['ГЛАЗ', 'УХО', 'НОС', 'СЕРДЦЕ'], oddOneIndex: 3, explanation: 'Сердце — внутренний орган, остальные органы чувств', category: 'Анатомия', difficulty: 'medium' },
  { items: ['ФУТБОЛ', 'ХОККЕЙ', 'ТЕННИС', 'ШАХМАТЫ'], oddOneIndex: 3, explanation: 'Шахматы — настольная игра, остальные спортивные', category: 'Спорт', difficulty: 'medium' },
  { items: ['МЕРКУРИЙ', 'ВЕНЕРА', 'МАРС', 'ЛУНА'], oddOneIndex: 3, explanation: 'Луна — спутник, остальные планеты', category: 'Космос', difficulty: 'medium' },
  { items: ['ГЕКТАР', 'КИЛОМЕТР', 'МЕТАЛЛ', 'МЕТР'], oddOneIndex: 2, explanation: 'Металл — вещество, остальные единицы измерения', category: 'Единицы', difficulty: 'medium' },
  // Hard
  { items: ['ПИАНИНО', 'СКРИПКА', 'ФЛЕЙТА', 'БАРАБАН'], oddOneIndex: 0, explanation: 'Пианино — клавишный (не струнный/духовой/ударный в классификации)', category: 'Музыка', difficulty: 'hard' },
  { items: ['АВСТРАЛИЯ', 'АНТАРКТИДА', 'АФРИКА', 'АМЕРИКА'], oddOneIndex: 3, explanation: 'Америка — делится на два континента', category: 'География', difficulty: 'hard' },
  { items: ['ДОДЕКАЭДР', 'ИКОСАЭДР', 'ОКТАЭДР', 'КВАДРАТ'], oddOneIndex: 3, explanation: 'Квадрат — 2D фигура, остальные 3D', category: 'Геометрия', difficulty: 'hard' },
  { items: ['ПРОТОН', 'НЕЙТРОН', 'ЭЛЕКТРОН', 'АТОМ'], oddOneIndex: 3, explanation: 'Атом — частица из частиц, остальные элементарные', category: 'Физика', difficulty: 'hard' },
  { items: ['МОНАРХИЯ', 'ДЕМОКРАТИЯ', 'РЕСПУБЛИКА', 'КОНСТИТУЦИЯ'], oddOneIndex: 3, explanation: 'Конституция — документ, остальные формы правления', category: 'Общество', difficulty: 'hard' },
  { items: ['ГЕКСАГОН', 'ПЕНТАГОН', 'ОКТАГОН', 'КУБ'], oddOneIndex: 3, explanation: 'Куб — 3D фигура, остальные 2D многоугольники', category: 'Геометрия', difficulty: 'hard' },
]

type GameMode = 'classic' | 'speed' | 'survival'

const modeConfig: Record<GameMode, { time: number; questions: number; lives: number; xpBase: number }> = {
  classic: { time: 0, questions: 10, lives: 0, xpBase: 10 },
  speed: { time: 45, questions: 15, lives: 0, xpBase: 12 },
  survival: { time: 0, questions: 999, lives: 3, xpBase: 15 }
}

export default function OddOneOut() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<OddOneQuestion | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [questionNum, setQuestionNum] = useState(1)
  const [lives, setLives] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'result' | 'finished'>('setup')
  const [showResult, setShowResult] = useState(false)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const getNextQuestion = useCallback(() => {
    const available = questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => q.difficulty === difficulty && !usedQuestions.has(q.index))
    
    if (available.length === 0) {
      setUsedQuestions(new Set())
      const filtered = questions.filter(q => q.difficulty === difficulty)
      return filtered[Math.floor(Math.random() * filtered.length)]
    }
    
    const chosen = available[Math.floor(Math.random() * available.length)]
    setUsedQuestions(prev => new Set([...prev, chosen.index]))
    return chosen
  }, [difficulty, usedQuestions])

  const startGame = useCallback((mode: GameMode) => {
    setGameMode(mode)
    setTimeLeft(modeConfig[mode].time)
    setLives(modeConfig[mode].lives)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setQuestionNum(1)
    setUsedQuestions(new Set())
    setSelectedIndex(null)
    setShowResult(false)
    setGameState('playing')
    
    const first = questions.filter(q => q.difficulty === difficulty)[Math.floor(Math.random() * questions.filter(q => q.difficulty === difficulty).length)]
    setCurrentQuestion(first)
  }, [difficulty])

  useEffect(() => {
    if (gameMode === 'speed' && gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    } else if (timeLeft === 0 && gameMode === 'speed' && gameState === 'playing') {
      // Используем setTimeout для отложенного setState
      const timer = setTimeout(() => setGameState('finished'), 0)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, gameMode, gameState])

  useEffect(() => {
    if (gameMode === 'survival' && lives <= 0 && gameState === 'playing') {
      // Используем setTimeout для отложенного setState
      const timer = setTimeout(() => setGameState('finished'), 0)
      return () => clearTimeout(timer)
    }
  }, [lives, gameMode, gameState])

  const handleSelect = useCallback((index: number) => {
    if (selectedIndex !== null || !currentQuestion) return
    
    setSelectedIndex(index)
    setShowResult(true)
    
    if (index === currentQuestion.oddOneIndex) {
      addXP(modeConfig[gameMode!].xpBase)
      playSound?.('success')
      setScore(s => s + modeConfig[gameMode!].xpBase)
      setCorrect(c => c + 1)
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      if (gameMode === 'survival') {
        setLives(l => l - 1)
      }
    }
  }, [selectedIndex, currentQuestion, gameMode, addXP, playSound])

  const nextQuestion = useCallback(() => {
    if (gameMode !== 'survival' && questionNum >= modeConfig[gameMode!].questions) {
      setGameState('finished')
      return
    }
    
    const next = getNextQuestion()
    setCurrentQuestion(next)
    setSelectedIndex(null)
    setShowResult(false)
    setQuestionNum(q => q + 1)
  }, [gameMode, questionNum, getNextQuestion])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-sky-900/90 to-cyan-900/90 rounded-2xl p-6 backdrop-blur-sm border border-sky-500/30">
        <h2 className="text-2xl font-bold text-sky-200 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Найди лишнее
        </h2>
        <p className="text-sky-100/80 mb-6">
          Выбери слово, которое не подходит к остальным!
        </p>
        
        <div className="mb-4">
          <p className="text-sky-200 text-sm mb-2">Сложность:</p>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  difficulty === d
                    ? d === 'easy' ? 'bg-green-500 text-white' :
                      d === 'medium' ? 'bg-yellow-500 text-white' :
                      'bg-red-500 text-white'
                    : 'bg-sky-800/50 text-sky-200 hover:bg-sky-700/50'
                }`}
              >
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          {(['classic', 'speed', 'survival'] as GameMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => startGame(mode)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-r from-sky-500/30 to-cyan-500/30 hover:from-sky-500/40 hover:to-cyan-500/40 text-sky-200"
            >
              <div className="font-bold flex items-center gap-2">
                {mode === 'classic' ? <Star className="w-4 h-4" /> : 
                 mode === 'speed' ? <Timer className="w-4 h-4" /> : 
                 <Target className="w-4 h-4" />}
                {mode === 'classic' ? 'Классика' : mode === 'speed' ? 'На скорость' : 'На выживание'}
              </div>
              <div className="text-sm opacity-70">
                {mode === 'classic' ? '10 вопросов • 10 XP' :
                 mode === 'speed' ? '45 секунд • 12 XP' :
                 '3 жизни • 15 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const total = correct + wrong
    const accuracy = total > 0 ? Math.round(correct / total * 100) : 0
    
    return (
      <div className="bg-gradient-to-br from-sky-900/90 to-cyan-900/90 rounded-2xl p-6 backdrop-blur-sm border border-sky-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-sky-200 mb-2">Игра окончена!</h2>
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
        
        <div className="bg-sky-500/20 rounded-xl p-3 mb-6 max-w-xs mx-auto">
          <div className="text-xl font-bold text-sky-300">{accuracy}%</div>
          <div className="text-sky-400 text-sm">Точность</div>
        </div>
        
        <button
          onClick={() => setGameState('setup')}
          className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-sky-900/90 to-cyan-900/90 rounded-2xl p-6 backdrop-blur-sm border border-sky-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-sky-200 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Найди лишнее
        </h2>
        <div className="flex items-center gap-3">
          {gameMode === 'speed' && (
            <span className="text-sky-200 bg-sky-500/30 px-3 py-1 rounded-full text-sm font-mono">{timeLeft}с</span>
          )}
          {gameMode === 'survival' && (
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={i < lives ? 'text-red-400' : 'text-gray-600'}>❤️</span>
              ))}
            </div>
          )}
          <span className="text-sky-300 text-sm">{questionNum}/{gameMode === 'survival' ? '∞' : modeConfig[gameMode!].questions}</span>
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">{score} XP</span>
        </div>
      </div>

      {/* Category */}
      <div className="text-center mb-4">
        <span className="text-sky-300/70 text-sm">{currentQuestion?.category}</span>
      </div>

      {/* Items */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {currentQuestion?.items.map((item, index) => {
          let buttonClass = 'bg-sky-800/50 hover:bg-sky-700/50 text-sky-200 border-sky-600'
          
          if (showResult) {
            if (index === currentQuestion.oddOneIndex) {
              buttonClass = 'bg-green-500/30 text-green-300 border-green-500'
            } else if (index === selectedIndex && index !== currentQuestion.oddOneIndex) {
              buttonClass = 'bg-red-500/30 text-red-300 border-red-500'
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={selectedIndex !== null}
              className={`p-4 rounded-xl text-center font-bold text-lg transition-all border-2 ${buttonClass}`}
            >
              {item}
            </button>
          )
        })}
      </div>

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-xl mb-4 ${selectedIndex === currentQuestion?.oddOneIndex ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <p className={`font-bold mb-1 ${selectedIndex === currentQuestion?.oddOneIndex ? 'text-green-300' : 'text-red-300'}`}>
            {selectedIndex === currentQuestion?.oddOneIndex ? '✓ Правильно!' : '✗ Неправильно!'}
          </p>
          <p className="text-sky-200 text-sm">{currentQuestion?.explanation}</p>
        </div>
      )}

      {/* Next */}
      {showResult && (gameMode !== 'survival' || lives > 0) && (
        <button
          onClick={nextQuestion}
          className="w-full py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold rounded-xl transition-all"
        >
          Следующий вопрос
        </button>
      )}
      
      {showResult && gameMode === 'survival' && lives <= 0 && (
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
