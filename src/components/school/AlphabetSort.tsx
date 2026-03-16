'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { ArrowUp, ArrowDown, Check, X, Shuffle, Trophy, Clock, Star } from 'lucide-react'

interface WordSet {
  words: string[]
  category: string
}

const wordSets: WordSet[] = [
  { category: 'Животные', words: ['бобр', 'волк', 'ёж', 'заяц', 'лиса', 'медведь', 'олень'] },
  { category: 'Фрукты', words: ['абрикос', 'ананас', 'банан', 'виноград', 'груша', 'персик', 'яблоко'] },
  { category: 'Овощи', words: ['горох', 'капуста', 'картофель', 'лук', 'морковь', 'огурец', 'помидор'] },
  { category: 'Птицы', words: ['воробей', 'ворона', 'голубь', 'дятел', 'синица', 'снегирь', 'сокол'] },
  { category: 'Деревья', words: ['берёза', 'дуб', 'ель', 'клён', 'липа', 'осина', 'сосна'] },
  { category: 'Цветы', words: ['астра', 'гвоздика', 'колокольчик', 'роза', 'ромашка', 'тюльпан', 'фиалка'] },
  { category: 'Города', words: ['Волгоград', 'Казань', 'Москва', 'Новосибирск', 'Омск', 'Самара', 'Сочи'] },
  { category: 'Страны', words: ['Бразилия', 'Германия', 'Италия', 'Китай', 'Россия', 'Франция', 'Япония'] },
  { category: 'Реки', words: ['Амур', 'Волга', 'Дон', 'Енисей', 'Лена', 'Нева', 'Обь'] },
  { category: 'Планеты', words: ['Венера', 'Земля', 'Марс', 'Меркурий', 'Нептун', 'Сатурн', 'Юпитер'] },
  { category: 'Профессии', words: ['врач', 'водитель', 'учитель', 'инженер', 'повар', 'пилот', 'строитель'] },
  { category: 'Транспорт', words: ['автобус', 'велосипед', 'вертолёт', 'грузовик', 'метро', 'поезд', 'самолёт'] },
  { category: 'Мебель', words: ['диван', 'кровать', 'кресло', 'стол', 'стул', 'шкаф', 'этажерка'] },
  { category: 'Посуда', words: ['вилка', 'кастрюля', 'ложка', 'нож', 'сковорода', 'тарелка', 'чашка'] },
  { category: 'Одежда', words: ['брюки', 'куртка', 'пальто', 'платье', 'рубашка', 'свитер', 'шапка'] },
  { category: 'Обувь', words: ['ботинки', 'валенки', 'кроссовки', 'сапоги', 'тапочки', 'туфли', 'шлёпанцы'] },
  { category: 'Инструменты', words: ['гвоздь', 'дрель', 'молоток', 'наждачка', 'пила', 'отвёртка', 'топор'] },
  { category: 'Спорт', words: ['бег', 'бокс', 'волейбол', 'гимнастика', 'плавание', 'теннис', 'футбол'] },
]

type Difficulty = 'easy' | 'medium' | 'hard'

export default function AlphabetSort() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentSet, setCurrentSet] = useState<WordSet | null>(null)
  const [shuffledWords, setShuffledWords] = useState<string[]>([])
  const [userOrder, setUserOrder] = useState<string[]>([])
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)

  const getTimeLimit = useCallback((diff: Difficulty) => {
    return diff === 'easy' ? 60 : diff === 'medium' ? 45 : 30
  }, [])

  const getWordCount = useCallback((diff: Difficulty) => {
    return diff === 'easy' ? 5 : diff === 'medium' ? 6 : 7
  }, [])

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff)
    const wordCount = getWordCount(diff)
    const randomSet = wordSets[Math.floor(Math.random() * wordSets.length)]
    const selectedWords = shuffleArray(randomSet.words).slice(0, wordCount)
    
    setCurrentSet({ ...randomSet, words: selectedWords })
    setShuffledWords(shuffleArray(selectedWords))
    setUserOrder([])
    setSelectedWord(null)
    setScore(0)
    setRound(1)
    setCorrectAnswers(0)
    setTimeLeft(getTimeLimit(diff))
    setGameState('playing')
  }, [getWordCount, getTimeLimit])

  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          checkResult()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameState, timeLeft])

  const handleWordClick = (word: string) => {
    if (userOrder.includes(word)) return
    
    playSound('click')
    setSelectedWord(word)
  }

  const handleAddToOrder = () => {
    if (!selectedWord || userOrder.includes(selectedWord)) return
    
    playSound('success')
    setUserOrder(prev => [...prev, selectedWord])
    setSelectedWord(null)
  }

  const handleRemoveFromOrder = (word: string) => {
    playSound('click')
    setUserOrder(prev => prev.filter(w => w !== word))
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    playSound('click')
    const newOrder = [...userOrder]
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
    setUserOrder(newOrder)
  }

  const handleMoveDown = (index: number) => {
    if (index === userOrder.length - 1) return
    playSound('click')
    const newOrder = [...userOrder]
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    setUserOrder(newOrder)
  }

  const checkResult = useCallback(() => {
    if (!currentSet) return
    
    const correctOrder = [...currentSet.words].sort((a, b) => 
      a.localeCompare(b, 'ru')
    )
    
    let correct = 0
    userOrder.forEach((word, index) => {
      if (word === correctOrder[index]) correct++
    })
    
    const accuracy = correct / correctOrder.length
    const isCorrect = accuracy >= 0.8
    
    if (isCorrect) {
      playSound('win')
      const xpGain = Math.round(10 + accuracy * 20 + (timeLeft > 0 ? timeLeft / 2 : 0))
      addXP(xpGain)
      setScore(prev => prev + xpGain)
      setCorrectAnswers(prev => prev + 1)
    } else {
      playSound('error')
    }
    
    setShowFeedback(isCorrect ? 'correct' : 'wrong')
    
    setTimeout(() => {
      setShowFeedback(null)
      if (round < 5) {
        const wordCount = getWordCount(difficulty)
        const randomSet = wordSets[Math.floor(Math.random() * wordSets.length)]
        const selectedWords = shuffleArray(randomSet.words).slice(0, wordCount)
        
        setCurrentSet({ ...randomSet, words: selectedWords })
        setShuffledWords(shuffleArray(selectedWords))
        setUserOrder([])
        setSelectedWord(null)
        setRound(prev => prev + 1)
        setTimeLeft(getTimeLimit(difficulty))
      } else {
        setGameState('result')
      }
    }, 1500)
  }, [currentSet, userOrder, round, difficulty, playSound, addXP, timeLeft, getWordCount, getTimeLimit])

  const availableWords = shuffledWords.filter(w => !userOrder.includes(w))

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm rounded-3xl p-6 border border-teal-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔤</div>
          <h2 className="text-2xl font-bold text-teal-300">Алфавитная сортировка</h2>
          <p className="text-teal-200/70 text-sm mt-1">Расставь слова по алфавиту</p>
        </div>
        
        <div className="grid gap-3 max-w-xs mx-auto">
          <button onClick={() => startGame('easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
            <div className="font-bold text-green-300">🟢 Легко</div>
            <div className="text-xs text-green-200/70">5 слов, 60 секунд</div>
          </button>
          <button onClick={() => startGame('medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
            <div className="font-bold text-yellow-300">🟡 Средне</div>
            <div className="text-xs text-yellow-200/70">6 слов, 45 секунд</div>
          </button>
          <button onClick={() => startGame('hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
            <div className="font-bold text-red-300">🔴 Сложно</div>
            <div className="text-xs text-red-200/70">7 слов, 30 секунд</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm rounded-3xl p-6 border border-teal-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-teal-300 mb-2">Раунд завершён!</h2>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP заработано</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Check className="w-8 h-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/5</div>
              <div className="text-xs text-white/70">Правильных</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-teal-500/30 hover:bg-teal-500/40 rounded-xl text-teal-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm rounded-3xl p-6 border border-teal-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-teal-300 font-bold">Раунд {round}/5</span>
          <span className="text-cyan-300 text-sm">{currentSet?.category}</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Clock className="w-4 h-4" />
          <span className={`font-mono ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : ''}`}>{timeLeft}с</span>
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center py-4 mb-4 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
          <span className="text-2xl">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <span className={`ml-2 font-bold ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>
            {showFeedback === 'correct' ? 'Отлично!' : 'Попробуй ещё!'}
          </span>
        </div>
      )}

      {/* User Order */}
      <div className="mb-6">
        <h3 className="text-teal-300 text-sm mb-2 font-medium">Твой порядок:</h3>
        <div className="min-h-[120px] bg-white/5 rounded-xl p-3 space-y-2">
          {userOrder.length === 0 ? (
            <div className="text-white/40 text-center py-4">Выбери слова и расставь их по алфавиту</div>
          ) : (
            userOrder.map((word, index) => (
              <div key={index} className="flex items-center gap-2 bg-teal-500/20 rounded-lg p-2">
                <span className="text-teal-300 font-bold w-6">{index + 1}.</span>
                <span className="text-white flex-1">{word}</span>
                <button onClick={() => handleMoveUp(index)} disabled={index === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30">
                  <ArrowUp className="w-4 h-4 text-teal-300" />
                </button>
                <button onClick={() => handleMoveDown(index)} disabled={index === userOrder.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30">
                  <ArrowDown className="w-4 h-4 text-teal-300" />
                </button>
                <button onClick={() => handleRemoveFromOrder(word)} className="p-1 hover:bg-white/10 rounded">
                  <X className="w-4 h-4 text-red-300" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Available Words */}
      <div className="mb-6">
        <h3 className="text-cyan-300 text-sm mb-2 font-medium">Доступные слова:</h3>
        <div className="flex flex-wrap gap-2">
          {availableWords.map(word => (
            <button
              key={word}
              onClick={() => handleWordClick(word)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedWord === word
                  ? 'bg-teal-500/50 border-2 border-teal-300 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleAddToOrder}
          disabled={!selectedWord}
          className="flex-1 py-3 rounded-xl bg-teal-500/30 hover:bg-teal-500/40 disabled:opacity-50 disabled:cursor-not-allowed text-teal-300 font-bold transition-all"
        >
          Добавить
        </button>
        <button
          onClick={() => {
            setShuffledWords(shuffleArray(shuffledWords))
            playSound('click')
          }}
          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-all"
        >
          <Shuffle className="w-5 h-5" />
        </button>
        <button
          onClick={checkResult}
          disabled={userOrder.length !== currentSet?.words.length}
          className="flex-1 py-3 rounded-xl bg-green-500/30 hover:bg-green-500/40 disabled:opacity-50 disabled:cursor-not-allowed text-green-300 font-bold transition-all"
        >
          Проверить
        </button>
      </div>
    </div>
  )
}
