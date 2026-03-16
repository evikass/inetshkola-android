'use client'

import { useState, useEffect, useCallback } from 'react'
import { Timer, Zap, Trophy, Flame, Target, Medal, Clock, Play, RotateCcw } from 'lucide-react'
import { useSound } from '@/lib/sounds'
import { useSchool } from '@/context/SchoolContext'

interface ChallengeQuestion {
  q: string
  options: string[]
  answer: string
  points: number
}

const CHALLENGE_QUESTIONS: ChallengeQuestion[] = [
  // Math
  { q: "12 × 8 = ?", options: ["86", "96", "106"], answer: "96", points: 10 },
  { q: "144 ÷ 12 = ?", options: ["11", "12", "13"], answer: "12", points: 10 },
  { q: "15² = ?", options: ["215", "225", "235"], answer: "225", points: 15 },
  { q: "√196 = ?", options: ["12", "13", "14"], answer: "14", points: 15 },
  { q: "25% от 200 = ?", options: ["25", "50", "75"], answer: "50", points: 10 },
  // Russian
  { q: "Сколько падежей?", options: ["5", "6", "7"], answer: "6", points: 10 },
  { q: "Какой падеж: 'без друга'?", options: ["Родительный", "Дательный", "Винительный"], answer: "Родительный", points: 15 },
  { q: "Найди глагол:", options: ["красивый", "бежать", "стол"], answer: "бежать", points: 10 },
  // Science
  { q: "Формула воды?", options: ["H2O", "CO2", "O2"], answer: "H2O", points: 10 },
  { q: "Сколько костей в человеке?", options: ["186", "206", "226"], answer: "206", points: 15 },
  { q: "Единица силы?", options: ["Джоуль", "Ньютон", "Ватт"], answer: "Ньютон", points: 10 },
  // History
  { q: "Год Куликовской битвы?", options: ["1378", "1380", "1385"], answer: "1380", points: 15 },
  { q: "Кто крестил Русь?", options: ["Ярослав", "Владимир", "Иван"], answer: "Владимир", points: 10 },
  // Geography
  { q: "Самый большой океан?", options: ["Атлантический", "Тихий", "Индийский"], answer: "Тихий", points: 10 },
  { q: "Сколько материков?", options: ["5", "6", "7"], answer: "6", points: 10 },
]

type Difficulty = 'easy' | 'medium' | 'hard'

const DIFFICULTY_CONFIG = {
  easy: { time: 30, questions: 5, multiplier: 1 },
  medium: { time: 60, questions: 10, multiplier: 1.5 },
  hard: { time: 90, questions: 15, multiplier: 2 },
}

export default function ChallengeMode() {
  const { addPoints } = useSchool()
  const { playCorrect, playWrong, playAchievement } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)

  const endGame = useCallback(() => {
    setShowResult(true)
    setGameState('result')
    if (score > 0) {
      addPoints(score)
      playAchievement()
    }
  }, [score, addPoints, playAchievement])

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || showResult) return
    
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          endGame()
          return 0
        }
        return t - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameState, showResult, endGame])

  const startGame = useCallback((diff: Difficulty) => {
    const config = DIFFICULTY_CONFIG[diff]
    const shuffled = [...CHALLENGE_QUESTIONS].sort(() => Math.random() - 0.5)
    
    setDifficulty(diff)
    setQuestions(shuffled.slice(0, config.questions))
    setCurrentIndex(0)
    setScore(0)
    setCorrect(0)
    setTimeLeft(config.time)
    setCombo(0)
    setBestCombo(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameState('playing')
  }, [])

  const handleAnswer = useCallback((option: string) => {
    if (showResult || selectedAnswer) return
    
    const question = questions[currentIndex]
    const isCorrect = option === question.answer
    
    setSelectedAnswer(option)
    
    if (isCorrect) {
      playCorrect()
      const multiplier = DIFFICULTY_CONFIG[difficulty].multiplier
      const comboBonus = combo * 2
      const points = Math.round((question.points + comboBonus) * multiplier)
      setScore(s => s + points)
      setCorrect(c => c + 1)
      setCombo(combo => {
        const newCombo = combo + 1
        if (newCombo > bestCombo) setBestCombo(newCombo)
        return newCombo
      })
    } else {
      playWrong()
      setCombo(0)
    }
    
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1)
        setSelectedAnswer(null)
      } else {
        endGame()
      }
    }, 800)
  }, [showResult, selectedAnswer, questions, currentIndex, difficulty, combo, bestCombo, playCorrect, playWrong, endGame])

  const currentQuestion = questions[currentIndex]
  const config = DIFFICULTY_CONFIG[difficulty]
  const timePercent = (timeLeft / config.time) * 100

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/20 
        border-2 border-orange-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 mb-4">
            <Timer className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Режим Челленджа</h2>
          <p className="text-white/60 text-sm mt-1">Ответь на вопросы за ограниченное время!</p>
        </div>

        <div className="space-y-3">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => {
            const cfg = DIFFICULTY_CONFIG[diff]
            const colors = {
              easy: 'from-green-500 to-emerald-500',
              medium: 'from-yellow-500 to-orange-500',
              hard: 'from-red-500 to-rose-500'
            }
            const labels = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' }
            
            return (
              <button
                key={diff}
                onClick={() => startGame(diff)}
                className={`w-full p-4 rounded-2xl bg-gradient-to-r ${colors[diff]} text-white 
                  font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-between`}
              >
                <div className="flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  <span>{labels[diff]}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-normal opacity-80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {cfg.time}с
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {cfg.questions} вопр.
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    const accuracy = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0
    
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/20 
        border-2 border-orange-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
            {accuracy >= 80 ? (
              <Trophy className="w-10 h-10 text-yellow-400" />
            ) : accuracy >= 50 ? (
              <Medal className="w-10 h-10 text-orange-400" />
            ) : (
              <Target className="w-10 h-10 text-white/60" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">
            {accuracy >= 80 ? 'Отлично! 🎉' : accuracy >= 50 ? 'Хорошо! 👍' : 'Попробуй ещё! 💪'}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-white/60">Очки</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-green-400">{correct}/{questions.length}</div>
            <div className="text-sm text-white/60">Правильно</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-blue-400">{accuracy}%</div>
            <div className="text-sm text-white/60">Точность</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-orange-400">{bestCombo}</div>
            <div className="text-sm text-white/60">Макс. комбо</div>
          </div>
        </div>

        <button
          onClick={() => setGameState('menu')}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl 
            font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Играть снова
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/20 
      border-2 border-orange-400/30 backdrop-blur-sm">
      
      {/* Timer bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Timer className="w-4 h-4" />
            <span>{timeLeft}с</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold">
            <Zap className="w-4 h-4" />
            <span>{score} очков</span>
          </div>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              timePercent > 50 ? 'bg-green-500' : timePercent > 25 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/60 text-sm">
          Вопрос {currentIndex + 1}/{questions.length}
        </span>
        {combo >= 2 && (
          <span className="flex items-center gap-1 text-orange-400 text-sm animate-pulse">
            <Flame className="w-4 h-4" />
            Комбо x{combo}
          </span>
        )}
      </div>

      {/* Question */}
      {currentQuestion && (
        <>
          <h3 className="text-xl font-bold text-white mb-6 text-center">{currentQuestion.q}</h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === currentQuestion.answer
              const showCorrect = selectedAnswer && isCorrect
              const showWrong = isSelected && !isCorrect
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedAnswer}
                  className={`w-full p-4 rounded-2xl text-left font-medium transition-all
                    ${showCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-[1.02]' :
                      showWrong ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white' :
                      isSelected ? 'bg-orange-500/30 text-white' :
                      'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
