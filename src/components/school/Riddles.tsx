'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { HelpCircle, Trophy, Clock, Star, Zap, Lightbulb, RotateCcw } from 'lucide-react'

interface Riddle {
  question: string
  answer: string
  hint: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const riddles: Riddle[] = [
  // Easy
  { question: 'Что можно увидеть с закрытыми глазами?', answer: 'сон', hint: 'Это приходит ночью', category: 'Логика', difficulty: 'easy' },
  { question: 'У него есть шляпа, но нет головы. Есть нога, но нет обуви.', answer: 'гриб', hint: 'Растёт в лесу', category: 'Природа', difficulty: 'easy' },
  { question: 'Что становится легче, когда его наполняют?', answer: 'воздушный шар', hint: 'Летает в небе', category: 'Логика', difficulty: 'easy' },
  { question: 'Какой ключ не может открыть замок?', answer: 'музыкальный', hint: 'Связан с музыкой', category: 'Логика', difficulty: 'easy' },
  { question: 'Что идёт, но никогда не приходит?', answer: 'завтра', hint: 'Это день недели', category: 'Логика', difficulty: 'easy' },
  { question: 'У какого слона нет хобота?', answer: 'шахматный', hint: 'Стоит на доске', category: 'Логика', difficulty: 'easy' },
  { question: 'Что можно сломать, даже не дотрагиваясь?', answer: 'обещание', hint: 'Дают слово', category: 'Логика', difficulty: 'easy' },
  { question: 'Что всегда приходит, но никогда не наступает?', answer: 'завтра', hint: 'Будущий день', category: 'Логика', difficulty: 'easy' },
  
  // Medium
  { question: 'Я не живой, но расту. У меня нет лёгких, но мне нужен воздух. Что я?', answer: 'огонь', hint: 'Горит и даёт тепло', category: 'Наука', difficulty: 'medium' },
  { question: 'Чем больше из меня берёшь, тем больше я становлюсь. Что я?', answer: 'яма', hint: 'Её копают', category: 'Логика', difficulty: 'medium' },
  { question: 'У меня есть города, но нет домов. Есть горы, но нет деревьев. Есть вода, но нет рыбы. Что я?', answer: 'карта', hint: 'Помогает найти путь', category: 'География', difficulty: 'medium' },
  { question: 'Что принадлежит тебе, но другие используют это чаще?', answer: 'имя', hint: 'Так тебя называют', category: 'Логика', difficulty: 'medium' },
  { question: 'Что становится мокрым, когда сушит?', answer: 'полотенце', hint: 'Используют после душа', category: 'Логика', difficulty: 'medium' },
  { question: 'Я могу быть длинным или коротким. Меня можно рассказать, но нельзя увидеть. Что я?', answer: 'история', hint: 'Бывает у жизни', category: 'Логика', difficulty: 'medium' },
  { question: 'Что поднимается и опускается, но не двигается?', answer: 'температура', hint: 'Бывает высокой и низкой', category: 'Наука', difficulty: 'medium' },
  { question: 'У меня есть глаза, но я не вижу. Что я?', answer: 'иголка', hint: 'Для шитья', category: 'Логика', difficulty: 'medium' },
  { question: 'Что можно держать, но нельзя увидеть?', answer: 'слово', hint: 'Его дают', category: 'Логика', difficulty: 'medium' },
  { question: 'Что имеет шею, но не имеет головы?', answer: 'бутылка', hint: 'Для напитков', category: 'Логика', difficulty: 'medium' },
  
  // Hard
  { question: 'Я начинаюсь с вечности, заканчиваюся пространством, и есть "я" в центре. Что я?', answer: 'вселенная', hint: 'Всё вокруг нас', category: 'Наука', difficulty: 'hard' },
  { question: 'У отца Мэри есть пять дочерей: Чача, Чече, Чичи, Чочо. Как зовут пятую дочь?', answer: 'мэри', hint: 'Перечисли имена', category: 'Логика', difficulty: 'hard' },
  { question: 'Что такое: в гору — бегом, с горы — шагом?', answer: 'катушка', hint: 'Для ниток', category: 'Логика', difficulty: 'hard' },
  { question: 'Что становится больше, если его перевернуть?', answer: 'число 6', hint: 'Станет девяткой', category: 'Математика', difficulty: 'hard' },
  { question: 'В каком слове 40 гласных?', answer: 'сорока', hint: 'Это птица', category: 'Русский язык', difficulty: 'hard' },
  { question: 'Что можно поднять одной рукой, но нельзя поднять двумя?', answer: 'песок', hint: 'Рассыпается', category: 'Логика', difficulty: 'hard' },
  { question: 'Что идёт по горе и по долине, но не двигается?', answer: 'дорога', hint: 'По ней ездят', category: 'Логика', difficulty: 'hard' },
  { question: 'Какой месяц короче всех?', answer: 'май', hint: 'В названии 3 буквы', category: 'Логика', difficulty: 'hard' },
  { question: 'Что не имеет начала, но имеет конец?', answer: 'очередь', hint: 'В магазине', category: 'Логика', difficulty: 'hard' },
  { question: 'Какой рукой лучше размешивать чай?', answer: 'ложкой', hint: 'Не рукой', category: 'Логика', difficulty: 'hard' },
]

type Difficulty = 'easy' | 'medium' | 'hard'

export default function Riddles() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentRiddle, setCurrentRiddle] = useState<Riddle | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [usedRiddles, setUsedRiddles] = useState<Set<number>>(new Set())

  const getDifficultyRiddles = useCallback((diff: Difficulty) => {
    return riddles.filter(r => r.difficulty === diff)
  }, [])

  const generateQuestion = useCallback(() => {
    const available = getDifficultyRiddles(difficulty).filter((_, index) => !usedRiddles.has(index))
    if (available.length === 0) {
      setUsedRiddles(new Set())
      return
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const riddle = available[randomIndex]
    setCurrentRiddle(riddle)
    setUserAnswer('')
    setShowHint(false)
    setUsedRiddles(prev => new Set(prev).add(riddles.indexOf(riddle)))
  }, [difficulty, usedRiddles, getDifficultyRiddles])

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff)
    setScore(0)
    setQuestion(1)
    setCorrectAnswers(0)
    setStreak(0)
    setHintsUsed(0)
    setUsedRiddles(new Set())
    setGameState('playing')
    generateQuestion()
  }, [generateQuestion])

  const checkAnswer = () => {
    if (!currentRiddle || showFeedback) return
    
    const isCorrect = userAnswer.toLowerCase().trim() === currentRiddle.answer.toLowerCase()
    
    if (isCorrect) {
      playSound('success')
      let xpGain = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 25
      if (showHint) xpGain = Math.round(xpGain * 0.7) // Penalty for hint
      xpGain += streak * 3
      addXP(xpGain)
      setScore(prev => prev + xpGain)
      setCorrectAnswers(prev => prev + 1)
      setStreak(prev => prev + 1)
      setShowFeedback('correct')
    } else {
      playSound('error')
      setStreak(0)
      setShowFeedback('wrong')
    }
    
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const nextQuestion = useCallback(() => {
    setShowFeedback(null)
    
    if (question >= 8) {
      setGameState('result')
    } else {
      setQuestion(prev => prev + 1)
      generateQuestion()
    }
  }, [question, generateQuestion])

  const useHint = () => {
    if (showHint || hintsUsed >= 3) return
    
    playSound('click')
    setShowHint(true)
    setHintsUsed(prev => prev + 1)
  }

  const skipQuestion = () => {
    playSound('click')
    setShowFeedback('wrong')
    setStreak(0)
    
    setTimeout(() => {
      nextQuestion()
    }, 1500)
  }

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-6 border border-violet-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🧩</div>
          <h2 className="text-2xl font-bold text-violet-300">Загадки</h2>
          <p className="text-violet-200/70 text-sm mt-1">Разгадай загадку!</p>
        </div>
        
        <div className="grid gap-3 max-w-xs mx-auto">
          <button onClick={() => startGame('easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
            <div className="font-bold text-green-300">🟢 Лёгкие</div>
            <div className="text-xs text-green-200/70">Простые загадки для начинающих</div>
          </button>
          <button onClick={() => startGame('medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
            <div className="font-bold text-yellow-300">🟡 Средние</div>
            <div className="text-xs text-yellow-200/70">Для тех, кто любит подумать</div>
          </button>
          <button onClick={() => startGame('hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
            <div className="font-bold text-red-300">🔴 Сложные</div>
            <div className="text-xs text-red-200/70">Для настоящих мудрецов</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-6 border border-violet-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-violet-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <HelpCircle className="w-8 h-8 mx-auto text-violet-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/8</div>
              <div className="text-xs text-white/70">Разгадано</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Lightbulb className="w-8 h-8 mx-auto text-amber-400 mb-2" />
              <div className="text-2xl font-bold text-white">{hintsUsed}</div>
              <div className="text-xs text-white/70">Подсказок</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-violet-500/30 hover:bg-violet-500/40 rounded-xl text-violet-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-6 border border-violet-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-violet-300 font-bold">{question}/8</span>
          <span className="text-purple-300 text-sm">{currentRiddle?.category}</span>
        </div>
        <div className="flex items-center gap-2">
          {streak > 1 && (
            <span className="text-orange-400 text-sm flex items-center gap-1">
              <Zap className="w-4 h-4" /> {streak}
            </span>
          )}
          <span className="text-white/60 text-sm">💡 {3 - hintsUsed}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-300"
          style={{ width: `${(question / 8) * 100}%` }}
        />
      </div>

      {/* Riddle */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-1 rounded-full text-sm mb-4 bg-violet-500/30 text-violet-300">
          ❓ Загадка
        </div>
        <p className="text-xl text-white leading-relaxed">{currentRiddle?.question}</p>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="bg-amber-500/20 rounded-xl p-3 mb-4 text-center">
          <Lightbulb className="w-5 h-5 inline text-amber-400 mb-1" />
          <p className="text-amber-300 text-sm">Подсказка: {currentRiddle?.hint}</p>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center py-3 mb-4 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <span className="text-2xl">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <p className={`font-medium mt-1 ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>
            {showFeedback === 'correct' ? 'Правильно!' : `Ответ: ${currentRiddle?.answer}`}
          </p>
        </div>
      )}

      {/* Answer Input */}
      <div className="space-y-3">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          placeholder="Напиши ответ..."
          disabled={showFeedback !== null}
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-violet-400 transition-all disabled:opacity-50"
        />
        
        <div className="flex gap-2">
          <button
            onClick={useHint}
            disabled={showHint || hintsUsed >= 3 || showFeedback !== null}
            className="flex-1 py-3 rounded-xl bg-amber-500/30 hover:bg-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed text-amber-300 font-medium transition-all flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            Подсказка
          </button>
          <button
            onClick={checkAnswer}
            disabled={!userAnswer.trim() || showFeedback !== null}
            className="flex-1 py-3 rounded-xl bg-violet-500/30 hover:bg-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed text-violet-300 font-bold transition-all"
          >
            Проверить
          </button>
        </div>
        
        <button 
          onClick={skipQuestion}
          disabled={showFeedback !== null}
          className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4" />
          Пропустить
        </button>
      </div>
    </div>
  )
}
