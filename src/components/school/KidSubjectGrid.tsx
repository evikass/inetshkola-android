'use client'

import { useSchool } from '@/context/SchoolContext'
import { SubjectData } from '@/data/types'
import {
  BookOpen, Calculator, Palette, Music, Dumbbell, Globe, BookOpenText,
  Languages, Ruler, Shield, Map, Leaf, Atom, FlaskConical, Sigma, Shapes,
  Landmark, Users, Monitor, Hammer, HeartHandshake, Lightbulb, Cpu, Brush,
  MapPin, Blocks, MessageSquare, Wallet, Smartphone, Bug, Pencil, MessageCircle, Code,
  Gamepad2, ArrowLeft, Sparkles
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Calculator, Palette, Music, Dumbbell, Globe, BookOpenText, Languages, Ruler,
  Shield, Map, Leaf, Atom, FlaskConical, Sigma, Shapes, Landmark, Users, Monitor, Hammer,
  HeartHandshake, Lightbulb, Cpu, Brush, MapPin, Blocks, MessageSquare, Wallet, Smartphone, Bug,
  Pencil, MessageCircle, Code
}

const subjectEmojis: Record<string, string> = {
  'Математика': '🔢',
  'Русский язык': '📝',
  'Литература': '📚',
  'Окружающий мир': '🌍',
  'Английский': '🇬🇧',
  'Музыка': '🎵',
  'Физкультура': '⚽',
  'ИЗО': '🎨',
  'Технология': '🔧',
  'ОБЖ': '🛡️',
  'История': '📜',
  'Биология': '🧬',
  'География': '🗺️',
  'Физика': '⚛️',
  'Химия': '🧪',
  'Обществознание': '👥',
  'Информатика': '💻',
  'Алгебра': '📐',
  'Геометрия': '📏',
  'Экология': '🌿',
  'Робототехника': '🤖',
  'Кодирование': '👨‍💻',
  'Чтение': '📖',
  'Речь': '💬',
  'Письмо': '✍️',
  'Окр. мир': '🌏',
  'Ручной труд': '✂️',
  'Основы счёта': '🔢',
  'Подготовка к письму': '✏️',
  'Развитие речи': '💬',
}

const gradeEmoji = (cls: number | null) => {
  if (cls === 0) return '🎒'
  if (cls === 1) return '🌟'
  if (cls === 2) return '🦋'
  return '📚'
}

export default function KidSubjectGrid() {
  const { selectedClass, subjects, games, goToSubject, goToGames, goBack } = useSchool()

  const getEmoji = (title: string) => subjectEmojis[title] || '📖'

  return (
    <div className="w-full animate-bounceIn">
      {/* Back button - BIG for kids */}
      <button
        onClick={goBack}
        className="mb-8 flex items-center gap-3 text-white text-2xl font-bold 
                   bg-white/20 hover:bg-white/30 px-8 py-4 rounded-3xl transition-all
                   border-4 border-white/30 hover:border-white/50"
      >
        <ArrowLeft className="w-8 h-8" /> 
        Назад
      </button>

      {/* Title - HUGE and colorful */}
      <div className="text-center mb-10">
        <div className="text-8xl mb-4 animate-float">{gradeEmoji(selectedClass)}</div>
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text 
                       bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-4">
          {selectedClass === 0 ? 'Подготовишки' : `${selectedClass} класс`}
        </h2>
        <p className="text-2xl text-purple-200">
          Выбери, что хочешь учить! 📚
        </p>
      </div>

      {/* Games button - HUGE */}
      {games.length > 0 && (
        <button
          onClick={goToGames}
          className="w-full mb-10 p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 
                     rounded-3xl shadow-2xl transition-all hover:scale-[1.02] 
                     border-4 border-white/30 hover:border-yellow-400 group"
        >
          <div className="flex items-center justify-center gap-6">
            <Gamepad2 className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-3xl md:text-4xl font-black text-white">ИГРЫ!</div>
              <div className="text-xl text-white/80">{games.length} игр доступно</div>
            </div>
            <Sparkles className="w-12 h-12 text-yellow-300 animate-sparkle" />
          </div>
        </button>
      )}

      {/* Subjects grid - BIG CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {subjects.map((subject: SubjectData, index: number) => {
          const emoji = getEmoji(subject.title)
          const lessonsCount = subject.detailedTopics?.reduce((acc, t) => acc + (t.subtopics?.reduce((a, s) => a + s.lessons.length, 0) || t.lessons?.length || 0), 0) || 0
          const gamesCount = subject.games?.length || 0

          return (
            <button
              key={index}
              onClick={() => goToSubject(subject)}
              className="group relative overflow-hidden p-8 rounded-3xl
                         bg-gradient-to-br from-indigo-600/60 to-purple-600/60
                         border-4 border-white/20 hover:border-yellow-400
                         shadow-xl hover:shadow-2xl hover:scale-[1.02]
                         transition-all duration-300 text-left"
            >
              {/* Icon/Emoji */}
              <div className="flex items-start gap-5 mb-5">
                <div className="p-5 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 
                                shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-5xl">{emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                    {subject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {lessonsCount > 0 && (
                      <span className="text-lg text-blue-200 bg-blue-500/30 px-3 py-1 rounded-xl">
                        📚 {lessonsCount}
                      </span>
                    )}
                    {gamesCount > 0 && (
                      <span className="text-lg text-green-200 bg-green-500/30 px-3 py-1 rounded-xl">
                        🎮 {gamesCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Topics preview */}
              {subject.topics && subject.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {subject.topics.slice(0, 2).map((topic, i) => (
                    <span key={i} className="text-lg text-purple-200 bg-white/10 px-4 py-2 rounded-2xl">
                      {topic}
                    </span>
                  ))}
                  {subject.topics.length > 2 && (
                    <span className="text-lg text-purple-300 px-4 py-2">+{subject.topics.length - 2}</span>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="flex items-center gap-3 text-yellow-300 text-xl font-bold">
                <span>Открыть</span>
                <span className="group-hover:translate-x-2 transition-transform text-2xl">→</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
