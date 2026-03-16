'use client'

import { useSchool } from '@/context/SchoolContext'
import { GameLesson } from '@/data/types'
import { useState, useMemo } from 'react'
import { ArrowLeft, Gamepad2, Star, Play, Sparkles, PartyPopper, Brain, Calculator, BookOpen, Zap, Puzzle, Target, Trophy, X, Atom, FlaskConical, Map, Landmark, Leaf, Languages } from 'lucide-react'
import MemoryGame from './MemoryGame'
import QuickMath from './QuickMath'
import MathRacing from './MathRacing'
import NumberPuzzle from './NumberPuzzle'
import SpellingGame from './SpellingGame'
import HangmanGame from './HangmanGame'
import SequenceGame from './SequenceGame'
import ChallengeMode from './ChallengeMode'

type MiniGameId = 'memory' | 'quickmath' | 'racing' | 'puzzle' | 'spelling' | 'hangman' | 'sequence' | 'challenge' | null

interface MiniGame {
  id: MiniGameId
  title: string
  icon: React.ReactNode
  subject: string
  description: string
  colorClass: string
  minGrade?: number // минимальный класс
  maxGrade?: number // максимальный класс
}

export default function KidGameSection() {
  const { games, selectedClass, selectGame, goBack } = useSchool()
  const [activeMiniGame, setActiveMiniGame] = useState<MiniGameId>(null)

  // Настоящие мини-игры для детей - адаптированы под разные классы
  const miniGames: MiniGame[] = useMemo(() => {
    const baseGames: MiniGame[] = [
      {
        id: 'memory',
        title: 'Найди пару',
        icon: <Brain className="w-10 h-10" />,
        subject: 'Память',
        description: selectedClass <= 2 ? 'Найди одинаковые карточки!' : 'Найди пары понятий!',
        colorClass: 'from-pink-500 to-rose-500',
        minGrade: 0,
        maxGrade: 11
      },
      {
        id: 'quickmath',
        title: 'Быстрый счёт',
        icon: <Calculator className="w-10 h-10" />,
        subject: 'Математика',
        description: selectedClass <= 4 ? 'Реши примеры за время!' : 'Реши сложные примеры!',
        colorClass: 'from-blue-500 to-cyan-500',
        minGrade: 0,
        maxGrade: 11
      },
      {
        id: 'racing',
        title: 'Математические гонки',
        icon: <Zap className="w-10 h-10" />,
        subject: 'Математика',
        description: selectedClass <= 2 ? 'Гонки с примерами!' : 'Соревнование по математике!',
        colorClass: 'from-green-500 to-emerald-500',
        minGrade: 1,
        maxGrade: 9
      },
      {
        id: 'puzzle',
        title: 'Числовые головоломки',
        icon: <Puzzle className="w-10 h-10" />,
        subject: 'Логика',
        description: 'Реши числовые задачки!',
        colorClass: 'from-purple-500 to-violet-500',
        minGrade: 2,
        maxGrade: 11
      },
      {
        id: 'spelling',
        title: 'Правописание',
        icon: <BookOpen className="w-10 h-10" />,
        subject: 'Русский язык',
        description: selectedClass <= 4 ? 'Напиши слова правильно!' : 'Проверь орфографию!',
        colorClass: 'from-red-500 to-orange-500',
        minGrade: 1,
        maxGrade: 11
      },
      {
        id: 'hangman',
        title: 'Угадай слово',
        icon: <Target className="w-10 h-10" />,
        subject: 'Слова',
        description: 'Угадай слово по буквам!',
        colorClass: 'from-amber-500 to-yellow-500',
        minGrade: 1,
        maxGrade: 7
      },
      {
        id: 'sequence',
        title: 'Закономерности',
        icon: <Brain className="w-10 h-10" />,
        subject: 'Логика',
        description: 'Продолжи последовательность!',
        colorClass: 'from-indigo-500 to-purple-500',
        minGrade: 0,
        maxGrade: 6
      },
      {
        id: 'challenge',
        title: 'Челлендж дня',
        icon: <Trophy className="w-10 h-10" />,
        subject: 'Разное',
        description: 'Ежедневное задание!',
        colorClass: 'from-yellow-500 to-amber-500',
        minGrade: 0,
        maxGrade: 11
      },
    ]

    // Фильтруем игры по классу
    return baseGames.filter(game => 
      (game.minGrade === undefined || selectedClass >= game.minGrade) &&
      (game.maxGrade === undefined || selectedClass <= game.maxGrade)
    )
  }, [selectedClass])

  const safeGames = Array.isArray(games) ? games : []
  
  // Эмодзи и название класса
  const gradeEmoji = selectedClass === 0 ? '🎈' : selectedClass === 1 ? '🌟' : selectedClass <= 4 ? '🌈' : selectedClass <= 7 ? '🎯' : '🏆'
  const gradeName = selectedClass === 0 ? 'Подготовительный' : 
                    selectedClass === 1 ? '1 класс' : 
                    selectedClass === 2 ? '2 класс' : 
                    selectedClass === 3 ? '3 класс' : 
                    selectedClass === 4 ? '4 класс' : 
                    selectedClass === 5 ? '5 класс' :
                    selectedClass === 6 ? '6 класс' :
                    selectedClass === 7 ? '7 класс' :
                    selectedClass === 8 ? '8 класс' :
                    selectedClass === 9 ? '9 класс' :
                    selectedClass === 10 ? '10 класс' : '11 класс'

  // Рендер активной мини-игры
  const renderMiniGame = () => {
    switch (activeMiniGame) {
      case 'memory': return <MemoryGame />
      case 'quickmath': return <QuickMath />
      case 'racing': return <MathRacing />
      case 'puzzle': return <NumberPuzzle />
      case 'spelling': return <SpellingGame />
      case 'hangman': return <HangmanGame />
      case 'sequence': return <SequenceGame />
      case 'challenge': return <ChallengeMode />
      default: return null
    }
  }

  // Если активна мини-игра - показываем её
  if (activeMiniGame) {
    return (
      <div className="w-full relative">
        <button 
          onClick={() => setActiveMiniGame(null)}
          className="mb-6 flex items-center gap-3 text-white text-xl font-bold bg-red-500/80 hover:bg-red-600
            px-6 py-3 rounded-2xl transition-all hover:scale-105 active:scale-95"
        >
          <X className="w-6 h-6" />
          <span>Закрыть игру</span>
        </button>
        {renderMiniGame()}
      </div>
    )
  }

  return (
    <div className="w-full">
      <button onClick={goBack}
        className="mb-6 flex items-center gap-3 text-white text-2xl font-black bg-white/10 hover:bg-white/20
          px-8 py-4 rounded-3xl transition-all hover:scale-105 active:scale-95">
        <ArrowLeft className="w-8 h-8" />
        <span>Назад</span>
      </button>

      {/* Header with animation */}
      <div className="text-center mb-10 animate-bounceIn">
        <div className="inline-flex items-center gap-4 mb-6">
          <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
          <Gamepad2 className="w-20 h-20 text-purple-400 animate-bounce" />
          <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text
          bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-4">
          {gradeEmoji} Игры: {gradeName} {gradeEmoji}
        </h2>

        <p className="text-2xl text-purple-200 flex items-center justify-center gap-2">
          <PartyPopper className="w-6 h-6" />
          {miniGames.length} мини-игр {safeGames.length > 0 && `· ${safeGames.length} заданий`}
          <PartyPopper className="w-6 h-6" />
        </p>
      </div>

      {/* Mini Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {miniGames.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveMiniGame(game.id)}
            className="group relative overflow-hidden p-5 rounded-2xl
              bg-gradient-to-br border-2 border-white/20 hover:border-yellow-400
              shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 
              transition-all duration-200 text-left"
          >
            {/* Icon */}
            <div className={`p-3 rounded-xl bg-gradient-to-br ${game.colorClass} inline-block mb-3 group-hover:scale-110 transition-transform text-white`}>
              {game.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-1">
              {game.title}
            </h3>

            {/* Subject */}
            <p className="text-sm text-purple-200 mb-2">
              {game.subject}
            </p>

            {/* Play button */}
            <div className={`flex items-center gap-2 text-white text-sm font-medium
              bg-white/20 px-3 py-1.5 rounded-lg group-hover:bg-white/30 transition-colors`}>
              <Play className="w-4 h-4" />
              <span>Играть</span>
            </div>
          </button>
        ))}
      </div>

      {/* Educational Games Section */}
      {safeGames.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-400" />
            Обучающие задания
            <Star className="w-8 h-8 text-yellow-400" />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {safeGames.slice(0, 12).map((game: GameLesson, index: number) => (
              <button
                key={index}
                onClick={() => selectGame(game)}
                className="group relative overflow-hidden p-4 rounded-2xl
                  bg-gradient-to-br from-indigo-500/30 to-purple-500/30
                  border-2 border-white/20 hover:border-yellow-400
                  shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 
                  transition-all duration-200 text-left"
              >
                {/* Icon */}
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500
                  inline-block mb-3 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-1">
                  {game.title}
                </h3>

                {/* Subject */}
                <p className="text-sm text-purple-200 mb-2 flex items-center gap-1">
                  <span>
                    {game.subject === 'Математика' ? '🔢' :
                     game.subject === 'Русский язык' ? '📝' :
                     game.subject === 'Окружающий мир' ? '🌍' :
                     game.subject === 'Литература' ? '📚' :
                     game.subject === 'Иностранный язык' ? '🌐' : '🎮'}
                  </span>
                  {game.subject}
                </p>

                {/* Info */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded">
                    {game.tasks?.length || 0} заданий
                  </span>
                  <span className="flex items-center gap-1 text-sm text-yellow-400">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    {game.reward?.stars || 0}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fun footer */}
      <div className="mt-10 text-center">
        <p className="text-xl text-white/60">
          Выбери игру и получи звёздочки! ⭐
        </p>
      </div>
    </div>
  )
}
