'use client'

import { useState, useCallback, useEffect } from 'react'
import { Gamepad2, Trophy, RotateCcw, HelpCircle } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface HangmanWord {
  word: string
  hint: string
  category: string
}

const words: HangmanWord[] = [
  { word: 'ШКОЛА', hint: 'Место учёбы', category: 'Образование' },
  { word: 'УЧЕНИК', hint: 'Тот, кто учится', category: 'Образование' },
  { word: 'ТЕТРАДЬ', hint: 'Для записей', category: 'Школа' },
  { word: 'КАРАНДАШ', hint: 'Для рисования', category: 'Школа' },
  { word: 'УРОК', hint: 'Занятие в школе', category: 'Школа' },
  { word: 'ПАРТА', hint: 'Школьная мебель', category: 'Школа' },
  { word: 'ДОСКА', hint: 'Для записей мелом', category: 'Школа' },
  { word: 'ПЕРЕМЕНА', hint: 'Отдых между уроками', category: 'Школа' },
  { word: 'БИБЛИОТЕКА', hint: 'Хранилище книг', category: 'Здания' },
  { word: 'ВЕЛОСИПЕД', hint: 'Транспорт на двух колёсах', category: 'Транспорт' },
  { word: 'МАШИНА', hint: 'Автомобиль', category: 'Транспорт' },
  { word: 'САМОЛЁТ', hint: 'Летит по небу', category: 'Транспорт' },
  { word: 'ПАРОВОЗ', hint: 'Старый поезд', category: 'Транспорт' },
  { word: 'КОРАБЛЬ', hint: 'Плывёт по морю', category: 'Транспорт' },
  { word: 'СОЛНЦЕ', hint: 'Светит днём', category: 'Природа' },
  { word: 'ЗВЕЗДА', hint: 'Светит ночью', category: 'Природа' },
  { word: 'ОБЛАКО', hint: 'Плавает в небе', category: 'Природа' },
  { word: 'МОРОЗ', hint: 'Холод зимой', category: 'Природа' },
  { word: 'МЕДВЕДЬ', hint: 'Лесной великан', category: 'Животные' },
  { word: 'ЛИСИЦА', hint: 'Рыжая хитрюга', category: 'Животные' },
  { word: 'БЕЛКА', hint: 'Прыгает по веткам', category: 'Животные' },
  { word: 'ЗАЯЦ', hint: 'Длинные уши', category: 'Животные' },
  { word: 'ВОЛК', hint: 'Серый хищник', category: 'Животные' },
  { word: 'МОСКВА', hint: 'Столица России', category: 'Города' },
  { word: 'РОССИЯ', hint: 'Наша страна', category: 'Страны' },
  { word: 'КОМПЬЮТЕР', hint: 'Электронное устройство', category: 'Техника' },
  { word: 'ТЕЛЕФОН', hint: 'Для звонков', category: 'Техника' },
  { word: 'ТЕЛЕВИЗОР', hint: 'Для просмотра передач', category: 'Техника' },
]

const HANGMAN_STAGES = [
  // 0 - начальное состояние
  `
   _____
   |    |
        |
        |
        |
        |
  ______|`,
  // 1 - голова
  `
   _____
   |    |
   O    |
        |
        |
        |
  ______|`,
  // 2 - тело
  `
   _____
   |    |
   O    |
   |    |
        |
        |
  ______|`,
  // 3 - левая рука
  `
   _____
   |    |
   O    |
  /|    |
        |
        |
  ______|`,
  // 4 - правая рука
  `
   _____
   |    |
   O    |
  /|\\   |
        |
        |
  ______|`,
  // 5 - левая нога
  `
   _____
   |    |
   O    |
  /|\\   |
  /     |
        |
  ______|`,
  // 6 - правая нога (конец)
  `
   _____
   |    |
   O    |
  /|\\   |
  / \\   |
        |
  ______|`,
]

const RUSSIAN_ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'

export default function HangmanGame() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [currentWord, setCurrentWord] = useState<HangmanWord | null>(null)
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [score, setScore] = useState(0)
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'won' | 'lost'>('setup')
  const [usedWords, setUsedWords] = useState<Set<number>>(new Set())

  const getNextWord = useCallback(() => {
    const available = words
      .map((w, i) => ({ ...w, index: i }))
      .filter(w => !usedWords.has(w.index))
    
    if (available.length === 0) {
      setUsedWords(new Set())
      return words[Math.floor(Math.random() * words.length)]
    }
    
    const chosen = available[Math.floor(Math.random() * available.length)]
    setUsedWords(prev => new Set([...prev, chosen.index]))
    return chosen
  }, [usedWords])

  const startGame = useCallback(() => {
    const word = getNextWord()
    setCurrentWord(word)
    setGuessedLetters(new Set())
    setWrongGuesses(0)
    setShowHint(false)
    setGameState('playing')
  }, [getNextWord])

  const guessLetter = useCallback((letter: string) => {
    if (guessedLetters.has(letter) || !currentWord) return
    
    const newGuessed = new Set([...guessedLetters, letter])
    setGuessedLetters(newGuessed)
    
    if (currentWord.word.includes(letter)) {
      playSound?.('success')
      // Check if won
      const allLettersGuessed = currentWord.word.split('').every(l => newGuessed.has(l))
      if (allLettersGuessed) {
        const xpGained = Math.max(20 - wrongGuesses * 2, 5)
        addXP(xpGained)
        setScore(s => s + xpGained)
        setWins(w => w + 1)
        setGameState('won')
      }
    } else {
      playSound?.('error')
      const newWrong = wrongGuesses + 1
      setWrongGuesses(newWrong)
      if (newWrong >= 6) {
        setLosses(l => l + 1)
        setGameState('lost')
      }
    }
  }, [guessedLetters, currentWord, wrongGuesses, playSound, addXP])

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      const key = e.key.toUpperCase()
      if (RUSSIAN_ALPHABET.includes(key)) {
        guessLetter(key)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, guessLetter])

  const getDisplayWord = useCallback(() => {
    if (!currentWord) return ''
    return currentWord.word.split('').map(letter => 
      guessedLetters.has(letter) ? letter : '_'
    ).join(' ')
  }, [currentWord, guessedLetters])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-2xl p-6 backdrop-blur-sm border border-slate-500/30">
        <h2 className="text-2xl font-bold text-slate-200 mb-4 flex items-center gap-2">
          <Gamepad2 className="w-6 h-6" />
          Виселица
        </h2>
        <p className="text-slate-100/80 mb-6">
          Угадай слово по буквам! У тебя 6 попыток. Можно использовать клавиатуру.
        </p>
        <div className="text-center">
          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-400 hover:to-gray-400 text-white font-bold rounded-xl transition-all text-lg"
          >
            Начать игру
          </button>
        </div>
        {wins + losses > 0 && (
          <div className="mt-6 text-center text-slate-300">
            <span className="text-green-400">Побед: {wins}</span>
            <span className="mx-4">|</span>
            <span className="text-red-400">Поражений: {losses}</span>
          </div>
        )}
      </div>
    )
  }

  if (gameState === 'won' || gameState === 'lost') {
    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-2xl p-6 backdrop-blur-sm border border-slate-500/30 text-center">
        {gameState === 'won' ? (
          <>
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-400 mb-2">Победа!</h2>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Поражение</h2>
          </>
        )}
        
        <p className="text-slate-300 mb-2">
          Слово: <span className="font-bold text-white">{currentWord?.word}</span>
        </p>
        {gameState === 'won' && (
          <p className="text-xl text-yellow-400 mb-4">+{Math.max(20 - wrongGuesses * 2, 5)} XP</p>
        )}
        
        <div className="flex gap-4 justify-center mb-6">
          <div className="bg-green-500/20 rounded-xl p-3">
            <div className="text-xl font-bold text-green-300">{wins}</div>
            <div className="text-green-400 text-sm">Побед</div>
          </div>
          <div className="bg-red-500/20 rounded-xl p-3">
            <div className="text-xl font-bold text-red-300">{losses}</div>
            <div className="text-red-400 text-sm">Поражений</div>
          </div>
        </div>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-slate-500 hover:bg-slate-400 text-white font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Ещё раз
          </button>
          <button
            onClick={() => setGameState('setup')}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all"
          >
            К меню
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-2xl p-6 backdrop-blur-sm border border-slate-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5" />
          Виселица
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-slate-300 text-sm">{currentWord?.category}</span>
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">{score} XP</span>
        </div>
      </div>

      {/* Hangman drawing */}
      <div className="flex justify-center mb-4">
        <pre className="text-xs md:text-sm text-slate-300 font-mono bg-slate-950 p-3 rounded-lg">
          {HANGMAN_STAGES[wrongGuesses]}
        </pre>
      </div>

      {/* Word display */}
      <div className="text-center mb-4">
        <div className="text-3xl md:text-4xl font-mono font-bold text-white tracking-widest">
          {getDisplayWord()}
        </div>
        <p className="text-slate-400 mt-2">Ошибок: {wrongGuesses}/6</p>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="text-center mb-4 text-yellow-300 bg-yellow-500/20 rounded-lg p-3">
          💡 Подсказка: {currentWord?.hint}
        </div>
      )}

      {/* Keyboard */}
      <div className="flex flex-wrap gap-1 justify-center mb-4">
        {RUSSIAN_ALPHABET.split('').map(letter => {
          const isGuessed = guessedLetters.has(letter)
          const isCorrect = currentWord?.word.includes(letter) && isGuessed
          const isWrong = !currentWord?.word.includes(letter) && isGuessed
          
          return (
            <button
              key={letter}
              onClick={() => guessLetter(letter)}
              disabled={isGuessed}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-bold text-sm transition-all ${
                isCorrect
                  ? 'bg-green-500 text-white'
                  : isWrong
                  ? 'bg-red-500/50 text-red-300'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              } ${isGuessed ? 'opacity-60' : ''}`}
            >
              {letter}
            </button>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        {!showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="px-4 py-2 bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-200 rounded-lg transition-all flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Подсказка
          </button>
        )}
        <button
          onClick={() => setGameState('setup')}
          className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg transition-all"
        >
          К меню
        </button>
      </div>
    </div>
  )
}
