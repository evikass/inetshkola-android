'use client'

import { useSchool, LessonData } from '@/context/SchoolContext'
import { useState } from 'react'
import {
  ArrowLeft, Star, BookOpen, ChevronDown, ChevronRight, Gamepad2, Play,
  Calculator, Palette, Music, Dumbbell, Globe, BookOpenText,
  Languages, Ruler, Shield, Map, Leaf, Atom, FlaskConical, Sigma, Shapes,
  Landmark, Users, Monitor, Hammer, HeartHandshake, Lightbulb, Cpu, Brush,
  MapPin, Blocks, MessageSquare, Wallet, Smartphone, Bug, Pencil, MessageCircle, Code, X
} from 'lucide-react'
import { generateLessonQuiz } from '@/lib/lessonQuizGenerator'
import LessonAnimatedSVG from './LessonAnimatedSVG'
import PeriodicTable from './PeriodicTable'
import { LessonTopic, LessonItem } from '@/data/types'

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
  'Литературное чтение': '📖',
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

interface Lesson {
  title: string
  description: string
  tasks: string[]
}

export default function KidLessonViewer() {
  const { selectedSubject, goBack, completeTopic, addPoints, selectGame, selectGameFromLesson, games: contextGames, selectedLesson, selectLesson } = useSchool()
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(null)
  const [showGames, setShowGames] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [showPeriodicTable, setShowPeriodicTable] = useState(false)

  const getEmoji = (title: string) => subjectEmojis[title] || '📖'
  
  // Определяем, нужно ли показывать кнопку таблицы Менделеева
  const isChemistryOrPhysics = selectedSubject && (
    selectedSubject.title.toLowerCase().includes('химия') ||
    selectedSubject.title.toLowerCase().includes('физика') ||
    selectedSubject.title.toLowerCase().includes('хими') ||
    selectedSubject.title.toLowerCase().includes('физик')
  )
  
  const isChemistryOrPhysicsLesson = selectedLesson && (
    selectedLesson.title.toLowerCase().includes('атом') ||
    selectedLesson.title.toLowerCase().includes('элемент') ||
    selectedLesson.title.toLowerCase().includes('веществ') ||
    selectedLesson.title.toLowerCase().includes('молекул') ||
    selectedLesson.title.toLowerCase().includes('реакц') ||
    selectedLesson.title.toLowerCase().includes('периодическ') ||
    selectedLesson.title.toLowerCase().includes('металл') ||
    selectedLesson.title.toLowerCase().includes('механич') ||
    selectedLesson.title.toLowerCase().includes('энерг') ||
    selectedLesson.title.toLowerCase().includes('закон')
  )
  
  const showPeriodicTableButton = isChemistryOrPhysics || isChemistryOrPhysicsLesson

  if (!selectedSubject) return null

  const topics = selectedSubject.detailedTopics || []
  // Используем игры из контекста (allGames для текущего класса)
  const games = contextGames || []

  // Если выбран урок - показываем его содержимое
  if (selectedLesson) {
    return (
      <div className="w-full animate-slideIn">
        <button
          onClick={() => selectLesson(null)}
          className="mb-6 flex items-center gap-3 text-white text-2xl font-bold 
                     bg-white/20 hover:bg-white/30 px-8 py-4 rounded-3xl transition-all"
        >
          <ArrowLeft className="w-8 h-8" /> Назад к урокам
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 rounded-3xl p-6 md:p-8 border-4 border-white/20">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              {selectedLesson.title}
            </h2>
            
            {/* Анимированный SVG для урока */}
            <div className="flex justify-center mb-6">
              <LessonAnimatedSVG 
                lessonTitle={selectedLesson.title} 
                subject={selectedSubject?.title || ''}
                size="medium" 
              />
            </div>
            
            <div className="prose prose-invert max-w-none">
              <div className="text-lg text-purple-100 whitespace-pre-line leading-relaxed">
                {selectedLesson.description.split('\n').map((line, i) => {
                  // Обработка заголовков
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={i} className="text-xl font-bold text-yellow-300 mt-4 mb-2">{line.replace(/\*\*/g, '')}</h3>
                  }
                  // Обработка жирного текста в начале строки
                  if (line.startsWith('**')) {
                    const match = line.match(/\*\*(.+?)\*\*/)
                    if (match) {
                      return <p key={i} className="mb-2"><strong className="text-yellow-300">{match[1]}</strong>{line.replace(/\*\*.+?\*\*/, '')}</p>
                    }
                  }
                  // Обработка пунктов списка
                  if (line.startsWith('- ')) {
                    return <p key={i} className="ml-4 mb-1">• {line.substring(2)}</p>
                  }
                  // Обработка нумерованных списков
                  if (/^\d+\./.test(line)) {
                    return <p key={i} className="ml-4 mb-1">{line}</p>
                  }
                  // Пустые строки
                  if (!line.trim()) {
                    return <div key={i} className="h-2" />
                  }
                  return <p key={i} className="mb-2">{line}</p>
                })}
              </div>
            </div>

            {selectedLesson.tasks && selectedLesson.tasks.length > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border-2 border-purple-400/30">
                <h4 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                  📝 Задания:
                </h4>
                <ul className="space-y-2">
                  {selectedLesson.tasks.map((task, i) => (
                    <li key={i} className="text-white flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => {
                  // Сначала пробуем найти готовую игру по теме
                  const subjectGames = games.filter(g =>
                    g.subject === selectedSubject.title ||
                    selectedSubject.title.toLowerCase().includes(g.subject.toLowerCase()) ||
                    g.subject.toLowerCase().includes(selectedSubject.title.toLowerCase())
                  )

                  if (subjectGames.length > 0) {
                    // Выбрать случайную готовую игру по теме
                    const randomGame = subjectGames[Math.floor(Math.random() * subjectGames.length)]
                    selectGameFromLesson(randomGame)
                  } else {
                    // Генерируем игру на основе урока
                    const generatedGame = generateLessonQuiz(
                      selectedLesson.title,
                      selectedLesson.description,
                      selectedSubject.title
                    )
                    if (generatedGame) {
                      selectGameFromLesson(generatedGame)
                    } else if (games.length > 0) {
                      // Если генерация не удалась - выбрать случайную игру
                      const randomGame = games[Math.floor(Math.random() * games.length)]
                      selectGameFromLesson(randomGame)
                    }
                  }
                }}
                className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 
                           hover:from-purple-400 hover:to-pink-400
                           text-white rounded-2xl transition-all hover:scale-105 flex items-center gap-2"
              >
                🎮 Игра-тест
              </button>
              <button
                onClick={() => {
                  // Отметить урок как пройденный без игры
                  setCompletedLessons(new Set([...completedLessons, selectedLesson.title]))
                  completeTopic(selectedLesson.title)
                  addPoints(5)
                  selectLesson(null)
                }}
                className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 
                           hover:from-green-400 hover:to-emerald-400
                           text-white rounded-2xl transition-all hover:scale-105 flex items-center gap-2"
              >
                ✅ Понял! +5 ⭐
              </button>
              <button
                onClick={() => selectLesson(null)}
                className="px-8 py-4 text-xl font-bold bg-white/20 hover:bg-white/30 
                           text-white rounded-2xl transition-all"
              >
                📚 К другим урокам
              </button>
              {showPeriodicTableButton && (
                <button
                  onClick={() => setShowPeriodicTable(true)}
                  className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 
                             hover:from-cyan-400 hover:to-blue-400
                             text-white rounded-2xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  ⚛️ Таблица Менделеева
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Periodic Table Modal */}
        {showPeriodicTable && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-7xl my-8 relative">
              <button
                onClick={() => setShowPeriodicTable(false)}
                className="absolute -top-2 -right-2 z-10 p-3 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
              <PeriodicTable onClose={() => setShowPeriodicTable(false)} />
            </div>
          </div>
        )}
      </div>
    )
  }

  // Если показываем игры
  if (showGames) {
    return (
      <div className="w-full animate-slideIn">
        <button
          onClick={() => setShowGames(false)}
          className="mb-8 flex items-center gap-3 text-white text-2xl font-bold 
                     bg-white/20 hover:bg-white/30 px-8 py-4 rounded-3xl transition-all"
        >
          <ArrowLeft className="w-8 h-8" /> Назад к урокам
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-3xl font-black text-white">Игры и задания</h2>
          <p className="text-purple-200 mt-2">{games.length} игр для закрепления знаний!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {games.map((game, index) => (
            <button
              key={index}
              onClick={() => selectGame(game)}
              className="p-6 rounded-3xl bg-gradient-to-br from-purple-600/50 to-pink-600/50 
                         border-4 border-white/20 hover:border-yellow-400
                         text-left transition-all hover:scale-[1.02] group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{game.title}</h4>
                  <p className="text-purple-200">{game.tasks.length} заданий</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <Star className="w-5 h-5 fill-yellow-400" />
                <span className="font-medium">{game.reward.stars} звёзд</span>
                <Play className="w-5 h-5 ml-auto group-hover:scale-110 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Основной вид - список тем и уроков
  return (
    <div className="w-full animate-slideIn">
      <button
        onClick={goBack}
        className="mb-8 flex items-center gap-3 text-white text-2xl font-bold 
                   bg-white/20 hover:bg-white/30 px-8 py-4 rounded-3xl transition-all"
      >
        <ArrowLeft className="w-8 h-8" /> Назад
      </button>

      <div className="text-center mb-10">
        <div className="text-7xl mb-4">{getEmoji(selectedSubject.title)}</div>
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text 
                       bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-4">
          {selectedSubject.title}
        </h2>
        <p className="text-xl text-purple-200">
          {topics.reduce((acc, t) => acc + (t.lessons?.length || 0), 0)} уроков для изучения! 📚
        </p>
      </div>

      {/* Кнопка игр */}
      {games.length > 0 && (
        <div className="text-center mb-6">
          <button
            onClick={() => setShowGames(true)}
            className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-green-500 to-teal-500 
                       hover:from-green-400 hover:to-teal-400
                       text-white rounded-2xl transition-all hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <Gamepad2 className="w-6 h-6" />
            Игры и задания ({games.length})
          </button>
        </div>
      )}

      <div className="space-y-4 max-w-4xl mx-auto">
        {topics.map((topicBlock: LessonTopic, topicIndex: number) => {
          const isExpanded = selectedTopicIndex === topicIndex
          const lessonsCount = topicBlock.lessons?.length || 0
          const completedCount = topicBlock.lessons?.filter(l => completedLessons.has(l.title)).length || 0

          return (
            <div key={topicIndex} 
                 className="rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500/30 to-purple-500/30 
                            border-4 border-white/20">
              {/* Topic header */}
              <button
                onClick={() => setSelectedTopicIndex(isExpanded ? null : topicIndex)}
                className="w-full px-6 py-5 flex items-center justify-between text-left
                           hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 
                                  flex items-center justify-center text-white font-black text-2xl shadow-lg">
                    {topicIndex + 1}
                  </div>
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-white">{topicBlock.topic}</span>
                    <div className="text-sm text-purple-300">
                      {completedCount > 0 ? (
                        <span className="text-green-400">✓ {completedCount}/{lessonsCount} пройдено</span>
                      ) : (
                        <span>{lessonsCount} уроков</span>
                      )}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-8 h-8 text-yellow-400" />
                ) : (
                  <ChevronRight className="w-8 h-8 text-yellow-400" />
                )}
              </button>

              {/* Expanded lessons */}
              {isExpanded && topicBlock.lessons && (
                <div className="px-6 pb-6 space-y-3 bg-gray-900/30">
                  {topicBlock.lessons.map((lesson, lessonIndex) => {
                    const isCompleted = completedLessons.has(lesson.title)
                    
                    return (
                      <button
                        key={lessonIndex}
                        onClick={() => selectLesson(lesson)}
                        className={`w-full p-5 rounded-2xl text-left transition-all hover:scale-[1.01]
                                   ${isCompleted 
                                     ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-400/50'
                                     : 'bg-white/10 border-2 border-white/10 hover:border-yellow-400/50'
                                   }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-2xl
                                          ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-br from-purple-400 to-pink-400'}`}>
                            {isCompleted ? '✅' : '📖'}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-white mb-1">{lesson.title}</h4>
                            <p className="text-sm text-purple-300 line-clamp-1">
                              {lesson.description.substring(0, 80)}...
                            </p>
                          </div>
                          <div className="text-yellow-400 font-bold flex items-center gap-1">
                            <Star className="w-5 h-5 fill-yellow-400" />
                            <span className="hidden sm:inline">+10</span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
