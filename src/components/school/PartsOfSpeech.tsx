'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import useSound from '@/hooks/useSound'
import { BookOpen, RotateCcw, Trophy, Target, Sparkles, Brain } from 'lucide-react'

type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'numeral'

interface Word {
  word: string
  part: PartOfSpeech
  difficulty: 'easy' | 'medium' | 'hard'
  hint?: string
}

const WORDS: Word[] = [
  // Лёгкий уровень - существительные, глаголы, прилагательные
  { word: 'стол', part: 'noun', difficulty: 'easy' },
  { word: 'бежать', part: 'verb', difficulty: 'easy' },
  { word: 'красивый', part: 'adjective', difficulty: 'easy' },
  { word: 'дом', part: 'noun', difficulty: 'easy' },
  { word: 'читать', part: 'verb', difficulty: 'easy' },
  { word: 'большой', part: 'adjective', difficulty: 'easy' },
  { word: 'кот', part: 'noun', difficulty: 'easy' },
  { word: 'прыгать', part: 'verb', difficulty: 'easy' },
  { word: 'тёплый', part: 'adjective', difficulty: 'easy' },
  { word: 'книга', part: 'noun', difficulty: 'easy' },
  { word: 'писать', part: 'verb', difficulty: 'easy' },
  { word: 'синий', part: 'adjective', difficulty: 'easy' },
  { word: 'солнце', part: 'noun', difficulty: 'easy' },
  { word: 'говорить', part: 'verb', difficulty: 'easy' },
  { word: 'весёлый', part: 'adjective', difficulty: 'easy' },
  
  // Средний уровень - наречия, местоимения, числительные
  { word: 'быстро', part: 'adverb', difficulty: 'medium', hint: 'Отвечает на вопрос "как?"' },
  { word: 'он', part: 'pronoun', difficulty: 'medium' },
  { word: 'пять', part: 'numeral', difficulty: 'medium' },
  { word: 'медленно', part: 'adverb', difficulty: 'medium', hint: 'Отвечает на вопрос "как?"' },
  { word: 'я', part: 'pronoun', difficulty: 'medium' },
  { word: 'десять', part: 'numeral', difficulty: 'medium' },
  { word: 'громко', part: 'adverb', difficulty: 'medium', hint: 'Отвечает на вопрос "как?"' },
  { word: 'она', part: 'pronoun', difficulty: 'medium' },
  { word: 'первый', part: 'numeral', difficulty: 'medium' },
  { word: 'вчера', part: 'adverb', difficulty: 'medium', hint: 'Отвечает на вопрос "когда?"' },
  { word: 'мы', part: 'pronoun', difficulty: 'medium' },
  { word: 'сто', part: 'numeral', difficulty: 'medium' },
  { word: 'всегда', part: 'adverb', difficulty: 'medium', hint: 'Отвечает на вопрос "когда?"' },
  { word: 'ты', part: 'pronoun', difficulty: 'medium' },
  { word: 'двадцать', part: 'numeral', difficulty: 'medium' },
  
  // Сложный уровень - предлоги, союзы, смешанные
  { word: 'в', part: 'preposition', difficulty: 'hard', hint: 'Служебная часть речи' },
  { word: 'и', part: 'conjunction', difficulty: 'hard', hint: 'Соединяет слова' },
  { word: 'на', part: 'preposition', difficulty: 'hard', hint: 'Служебная часть речи' },
  { word: 'но', part: 'conjunction', difficulty: 'hard', hint: 'Противительный союз' },
  { word: 'под', part: 'preposition', difficulty: 'hard', hint: 'Служебная часть речи' },
  { word: 'а', part: 'conjunction', difficulty: 'hard', hint: 'Противительный союз' },
  { word: 'за', part: 'preposition', difficulty: 'hard', hint: 'Служебная часть речи' },
  { word: 'или', part: 'conjunction', difficulty: 'hard', hint: 'Разделительный союз' },
  { word: 'к', part: 'preposition', difficulty: 'hard', hint: 'Служебная часть речи' },
  { word: 'потому что', part: 'conjunction', difficulty: 'hard', hint: 'Подчинительный союз' },
  { word: 'по', part: 'preposition', difficulty: 'hard', hint: 'Служебная часть речи' },
  { word: 'если', part: 'conjunction', difficulty: 'hard', hint: 'Условный союз' },
  { word: 'над', part: 'preposition', difficulty: 'hard', hint: 'Служебная часть речи' },
  { word: 'когда', part: 'conjunction', difficulty: 'hard', hint: 'Временной союз' },
  { word: 'перед', part: 'preposition', difficulty: 'hard', hint: 'Служебная часть речи' },
]

const PART_NAMES: Record<PartOfSpeech, string> = {
  noun: 'Существительное',
  verb: 'Глагол',
  adjective: 'Прилагательное',
  adverb: 'Наречие',
  pronoun: 'Местоимение',
  preposition: 'Предлог',
  conjunction: 'Союз',
  numeral: 'Числительное'
}

const PART_COLORS: Record<PartOfSpeech, string> = {
  noun: 'bg-blue-500/20 border-blue-400 text-blue-300',
  verb: 'bg-red-500/20 border-red-400 text-red-300',
  adjective: 'bg-green-500/20 border-green-400 text-green-300',
  adverb: 'bg-purple-500/20 border-purple-400 text-purple-300',
  pronoun: 'bg-yellow-500/20 border-yellow-400 text-yellow-300',
  preposition: 'bg-cyan-500/20 border-cyan-400 text-cyan-300',
  conjunction: 'bg-pink-500/20 border-pink-400 text-pink-300',
  numeral: 'bg-orange-500/20 border-orange-400 text-orange-300'
}

const PART_ICONS: Record<PartOfSpeech, string> = {
  noun: '📦',
  verb: '🏃',
  adjective: '🎨',
  adverb: '⚡',
  pronoun: '👤',
  preposition: '📍',
  conjunction: '🔗',
  numeral: '🔢'
}

export default function PartsOfSpeech() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [selectedPart, setSelectedPart] = useState<PartOfSpeech | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [wordsUsed, setWordsUsed] = useState<Set<number>>(new Set())
  const [mode, setMode] = useState<'menu' | 'game'>('menu')
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showHint, setShowHint] = useState(false)

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
    if (mode === 'game' && !currentWord && !gameOver) {
      const w = getNextWord()
      if (w) setCurrentWord(w)
    }
  }, [mode, currentWord, gameOver, getNextWord])

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    setScore(0)
    setStreak(0)
    setTotalQuestions(0)
    setCorrectAnswers(0)
    setWordsUsed(new Set())
    setGameOver(false)
    setSelectedPart(null)
    setShowResult(false)
    setShowHint(false)
    setMode('game')
    const filtered = WORDS.filter(w => w.difficulty === diff)
    const randomIndex = Math.floor(Math.random() * filtered.length)
    setCurrentWord(filtered[randomIndex])
    setWordsUsed(new Set([WORDS.indexOf(filtered[randomIndex])]))
  }

  const handleSelect = (part: PartOfSpeech) => {
    if (!currentWord || showResult) return
    
    setSelectedPart(part)
    setShowResult(true)
    setTotalQuestions(prev => prev + 1)
    
    const isCorrect = part === currentWord.part
    
    if (isCorrect) {
      playSound('correct')
      const newStreak = streak + 1
      setStreak(newStreak)
      setCorrectAnswers(prev => prev + 1)
      const bonus = Math.floor(newStreak / 3) * 2
      const xp = 10 + bonus
      setScore(prev => prev + xp)
      addXP(xp)
    } else {
      playSound('wrong')
      setStreak(0)
    }
    
    setTimeout(() => {
      const originalIndex = WORDS.indexOf(currentWord)
      const newUsed = new Set(wordsUsed).add(originalIndex)
      setWordsUsed(newUsed)
      setSelectedPart(null)
      setShowResult(false)
      setShowHint(false)
      
      const filtered = WORDS.filter(w => w.difficulty === difficulty)
      const available = filtered.filter(w => !newUsed.has(WORDS.indexOf(w)))
      
      if (available.length === 0) {
        setGameOver(true)
      } else {
        const nextW = available[Math.floor(Math.random() * available.length)]
        setCurrentWord(nextW)
      }
    }, 2000)
  }

  const resetGame = () => {
    setMode('menu')
    setCurrentWord(null)
    setGameOver(false)
  }

  const getAvailableParts = (): PartOfSpeech[] => {
    if (difficulty === 'easy') {
      return ['noun', 'verb', 'adjective']
    } else if (difficulty === 'medium') {
      return ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'numeral']
    }
    return ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'numeral']
  }

  if (mode === 'menu') {
    return (
      <div className="bg-gradient-to-br from-rose-900/50 to-pink-900/50 rounded-2xl p-6 backdrop-blur-sm border border-rose-500/30">
        <h2 className="text-2xl font-bold text-rose-300 mb-6 flex items-center gap-2">
          <BookOpen className="w-7 h-7" />
          Части речи
        </h2>
        
        <p className="text-rose-200 mb-6">
          Определите, к какой части речи относится слово. Существительные, глаголы, прилагательные и другие!
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
                {diff === 'easy' ? '3 части речи' : diff === 'medium' ? '6 частей речи' : '8 частей речи'}
              </div>
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {Object.entries(PART_NAMES).map(([key, name]) => (
            <div key={key} className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-lg mb-1">{PART_ICONS[key as PartOfSpeech]}</div>
              <div className="text-xs text-rose-200">{name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (gameOver) {
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
    return (
      <div className="bg-gradient-to-br from-rose-900/50 to-pink-900/50 rounded-2xl p-6 backdrop-blur-sm border border-rose-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-rose-300 mb-2">Отлично!</h2>
        <p className="text-rose-200 mb-2">
          Результат: {score} XP
        </p>
        <p className="text-rose-300 text-sm mb-4">
          Правильных ответов: {correctAnswers} из {totalQuestions} ({accuracy}%)
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => startGame(difficulty)}
            className="px-6 py-3 bg-rose-500 hover:bg-rose-400 rounded-xl font-bold text-white transition-colors"
          >
            Ещё раз
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-rose-200 transition-colors"
          >
            Меню
          </button>
        </div>
      </div>
    )
  }

  if (!currentWord) return null

  const availableParts = getAvailableParts()

  return (
    <div className="bg-gradient-to-br from-rose-900/50 to-pink-900/50 rounded-2xl p-6 backdrop-blur-sm border border-rose-500/30">
      <div className="flex justify-between items-center mb-4">
        <div className="text-rose-300 text-sm">
          Точность: {totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0}%
        </div>
        <div className="flex items-center gap-4">
          <span className="text-rose-300">Серия: {streak}🔥</span>
          <span className="text-rose-300">Очки: {score}</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 mb-6 text-center">
        <p className="text-4xl font-bold text-white mb-2">
          {currentWord.word}
        </p>
        <p className="text-rose-300 text-sm">
          Какая это часть речи?
        </p>
      </div>

      {currentWord.hint && showHint && (
        <div className="bg-yellow-500/20 rounded-lg p-3 mb-4 text-yellow-300 text-sm text-center">
          💡 {currentWord.hint}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableParts.map((part) => {
          const isSelected = selectedPart === part
          const isCorrect = part === currentWord.part
          
          let buttonClass = 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
          if (showResult) {
            if (isCorrect) {
              buttonClass = PART_COLORS[part]
            } else if (isSelected && !isCorrect) {
              buttonClass = 'bg-red-500/30 border-red-400 text-red-300'
            }
          }
          
          return (
            <button
              key={part}
              onClick={() => handleSelect(part)}
              disabled={showResult}
              className={`p-3 rounded-xl font-bold border transition-all ${buttonClass}`}
            >
              <span className="text-xl mr-2">{PART_ICONS[part]}</span>
              {PART_NAMES[part]}
            </button>
          )
        })}
      </div>

      {showResult && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          selectedPart === currentWord.part
            ? 'bg-green-500/20 text-green-300'
            : 'bg-red-500/20 text-red-300'
        }`}>
          {selectedPart === currentWord.part ? (
            <p className="font-bold">✅ Правильно! {PART_ICONS[currentWord.part]} {PART_NAMES[currentWord.part]}</p>
          ) : (
            <p className="font-bold">❌ Это {PART_ICONS[currentWord.part]} {PART_NAMES[currentWord.part]}</p>
          )}
        </div>
      )}

      {!showResult && currentWord.hint && (
        <button
          onClick={() => setShowHint(true)}
          className="mt-4 w-full py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-300 text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Подсказка
        </button>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-rose-400">
          Слово {totalQuestions + 1} из {getFilteredWords().length}
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Меню
        </button>
      </div>
    </div>
  )
}
