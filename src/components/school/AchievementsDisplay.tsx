'use client'

import { useSchool } from '@/context/SchoolContext'
import { Trophy, Star, Zap, Target, Award, Medal, Crown, Flame, BookOpen, Gamepad2, Heart } from 'lucide-react'

interface AchievementDef {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  condition: (progress: any) => boolean
  color: string
  bgColor: string
}

const achievementDefs: AchievementDef[] = [
  { 
    id: 'first_lesson', 
    title: 'Первый шаг', 
    description: 'Завершить первый урок', 
    icon: <BookOpen className="w-8 h-8" />, 
    condition: (p) => Object.keys(p.completedTopics || {}).length >= 1, 
    color: 'text-yellow-400',
    bgColor: 'from-yellow-500 to-orange-500' 
  },
  { 
    id: 'first_game', 
    title: 'Игрок', 
    description: 'Сыграть в первую игру', 
    icon: <Gamepad2 className="w-8 h-8" />, 
    condition: (p) => (p.gamesPlayed || 0) >= 1, 
    color: 'text-purple-400',
    bgColor: 'from-purple-500 to-pink-500' 
  },
  { 
    id: 'five_games', 
    title: 'Любитель игр', 
    description: 'Сыграть 5 игр', 
    icon: <Target className="w-8 h-8" />, 
    condition: (p) => (p.gamesPlayed || 0) >= 5, 
    color: 'text-blue-400',
    bgColor: 'from-blue-500 to-cyan-500' 
  },
  { 
    id: 'perfect_game', 
    title: 'Идеально!', 
    description: 'Пройти игру без ошибок', 
    icon: <Award className="w-8 h-8" />, 
    condition: (p) => p.achievements?.includes('perfect_game'), 
    color: 'text-green-400',
    bgColor: 'from-green-500 to-emerald-500' 
  },
  { 
    id: 'streak_3', 
    title: 'Три дня подряд', 
    description: 'Заниматься 3 дня подряд', 
    icon: <Zap className="w-8 h-8" />, 
    condition: (p) => (p.streak || 0) >= 3, 
    color: 'text-amber-400',
    bgColor: 'from-amber-500 to-yellow-500' 
  },
  { 
    id: 'streak_7', 
    title: 'Недельный марафон', 
    description: 'Заниматься 7 дней подряд', 
    icon: <Flame className="w-8 h-8" />, 
    condition: (p) => (p.streak || 0) >= 7, 
    color: 'text-orange-400',
    bgColor: 'from-orange-500 to-red-500' 
  },
  { 
    id: 'points_100', 
    title: 'Сотня!', 
    description: 'Набрать 100 очков', 
    icon: <Star className="w-8 h-8" />, 
    condition: (p) => (p.totalPoints || 0) >= 100, 
    color: 'text-indigo-400',
    bgColor: 'from-indigo-500 to-purple-500' 
  },
  { 
    id: 'points_500', 
    title: 'Полтысячи!', 
    description: 'Набрать 500 очков', 
    icon: <Medal className="w-8 h-8" />, 
    condition: (p) => (p.totalPoints || 0) >= 500, 
    color: 'text-rose-400',
    bgColor: 'from-rose-500 to-pink-500' 
  },
  { 
    id: 'lessons_10', 
    title: 'Ученик', 
    description: 'Завершить 10 уроков', 
    icon: <Heart className="w-8 h-8" />, 
    condition: (p) => Object.keys(p.completedTopics || {}).length >= 10, 
    color: 'text-pink-400',
    bgColor: 'from-pink-500 to-rose-500' 
  },
  { 
    id: 'lessons_50', 
    title: 'Отличник', 
    description: 'Завершить 50 уроков', 
    icon: <Crown className="w-8 h-8" />, 
    condition: (p) => Object.keys(p.completedTopics || {}).length >= 50, 
    color: 'text-amber-400',
    bgColor: 'from-amber-400 to-yellow-400' 
  },
]

export default function AchievementsDisplay() {
  const { progress } = useSchool()
  
  const unlocked = achievementDefs.filter(a => a.condition(progress))
  const locked = achievementDefs.filter(a => !a.condition(progress))

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <Trophy className="w-10 h-10 text-yellow-400" />
        <div>
          <h3 className="text-2xl font-black text-white">Достижения</h3>
          <p className="text-purple-300">
            Разблокировано: <span className="text-yellow-400 font-bold">{unlocked.length}</span> из {achievementDefs.length}
          </p>
        </div>
      </div>

      {/* Unlocked achievements */}
      {unlocked.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {unlocked.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-4 rounded-2xl bg-gradient-to-br ${achievement.bgColor}
                         border-2 border-white/30 shadow-lg animate-popIn`}
              title={achievement.description}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 text-white">{achievement.icon}</div>
                <h4 className="font-bold text-white text-sm">{achievement.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Locked achievements */}
      {locked.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 opacity-60">
          {locked.map((achievement) => (
            <div
              key={achievement.id}
              className="relative p-4 rounded-2xl bg-gray-800/50 border-2 border-gray-700"
              title={achievement.description}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl opacity-50">🔒</span>
              </div>
              <div className="flex flex-col items-center text-center opacity-30">
                <div className="mb-2 text-gray-500">{achievement.icon}</div>
                <h4 className="font-bold text-gray-500 text-sm">{achievement.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
