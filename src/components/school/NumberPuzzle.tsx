'use client'

import { useState } from 'react'
import { Calculator, RotateCcw, Trophy, Lightbulb, Check, X, Home } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

type PuzzleType = 'sequence' | 'missing' | 'equation'

interface Puzzle {
  type: PuzzleType
  question: string
  answer: number
  hint: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const generateSequence = (diff: 'easy' | 'medium' | 'hard'): Puzzle => {
  const start = Math.floor(Math.random() * 10) + 1
  const step = diff === 'easy' ? Math.floor(Math.random() * 3) + 1 : 
                 diff === 'medium' ? Math.floor(Math.random() * 5) + 2 :
                 Math.floor(Math.random() * 10) + 3
  
  const length = diff === 'easy' ? 4 : diff === 'medium' ? 5 : 6
  const sequence: number[] = []
  let current = start
  
  for (let i = 0; i < length; i++) {
    sequence.push(current)
    current += step
  }
  
  const answer = current
  const question = sequence.join(', ') + ', ?'
  
  return {
    type: 'sequence',
    question,
    answer,
    hint: `Каждое число увеличивается на ${step}`,
    difficulty: diff
  }
}

const generateMissing = (diff: 'easy' | 'medium' | 'hard'): Puzzle => {
  const max = diff === 'easy' ? 20 : diff === 'medium' ? 50 : 100
  const a = Math.floor(Math.random() * max) + 1
  const b = Math.floor(Math.random() * max) + 1
  
  const operations = diff === 'easy' ? ['+'] : diff === 'medium' ? ['+', '-'] : ['+', '-', '×']
  const op = operations[Math.floor(Math.random() * operations.length)]
  
  let answer: number, question: string, hint: string
  
  switch (op) {
    case '+':
      answer = a + b
      question = `${a} + ? = ${answer}`
      hint = `${answer} - ${a} = ${b}`
      break
    case '-':
      answer = Math.max(a, b)
      const other = Math.min(a, b)
      question = `${answer} - ? = ${other}`
      hint = `${answer} - ${other} = ${answer - other}`
      break
    case '×':
      answer = a * b
      question = `${a} × ? = ${answer}`
      hint = `${answer} ÷ ${a} = ${b}`
      break
  }
  
  return { type: 'missing', question, answer, hint, difficulty: diff }
}

const generateEquation = (diff: 'easy' | 'medium' | 'hard'): Puzzle => {
  const max = diff === 'easy' ? 10 : diff === 'medium' ? 20 : 30
  const answer = Math.floor(Math.random() * max) + 1
  const b = Math.floor(Math.random() * max) + 1
  const c = answer + b
  
  let question: string, hint: string
  
  if (diff === 'easy') {
    question = `x + ${b} = ${c}`
    hint = `x = ${c} - ${b}`
  } else if (diff === 'medium') {
    const multiplier = Math.floor(Math.random() * 3) + 2
    const newC = answer * multiplier + b
    question = `${multiplier}x + ${b} = ${newC}`
    hint = `${multiplier}x = ${newC} - ${b}, значит x = ${answer}`
  } else {
    const multiplier = Math.floor(Math.random() * 5) + 2
    const subtract = Math.floor(Math.random() * 10) + 1
    const newC = answer * multiplier - subtract
    question = `${multiplier}x - ${subtract} = ${newC}`
    hint = `${multiplier}x = ${newC} + ${subtract}, значит x = ${answer}`
  }
  
  return { type: 'equation', question, answer, hint, difficulty: diff }
}

const generatePuzzle = (diff: 'easy' | 'medium' | 'hard'): Puzzle => {
  const generators = [generateSequence, generateMissing, generateEquation]
  const generator = generators[Math.floor(Math.random() * generators.length)]
  return generator(diff)
}

export default function NumberPuzzle() {
  const { addPoints } = useSchool()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    const newPuzzles = Array.from({ length: 10 }, () => generatePuzzle(diff))
    setPuzzles(newPuzzles)
    setCurrentIndex(0)
    setAnswer('')
    setShowHint(false)
    setIsCorrect(null)
    setCorrectCount(0)
    setHintsUsed(0)
    setGameState('playing')
  }

  const checkAnswer = () => {
    const current = puzzles[currentIndex]
    const correct = parseInt(answer) === current.answer
    setIsCorrect(correct)
    
    if (correct) {
      setCorrectCount(c => c + 1)
    }
  }

  const nextPuzzle = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(i => i + 1)
      setAnswer('')
      setShowHint(false)
      setIsCorrect(null)
    } else {
      const points = correctCount * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20)
      addPoints(points)
      setGameState('result')
    }
  }

  const useHint = () => {
    setShowHint(true)
    setHintsUsed(h => h + 1)
  }

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 
        border-2 border-emerald-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
            <Calculator className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Числовые головоломки</h2>
          <p className="text-white/60 text-sm mt-1">Реши 10 головоломок подряд!</p>
        </div>

        <div className="space-y-3">
          {(['easy', 'medium', 'hard'] as const).map(diff => {
            const colors = {
              easy: 'from-green-500 to-emerald-500',
              medium: 'from-yellow-500 to-orange-500',
              hard: 'from-red-500 to-rose-500'
            }
            const labels = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' }
            
            return (
              <button
                key={diff}
                onClick={() => startGame(diff)}
                className={`w-full p-4 rounded-2xl bg-gradient-to-r ${colors[diff]} text-white 
                  font-bold text-lg hover:scale-[1.02] transition-transform`}
              >
                {labels[diff]}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    const accuracy = Math.round((correctCount / puzzles.length) * 100)
    const points = correctCount * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20)
    
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 
        border-2 border-emerald-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {accuracy === 100 ? 'Идеально! 🌟' : accuracy >= 80 ? 'Отлично! 🎉' : 'Хорошо! 👍'}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-green-400">{correctCount}/{puzzles.length}</div>
            <div className="text-sm text-white/60">Правильно</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-yellow-400">+{points}</div>
            <div className="text-sm text-white/60">Очки</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => startGame(difficulty)}
            className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl 
              font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Ещё раз
          </button>
          <button
            onClick={() => setGameState('menu')}
            className="px-6 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  const currentPuzzle = puzzles[currentIndex]

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 
      border-2 border-emerald-400/30 backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-400" />
          <span className="text-white font-medium">Головоломка {currentIndex + 1}/{puzzles.length}</span>
        </div>
        <div className="text-emerald-400 font-bold">{correctCount} ✓</div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-4">
        {puzzles.map((_, i) => (
          <div 
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < currentIndex ? 'bg-green-500' :
              i === currentIndex ? 'bg-emerald-500' :
              'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="p-6 rounded-2xl bg-white/10 mb-4">
        <div className="text-white/60 text-xs uppercase tracking-wide mb-2">
          {currentPuzzle.type === 'sequence' ? 'Последовательность' :
           currentPuzzle.type === 'missing' ? 'Пропущенное число' :
           'Уравнение'}
        </div>
        <div className="text-2xl font-bold text-white text-center">
          {currentPuzzle.question}
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="p-4 rounded-2xl bg-yellow-500/20 border border-yellow-400/30 mb-4">
          <div className="flex items-center gap-2 text-yellow-300">
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm">{currentPuzzle.hint}</span>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Твой ответ..."
          disabled={isCorrect !== null}
          className="flex-1 p-4 rounded-2xl bg-white/10 text-white text-xl font-bold
            border-2 border-white/20 focus:border-emerald-400 focus:outline-none
            placeholder:text-white/30 text-center"
        />
        {isCorrect === null ? (
          <>
            <button
              onClick={checkAnswer}
              disabled={!answer}
              className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl 
                font-bold disabled:opacity-50"
            >
              <Check className="w-6 h-6" />
            </button>
            {!showHint && (
              <button
                onClick={useHint}
                className="px-4 py-4 bg-yellow-500/20 text-yellow-400 rounded-2xl hover:bg-yellow-500/30"
              >
                <Lightbulb className="w-5 h-5" />
              </button>
            )}
          </>
        ) : (
          <div className={`px-6 py-4 rounded-2xl ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {isCorrect ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
          </div>
        )}
      </div>

      {/* Result */}
      {isCorrect !== null && (
        <div className={`p-4 rounded-2xl mb-4 ${
          isCorrect ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
        }`}>
          {isCorrect ? (
            <div className="flex items-center gap-2 font-bold">
              <Check className="w-5 h-5" />
              Правильно! Ответ: {currentPuzzle.answer}
            </div>
          ) : (
            <div className="flex items-center gap-2 font-bold">
              <X className="w-5 h-5" />
              Неверно. Правильный ответ: {currentPuzzle.answer}
            </div>
          )}
        </div>
      )}

      {/* Next button */}
      {isCorrect !== null && (
        <button
          onClick={nextPuzzle}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl 
            font-bold text-lg hover:scale-[1.02] transition-transform"
        >
          {currentIndex < puzzles.length - 1 ? 'Следующая →' : 'Результаты'}
        </button>
      )}

      {/* Stats */}
      <div className="mt-4 flex justify-center gap-4 text-sm text-white/60">
        <span>Подсказок: {hintsUsed}</span>
      </div>
    </div>
  )
}
