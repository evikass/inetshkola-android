'use client'

import { useState } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { LessonTopic, TopicSection, GameLesson } from '@/data/types'
import {
  ArrowLeft, ChevronDown, ChevronRight, BookOpen, Gamepad2, Play, Star
} from 'lucide-react'
import LessonDetailModal from './LessonDetailModal'
import { generateLessonQuiz } from '@/lib/lessonQuizGenerator'

interface SelectedLesson {
  title: string
  description: string
  tasks: string[]
  image?: string
  content?: string
  examples?: string[]
  facts?: string[]
}

export default function LessonViewer() {
  const { selectedSubject, selectedClass, completeTopic, goBack, selectGameFromLesson, games: contextGames } = useSchool()
  // Одна открытая вкладка вместо Set
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState<'lessons' | 'games'>('lessons')
  
  // Для модального окна подробного урока
  const [detailLesson, setDetailLesson] = useState<SelectedLesson | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  
  const games = contextGames || []

  if (!selectedSubject) return null

  const toggleTopic = (topicName: string) => {
    // Если нажали на открытую - закрыть, иначе открыть новую (и закрыть старую)
    setExpandedTopic(expandedTopic === topicName ? null : topicName)
  }
  
  const openDetail = (lesson: SelectedLesson) => {
    setDetailLesson(lesson)
    setIsDetailOpen(true)
  }
  
  const startQuiz = (lesson: SelectedLesson) => {
    // Извлекаем тему урока из названия (например, "Урок 1: Корень слова" -> "Корень слова")
    const lessonTopic = lesson.title.includes(':')
      ? lesson.title.split(':')[1].trim()
      : lesson.title

    const lessonTopicLower = lessonTopic.toLowerCase()
    const lessonTitleLower = lesson.title.toLowerCase()
    const lessonDescLower = lesson.description.toLowerCase()

    // 1. Ищем готовую игру по точному совпадению с темой урока
    let matchingGame = games.find(g =>
      g.title.toLowerCase() === lessonTopicLower ||
      g.title.toLowerCase() === lessonTitleLower
    )

    // 2. Ищем игру, где тема урока содержится в названии игры или наоборот
    if (!matchingGame) {
      matchingGame = games.find(g => {
        const gameTitleLower = g.title.toLowerCase()
        return gameTitleLower.includes(lessonTopicLower) ||
               lessonTopicLower.includes(gameTitleLower) ||
               gameTitleLower.includes(lessonDescLower) ||
               lessonDescLower.includes(gameTitleLower)
      })
    }

    // 3. Ищем игру по теме из описания урока
    if (!matchingGame) {
      // Ключевые слова из описания для поиска игры
      const keywords = [
        'корень', 'приставка', 'суффикс', 'окончание', 'состав слова',
        'падеж', 'склонение', 'существительное', 'прилагательное', 'глагол',
        'подлежащее', 'сказуемое', 'предложение', 'части речи',
        'время глагола', 'род прилагательных'
      ]

      for (const keyword of keywords) {
        if (lessonTopicLower.includes(keyword) || lessonDescLower.includes(keyword)) {
          matchingGame = games.find(g =>
            g.title.toLowerCase().includes(keyword)
          )
          if (matchingGame) break
        }
      }
    }

    // 4. Если нашли готовую игру - используем её
    if (matchingGame) {
      selectGameFromLesson(matchingGame)
      return
    }

    // 5. Если готовой игры нет - генерируем тест по уроку
    const generatedGame = generateLessonQuiz(
      lesson.title,
      lesson.description,
      selectedSubject.title
    )

    if (generatedGame) {
      selectGameFromLesson(generatedGame)
    } else if (games.length > 0) {
      // Fallback - случайная игра по предмету
      const subjectGames = games.filter(g => g.subject === selectedSubject.title)
      if (subjectGames.length > 0) {
        selectGameFromLesson(subjectGames[Math.floor(Math.random() * subjectGames.length)])
      } else {
        selectGameFromLesson(games[Math.floor(Math.random() * games.length)])
      }
    }
  }
  
  const handleDetailComplete = () => {
    if (detailLesson) {
      completeTopic(detailLesson.title)
    }
  }

  return (
    <div className="w-full animate-fadeIn">
      {/* Back button */}
      <button
        onClick={goBack}
        className="mb-6 flex items-center gap-2 text-white/80 hover:text-white text-xl font-medium 
                   bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl transition-all"
      >
        <ArrowLeft className="w-6 h-6" /> 
        Назад к предметам
      </button>

      {/* Title */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            {selectedSubject.title}
          </h2>
          <p className="text-purple-200">
            {selectedSubject.detailedTopics?.reduce((acc, t) => 
              acc + (t.subtopics?.reduce((a, s) => a + s.lessons.length, 0) || t.lessons?.length || 0), 0
            ) || 0} уроков доступно
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setCurrentTab('lessons')}
          className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all whitespace-nowrap
            ${currentTab === 'lessons' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
        >
          📘 Уроки
        </button>
        {games.length > 0 && (
          <button
            onClick={() => setCurrentTab('games')}
            className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all whitespace-nowrap
              ${currentTab === 'games' 
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
          >
            🎮 Игры ({games.length})
          </button>
        )}
      </div>

      {/* Content */}
      {currentTab === 'lessons' && selectedSubject.detailedTopics && (
        <div className="space-y-4">
          {selectedSubject.detailedTopics.map((topicBlock: LessonTopic, topicIndex: number) => {
            const topicKey = topicBlock.topic
            const isExpanded = expandedTopic === topicKey
            const totalLessons = topicBlock.subtopics 
              ? topicBlock.subtopics.reduce((acc, st) => acc + st.lessons.length, 0)
              : (topicBlock.lessons?.length || 0)

            return (
              <div key={topicIndex} 
                   className="rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                              border-2 border-white/10">
                {/* Topic header */}
                <button
                  onClick={() => toggleTopic(topicKey)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left
                             hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 
                                    flex items-center justify-center text-white font-black text-xl">
                      {topicIndex + 1}
                    </div>
                    <div>
                      <span className="text-xl font-bold text-white">{topicBlock.topic}</span>
                      <div className="text-sm text-purple-300">{totalLessons} уроков</div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-6 h-6 text-purple-400" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-purple-400" />
                  )}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-6 bg-gray-900/30">
                    {/* Subtopics */}
                    {topicBlock.subtopics ? (
                      topicBlock.subtopics.map((subtopic: TopicSection, subtopicIndex: number) => (
                        <div key={subtopicIndex} className="mt-4">
                          <h4 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                              {subtopicIndex + 1}
                            </span>
                            {subtopic.title}
                          </h4>
                          <div className="space-y-3 pl-4">
                            {subtopic.lessons.map((lesson, lessonIndex) => (
                              <button
                                key={lessonIndex}
                                onClick={() => openDetail(lesson)}
                                className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 
                                           hover:border-purple-400/50 hover:bg-white/10
                                           transition-all text-left group cursor-pointer"
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <Star className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                                  <h5 className="text-lg font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
                                    {lesson.title}
                                  </h5>
                                </div>
                                <p className="text-gray-400 text-sm line-clamp-2 ml-8">
                                  {lesson.description}
                                </p>
                                {lesson.tasks && lesson.tasks.length > 0 && (
                                  <div className="mt-3 ml-8 flex items-center gap-2 text-purple-400 text-xs">
                                    <span>📝 {lesson.tasks.length} заданий</span>
                                    <span className="text-white/30">•</span>
                                    <span className="text-green-400">Нажмите, чтобы открыть</span>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      /* Old structure - without subtopics */
                      topicBlock.lessons?.map((lesson, lessonIndex) => (
                        <button
                          key={lessonIndex}
                          onClick={() => openDetail(lesson)}
                          className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 
                                     hover:border-purple-400/50 hover:bg-white/10
                                     transition-all text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Star className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
                              {lesson.title}
                            </h4>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2 ml-8">
                            {lesson.description}
                          </p>
                          {lesson.tasks && lesson.tasks.length > 0 && (
                            <div className="mt-3 ml-8 flex items-center gap-2 text-purple-400 text-xs">
                              <span>📝 {lesson.tasks.length} заданий</span>
                              <span className="text-white/30">•</span>
                              <span className="text-green-400">Нажмите, чтобы открыть</span>
                            </div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Games tab */}
      {currentTab === 'games' && games.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {games.map((game: GameLesson, index: number) => (
            <button
              key={index}
              onClick={() => selectGameFromLesson(game)}
              className="p-6 rounded-3xl bg-gradient-to-br from-purple-600/50 to-pink-600/50 
                         border-2 border-white/20 hover:border-white/40
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
      )}
      
      {/* Модальное окно урока */}
      <LessonDetailModal
        lesson={detailLesson}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onComplete={handleDetailComplete}
        onStartQuiz={detailLesson ? () => startQuiz(detailLesson) : undefined}
      />
    </div>
  )
}
