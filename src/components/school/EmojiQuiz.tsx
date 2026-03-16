'use client'

import { useState, useCallback } from 'react'
import { Smile, Trophy, RotateCcw, Heart, Star, HelpCircle } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface EmojiPuzzle {
  emoji: string
  answer: string
  hint: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const puzzles: EmojiPuzzle[] = [
  // Easy
  { emoji: '🐱', answer: 'КОТ', hint: 'Домашнее животное', category: 'Животные', difficulty: 'easy' },
  { emoji: '🐕', answer: 'СОБАКА', hint: 'Верный друг', category: 'Животные', difficulty: 'easy' },
  { emoji: '🍎', answer: 'ЯБЛОКО', hint: 'Фрукт', category: 'Еда', difficulty: 'easy' },
  { emoji: '🏠', answer: 'ДОМ', hint: 'Жилище', category: 'Здания', difficulty: 'easy' },
  { emoji: '☀️', answer: 'СОЛНЦЕ', hint: 'Светит днём', category: 'Природа', difficulty: 'easy' },
  { emoji: '📚', answer: 'КНИГИ', hint: 'Для чтения', category: 'Школа', difficulty: 'easy' },
  { emoji: '🚗', answer: 'МАШИНА', hint: 'Транспорт', category: 'Транспорт', difficulty: 'easy' },
  { emoji: '⚽', answer: 'МЯЧ', hint: 'Для игры', category: 'Спорт', difficulty: 'easy' },
  // Medium - комбинации
  { emoji: '🐱🐭', answer: 'КОТ И МЫШЬ', hint: 'Игры в прятки', category: 'Фразы', difficulty: 'medium' },
  { emoji: '☀️🌧️', answer: 'СОЛНЦЕ И ДОЖДЬ', hint: 'Погода меняется', category: 'Природа', difficulty: 'medium' },
  { emoji: '📚✏️', answer: 'ШКОЛА', hint: 'Место учёбы', category: 'Школа', difficulty: 'medium' },
  { emoji: '🌙⭐', answer: 'НОЧЬ', hint: 'Тёмное время суток', category: 'Природа', difficulty: 'medium' },
  { emoji: '❄️⛄', answer: 'ЗИМА', hint: 'Холодное время года', category: 'Времена года', difficulty: 'medium' },
  { emoji: '🌸🐝', answer: 'ВЕСНА', hint: 'Тёплое время года', category: 'Времена года', difficulty: 'medium' },
  { emoji: '🏖️🌊', answer: 'МОРЕ', hint: 'Отдых у воды', category: 'Природа', difficulty: 'medium' },
  { emoji: '🚀🌙', answer: 'КОСМОС', hint: 'За атмосферой', category: 'Наука', difficulty: 'medium' },
  // Hard - сложные комбинации и фразы
  { emoji: '👁️👄👁️', answer: 'УДИВЛЕНИЕ', hint: 'Эмоция', category: 'Эмоции', difficulty: 'hard' },
  { emoji: '🧠💡', answer: 'ИДЕЯ', hint: 'Пришла в голову', category: 'Абстрактное', difficulty: 'hard' },
  { emoji: '❤️🔥', answer: 'ЛЮБОВЬ', hint: 'Сильное чувство', category: 'Эмоции', difficulty: 'hard' },
  { emoji: '📚🎓', answer: 'ОБРАЗОВАНИЕ', hint: 'Процесс обучения', category: 'Школа', difficulty: 'hard' },
  { emoji: '🌍🤝', answer: 'ДРУЖБА', hint: 'Международная', category: 'Отношения', difficulty: 'hard' },
  { emoji: '🎭🎬', answer: 'ТЕАТР', hint: 'Искусство', category: 'Культура', difficulty: 'hard' },
  { emoji: '🔬🧬', answer: 'НАУКА', hint: 'Исследование', category: 'Наука', difficulty: 'hard' },
  { emoji: '📱💻', answer: 'ТЕХНОЛОГИИ', hint: 'Современность', category: 'Техника', difficulty: 'hard' },
]

export default function EmojiQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [currentPuzzle, setCurrentPuzzle] = useState<EmojiPuzzle | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lives, setLives] = useState(3)
  const [showHint, setShowHint] = useState(false)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [usedPuzzles, setUsedPuzzles] = useState<Set<number>>(new Set())

  const getNextPuzzle = useCallback(() => {
    const available = puzzles
      .map((p, i) => ({ ...p, index: i }))
      .filter(p => p.difficulty === difficulty && !usedPuzzles.has(p.index))
    
    if (available.length === 0) {
      setUsedPuzzles(new Set())
      return puzzles.filter(p => p.difficulty === difficulty)[Math.floor(Math.random() * puzzles.filter(p => p.difficulty === difficulty).length)]
    }
    
    const chosen = available[Math.floor(Math.random() * available.length)]
    setUsedPuzzles(prev => new Set([...prev, chosen.index]))
    return chosen
  }, [difficulty, usedPuzzles])

  const startGame = useCallback((diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setStreak(0)
    setLives(3)
    setUsedPuzzles(new Set())
    setGameState('playing')
    setShowHint(false)
    setResult(null)
    setUserAnswer('')
    
    const firstPuzzle = puzzles.filter(p => p.difficulty === diff)[Math.floor(Math.random() * puzzles.filter(p => p.difficulty === diff).length)]
    setCurrentPuzzle(firstPuzzle)
  }, [])

  const checkAnswer = useCallback(() => {
    if (!currentPuzzle || !userAnswer.trim()) return
    
    const isCorrect = userAnswer.toUpperCase().trim() === currentPuzzle.answer.toUpperCase()
    
    if (isCorrect) {
      const baseXP = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 18
      const streakBonus = streak >= 2 ? Math.floor(baseXP * 0.25) : 0
      const hintPenalty = showHint ? Math.floor(baseXP * 0.3) : 0
      const finalXP = Math.max(baseXP + streakBonus - hintPenalty, 3)
      
      addXP(finalXP)
      playSound?.('success')
      setScore(s => s + finalXP)
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
      setResult('correct')
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      setStreak(0)
      setLives(l => l - 1)
      setResult('wrong')
    }
    
    setTimeout(() => {
      if (!isCorrect && lives <= 1) {
        setGameState('finished')
      } else {
        const next = getNextPuzzle()
        setCurrentPuzzle(next)
        setUserAnswer('')
        setShowHint(false)
        setResult(null)
      }
    }, 1500)
  }, [currentPuzzle, userAnswer, difficulty, streak, showHint, lives, addXP, playSound, getNextPuzzle])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-amber-900/90 to-yellow-900/90 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30">
        <h2 className="text-2xl font-bold text-amber-200 mb-4 flex items-center gap-2">
          <Smile className="w-6 h-6" />
          Угадай по эмодзи
        </h2>
        <p className="text-amber-100/80 mb-6">
          Угадай слово или фразу по эмодзи! Чем сложнее уровень, тем интереснее загадки.
        </p>
        <div className="flex flex-col gap-3">
          {(['easy', 'medium', 'hard'] as const).map(d => (
            <button
              key={d}
              onClick={() => startGame(d)}
              className={`p-4 rounded-xl text-left transition-all hover:scale-[1.02] ${
                d === 'easy' 
                  ? 'bg-green-500/30 hover:bg-green-500/40 text-green-200'
                  : d === 'medium'
                  ? 'bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-200'
                  : 'bg-red-500/30 hover:bg-red-500/40 text-red-200'
              }`}
            >
              <div className="font-bold flex items-center gap-2">
                <Star className="w-4 h-4" />
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </div>
              <div className="text-sm opacity-70">
                {d === 'easy' ? '1 эмодзи • 8 XP' : 
                 d === 'medium' ? '2 эмодзи • 12 XP' : 
                 'Сложные фразы • 18 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    return (
      <div className="bg-gradient-to-br from-amber-900/90 to-yellow-900/90 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-amber-200 mb-2">Игра окончена!</h2>
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
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-amber-900/90 to-yellow-900/90 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-amber-200 flex items-center gap-2">
          <Smile className="w-5 h-5" />
          Угадай по эмодзи
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${i < lives ? 'text-red-400 fill-red-400' : 'text-gray-600'}`}
              />
            ))}
          </div>
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

      {/* Emoji display */}
      <div className="text-center mb-6">
        <div className="text-6xl md:text-8xl mb-4 animate-bounce">
          {currentPuzzle?.emoji}
        </div>
        <span className="text-amber-300/70 text-sm">Категория: {currentPuzzle?.category}</span>
      </div>

      {/* Result message */}
      {result && (
        <div className={`text-center mb-4 p-3 rounded-lg ${
          result === 'correct' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
        }`}>
          {result === 'correct' ? `✓ Правильно! Это "${currentPuzzle?.answer}"` : `✗ Правильный ответ: "${currentPuzzle?.answer}"`}
        </div>
      )}

      {/* Hint */}
      {showHint && !result && (
        <div className="text-center mb-4 text-amber-300 bg-amber-800/30 rounded-lg p-3">
          💡 Подсказка: {currentPuzzle?.hint}
        </div>
      )}

      {/* Input */}
      {!result && (
        <div className="flex flex-col items-center gap-3 mb-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Введи ответ..."
            className="w-full max-w-xs text-center text-xl font-bold bg-amber-800/50 border-2 border-amber-500/50 rounded-xl p-3 text-amber-100 focus:outline-none focus:border-amber-400"
            autoFocus
          />
        </div>
      )}

      {/* Controls */}
      {!result && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={checkAnswer}
            disabled={!userAnswer.trim()}
            className="px-6 py-2 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Star className="w-4 h-4" />
            Ответить
          </button>
          <button
            onClick={() => setShowHint(true)}
            disabled={showHint}
            className="px-4 py-2 bg-amber-700/50 hover:bg-amber-600/50 text-amber-200 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <HelpCircle className="w-4 h-4" />
            Подсказка
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 flex justify-center gap-4 text-sm text-amber-300/70">
        <span className="text-green-300">✓ {correct}</span>
        <span className="text-red-300">✗ {wrong}</span>
      </div>
    </div>
  )
}
