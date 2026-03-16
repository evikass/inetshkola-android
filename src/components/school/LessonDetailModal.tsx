'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, BookOpen, Star, CheckCircle, 
  Lightbulb, Target, Clock, Award, Gamepad2, Atom
} from 'lucide-react'
import LessonContent from './LessonContent'
import LessonAnimatedSVG from './LessonAnimatedSVG'
import PeriodicTable from './PeriodicTable'

interface LessonDetail {
  title: string
  description: string
  tasks: string[]
  theory?: string
  examples?: string[]
  keyPoints?: string[]
  image?: string
  content?: string
  facts?: string[]
}

interface Props {
  lesson: LessonDetail | null
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  onStartQuiz?: () => void // Новый callback для запуска теста
}

export default function LessonDetailModal({ lesson, isOpen, onClose, onComplete, onStartQuiz }: Props) {
  const [currentSection, setCurrentSection] = useState(0)
  const [showPeriodicTable, setShowPeriodicTable] = useState(false)
  
  // Определяем, нужно ли показывать кнопку таблицы Менделеева
  const isChemistryOrPhysics = lesson && (
    lesson.title.toLowerCase().includes('химия') ||
    lesson.title.toLowerCase().includes('хими') ||
    lesson.title.toLowerCase().includes('физика') ||
    lesson.title.toLowerCase().includes('физик') ||
    lesson.title.toLowerCase().includes('атом') ||
    lesson.title.toLowerCase().includes('элемент') ||
    lesson.title.toLowerCase().includes('веществ') ||
    lesson.title.toLowerCase().includes('молекул') ||
    lesson.title.toLowerCase().includes('реакц') ||
    lesson.title.toLowerCase().includes('периодическ') ||
    lesson.title.toLowerCase().includes('металл') ||
    lesson.title.toLowerCase().includes('механич') ||
    lesson.title.toLowerCase().includes('энерг') ||
    lesson.title.toLowerCase().includes('закон')
  )
  
  if (!lesson) return null
  
  const sections = [
    { title: 'Теория', icon: BookOpen, content: lesson.theory || lesson.description },
    { title: 'Ключевые моменты', icon: Lightbulb, content: lesson.keyPoints || [] },
    { title: 'Примеры', icon: Target, content: lesson.examples || [] },
    { title: 'Задания', icon: CheckCircle, content: lesson.tasks }
  ]
  
  const currentContent = sections[currentSection]
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4
                     bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-gradient-to-br from-indigo-900 to-purple-900
                       rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden
                       shadow-2xl border-2 border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/30 rounded-xl">
                    <BookOpen className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                    <p className="text-purple-300 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      ~15 минут
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isChemistryOrPhysics && (
                    <button 
                      onClick={() => setShowPeriodicTable(true)}
                      className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl transition-all"
                      title="Таблица Менделеева"
                    >
                      <Atom className="w-6 h-6 text-white" />
                    </button>
                  )}
                  <button onClick={onClose} className="text-white/50 hover:text-white p-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {sections.map((section, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSection(idx)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap
                              ${currentSection === idx
                                ? 'bg-purple-500 text-white'
                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                              }`}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                {currentSection === 0 && (
                  <div className="space-y-4">
                    {/* Анимированный SVG для урока */}
                    <div className="flex justify-center mb-4">
                      <LessonAnimatedSVG 
                        lessonTitle={lesson.title} 
                        subject=""
                        size="medium" 
                      />
                    </div>
                    
                    {/* Изображение урока */}
                    {lesson.image && (
                      <div className="relative rounded-2xl overflow-hidden border-2 border-purple-400/30 mb-4 shadow-lg">
                        <img 
                          src={lesson.image} 
                          alt={lesson.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                      <LessonContent content={lesson.content || (currentContent.content as string)} />
                    </div>
                    
                    {/* Интересные факты */}
                    {lesson.facts && lesson.facts.length > 0 && (
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-cyan-400 mb-3">
                          <Star className="w-5 h-5" />
                          <span className="font-medium">Интересные факты</span>
                        </div>
                        <ul className="space-y-2">
                          {lesson.facts.map((fact, idx) => (
                            <li key={idx} className="text-cyan-200/80 text-sm flex items-start gap-2">
                              <span className="text-cyan-400">•</span>
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Советы */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-yellow-400 mb-2">
                        <Lightbulb className="w-5 h-5" />
                        <span className="font-medium">Совет</span>
                      </div>
                      <p className="text-yellow-200/80 text-sm">
                        Внимательно прочитай теорию и попробуй пересказать её своими словами. 
                        Это поможет лучше запомнить материал!
                      </p>
                    </div>
                  </div>
                )}
                
                {currentSection === 1 && (
                  <div className="space-y-3">
                    {(currentContent.content as string[]).length > 0 ? (
                      (currentContent.content as string[]).map((point: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"
                        >
                          <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-purple-300 font-bold">{idx + 1}</span>
                          </div>
                          <p className="text-gray-200">{point}</p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-white/50">
                        <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>Ключевые моменты будут добавлены позже</p>
                      </div>
                    )}
                  </div>
                )}
                
                {currentSection === 2 && (
                  <div className="space-y-4">
                    {(currentContent.content as string[]).length > 0 ? (
                      (currentContent.content as string[]).map((example: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                     rounded-xl p-4 border border-blue-500/30"
                        >
                          <div className="flex items-center gap-2 text-blue-400 mb-2">
                            <Target className="w-4 h-4" />
                            <span className="font-medium">Пример {idx + 1}</span>
                          </div>
                          <p className="text-gray-200">{example}</p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-white/50">
                        <Target className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>Примеры будут добавлены позже</p>
                      </div>
                    )}
                  </div>
                )}
                
                {currentSection === 3 && (
                  <div className="space-y-3">
                    {(currentContent.content as string[]).map((task: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 rounded-xl p-4 
                                   border border-white/10 hover:border-green-500/50 
                                   transition-colors cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0
                                        group-hover:bg-green-500 transition-colors">
                          <CheckCircle className="w-5 h-5 text-green-400 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-gray-200 group-hover:text-white transition-colors">{task}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 
                            text-white rounded-xl font-medium transition-colors"
                >
                  Закрыть
                </button>
                {onStartQuiz && (
                  <button
                    onClick={() => {
                      onClose()
                      onStartQuiz()
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                              hover:from-purple-600 hover:to-pink-600
                              text-white rounded-xl font-medium transition-colors
                              flex items-center justify-center gap-2"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    Тест
                  </button>
                )}
                <button
                  onClick={() => {
                    onComplete()
                    onClose()
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 
                            hover:from-green-600 hover:to-emerald-600
                            text-white rounded-xl font-medium transition-colors
                            flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Пройдено!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Periodic Table Modal */}
      <AnimatePresence>
        {showPeriodicTable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-7xl my-8"
            >
              <PeriodicTable onClose={() => setShowPeriodicTable(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}
