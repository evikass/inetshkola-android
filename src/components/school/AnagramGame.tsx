'use client'

import { useState, useCallback, useEffect } from 'react'
import { RefreshCw, Check, SkipForward, Trophy, Clock, Star } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface AnagramWord {
  letters: string
  words: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

const anagrams: AnagramWord[] = [
  // Easy - 3-4 буквы, 2-3 слова
  { letters: 'КОТ', words: ['КОТ', 'ТОК'], difficulty: 'easy', category: 'Животные/Действия' },
  { letters: 'СОН', words: ['СОН', 'НОС'], difficulty: 'easy', category: 'Состояние/Части тела' },
  { letters: 'МАЯК', words: ['МАЯК', 'ЯМАК'], difficulty: 'easy', category: 'Здания' },
  { letters: 'РОТ', words: ['РОТ', 'ТОР', 'ОРТ'], difficulty: 'easy', category: 'Части тела' },
  { letters: 'ПАР', words: ['ПАР', 'РАП'], difficulty: 'easy', category: 'Физика' },
  { letters: 'МИР', words: ['МИР', 'РИМ'], difficulty: 'easy', category: 'Общество/Города' },
  { letters: 'ЛУК', words: ['ЛУК', 'КЛУ'], difficulty: 'easy', category: 'Растения' },
  // Medium - 4-5 букв, 2-4 слова
  { letters: 'КАРТА', words: ['КАРТА', 'КАТРА'], difficulty: 'medium', category: 'География' },
  { letters: 'СЛОВО', words: ['СЛОВО', 'ВОЛОС'], difficulty: 'medium', category: 'Язык' },
  { letters: 'СОЛЬ', words: ['СОЛЬ', 'ЛЬЁС', 'СЛЁО'], difficulty: 'medium', category: 'Вещества' },
  { letters: 'РОСТ', words: ['РОСТ', 'СОРТ', 'ТОРС', 'РОТС'], difficulty: 'medium', category: 'Измерения' },
  { letters: 'ЛАПА', words: ['ЛАПА', 'ПАЛА'], difficulty: 'medium', category: 'Части тела' },
  { letters: 'КУСТ', words: ['КУСТ', 'СТУК', 'ТУСК'], difficulty: 'medium', category: 'Природа' },
  { letters: 'ГОРД', words: ['ГОРД', 'РОГД'], difficulty: 'medium', category: 'Эмоции' },
  { letters: 'ВЕСНА', words: ['ВЕСНА', 'СЕНВА'], difficulty: 'medium', category: 'Времена года' },
  // Hard - 5-6 букв, множественные слова
  { letters: 'СТОЛИК', words: ['СТОЛИК', 'ИСКОЛТ', 'ЛОТСКИ'], difficulty: 'hard', category: 'Мебель' },
  { letters: 'КАМЕНЬ', words: ['КАМЕНЬ', 'МЕКАНЬ'], difficulty: 'hard', category: 'Природа' },
  { letters: 'ПРИРОД', words: ['ПРИРОД', 'РОПРИД'], difficulty: 'hard', category: 'Окружающий мир' },
  { letters: 'ТЕАТР', words: ['ТЕАТР', 'ТАТЕР', 'РЕТАТ'], difficulty: 'hard', category: 'Культура' },
  { letters: 'СТРЕЛА', words: ['СТРЕЛА', 'РЕСТЛА', 'СЕРЛАТ'], difficulty: 'hard', category: 'Оружие' },
]

type GameMode = 'timed' | 'relaxed' | 'challenge'

const modeConfig: Record<GameMode, { time: number; wordsPerRound: number; xpBase: number }> = {
  timed: { time: 60, wordsPerRound: 3, xpBase: 8 },
  relaxed: { time: 0, wordsPerRound: 2, xpBase: 5 },
  challenge: { time: 90, wordsPerRound: 5, xpBase: 12 }
}

export default function AnagramGame() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [currentAnagram, setCurrentAnagram] = useState<AnagramWord | null>(null)
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set())
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [shuffledLetters, setShuffledLetters] = useState('')
  const [message, setMessage] = useState('')
  const [usedAnagrams, setUsedAnagrams] = useState<Set<number>>(new Set())

  const shuffleLetters = useCallback((letters: string) => {
    return letters.split('').sort(() => Math.random() - 0.5).join('')
  }, [])

  const getNextAnagram = useCallback(() => {
    const available = anagrams
      .map((a, i) => ({ ...a, index: i }))
      .filter(a => a.difficulty === difficulty && !usedAnagrams.has(a.index))
    
    if (available.length === 0) {
      setUsedAnagrams(new Set())
      const filtered = anagrams.filter(a => a.difficulty === difficulty)
      return filtered[Math.floor(Math.random() * filtered.length)]
    }
    
    const chosen = available[Math.floor(Math.random() * available.length)]
    setUsedAnagrams(prev => new Set([...prev, chosen.index]))
    return chosen
  }, [difficulty, usedAnagrams])

  const startGame = useCallback((mode: GameMode, diff: 'easy' | 'medium' | 'hard') => {
    setGameMode(mode)
    setDifficulty(diff)
    setTimeLeft(modeConfig[mode].time)
    setScore(0)
    setRound(1)
    setUsedAnagrams(new Set())
    setGameState('playing')
    
    const first = anagrams.filter(a => a.difficulty === diff)[Math.floor(Math.random() * anagrams.filter(a => a.difficulty === diff).length)]
    setCurrentAnagram(first)
    setShuffledLetters(shuffleLetters(first.letters))
    setFoundWords(new Set())
    setUserInput('')
    setMessage('')
  }, [shuffleLetters])

  useEffect(() => {
    if (gameMode && modeConfig[gameMode].time > 0 && gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, gameMode, gameState])

  // Отдельный эффект для завершения игры при истечении времени
  useEffect(() => {
    if (timeLeft === 0 && gameMode && modeConfig[gameMode].time > 0 && gameState === 'playing') {
      const timer = setTimeout(() => setGameState('finished'), 0)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, gameMode, gameState])

  const checkWord = useCallback(() => {
    if (!currentAnagram || !userInput.trim()) return
    
    const word = userInput.toUpperCase().trim()
    
    if (currentAnagram.words.includes(word) && !foundWords.has(word)) {
      playSound?.('success')
      setFoundWords(prev => new Set([...prev, word]))
      addXP(modeConfig[gameMode!].xpBase)
      setScore(s => s + modeConfig[gameMode!].xpBase)
      setMessage(`✓ "${word}" найдено!`)
      setUserInput('')
    } else if (foundWords.has(word)) {
      setMessage('Уже найдено!')
      playSound?.('error')
    } else {
      setMessage('Не подходит...')
      playSound?.('error')
    }
    
    setTimeout(() => setMessage(''), 1500)
  }, [currentAnagram, userInput, foundWords, gameMode, playSound, addXP])

  const nextRound = useCallback(() => {
    if (round >= modeConfig[gameMode!].wordsPerRound) {
      setGameState('finished')
    } else {
      const next = getNextAnagram()
      setCurrentAnagram(next)
      setShuffledLetters(shuffleLetters(next.letters))
      setFoundWords(new Set())
      setUserInput('')
      setMessage('')
      setRound(r => r + 1)
    }
  }, [round, gameMode, getNextAnagram, shuffleLetters])

  const reshuffleLetters = useCallback(() => {
    if (currentAnagram) {
      setShuffledLetters(shuffleLetters(currentAnagram.letters))
    }
  }, [currentAnagram, shuffleLetters])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-fuchsia-900/90 to-purple-900/90 rounded-2xl p-6 backdrop-blur-sm border border-fuchsia-500/30">
        <h2 className="text-2xl font-bold text-fuchsia-200 mb-4 flex items-center gap-2">
          <RefreshCw className="w-6 h-6" />
          Анаграммы
        </h2>
        <p className="text-fuchsia-100/80 mb-6">
          Составь слова из данных букв! Найди все возможные слова.
        </p>
        
        <div className="mb-4">
          <p className="text-fuchsia-200 text-sm mb-2">Сложность:</p>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  difficulty === d
                    ? d === 'easy' ? 'bg-green-500 text-white' :
                      d === 'medium' ? 'bg-yellow-500 text-white' :
                      'bg-red-500 text-white'
                    : 'bg-fuchsia-800/50 text-fuchsia-200 hover:bg-fuchsia-700/50'
                }`}
              >
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          {(['timed', 'relaxed', 'challenge'] as GameMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => startGame(mode, difficulty)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30 hover:from-fuchsia-500/40 hover:to-purple-500/40 text-fuchsia-200"
            >
              <div className="font-bold flex items-center gap-2">
                {mode === 'timed' ? <Clock className="w-4 h-4" /> : 
                 mode === 'relaxed' ? <Star className="w-4 h-4" /> : 
                 <Trophy className="w-4 h-4" />}
                {mode === 'timed' ? 'На время' : mode === 'relaxed' ? 'Расслабленный' : 'Челлендж'}
              </div>
              <div className="text-sm opacity-70">
                {mode === 'timed' ? '60 сек • 3 раунда • 8 XP' :
                 mode === 'relaxed' ? 'Без времени • 2 раунда • 5 XP' :
                 '90 сек • 5 раундов • 12 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    return (
      <div className="bg-gradient-to-br from-fuchsia-900/90 to-purple-900/90 rounded-2xl p-6 backdrop-blur-sm border border-fuchsia-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-fuchsia-200 mb-2">Игра окончена!</h2>
        <p className="text-3xl font-bold text-white mb-4">{score} XP</p>
        <p className="text-fuchsia-300 mb-6">Найдено слов: {foundWords.size}</p>
        
        <button
          onClick={() => setGameState('setup')}
          className="px-6 py-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold rounded-xl transition-all"
        >
          Играть снова
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-fuchsia-900/90 to-purple-900/90 rounded-2xl p-6 backdrop-blur-sm border border-fuchsia-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-fuchsia-200 flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Анаграммы
        </h2>
        <div className="flex items-center gap-3">
          {gameMode && modeConfig[gameMode].time > 0 && (
            <span className="text-fuchsia-200 bg-fuchsia-500/30 px-3 py-1 rounded-full text-sm font-mono">
              {timeLeft}с
            </span>
          )}
          <span className="text-fuchsia-300 text-sm">Раунд {round}</span>
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">{score} XP</span>
        </div>
      </div>

      {/* Letters */}
      <div className="text-center mb-6">
        <div className="flex justify-center gap-2 mb-2">
          {shuffledLetters.split('').map((letter, i) => (
            <div
              key={i}
              className="w-12 h-14 bg-fuchsia-700/50 rounded-xl flex items-center justify-center text-2xl font-bold text-fuchsia-100 shadow-lg"
            >
              {letter}
            </div>
          ))}
        </div>
        <p className="text-fuchsia-300/70 text-sm">{currentAnagram?.category}</p>
      </div>

      {/* Found words */}
      <div className="mb-4">
        <p className="text-fuchsia-300 text-sm mb-2">Найдено слов: {foundWords.size} / {currentAnagram?.words.length}</p>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {Array.from(foundWords).map((word, i) => (
            <span key={i} className="px-3 py-1 bg-green-500/30 text-green-300 rounded-full text-sm font-medium">
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && checkWord()}
          placeholder="Введи слово..."
          className="flex-1 text-center text-xl font-bold bg-fuchsia-800/50 border-2 border-fuchsia-500/50 rounded-xl p-3 text-fuchsia-100 focus:outline-none focus:border-fuchsia-400"
          maxLength={currentAnagram?.letters.length || 6}
        />
        <button
          onClick={checkWord}
          className="px-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all"
        >
          <Check className="w-5 h-5" />
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="text-center mb-4 text-fuchsia-200">
          {message}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={reshuffleLetters}
          className="px-4 py-2 bg-fuchsia-700/50 hover:bg-fuchsia-600/50 text-fuchsia-200 rounded-lg transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Перемешать
        </button>
        <button
          onClick={nextRound}
          className="px-4 py-2 bg-fuchsia-600/50 hover:bg-fuchsia-600 text-fuchsia-200 rounded-lg transition-all flex items-center gap-2"
        >
          <SkipForward className="w-4 h-4" />
          Далее
        </button>
      </div>
    </div>
  )
}
