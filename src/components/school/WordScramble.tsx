'use client'

import { useState, useCallback, useEffect } from 'react'
import { Shuffle, Check, RefreshCw, Volume2, Star } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface WordItem {
  word: string
  hint: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const wordBank: WordItem[] = [
  // Легкие слова
  { word: 'КОТ', hint: 'Домашнее животное', category: 'Животные', difficulty: 'easy' },
  { word: 'ДОМ', hint: 'Жилое здание', category: 'Строения', difficulty: 'easy' },
  { word: 'ЛЕС', hint: 'Много деревьев', category: 'Природа', difficulty: 'easy' },
  { word: 'МАМА', hint: 'Родитель', category: 'Семья', difficulty: 'easy' },
  { word: 'НОС', hint: 'Часть лица', category: 'Тело', difficulty: 'easy' },
  { word: 'СЫР', hint: 'Молочный продукт', category: 'Еда', difficulty: 'easy' },
  { word: 'ШАР', hint: 'Круглый предмет', category: 'Формы', difficulty: 'easy' },
  { word: 'РОТ', hint: 'Для еды', category: 'Тело', difficulty: 'easy' },
  { word: 'МОРЕ', hint: 'Большая вода', category: 'Природа', difficulty: 'easy' },
  { word: 'ЛУНА', hint: 'Светит ночью', category: 'Космос', difficulty: 'easy' },
  // Средние слова
  { word: 'ШКОЛА', hint: 'Учебное заведение', category: 'Образование', difficulty: 'medium' },
  { word: 'КНИГА', hint: 'Для чтения', category: 'Образование', difficulty: 'medium' },
  { word: 'ПАРТА', hint: 'Школьная мебель', category: 'Образование', difficulty: 'medium' },
  { word: 'ЛИСТЬЯ', hint: 'На деревьях', category: 'Природа', difficulty: 'medium' },
  { word: 'СОБАКА', hint: 'Верный друг', category: 'Животные', difficulty: 'medium' },
  { word: 'МЕДВЕДЬ', hint: 'Лесной великан', category: 'Животные', difficulty: 'medium' },
  { word: 'СНЕЖИНКА', hint: 'Зимний узор', category: 'Природа', difficulty: 'medium' },
  { word: 'ПОЕЗД', hint: 'Транспорт на рельсах', category: 'Транспорт', difficulty: 'medium' },
  { word: 'САМОЛЁТ', hint: 'Летит в небе', category: 'Транспорт', difficulty: 'medium' },
  { word: 'УРОЖАЙ', hint: 'Собирают осенью', category: 'Сельское хозяйство', difficulty: 'medium' },
  // Сложные слова
  { word: 'ЭНЦИКЛОПЕДИЯ', hint: 'Книга знаний', category: 'Образование', difficulty: 'hard' },
  { word: 'МАТЕМАТИКА', hint: 'Наука о числах', category: 'Наука', difficulty: 'hard' },
  { word: 'ГЕОМЕТРИЯ', hint: 'Наука о фигурах', category: 'Наука', difficulty: 'hard' },
  { word: 'КОНСТИТУЦИЯ', hint: 'Основной закон', category: 'Общество', difficulty: 'hard' },
  { word: 'БИБЛИОТЕКА', hint: 'Хранилище книг', category: 'Образование', difficulty: 'hard' },
  { word: 'АТМОСФЕРА', hint: 'Воздушная оболочка', category: 'Наука', difficulty: 'hard' },
  { word: 'ТЕМПЕРАТУРА', hint: 'Степень нагрева', category: 'Физика', difficulty: 'hard' },
  { word: 'ИСТОРИЯ', hint: 'Наука о прошлом', category: 'Наука', difficulty: 'hard' },
]

function scrambleWord(word: string): string {
  const chars = word.split('')
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join('')
}

export default function WordScramble() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null)
  const [scrambled, setScrambled] = useState('')
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [message, setMessage] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [gameStarted, setGameStarted] = useState(false)

  const getNewWord = useCallback(() => {
    const filtered = wordBank.filter(w => w.difficulty === difficulty)
    const randomWord = filtered[Math.floor(Math.random() * filtered.length)]
    setCurrentWord(randomWord)
    setScrambled(scrambleWord(randomWord.word))
    setUserInput('')
    setShowHint(false)
    setHintsUsed(0)
    setIsCorrect(null)
    setMessage('')
  }, [difficulty])

  useEffect(() => {
    if (gameStarted) {
      getNewWord()
    }
  }, [gameStarted, getNewWord])

  const checkAnswer = useCallback(() => {
    if (!currentWord) return
    
    if (userInput.toUpperCase() === currentWord.word) {
      const xpGain = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 20
      const bonus = streak >= 3 ? Math.floor(xpGain * 0.5) : 0
      addXP(xpGain + bonus)
      playSound?.('success')
      setScore(s => s + xpGain + bonus)
      setStreak(s => s + 1)
      setIsCorrect(true)
      setMessage(`Правильно! +${xpGain + bonus} XP${bonus > 0 ? ' (бонус за серию!)' : ''}`)
      
      setTimeout(() => {
        getNewWord()
      }, 1500)
    } else {
      playSound?.('error')
      setIsCorrect(false)
      setMessage('Попробуй ещё раз!')
      setStreak(0)
    }
  }, [currentWord, userInput, difficulty, streak, addXP, playSound, getNewWord])

  const revealHint = useCallback(() => {
    if (!showHint && hintsUsed < 2) {
      setShowHint(true)
      setHintsUsed(h => h + 1)
    }
  }, [showHint, hintsUsed])

  const revealFirstLetter = useCallback(() => {
    if (currentWord && hintsUsed < 3) {
      const firstLetter = currentWord.word[0]
      setUserInput(firstLetter)
      setHintsUsed(h => h + 1)
    }
  }, [currentWord, hintsUsed])

  if (!gameStarted) {
    return (
      <div className="bg-gradient-to-br from-teal-900/90 to-cyan-900/90 rounded-2xl p-6 backdrop-blur-sm border border-teal-500/30">
        <h2 className="text-2xl font-bold text-teal-200 mb-4 flex items-center gap-2">
          <Shuffle className="w-6 h-6" />
          Перемешай буквы
        </h2>
        <p className="text-teal-100/80 mb-6">
          Составь слово из перемешанных букв. Выбери уровень сложности:
        </p>
        <div className="flex flex-col gap-3">
          {(['easy', 'medium', 'hard'] as const).map((d) => (
            <button
              key={d}
              onClick={() => { setDifficulty(d); setGameStarted(true) }}
              className={`p-4 rounded-xl text-left transition-all hover:scale-[1.02] ${
                d === 'easy' ? 'bg-green-500/30 hover:bg-green-500/40 text-green-200' :
                d === 'medium' ? 'bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-200' :
                'bg-red-500/30 hover:bg-red-500/40 text-red-200'
              }`}
            >
              <div className="font-bold">
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </div>
              <div className="text-sm opacity-70">
                {d === 'easy' ? '3-4 буквы • 5 XP' : d === 'medium' ? '5-7 букв • 10 XP' : '8+ букв • 20 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-teal-900/90 to-cyan-900/90 rounded-2xl p-6 backdrop-blur-sm border border-teal-500/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-teal-200 flex items-center gap-2">
          <Shuffle className="w-6 h-6" />
          Перемешай буквы
        </h2>
        <div className="flex gap-2 items-center">
          <span className="text-teal-200 bg-teal-500/30 px-3 py-1 rounded-full text-sm">
            Счёт: {score}
          </span>
          {streak >= 2 && (
            <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Star className="w-3 h-3" />
              x{streak}
            </span>
          )}
        </div>
      </div>

      {/* Scrambled word */}
      <div className="text-center mb-6">
        <div className="text-4xl md:text-5xl font-mono font-bold text-teal-100 tracking-widest bg-teal-800/50 rounded-xl py-4 px-6 inline-block">
          {scrambled.split('').map((char, i) => (
            <span key={i} className="inline-block animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              {char}
            </span>
          ))}
        </div>
        <p className="text-teal-300/70 mt-2">Категория: {currentWord?.category}</p>
      </div>

      {/* Input */}
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          placeholder="Введи слово..."
          className="w-full max-w-md text-center text-2xl font-bold bg-teal-800/50 border-2 border-teal-500/50 rounded-xl p-3 text-teal-100 placeholder:text-teal-500 focus:outline-none focus:border-teal-400"
        />

        {message && (
          <div className={`text-center font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </div>
        )}

        {/* Hint area */}
        {showHint && (
          <div className="text-teal-200 bg-teal-700/50 rounded-lg px-4 py-2 flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Подсказка: {currentWord?.hint}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={checkAnswer}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Проверить
          </button>
          <button
            onClick={getNewWord}
            className="px-4 py-3 bg-teal-700/50 hover:bg-teal-600/50 text-teal-200 rounded-xl transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Пропустить
          </button>
          {!showHint && (
            <button
              onClick={revealHint}
              className="px-4 py-3 bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-200 rounded-xl transition-all"
            >
              💡 Подсказка
            </button>
          )}
          {showHint && hintsUsed < 3 && (
            <button
              onClick={revealFirstLetter}
              className="px-4 py-3 bg-purple-500/30 hover:bg-purple-500/40 text-purple-200 rounded-xl transition-all"
            >
              🔤 Первая буква
            </button>
          )}
        </div>
      </div>

      {/* Difficulty change */}
      <div className="mt-6 flex justify-center gap-2">
        {(['easy', 'medium', 'hard'] as const).map((d) => (
          <button
            key={d}
            onClick={() => { setDifficulty(d); getNewWord() }}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              difficulty === d
                ? d === 'easy' ? 'bg-green-500 text-white' :
                  d === 'medium' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                : 'bg-teal-800/50 text-teal-300 hover:bg-teal-700/50'
            }`}
          >
            {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
          </button>
        ))}
      </div>
    </div>
  )
}
