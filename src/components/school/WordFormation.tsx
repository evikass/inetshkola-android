'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import useSound from '@/hooks/useSound'
import { Puzzle, RotateCcw, Trophy, Target, Lightbulb, Sparkles } from 'lucide-react'

type PartType = 'root' | 'prefix' | 'suffix' | 'ending'

interface WordPart {
  text: string
  type: PartType
}

interface WordData {
  word: string
  parts: WordPart[]
  difficulty: 'easy' | 'medium' | 'hard'
  explanation: string
}

const WORDS: WordData[] = [
  // Лёгкий уровень - простые слова с корнем и окончанием
  { word: 'дом', parts: [{ text: 'дом', type: 'root' }], difficulty: 'easy', explanation: 'Корень -дом- выражает основное значение слова' },
  { word: 'домик', parts: [{ text: 'дом', type: 'root' }, { text: 'ик', type: 'suffix' }], difficulty: 'easy', explanation: 'Суффикс -ик- придаёт уменьшительное значение' },
  { word: 'лес', parts: [{ text: 'лес', type: 'root' }], difficulty: 'easy', explanation: 'Корень -лес- выражает основное значение слова' },
  { word: 'лесник', parts: [{ text: 'лес', type: 'root' }, { text: 'ник', type: 'suffix' }], difficulty: 'easy', explanation: 'Суффикс -ник- обозначает человека по профессии' },
  { word: 'кот', parts: [{ text: 'кот', type: 'root' }], difficulty: 'easy', explanation: 'Корень -кот- выражает основное значение слова' },
  { word: 'котик', parts: [{ text: 'кот', type: 'root' }, { text: 'ик', type: 'suffix' }], difficulty: 'easy', explanation: 'Суффикс -ик- придаёт уменьшительное значение' },
  { word: 'вода', parts: [{ text: 'вод', type: 'root' }, { text: 'а', type: 'ending' }], difficulty: 'easy', explanation: 'Окончание -а показывает род и падеж' },
  { word: 'сад', parts: [{ text: 'сад', type: 'root' }], difficulty: 'easy', explanation: 'Корень -сад- выражает основное значение слова' },
  { word: 'садик', parts: [{ text: 'сад', type: 'root' }, { text: 'ик', type: 'suffix' }], difficulty: 'easy', explanation: 'Суффикс -ик- придаёт уменьшительное значение' },
  { word: 'стол', parts: [{ text: 'стол', type: 'root' }], difficulty: 'easy', explanation: 'Корень -стол- выражает основное значение слова' },
  
  // Средний уровень - с приставками
  { word: 'пригород', parts: [{ text: 'при', type: 'prefix' }, { text: 'город', type: 'root' }], difficulty: 'medium', explanation: 'Приставка при- означает "около, рядом"' },
  { word: 'подснежник', parts: [{ text: 'под', type: 'prefix' }, { text: 'снеж', type: 'root' }, { text: 'ник', type: 'suffix' }], difficulty: 'medium', explanation: 'Приставка под- означает "под снегом"' },
  { word: 'нарукавник', parts: [{ text: 'на', type: 'prefix' }, { text: 'рукав', type: 'root' }, { text: 'ник', type: 'suffix' }], difficulty: 'medium', explanation: 'Приставка на- указывает на положение на рукаве' },
  { word: 'перелесок', parts: [{ text: 'пере', type: 'prefix' }, { text: 'лес', type: 'root' }, { text: 'ок', type: 'suffix' }], difficulty: 'medium', explanation: 'Приставка пере- означает "через, сквозь"' },
  { word: 'загородный', parts: [{ text: 'за', type: 'prefix' }, { text: 'город', type: 'root' }, { text: 'н', type: 'suffix' }, { text: 'ый', type: 'ending' }], difficulty: 'medium', explanation: 'Приставка за- указывает на расположение за городом' },
  { word: 'пробег', parts: [{ text: 'про', type: 'prefix' }, { text: 'бег', type: 'root' }], difficulty: 'medium', explanation: 'Приставка про- означает движение сквозь, через' },
  { word: 'выход', parts: [{ text: 'вы', type: 'prefix' }, { text: 'ход', type: 'root' }], difficulty: 'medium', explanation: 'Приставка вы- означает движение изнутри' },
  { word: 'вход', parts: [{ text: 'в', type: 'prefix' }, { text: 'ход', type: 'root' }], difficulty: 'medium', explanation: 'Приставка в- означает движение внутрь' },
  { word: 'напарник', parts: [{ text: 'на', type: 'prefix' }, { text: 'пар', type: 'root' }, { text: 'ник', type: 'suffix' }], difficulty: 'medium', explanation: 'Слово образовано с приставкой на- и суффиксом -ник' },
  { word: 'подоконник', parts: [{ text: 'под', type: 'prefix' }, { text: 'окн', type: 'root' }, { text: 'ник', type: 'suffix' }], difficulty: 'medium', explanation: 'Подоконник - под окном' },
  
  // Сложный уровень - сложные слова
  { word: 'пароход', parts: [{ text: 'пар', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'ход', type: 'root' }], difficulty: 'hard', explanation: 'Сложное слово: пар + ход, соединительная гласная о' },
  { word: 'самолёт', parts: [{ text: 'сам', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'лёт', type: 'root' }], difficulty: 'hard', explanation: 'Сложное слово: сам + лёт' },
  { word: 'водопровод', parts: [{ text: 'вод', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'пров', type: 'root' }, { text: 'од', type: 'suffix' }], difficulty: 'hard', explanation: 'Сложное слово с двумя корнями' },
  { word: 'ледокол', parts: [{ text: 'лед', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'кол', type: 'root' }], difficulty: 'hard', explanation: 'Сложное слово: лёд + колоть' },
  { word: 'пешеход', parts: [{ text: 'пеш', type: 'root' }, { text: 'е', type: 'suffix' }, { text: 'ход', type: 'root' }], difficulty: 'hard', explanation: 'Пешком ходящий человек' },
  { word: 'нефтеналивной', parts: [{ text: 'нефт', type: 'root' }, { text: 'е', type: 'suffix' }, { text: 'налив', type: 'root' }, { text: 'н', type: 'suffix' }, { text: 'ой', type: 'ending' }], difficulty: 'hard', explanation: 'Сложное прилагательное с двумя корнями' },
  { word: 'бензовоз', parts: [{ text: 'бенз', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'воз', type: 'root' }], difficulty: 'hard', explanation: 'Возит бензин' },
  { word: 'овощехранилище', parts: [{ text: 'овощ', type: 'root' }, { text: 'е', type: 'suffix' }, { text: 'хран', type: 'root' }, { text: 'илищ', type: 'suffix' }, { text: 'е', type: 'ending' }], difficulty: 'hard', explanation: 'Место хранения овощей' },
  { word: 'снегопад', parts: [{ text: 'снег', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'пад', type: 'root' }], difficulty: 'hard', explanation: 'Падающий снег' },
  { word: 'звездопад', parts: [{ text: 'звезд', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'пад', type: 'root' }], difficulty: 'hard', explanation: 'Падение звёзд (метеоров)' },
  { word: 'водопад', parts: [{ text: 'вод', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'пад', type: 'root' }], difficulty: 'hard', explanation: 'Падающая вода' },
  { word: 'садовод', parts: [{ text: 'сад', type: 'root' }, { text: 'овод', type: 'suffix' }], difficulty: 'hard', explanation: 'Суффикс -овод- обозначает человека по деятельности' },
  { word: 'животоводство', parts: [{ text: 'живот', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'вод', type: 'root' }, { text: 'ств', type: 'suffix' }, { text: 'о', type: 'ending' }], difficulty: 'hard', explanation: 'Разведение животных' },
  { word: 'электростанция', parts: [{ text: 'электр', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'станц', type: 'root' }, { text: 'ия', type: 'ending' }], difficulty: 'hard', explanation: 'Станция, работающая на электричестве' },
  { word: 'магнитофон', parts: [{ text: 'магнит', type: 'root' }, { text: 'о', type: 'suffix' }, { text: 'фон', type: 'root' }], difficulty: 'hard', explanation: 'Аппарат для записи звука на магнитную ленту' },
]

const PART_NAMES: Record<PartType, string> = {
  root: 'Корень',
  prefix: 'Приставка',
  suffix: 'Суффикс',
  ending: 'Окончание'
}

const PART_COLORS: Record<PartType, string> = {
  root: 'bg-blue-500',
  prefix: 'bg-green-500',
  suffix: 'bg-purple-500',
  ending: 'bg-orange-500'
}

const PART_BORDER_COLORS: Record<PartType, string> = {
  root: 'border-blue-400',
  prefix: 'border-green-400',
  suffix: 'border-purple-400',
  ending: 'border-orange-400'
}

export default function WordFormation() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  const [currentWord, setCurrentWord] = useState<WordData | null>(null)
  const [selectedParts, setSelectedParts] = useState<{ part: WordPart; index: number }[]>([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [wordsUsed, setWordsUsed] = useState<Set<number>>(new Set())
  const [mode, setMode] = useState<'menu' | 'game'>('menu')
  const [availableParts, setAvailableParts] = useState<{ part: WordPart; index: number }[]>([])

  const getFilteredWords = useCallback(() => {
    return WORDS.filter(w => w.difficulty === difficulty)
  }, [difficulty])

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

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
      if (w) {
        setCurrentWord(w)
        const partsWithIndex = w.parts.map((part, index) => ({ part, index }))
        setAvailableParts(shuffleArray(partsWithIndex))
        setSelectedParts([])
      }
    }
  }, [mode, currentWord, gameOver, getNextWord])

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    setScore(0)
    setStreak( 0)
    setTotalQuestions(0)
    setWordsUsed(new Set())
    setGameOver(false)
    setSelectedParts([])
    setShowResult(false)
    setMode('game')
    const filtered = WORDS.filter(w => w.difficulty === diff)
    const randomIndex = Math.floor(Math.random() * filtered.length)
    const word = filtered[randomIndex]
    setCurrentWord(word)
    setWordsUsed(new Set([WORDS.indexOf(word)]))
    const partsWithIndex = word.parts.map((part, index) => ({ part, index }))
    setAvailableParts(shuffleArray(partsWithIndex))
    setSelectedParts([])
  }

  const handlePartClick = (part: WordPart, index: number) => {
    if (showResult) return
    
    const isSelected = selectedParts.some(p => p.index === index)
    if (isSelected) {
      setSelectedParts(prev => prev.filter(p => p.index !== index))
    } else {
      setSelectedParts(prev => [...prev, { part, index }])
    }
  }

  const checkAnswer = () => {
    if (!currentWord || showResult) return
    
    const isCorrect = selectedParts.length === currentWord.parts.length &&
      selectedParts.every((sp, i) => sp.index === i)
    
    setShowResult(true)
    setTotalQuestions(prev => prev + 1)
    
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
      const originalIndex = WORDS.indexOf(currentWord)
      const newUsed = new Set(wordsUsed).add(originalIndex)
      setWordsUsed(newUsed)
      setSelectedParts([])
      setShowResult(false)
      
      const filtered = WORDS.filter(w => w.difficulty === difficulty)
      const available = filtered.filter(w => !newUsed.has(WORDS.indexOf(w)))
      
      if (available.length === 0) {
        setGameOver(true)
      } else {
        const nextW = available[Math.floor(Math.random() * available.length)]
        setCurrentWord(nextW)
        const partsWithIndex = nextW.parts.map((part, index) => ({ part, index }))
        setAvailableParts(shuffleArray(partsWithIndex))
      }
    }, 3000)
  }

  const resetGame = () => {
    setMode('menu')
    setCurrentWord(null)
    setGameOver(false)
  }

  if (mode === 'menu') {
    return (
      <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30">
        <h2 className="text-2xl font-bold text-amber-300 mb-6 flex items-center gap-2">
          <Puzzle className="w-7 h-7" />
          Состав слова
        </h2>
        
        <p className="text-amber-200 mb-6">
          Разберите слово по составу: найдите корень, приставку, суффикс и окончание. Расположите части в правильном порядке!
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
                {diff === 'easy' ? 'Простые слова' : diff === 'medium' ? 'С приставками' : 'Сложные слова'}
              </div>
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(PART_NAMES).map(([key, name]) => (
            <div key={key} className={`${PART_COLORS[key as PartType]} rounded-lg p-2 text-center text-white`}>
              <div className="text-xs">{name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-amber-300 mb-2">Отлично!</h2>
        <p className="text-amber-200 mb-4">
          Результат: {score} XP за {totalQuestions} слов
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => startGame(difficulty)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 rounded-xl font-bold text-white transition-colors"
          >
            Ещё раз
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-amber-200 transition-colors"
          >
            Меню
          </button>
        </div>
      </div>
    )
  }

  if (!currentWord) return null

  return (
    <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-2xl p-6 backdrop-blur-sm border border-amber-500/30">
      <div className="flex justify-between items-center mb-4">
        <div className="text-amber-300 text-sm flex items-center gap-2">
          <Target className="w-4 h-4" />
          Разберите по составу
        </div>
        <div className="flex items-center gap-4">
          <span className="text-amber-300">Серия: {streak}🔥</span>
          <span className="text-amber-300">Очки: {score}</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 mb-6 text-center">
        <p className="text-4xl font-bold text-white">
          {currentWord.word}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-amber-300 text-sm mb-2 text-center">Выберите части в правильном порядке:</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {availableParts.map(({ part, index }) => {
            const isSelected = selectedParts.some(p => p.index === index)
            return (
              <button
                key={index}
                onClick={() => handlePartClick(part, index)}
                disabled={showResult}
                className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${
                  isSelected 
                    ? `${PART_COLORS[part.type]} text-white ${PART_BORDER_COLORS[part.type]} scale-105` 
                    : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                }`}
              >
                {part.text}
              </button>
            )
          })}
        </div>
      </div>

      {selectedParts.length > 0 && (
        <div className="mb-4">
          <p className="text-amber-300 text-sm mb-2 text-center">Ваш ответ:</p>
          <div className="flex justify-center gap-1">
            {selectedParts.map(({ part }, i) => (
              <div key={i} className={`${PART_COLORS[part.type]} px-3 py-2 rounded text-white font-bold`}>
                {part.text}
                <div className="text-xs opacity-75">{PART_NAMES[part.type]}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showResult && (
        <div className={`mb-4 p-3 rounded-lg ${
          selectedParts.length === currentWord.parts.length &&
          selectedParts.every((sp, i) => sp.index === i)
            ? 'bg-green-500/20 text-green-300'
            : 'bg-red-500/20 text-red-300'
        }`}>
          <p className="font-bold mb-1">
            {selectedParts.length === currentWord.parts.length &&
            selectedParts.every((sp, i) => sp.index === i)
              ? '✅ Правильно!'
              : '❌ Неправильно'}
          </p>
          <p className="text-sm">Правильный разбор: {currentWord.parts.map(p => 
            `${p.text} (${PART_NAMES[p.type]})`
          ).join(' + ')}</p>
          <p className="text-xs mt-2 opacity-75">{currentWord.explanation}</p>
        </div>
      )}

      <div className="flex gap-4 justify-center mb-4">
        <button
          onClick={() => setSelectedParts([])}
          disabled={showResult || selectedParts.length === 0}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-lg text-amber-200 transition-colors"
        >
          Сбросить
        </button>
        <button
          onClick={checkAnswer}
          disabled={showResult || selectedParts.length !== currentWord.parts.length}
          className="px-6 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 rounded-lg font-bold text-white transition-colors"
        >
          Проверить
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-amber-400">
          Слово {totalQuestions + 1} из {getFilteredWords().length}
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Меню
        </button>
      </div>
    </div>
  )
}
