'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Palette, Zap, Trophy, RotateCcw, Clock } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

const COLORS = [
  { name: 'КРАСНЫЙ', color: 'bg-red-500', text: 'text-red-500' },
  { name: 'СИНИЙ', color: 'bg-blue-500', text: 'text-blue-500' },
  { name: 'ЗЕЛЁНЫЙ', color: 'bg-green-500', text: 'text-green-500' },
  { name: 'ЖЁЛТЫЙ', color: 'bg-yellow-500', text: 'text-yellow-500' },
  { name: 'ФИОЛЕТОВЫЙ', color: 'bg-purple-500', text: 'text-purple-500' },
  { name: 'ОРАНЖЕВЫЙ', color: 'bg-orange-500', text: 'text-orange-500' },
]

type GameMode = 'classic' | 'speed' | 'endless'

const modeConfig: Record<GameMode, { time: number; rounds: number; xpPerCorrect: number }> = {
  classic: { time: 30, rounds: 15, xpPerCorrect: 5 },
  speed: { time: 15, rounds: 20, xpPerCorrect: 8 },
  endless: { time: 60, rounds: 999, xpPerCorrect: 3 }
}

export default function ColorMatch() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [round, setRound] = useState(1)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentColor, setCurrentColor] = useState<typeof COLORS[0] | null>(null)
  const [displayedName, setDisplayedName] = useState('')
  const [isMatch, setIsMatch] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [avgReaction, setAvgReaction] = useState(0)
  
  const reactionTimes = useRef<number[]>([])
  const roundStart = useRef<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const generateRound = useCallback(() => {
    const colorIndex = Math.floor(Math.random() * COLORS.length)
    const nameIndex = Math.floor(Math.random() * COLORS.length)
    const match = Math.random() > 0.5
    
    let actualColorIndex: number
    let actualNameIndex: number
    
    if (match) {
      actualColorIndex = colorIndex
      actualNameIndex = colorIndex
    } else {
      actualColorIndex = colorIndex
      actualNameIndex = nameIndex === colorIndex ? (nameIndex + 1) % COLORS.length : nameIndex
    }
    
    setCurrentColor(COLORS[actualColorIndex])
    setDisplayedName(COLORS[actualNameIndex].name)
    setIsMatch(actualColorIndex === actualNameIndex)
    roundStart.current = Date.now()
  }, [])

  const startGame = useCallback((mode: GameMode) => {
    setGameMode(mode)
    setTimeLeft(modeConfig[mode].time)
    setGameState('playing')
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setRound(1)
    setStreak(0)
    setMaxStreak(0)
    reactionTimes.current = []
    generateRound()
  }, [generateRound])

  const finishGame = useCallback(() => {
    setGameState('finished')
    if (timerRef.current) clearTimeout(timerRef.current)
    
    if (reactionTimes.current.length > 0) {
      const avg = reactionTimes.current.reduce((a, b) => a + b, 0) / reactionTimes.current.length
      setAvgReaction(Math.round(avg))
    }
  }, [])

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    } else if (timeLeft === 0 && gameState === 'playing') {
      // Используем setTimeout для отложенного setState
      const timer = setTimeout(() => finishGame(), 0)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, gameState, finishGame])

  const handleAnswer = useCallback((answer: boolean) => {
    if (!gameMode) return
    
    const reactionTime = Date.now() - roundStart.current
    reactionTimes.current.push(reactionTime)
    
    if (answer === isMatch) {
      const baseXP = modeConfig[gameMode].xpPerCorrect
      const speedBonus = reactionTime < 1000 ? 3 : reactionTime < 2000 ? 1 : 0
      const streakBonus = streak >= 3 ? Math.floor(baseXP * 0.3) : 0
      addXP(baseXP + speedBonus + streakBonus)
      playSound?.('success')
      setScore(s => s + baseXP + speedBonus + streakBonus)
      setCorrect(c => c + 1)
      setStreak(s => {
        const newStreak = s + 1
        if (newStreak > maxStreak) setMaxStreak(newStreak)
        return newStreak
      })
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      setStreak(0)
    }
    
    const totalRounds = correct + wrong + 1
    if (gameMode !== 'endless' && totalRounds >= modeConfig[gameMode].rounds) {
      finishGame()
    } else {
      setRound(r => r + 1)
      generateRound()
    }
  }, [gameMode, isMatch, streak, maxStreak, correct, wrong, addXP, playSound, generateRound, finishGame])

  const resetGame = useCallback(() => {
    setGameState('setup')
    setGameMode(null)
  }, [])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-pink-900/90 to-rose-900/90 rounded-2xl p-6 backdrop-blur-sm border border-pink-500/30">
        <h2 className="text-2xl font-bold text-pink-200 mb-4 flex items-center gap-2">
          <Palette className="w-6 h-6" />
          Цветовой тест
        </h2>
        <p className="text-pink-100/80 mb-6">
          Определи, совпадает ли название цвета с его отображением. Быстрая реакция = больше очков!
        </p>
        <div className="flex flex-col gap-3">
          {(['classic', 'speed', 'endless'] as GameMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => startGame(mode)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-r from-pink-500/30 to-rose-500/30 hover:from-pink-500/40 hover:to-rose-500/40 text-pink-200"
            >
              <div className="font-bold flex items-center gap-2">
                {mode === 'classic' ? <Clock className="w-4 h-4" /> : mode === 'speed' ? <Zap className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
                {mode === 'classic' ? 'Классика' : mode === 'speed' ? 'Спидран' : 'Бесконечный'}
              </div>
              <div className="text-sm opacity-70">
                {mode === 'classic' ? '30 сек • 15 раундов • 5 XP' : 
                 mode === 'speed' ? '15 сек • 20 раундов • 8 XP' : 
                 '60 сек • без лимита • 3 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const accuracy = correct + wrong > 0 ? Math.round(correct / (correct + wrong) * 100) : 0
    
    return (
      <div className="bg-gradient-to-br from-pink-900/90 to-rose-900/90 rounded-2xl p-6 backdrop-blur-sm border border-pink-500/30">
        <h2 className="text-2xl font-bold text-pink-200 mb-4 flex items-center gap-2 justify-center">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Результаты
        </h2>
        
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-white mb-2">{score} XP</div>
          <div className="text-pink-300">Режим: {gameMode === 'classic' ? 'Классика' : gameMode === 'speed' ? 'Спидран' : 'Бесконечный'}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-green-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-300">{correct}</div>
            <div className="text-green-400 text-sm">Правильно</div>
          </div>
          <div className="bg-red-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-red-300">{wrong}</div>
            <div className="text-red-400 text-sm">Ошибок</div>
          </div>
          <div className="bg-yellow-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-yellow-300">{accuracy}%</div>
            <div className="text-yellow-400 text-sm">Точность</div>
          </div>
          <div className="bg-purple-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-purple-300">{maxStreak}</div>
            <div className="text-purple-400 text-sm">Макс. серия</div>
          </div>
        </div>
        
        {avgReaction > 0 && (
          <div className="bg-cyan-500/20 rounded-xl p-3 text-center mb-4">
            <Zap className="w-5 h-5 inline text-cyan-300 mr-2" />
            <span className="text-cyan-200">Среднее время реакции: {(avgReaction / 1000).toFixed(2)} сек</span>
          </div>
        )}
        
        <button
          onClick={resetGame}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-pink-900/90 to-rose-900/90 rounded-2xl p-6 backdrop-blur-sm border border-pink-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-pink-200 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Цветовой тест
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-pink-200 bg-pink-500/30 px-3 py-1 rounded-full text-sm font-mono">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">
            {score} XP
          </span>
        </div>
      </div>

      {/* Round info */}
      <div className="text-center mb-4">
        <span className="text-pink-300/70 text-sm">Раунд {round}</span>
        {streak >= 3 && (
          <span className="ml-2 text-yellow-300 text-sm">🔥 x{streak}</span>
        )}
      </div>

      {/* Color display */}
      <div className="flex justify-center mb-8">
        <div className={`w-40 h-40 ${currentColor?.color} rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20`}>
          <span className="text-white text-2xl font-black drop-shadow-lg">
            {displayedName}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <p className="text-pink-100 text-lg">
          Совпадает ли цвет с названием?
        </p>
      </div>

      {/* Answer buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleAnswer(true)}
          className="w-32 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all hover:scale-105 text-xl"
        >
          ✓ Да
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="w-32 py-4 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl transition-all hover:scale-105 text-xl"
        >
          ✗ Нет
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 flex justify-center gap-4 text-sm text-pink-300/70">
        <span className="text-green-300">✓ {correct}</span>
        <span className="text-red-300">✗ {wrong}</span>
      </div>
    </div>
  )
}
