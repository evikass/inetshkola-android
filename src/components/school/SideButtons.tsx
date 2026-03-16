'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, Target, Sparkles, BarChart3, Home, BookOpen, 
  Gamepad2, Zap, Star, Flame, X, ChevronUp, RotateCcw,
  Gift, CheckCircle, Crown, Award, Medal, Heart, Rocket, Brain, Bolt,
  Calendar, PieChart, TrendingUp, Clock, Lock
} from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

// ===== HELPER FUNCTIONS =====
const getTodayKey = (): string => {
  return new Date().toISOString().split('T')[0]
}

// ===== TIPS DATA =====
const tips = [
  { emoji: '🦉', message: 'Мудрая Сова говорит: Читай внимательно задание! 📖' },
  { emoji: '🐱', message: 'Кот Учёный подсказывает: Не торопись, думай! 🤔' },
  { emoji: '🦊', message: 'Лиса советует: Если сложно - посмотри подсказку! 💡' },
  { emoji: '🐼', message: 'Панда напоминает: Делай перерывы! 🌿' },
  { emoji: '🦄', message: 'Единорог верит в тебя! Ты справишься! ✨' },
  { emoji: '🐸', message: 'Лягушка-путешественница: Каждый урок - приключение! 🗺️' },
]

// ===== ACHIEVEMENTS DATA =====
interface Achievement {
  id: string
  name: string
  desc: string
  icon: string
  condition: (p: { 
    totalPoints: number
    completedTopics: Record<string, boolean>
    achievements: string[]
    streak: number
    gamesPlayed: number
    correctAnswers: number
    totalAnswers: number
  }) => boolean
  points: number
}

const allAchievements: Achievement[] = [
  { id: 'first_lesson', name: 'Первый шаг', desc: 'Пройди первый урок', icon: 'book', condition: (p) => Object.keys(p.completedTopics).length >= 1, points: 10 },
  { id: 'first_game', name: 'Игрок', desc: 'Сыграй первую игру', icon: 'game', condition: (p) => p.gamesPlayed >= 1, points: 10 },
  { id: 'five_lessons', name: 'Ученик', desc: 'Пройди 5 уроков', icon: 'star', condition: (p) => Object.keys(p.completedTopics).length >= 5, points: 20 },
  { id: 'points_50', name: 'Коллекционер', desc: 'Набери 50 баллов', icon: 'zap', condition: (p) => p.totalPoints >= 50, points: 15 },
  { id: 'points_100', name: 'Богач', desc: 'Набери 100 баллов', icon: 'zap', condition: (p) => p.totalPoints >= 100, points: 25 },
  { id: 'points_250', name: 'Тысяча', desc: 'Набери 250 баллов', icon: 'zap', condition: (p) => p.totalPoints >= 250, points: 50 },
  { id: 'points_500', name: 'Миллионер', desc: 'Набери 500 баллов', icon: 'crown', condition: (p) => p.totalPoints >= 500, points: 100 },
  { id: 'points_1500', name: 'Богач PRO', desc: 'Набери 1500 баллов', icon: 'crown', condition: (p) => p.totalPoints >= 1500, points: 200 },
  { id: 'points_3000', name: 'Олигарх', desc: 'Набери 3000 баллов', icon: 'crown', condition: (p) => p.totalPoints >= 3000, points: 500 },
  { id: 'ten_lessons', name: 'Отличник', desc: 'Пройди 10 уроков', icon: 'medal', condition: (p) => Object.keys(p.completedTopics).length >= 10, points: 30 },
  { id: 'twenty_lessons', name: 'Знаток', desc: 'Пройди 20 уроков', icon: 'target', condition: (p) => Object.keys(p.completedTopics).length >= 20, points: 50 },
  { id: 'fifty_lessons', name: 'Мастер', desc: 'Пройди 50 уроков', icon: 'crown', condition: (p) => Object.keys(p.completedTopics).length >= 50, points: 100 },
  { id: 'seventyfive_lessons', name: 'Профессор', desc: 'Пройди 75 уроков', icon: 'crown', condition: (p) => Object.keys(p.completedTopics).length >= 75, points: 150 },
  { id: 'streak_3', name: 'На волне', desc: 'Занимайся 3 дня подряд', icon: 'flame', condition: (p) => p.streak >= 3, points: 30 },
  { id: 'streak_7', name: 'Недельный марафон', desc: 'Занимайся 7 дней подряд', icon: 'flame', condition: (p) => p.streak >= 7, points: 70 },
  { id: 'streak_14', name: 'Двухнедельный герой', desc: 'Занимайся 14 дней подряд', icon: 'flame', condition: (p) => p.streak >= 14, points: 100 },
  { id: 'streak_21', name: 'Три недели силы', desc: 'Занимайся 21 день подряд', icon: 'flame', condition: (p) => p.streak >= 21, points: 150 },
  { id: 'streak_30', name: 'Месячный чемпион', desc: 'Занимайся 30 дней подряд', icon: 'lightning', condition: (p) => p.streak >= 30, points: 200 },
  { id: 'streak_60', name: 'Двухмесячный титан', desc: 'Занимайся 60 дней подряд', icon: 'lightning', condition: (p) => p.streak >= 60, points: 400 },
  { id: 'streak_100', name: 'Легенда streak', desc: 'Занимайся 100 дней подряд', icon: 'lightning', condition: (p) => p.streak >= 100, points: 1000 },
  { id: 'games_5', name: 'Любитель игр', desc: 'Сыграй 5 игр', icon: 'game', condition: (p) => p.gamesPlayed >= 5, points: 25 },
  { id: 'games_10', name: 'Геймер', desc: 'Сыграй 10 игр', icon: 'game', condition: (p) => p.gamesPlayed >= 10, points: 50 },
  { id: 'games_25', name: 'Проигрок', desc: 'Сыграй 25 игр', icon: 'game', condition: (p) => p.gamesPlayed >= 25, points: 75 },
  { id: 'games_50', name: 'Чемпион', desc: 'Сыграй 50 игр', icon: 'trophy', condition: (p) => p.gamesPlayed >= 50, points: 100 },
  { id: 'games_100', name: 'Игровой маньяк', desc: 'Сыграй 100 игр', icon: 'trophy', condition: (p) => p.gamesPlayed >= 100, points: 200 },
  { id: 'perfect_game', name: 'Идеально!', desc: 'Ответь правильно на все вопросы в игре', icon: 'star', condition: (p) => p.achievements.includes('perfect_game'), points: 50 },
  { id: 'accuracy_70', name: 'Хороший результат', desc: '70% правильных ответов', icon: 'target', condition: (p) => p.totalAnswers > 0 && (p.correctAnswers / p.totalAnswers) >= 0.7, points: 50 },
  { id: 'accuracy_80', name: 'Меткий', desc: '80% правильных ответов', icon: 'target', condition: (p) => p.totalAnswers > 0 && (p.correctAnswers / p.totalAnswers) >= 0.8, points: 75 },
  { id: 'accuracy_90', name: 'Снайпер', desc: '90% правильных ответов', icon: 'target', condition: (p) => p.totalAnswers > 0 && (p.correctAnswers / p.totalAnswers) >= 0.9, points: 100 },
  { id: 'accuracy_95', name: 'Сверхточный', desc: '95% правильных ответов', icon: 'target', condition: (p) => p.totalAnswers >= 20 && (p.correctAnswers / p.totalAnswers) >= 0.95, points: 200 },
  { id: 'heart', name: 'Любовь к учебе', desc: 'Занимайся в выходной день', icon: 'heart', condition: (p) => p.achievements.includes('weekend_warrior'), points: 30 },
  { id: 'brain', name: 'Гений', desc: 'Набери 1000 баллов', icon: 'brain', condition: (p) => p.totalPoints >= 1000, points: 150 },
  { id: 'rocket', name: 'К звёздам', desc: 'Пройди 100 уроков', icon: 'rocket', condition: (p) => Object.keys(p.completedTopics).length >= 100, points: 200 },
  { id: 'answers_50', name: 'Практик', desc: 'Ответь на 50 вопросов', icon: 'medal', condition: (p) => p.totalAnswers >= 50, points: 40 },
  { id: 'answers_100', name: 'Опытный', desc: 'Ответь на 100 вопросов', icon: 'medal', condition: (p) => p.totalAnswers >= 100, points: 80 },
  { id: 'answers_500', name: 'Ветеран', desc: 'Ответь на 500 вопросов', icon: 'medal', condition: (p) => p.totalAnswers >= 500, points: 200 },
  { id: 'answers_1000', name: 'Энциклопедист', desc: 'Ответь на 1000 вопросов', icon: 'trophy', condition: (p) => p.totalAnswers >= 1000, points: 500 },
]

// ===== STICKERS DATA =====
interface Sticker {
  id: string
  name: string
  emoji: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  description: string
  unlocked: boolean
  unlockedAt?: string
}

const allStickers: Sticker[] = [
  { id: 's1', name: 'Первоклашка', emoji: '🎒', rarity: 'common', description: 'Начал учёбу!', unlocked: false },
  { id: 's2', name: 'Читатель', emoji: '📖', rarity: 'common', description: 'Прочитал первый урок', unlocked: false },
  { id: 's3', name: 'Счётовод', emoji: '🔢', rarity: 'common', description: 'Решил 10 примеров', unlocked: false },
  { id: 's4', name: 'Художник', emoji: '🎨', rarity: 'common', description: 'Открыл урок ИЗО', unlocked: false },
  { id: 's5', name: 'Музыкант', emoji: '🎵', rarity: 'common', description: 'Открыл урок музыки', unlocked: false },
  { id: 's6', name: 'Спортсмен', emoji: '⚽', rarity: 'common', description: 'Занятия физкультурой', unlocked: false },
  { id: 's7', name: 'Отличник', emoji: '⭐', rarity: 'rare', description: '5 уроков подряд', unlocked: false },
  { id: 's8', name: 'Геймер', emoji: '🎮', rarity: 'rare', description: 'Выиграл 10 игр', unlocked: false },
  { id: 's9', name: 'Звезда', emoji: '🌟', rarity: 'rare', description: 'Собрал 50 звёзд', unlocked: false },
  { id: 's10', name: 'Серия 7', emoji: '🔥', rarity: 'rare', description: 'Занимался 7 дней подряд', unlocked: false },
  { id: 's11', name: 'Книголюб', emoji: '📚', rarity: 'rare', description: 'Прочитал 20 уроков', unlocked: false },
  { id: 's12', name: 'Математик', emoji: '🧮', rarity: 'rare', description: 'Решил 50 примеров', unlocked: false },
  { id: 's13', name: 'Мудрец', emoji: '🦉', rarity: 'epic', description: 'Прошёл 50 уроков', unlocked: false },
  { id: 's14', name: 'Чемпион', emoji: '🏆', rarity: 'epic', description: '100 побед в играх', unlocked: false },
  { id: 's15', name: 'Серия 30', emoji: '💎', rarity: 'epic', description: '30 дней подряд!', unlocked: false },
  { id: 's16', name: 'Гений', emoji: '🧠', rarity: 'epic', description: '500 XP за день', unlocked: false },
  { id: 's17', name: 'Исследователь', emoji: '🔍', rarity: 'epic', description: 'Открыл все предметы', unlocked: false },
  { id: 's18', name: 'Легенда', emoji: '👑', rarity: 'legendary', description: '1000 звёзд!', unlocked: false },
  { id: 's19', name: 'Мастер', emoji: '🎯', rarity: 'legendary', description: 'Все достижения', unlocked: false },
  { id: 's20', name: 'Серия 100', emoji: '💫', rarity: 'legendary', description: '100 дней подряд!', unlocked: false },
]

const rarityColors = {
  common: { bg: 'from-gray-500 to-gray-600', border: 'border-gray-400', glow: 'shadow-gray-500/30' },
  rare: { bg: 'from-blue-500 to-cyan-500', border: 'border-blue-400', glow: 'shadow-blue-500/30' },
  epic: { bg: 'from-purple-500 to-pink-500', border: 'border-purple-400', glow: 'shadow-purple-500/30' },
  legendary: { bg: 'from-yellow-400 to-orange-500', border: 'border-yellow-400', glow: 'shadow-yellow-500/50' }
}

const rarityLabels = {
  common: 'Обычная',
  rare: 'Редкая',
  epic: 'Эпическая',
  legendary: 'Легендарная'
}

// ===== MAIN COMPONENT =====
export default function SideButtons() {
  const { 
    progress, setView, selectedGrade, totalPoints, totalStars, 
    streak, resetProgress 
  } = useSchool()

  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [currentTip, setCurrentTip] = useState(tips[0])
  const [taskBonusClaimed, setTaskBonusClaimed] = useState(false)
  
  // Stickers state
  const [stickers, setStickers] = useState<Sticker[]>([])
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null)
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  // Initialize stickers
  useEffect(() => {
    const saved = localStorage.getItem('stickerAlbum')
    if (saved) {
      setStickers(JSON.parse(saved))
    } else {
      setStickers(allStickers)
    }
  }, [])

  // Auto-unlock stickers
  useEffect(() => {
    const updated = stickers.map(s => {
      if (s.unlocked) return s
      let shouldUnlock = false
      if (s.id === 's9' && totalStars >= 50) shouldUnlock = true
      if (s.id === 's10' && streak >= 7) shouldUnlock = true
      if (s.id === 's15' && streak >= 30) shouldUnlock = true
      if (s.id === 's18' && totalStars >= 1000) shouldUnlock = true
      if (s.id === 's20' && streak >= 100) shouldUnlock = true
      if (shouldUnlock) {
        return { ...s, unlocked: true, unlockedAt: new Date().toISOString() }
      }
      return s
    })
    if (JSON.stringify(updated) !== JSON.stringify(stickers)) {
      setStickers(updated)
      localStorage.setItem('stickerAlbum', JSON.stringify(updated))
    }
  }, [totalStars, streak, stickers])

  // Stats calculations
  const todayLessons = progress.todayLessons || 0
  const todayGames = progress.todayGames || 0
  const todayPoints = progress.todayPoints || 0
  const completedLessons = Object.keys(progress.completedTopics).length

  // Daily tasks
  const tasks = useMemo(() => [
    { id: 'complete_lesson', title: '📚 Пройди урок', description: 'Заверши один урок сегодня', points: 15, progress: Math.min(todayLessons, 1), total: 1, icon: 'book' },
    { id: 'play_game', title: '🎮 Сыграй в игру', description: 'Заверши одну игру сегодня', points: 20, progress: Math.min(todayGames, 1), total: 1, icon: 'game' },
    { id: 'earn_points', title: '⭐ Набери 30 баллов', description: 'Заработай баллы за сегодня', points: 25, progress: Math.min(todayPoints, 30), total: 30, icon: 'zap' },
    { id: 'streak_bonus', title: '🔥 Занимайся подряд', description: `Твоя серия: ${streak} дней`, points: streak >= 3 ? 30 : 0, progress: streak >= 3 ? 1 : 0, total: 1, icon: 'flame' }
  ], [todayLessons, todayGames, todayPoints, streak])

  const completedTasks = tasks.filter(t => t.progress >= t.total).length
  const totalTasks = tasks.filter(t => t.points > 0).length
  const allCompleted = completedTasks === totalTasks && totalTasks > 0
  const totalReward = tasks.reduce((sum, t) => sum + (t.progress >= t.total ? t.points : 0), 0)

  // Achievements
  const unlockedAchievements = allAchievements.filter(a => a.condition(progress)).length
  const totalAchievements = allAchievements.length

  // Stickers
  const unlockedStickers = stickers.filter(s => s.unlocked).length
  const totalStickersCount = stickers.length
  const filteredStickers = stickers.filter(s => {
    if (filter === 'unlocked') return s.unlocked
    if (filter === 'locked') return !s.unlocked
    return true
  })
  const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 }
  const sortedStickers = [...filteredStickers].sort((a, b) => {
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1
    return rarityOrder[a.rarity] - rarityOrder[b.rarity]
  })

  // Level calculation
  const level = useMemo(() => {
    if (totalPoints >= 1000) return { name: 'Легенда', icon: '🌟', color: 'from-amber-400 to-yellow-500' }
    if (totalPoints >= 500) return { name: 'Эксперт', icon: '👑', color: 'from-rose-400 to-red-500' }
    if (totalPoints >= 300) return { name: 'Мастер', icon: '🏆', color: 'from-purple-400 to-pink-500' }
    if (totalPoints >= 150) return { name: 'Знаток', icon: '⭐', color: 'from-yellow-400 to-orange-500' }
    if (totalPoints >= 50) return { name: 'Ученик', icon: '📚', color: 'from-blue-400 to-cyan-500' }
    return { name: 'Новичок', icon: '🌱', color: 'from-green-400 to-emerald-500' }
  }, [totalPoints])

  // Weekly activity
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const weekActivity = useMemo(() => {
    const activity: { day: string; active: boolean }[] = []
    for (let i = 0; i < 7; i++) {
      activity.push({
        day: weekDays[i],
        active: i < Math.min(streak, 7) && i <= new Date().getDay()
      })
    }
    return activity
  }, [streak])

  const accuracy = progress.totalAnswers > 0 
    ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) 
    : 0

  // Handlers
  const handleShowTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)]
    setCurrentTip(randomTip)
    setShowTip(!showTip)
  }

  const handleReset = () => {
    resetProgress()
    setShowResetConfirm(false)
    setActiveModal(null)
    setView('classes')
  }

  const getIcon = (icon: string, className = "w-5 h-5") => {
    switch (icon) {
      case 'star': return <Star className={className} />
      case 'crown': return <Crown className={className} />
      case 'zap': return <Zap className={className} />
      case 'award': return <Award className={className} />
      case 'target': return <Target className={className} />
      case 'flame': return <Flame className={className} />
      case 'medal': return <Medal className={className} />
      case 'book': return <BookOpen className={className} />
      case 'game': return <Gamepad2 className={className} />
      case 'heart': return <Heart className={className} />
      case 'rocket': return <Rocket className={className} />
      case 'brain': return <Brain className={className} />
      case 'lightning': return <Bolt className={className} />
      case 'trophy': return <Trophy className={className} />
      default: return <Star className={className} />
    }
  }

  // Left buttons config (priority order - most important at top)
  const leftButtons = [
    { 
      id: 'mascot', 
      emoji: '🦉', 
      label: 'Совет', 
      color: 'from-amber-400 to-orange-500',
      action: handleShowTip,
      priority: 1
    },
    { 
      id: 'stickers', 
      icon: <Sparkles className="w-5 h-5" />, 
      label: `${unlockedStickers}/${totalStickersCount}`, 
      color: 'from-pink-500 to-rose-500',
      badge: unlockedStickers > 0 ? `${unlockedStickers}` : undefined,
      priority: 2
    },
    { 
      id: 'tasks', 
      icon: <Target className="w-5 h-5" />, 
      label: `${completedTasks}/${totalTasks}`, 
      color: 'from-green-500 to-teal-500',
      badge: completedTasks === totalTasks && totalTasks > 0 ? '✓' : undefined,
      priority: 3
    }
  ]

  // Right buttons config (priority order - most important at top)
  const rightButtons = [
    { 
      id: 'achievements', 
      icon: <Trophy className="w-5 h-5" />, 
      label: `${unlockedAchievements}/${totalAchievements}`, 
      color: 'from-yellow-500 to-orange-500',
      priority: 1
    },
    { 
      id: 'stats', 
      icon: <BarChart3 className="w-5 h-5" />, 
      label: 'Статистика', 
      color: 'from-indigo-500 to-purple-500',
      priority: 2
    },
    { 
      id: 'home', 
      icon: <Home className="w-5 h-5" />, 
      label: 'На главную', 
      color: 'from-blue-500 to-cyan-500',
      action: () => setView('classes'),
      priority: 3
    },
    { 
      id: 'reset', 
      icon: <RotateCcw className="w-5 h-5" />, 
      label: 'Сброс', 
      color: 'from-red-500 to-rose-500',
      action: () => setShowResetConfirm(true),
      priority: 4
    }
  ]

  return (
    <>
      {/* ===== LEFT BUTTONS COLUMN ===== */}
      <div className="fixed left-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {leftButtons.map((btn, idx) => (
          <motion.button
            key={btn.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => {
              if (btn.action) btn.action()
              if (btn.id !== 'mascot') setActiveModal(btn.id)
            }}
            className={`relative w-12 h-12 rounded-xl 
                       bg-gradient-to-br ${btn.color}
                       shadow-lg hover:scale-110 active:scale-95
                       transition-transform flex items-center justify-center
                       text-white group`}
          >
            {btn.emoji ? (
              <span className="text-2xl">{btn.emoji}</span>
            ) : (
              btn.icon
            )}
            
            {/* Badge */}
            {btn.badge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-purple-900 
                             text-xs font-bold rounded-full flex items-center justify-center">
                {btn.badge}
              </span>
            )}
            
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-3 py-1.5 rounded-lg
                           bg-gray-900/90 text-white text-sm whitespace-nowrap
                           opacity-0 group-hover:opacity-100 transition-opacity
                           pointer-events-none">
              {btn.label}
            </span>
          </motion.button>
        ))}

        {/* Tip popup */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-16 top-0 w-64 bg-white/95 rounded-2xl p-4 shadow-xl"
            >
              <button
                onClick={() => setShowTip(false)}
                className="absolute top-2 right-2 p-1 rounded-full bg-purple-100 hover:bg-purple-200"
              >
                <X className="w-4 h-4 text-purple-600" />
              </button>
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-wiggle">{currentTip.emoji}</span>
                <p className="text-gray-700 text-sm">{currentTip.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== RIGHT BUTTONS COLUMN ===== */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {rightButtons.map((btn, idx) => (
          <motion.button
            key={btn.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => {
              if (btn.action) btn.action()
              if (!btn.action && btn.id !== 'reset') setActiveModal(btn.id)
            }}
            className={`relative w-12 h-12 rounded-xl 
                       bg-gradient-to-br ${btn.color}
                       shadow-lg hover:scale-110 active:scale-95
                       transition-transform flex items-center justify-center
                       text-white group`}
          >
            {btn.icon}
            
            {/* Tooltip */}
            <span className="absolute right-full mr-2 px-3 py-1.5 rounded-lg
                           bg-gray-900/90 text-white text-sm whitespace-nowrap
                           opacity-0 group-hover:opacity-100 transition-opacity
                           pointer-events-none">
              {btn.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* ===== SCROLL TO TOP BUTTON ===== */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed right-3 bottom-3 z-30 w-10 h-10 rounded-full
                   bg-white/10 hover:bg-white/20 backdrop-blur-sm
                   text-white/50 hover:text-white transition-colors
                   flex items-center justify-center"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>

      {/* ===== MODALS ===== */}
      
      {/* TASKS MODAL */}
      <AnimatePresence>
        {activeModal === 'tasks' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md bg-gradient-to-br from-gray-900 to-teal-900 
                         rounded-3xl border-4 border-teal-500/30 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-teal-600 p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/20">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Задания дня</h2>
                    <p className="text-teal-100">{completedTasks}/{totalTasks} выполнено</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 rounded-xl hover:bg-white/20">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* All completed message */}
              {allCompleted && !taskBonusClaimed && (
                <div className="p-6 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-center">
                  <div className="flex justify-center gap-2 mb-2">
                    <Gift className="w-8 h-8 text-yellow-400" />
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                  <p className="text-xl font-bold text-yellow-300 mb-2">Все задания выполнены! 🎉</p>
                  <p className="text-yellow-200 mb-3">Ты заработал {totalReward} баллов!</p>
                  <button
                    onClick={() => setTaskBonusClaimed(true)}
                    className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 
                               text-purple-900 rounded-xl font-bold hover:scale-105 transition-transform"
                  >
                    Забрать награду! ✨
                  </button>
                </div>
              )}

              {/* Daily summary */}
              <div className="p-4 grid grid-cols-3 gap-3 border-b border-teal-500/20 bg-teal-800/30">
                <div className="text-center p-2 rounded-xl bg-white/5">
                  <BookOpen className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-white">{todayLessons}</div>
                  <div className="text-xs text-teal-300">уроков</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/5">
                  <Gamepad2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-white">{todayGames}</div>
                  <div className="text-xs text-teal-300">игр</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/5">
                  <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-white">{todayPoints}</div>
                  <div className="text-xs text-teal-300">баллов</div>
                </div>
              </div>

              {/* Tasks list */}
              <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
                {tasks.filter(t => t.points > 0).map((task) => {
                  const isCompleted = task.progress >= task.total
                  const progressPercent = Math.min((task.progress / task.total) * 100, 100)
                  return (
                    <div key={task.id} className={`p-4 rounded-2xl border-2 ${isCompleted ? 'bg-green-500/20 border-green-400/50' : 'bg-white/5 border-white/10'}`}>
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`p-2 rounded-xl ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
                          {isCompleted ? <CheckCircle className="w-5 h-5" /> : getIcon(task.icon)}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold ${isCompleted ? 'text-green-300' : 'text-white'}`}>{task.title}</h3>
                          <p className="text-sm text-gray-400">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Zap className="w-4 h-4" />
                          <span className="font-bold">+{task.points}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${isCompleted ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-teal-400 to-cyan-500'}`} style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKERS MODAL */}
      <AnimatePresence>
        {activeModal === 'stickers' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl border-2 border-white/10"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/30 rounded-xl">
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Альбом наклеек</h3>
                      <p className="text-yellow-300 text-sm">{unlockedStickers} из {totalStickersCount} собрано</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="text-white/50 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Progress */}
                <div className="mt-3">
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500" style={{ width: `${(unlockedStickers / totalStickersCount) * 100}%` }} />
                  </div>
                </div>
                
                {/* Filters */}
                <div className="flex gap-2 mt-3">
                  {[
                    { id: 'all', label: 'Все' },
                    { id: 'unlocked', label: 'Собраны' },
                    { id: 'locked', label: 'Не собраны' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id as typeof filter)}
                      className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${filter === f.id ? 'bg-yellow-500 text-white' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Stickers grid */}
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-4 gap-3">
                  {sortedStickers.map((sticker, idx) => {
                    const colors = rarityColors[sticker.rarity]
                    return (
                      <motion.button
                        key={sticker.id}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        onClick={() => sticker.unlocked && setSelectedSticker(sticker)}
                        disabled={!sticker.unlocked}
                        className={`aspect-square rounded-2xl p-3 flex flex-col items-center justify-center transition-all relative overflow-hidden ${sticker.unlocked ? `bg-gradient-to-br ${colors.bg} ${colors.glow} shadow-lg cursor-pointer hover:scale-105` : 'bg-white/5 border border-white/10 cursor-not-allowed'}`}
                      >
                        {sticker.unlocked ? (
                          <>
                            <span className="text-3xl mb-1">{sticker.emoji}</span>
                            <span className="text-[10px] text-white/80 font-medium text-center line-clamp-1">{sticker.name}</span>
                            <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${sticker.rarity === 'legendary' ? 'bg-yellow-300 animate-pulse' : sticker.rarity === 'epic' ? 'bg-purple-300' : sticker.rarity === 'rare' ? 'bg-blue-300' : 'bg-gray-300'}`} />
                          </>
                        ) : (
                          <Lock className="w-6 h-6 text-white/20" />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
              
              {/* Legend */}
              <div className="p-3 border-t border-white/10 flex justify-center gap-4">
                {Object.entries(rarityLabels).map(([rarity, label]) => (
                  <div key={rarity} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${rarityColors[rarity as keyof typeof rarityColors].bg}`} />
                    <span className="text-xs text-white/50">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticker detail */}
      <AnimatePresence>
        {selectedSticker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedSticker(null)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              className={`p-8 rounded-3xl text-center bg-gradient-to-br ${rarityColors[selectedSticker.rarity].bg} shadow-2xl`}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <span className="text-8xl block mb-4">{selectedSticker.emoji}</span>
              </motion.div>
              <h4 className="text-2xl font-bold text-white mb-2">{selectedSticker.name}</h4>
              <p className="text-white/80 mb-3">{selectedSticker.description}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium">
                {selectedSticker.rarity === 'legendary' && <Crown className="w-4 h-4" />}
                {selectedSticker.rarity === 'epic' && <Star className="w-4 h-4" />}
                {selectedSticker.rarity === 'rare' && <Sparkles className="w-4 h-4" />}
                {selectedSticker.rarity === 'common' && <CheckCircle className="w-4 h-4" />}
                {rarityLabels[selectedSticker.rarity]}
              </div>
              {selectedSticker.unlockedAt && (
                <p className="text-white/50 text-sm mt-3">Получено: {new Date(selectedSticker.unlockedAt).toLocaleDateString('ru-RU')}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACHIEVEMENTS MODAL */}
      <AnimatePresence>
        {activeModal === 'achievements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl border-4 border-purple-500/30 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm p-6 border-b border-purple-500/30 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500">
                    <Trophy className="w-8 h-8 text-purple-900" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Достижения</h2>
                    <p className="text-purple-300">{unlockedAchievements} из {totalAchievements} разблокировано</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 rounded-xl hover:bg-white/10">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Stats */}
              <div className="p-4 grid grid-cols-3 gap-3 border-b border-purple-500/20">
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <Flame className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                  <div className="text-2xl font-black text-white">{progress.streak}</div>
                  <div className="text-xs text-purple-300">дней подряд</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <Gamepad2 className="w-6 h-6 text-green-400 mx-auto mb-1" />
                  <div className="text-2xl font-black text-white">{progress.gamesPlayed}</div>
                  <div className="text-xs text-purple-300">игр</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                  <div className="text-2xl font-black text-white">{progress.totalPoints}</div>
                  <div className="text-xs text-purple-300">баллов</div>
                </div>
              </div>

              {/* Achievements grid */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allAchievements.map((achievement) => {
                  const isUnlocked = achievement.condition(progress)
                  return (
                    <div key={achievement.id} className={`p-4 rounded-2xl border-2 ${isUnlocked ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/50' : 'bg-white/5 border-white/10 opacity-50'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${isUnlocked ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-purple-900' : 'bg-gray-700 text-gray-400'}`}>
                          {getIcon(achievement.icon)}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>{achievement.name}</h3>
                          <p className="text-sm text-gray-400">{achievement.desc}</p>
                        </div>
                        {isUnlocked && (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-bold">+{achievement.points}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATS MODAL */}
      <AnimatePresence>
        {activeModal === 'stats' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-indigo-900 rounded-3xl border-4 border-indigo-500/30 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-indigo-600 p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/20">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Моя статистика</h2>
                    <p className="text-indigo-200">{selectedGrade !== null ? (selectedGrade === 0 ? 'Подготовительный класс' : `${selectedGrade} класс`) : 'Выбери класс'}</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 rounded-xl hover:bg-white/20">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Level card */}
              <div className="p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-b border-white/10">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${level.color} shadow-lg`}>
                    <span className="text-4xl">{level.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-indigo-300 text-sm mb-1">Твой уровень</p>
                    <h3 className="text-2xl font-black text-white">{level.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-bold">{totalPoints} баллов</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-white">{accuracy}%</div>
                    <div className="text-indigo-300 text-sm">точность</div>
                  </div>
                </div>
              </div>

              {/* Weekly activity */}
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  Активность за неделю
                </h3>
                <div className="flex justify-between gap-2">
                  {weekActivity.map((day, i) => (
                    <div key={i} className="flex-1 text-center">
                      <div className={`h-16 rounded-xl mb-2 flex items-center justify-center ${day.active ? 'bg-gradient-to-t from-indigo-500 to-purple-500' : 'bg-white/5'}`}>
                        {day.active && <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />}
                      </div>
                      <span className="text-xs text-gray-400">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats grid */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-400" />
                  Общая статистика
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Уроков', value: completedLessons, icon: <BookOpen className="w-5 h-5" />, color: 'text-blue-400' },
                    { label: 'Игр', value: progress.gamesPlayed, icon: <Gamepad2 className="w-5 h-5" />, color: 'text-green-400' },
                    { label: 'Дней подряд', value: streak, icon: <Flame className="w-5 h-5" />, color: 'text-orange-400' },
                    { label: 'Баллов', value: totalPoints, icon: <Zap className="w-5 h-5" />, color: 'text-yellow-400' },
                    { label: 'Достижений', value: progress.achievements.length, icon: <Trophy className="w-5 h-5" />, color: 'text-purple-400' },
                    { label: 'Точность', value: `${accuracy}%`, icon: <Target className="w-5 h-5" />, color: 'text-pink-400' }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className={`flex items-center gap-2 mb-2 ${stat.color}`}>
                        {stat.icon}
                        <span className="text-sm text-gray-400">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-800/50 border-t border-white/10">
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Ответов: {progress.correctAnswers}/{progress.totalAnswers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Продолжай в том же духе!</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESET CONFIRM */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900 rounded-2xl p-6 max-w-sm w-full border border-white/10 shadow-xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Сбросить прогресс?</h3>
                <p className="text-white/60 mb-6">Все достижения, звёзды и очки будут удалены. Это действие нельзя отменить.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">Отмена</button>
                  <button onClick={handleReset} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors">Сбросить</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
