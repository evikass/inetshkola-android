'use client'

import { useState, useEffect, useCallback } from 'react'
import { Pen, Check, X, RotateCcw, Trophy, Target, Sparkles, Home } from 'lucide-react'
import { useSound } from '@/lib/sounds'
import { useSchool } from '@/context/SchoolContext'

interface SpellingWord {
  word: string
  correctSpelling: string
  wrongSpelling: string
  rule: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const SPELLING_WORDS: SpellingWord[] = [
  // Easy - простые правила
  { word: 'жи-ши пиши с буквой и', correctSpelling: 'машина', wrongSpelling: 'машины', rule: 'ЖИ-ШИ пиши с И', difficulty: 'easy' },
  { word: 'ча-ща пиши с буквой а', correctSpelling: 'задача', wrongSpelling: 'задоча', rule: 'ЧА-ЩА пиши с А', difficulty: 'easy' },
  { word: 'чу-щу пиши с буквой у', correctSpelling: 'щука', wrongSpelling: 'щака', rule: 'ЧУ-ЩУ пиши с У', difficulty: 'easy' },
  { word: 'безударная гласная', correctSpelling: 'вода', wrongSpelling: 'вада', rule: 'Проверяемая гласная: воды', difficulty: 'easy' },
  { word: 'парный согласный', correctSpelling: 'дуб', wrongSpelling: 'дуп', rule: 'Проверочное слово: дубы', difficulty: 'easy' },
  // Medium - средняя сложность
  { word: 'непроизносимый согласный', correctSpelling: 'солнце', wrongSpelling: 'сонце', rule: 'Проверочное слово: солнечный', difficulty: 'medium' },
  { word: 'разделительный мягкий знак', correctSpelling: 'семья', wrongSpelling: 'семя', rule: 'Разделительный Ь перед Я', difficulty: 'medium' },
  { word: 'удвоенные согласные', correctSpelling: 'касса', wrongSpelling: 'каса', rule: 'Удвоенная С (от кассир)', difficulty: 'medium' },
  { word: 'приставки', correctSpelling: 'прибежать', wrongSpelling: 'пребежать', rule: 'ПРИ- = приближение', difficulty: 'medium' },
  { word: 'корни с чередованием', correctSpelling: 'вырастил', wrongSpelling: 'выростил', rule: 'РАСТ/РОС: перед СТ - А', difficulty: 'medium' },
  // Hard - сложные случаи
  { word: 'словарное слово', correctSpelling: 'аккуратный', wrongSpelling: 'акуратный', rule: 'Словарное слово', difficulty: 'hard' },
  { word: 'Н/НН в прилагательных', correctSpelling: 'ветреный', wrongSpelling: 'ветренный', rule: '-ЕН- без Н в отглагольных', difficulty: 'hard' },
  { word: 'НЕ с разными частями речи', correctSpelling: 'недруг', wrongSpelling: 'не друг', rule: 'НЕ слитно = можно заменить синонимом', difficulty: 'hard' },
  { word: 'проверяемая гласная', correctSpelling: 'восток', wrongSpelling: 'васток', rule: 'Словарное слово', difficulty: 'hard' },
  { word: 'правописание суффиксов', correctSpelling: 'ключик', wrongSpelling: 'ключек', rule: '-ИК- сохраняет И при склонении', difficulty: 'hard' },
]

export default function SpellingGame() {
  const { addPoints } = useSchool()
  const { playCorrect, playWrong, playAchievement } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [words, setWords] = useState<SpellingWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showRule, setShowRule] = useState(false)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff)
    const filtered = SPELLING_WORDS.filter(w => w.difficulty === diff)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    setWords(shuffled.slice(0, 5))
    setCurrentIndex(0)
    setScore(0)
    setCorrect(0)
    setSelectedAnswer(null)
    setShowRule(false)
    setStreak(0)
    setBestStreak(0)
    setGameState('playing')
  }

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return
    
    const currentWord = words[currentIndex]
    const isCorrect = answer === currentWord.correctSpelling
    
    setSelectedAnswer(answer)
    setShowRule(true)
    
    if (isCorrect) {
      playCorrect()
      const streakBonus = streak * 5
      const points = 20 + streakBonus
      setScore(s => s + points)
      setCorrect(c => c + 1)
      setStreak(s => {
        const newStreak = s + 1
        if (newStreak > bestStreak) setBestStreak(newStreak)
        return newStreak
      })
    } else {
      playWrong()
      setStreak(0)
    }
  }

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(i => i + 1)
      setSelectedAnswer(null)
      setShowRule(false)
    } else {
      // Game complete
      addPoints(score)
      playAchievement()
      setGameState('result')
    }
  }

  const currentWord = words[currentIndex]

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 
        border-2 border-pink-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/20 mb-4">
            <Pen className="w-8 h-8 text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Правописание</h2>
          <p className="text-white/60 text-sm mt-1">Выбери правильное написание!</p>
        </div>

        <div className="space-y-3">
          {(['easy', 'medium', 'hard'] as const).map(diff => {
            const colors = {
              easy: 'from-green-500 to-emerald-500',
              medium: 'from-yellow-500 to-orange-500',
              hard: 'from-red-500 to-rose-500'
            }
            const labels = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' }
            const count = SPELLING_WORDS.filter(w => w.difficulty === diff).length
            
            return (
              <button
                key={diff}
                onClick={() => startGame(diff)}
                className={`w-full p-4 rounded-2xl bg-gradient-to-r ${colors[diff]} text-white 
                  font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-between`}
              >
                <span>{labels[diff]}</span>
                <span className="text-sm font-normal opacity-80">{count} слов</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    const accuracy = Math.round((correct / words.length) * 100)
    
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 
        border-2 border-pink-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
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
            <div className="text-3xl font-bold text-green-400">{correct}/{words.length}</div>
            <div className="text-sm text-white/60">Правильно</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-blue-400">{accuracy}%</div>
            <div className="text-sm text-white/60">Точность</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-3xl font-bold text-orange-400">{bestStreak}</div>
            <div className="text-sm text-white/60">Макс. серия</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => startGame(difficulty)}
            className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl 
              font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Ещё раз
          </button>
          <button
            onClick={() => setGameState('menu')}
            className="px-6 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  if (!currentWord) return null

  // Randomize order of options
  const options = [
    { text: currentWord.correctSpelling, isCorrect: true },
    { text: currentWord.wrongSpelling, isCorrect: false }
  ].sort(() => Math.random() - 0.5)

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 
      border-2 border-pink-400/30 backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Pen className="w-5 h-5 text-pink-400" />
          <span className="font-bold text-pink-300">Правописание</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span>{currentIndex + 1}/{words.length}</span>
          <span className="text-yellow-400">{score} очков</span>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {words.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 flex-1 rounded-full ${
              i < currentIndex ? 'bg-green-500' :
              i === currentIndex ? 'bg-pink-500' :
              'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Streak */}
      {streak >= 2 && (
        <div className="text-center text-orange-400 text-sm mb-4 animate-pulse flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" />
          Серия: {streak}
        </div>
      )}

      {/* Question */}
      <div className="p-4 rounded-2xl bg-white/10 mb-4 text-center">
        <div className="text-white/60 text-sm mb-2">{currentWord.word}</div>
        <div className="text-white text-lg font-medium">Выбери правильное написание:</div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option.text
          const showCorrect = selectedAnswer && option.isCorrect
          const showWrong = isSelected && !option.isCorrect
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option.text)}
              disabled={!!selectedAnswer}
              className={`w-full p-4 rounded-2xl text-xl font-bold transition-all
                ${showCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-[1.02]' :
                  showWrong ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white' :
                  isSelected ? 'bg-pink-500/30 text-white' :
                  'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {option.text}
              {showCorrect && <Check className="w-5 h-5 inline ml-2" />}
              {showWrong && <X className="w-5 h-5 inline ml-2" />}
            </button>
          )
        })}
      </div>

      {/* Rule explanation */}
      {showRule && (
        <div className={`p-4 rounded-2xl mb-4 ${
          selectedAnswer === currentWord.correctSpelling 
            ? 'bg-green-500/20 text-green-300' 
            : 'bg-red-500/20 text-red-300'
        }`}>
          <div className="flex items-start gap-2">
            <Target className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-bold">Правило:</div>
              <div className="text-sm opacity-80">{currentWord.rule}</div>
            </div>
          </div>
        </div>
      )}

      {/* Next button */}
      {selectedAnswer && (
        <button
          onClick={nextWord}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl 
            font-bold text-lg hover:scale-[1.02] transition-transform"
        >
          {currentIndex < words.length - 1 ? 'Следующее слово' : 'Результаты'}
        </button>
      )}
    </div>
  )
}
