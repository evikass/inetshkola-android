'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Calculator, Check, RotateCcw, Trophy, Timer, Zap } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface MathPuzzle {
  type: 'equation' | 'missing' | 'comparison' | 'sequence'
  question: string
  answer: number | string
  difficulty: 'easy' | 'medium' | 'hard'
}

const generatePuzzle = (difficulty: 'easy' | 'medium' | 'hard'): MathPuzzle => {
  const types: ('equation' | 'missing' | 'comparison' | 'sequence')[] = ['equation', 'missing', 'comparison', 'sequence']
  const type = types[Math.floor(Math.random() * types.length)]
  
  switch (type) {
    case 'equation': {
      // Решить уравнение
      if (difficulty === 'easy') {
        const a = Math.floor(Math.random() * 10) + 1
        const b = Math.floor(Math.random() * 10) + 1
        const op = Math.random() > 0.5 ? '+' : '-'
        const answer = op === '+' ? a + b : a - b
        return { type, question: `${a} ${op} ${b} = ?`, answer, difficulty }
      } else if (difficulty === 'medium') {
        const a = Math.floor(Math.random() * 10) + 2
        const b = Math.floor(Math.random() * 10) + 1
        const op = Math.random() > 0.5 ? '×' : '÷'
        if (op === '×') {
          return { type, question: `${a} ${op} ${b} = ?`, answer: a * b, difficulty }
        } else {
          const result = a * b
          return { type, question: `${result} ${op} ${a} = ?`, answer: b, difficulty }
        }
      } else {
        const a = Math.floor(Math.random() * 20) + 10
        const b = Math.floor(Math.random() * 10) + 5
        const c = Math.floor(Math.random() * 5) + 1
        const answer = a + b * c
        return { type, question: `${a} + ${b} × ${c} = ?`, answer, difficulty }
      }
    }
    case 'missing': {
      // Найти пропущенное число
      if (difficulty === 'easy') {
        const answer = Math.floor(Math.random() * 10) + 1
        const b = Math.floor(Math.random() * 10) + 1
        const result = answer + b
        return { type, question: `? + ${b} = ${result}`, answer, difficulty }
      } else if (difficulty === 'medium') {
        const answer = Math.floor(Math.random() * 10) + 2
        const b = Math.floor(Math.random() * 10) + 1
        const result = answer * b
        return { type, question: `? × ${b} = ${result}`, answer, difficulty }
      } else {
        const answer = Math.floor(Math.random() * 20) + 5
        const b = Math.floor(Math.random() * 10) + 5
        const result = answer + b
        return { type, question: `${result} - ? = ${b}`, answer, difficulty }
      }
    }
    case 'comparison': {
      // Сравнить числа
      if (difficulty === 'easy') {
        const a = Math.floor(Math.random() * 20) + 1
        const b = Math.floor(Math.random() * 20) + 1
        const answer = a > b ? '>' : a < b ? '<' : '='
        return { type, question: `${a} ? ${b}`, answer, difficulty }
      } else if (difficulty === 'medium') {
        const a = Math.floor(Math.random() * 5) + 2
        const b = Math.floor(Math.random() * 5) + 2
        const left = a * b
        const c = Math.floor(Math.random() * 10) + 10
        const answer = left > c ? '>' : left < c ? '<' : '='
        return { type, question: `${a} × ${b} ? ${c}`, answer, difficulty }
      } else {
        const a = Math.floor(Math.random() * 10) + 5
        const b = Math.floor(Math.random() * 5) + 2
        const c = Math.floor(Math.random() * 10) + 5
        const left = a + b
        const right = c * 2
        const answer = left > right ? '>' : left < right ? '<' : '='
        return { type, question: `${a} + ${b} ? ${c} × 2`, answer, difficulty }
      }
    }
    case 'sequence': {
      // Продолжить последовательность
      if (difficulty === 'easy') {
        const start = Math.floor(Math.random() * 5) + 1
        const step = Math.floor(Math.random() * 3) + 2
        return { 
          type, 
          question: `${start}, ${start + step}, ${start + step*2}, ?`, 
          answer: start + step * 3, 
          difficulty 
        }
      } else if (difficulty === 'medium') {
        const start = Math.floor(Math.random() * 3) + 2
        const step = Math.floor(Math.random() * 2) + 2
        return { 
          type, 
          question: `${start}, ${start * step}, ${start * step * step}, ?`, 
          answer: start * step * step * step, 
          difficulty 
        }
      } else {
        const a = 1
        const b = 1
        return { 
          type, 
          question: `1, 1, 2, 3, 5, 8, ?`, 
          answer: 13, // Фибоначчи
          difficulty 
        }
      }
    }
    default:
      return { type: 'equation', question: '2 + 2 = ?', answer: 4, difficulty: 'easy' }
  }
}

type GameMode = 'practice' | 'timed' | 'survival'

const modeConfig: Record<GameMode, { time: number; lives: number; puzzles: number; xpBase: number }> = {
  practice: { time: 0, lives: 0, puzzles: 10, xpBase: 8 },
  timed: { time: 60, lives: 0, puzzles: 999, xpBase: 10 },
  survival: { time: 0, lives: 3, puzzles: 999, xpBase: 12 }
}

export default function MathPuzzle() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [currentPuzzle, setCurrentPuzzle] = useState<MathPuzzle | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [puzzleNum, setPuzzleNum] = useState(1)
  const [lives, setLives] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [streak, setStreak] = useState(0)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startGame = useCallback((mode: GameMode, diff: 'easy' | 'medium' | 'hard') => {
    setGameMode(mode)
    setDifficulty(diff)
    setTimeLeft(modeConfig[mode].time)
    setLives(modeConfig[mode].lives)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setPuzzleNum(1)
    setStreak(0)
    setUserAnswer('')
    setGameState('playing')
    setCurrentPuzzle(generatePuzzle(diff))
  }, [])

  useEffect(() => {
    if (gameMode === 'timed' && gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    } else if (timeLeft === 0 && gameMode === 'timed' && gameState === 'playing') {
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

  const checkAnswer = useCallback(() => {
    if (!currentPuzzle || !userAnswer.trim()) return
    
    const userAnswerStr = userAnswer.trim().toUpperCase()
    const correctAnswer = String(currentPuzzle.answer).toUpperCase()
    const isCorrect = userAnswerStr === correctAnswer
    
    if (isCorrect) {
      const baseXP = modeConfig[gameMode!].xpBase
      const streakBonus = streak >= 2 ? Math.floor(baseXP * 0.2) : 0
      addXP(baseXP + streakBonus)
      playSound?.('success')
      setScore(s => s + baseXP + streakBonus)
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      setStreak(0)
      if (gameMode === 'survival') {
        setLives(l => l - 1)
      }
    }
    
    setUserAnswer('')
    
    // Check if finished
    if (gameMode === 'practice' && puzzleNum >= modeConfig.practice.puzzles) {
      setGameState('finished')
    } else if (gameMode === 'survival' && lives <= 0) {
      setGameState('finished')
    } else {
      setPuzzleNum(p => p + 1)
      setCurrentPuzzle(generatePuzzle(difficulty))
    }
  }, [currentPuzzle, userAnswer, gameMode, streak, lives, puzzleNum, difficulty, addXP, playSound])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-indigo-900/90 to-blue-900/90 rounded-2xl p-6 backdrop-blur-sm border border-indigo-500/30">
        <h2 className="text-2xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Математические головоломки
        </h2>
        <p className="text-indigo-100/80 mb-6">
          Решай разные типы математических задач: уравнения, пропущенные числа, сравнения, последовательности!
        </p>
        
        <div className="mb-4">
          <p className="text-indigo-200 text-sm mb-2">Сложность:</p>
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
                    : 'bg-indigo-800/50 text-indigo-200 hover:bg-indigo-700/50'
                }`}
              >
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          {(['practice', 'timed', 'survival'] as GameMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => startGame(mode, difficulty)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-r from-indigo-500/30 to-blue-500/30 hover:from-indigo-500/40 hover:to-blue-500/40 text-indigo-200"
            >
              <div className="font-bold flex items-center gap-2">
                {mode === 'practice' ? <Calculator className="w-4 h-4" /> : 
                 mode === 'timed' ? <Timer className="w-4 h-4" /> : 
                 <Zap className="w-4 h-4" />}
                {mode === 'practice' ? 'Практика' : mode === 'timed' ? 'На время' : 'На выживание'}
              </div>
              <div className="text-sm opacity-70">
                {mode === 'practice' ? '10 задач • 8 XP' :
                 mode === 'timed' ? '60 секунд • 10 XP' :
                 '3 жизни • 12 XP'}
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
      <div className="bg-gradient-to-br from-indigo-900/90 to-blue-900/90 rounded-2xl p-6 backdrop-blur-sm border border-indigo-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-indigo-200 mb-2">Отлично!</h2>
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
        
        <div className="bg-indigo-500/20 rounded-xl p-3 mb-6 max-w-xs mx-auto">
          <div className="text-xl font-bold text-indigo-300">{accuracy}%</div>
          <div className="text-indigo-400 text-sm">Точность</div>
        </div>
        
        <button
          onClick={() => setGameState('setup')}
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900/90 to-blue-900/90 rounded-2xl p-6 backdrop-blur-sm border border-indigo-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-200 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Головоломка
        </h2>
        <div className="flex items-center gap-3">
          {gameMode === 'timed' && (
            <span className="text-indigo-200 bg-indigo-500/30 px-3 py-1 rounded-full text-sm font-mono">
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
          <span className="text-indigo-300 text-sm">
            {gameMode === 'practice' ? `${puzzleNum}/${modeConfig.practice.puzzles}` : `#${puzzleNum}`}
          </span>
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">{score} XP</span>
        </div>
      </div>

      {/* Streak */}
      {streak >= 2 && (
        <div className="text-center mb-2">
          <span className="text-yellow-300 text-sm flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" />
            Серия x{streak}
          </span>
        </div>
      )}

      {/* Puzzle type */}
      <div className="text-center mb-4">
        <span className="text-indigo-300/70 text-xs uppercase tracking-wide">
          {currentPuzzle?.type === 'equation' ? 'Уравнение' :
           currentPuzzle?.type === 'missing' ? 'Пропущенное число' :
           currentPuzzle?.type === 'comparison' ? 'Сравнение' : 'Последовательность'}
        </span>
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <p className="text-3xl md:text-4xl font-bold text-white">
          {currentPuzzle?.question}
        </p>
      </div>

      {/* Input */}
      <div className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          placeholder="Ответ"
          autoFocus
          className="w-32 text-center text-2xl font-bold bg-indigo-800/50 border-2 border-indigo-500/50 rounded-xl p-3 text-indigo-100 focus:outline-none focus:border-indigo-400"
        />
        <button
          onClick={checkAnswer}
          className="px-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all"
        >
          <Check className="w-6 h-6" />
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-4 text-sm text-indigo-300/70">
        <span className="text-green-300">✓ {correct}</span>
        <span className="text-red-300">✗ {wrong}</span>
      </div>
    </div>
  )
}
