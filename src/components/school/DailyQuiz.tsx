'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Brain, Sparkles, Trophy, X, Clock, Star, ChevronRight, Zap } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

// Вопросы для ежедневной викторины (разные предметы)
const quizQuestions = [
  // Математика
  { id: 1, question: "Сколько будет 15 + 27?", options: ["42", "41", "43", "40"], correct: 0, subject: "Математика", difficulty: 1 },
  { id: 2, question: "Какое число идёт после 99?", options: ["100", "101", "98", "110"], correct: 0, subject: "Математика", difficulty: 1 },
  { id: 3, question: "Сколько минут в часе?", options: ["60", "100", "24", "30"], correct: 0, subject: "Математика", difficulty: 1 },
  { id: 4, question: "Чему равно 8 × 7?", options: ["54", "56", "48", "64"], correct: 1, subject: "Математика", difficulty: 2 },
  { id: 5, question: "Какой результат деления 81 на 9?", options: ["8", "10", "9", "7"], correct: 2, subject: "Математика", difficulty: 2 },
  
  // Русский язык
  { id: 6, question: "Сколько букв в русском алфавите?", options: ["30", "33", "32", "31"], correct: 1, subject: "Русский язык", difficulty: 1 },
  { id: 7, question: "Какая часть речи обозначает действие?", options: ["Существительное", "Прилагательное", "Глагол", "Наречие"], correct: 2, subject: "Русский язык", difficulty: 1 },
  { id: 8, question: "Как пишется: жи-ши?", options: ["С буквой ы", "С буквой и", "Через ъ", "Через ь"], correct: 1, subject: "Русский язык", difficulty: 1 },
  { id: 9, question: "Какой падеж отвечает на вопрос 'кого, чего?'", options: ["Именительный", "Родительный", "Дательный", "Винительный"], correct: 1, subject: "Русский язык", difficulty: 2 },
  { id: 10, question: "Сколько падежей в русском языке?", options: ["5", "6", "7", "8"], correct: 1, subject: "Русский язык", difficulty: 2 },
  
  // Окружающий мир
  { id: 11, question: "Какое время года идёт после зимы?", options: ["Лето", "Осень", "Весна", "Зима"], correct: 2, subject: "Окружающий мир", difficulty: 1 },
  { id: 12, question: "Сколько планет в Солнечной системе?", options: ["8", "9", "7", "10"], correct: 0, subject: "Окружающий мир", difficulty: 1 },
  { id: 13, question: "Какое животное является символом России?", options: ["Тигр", "Медведь", "Орёл", "Волк"], correct: 1, subject: "Окружающий мир", difficulty: 1 },
  { id: 14, question: "Какой океан самый большой?", options: ["Атлантический", "Индийский", "Тихий", "Северный Ледовитый"], correct: 2, subject: "Окружающий мир", difficulty: 2 },
  { id: 15, question: "Сколько материков на Земле?", options: ["5", "6", "7", "8"], correct: 1, subject: "Окружающий мир", difficulty: 2 },
  
  // История
  { id: 16, question: "В каком году была Куликовская битва?", options: ["988", "1380", "1812", "1147"], correct: 1, subject: "История", difficulty: 3 },
  { id: 17, question: "Кто крестил Русь?", options: ["Пётр I", "Иван Грозный", "Князь Владимир", "Ярослав Мудрый"], correct: 2, subject: "История", difficulty: 2 },
  { id: 18, question: "Как называется древнее государство славян?", options: ["Россия", "Древняя Русь", "СССР", "Московское царство"], correct: 1, subject: "История", difficulty: 2 },
  
  // Биология
  { id: 19, question: "Какой орган перекачивает кровь?", options: ["Лёгкие", "Желудок", "Сердце", "Печень"], correct: 2, subject: "Биология", difficulty: 1 },
  { id: 20, question: "Что необходимо растениям для фотосинтеза?", options: ["Кислород", "Свет", "Азот", "Водород"], correct: 1, subject: "Биология", difficulty: 2 },
  
  // География
  { id: 21, question: "Столица России?", options: ["Санкт-Петербург", "Москва", "Казань", "Новосибирск"], correct: 1, subject: "География", difficulty: 1 },
  { id: 22, question: "Самая длинная река в России?", options: ["Волга", "Енисей", "Обь", "Лена"], correct: 3, subject: "География", difficulty: 3 },
  { id: 23, question: "Какое море омывает Россию с юга?", options: ["Баренцево", "Чёрное", "Балтийское", "Охотское"], correct: 1, subject: "География", difficulty: 2 },
  
  // Литература
  { id: 24, question: "Кто написал 'Сказку о рыбаке и рыбке'?", options: ["Толстой", "Пушкин", "Чехов", "Гоголь"], correct: 1, subject: "Литература", difficulty: 2 },
  { id: 25, question: "Кто автор басни 'Ворона и Лисица'?", options: ["Пушкин", "Крылов", "Есенин", "Тютчев"], correct: 1, subject: "Литература", difficulty: 2 },
]

export default function DailyQuiz() {
  const { addPoints, addStars, selectedGrade } = useSchool()
  const [isOpen, setIsOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [answeredToday, setAnsweredToday] = useState(() => {
    if (typeof window === 'undefined') return false
    const lastAnswerDate = localStorage.getItem('lastQuizDate')
    return lastAnswerDate === new Date().toDateString()
  })
  
  // Получаем вопрос дня на основе даты
  const todayQuestion = useMemo(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const grade = selectedGrade || 1
    // Фильтруем по сложности в зависимости от класса
    const maxDifficulty = grade <= 2 ? 1 : grade <= 4 ? 2 : 3
    const filtered = quizQuestions.filter(q => q.difficulty <= maxDifficulty)
    return filtered[dayOfYear % filtered.length]
  }, [selectedGrade])

  const handleAnswer = useCallback((answerIndex: number) => {
    if (showResult) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const isCorrect = answerIndex === todayQuestion.correct
    if (isCorrect) {
      setScore(s => s + todayQuestion.difficulty * 10)
      addPoints(todayQuestion.difficulty * 5)
      addStars(1)
    }
    
    setTimeout(() => {
      localStorage.setItem('lastQuizDate', new Date().toDateString())
      setAnsweredToday(true)
      setIsComplete(true)
    }, 2000)
  }, [showResult, todayQuestion, addPoints, addStars])
  
  // Таймер
  useEffect(() => {
    if (isOpen && !showResult && !isComplete && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      // Используем setTimeout для отложенного вызова
      const timer = setTimeout(() => handleAnswer(-1), 0)
      return () => clearTimeout(timer)
    }
  }, [isOpen, showResult, isComplete, timeLeft, handleAnswer])
  
  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsComplete(false)
    setTimeLeft(15)
  }
  
  if (!isOpen && answeredToday) return null
  
  return (
    <>
      {/* Кнопка открытия */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40
                     bg-gradient-to-r from-violet-500 to-purple-600
                     p-4 rounded-full shadow-lg shadow-purple-500/30
                     border-2 border-white/20 group"
        >
          <Brain className="w-6 h-6 text-white" />
          <span className="absolute -right-2 -top-2 bg-yellow-400 text-purple-900 
                          text-xs font-bold px-2 py-1 rounded-full animate-bounce">
            +{todayQuestion.difficulty * 5} XP
          </span>
          <span className="absolute left-full ml-3 bg-gray-900/90 text-white 
                          px-3 py-2 rounded-lg text-sm whitespace-nowrap
                          opacity-0 group-hover:opacity-100 transition-opacity">
            Викторина дня!
          </span>
        </motion.button>
      )}
      
      {/* Модальное окно */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4
                       bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-gradient-to-br from-violet-900 to-indigo-900
                         rounded-3xl p-6 max-w-lg w-full shadow-2xl
                         border-2 border-white/10"
            >
              {/* Заголовок */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-500/30 rounded-xl">
                    <Brain className="w-6 h-6 text-violet-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Викторина дня</h3>
                    <p className="text-violet-300 text-sm">{todayQuestion.subject}</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Таймер */}
              {!isComplete && (
                <div className="flex items-center gap-2 mb-4">
                  <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white/50'}`} />
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${timeLeft <= 5 ? 'bg-red-500' : 'bg-violet-500'}`}
                      initial={{ width: '100%' }}
                      animate={{ width: `${(timeLeft / 15) * 100}%` }}
                    />
                  </div>
                  <span className={`font-mono ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>
                    {timeLeft}с
                  </span>
                </div>
              )}
              
              {/* Контент */}
              {!isComplete ? (
                <>
                  {/* Вопрос */}
                  <div className="bg-white/5 rounded-2xl p-4 mb-6">
                    <p className="text-white text-lg font-medium text-center">
                      {todayQuestion.question}
                    </p>
                  </div>
                  
                  {/* Варианты ответов */}
                  <div className="grid grid-cols-2 gap-3">
                    {todayQuestion.options.map((option, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: showResult ? 1 : 1.02 }}
                        whileTap={{ scale: showResult ? 1 : 0.98 }}
                        onClick={() => handleAnswer(idx)}
                        disabled={showResult}
                        className={`p-4 rounded-xl text-left font-medium transition-all
                                   ${showResult 
                                     ? idx === todayQuestion.correct
                                       ? 'bg-green-500 text-white'
                                       : idx === selectedAnswer
                                         ? 'bg-red-500/50 text-white'
                                         : 'bg-white/5 text-white/50'
                                     : 'bg-white/10 text-white hover:bg-white/20'
                                   }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {option}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Результат ответа */}
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-3 rounded-xl text-center
                                 ${selectedAnswer === todayQuestion.correct
                                   ? 'bg-green-500/20 border border-green-500/30'
                                   : 'bg-red-500/20 border border-red-500/30'
                                 }`}
                    >
                      {selectedAnswer === todayQuestion.correct ? (
                        <span className="text-green-300 flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Правильно! +{todayQuestion.difficulty * 5} XP
                        </span>
                      ) : selectedAnswer === -1 ? (
                        <span className="text-red-300">Время вышло!</span>
                      ) : (
                        <span className="text-red-300">
                          Неверно. Правильный ответ: {todayQuestion.options[todayQuestion.correct]}
                        </span>
                      )}
                    </motion.div>
                  )}
                </>
              ) : (
                /* Завершение */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block"
                  >
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {selectedAnswer === todayQuestion.correct ? 'Отлично!' : 'Попробуй завтра!'}
                  </h4>
                  <p className="text-violet-300 mb-4">
                    {selectedAnswer === todayQuestion.correct 
                      ? `Ты заработал ${todayQuestion.difficulty * 5} XP и 1 звезду!`
                      : 'Заходи завтра за новой викториной!'
                    }
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Zap className="w-5 h-5" />
                      <span>{todayQuestion.difficulty * 5} XP</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-400">
                      <Star className="w-5 h-5" />
                      <span>{selectedAnswer === todayQuestion.correct ? 1 : 0}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 px-6 py-3 bg-violet-500 hover:bg-violet-600
                              text-white rounded-xl font-medium transition-colors"
                  >
                    Закрыть
                  </button>
                </motion.div>
              )}
              
              {/* Сложность */}
              {!isComplete && (
                <div className="flex items-center gap-1 mt-4 justify-center">
                  {[1, 2, 3].map(level => (
                    <Star
                      key={level}
                      className={`w-4 h-4 ${
                        level <= todayQuestion.difficulty
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                  <span className="text-white/50 text-sm ml-2">
                    Сложность: {todayQuestion.difficulty}/3
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
