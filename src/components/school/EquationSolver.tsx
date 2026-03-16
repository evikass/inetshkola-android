'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import useSound from '@/hooks/useSound'
import { Calculator, RotateCcw, Trophy, Zap, Target, Lightbulb } from 'lucide-react'

interface Equation {
  equation: string
  answer: number
  variable: string
  difficulty: 'easy' | 'medium' | 'hard'
  hint: string
  solution: string
}

const EQUATIONS: Equation[] = [
  // Лёгкий уровень - сложение/вычитание
  { equation: 'x + 5 = 12', answer: 7, variable: 'x', difficulty: 'easy', hint: 'Вычти 5 из обеих частей', solution: 'x = 12 - 5 = 7' },
  { equation: 'x + 3 = 10', answer: 7, variable: 'x', difficulty: 'easy', hint: 'Вычти 3 из обеих частей', solution: 'x = 10 - 3 = 7' },
  { equation: 'x + 8 = 15', answer: 7, variable: 'x', difficulty: 'easy', hint: 'Вычти 8 из обеих частей', solution: 'x = 15 - 8 = 7' },
  { equation: 'x - 4 = 6', answer: 10, variable: 'x', difficulty: 'easy', hint: 'Прибавь 4 к обеим частям', solution: 'x = 6 + 4 = 10' },
  { equation: 'x - 7 = 3', answer: 10, variable: 'x', difficulty: 'easy', hint: 'Прибавь 7 к обеим частям', solution: 'x = 3 + 7 = 10' },
  { equation: 'x - 2 = 8', answer: 10, variable: 'x', difficulty: 'easy', hint: 'Прибавь 2 к обеим частям', solution: 'x = 8 + 2 = 10' },
  { equation: '5 + x = 13', answer: 8, variable: 'x', difficulty: 'easy', hint: 'Вычти 5 из обеих частей', solution: 'x = 13 - 5 = 8' },
  { equation: '12 - x = 5', answer: 7, variable: 'x', difficulty: 'easy', hint: 'x = 12 - 5', solution: 'x = 12 - 5 = 7' },
  { equation: 'x + 10 = 25', answer: 15, variable: 'x', difficulty: 'easy', hint: 'Вычти 10 из обеих частей', solution: 'x = 25 - 10 = 15' },
  { equation: 'x - 15 = 5', answer: 20, variable: 'x', difficulty: 'easy', hint: 'Прибавь 15 к обеим частям', solution: 'x = 5 + 15 = 20' },
  
  // Средний уровень - умножение/деление
  { equation: '2x = 14', answer: 7, variable: 'x', difficulty: 'medium', hint: 'Раздели обе части на 2', solution: 'x = 14 ÷ 2 = 7' },
  { equation: '3x = 21', answer: 7, variable: 'x', difficulty: 'medium', hint: 'Раздели обе части на 3', solution: 'x = 21 ÷ 3 = 7' },
  { equation: '4x = 32', answer: 8, variable: 'x', difficulty: 'medium', hint: 'Раздели обе части на 4', solution: 'x = 32 ÷ 4 = 8' },
  { equation: 'x ÷ 5 = 4', answer: 20, variable: 'x', difficulty: 'medium', hint: 'Умножь обе части на 5', solution: 'x = 4 × 5 = 20' },
  { equation: 'x ÷ 3 = 9', answer: 27, variable: 'x', difficulty: 'medium', hint: 'Умножь обе части на 3', solution: 'x = 9 × 3 = 27' },
  { equation: 'x ÷ 7 = 6', answer: 42, variable: 'x', difficulty: 'medium', hint: 'Умножь обе части на 7', solution: 'x = 6 × 7 = 42' },
  { equation: '2x + 4 = 14', answer: 5, variable: 'x', difficulty: 'medium', hint: 'Сначала вычти 4, потом раздели на 2', solution: '2x = 10, x = 5' },
  { equation: '3x - 6 = 15', answer: 7, variable: 'x', difficulty: 'medium', hint: 'Сначала прибавь 6, потом раздели на 3', solution: '3x = 21, x = 7' },
  { equation: '5x + 5 = 30', answer: 5, variable: 'x', difficulty: 'medium', hint: 'Сначала вычти 5, потом раздели на 5', solution: '5x = 25, x = 5' },
  { equation: '4x - 8 = 20', answer: 7, variable: 'x', difficulty: 'medium', hint: 'Сначала прибавь 8, потом раздели на 4', solution: '4x = 28, x = 7' },
  
  // Сложный уровень - комбинированные
  { equation: '2x + 7 = 19', answer: 6, variable: 'x', difficulty: 'hard', hint: 'Вычти 7, раздели на 2', solution: '2x = 12, x = 6' },
  { equation: '3x - 5 = 16', answer: 7, variable: 'x', difficulty: 'hard', hint: 'Прибавь 5, раздели на 3', solution: '3x = 21, x = 7' },
  { equation: '4x + 12 = 36', answer: 6, variable: 'x', difficulty: 'hard', hint: 'Вычти 12, раздели на 4', solution: '4x = 24, x = 6' },
  { equation: '5x - 15 = 25', answer: 8, variable: 'x', difficulty: 'hard', hint: 'Прибавь 15, раздели на 5', solution: '5x = 40, x = 8' },
  { equation: 'x/2 + 3 = 8', answer: 10, variable: 'x', difficulty: 'hard', hint: 'Вычти 3, умножь на 2', solution: 'x/2 = 5, x = 10' },
  { equation: 'x/3 - 2 = 4', answer: 18, variable: 'x', difficulty: 'hard', hint: 'Прибавь 2, умножь на 3', solution: 'x/3 = 6, x = 18' },
  { equation: '2(x + 3) = 16', answer: 5, variable: 'x', difficulty: 'hard', hint: 'Раздели на 2, вычти 3', solution: 'x + 3 = 8, x = 5' },
  { equation: '3(x - 2) = 15', answer: 7, variable: 'x', difficulty: 'hard', hint: 'Раздели на 3, прибавь 2', solution: 'x - 2 = 5, x = 7' },
  { equation: 'x + 2x = 18', answer: 6, variable: 'x', difficulty: 'hard', hint: 'Сложи подобные члены: 3x = 18', solution: '3x = 18, x = 6' },
  { equation: '2x + x + 3 = 15', answer: 4, variable: 'x', difficulty: 'hard', hint: '3x + 3 = 15', solution: '3x = 12, x = 4' },
  { equation: '10 - 2x = 4', answer: 3, variable: 'x', difficulty: 'hard', hint: '2x = 10 - 4', solution: '2x = 6, x = 3' },
  { equation: '7 + 3x = 25', answer: 6, variable: 'x', difficulty: 'hard', hint: '3x = 25 - 7', solution: '3x = 18, x = 6' },
  { equation: 'x/4 + 5 = 9', answer: 16, variable: 'x', difficulty: 'hard', hint: 'x/4 = 4', solution: 'x = 16' },
  { equation: '6x - 18 = 24', answer: 7, variable: 'x', difficulty: 'hard', hint: '6x = 42', solution: 'x = 7' },
]

export default function EquationSolver() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  const [currentEquation, setCurrentEquation] = useState<Equation | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [questionsUsed, setQuestionsUsed] = useState<Set<number>>(new Set())
  const [mode, setMode] = useState<'menu' | 'game'>('menu')
  const [showHint, setShowHint] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [timer, setTimer] = useState(0)
  const [questionStart, setQuestionStart] = useState(0)

  const getFilteredEquations = useCallback(() => {
    return EQUATIONS.filter(e => e.difficulty === difficulty)
  }, [difficulty])

  const getNextEquation = useCallback(() => {
    const filtered = getFilteredEquations()
    const available = filtered
      .map((e, i) => ({ e, originalIndex: EQUATIONS.indexOf(e) }))
      .filter(item => !questionsUsed.has(item.originalIndex))
    
    if (available.length === 0) {
      setGameOver(true)
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    return available[randomIndex].e
  }, [getFilteredEquations, questionsUsed])

  useEffect(() => {
    if (mode === 'game' && !currentEquation && !gameOver) {
      const e = getNextEquation()
      if (e) setCurrentEquation(e)
    }
  }, [mode, currentEquation, gameOver, getNextEquation])

  useEffect(() => {
    if (mode === 'game' && !showResult) {
      const interval = setInterval(() => {
        setTimer(Math.floor((Date.now() - questionStart) / 1000))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [mode, showResult, questionStart])

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    setScore(0)
    setStreak(0)
    setTotalQuestions(0)
    setHintsUsed(0)
    setQuestionsUsed(new Set())
    setGameOver(false)
    setUserAnswer('')
    setShowResult(false)
    setShowHint(false)
    setMode('game')
    setQuestionStart(Date.now())
    setTimer(0)
    const filtered = EQUATIONS.filter(e => e.difficulty === diff)
    const randomIndex = Math.floor(Math.random() * filtered.length)
    setCurrentEquation(filtered[randomIndex])
    setQuestionsUsed(new Set([EQUATIONS.indexOf(filtered[randomIndex])]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentEquation || showResult) return
    
    const answer = parseFloat(userAnswer)
    if (isNaN(answer)) return
    
    setShowResult(true)
    setTotalQuestions(prev => prev + 1)
    
    const correct = answer === currentEquation.answer
    setIsCorrect(correct)
    
    if (correct) {
      playSound('correct')
      const newStreak = streak + 1
      setStreak(newStreak)
      const timeBonus = Math.max(0, 10 - timer)
      const streakBonus = Math.floor(newStreak / 3) * 2
      const hintPenalty = hintsUsed * 2
      const xp = Math.max(5, 10 + timeBonus + streakBonus - hintPenalty)
      setScore(prev => prev + xp)
      addXP(xp)
    } else {
      playSound('wrong')
      setStreak(0)
    }
    
    setTimeout(() => {
      const originalIndex = EQUATIONS.indexOf(currentEquation)
      const newUsed = new Set(questionsUsed).add(originalIndex)
      setQuestionsUsed(newUsed)
      setUserAnswer('')
      setShowResult(false)
      setShowHint(false)
      setHintsUsed(0)
      setQuestionStart(Date.now())
      setTimer(0)
      
      const filtered = EQUATIONS.filter(e => e.difficulty === difficulty)
      const available = filtered.filter(e => !newUsed.has(EQUATIONS.indexOf(e)))
      
      if (available.length === 0) {
        setGameOver(true)
      } else {
        const nextE = available[Math.floor(Math.random() * available.length)]
        setCurrentEquation(nextE)
      }
    }, 2500)
  }

  const useHint = () => {
    if (!showHint) {
      setShowHint(true)
      setHintsUsed(prev => prev + 1)
    }
  }

  const resetGame = () => {
    setMode('menu')
    setCurrentEquation(null)
    setGameOver(false)
  }

  if (mode === 'menu') {
    return (
      <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl p-6 backdrop-blur-sm border border-indigo-500/30">
        <h2 className="text-2xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
          <Calculator className="w-7 h-7" />
          Уравнения
        </h2>
        
        <p className="text-indigo-200 mb-6">
          Решайте уравнения и находите неизвестное! Начните с простых и переходите к сложным.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => startGame(diff)}
              className={`p-4 rounded-xl font-bold transition-all hover:scale-105 ${
                diff === 'easy' 
                  ? 'bg-green-500/20 border-green-500/50 hover:bg-green-500/30 text-green-300' 
                  : diff === 'medium'
                    ? 'bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/30 text-yellow-300'
                    : 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30 text-red-300'
              } border`}
            >
              {diff === 'easy' ? 'Легко' : diff === 'medium' ? 'Средне' : 'Сложно'}
              <div className="text-xs opacity-75 mt-1">
                {diff === 'easy' ? 'x + 5 = 10' : diff === 'medium' ? '2x + 4 = 14' : '2(x + 3) = 16'}
              </div>
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Target className="w-6 h-6 mx-auto text-indigo-400 mb-1" />
            <div className="text-xs text-indigo-200">Найди x</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Lightbulb className="w-6 h-6 mx-auto text-yellow-400 mb-1" />
            <div className="text-xs text-indigo-200">Подсказки</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Zap className="w-6 h-6 mx-auto text-orange-400 mb-1" />
            <div className="text-xs text-indigo-200">Бонус за скорость</div>
          </div>
        </div>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl p-6 backdrop-blur-sm border border-indigo-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-indigo-300 mb-2">Отлично!</h2>
        <p className="text-indigo-200 mb-4">
          Результат: {score} XP за {totalQuestions} уравнений
        </p>
        <p className="text-sm text-indigo-300 mb-4">
          Подсказок использовано: {hintsUsed}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => startGame(difficulty)}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-bold text-white transition-colors"
          >
            Ещё раз
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-indigo-200 transition-colors"
          >
            Меню
          </button>
        </div>
      </div>
    )
  }

  if (!currentEquation) return null

  return (
    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl p-6 backdrop-blur-sm border border-indigo-500/30">
      <div className="flex justify-between items-center mb-4">
        <div className="text-indigo-300 text-sm">
          {timer} сек
        </div>
        <div className="flex items-center gap-4">
          <span className="text-indigo-300">Серия: {streak}🔥</span>
          <span className="text-indigo-300">Очки: {score}</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 mb-6 text-center">
        <p className="text-3xl font-mono text-white mb-2">
          {currentEquation.equation}
        </p>
        <p className="text-indigo-300 text-sm">
          Найдите значение {currentEquation.variable}
        </p>
      </div>

      {showHint && (
        <div className="bg-yellow-500/20 rounded-lg p-3 mb-4 text-yellow-300 text-sm">
          💡 {currentEquation.hint}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={`${currentEquation.variable} = `}
            className="flex-1 bg-white/10 border border-indigo-500/30 rounded-xl px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-400 text-xl text-center"
            step="any"
            autoFocus
          />
          <button
            type="submit"
            disabled={!userAnswer || showResult}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-500/50 rounded-xl font-bold text-white transition-colors"
          >
            OK
          </button>
        </div>
      </form>

      {!showResult && !showHint && (
        <button
          onClick={useHint}
          className="mt-4 w-full py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-300 text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Lightbulb className="w-4 h-4" />
          Подсказка (-2 XP)
        </button>
      )}

      {showResult && (
        <div className={`mt-4 p-4 rounded-lg ${
          isCorrect
            ? 'bg-green-500/20 text-green-300'
            : 'bg-red-500/20 text-red-300'
        }`}>
          <p className="font-bold mb-1">
            {isCorrect ? '✅ Правильно!' : `❌ Неправильно. Ответ: ${currentEquation.answer}`}
          </p>
          <p className="text-sm opacity-75">
            {currentEquation.solution}
          </p>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-indigo-400">
          Уравнение {totalQuestions + 1} из {getFilteredEquations().length}
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Меню
        </button>
      </div>
    </div>
  )
}
