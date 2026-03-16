'use client'

import { useState } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { Trophy, Medal, Award, Crown, Star, TrendingUp, X, Sparkles, Flame } from 'lucide-react'

export default function LeaderboardPanel() {
  const { progress } = useSchool()
  const [isOpen, setIsOpen] = useState(false)

  // Generate leaderboard from progress
  const leaderboard = [
    {
      name: 'Ты',
      points: progress.totalPoints,
      streak: progress.streak,
      games: progress.gamesPlayed,
      lessons: Object.keys(progress.completedTopics).length,
      isPlayer: true
    },
    // NPCs for comparison
    { name: 'Алексей', points: 2450, streak: 12, games: 45, lessons: 38, isPlayer: false },
    { name: 'Мария', points: 1890, streak: 8, games: 32, lessons: 29, isPlayer: false },
    { name: 'Дмитрий', points: 1450, streak: 15, games: 28, lessons: 22, isPlayer: false },
    { name: 'Анна', points: 1200, streak: 5, games: 22, lessons: 18, isPlayer: false },
    { name: 'Иван', points: 980, streak: 7, games: 18, lessons: 15, isPlayer: false },
    { name: 'Елена', points: 750, streak: 3, games: 14, lessons: 12, isPlayer: false },
  ].sort((a, b) => b.points - a.points)

  const playerRank = leaderboard.findIndex(p => p.isPlayer) + 1

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />
      case 2: return <Medal className="w-6 h-6 text-gray-300" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <span className="text-lg font-bold text-gray-400">#{rank}</span>
    }
  }

  return (
    <>
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-4 rounded-full 
                   bg-gradient-to-br from-purple-500 to-indigo-600 
                   shadow-xl hover:scale-110 transition-transform
                   flex items-center gap-2 text-white font-bold"
      >
        <TrendingUp className="w-6 h-6" />
        <span className="hidden sm:inline">#{playerRank}</span>
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 
                        bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto
                          bg-gradient-to-br from-gray-900 to-indigo-900 
                          rounded-3xl border-4 border-purple-500/30 shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm p-6 
                            border-b border-purple-500/30 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Лидерборд</h2>
                  <p className="text-purple-300 text-sm">Твоё место: #{playerRank}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Leaderboard */}
            <div className="p-4 space-y-2">
              {leaderboard.map((player, index) => {
                const rank = index + 1
                const isPlayer = player.isPlayer
                
                return (
                  <div
                    key={player.name}
                    className={`p-4 rounded-2xl border-2 transition-all
                      ${isPlayer 
                        ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-400/50 scale-[1.02]' 
                        : 'bg-white/5 border-white/10'}
                      ${rank <= 3 ? 'shadow-lg' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl
                                      ${isPlayer 
                                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                                        : 'bg-gradient-to-br from-gray-600 to-gray-700'}`}
                      >
                        {isPlayer ? '😊' : '👤'}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-bold truncate ${isPlayer ? 'text-white' : 'text-gray-300'}`}>
                            {player.name}
                          </h3>
                          {isPlayer && <Sparkles className="w-4 h-4 text-yellow-400 animate-sparkle" />}
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            {player.points}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-400" />
                            {player.streak}
                          </span>
                          <span className="flex items-center gap-1">
                            🎮 {player.games}
                          </span>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right flex-shrink-0">
                        <div className={`text-xl font-black ${isPlayer ? 'text-yellow-400' : 'text-white'}`}>
                          {player.points}
                        </div>
                        <div className="text-xs text-gray-400">баллов</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer tip */}
            <div className="p-4 border-t border-purple-500/20">
              <p className="text-center text-sm text-purple-300">
                💡 Продолжай учиться, чтобы подняться выше!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
