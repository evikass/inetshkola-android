'use client'

import { useSchool } from '@/context/SchoolContext'

const gradeStyles: Record<number, { emoji: string; color: string; bgEmoji: string }> = {
  0: { emoji: '🎒', color: 'from-pink-400 via-purple-400 to-pink-500', bgEmoji: '🎈🎈🎈' },
  1: { emoji: '🌟', color: 'from-yellow-400 via-orange-400 to-amber-500', bgEmoji: '🎒✏️📖' },
  2: { emoji: '🦋', color: 'from-blue-400 via-cyan-400 to-teal-500', bgEmoji: '📚🎨🎵' },
  3: { emoji: '🚀', color: 'from-green-400 via-emerald-400 to-green-500', bgEmoji: '🌱🌻🌳' },
  4: { emoji: '🎯', color: 'from-purple-400 via-violet-400 to-indigo-500', bgEmoji: '🏆⭐🎁' },
  5: { emoji: '🔮', color: 'from-rose-400 via-pink-400 to-fuchsia-500', bgEmoji: '🔬🔭🌍' },
  6: { emoji: '🎪', color: 'from-orange-400 via-red-400 to-rose-500', bgEmoji: '🎭🎨🎪' },
  7: { emoji: '⚡', color: 'from-cyan-400 via-blue-400 to-indigo-500', bgEmoji: '⚗️🧬📐' },
  8: { emoji: '🏆', color: 'from-emerald-400 via-teal-400 to-cyan-500', bgEmoji: '🏛️📜🗺️' },
  9: { emoji: '💎', color: 'from-violet-400 via-purple-400 to-fuchsia-500', bgEmoji: '🔭🔬⚛️' },
  10: { emoji: '🎓', color: 'from-amber-400 via-orange-400 to-red-500', bgEmoji: '📚🎓✨' },
  11: { emoji: '👑', color: 'from-fuchsia-400 via-pink-400 to-rose-500', bgEmoji: '👑🏆🌟' },
}

export default function GradeSelector() {
  const { goToClass, isKidMode } = useSchool()
  const classes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return (
    <div className="w-full animate-fadeIn">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 drop-shadow-lg mb-3">
          Выбери свой класс!
        </h2>
        <p className="text-xl text-purple-200">
          👆 Нажми на карточку 👆
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
        {classes.map((cls) => {
          const style = gradeStyles[cls] || gradeStyles[0]
          
          return (
            <button
              key={cls}
              onClick={() => goToClass(cls)}
              className={`
                group relative overflow-hidden
                p-6 md:p-8 rounded-3xl
                bg-gradient-to-br ${style.color}
                shadow-xl hover:shadow-2xl hover:scale-105 
                transition-all duration-300 ease-out
                border-4 border-white/20 hover:border-white/40
                transform hover:-translate-y-2
                active:scale-95
              `}
            >
              {/* Background decoration */}
              <div className="absolute top-2 left-2 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                {style.bgEmoji.split('')[0]}
              </div>
              <div className="absolute bottom-2 right-2 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                {style.bgEmoji.split('')[2]}
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="text-5xl md:text-6xl group-hover:scale-110 transition-transform drop-shadow-lg">
                  {style.emoji}
                </span>
                <span className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                  {cls === 0 ? 'Подг' : cls}
                </span>
                <span className="text-sm md:text-base text-white/90 font-medium">
                  {cls === 0 ? 'Подготовишки' : 'класс'}
                </span>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
