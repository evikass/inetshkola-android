'use client'

import { useState, useCallback } from 'react'
import { Volume2, Check, X, Trophy, RotateCcw, Star, Zap } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'

interface SoundQuestion {
  sound: string
  answer: string
  options: string[]
  explanation: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const questions: SoundQuestion[] = [
  // Easy - простые звуки
  { sound: '"МУУУ"', answer: 'КОРОВА', options: ['КОРОВА', 'КОЗА', 'ОВЦА', 'СВИНЬЯ'], explanation: 'Корова мычит', category: 'Животные', difficulty: 'easy' },
  { sound: '"Гав-гав!"', answer: 'СОБАКА', options: ['КОТ', 'СОБАКА', 'ЛИСА', 'ВОЛК'], explanation: 'Собака лает', category: 'Животные', difficulty: 'easy' },
  { sound: '"Мяу-мяу"', answer: 'КОТ', options: ['СОБАКА', 'КОТ', 'ТИГР', 'ЛЕВ'], explanation: 'Кошка мяукает', category: 'Животные', difficulty: 'easy' },
  { sound: '"Кукареку!"', answer: 'ПЕТУХ', options: ['КУРИЦА', 'ПЕТУХ', 'УТКА', 'ГУСЬ'], explanation: 'Петух кукарекает', category: 'Птицы', difficulty: 'easy' },
  { sound: '"Хрю-хрю"', answer: 'СВИНЬЯ', options: ['КОРОВА', 'Овца', 'СВИНЬЯ', 'ЛОШАДЬ'], explanation: 'Свинья хрюкает', category: 'Животные', difficulty: 'easy' },
  { sound: '"Дзинь!"', answer: 'ЗВОНОК', options: ['ЗВОНОК', 'БУДИЛЬНИК', 'ТЕЛЕФОН', 'ДВЕРЬ'], explanation: 'Звонок звенит', category: 'Предметы', difficulty: 'easy' },
  { sound: '"Бип-бип!"', answer: 'МАШИНА', options: ['ПОЕЗД', 'САМОЛЁТ', 'МАШИНА', 'КОРАБЛЬ'], explanation: 'Машина сигналит', category: 'Транспорт', difficulty: 'easy' },
  { sound: '"Тук-тук!"', answer: 'ДВЕРЬ', options: ['ОКНО', 'ДВЕРЬ', 'СТЕНА', 'ПОЛ'], explanation: 'Стучат в дверь', category: 'Дом', difficulty: 'easy' },
  // Medium
  { sound: '"Иго-го!"', answer: 'ЛОШАДЬ', options: ['КОРОВА', 'ЛОШАДЬ', 'ОСЁЛ', 'БЫК'], explanation: 'Лошадь ржёт', category: 'Животные', difficulty: 'medium' },
  { sound: '"Ку-ка-ре-ку!"', answer: 'ПЕТУХ', options: ['ПЕТУХ', 'КУКУШКА', 'ГОЛУБЬ', 'ВОРОНА'], explanation: 'Петух кукарекает на рассвете', category: 'Птицы', difficulty: 'medium' },
  { sound: '"У-у-у!"', answer: 'ВЕТЕР', options: ['ВОЛК', 'ВЕТЕР', 'МОРЕ', 'ДВИГАТЕЛЬ'], explanation: 'Ветер воет', category: 'Природа', difficulty: 'medium' },
  { sound: '"Ш-ш-ш..."', answer: 'ШИПЕНИЕ', options: ['ШИПЕНИЕ', 'ВЕТЕР', 'ВОДА', 'ОГОНЬ'], explanation: 'Змея или газ шипит', category: 'Звуки', difficulty: 'medium' },
  { sound: '"Тррр..."', answer: 'ДВИГАТЕЛЬ', options: ['ДВИГАТЕЛЬ', 'ПРИНТЕР', 'ВЕНТИЛЯТОР', 'ПЫЛЕСОС'], explanation: 'Работает двигатель', category: 'Техника', difficulty: 'medium' },
  { sound: '"Пиф-паф!"', answer: 'РУЖЬЁ', options: ['ПУШКА', 'РУЖЬЁ', 'ФЕЙЕРВЕРК', 'ГРОМ'], explanation: 'Выстрел из ружья', category: 'Звуки', difficulty: 'medium' },
  { sound: '"Вжжж..."', answer: 'ПЧЕЛА', options: ['МОСХИТ', 'ПЧЕЛА', 'МУХА', 'ШМЕЛЬ'], explanation: 'Пчела жужжит', category: 'Насекомые', difficulty: 'medium' },
  { sound: '"Ку-ку!"', answer: 'КУКУШКА', options: ['СОЛОВЕЙ', 'КУКУШКА', 'ЛЯГУШКА', 'СОВА'], explanation: 'Кукушка кукует', category: 'Птицы', difficulty: 'medium' },
  // Hard
  { sound: '"Бле-е-е..."', answer: 'ОВЦА', options: ['КОЗА', 'ОВЦА', 'ТЕЛЁНОК', 'ЖЕРЕБЁНОК'], explanation: 'Овца блеет', category: 'Животные', difficulty: 'hard' },
  { sound: '"Кря-кря!"', answer: 'УТКА', options: ['ГУСЬ', 'УТКА', 'ЛЕБЕДЬ', 'КУРИЦА'], explanation: 'Утка крякает', category: 'Птицы', difficulty: 'hard' },
  { sound: '"Ква-ква!"', answer: 'ЛЯГУШКА', options: ['ЖАБА', 'ЛЯГУШКА', 'ТРИТОН', 'ЗМЕЯ'], explanation: 'Лягушка квакает', category: 'Земноводные', difficulty: 'hard' },
  { sound: '"Фьють!"', answer: 'СВИСТ', options: ['СВИСТ', 'ВЕТЕР', 'ФЛЕЙТА', 'ПТИЦА'], explanation: 'Свист', category: 'Звуки', difficulty: 'hard' },
  { sound: '"Рррр..."', answer: 'КОТ', options: ['ЛЕВ', 'ТИГР', 'КОТ', 'РЫСЬ'], explanation: 'Кот мурлычет или рычит', category: 'Животные', difficulty: 'hard' },
  { sound: '"Чик-чирик!"', answer: 'ВОРОБЕЙ', options: ['ВОРОБЕЙ', 'СИНИЦА', 'ЛАСТОЧКА', 'ГОЛУБЬ'], explanation: 'Воробей чирикает', category: 'Птицы', difficulty: 'hard' },
]

export default function SoundQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [currentQuestion, setCurrentQuestion] = useState<SoundQuestion | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())

  const getNextQuestion = useCallback(() => {
    const available = questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => q.difficulty === difficulty && !usedQuestions.has(q.index))
    
    if (available.length === 0) {
      setUsedQuestions(new Set())
      const filtered = questions.filter(q => q.difficulty === difficulty)
      return filtered[Math.floor(Math.random() * filtered.length)]
    }
    
    const chosen = available[Math.floor(Math.random() * available.length)]
    setUsedQuestions(prev => new Set([...prev, chosen.index]))
    return chosen
  }, [difficulty, usedQuestions])

  const startGame = useCallback((diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setStreak(0)
    setLives(3)
    setUsedQuestions(new Set())
    setSelectedIndex(null)
    setGameState('playing')
    
    const first = questions.filter(q => q.difficulty === diff)[Math.floor(Math.random() * questions.filter(q => q.difficulty === diff).length)]
    setCurrentQuestion(first)
  }, [])

  const handleAnswer = useCallback((index: number) => {
    if (selectedIndex !== null || !currentQuestion) return
    
    setSelectedIndex(index)
    
    const isCorrect = currentQuestion.options[index] === currentQuestion.answer
    const baseXP = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 18
    
    if (isCorrect) {
      const streakBonus = streak >= 2 ? Math.floor(baseXP * 0.25) : 0
      addXP(baseXP + streakBonus)
      playSound?.('success')
      setScore(s => s + baseXP + streakBonus)
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
    } else {
      playSound?.('error')
      setWrong(w => w + 1)
      setStreak(0)
      setLives(l => l - 1)
      
      if (lives <= 1) {
        setTimeout(() => setGameState('finished'), 2000)
        return
      }
    }
  }, [selectedIndex, currentQuestion, difficulty, streak, lives, addXP, playSound])

  const nextQuestion = useCallback(() => {
    if (lives <= 0) {
      setGameState('finished')
      return
    }
    
    const next = getNextQuestion()
    setCurrentQuestion(next)
    setSelectedIndex(null)
  }, [lives, getNextQuestion])

  if (gameState === 'setup') {
    return (
      <div className="bg-gradient-to-br from-orange-900/90 to-red-900/90 rounded-2xl p-6 backdrop-blur-sm border border-orange-500/30">
        <h2 className="text-2xl font-bold text-orange-200 mb-4 flex items-center gap-2">
          <Volume2 className="w-6 h-6" />
          Угадай звук
        </h2>
        <p className="text-orange-100/80 mb-6">
          Определи по описанию звука, что или кто его издаёт!
        </p>
        <div className="flex flex-col gap-3">
          {(['easy', 'medium', 'hard'] as const).map(d => (
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
              <div className="font-bold flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                {d === 'easy' ? 'Легко' : d === 'medium' ? 'Средне' : 'Сложно'}
              </div>
              <div className="text-sm opacity-70">
                {questions.filter(q => q.difficulty === d).length} звуков • {d === 'easy' ? '8' : d === 'medium' ? '12' : '18'} XP • 3 жизни
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const total = correct + wrong
    const accuracy = total > 0 ? Math.round(correct / total * 100) : 0
    
    return (
      <div className="bg-gradient-to-br from-orange-900/90 to-red-900/90 rounded-2xl p-6 backdrop-blur-sm border border-orange-500/30 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-orange-200 mb-2">Игра окончена!</h2>
        <p className="text-3xl font-bold text-white mb-4">{score} XP</p>
        
        <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
          <div className="bg-green-500/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-green-300">{correct}</div>
            <div className="text-green-400 text-sm">Угадано</div>
          </div>
          <div className="bg-red-500/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-red-300">{wrong}</div>
            <div className="text-red-400 text-sm">Ошибок</div>
          </div>
        </div>
        
        <div className="bg-orange-500/20 rounded-xl p-3 mb-6 max-w-xs mx-auto">
          <div className="text-xl font-bold text-orange-300">{accuracy}%</div>
          <div className="text-orange-400 text-sm">Точность</div>
        </div>
        
        <button
          onClick={() => setGameState('setup')}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  if (!currentQuestion) {
    setCurrentQuestion(getNextQuestion())
    return null
  }

  return (
    <div className="bg-gradient-to-br from-orange-900/90 to-red-900/90 rounded-2xl p-6 backdrop-blur-sm border border-orange-500/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-orange-200 flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Угадай звук
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={i < lives ? 'text-red-400' : 'text-gray-600'}>❤️</span>
            ))}
          </div>
          <span className="text-yellow-200 bg-yellow-500/30 px-3 py-1 rounded-full text-sm">{score} XP</span>
        </div>
      </div>

      {/* Streak */}
      {streak >= 2 && (
        <div className="text-center mb-2">
          <span className="text-yellow-300 text-sm flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" />
            Серия x{streak}
          </span>
        </div>
      )}

      {/* Sound display */}
      <div className="text-center mb-6">
        <div className="text-4xl md:text-5xl font-bold text-orange-100 mb-2 bg-orange-800/50 rounded-xl py-6 px-4 animate-pulse">
          {currentQuestion.sound}
        </div>
        <p className="text-orange-300/70 text-sm">{currentQuestion.category}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {currentQuestion.options.map((option, index) => {
          let buttonClass = 'bg-orange-800/50 hover:bg-orange-700/50 text-orange-200 border-orange-600'
          
          if (selectedIndex !== null) {
            if (option === currentQuestion.answer) {
              buttonClass = 'bg-green-500/30 text-green-300 border-green-500'
            } else if (index === selectedIndex && option !== currentQuestion.answer) {
              buttonClass = 'bg-red-500/30 text-red-300 border-red-500'
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedIndex !== null}
              className={`p-3 rounded-xl text-center font-bold transition-all border-2 ${buttonClass}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* Result */}
      {selectedIndex !== null && (
        <div className={`p-4 rounded-xl mb-4 ${
          currentQuestion.options[selectedIndex] === currentQuestion.answer 
            ? 'bg-green-500/20' 
            : 'bg-red-500/20'
        }`}>
          <p className={`font-bold mb-1 ${
            currentQuestion.options[selectedIndex] === currentQuestion.answer 
              ? 'text-green-300' 
              : 'text-red-300'
          }`}>
            {currentQuestion.options[selectedIndex] === currentQuestion.answer ? '✓ Правильно!' : '✗ Неправильно!'}
          </p>
          <p className="text-orange-200 text-sm">{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Next */}
      {selectedIndex !== null && lives > 0 && (
        <button
          onClick={nextQuestion}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl transition-all"
        >
          Следующий звук
        </button>
      )}
      
      {selectedIndex !== null && lives <= 0 && (
        <button
          onClick={() => setGameState('finished')}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl transition-all"
        >
          Результаты
        </button>
      )}
    </div>
  )
}
