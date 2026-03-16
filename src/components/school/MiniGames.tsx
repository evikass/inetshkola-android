'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Gamepad2, X, RotateCcw, Trophy, Star, Clock, 
  CheckCircle, XCircle, Zap, Target, Shuffle
} from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

type GameType = 'math' | 'words' | 'memory' | 'speed'

interface GameState {
  score: number
  timeLeft: number
  isPlaying: boolean
  currentRound: number
  totalRounds: number
}

// Математическая игра
function MathGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operator, setOperator] = useState<'+' | '-' | '×'>('+')
  const [options, setOptions] = useState<number[]>([])
  const [correct, setCorrect] = useState(0)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const totalRounds = 10
  
  const generateProblem = useCallback(() => {
    const ops: ('+' | '-' | '×')[] = ['+', '-', '×']
    const op = ops[Math.floor(Math.random() * 3)]
    let n1, n2, answer
    
    if (op === '×') {
      n1 = Math.floor(Math.random() * 9) + 2
      n2 = Math.floor(Math.random() * 9) + 2
      answer = n1 * n2
    } else if (op === '+') {
      n1 = Math.floor(Math.random() * 50) + 10
      n2 = Math.floor(Math.random() * 50) + 10
      answer = n1 + n2
    } else {
      n1 = Math.floor(Math.random() * 50) + 30
      n2 = Math.floor(Math.random() * 30) + 1
      answer = n1 - n2
    }
    
    setNum1(n1)
    setNum2(n2)
    setOperator(op)
    setCorrect(answer)
    
    // Generate options
    const opts = [answer]
    while (opts.length < 4) {
      const wrong = answer + Math.floor(Math.random() * 20) - 10
      if (wrong !== answer && wrong > 0 && !opts.includes(wrong)) {
        opts.push(wrong)
      }
    }
    setOptions(opts.sort(() => Math.random() - 0.5))
  }, [])
  
  useEffect(() => {
    // Используем setTimeout для отложенного вызова
    const timer = setTimeout(() => generateProblem(), 0)
    return () => clearTimeout(timer)
  }, [generateProblem])
  
  const handleAnswer = (answer: number) => {
    if (answer === correct) {
      setScore(s => s + 10)
    }
    
    if (round < totalRounds) {
      setRound(r => r + 1)
      generateProblem()
    } else {
      onComplete(score + (answer === correct ? 10 : 0))
    }
  }
  
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-white/50">Раунд {round}/{totalRounds}</span>
        <span className="text-yellow-400 font-bold flex items-center gap-1">
          <Star className="w-4 h-4" /> {score}
        </span>
      </div>
      
      <div className="text-5xl font-black text-white mb-8">
        {num1} {operator} {num2} = ?
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(opt)}
            className="py-4 px-6 bg-white/10 hover:bg-white/20
                      rounded-2xl text-2xl font-bold text-white
                      border-2 border-white/20 transition-all"
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Игра на скорость
function SpeedGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [target, setTarget] = useState(0)
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isPlaying, setIsPlaying] = useState(true)
  const [score, setScore] = useState(0)
  
  useEffect(() => {
    setTarget(Math.floor(Math.random() * 9) + 1)
  }, [])
  
  useEffect(() => {
    if (!isPlaying) return
    
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false)
          onComplete(score)
          return 0
        }
        return t - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isPlaying, score, onComplete])
  
  const handleClick = () => {
    if (current + 1 === target) {
      setScore(s => s + 5)
      setCurrent(0)
      setTarget(Math.floor(Math.random() * 9) + 1)
    } else {
      setCurrent(c => c + 1)
    }
  }
  
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12)
  
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-white/50">Найди число: <span className="text-2xl font-bold text-yellow-400">{target}</span></span>
        <span className={`font-bold flex items-center gap-1 ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
          <Clock className="w-4 h-4" /> {timeLeft}с
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {numbers.map((num) => (
          <motion.button
            key={num}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500
                      rounded-xl text-2xl font-bold text-white
                      shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            {num}
          </motion.button>
        ))}
      </div>
      
      <p className="text-white/50 mt-4 text-sm">
        Очки: {score}
      </p>
    </div>
  )
}

// Игра на память
function MemoryGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSeq, setPlayerSeq] = useState<number[]>([])
  const [showingSeq, setShowingSeq] = useState(true)
  const [activeTile, setActiveTile] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  
  useEffect(() => {
    // Generate new sequence
    const newSeq = [...sequence, Math.floor(Math.random() * 9)]
    setSequence(newSeq)
    setPlayerSeq([])
    
    // Show sequence
    let idx = 0
    const showInterval = setInterval(() => {
      if (idx < newSeq.length) {
        setActiveTile(newSeq[idx])
        setTimeout(() => setActiveTile(null), 400)
        idx++
      } else {
        setShowingSeq(false)
        clearInterval(showInterval)
      }
    }, 600)
    
    return () => clearInterval(showInterval)
  }, [level])
  
  const handleTileClick = (tile: number) => {
    if (showingSeq) return
    
    const newPlayerSeq = [...playerSeq, tile]
    setPlayerSeq(newPlayerSeq)
    
    // Check if correct
    if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
      // Wrong!
      onComplete(score)
      return
    }
    
    // Check if complete
    if (newPlayerSeq.length === sequence.length) {
      setScore(s => s + level * 10)
      if (level < 10) {
        setLevel(l => l + 1)
        setShowingSeq(true)
      } else {
        onComplete(score + level * 10)
      }
    }
  }
  
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-white/50">Уровень {level}</span>
        <span className="text-yellow-400 font-bold">Очки: {score}</span>
      </div>
      
      {showingSeq ? (
        <p className="text-white mb-4 animate-pulse">Запомни последовательность...</p>
      ) : (
        <p className="text-white mb-4">Повтори последовательность!</p>
      )}
      
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }, (_, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: showingSeq ? 1 : 1.05 }}
            whileTap={{ scale: showingSeq ? 1 : 0.95 }}
            onClick={() => handleTileClick(i)}
            disabled={showingSeq}
            className={`aspect-square rounded-2xl transition-all duration-200
                      ${activeTile === i 
                        ? 'bg-yellow-400 shadow-lg shadow-yellow-500/50' 
                        : 'bg-white/10 hover:bg-white/20 border-2 border-white/20'
                      }`}
          >
            <span className={`text-2xl font-bold ${activeTile === i ? 'text-purple-900' : 'text-white/30'}`}>
              {i + 1}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default function MiniGames() {
  const { addPoints } = useSchool()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  
  const handleGameComplete = (score: number) => {
    setFinalScore(score)
    addPoints(score)
  }
  
  const resetGame = () => {
    setSelectedGame(null)
    setFinalScore(null)
  }
  
  const games = [
    { 
      id: 'math' as GameType, 
      title: 'Математика', 
      emoji: '🧮', 
      description: 'Решай примеры на скорость',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'speed' as GameType, 
      title: 'Скорость', 
      emoji: '⚡', 
      description: 'Находи числа за 30 секунд',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      id: 'memory' as GameType, 
      title: 'Память', 
      emoji: '🧠', 
      description: 'Запоминай последовательности',
      color: 'from-purple-500 to-pink-500'
    },
  ]
  
  return (
    <>
      {/* Кнопка открытия */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed left-4 bottom-40 z-40
                     bg-gradient-to-r from-emerald-500 to-teal-500
                     p-4 rounded-full shadow-lg shadow-emerald-500/30
                     border-2 border-white/20 group"
        >
          <Gamepad2 className="w-6 h-6 text-white" />
          <span className="absolute left-full ml-3 bg-gray-900/90 text-white 
                          px-3 py-2 rounded-lg text-sm whitespace-nowrap
                          opacity-0 group-hover:opacity-100 transition-opacity">
            Мини-игры
          </span>
        </motion.button>
      )}
      
      {/* Модальное окно */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4
                       bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800
                         rounded-3xl max-w-md w-full overflow-hidden
                         shadow-2xl border-2 border-white/10"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/30 rounded-xl">
                      <Gamepad2 className="w-5 h-5 text-emerald-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Мини-игры</h3>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                {!selectedGame && !finalScore ? (
                  /* Game selection */
                  <div className="space-y-3">
                    {games.map((game) => (
                      <motion.button
                        key={game.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedGame(game.id)}
                        className={`w-full p-4 rounded-2xl text-left
                                  bg-gradient-to-r ${game.color}
                                  hover:opacity-90 transition-all
                                  flex items-center gap-4`}
                      >
                        <span className="text-4xl">{game.emoji}</span>
                        <div>
                          <h4 className="text-white font-bold text-lg">{game.title}</h4>
                          <p className="text-white/70 text-sm">{game.description}</p>
                        </div>
                        <Zap className="w-5 h-5 text-white/50 ml-auto" />
                      </motion.button>
                    ))}
                  </div>
                ) : finalScore !== null ? (
                  /* Results */
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                    >
                      <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white mb-2">Игра окончена!</h4>
                    <p className="text-yellow-400 text-3xl font-black mb-4">{finalScore} очков</p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={resetGame}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20
                                  text-white rounded-xl font-medium
                                  flex items-center gap-2"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Заново
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600
                                  text-white rounded-xl font-medium"
                      >
                        Готово
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Game in progress */
                  <div>
                    {selectedGame === 'math' && <MathGame onComplete={handleGameComplete} />}
                    {selectedGame === 'speed' && <SpeedGame onComplete={handleGameComplete} />}
                    {selectedGame === 'memory' && <MemoryGame onComplete={handleGameComplete} />}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
