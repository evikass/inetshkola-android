'use client'

import { useSchool } from '@/context/SchoolContext'
import { Trophy, Star, Zap, Crown, Award, Sparkles } from 'lucide-react'

interface Achievement {
  id: string
  name: string
  desc: string
  icon: string
}

const achievementsList: Achievement[] = [
  { id: 'first_quiz', name: 'Первые шаги', desc: 'Пройдите первый квиз', icon: 'star' },
  { id: 'class_master', name: 'Знаток класса', desc: 'Пройдите 5 тем', icon: 'crown' },
  { id: 'point_50', name: '50 баллов', desc: 'Накопите 50 баллов', icon: 'zap' },
  { id: 'point_100', name: '100 баллов', desc: 'Накопите 100 баллов', icon: 'award' },
]

export default function ProgressBar() {
  const { progress } = useSchool()

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'star': return <Star className="w-5 h-5" />
      case 'crown': return <Crown className="w-5 h-5" />
      case 'zap': return <Zap className="w-5 h-5" />
      case 'award': return <Award className="w-5 h-5" />
      default: return <Star className="w-5 h-5" />
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-600/40 via-pink-500/40 to-orange-500/40 
                    backdrop-blur-xl rounded-3xl p-6 mb-8 border-4 border-white/20 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Points */}
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg
                          animate-pulse">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="text-4xl font-black text-white flex items-center gap-2">
              <span className="text-5xl">{progress.totalPoints}</span>
              <div className="flex items-center">
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
            </div>
            <div className="text-lg text-purple-200">
              баллов • {Object.keys(progress.completedTopics).length} тем пройдено
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex flex-wrap gap-3 justify-center">
          {progress.achievements.length > 0 ? (
            progress.achievements.map(id => {
              const ach = achievementsList.find(a => a.id === id)
              if (!ach) return null
              return (
                <div
                  key={id}
                  className="bg-gradient-to-br from-yellow-400 to-amber-500 p-3 rounded-2xl 
                             flex items-center gap-2 text-white shadow-lg hover:scale-110 transition-transform"
                  title={ach.desc}
                >
                  {getAchievementIcon(ach.icon)}
                  <span className="font-bold hidden sm:inline">{ach.name}</span>
                </div>
              )
            })
          ) : (
            <div className="text-white/50 text-lg">
              Пройди уроки и получи достижения! 🏆
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
