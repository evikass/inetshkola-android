'use client'

import { useState } from 'react'
import { GameLesson } from '@/data/types'
import { 
  ChevronLeft, 
  Star, 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  Trophy,
  RefreshCw,
  ArrowRight
} from 'lucide-react'

interface GamePlayerProps {
  game: GameLesson
  onBack: () => void
  onComplete: (stars: number) => void
}

type GameResult = 'none' | 'correct' | 'wrong'

export default function GamePlayer({ game, onBack, onComplete }: GamePlayerProps) {
  const [currentTask, setCurrentTask] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [result, setResult] = useState<GameResult>('none')
  const [showHint, setShowHint] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [orderedItems, setOrderedItems] = useState<string[]>(() => {
    const firstTask = game.tasks[0]
    if (firstTask?.type === 'order' && firstTask.options) {
      return [...firstTask.options].sort(() => Math.random() - 0.5)
    }
    return []
  })
  const [filledAnswer, setFilledAnswer] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const task = game.tasks[currentTask]
  const progress = ((currentTask) / game.tasks.length) * 100

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    const isCorrect = answer === task.correctAnswer
    setResult(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowHint(false)
  }

  const handleFillAnswer = () => {
    const isCorrect = filledAnswer.toUpperCase() === (task.correctAnswer as string).toUpperCase()
    setSelectedAnswer(filledAnswer)
    setResult(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowHint(false)
  }

  const handleFindAnswer = (item: string) => {
    const newSelected = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item]
    setSelectedItems(newSelected)
  }

  const checkFindAnswer = () => {
    const correct = task.correctAnswer as string[]
    const isCorrect = 
      correct.length === selectedItems.length &&
      correct.every(item => selectedItems.includes(item))
    setSelectedAnswer(selectedItems.join(', '))
    setResult(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowHint(false)
  }

  const handleOrderMove = (index: number, direction: 'up' | 'down') => {
    const newItems = [...orderedItems]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < newItems.length) {
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]]
      setOrderedItems(newItems)
    }
  }

  const checkOrderAnswer = () => {
    const isCorrect = orderedItems.join(', ') === (task.correctAnswer as string)
    setSelectedAnswer(orderedItems.join(', '))
    setResult(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowHint(false)
  }

  const nextTask = () => {
    if (currentTask < game.tasks.length - 1) {
      setCurrentTask(currentTask + 1)
      setSelectedAnswer(null)
      setResult('none')
      setShowHint(false)
      setFilledAnswer('')
      setSelectedItems([])
      if (game.tasks[currentTask + 1].type === 'order' && game.tasks[currentTask + 1].options) {
        setOrderedItems([...game.tasks[currentTask + 1].options!].sort(() => Math.random() - 0.5))
      }
    } else {
      setGameFinished(true)
      const stars = score >= game.tasks.length * 0.9 ? 3 : score >= game.tasks.length * 0.6 ? 2 : 1
      onComplete(stars)
    }
  }

  const restartGame = () => {
    setCurrentTask(0)
    setScore(0)
    setSelectedAnswer(null)
    setResult('none')
    setShowHint(false)
    setGameFinished(false)
    setFilledAnswer('')
    setSelectedItems([])
    const firstTask = game.tasks[0]
    if (firstTask?.type === 'order' && firstTask.options) {
      setOrderedItems([...firstTask.options].sort(() => Math.random() - 0.5))
    }
  }

  // Game finished screen
  if (gameFinished) {
    const stars = score >= game.tasks.length * 0.9 ? 3 : score >= game.tasks.length * 0.6 ? 2 : 1
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 text-center max-w-md w-full border border-slate-700/50 shadow-2xl">
          <div className="mb-6">
            <Trophy className="w-20 h-20 mx-auto text-yellow-400 animate-bounce" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            {stars === 3 ? 'Отлично!' : stars === 2 ? 'Хорошо!' : 'Попробуй ещё!'}
          </h2>
          
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((star) => (
              <Star 
                key={star}
                className={`w-12 h-12 transition-all duration-300 ${
                  star <= stars 
                    ? 'text-yellow-400 fill-yellow-400 scale-110' 
                    : 'text-slate-600'
                }`}
                style={{ animationDelay: `${star * 0.2}s` }}
              />
            ))}
          </div>
          
          <p className="text-slate-300 mb-2">
            Правильных ответов: {score} из {game.tasks.length}
          </p>
          
          <p className="text-purple-300 text-lg mb-8">
            {game.reward.message}
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={restartGame}
              className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Ещё раз
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 rounded-xl text-white transition-opacity"
            >
              К урокам
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Назад к урокам</span>
      </button>

      {/* Game header */}
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{game.title}</h2>
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-bold text-yellow-400">{score}/{game.tasks.length}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-slate-400 text-sm mt-2">Задание {currentTask + 1} из {game.tasks.length}</p>
      </div>

      {/* Task content */}
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">{task.question}</h3>
          
          {/* Hint button */}
          {result === 'none' && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Lightbulb className="w-5 h-5" />
              Показать подсказку
            </button>
          )}
          
          {showHint && (
            <div className="mt-3 p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
              <p className="text-purple-300 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                {task.hint}
              </p>
            </div>
          )}
        </div>

        {/* Quiz type */}
        {task.type === 'quiz' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {task.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => result === 'none' && handleAnswer(option)}
                disabled={result !== 'none'}
                className={`p-4 rounded-xl text-lg font-medium transition-all ${
                  result !== 'none' && option === task.correctAnswer
                    ? 'bg-green-500/30 border-2 border-green-500 text-green-300'
                    : result !== 'none' && selectedAnswer === option && option !== task.correctAnswer
                    ? 'bg-red-500/30 border-2 border-red-500 text-red-300'
                    : result === 'none'
                    ? 'bg-slate-700/50 hover:bg-slate-600/50 border-2 border-slate-600 hover:border-purple-500 text-white'
                    : 'bg-slate-700/50 border-2 border-slate-600 text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Find type */}
        {task.type === 'find' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {task.options?.map((option, index) => {
                const isSelected = selectedItems.includes(option)
                const isCorrect = (task.correctAnswer as string[]).includes(option)
                return (
                  <button
                    key={index}
                    onClick={() => result === 'none' && handleFindAnswer(option)}
                    disabled={result !== 'none'}
                    className={`px-5 py-3 rounded-xl text-lg font-medium transition-all ${
                      result !== 'none'
                        ? isCorrect
                          ? 'bg-green-500/30 border-2 border-green-500 text-green-300'
                          : isSelected && !isCorrect
                          ? 'bg-red-500/30 border-2 border-red-500 text-red-300'
                          : 'bg-slate-700/50 border-2 border-slate-600 text-slate-400'
                        : isSelected
                        ? 'bg-purple-500/30 border-2 border-purple-500 text-white'
                        : 'bg-slate-700/50 hover:bg-slate-600/50 border-2 border-slate-600 hover:border-purple-500 text-white'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {result === 'none' && (
              <button
                onClick={checkFindAnswer}
                disabled={selectedItems.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-opacity"
              >
                Проверить ответ
              </button>
            )}
          </div>
        )}

        {/* Fill type */}
        {task.type === 'fill' && (
          <div className="space-y-4">
            <input
              type="text"
              value={filledAnswer}
              onChange={(e) => setFilledAnswer(e.target.value)}
              disabled={result !== 'none'}
              placeholder="Введи букву или число..."
              className="w-full p-4 bg-slate-700/50 border-2 border-slate-600 rounded-xl text-white text-xl text-center placeholder-slate-500 focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
            {result === 'none' && (
              <button
                onClick={handleFillAnswer}
                disabled={!filledAnswer}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-opacity"
              >
                Проверить ответ
              </button>
            )}
            {result !== 'none' && (
              <div className={`p-4 rounded-xl ${
                result === 'correct' 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-red-500/20 border border-red-500/30'
              }`}>
                <p className={result === 'correct' ? 'text-green-300' : 'text-red-300'}>
                  Правильный ответ: {task.correctAnswer}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Match type */}
        {task.type === 'match' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {task.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => result === 'none' && handleAnswer(option)}
                disabled={result !== 'none'}
                className={`p-4 rounded-xl text-lg font-medium transition-all ${
                  result !== 'none' && option === task.correctAnswer
                    ? 'bg-green-500/30 border-2 border-green-500 text-green-300'
                    : result !== 'none' && selectedAnswer === option && option !== task.correctAnswer
                    ? 'bg-red-500/30 border-2 border-red-500 text-red-300'
                    : result === 'none'
                    ? 'bg-slate-700/50 hover:bg-slate-600/50 border-2 border-slate-600 hover:border-purple-500 text-white'
                    : 'bg-slate-700/50 border-2 border-slate-600 text-slate-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Order type */}
        {task.type === 'order' && (
          <div className="space-y-4">
            <div className="space-y-2">
              {orderedItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-slate-700/50 rounded-xl overflow-hidden"
                >
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleOrderMove(index, 'up')}
                      disabled={result !== 'none' || index === 0}
                      className="p-2 hover:bg-slate-600 disabled:opacity-30"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleOrderMove(index, 'down')}
                      disabled={result !== 'none' || index === orderedItems.length - 1}
                      className="p-2 hover:bg-slate-600 disabled:opacity-30"
                    >
                      ▼
                    </button>
                  </div>
                  <span className="flex-1 p-4 text-white text-lg">{item}</span>
                  <span className="px-4 py-2 bg-slate-600 text-slate-300 rounded-lg m-2">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
            {result === 'none' && (
              <button
                onClick={checkOrderAnswer}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 rounded-xl text-white font-medium transition-opacity"
              >
                Проверить порядок
              </button>
            )}
          </div>
        )}

        {/* Result feedback */}
        {result !== 'none' && (
          <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
            result === 'correct' 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-red-500/20 border border-red-500/30'
          }`}>
            {result === 'correct' ? (
              <>
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-green-300 font-semibold">Правильно!</p>
                  <p className="text-green-200 text-sm">Отличная работа!</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8 text-red-400" />
                <div>
                  <p className="text-red-300 font-semibold">Неправильно</p>
                  <p className="text-red-200 text-sm">Правильный ответ: {Array.isArray(task.correctAnswer) ? task.correctAnswer.join(', ') : task.correctAnswer}</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Next button */}
        {result !== 'none' && (
          <button
            onClick={nextTask}
            className="mt-6 w-full py-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 rounded-xl text-white font-medium text-lg transition-opacity flex items-center justify-center gap-2"
          >
            {currentTask < game.tasks.length - 1 ? (
              <>
                Следующее задание
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Завершить игру
                <Trophy className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
