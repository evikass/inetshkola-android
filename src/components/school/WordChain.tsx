'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Link2, Check, RotateCcw, Trophy, Timer, HelpCircle, Zap } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

// Словарь слов по категориям
const wordBank: Record<string, string[]> = {
  animals: ['КОТ', 'СОБАКА', 'ТИГР', 'ЛЕВ', 'МЕДВЕДЬ', 'ЛИСА', 'ВОЛК', 'ЗАЯЦ', 'БЕЛКА', 'ЕЖ', 'КАБАН', 'НОСОРОГ', 'ГИЕНА', 'АИСТ', 'ТЕЛЕНОК', 'КОРОВА', 'АНТИЛОПА', 'АКУЛА', 'АНАКОНДА', 'АПЕЛЬСИН'],
  nature: ['ДЕРЕВО', 'ОЗЕРО', 'РЕКА', 'МОРЕ', 'ГОРА', 'ОБЛАКО', 'НЕБО', 'ОГОНЬ', 'ЗЕМЛЯ', 'ЛЕС', 'СНЕГ', 'ГРАД', 'ДОЖДЬ', 'ТРАВА', 'ЦВЕТОК', 'КАМЕНЬ', 'ПЕСОК', 'ВОЛНА', 'АСФАЛЬТ', 'ТРЯСИНА'],
  objects: ['СТОЛ', 'СТУЛ', 'Лампа', 'ОКНО', 'ДВЕРЬ', 'КНИГА', 'ТЕЛЕФОН', 'КОМПЬЮТЕР', 'КЛАВИАТУРА', 'РУЧКА', 'КАРАНДАШ', 'ЛИНЕЙКА', 'ТЕТРАДЬ', 'ШКАФ', 'ДИВАН', 'КРОВАТЬ', 'КОВЁР', 'ЗЕРКАЛО', 'ЧАСЫ', 'СУМКА'],
  food: ['ХЛЕБ', 'БОЛОТНИК', 'КАРТОШКА', 'ЯБЛОКО', 'ГРУША', 'СЫР', 'МОЛОКО', 'МОРОЖЕНОЕ', 'МЯСО', 'ОВОЩ', 'ФРУКТ', 'ЧАЙ', 'КОФЕ', 'ШОКОЛАД', 'ТОРТ', 'ПИРОГ', 'СУП', 'САЛАТ', 'БУТЕРБРОД', 'ДИЕТА'],
  city: ['МОСКВА', 'АРХАНГЕЛЬСК', 'КИЕВ', 'ВЛАДИВОСТОК', 'КАЗАНЬ', 'НОВОСИБИРСК', 'КРАСНОДАР', 'РОСТОВ', 'ВОРОНЕЖ', 'ЖУКОВСКИЙ', 'ЙОШКАР-ОЛА', 'АБАКАН', 'НАЛЬЧИК', 'КИСЛОВОДСК', 'КУРСК', 'КАЛИНИНГРАД', 'ДУБНА', 'АПАТИТЫ', 'СЫКТЫВКАР', 'РЯЗАНЬ'],
}

// Объединяем все слова
const allWords = Object.values(wordBank).flat()

export default function WordChain() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [currentWord, setCurrentWord] = useState<string>('')
  const [userWord, setUserWord] = useState('')
  const [chain, setChain] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [gameMode, setGameMode] = useState<'timed' | 'endless' | 'challenge' | null>(null)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [message, setMessage] = useState('')
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set())
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const getLastLetter = (word: string): string => {
    const lastChar = word.slice(-1).toUpperCase()
    // Русские слова не должны заканчиваться на Ъ, Ь, Ы для следующего слова
    if (['Ъ', 'Ь', 'Ы'].includes(lastChar)) {
      return word.slice(-2, -1).toUpperCase()
    }
    return lastChar
  }

  const isValidWord = useCallback((word: string): boolean => {
    const upperWord = word.toUpperCase().trim()
    // Проверка длины
    if (upperWord.length < 2) return false
    // Проверка что слово из русских букв
    if (!/^[А-ЯЁ]+$/.test(upperWord)) return false
    // Проверка что слово не использовано
    if (usedWords.has(upperWord)) return false
    // Проверка что начинается на нужную букву
    if (currentWord) {
      const neededLetter = getLastLetter(currentWord)
      if (!upperWord.startsWith(neededLetter)) return false
    }
    // Проверка что слово есть в словаре (для простоты - любое слово из 2+ букв)
    return true
  }, [currentWord, usedWords])

  const getRandomWord = useCallback(() => {
    const available = allWords.filter(w => !usedWords.has(w))
    if (available.length === 0) return allWords[Math.floor(Math.random() * allWords.length)]
    return available[Math.floor(Math.random() * available.length)]
  }, [usedWords])

  const startGame = useCallback((mode: 'timed' | 'endless' | 'challenge', diff: 'easy' | 'medium' | 'hard') => {
    setGameMode(mode)
    setDifficulty(diff)
    setTimeLeft(mode === 'timed' ? 60 : 0)
    setScore(0)
    setStreak(0)
    setChain([])
    setUsedWords(new Set())
    setUserWord('')
    setMessage('')
    setGameState('playing')
    
    const firstWord = getRandomWord()
    setCurrentWord(firstWord)
    setUsedWords(new Set([firstWord.toUpperCase()]))
    setChain([firstWord])
  }, [getRandomWord])

  useEffect(() => {
    if (gameMode === 'timed' && gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    } else if (timeLeft === 0 && gameMode === 'timed' && gameState === 'playing') {
      setGameState('finished')
    }
  }, [timeLeft, gameMode, gameState])

  const submitWord = useCallback(() => {
    const word = userWord.toUpperCase().trim()
    
    if (!word) return
    
    // Проверка валидности
    const neededLetter = getLastLetter(currentWord)
    
    if (!word.startsWith(neededLetter)) {
      setMessage(`❌ Слово должно начинаться на "${neededLetter}"`)
      playSound?.('error')
      setTimeout(() => setMessage(''), 2000)
      setUserWord('')
      return
    }
    
    if (usedWords.has(word)) {
      setMessage('❌ Это слово уже использовано!')
      playSound?.('error')
      setTimeout(() => setMessage(''), 2000)
      setUserWord('')
      return
    }
    
    if (word.length < 2) {
      setMessage('❌ Слишком короткое слово')
      playSound?.('error')
      setTimeout(() => setMessage(''), 2000)
      setUserWord('')
      return
    }
    
    // Слово принято
    const baseXP = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 12
    const lengthBonus = word.length >= 5 ? Math.floor(word.length * 0.5) : 0
    const streakBonus = streak >= 3 ? 3 : 0
    const totalXP = baseXP + lengthBonus + streakBonus
    
    addXP(totalXP)
    playSound?.('success')
    setScore(s => s + totalXP)
    setStreak(s => s + 1)
    setChain(prev => [...prev, word])
    setUsedWords(prev => new Set([...prev, word]))
    setCurrentWord(word)
    setUserWord('')
    setMessage(`✓ +${totalXP} XP${lengthBonus > 0 ? ` (длина +${lengthBonus})` : ''}${streakBonus > 0 ? ` (серия +${streakBonus})` : ''}`)
    setTimeout(() => setMessage(''), 1500)
  }, [userWord, currentWord, usedWords, difficulty, streak, addXP, playSound])

  const skipWord = useCallback(() => {
    // Найти слово из словаря, которое подходит
    const neededLetter = getLastLetter(currentWord)
    const available = allWords.filter(w => 
      w.startsWith(neededLetter) && !usedWords.has(w)
    )
    
    if (available.length > 0) {
      const nextWord = available[Math.floor(Math.random() * available.length)]
      setCurrentWord(nextWord)
      setUsedWords(prev => new Set([...prev, nextWord]))
      setChain(prev => [...prev, `(${nextWord})`])
      setStreak(0)
    } else {
      // Нет подходящих слов - закончить
      setGameState('finished')
    }
  }, [currentWord, usedWords])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-green-900/90 to-emerald-900/90 rounded-2xl p-6 backdrop-blur-sm border border-green-500/30">
        <h2 className="text-2xl font-bold text-green-200 mb-4 flex items-center gap-2">
          <Link2 className="w-6 h-6" />
          Цепочка слов
        </h2>
        <p className="text-green-100/80 mb-6">
          Каждое слово должно начинаться на последнюю букву предыдущего!
        </p>
        
        <div className="mb-4">
          <p className="text-green-200 text-sm mb-2">Сложность:</p>
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
                    : 'bg-green-800/50 text-green-200 hover:bg-green-700/50'
                }`}
              >
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          {(['timed', 'endless', 'challenge'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => startGame(mode, difficulty)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02] bg-gradient-to-r from-green-500/30 to-emerald-500/30 hover:from-green-500/40 hover:to-emerald-500/40 text-green-200"
            >
              <div className="font-bold flex items-center gap-2">
                {mode === 'timed' ? <Timer className="w-4 h-4" /> : 
                 mode === 'endless' ? <Link2 className="w-4 h-4" /> : 
                 <Zap className="w-4 h-4" />}
                {mode === 'timed' ? 'На время' : mode === 'endless' ? 'Бесконечная' : 'Челлендж'}
              </div>
              <div className="text-sm opacity-70">
                {mode === 'timed' ? '60 секунд • 5-12 XP' :
                 mode === 'endless' ? 'Без ограничений • 5-12 XP' :
                 'Максимальный счёт • 5-12 XP'}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    return (
      <div className="bg-gradient-to-br from-green-900/90 to-emerald-900/90 rounded-2xl p-6 backdrop-blur-sm border border-green-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-200 mb-2">Игра окончена!</h2>
        <p className="text-3xl font-bold text-white mb-4">{score} XP</p>
        <p className="text-green-300 mb-4">Слов в цепочке: {chain.filter(w => !w.startsWith('(')).length}</p>
        
        <div className="flex flex-wrap gap-1 justify-center max-w-md mx-auto mb-6 text-xs">
          {chain.slice(-10).map((word, i) => (
            <span key={i} className={`px-2 py-1 rounded ${word.startsWith('(') ? 'bg-gray-500/30 text-gray-300' : 'bg-green-500/30 text-green-300'}`}>
              {word.replace(/[()]/g, '')}
            </span>
          ))}
        </div>
        
        <button
          onClick={() => setGameState('setup')}
          className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  const neededLetter = getLastLetter(currentWord)

  return (
    <div className="bg-gradient-to-br from-green-900/90 to-emerald-900/90 rounded-2xl p-6 backdrop-blur-sm border border-green-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-200 flex items-center gap-2">
          <Link2 className="w-5 h-5" />
          Цепочка
        </h2>
        <div className="flex items-center gap-3">
          {gameMode === 'timed' && (
            <span className="text-green-200 bg-green-500/30 px-3 py-1 rounded-full text-sm font-mono">
              {timeLeft}с
            </span>
          )}
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">{score} XP</span>
        </div>
      </div>

      {/* Streak */}
      {streak >= 3 && (
        <div className="text-center mb-2">
          <span className="text-yellow-300 text-sm flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" />
            Серия x{streak}
          </span>
        </div>
      )}

      {/* Current word */}
      <div className="text-center mb-4">
        <p className="text-green-300/70 text-sm mb-1">Текущее слово:</p>
        <p className="text-3xl md:text-4xl font-bold text-white">{currentWord}</p>
        <p className="text-green-400 text-sm mt-1">
          Следующее слово на: <span className="font-bold text-2xl text-yellow-300">{neededLetter}</span>
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className="text-center mb-4 text-green-200 bg-green-800/30 rounded-lg p-2">
          {message}
        </div>
      )}

      {/* Input */}
      <div className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          value={userWord}
          onChange={(e) => setUserWord(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && submitWord()}
          placeholder={`${neededLetter}...`}
          autoFocus
          className="w-48 text-center text-xl font-bold bg-green-800/50 border-2 border-green-500/50 rounded-xl p-3 text-green-100 focus:outline-none focus:border-green-400"
        />
        <button
          onClick={submitWord}
          className="px-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all"
        >
          <Check className="w-6 h-6" />
        </button>
      </div>

      {/* Chain preview */}
      <div className="flex flex-wrap gap-1 justify-center mb-4 max-w-md mx-auto">
        {chain.slice(-5).map((word, i) => (
          <span key={i} className={`px-2 py-1 rounded text-sm ${word.startsWith('(') ? 'bg-gray-500/30 text-gray-300' : 'bg-green-500/30 text-green-300'}`}>
            {word.replace(/[()]/g, '')}
          </span>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        <button
          onClick={skipWord}
          className="px-4 py-2 bg-green-700/50 hover:bg-green-600/50 text-green-200 rounded-lg transition-all flex items-center gap-2 text-sm"
        >
          <HelpCircle className="w-4 h-4" />
          Пропустить
        </button>
        <button
          onClick={() => setGameState('finished')}
          className="px-4 py-2 bg-green-800/50 hover:bg-green-700/50 text-green-200 rounded-lg transition-all text-sm"
        >
          Закончить
        </button>
      </div>
    </div>
  )
}
