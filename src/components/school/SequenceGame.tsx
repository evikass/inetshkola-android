'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Hash, Check, SkipForward, Trophy, Timer, Star } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface Sequence {
  numbers: number[]
  rule: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const sequences: Sequence[] = [
  // Easy - простые арифметические
  { numbers: [2, 4, 6, 8, 10], rule: '+2', difficulty: 'easy' },
  { numbers: [1, 3, 5, 7, 9], rule: '+2 (нечётные)', difficulty: 'easy' },
  { numbers: [5, 10, 15, 20, 25], rule: '+5', difficulty: 'easy' },
  { numbers: [10, 20, 30, 40, 50], rule: '+10', difficulty: 'easy' },
  { numbers: [3, 6, 9, 12, 15], rule: '+3', difficulty: 'easy' },
  { numbers: [100, 90, 80, 70, 60], rule: '-10', difficulty: 'easy' },
  // Medium - умножение и сложные правила
  { numbers: [2, 4, 8, 16, 32], rule: '×2', difficulty: 'medium' },
  { numbers: [1, 4, 9, 16, 25], rule: 'квадраты (1², 2², 3²...)', difficulty: 'medium' },
  { numbers: [1, 1, 2, 3, 5, 8], rule: 'Фибоначчи (a+b)', difficulty: 'medium' },
  { numbers: [3, 6, 12, 24, 48], rule: '×2', difficulty: 'medium' },
  { numbers: [1, 2, 4, 7, 11, 16], rule: '+1, +2, +3, +4...', difficulty: 'medium' },
  { numbers: [2, 6, 18, 54, 162], rule: '×3', difficulty: 'medium' },
  // Hard - сложные последовательности
  { numbers: [1, 2, 6, 24, 120], rule: 'факториал (1!, 2!, 3!...)', difficulty: 'hard' },
  { numbers: [2, 3, 5, 7, 11, 13], rule: 'простые числа', difficulty: 'hard' },
  { numbers: [1, 1, 2, 5, 14, 42], rule: 'Каталана', difficulty: 'hard' },
  { numbers: [1, 2, 4, 8, 15, 26], rule: '+1, +2, +4, +7, +11 (разности растут на 1,2,3...)', difficulty: 'hard' },
  { numbers: [1, 3, 6, 10, 15, 21], rule: 'треугольные (1, 1+2, 1+2+3...)', difficulty: 'hard' },
]

type GameMode = 'practice' | 'timed' | 'survival'

const modeConfig: Record<GameMode, { time: number; lives: number; xpBase: number }> = {
  practice: { time: 0, lives: 0, xpBase: 10 },
  timed: { time: 60, lives: 0, xpBase: 15 },
  survival: { time: 0, lives: 3, xpBase: 20 }
}

export default function SequenceGame() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [currentSequence, setCurrentSequence] = useState<Sequence | null>(null)
  const [displayedNumbers, setDisplayedNumbers] = useState<number[]>([])
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lives, setLives] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [showRule, setShowRule] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const usedSequences = useRef<Set<number>>(new Set())

  const getNextSequence = useCallback(() => {
    const available = sequences
      .map((s, i) => ({ ...s, index: i }))
      .filter(s => s.difficulty === difficulty && !usedSequences.current.has(s.index))
    
    if (available.length === 0) {
      usedSequences.current.clear()
      return sequences.filter(s => s.difficulty === difficulty)[Math.floor(Math.random() * sequences.filter(s => s.difficulty === difficulty).length)]
    }
    
    const chosen = available[Math.floor(Math.random() * available.length)]
    usedSequences.current.add(chosen.index)
    return chosen
  }, [difficulty])

  const startGame = useCallback((mode: GameMode, diff: 'easy' | 'medium' | 'hard') => {
    setGameMode(mode)
    setDifficulty(diff)
    setTimeLeft(modeConfig[mode].time)
    setLives(modeConfig[mode].lives)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setStreak(0)
    usedSequences.current.clear()
    setGameState('playing')
    setShowRule(false)
  }, [])

  const finishGame = useCallback(() => {
    setGameState('finished')
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    if (gameState === 'playing') {
      const seq = getNextSequence()
      if (seq) {
        setCurrentSequence(seq)
        // Hide the last number
        setDisplayedNumbers(seq.numbers.slice(0, -1))
      }
    }
  }, [gameState, getNextSequence])

  useEffect(() => {
    if (gameMode === 'timed' && gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    } else if (timeLeft === 0 && gameMode === 'timed' && gameState === 'playing') {
      // Используем setTimeout для отложенного вызова
      const timer = setTimeout(() => finishGame(), 0)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, gameMode, gameState, finishGame])

  useEffect(() => {
    if (gameMode === 'survival' && lives <= 0 && gameState === 'playing') {
      // Используем setTimeout для отложенного вызова
      const timer = setTimeout(() => finishGame(), 0)
      return () => clearTimeout(timer)
    }
  }, [lives, gameMode, gameState, finishGame])

  const checkAnswer = useCallback(() => {
    if (!currentSequence) return
    
    const correctAnswer = currentSequence.numbers[currentSequence.numbers.length - 1]
    const userNum = parseInt(userAnswer)
    
    if (userNum === correctAnswer) {
      const baseXP = modeConfig[gameMode!].xpBase
      const streakBonus = streak >= 2 ? Math.floor(baseXP * 0.2) : 0
      addXP(baseXP + streakBonus)
      playSound?.('success')
      setScore(s => s + baseXP + streakBonus)
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
      setShowRule(false)
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      setStreak(0)
      if (gameMode === 'survival') {
        setLives(l => l - 1)
      }
    }
    
    setUserAnswer('')
    // Get next sequence
    const nextSeq = getNextSequence()
    if (nextSeq) {
      setCurrentSequence(nextSeq)
      setDisplayedNumbers(nextSeq.numbers.slice(0, -1))
    }
  }, [currentSequence, userAnswer, gameMode, streak, lives, addXP, playSound, getNextSequence])

  const resetGame = useCallback(() => {
    setGameState('setup')
    setGameMode(null)
    setUserAnswer('')
  }, [])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-violet-900/90 to-purple-900/90 rounded-2xl p-6 backdrop-blur-sm border border-violet-500/30">
        <h2 className="text-2xl font-bold text-violet-200 mb-4 flex items-center gap-2">
          <Hash className="w-6 h-6" />
          Числовые ряды
        </h2>
        <p className="text-violet-100/80 mb-6">
          Найди закономерность и угадай следующее число!
        </p>
        
        {/* Difficulty */}
        <div className="mb-4">
          <p className="text-violet-200 text-sm mb-2">Сложность:</p>
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
                    : 'bg-violet-800/50 text-violet-200 hover:bg-violet-700/50'
                }`}
              >
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Game modes */}
        <div className="flex flex-col gap-3">
          {(['practice', 'timed', 'survival'] as GameMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => startGame(mode, difficulty)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-r from-violet-500/30 to-purple-500/30 hover:from-violet-500/40 hover:to-purple-500/40 text-violet-200"
            >
              <div className="font-bold flex items-center gap-2">
                {mode === 'practice' ? <Star className="w-4 h-4" /> : 
                 mode === 'timed' ? <Timer className="w-4 h-4" /> : 
                 <Hash className="w-4 h-4" />}
                {mode === 'practice' ? 'Практика' : mode === 'timed' ? 'На время' : 'На выживание'}
              </div>
              <div className="text-sm opacity-70">
                {mode === 'practice' ? 'Без ограничений • 10 XP' :
                 mode === 'timed' ? '60 секунд • 15 XP' :
                 '3 жизни • 20 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    return (
      <div className="bg-gradient-to-br from-violet-900/90 to-purple-900/90 rounded-2xl p-6 backdrop-blur-sm border border-violet-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-violet-200 mb-2">Игра окончена!</h2>
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
          onClick={resetGame}
          className="px-6 py-3 bg-violet-500 hover:bg-violet-400 text-white font-bold rounded-xl transition-all"
        >
          Играть снова
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-violet-900/90 to-purple-900/90 rounded-2xl p-6 backdrop-blur-sm border border-violet-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-violet-200 flex items-center gap-2">
          <Hash className="w-5 h-5" />
          Числовые ряды
        </h2>
        <div className="flex items-center gap-3">
          {gameMode === 'timed' && (
            <span className="text-violet-200 bg-violet-500/30 px-3 py-1 rounded-full text-sm font-mono">
              {timeLeft}с
            </span>
          )}
          {gameMode === 'survival' && (
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={i < lives ? 'text-red-400' : 'text-gray-600'}>❤️</span>
              ))}
            </div>
          )}
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">
            {score} XP
          </span>
        </div>
      </div>

      {/* Streak */}
      {streak >= 2 && (
        <div className="text-center mb-2">
          <span className="text-yellow-300 text-sm">🔥 Серия x{streak}</span>
        </div>
      )}

      {/* Numbers */}
      <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
        {displayedNumbers.map((num, index) => (
          <div
            key={index}
            className="w-14 h-14 bg-violet-700/50 rounded-xl flex items-center justify-center text-xl font-bold text-violet-100"
          >
            {num}
          </div>
        ))}
        <div className="w-14 h-14 bg-violet-500/30 border-2 border-dashed border-violet-400 rounded-xl flex items-center justify-center">
          <span className="text-violet-300 text-2xl">?</span>
        </div>
      </div>

      {/* Input */}
      <div className="flex justify-center gap-2 mb-4">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          placeholder="Число"
          className="w-32 text-center text-2xl font-bold bg-violet-800/50 border-2 border-violet-500/50 rounded-xl p-3 text-violet-100 focus:outline-none focus:border-violet-400"
          autoFocus
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={checkAnswer}
          disabled={!userAnswer}
          className="px-6 py-2 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          Ответить
        </button>
        <button
          onClick={() => setShowRule(!showRule)}
          className="px-4 py-2 bg-violet-700/50 hover:bg-violet-600/50 text-violet-200 rounded-xl transition-all"
        >
          {showRule ? 'Скрыть правило' : 'Подсказка'}
        </button>
      </div>

      {/* Rule hint */}
      {showRule && currentSequence && (
        <div className="mt-4 text-center text-violet-300 bg-violet-800/30 rounded-lg p-3">
          Правило: {currentSequence.rule}
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 flex justify-center gap-4 text-sm text-violet-300/70">
        <span className="text-green-300">✓ {correct}</span>
        <span className="text-red-300">✗ {wrong}</span>
      </div>
    </div>
  )
}
