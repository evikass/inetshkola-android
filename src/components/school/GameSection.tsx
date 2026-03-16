'use client'

import { useSchool } from '@/context/SchoolContext'
import { GameLesson } from '@/data/types'
import { ArrowLeft, Gamepad2, Star, Play } from 'lucide-react'

export default function GameSection() {
  const { games, selectedClass, selectGame, goBack } = useSchool()
  
  const safeGames = Array.isArray(games) ? games : []
  const gradeName = selectedClass === 0 ? 'Подготовишки' : selectedClass ? `${selectedClass} класс` : 'Класс'

  return (
    <div className="w-full">
      <button onClick={goBack}
        className="mb-6 flex items-center gap-2 text-white/80 hover:text-white text-xl font-medium bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl transition-all">
        <ArrowLeft className="w-6 h-6" /> Назад к предметам
      </button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-4 mb-4">
          <Gamepad2 className="w-16 h-16 text-purple-400" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-3">
          Игры и викторины!
        </h2>
        <p className="text-xl text-purple-200">{gradeName} • {safeGames.length} игр</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeGames.map((game: GameLesson, index: number) => (
          <button key={index} onClick={() => selectGame(game)}
            className="group relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-purple-600/60 to-pink-600/60 border-4 border-white/20 hover:border-yellow-400/50 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-left">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 inline-block mb-4 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
            <p className="text-purple-200 mb-4">{game.subject}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white/80 bg-white/10 px-3 py-1 rounded-xl">{game.tasks?.length || 0} заданий</span>
              <span className="flex items-center gap-1 text-yellow-400">
                <Star className="w-5 h-5 fill-yellow-400" />{game.reward?.stars || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white font-bold">
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />Начать игру!
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
