'use client'

import { useState, useCallback, useEffect } from 'react'
import { MessageSquare, Check, RotateCcw, ArrowRight, Volume2, Star, BookOpen } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface SentenceTask {
  words: string[]
  correctOrder: number[]
  translation: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

const sentences: SentenceTask[] = [
  // Легкие предложения
  {
    words: ['Я', 'иду', 'в', 'школу'],
    correctOrder: [0, 1, 2, 3],
    translation: 'I go to school',
    difficulty: 'easy',
    category: 'Повседневные'
  },
  {
    words: ['Мама', 'готовит', 'обед'],
    correctOrder: [0, 1, 2],
    translation: 'Mom cooks lunch',
    difficulty: 'easy',
    category: 'Семья'
  },
  {
    words: ['Кот', 'спит', 'на', 'диване'],
    correctOrder: [0, 1, 2, 3],
    translation: 'The cat sleeps on the sofa',
    difficulty: 'easy',
    category: 'Животные'
  },
  {
    words: ['Дети', 'играют', 'в', 'парке'],
    correctOrder: [0, 1, 2, 3],
    translation: 'Children play in the park',
    difficulty: 'easy',
    category: 'Повседневные'
  },
  {
    words: ['Солнце', 'светит', 'ярко'],
    correctOrder: [0, 1, 2],
    translation: 'The sun shines brightly',
    difficulty: 'easy',
    category: 'Природа'
  },
  // Средние предложения
  {
    words: ['Вчера', 'мы', 'ходили', 'в', 'кино'],
    correctOrder: [0, 1, 2, 3, 4],
    translation: 'Yesterday we went to the cinema',
    difficulty: 'medium',
    category: 'Прошедшее время'
  },
  {
    words: ['Мой', 'друг', 'любит', 'читать', 'книги'],
    correctOrder: [0, 1, 2, 3, 4],
    translation: 'My friend likes to read books',
    difficulty: 'medium',
    category: 'Хобби'
  },
  {
    words: ['Зимой', 'птицы', 'улетают', 'на', 'юг'],
    correctOrder: [0, 1, 2, 3, 4],
    translation: 'In winter birds fly south',
    difficulty: 'medium',
    category: 'Природа'
  },
  {
    words: ['Учитель', 'объясняет', 'новую', 'тему'],
    correctOrder: [0, 1, 2, 3],
    translation: 'The teacher explains a new topic',
    difficulty: 'medium',
    category: 'Школа'
  },
  {
    words: ['После', 'уроков', 'я', 'делаю', 'домашнее', 'задание'],
    correctOrder: [0, 1, 2, 3, 4, 5],
    translation: 'After classes I do homework',
    difficulty: 'medium',
    category: 'Школа'
  },
  // Сложные предложения
  {
    words: ['Когда', 'я', 'вернусь', 'домой', 'я', 'позвоню', 'тебе'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    translation: 'When I get home I will call you',
    difficulty: 'hard',
    category: 'Сложные'
  },
  {
    words: ['Если', 'завтра', 'будет', 'хорошая', 'погода', 'мы', 'пойдём', 'гулять'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    translation: 'If the weather is good tomorrow we will go for a walk',
    difficulty: 'hard',
    category: 'Условные'
  },
  {
    words: ['Книга', 'которую', 'я', 'читаю', 'очень', 'интересная'],
    correctOrder: [0, 1, 2, 3, 4, 5],
    translation: 'The book I am reading is very interesting',
    difficulty: 'hard',
    category: 'Придаточные'
  },
  {
    words: ['Мальчик', 'что', 'стоял', 'у', 'двери', 'оказался', 'моим', 'другом'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    translation: 'The boy standing at the door turned out to be my friend',
    difficulty: 'hard',
    category: 'Придаточные'
  },
]

export default function SentenceBuilder() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null)
  const [currentTask, setCurrentTask] = useState<SentenceTask | null>(null)
  const [availableWords, setAvailableWords] = useState<string[]>([])
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showResult, setShowResult] = useState<boolean | null>(null)
  const [gameStarted, setGameStarted] = useState(false)

  const getNewTask = useCallback(() => {
    if (!difficulty) return
    const filtered = sentences.filter(s => s.difficulty === difficulty)
    const randomTask = filtered[Math.floor(Math.random() * filtered.length)]
    const shuffledWords = [...randomTask.words].sort(() => Math.random() - 0.5)
    
    setCurrentTask(randomTask)
    setAvailableWords(shuffledWords)
    setSelectedWords([])
    setShowResult(null)
  }, [difficulty])

  useEffect(() => {
    if (gameStarted && difficulty) {
      getNewTask()
    }
  }, [gameStarted, difficulty, getNewTask])

  const selectWord = useCallback((word: string, index: number) => {
    setAvailableWords(prev => prev.filter((_, i) => i !== index))
    setSelectedWords(prev => [...prev, word])
  }, [])

  const unselectWord = useCallback((index: number) => {
    const word = selectedWords[index]
    setSelectedWords(prev => prev.filter((_, i) => i !== index))
    setAvailableWords(prev => [...prev, word])
  }, [selectedWords])

  const checkSentence = useCallback(() => {
    if (!currentTask) return
    
    const isCorrect = selectedWords.every((word, index) => 
      word === currentTask.words[currentTask.correctOrder[index]]
    )
    
    setShowResult(isCorrect)
    setTotal(t => t + 1)
    
    if (isCorrect) {
      const baseXP = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 20
      const streakBonus = streak >= 2 ? Math.floor(baseXP * 0.2) : 0
      addXP(baseXP + streakBonus)
      playSound?.('success')
      setScore(s => s + baseXP + streakBonus)
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
    } else {
      playSound?.('error')
      setStreak(0)
    }
    
    setTimeout(() => {
      getNewTask()
    }, 1500)
  }, [currentTask, selectedWords, difficulty, streak, addXP, playSound, getNewTask])

  const startGame = useCallback((diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    setGameStarted(true)
    setScore(0)
    setCorrect(0)
    setTotal(0)
    setStreak(0)
  }, [])

  if (!gameStarted) {
    return (
      <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 rounded-2xl p-6 backdrop-blur-sm border border-emerald-500/30">
        <h2 className="text-2xl font-bold text-emerald-200 mb-4 flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          Собери предложение
        </h2>
        <p className="text-emerald-100/80 mb-6">
          Расставь слова в правильном порядке, чтобы составить предложение.
        </p>
        <div className="flex flex-col gap-3">
          {(['easy', 'medium', 'hard'] as const).map((d) => (
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
              <div className="font-bold">
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </div>
              <div className="text-sm opacity-70">
                {d === 'easy' ? '3-4 слова • 8 XP' : d === 'medium' ? '4-6 слов • 12 XP' : '6-8 слов • 20 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 rounded-2xl p-6 backdrop-blur-sm border border-emerald-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-200 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Собери предложение
        </h2>
        <div className="flex gap-2 items-center">
          <span className="text-emerald-200 bg-emerald-500/30 px-3 py-1 rounded-full text-sm">
            {score} XP
          </span>
          {streak >= 2 && (
            <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Star className="w-3 h-3" />
              x{streak}
            </span>
          )}
        </div>
      </div>

      {/* Translation hint */}
      <div className="bg-emerald-800/50 rounded-lg p-3 mb-4 flex items-center gap-2">
        <Volume2 className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-200">
          <span className="opacity-60">Перевод:</span> {currentTask?.translation}
        </span>
      </div>

      {/* Selected words (sentence) */}
      <div className="min-h-[60px] bg-emerald-800/30 rounded-xl p-3 mb-4 border-2 border-dashed border-emerald-500/30">
        <div className="flex flex-wrap gap-2">
          {selectedWords.length === 0 ? (
            <span className="text-emerald-400/50 text-sm">Нажми на слова, чтобы составить предложение...</span>
          ) : (
            selectedWords.map((word, index) => (
              <button
                key={index}
                onClick={() => unselectWord(index)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  showResult === true ? 'bg-green-500 text-white' :
                  showResult === false ? 'bg-red-500 text-white' :
                  'bg-emerald-500 text-white hover:bg-emerald-400'
                }`}
              >
                {word}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available words */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {availableWords.map((word, index) => (
            <button
              key={index}
              onClick={() => selectWord(word, index)}
              className="px-4 py-2 bg-emerald-700/50 hover:bg-emerald-600/50 text-emerald-200 rounded-lg font-medium transition-all hover:scale-105"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Result message */}
      {showResult !== null && (
        <div className={`text-center mb-4 p-3 rounded-lg ${showResult ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
          {showResult ? '✓ Правильно!' : '✗ Попробуй ещё раз'}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={checkSentence}
          disabled={selectedWords.length === 0}
          className="px-6 py-2 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          Проверить
        </button>
        <button
          onClick={() => { setSelectedWords([]); setAvailableWords(currentTask ? [...currentTask.words].sort(() => Math.random() - 0.5) : []) }}
          className="px-4 py-2 bg-emerald-700/50 hover:bg-emerald-600/50 text-emerald-200 rounded-xl transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Сбросить
        </button>
        <button
          onClick={getNewTask}
          className="px-4 py-2 bg-emerald-600/50 hover:bg-emerald-600 text-emerald-200 rounded-xl transition-all flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          Пропустить
        </button>
      </div>

      {/* Stats */}
      <div className="mt-4 flex justify-center gap-4 text-sm text-emerald-300/70">
        <span>Правильно: {correct}</span>
        <span>Всего: {total}</span>
        <span>Категория: {currentTask?.category}</span>
      </div>

      {/* Difficulty switcher */}
      <div className="mt-4 flex justify-center gap-2">
        {(['easy', 'medium', 'hard'] as const).map((d) => (
          <button
            key={d}
            onClick={() => { setDifficulty(d); getNewTask() }}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              difficulty === d
                ? d === 'easy' ? 'bg-green-500 text-white' :
                  d === 'medium' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                : 'bg-emerald-800/50 text-emerald-300 hover:bg-emerald-700/50'
            }`}
          >
            {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
          </button>
        ))}
      </div>
    </div>
  )
}
