'use client'

import { useState, useMemo } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { Gift, Star, Zap, Trophy, Crown, Medal, Sparkles, X, Lock, CheckCircle, ChevronRight, Rocket, Diamond, Heart } from 'lucide-react'

interface Reward {
  id: string
  name: string
  description: string
  icon: 'gift' | 'star' | 'trophy' | 'crown' | 'medal' | 'rocket' | 'diamond' | 'heart'
  condition: (p: { totalPoints: number; streak: number; gamesPlayed: number; achievements: string[] }) => boolean
  claimed: boolean
  reward: number
}

const rewards: Reward[] = [
  // Начальные награды
  { id: 'welcome', name: 'Добро пожаловать!', description: 'Начни своё путешествие', icon: 'gift', condition: () => true, claimed: false, reward: 10 },
  { id: 'first_points', name: 'Первые баллы', description: 'Набери 10 баллов', icon: 'star', condition: (p) => p.totalPoints >= 10, claimed: false, reward: 15 },
  { id: 'first_game', name: 'Первая игра', description: 'Сыграй в первую игру', icon: 'medal', condition: (p) => p.gamesPlayed >= 1, claimed: false, reward: 20 },
  
  // Награды за баллы
  { id: 'points_50', name: 'Коллекционер', description: 'Набери 50 баллов', icon: 'star', condition: (p) => p.totalPoints >= 50, claimed: false, reward: 30 },
  { id: 'points_100', name: 'Богач', description: 'Набери 100 баллов', icon: 'star', condition: (p) => p.totalPoints >= 100, claimed: false, reward: 50 },
  { id: 'points_250', name: 'Сокровищница', description: 'Набери 250 баллов', icon: 'trophy', condition: (p) => p.totalPoints >= 250, claimed: false, reward: 75 },
  { id: 'points_500', name: 'Золотой запас', description: 'Набери 500 баллов', icon: 'crown', condition: (p) => p.totalPoints >= 500, claimed: false, reward: 100 },
  { id: 'points_1000', name: 'Платиновый уровень', description: 'Набери 1000 баллов', icon: 'diamond', condition: (p) => p.totalPoints >= 1000, claimed: false, reward: 200 },
  
  // Награды за серии
  { id: 'streak_3', name: 'На волне', description: '3 дня подряд', icon: 'star', condition: (p) => p.streak >= 3, claimed: false, reward: 25 },
  { id: 'streak_7', name: 'Недельный марафон', description: '7 дней подряд', icon: 'medal', condition: (p) => p.streak >= 7, claimed: false, reward: 50 },
  { id: 'streak_14', name: 'Двухнедельный герой', description: '14 дней подряд', icon: 'trophy', condition: (p) => p.streak >= 14, claimed: false, reward: 100 },
  { id: 'streak_30', name: 'Месячный чемпион', description: '30 дней подряд', icon: 'crown', condition: (p) => p.streak >= 30, claimed: false, reward: 200 },
  { id: 'streak_100', name: 'Легенда!', description: '100 дней подряд', icon: 'rocket', condition: (p) => p.streak >= 100, claimed: false, reward: 500 },
  
  // Награды за игры
  { id: 'games_5', name: 'Игрок', description: 'Сыграй 5 игр', icon: 'medal', condition: (p) => p.gamesPlayed >= 5, claimed: false, reward: 30 },
  { id: 'games_10', name: 'Геймер', description: 'Сыграй 10 игр', icon: 'medal', condition: (p) => p.gamesPlayed >= 10, claimed: false, reward: 50 },
  { id: 'games_25', name: 'Проигрок', description: 'Сыграй 25 игр', icon: 'trophy', condition: (p) => p.gamesPlayed >= 25, claimed: false, reward: 75 },
  { id: 'games_50', name: 'Чемпион', description: 'Сыграй 50 игр', icon: 'crown', condition: (p) => p.gamesPlayed >= 50, claimed: false, reward: 150 },
  { id: 'games_100', name: 'Мастер игр', description: 'Сыграй 100 игр', icon: 'rocket', condition: (p) => p.gamesPlayed >= 100, claimed: false, reward: 300 },
  
  // Специальные награды
  { id: 'heart', name: 'Любовь к знаниям', description: 'Занимайся в выходной', icon: 'heart', condition: (p) => p.achievements.includes('weekend_warrior'), claimed: false, reward: 50 },
]

export default function RewardSystem() {
  const { progress, addPoints } = useSchool()
  const [isOpen, setIsOpen] = useState(false)
  const [claimedRewards, setClaimedRewards] = useState<string[]>([])
  const [justClaimed, setJustClaimed] = useState<Reward | null>(null)

  const availableRewards = useMemo(() => {
    return rewards.filter(r => r.condition(progress) && !claimedRewards.includes(r.id))
  }, [progress, claimedRewards])

  const totalRewards = rewards.length
  const claimedCount = claimedRewards.length
  const availableCount = availableRewards.length

  const claimReward = (reward: Reward) => {
    if (!claimedRewards.includes(reward.id)) {
      addPoints(reward.reward)
      setClaimedRewards([...claimedRewards, reward.id])
      setJustClaimed(reward)
      setTimeout(() => setJustClaimed(null), 3000)
    }
  }

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'gift': return <Gift className="w-6 h-6" />
      case 'star': return <Star className="w-6 h-6" />
      case 'trophy': return <Trophy className="w-6 h-6" />
      case 'crown': return <Crown className="w-6 h-6" />
      case 'medal': return <Medal className="w-6 h-6" />
      case 'rocket': return <Rocket className="w-6 h-6" />
      case 'diamond': return <Diamond className="w-6 h-6" />
      case 'heart': return <Heart className="w-6 h-6" />
      default: return <Gift className="w-6 h-6" />
    }
  }

  const getIconColor = (icon: string) => {
    switch (icon) {
      case 'gift': return 'from-pink-400 to-rose-500'
      case 'star': return 'from-yellow-400 to-amber-500'
      case 'trophy': return 'from-amber-400 to-orange-500'
      case 'crown': return 'from-purple-400 to-violet-500'
      case 'medal': return 'from-blue-400 to-cyan-500'
      case 'rocket': return 'from-indigo-400 to-purple-500'
      case 'diamond': return 'from-cyan-400 to-blue-500'
      case 'heart': return 'from-red-400 to-pink-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <>
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 p-4 rounded-full 
                   bg-gradient-to-br from-pink-500 to-rose-600 
                   shadow-xl hover:scale-110 transition-transform
                   flex items-center gap-2 text-white font-bold relative"
      >
        <Gift className="w-6 h-6" />
        {availableCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 text-purple-900 
                           rounded-full text-sm font-black flex items-center justify-center animate-bounce">
            {availableCount}
          </span>
        )}
      </button>

      {/* Уведомление о полученной награде */}
      {justClaimed && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounceIn">
          <div className="px-8 py-5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-500 
                          shadow-2xl flex items-center gap-4 text-white">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${getIconColor(justClaimed.icon)}`}>
              {getIcon(justClaimed.icon)}
            </div>
            <div>
              <p className="font-bold text-lg">{justClaimed.name}</p>
              <p className="text-sm opacity-90">+{justClaimed.reward} баллов!</p>
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
                          bg-gradient-to-br from-gray-900 to-pink-900 
                          rounded-3xl border-4 border-pink-500/30 shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-pink-600 p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/20">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Награды и призы</h2>
                  <p className="text-pink-200">{claimedCount}/{totalRewards} получено • {availableCount} доступно</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Available rewards section */}
            {availableCount > 0 && (
              <div className="p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-b border-yellow-400/20">
                <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Доступные награды ({availableCount})
                </h3>
                <div className="space-y-3">
                  {availableRewards.slice(0, 3).map((reward) => (
                    <div
                      key={reward.id}
                      className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 
                                border-2 border-yellow-400/30 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${getIconColor(reward.icon)} text-white`}>
                          {getIcon(reward.icon)}
                        </div>
                        <div>
                          <p className="font-bold text-white">{reward.name}</p>
                          <p className="text-sm text-gray-400">{reward.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => claimReward(reward)}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 
                                   text-purple-900 rounded-xl font-bold hover:scale-105 transition-transform
                                   flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        +{reward.reward}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All rewards grid */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rewards.map((reward) => {
                const isUnlocked = reward.condition(progress)
                const isClaimed = claimedRewards.includes(reward.id)
                
                return (
                  <div
                    key={reward.id}
                    className={`p-4 rounded-2xl border-2 transition-all
                      ${isClaimed 
                        ? 'bg-green-500/20 border-green-400/50' 
                        : isUnlocked 
                          ? 'bg-yellow-500/20 border-yellow-400/50 animate-pulse' 
                          : 'bg-white/5 border-white/10 opacity-60'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl transition-all
                        ${isClaimed 
                          ? 'bg-green-500 text-white' 
                          : isUnlocked 
                            ? `bg-gradient-to-br ${getIconColor(reward.icon)} text-white` 
                            : 'bg-gray-700 text-gray-400'}`}>
                        {isClaimed ? <CheckCircle className="w-6 h-6" /> : getIcon(reward.icon)}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${isClaimed ? 'text-green-300' : isUnlocked ? 'text-yellow-300' : 'text-gray-400'}`}>
                          {reward.name}
                        </h3>
                        <p className="text-sm text-gray-400">{reward.description}</p>
                      </div>
                      {!isUnlocked && !isClaimed && (
                        <Lock className="w-5 h-5 text-gray-500" />
                      )}
                      {isUnlocked && !isClaimed && (
                        <button
                          onClick={() => claimReward(reward)}
                          className="px-3 py-1 bg-yellow-400 text-purple-900 rounded-lg text-sm font-bold hover:scale-105 transition-transform"
                        >
                          Забрать
                        </button>
                      )}
                      {isClaimed && (
                        <span className="text-green-400 text-sm font-bold">Получено!</span>
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
