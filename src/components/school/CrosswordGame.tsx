'use client'

import { useState, useCallback } from 'react'
import { Grid3X3, Check, RotateCcw, Lightbulb, Trophy } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface CrosswordCell {
  letter: string
  isRevealed: boolean
  number: number | null
  across: string | null
  down: string | null
}

interface CrosswordPuzzle {
  grid: CrosswordCell[][]
  words: { word: string; clue: string; direction: 'across' | 'down'; row: number; col: number; number: number }[]
  size: number
  difficulty: 'easy' | 'medium' | 'hard'
}

const puzzles: CrosswordPuzzle[] = [
  {
    size: 5,
    difficulty: 'easy',
    grid: [
      [{ letter: 'К', isRevealed: false, number: 1, across: 'Домашнее животное', down: null }, { letter: 'О', isRevealed: false, number: null, across: null, down: null }, { letter: 'Т', isRevealed: false, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: 'Н', isRevealed: false, number: 2, across: null, down: 'Время года' }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: 'И', isRevealed: false, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: 'Г', isRevealed: false, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: 'А', isRevealed: false, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
    ],
    words: [
      { word: 'КОТ', clue: 'Домашнее животное', direction: 'across', row: 0, col: 0, number: 1 },
      { word: 'НИГА', clue: 'Время года (зима, весна, лето, осень - это ...?)', direction: 'down', row: 0, col: 0, number: 2 },
    ]
  },
  {
    size: 7,
    difficulty: 'medium',
    grid: [
      [{ letter: 'Ш', isRevealed: false, number: 1, across: 'Учебное заведение', down: null }, { letter: 'К', isRevealed: false, number: null, across: null, down: null }, { letter: 'О', isRevealed: false, number: null, across: null, down: null }, { letter: 'Л', isRevealed: false, number: null, across: null, down: null }, { letter: 'А', isRevealed: false, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: 'К', isRevealed: false, number: 2, across: null, down: 'Предмет для чтения' }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: 'Н', isRevealed: false, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: 'И', isRevealed: false, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: 'Г', isRevealed: false, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: 'А', isRevealed: false, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
      [{ letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }, { letter: '', isRevealed: true, number: null, across: null, down: null }],
    ],
    words: [
      { word: 'ШКОЛА', clue: 'Учебное заведение', direction: 'across', row: 0, col: 0, number: 1 },
      { word: 'КНИГА', clue: 'Предмет для чтения', direction: 'down', row: 0, col: 0, number: 2 },
    ]
  }
]

export default function CrosswordGame() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [selectedPuzzle, setSelectedPuzzle] = useState<CrosswordPuzzle | null>(null)
  const [userGrid, setUserGrid] = useState<string[][]>([])
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [completed, setCompleted] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)

  const startPuzzle = useCallback((puzzle: CrosswordPuzzle) => {
    setSelectedPuzzle(puzzle)
    setUserGrid(Array(puzzle.size).fill(null).map(() => Array(puzzle.size).fill('')))
    setSelectedCell(null)
    setCompleted(false)
    setHintsUsed(0)
  }, [])

  const handleCellClick = useCallback((row: number, col: number) => {
    if (!selectedPuzzle?.grid[row][col].letter) return
    setSelectedCell({ row, col })
  }, [selectedPuzzle])

  const handleInputChange = useCallback((row: number, col: number, value: string) => {
    if (!selectedPuzzle) return
    const upperValue = value.slice(-1).toUpperCase()
    setUserGrid(prev => {
      const newGrid = [...prev]
      newGrid[row] = [...newGrid[row]]
      newGrid[row][col] = upperValue
      return newGrid
    })
  }, [selectedPuzzle])

  const checkSolution = useCallback(() => {
    if (!selectedPuzzle) return
    
    let allCorrect = true
    for (let row = 0; row < selectedPuzzle.size; row++) {
      for (let col = 0; col < selectedPuzzle.size; col++) {
        const cell = selectedPuzzle.grid[row][col]
        if (cell.letter && userGrid[row]?.[col] !== cell.letter) {
          allCorrect = false
          break
        }
      }
      if (!allCorrect) break
    }
    
    if (allCorrect) {
      const baseXP = selectedPuzzle.difficulty === 'easy' ? 15 : selectedPuzzle.difficulty === 'medium' ? 25 : 40
      const hintPenalty = hintsUsed * 5
      const finalXP = Math.max(baseXP - hintPenalty, 5)
      addXP(finalXP)
      playSound?.('success')
      setCompleted(true)
    } else {
      playSound?.('error')
    }
  }, [selectedPuzzle, userGrid, hintsUsed, addXP, playSound])

  const revealHint = useCallback(() => {
    if (!selectedPuzzle || !selectedCell) return
    const { row, col } = selectedCell
    const cell = selectedPuzzle.grid[row][col]
    if (cell.letter && userGrid[row]?.[col] !== cell.letter) {
      setUserGrid(prev => {
        const newGrid = [...prev]
        newGrid[row] = [...newGrid[row]]
        newGrid[row][col] = cell.letter
        return newGrid
      })
      setHintsUsed(h => h + 1)
    }
  }, [selectedPuzzle, selectedCell, userGrid, hintsUsed])

  const resetPuzzle = useCallback(() => {
    if (!selectedPuzzle) return
    setUserGrid(Array(selectedPuzzle.size).fill(null).map(() => Array(selectedPuzzle.size).fill('')))
    setSelectedCell(null)
    setCompleted(false)
    setHintsUsed(0)
  }, [selectedPuzzle])

  if (!selectedPuzzle) {
    return (
      <div className="bg-gradient-to-br from-indigo-900/90 to-blue-900/90 rounded-2xl p-6 backdrop-blur-sm border border-indigo-500/30">
        <h2 className="text-2xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
          <Grid3X3 className="w-6 h-6" />
          Кроссворд
        </h2>
        <p className="text-indigo-100/80 mb-6">
          Разгадай кроссворд! Выбери уровень сложности:
        </p>
        <div className="flex flex-col gap-3">
          {puzzles.map((puzzle, index) => (
            <button
              key={index}
              onClick={() => startPuzzle(puzzle)}
              className={`p-4 rounded-xl text-left transition-all hover:scale-[1.02] ${
                puzzle.difficulty === 'easy' 
                  ? 'bg-green-500/30 hover:bg-green-500/40 text-green-200'
                  : puzzle.difficulty === 'medium'
                  ? 'bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-200'
                  : 'bg-red-500/30 hover:bg-red-500/40 text-red-200'
              }`}
            >
              <div className="font-bold">
                Кроссворд #{index + 1} ({puzzle.difficulty === 'easy' ? 'Легко' : puzzle.difficulty === 'medium' ? 'Средне' : 'Сложно'})
              </div>
              <div className="text-sm opacity-70">
                {puzzle.words.length} слов • {puzzle.size}×{puzzle.size}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (completed) {
    const xpGained = selectedPuzzle.difficulty === 'easy' ? 15 : selectedPuzzle.difficulty === 'medium' ? 25 : 40
    return (
      <div className="bg-gradient-to-br from-indigo-900/90 to-blue-900/90 rounded-2xl p-6 backdrop-blur-sm border border-indigo-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-indigo-200 mb-2">Отлично!</h2>
        <p className="text-indigo-100 mb-4">Ты разгадал кроссворд!</p>
        <p className="text-2xl font-bold text-yellow-400 mb-6">+{Math.max(xpGained - hintsUsed * 5, 5)} XP</p>
        <button
          onClick={() => setSelectedPuzzle(null)}
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all"
        >
          Новый кроссворд
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900/90 to-blue-900/90 rounded-2xl p-6 backdrop-blur-sm border border-indigo-500/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-200 flex items-center gap-2">
          <Grid3X3 className="w-5 h-5" />
          Кроссворд
        </h2>
        {hintsUsed > 0 && (
          <span className="text-yellow-300 text-sm">Подсказок: {hintsUsed}</span>
        )}
      </div>

      {/* Clues */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="bg-indigo-800/50 rounded-lg p-3">
          <h3 className="font-bold text-indigo-300 text-sm mb-1">По горизонтали:</h3>
          {selectedPuzzle.words.filter(w => w.direction === 'across').map(word => (
            <p key={word.number} className="text-indigo-100 text-sm">
              {word.number}. {word.clue}
            </p>
          ))}
        </div>
        <div className="bg-indigo-800/50 rounded-lg p-3">
          <h3 className="font-bold text-indigo-300 text-sm mb-1">По вертикали:</h3>
          {selectedPuzzle.words.filter(w => w.direction === 'down').map(word => (
            <p key={word.number} className="text-indigo-100 text-sm">
              {word.number}. {word.clue}
            </p>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex justify-center mb-4">
        <div className="inline-grid gap-1 bg-indigo-950 p-2 rounded-lg">
          {selectedPuzzle.grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((cell, colIndex) => {
                const isBlocked = !cell.letter
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                const userValue = userGrid[rowIndex]?.[colIndex] || ''
                
                return (
                  <div
                    key={colIndex}
                    className={`relative w-10 h-10 ${
                      isBlocked 
                        ? 'bg-indigo-950' 
                        : isSelected
                        ? 'bg-indigo-400'
                        : 'bg-white'
                    } rounded cursor-pointer`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell.number && (
                      <span className="absolute top-0.5 left-1 text-[8px] text-gray-600 font-bold">
                        {cell.number}
                      </span>
                    )}
                    {!isBlocked && (
                      <input
                        type="text"
                        value={userValue}
                        onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                        className="w-full h-full text-center font-bold text-lg text-gray-800 bg-transparent focus:outline-none"
                        maxLength={1}
                        disabled={!isSelected}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={checkSolution}
          className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg transition-all flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Проверить
        </button>
        <button
          onClick={revealHint}
          disabled={!selectedCell}
          className="px-4 py-2 bg-yellow-500/50 hover:bg-yellow-500/70 text-yellow-200 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Lightbulb className="w-4 h-4" />
          Подсказка
        </button>
        <button
          onClick={resetPuzzle}
          className="px-4 py-2 bg-indigo-700/50 hover:bg-indigo-700 text-indigo-200 rounded-lg transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Сбросить
        </button>
        <button
          onClick={() => setSelectedPuzzle(null)}
          className="px-4 py-2 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-200 rounded-lg transition-all"
        >
          Назад
        </button>
      </div>
    </div>
  )
}
