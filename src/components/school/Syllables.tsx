'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import useSound from '@/hooks/useSound'
import { AudioLines, RotateCcw, Trophy, Target, Volume2, Check } from 'lucide-react'

interface WordData {
  word: string
  syllables: string[]
  syllableCount: number
  difficulty: 'easy' | 'medium' | 'hard'
}

const WORDS: WordData[] = [
  // Лёгкий уровень - 1-2 слога
  { word: 'кот', syllables: ['кот'], syllableCount: 1, difficulty: 'easy' },
  { word: 'дом', syllables: ['дом'], syllableCount: 1, difficulty: 'easy' },
  { word: 'лес', syllables: ['лес'], syllableCount: 1, difficulty: 'easy' },
  { word: 'сад', syllables: ['сад'], syllableCount: 1, difficulty: 'easy' },
  { word: 'шар', syllables: ['шар'], syllableCount: 1, difficulty: 'easy' },
  { word: 'мама', syllables: ['ма', 'ма'], syllableCount: 2, difficulty: 'easy' },
  { word: 'папа', syllables: ['па', 'па'], syllableCount: 2, difficulty: 'easy' },
  { word: 'вода', syllables: ['во', 'да'], syllableCount: 2, difficulty: 'easy' },
  { word: 'рука', syllables: ['ру', 'ка'], syllableCount: 2, difficulty: 'easy' },
  { word: 'нога', syllables: ['но', 'га'], syllableCount: 2, difficulty: 'easy' },
  { word: 'луна', syllables: ['лу', 'на'], syllableCount: 2, difficulty: 'easy' },
  { word: 'весна', syllables: ['вес', 'на'], syllableCount: 2, difficulty: 'easy' },
  { word: 'река', syllables: ['ре', 'ка'], syllableCount: 2, difficulty: 'easy' },
  { word: 'окно', syllables: ['ок', 'но'], syllableCount: 2, difficulty: 'easy' },
  { word: 'молоко', syllables: ['мо', 'ло', 'ко'], syllableCount: 3, difficulty: 'easy' },
  
  // Средний уровень - 3-4 слога
  { word: 'собака', syllables: ['со', 'ба', 'ка'], syllableCount: 3, difficulty: 'medium' },
  { word: 'машина', syllables: ['ма', 'ши', 'на'], syllableCount: 3, difficulty: 'medium' },
  { word: 'картина', syllables: ['кар', 'ти', 'на'], syllableCount: 3, difficulty: 'medium' },
  { word: 'ягода', syllables: ['я', 'го', 'да'], syllableCount: 3, difficulty: 'medium' },
  { word: 'береза', syllables: ['бе', 'рё', 'за'], syllableCount: 3, difficulty: 'medium' },
  { word: 'погода', syllables: ['по', 'го', 'да'], syllableCount: 3, difficulty: 'medium' },
  { word: 'работа', syllables: ['ра', 'бо', 'та'], syllableCount: 3, difficulty: 'medium' },
  { word: 'ворона', syllables: ['во', 'ро', 'на'], syllableCount: 3, difficulty: 'medium' },
  { word: 'корова', syllables: ['ко', 'ро', 'ва'], syllableCount: 3, difficulty: 'medium' },
  { word: 'дорога', syllables: ['до', 'ро', 'га'], syllableCount: 3, difficulty: 'medium' },
  { word: 'молоко', syllables: ['мо', 'ло', 'ко'], syllableCount: 3, difficulty: 'medium' },
  { word: 'хорошо', syllables: ['хо', 'ро', 'шо'], syllableCount: 3, difficulty: 'medium' },
  { word: 'персик', syllables: ['пер', 'сик'], syllableCount: 2, difficulty: 'medium' },
  { word: 'апельсин', syllables: ['а', 'пель', 'син'], syllableCount: 3, difficulty: 'medium' },
  { word: 'телефон', syllables: ['те', 'ле', 'фон'], syllableCount: 3, difficulty: 'medium' },
  
  // Сложный уровень - 4+ слогов, сложные случаи
  { word: 'пианино', syllables: ['пи', 'а', 'ни', 'но'], syllableCount: 4, difficulty: 'hard' },
  { word: 'электричество', syllables: ['э', 'лек', 'три', 'чест', 'во'], syllableCount: 5, difficulty: 'hard' },
  { word: 'академия', syllables: ['а', 'ка', 'де', 'ми', 'я'], syllableCount: 5, difficulty: 'hard' },
  { word: 'библиотека', syllables: ['биб', 'ли', 'о', 'те', 'ка'], syllableCount: 5, difficulty: 'hard' },
  { word: 'астрономия', syllables: ['ас', 'тро', 'но', 'ми', 'я'], syllableCount: 5, difficulty: 'hard' },
  { word: 'праздник', syllables: ['празд', 'ник'], syllableCount: 2, difficulty: 'hard' },
  { word: 'солнце', syllables: ['сол', 'нце'], syllableCount: 2, difficulty: 'hard' },
  { word: 'сердце', syllables: ['серд', 'це'], syllableCount: 2, difficulty: 'hard' },
  { word: 'пальто', syllables: ['паль', 'то'], syllableCount: 2, difficulty: 'hard' },
  { word: 'коньки', syllables: ['конь', 'ки'], syllableCount: 2, difficulty: 'hard' },
  { word: 'бельё', syllables: ['бе', 'льё'], syllableCount: 2, difficulty: 'hard' },
  { word: 'стулья', syllables: ['сту', 'лья'], syllableCount: 2, difficulty: 'hard' },
  { word: 'ружьё', syllables: ['ру', 'жьё'], syllableCount: 2, difficulty: 'hard' },
  { word: 'подъезд', syllables: ['под', 'ъезд'], syllableCount: 2, difficulty: 'hard' },
  { word: 'объявление', syllables: ['об', 'ъяв', 'ле', 'ни', 'е'], syllableCount: 5, difficulty: 'hard' },
  { word: 'восьмой', syllables: ['вось', 'мой'], syllableCount: 2, difficulty: 'hard' },
  { word: 'пассажир', syllables: ['пас', 'са', 'жир'], syllableCount: 3, difficulty: 'hard' },
  { word: 'классный', syllables: ['класс', 'ный'], syllableCount: 2, difficulty: 'hard' },
  { word: 'группа', syllables: ['груп', 'па'], syllableCount: 2, difficulty: 'hard' },
  { word: 'аппликация', syllables: ['ап', 'ли', 'ка', 'ци', 'я'], syllableCount: 5, difficulty: 'hard' },
]

export default function Syllables() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  const [currentWord, setCurrentWord] = useState<WordData | null>(null)
  const [selectedCount, setSelectedCount] = useState<number | null>(null)
  const [userSyllables, setUserSyllables] = useState<string[]>([])
  const [currentSyllable, setCurrentSyllable] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [wordsUsed, setWordsUsed] = useState<Set<number>>(new Set())
  const [mode, setMode] = useState<'menu' | 'count' | 'divide' | 'result'>('menu')
  const [questionMode, setQuestionMode] = useState<'count' | 'divide'>('count')

  const getFilteredWords = useCallback(() => {
    return WORDS.filter(w => w.difficulty === difficulty)
  }, [difficulty])

  const getNextWord = useCallback(() => {
    const filtered = getFilteredWords()
    const available = filtered
      .map((w, i) => ({ w, originalIndex: WORDS.indexOf(w) }))
      .filter(item => !wordsUsed.has(item.originalIndex))
    
    if (available.length === 0) {
      setGameOver(true)
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    return available[randomIndex].w
  }, [getFilteredWords, wordsUsed])

  useEffect(() => {
    if (mode !== 'menu' && !currentWord && !gameOver) {
      const w = getNextWord()
      if (w) setCurrentWord(w)
    }
  }, [mode, currentWord, gameOver, getNextWord])

  const startGame = (diff: 'easy' | 'medium' | 'hard', qMode: 'count' | 'divide') => {
    setDifficulty(diff)
    setQuestionMode(qMode)
    setScore(0)
    setStreak(0)
    setTotalQuestions(0)
    setWordsUsed(new Set())
    setGameOver(false)
    setSelectedCount(null)
    setUserSyllables([])
    setCurrentSyllable('')
    setShowResult(false)
    setMode(qMode === 'count' ? 'count' : 'divide')
    const filtered = WORDS.filter(w => w.difficulty === diff)
    const randomIndex = Math.floor(Math.random() * filtered.length)
    setCurrentWord(filtered[randomIndex])
    setWordsUsed(new Set([WORDS.indexOf(filtered[randomIndex])]))
  }

  const handleCountSelect = (count: number) => {
    if (!currentWord || showResult) return
    setSelectedCount(count)
  }

  const checkCountAnswer = () => {
    if (!currentWord || selectedCount === null) return
    
    setShowResult(true)
    setTotalQuestions(prev => prev + 1)
    
    const isCorrect = selectedCount === currentWord.syllableCount
    
    if (isCorrect) {
      playSound('correct')
      const newStreak = streak + 1
      setStreak(newStreak)
      const bonus = Math.floor(newStreak / 3) * 2
      const xp = 10 + bonus
      setScore(prev => prev + xp)
      addXP(xp)
    } else {
      playSound('wrong')
      setStreak(0)
    }
    
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const addSyllable = () => {
    if (currentSyllable.trim()) {
      setUserSyllables(prev => [...prev, currentSyllable.trim()])
      setCurrentSyllable('')
    }
  }

  const checkDivideAnswer = () => {
    if (!currentWord) return
    
    setShowResult(true)
    setTotalQuestions(prev => prev + 1)
    
    const isCorrect = userSyllables.length === currentWord.syllables.length &&
      userSyllables.every((s, i) => s.toLowerCase() === currentWord.syllables[i].toLowerCase())
    
    if (isCorrect) {
      playSound('correct')
      const newStreak = streak + 1
      setStreak(newStreak)
      const bonus = Math.floor(newStreak / 3) * 2
      const xp = 15 + bonus
      setScore(prev => prev + xp)
      addXP(xp)
    } else {
      playSound('wrong')
      setStreak(0)
    }
    
    setTimeout(() => {
      nextQuestion()
    }, 3000)
  }

  const nextQuestion = () => {
    if (!currentWord) return
    const originalIndex = WORDS.indexOf(currentWord)
    const newUsed = new Set(wordsUsed).add(originalIndex)
    setWordsUsed(newUsed)
    setSelectedCount(null)
    setUserSyllables([])
    setCurrentSyllable('')
    setShowResult(false)
    
    const filtered = WORDS.filter(w => w.difficulty === difficulty)
    const available = filtered.filter(w => !newUsed.has(WORDS.indexOf(w)))
    
    if (available.length === 0) {
      setGameOver(true)
    } else {
      const nextW = available[Math.floor(Math.random() * available.length)]
      setCurrentWord(nextW)
    }
  }

  const resetGame = () => {
    setMode('menu')
    setCurrentWord(null)
    setGameOver(false)
  }

  if (mode === 'menu') {
    return (
      <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 rounded-2xl p-6 backdrop-blur-sm border border-cyan-500/30">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
          <AudioLines className="w-7 h-7" />
          Деление на слоги
        </h2>
        
        <p className="text-cyan-200 mb-6">
          Разделите слова на слоги или определите количество слогов. Сколько гласных - столько и слогов!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => startGame(difficulty, 'count')}
            className="p-4 rounded-xl font-bold transition-all hover:scale-105 bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30 text-purple-300 border"
          >
            <Target className="w-6 h-6 mx-auto mb-2" />
            Сосчитать слоги
            <div className="text-xs opacity-75 mt-1">Определите количество слогов</div>
          </button>
          <button
            onClick={() => startGame(difficulty, 'divide')}
            className="p-4 rounded-xl font-bold transition-all hover:scale-105 bg-teal-500/20 border-teal-500/50 hover:bg-teal-500/30 text-teal-300 border"
          >
            <AudioLines className="w-6 h-6 mx-auto mb-2" />
            Разделить на слоги
            <div className="text-xs opacity-75 mt-1">Разбейте слово на части</div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`p-3 rounded-xl font-bold transition-all ${
                difficulty === diff
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              } border`}
            >
              {diff === 'easy' ? 'Легко' : diff === 'medium' ? 'Средне' : 'Сложно'}
            </button>
          ))}
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center text-cyan-200 text-sm">
          💡 Правило: сколько в слове гласных, столько и слогов
        </div>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 rounded-2xl p-6 backdrop-blur-sm border border-cyan-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-cyan-300 mb-2">Отлично!</h2>
        <p className="text-cyan-200 mb-4">
          Результат: {score} XP за {totalQuestions} слов
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => startGame(difficulty, questionMode)}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-bold text-white transition-colors"
          >
            Ещё раз
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-cyan-200 transition-colors"
          >
            Меню
          </button>
        </div>
      </div>
    )
  }

  if (!currentWord) return null

  // Режим подсчёта слогов
  if (mode === 'count') {
    return (
      <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 rounded-2xl p-6 backdrop-blur-sm border border-cyan-500/30">
        <div className="flex justify-between items-center mb-4">
          <div className="text-cyan-300 text-sm">Сколько слогов?</div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-300">Серия: {streak}🔥</span>
            <span className="text-cyan-300">Очки: {score}</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 mb-6 text-center">
          <p className="text-4xl font-bold text-white">{currentWord.word}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleCountSelect(num)}
              disabled={showResult}
              className={`p-4 rounded-xl font-bold text-xl transition-all ${
                selectedCount === num
                  ? 'bg-cyan-500 text-white scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            selectedCount === currentWord.syllableCount
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}>
            {selectedCount === currentWord.syllableCount ? (
              <p>✅ Правильно! {currentWord.syllables.join('-')}</p>
            ) : (
              <p>❌ Неправильно. Ответ: {currentWord.syllableCount} слога - {currentWord.syllables.join('-')}</p>
            )}
          </div>
        )}

        <button
          onClick={checkCountAnswer}
          disabled={showResult || selectedCount === null}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 rounded-xl font-bold text-white transition-colors"
        >
          Проверить
        </button>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-cyan-400">
            Слово {totalQuestions + 1} из {getFilteredWords().length}
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Меню
          </button>
        </div>
      </div>
    )
  }

  // Режим деления на слоги
  return (
    <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 rounded-2xl p-6 backdrop-blur-sm border border-cyan-500/30">
      <div className="flex justify-between items-center mb-4">
        <div className="text-cyan-300 text-sm">Разделите на слоги</div>
        <div className="flex items-center gap-4">
          <span className="text-cyan-300">Серия: {streak}🔥</span>
          <span className="text-cyan-300">Очки: {score}</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 mb-6 text-center">
        <p className="text-4xl font-bold text-white">{currentWord.word}</p>
      </div>

      <div className="mb-4">
        <p className="text-cyan-300 text-sm mb-2 text-center">Введите слоги по одному:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentSyllable}
            onChange={(e) => setCurrentSyllable(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSyllable()}
            placeholder="Слог"
            className="flex-1 bg-white/10 border border-cyan-500/30 rounded-lg px-4 py-2 text-white placeholder-cyan-300 focus:outline-none focus:border-cyan-400"
            disabled={showResult}
          />
          <button
            onClick={addSyllable}
            disabled={showResult || !currentSyllable.trim()}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 rounded-lg font-bold text-white transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {userSyllables.length > 0 && (
        <div className="mb-4">
          <p className="text-cyan-300 text-sm mb-2 text-center">Ваш ответ:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {userSyllables.map((s, i) => (
              <div key={i} className="bg-cyan-500/30 border border-cyan-400 px-3 py-1 rounded text-cyan-200">
                {s}
              </div>
            ))}
          </div>
          <button
            onClick={() => setUserSyllables([])}
            disabled={showResult}
            className="mt-2 mx-auto block text-sm text-cyan-400 hover:text-cyan-300"
          >
            Сбросить
          </button>
        </div>
      )}

      {showResult && (
        <div className={`mb-4 p-3 rounded-lg text-center ${
          userSyllables.length === currentWord.syllables.length &&
          userSyllables.every((s, i) => s.toLowerCase() === currentWord.syllables[i].toLowerCase())
            ? 'bg-green-500/20 text-green-300'
            : 'bg-red-500/20 text-red-300'
        }`}>
          {userSyllables.length === currentWord.syllables.length &&
          userSyllables.every((s, i) => s.toLowerCase() === currentWord.syllables[i].toLowerCase()) ? (
            <p>✅ Правильно!</p>
          ) : (
            <p>❌ Правильно: {currentWord.syllables.join('-')}</p>
          )}
        </div>
      )}

      <button
        onClick={checkDivideAnswer}
        disabled={showResult || userSyllables.length === 0}
        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 rounded-xl font-bold text-white transition-colors"
      >
        Проверить
      </button>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-cyan-400">
          Слово {totalQuestions + 1} из {getFilteredWords().length}
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Меню
        </button>
      </div>
    </div>
  )
}
