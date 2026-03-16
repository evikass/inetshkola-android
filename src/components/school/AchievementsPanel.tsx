'use client'

import { useState, useRef, useEffect } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { Trophy, Star, Zap, Crown, Award, Target, Flame, Medal, Sparkles, BookOpen, Gamepad2, X, Heart, Rocket, Brain, Bolt, Globe, Music, Palette, Calculator, Languages } from 'lucide-react'

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
  // Начальные достижения
  { id: 'first_lesson', name: 'Первый шаг', desc: 'Пройди первый урок', icon: 'book', condition: (p) => Object.keys(p.completedTopics).length >= 1, points: 10 },
  { id: 'first_game', name: 'Игрок', desc: 'Сыграй первую игру', icon: 'game', condition: (p) => p.gamesPlayed >= 1, points: 10 },
  { id: 'five_lessons', name: 'Ученик', desc: 'Пройди 5 уроков', icon: 'star', condition: (p) => Object.keys(p.completedTopics).length >= 5, points: 20 },
  
  // Баллы
  { id: 'points_50', name: 'Коллекционер', desc: 'Набери 50 баллов', icon: 'zap', condition: (p) => p.totalPoints >= 50, points: 15 },
  { id: 'points_100', name: 'Богач', desc: 'Набери 100 баллов', icon: 'zap', condition: (p) => p.totalPoints >= 100, points: 25 },
  { id: 'points_250', name: 'Тысяча', desc: 'Набери 250 баллов', icon: 'zap', condition: (p) => p.totalPoints >= 250, points: 50 },
  { id: 'points_500', name: 'Миллионер', desc: 'Набери 500 баллов', icon: 'crown', condition: (p) => p.totalPoints >= 500, points: 100 },
  { id: 'points_1500', name: 'Богач PRO', desc: 'Набери 1500 баллов', icon: 'crown', condition: (p) => p.totalPoints >= 1500, points: 200 },
  { id: 'points_3000', name: 'Олигарх', desc: 'Набери 3000 баллов', icon: 'crown', condition: (p) => p.totalPoints >= 3000, points: 500 },
  
  // Прогресс
  { id: 'ten_lessons', name: 'Отличник', desc: 'Пройди 10 уроков', icon: 'medal', condition: (p) => Object.keys(p.completedTopics).length >= 10, points: 30 },
  { id: 'twenty_lessons', name: 'Знаток', desc: 'Пройди 20 уроков', icon: 'target', condition: (p) => Object.keys(p.completedTopics).length >= 20, points: 50 },
  { id: 'fifty_lessons', name: 'Мастер', desc: 'Пройди 50 уроков', icon: 'crown', condition: (p) => Object.keys(p.completedTopics).length >= 50, points: 100 },
  { id: 'seventyfive_lessons', name: 'Профессор', desc: 'Пройди 75 уроков', icon: 'crown', condition: (p) => Object.keys(p.completedTopics).length >= 75, points: 150 },
  
  // Серии
  { id: 'streak_3', name: 'На волне', desc: 'Занимайся 3 дня подряд', icon: 'flame', condition: (p) => p.streak >= 3, points: 30 },
  { id: 'streak_7', name: 'Недельный марафон', desc: 'Занимайся 7 дней подряд', icon: 'flame', condition: (p) => p.streak >= 7, points: 70 },
  { id: 'streak_14', name: 'Двухнедельный герой', desc: 'Занимайся 14 дней подряд', icon: 'flame', condition: (p) => p.streak >= 14, points: 100 },
  { id: 'streak_21', name: 'Три недели силы', desc: 'Занимайся 21 день подряд', icon: 'flame', condition: (p) => p.streak >= 21, points: 150 },
  { id: 'streak_30', name: 'Месячный чемпион', desc: 'Занимайся 30 дней подряд', icon: 'lightning', condition: (p) => p.streak >= 30, points: 200 },
  { id: 'streak_60', name: 'Двухмесячный титан', desc: 'Занимайся 60 дней подряд', icon: 'lightning', condition: (p) => p.streak >= 60, points: 400 },
  { id: 'streak_100', name: 'Легенда streak', desc: 'Занимайся 100 дней подряд', icon: 'lightning', condition: (p) => p.streak >= 100, points: 1000 },
  
  // Игры
  { id: 'games_5', name: 'Любитель игр', desc: 'Сыграй 5 игр', icon: 'game', condition: (p) => p.gamesPlayed >= 5, points: 25 },
  { id: 'games_10', name: 'Геймер', desc: 'Сыграй 10 игр', icon: 'game', condition: (p) => p.gamesPlayed >= 10, points: 50 },
  { id: 'games_25', name: 'Проигрок', desc: 'Сыграй 25 игр', icon: 'game', condition: (p) => p.gamesPlayed >= 25, points: 75 },
  { id: 'games_50', name: 'Чемпион', desc: 'Сыграй 50 игр', icon: 'trophy', condition: (p) => p.gamesPlayed >= 50, points: 100 },
  { id: 'games_100', name: 'Игровой маньяк', desc: 'Сыграй 100 игр', icon: 'trophy', condition: (p) => p.gamesPlayed >= 100, points: 200 },
  
  // Точность
  { id: 'perfect_game', name: 'Идеально!', desc: 'Ответь правильно на все вопросы в игре', icon: 'star', condition: (p) => p.achievements.includes('perfect_game'), points: 50 },
  { id: 'accuracy_70', name: 'Хороший результат', desc: '70% правильных ответов', icon: 'target', condition: (p) => p.totalAnswers > 0 && (p.correctAnswers / p.totalAnswers) >= 0.7, points: 50 },
  { id: 'accuracy_80', name: 'Меткий', desc: '80% правильных ответов', icon: 'target', condition: (p) => p.totalAnswers > 0 && (p.correctAnswers / p.totalAnswers) >= 0.8, points: 75 },
  { id: 'accuracy_90', name: 'Снайпер', desc: '90% правильных ответов', icon: 'target', condition: (p) => p.totalAnswers > 0 && (p.correctAnswers / p.totalAnswers) >= 0.9, points: 100 },
  { id: 'accuracy_95', name: 'Сверхточный', desc: '95% правильных ответов', icon: 'target', condition: (p) => p.totalAnswers >= 20 && (p.correctAnswers / p.totalAnswers) >= 0.95, points: 200 },
  
  // Особые достижения
  { id: 'heart', name: 'Любовь к учебе', desc: 'Занимайся в выходной день', icon: 'heart', condition: (p) => p.achievements.includes('weekend_warrior'), points: 30 },
  { id: 'brain', name: 'Гений', desc: 'Набери 1000 баллов', icon: 'brain', condition: (p) => p.totalPoints >= 1000, points: 150 },
  { id: 'rocket', name: 'К звёздам', desc: 'Пройди 100 уроков', icon: 'rocket', condition: (p) => Object.keys(p.completedTopics).length >= 100, points: 200 },
  
  // Мастерство ответов
  { id: 'answers_50', name: 'Практик', desc: 'Ответь на 50 вопросов', icon: 'medal', condition: (p) => p.totalAnswers >= 50, points: 40 },
  { id: 'answers_100', name: 'Опытный', desc: 'Ответь на 100 вопросов', icon: 'medal', condition: (p) => p.totalAnswers >= 100, points: 80 },
  { id: 'answers_500', name: 'Ветеран', desc: 'Ответь на 500 вопросов', icon: 'medal', condition: (p) => p.totalAnswers >= 500, points: 200 },
  { id: 'answers_1000', name: 'Энциклопедист', desc: 'Ответь на 1000 вопросов', icon: 'trophy', condition: (p) => p.totalAnswers >= 1000, points: 500 },
]

export default function AchievementsPanel() {
  const { progress, unlockAchievement } = useSchool()
  const [isOpen, setIsOpen] = useState(false)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const prevAchievementsRef = useRef<string[]>(progress.achievements)

  const unlockedCount = allAchievements.filter(a => a.condition(progress)).length
  const totalCount = allAchievements.length

  // Check for new achievements - only when achievements change
  useEffect(() => {
    const prevCount = prevAchievementsRef.current.length
    const currentCount = progress.achievements.length
    
    if (currentCount > prevCount) {
      // Find newly unlocked achievement
      const newId = progress.achievements.find(id => !prevAchievementsRef.current.includes(id))
      if (newId) {
        const achievement = allAchievements.find(a => a.id === newId)
        if (achievement) {
          setNewAchievement(achievement)
          const timer = setTimeout(() => setNewAchievement(null), 3000)
          return () => clearTimeout(timer)
        }
      }
    }
    prevAchievementsRef.current = progress.achievements
  }, [progress.achievements])

  const getIcon = (icon: string) => {
    const iconClass = "w-6 h-6"
    switch (icon) {
      case 'star': return <Star className={iconClass} />
      case 'crown': return <Crown className={iconClass} />
      case 'zap': return <Zap className={iconClass} />
      case 'award': return <Award className={iconClass} />
      case 'target': return <Target className={iconClass} />
      case 'flame': return <Flame className={iconClass} />
      case 'medal': return <Medal className={iconClass} />
      case 'book': return <BookOpen className={iconClass} />
      case 'game': return <Gamepad2 className={iconClass} />
      case 'heart': return <Heart className={iconClass} />
      case 'rocket': return <Rocket className={iconClass} />
      case 'brain': return <Brain className={iconClass} />
      case 'lightning': return <Bolt className={iconClass} />
      case 'trophy': return <Trophy className={iconClass} />
      default: return <Star className={iconClass} />
    }
  }

  return (
    <>
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full 
                   bg-gradient-to-br from-yellow-400 to-orange-500 
                   shadow-xl hover:scale-110 transition-transform
                   flex items-center gap-2 text-purple-900 font-bold"
      >
        <Trophy className="w-6 h-6" />
        <span className="hidden sm:inline">{unlockedCount}/{totalCount}</span>
      </button>

      {/* Уведомление о новом достижении */}
      {newAchievement && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounceIn">
          <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 
                          shadow-2xl flex items-center gap-4 text-purple-900">
            <div className="p-2 rounded-xl bg-white/30">
              {getIcon(newAchievement.icon)}
            </div>
            <div>
              <p className="font-bold text-lg">{newAchievement.name}</p>
              <p className="text-sm opacity-80">{newAchievement.desc}</p>
            </div>
            <Sparkles className="w-6 h-6 animate-sparkle" />
          </div>
        </div>
      )}

      {/* Модальное окно */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 
                        bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto
                          bg-gradient-to-br from-gray-900 to-purple-900 
                          rounded-3xl border-4 border-purple-500/30 shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm p-6 
                            border-b border-purple-500/30 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500">
                  <Trophy className="w-8 h-8 text-purple-900" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Достижения</h2>
                  <p className="text-purple-300">{unlockedCount} из {totalCount} разблокировано</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
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
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-2xl border-2 transition-all
                      ${isUnlocked 
                        ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/50' 
                        : 'bg-white/5 border-white/10 opacity-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl transition-all
                        ${isUnlocked 
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-purple-900' 
                          : 'bg-gray-700 text-gray-400'}`}>
                        {getIcon(achievement.icon)}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                          {achievement.name}
                        </h3>
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
          </div>
        </div>
      )}
    </>
  )
}

