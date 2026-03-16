'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Trophy, Star, Zap, RotateCcw, History } from 'lucide-react'

interface HistoryQuestion {
  question: string
  answer: string
  options: string[]
  explanation: string
  era: string
}

const historyQuestions: HistoryQuestion[] = [
  // Древняя Русь
  { question: 'Кто основал Москву?', answer: 'Юрий Долгорукий', options: ['Иван Калита', 'Юрий Долгорукий', 'Дмитрий Донской', 'Александр Невский'], explanation: 'Первое упоминание Москвы — 1147 год, Юрий Долгорукий', era: 'Древняя Русь' },
  { question: 'В каком году Крещение Руси?', answer: '988', options: ['988', '1000', '862', '1054'], explanation: 'Князь Владимир крестил Русь в 988 году', era: 'Древняя Русь' },
  { question: 'Кто написал "Повесть временных лет"?', answer: 'Нестор', options: ['Илларион', 'Нестор', 'Сильвестр', 'Кирилл'], explanation: 'Монах Нестор написал летопись в начале XII века', era: 'Древняя Русь' },
  { question: 'Какой город был столицей Древней Руси?', answer: 'Киев', options: ['Москва', 'Киев', 'Новгород', 'Владимир'], explanation: 'Киев был столицей до монгольского нашествия', era: 'Древняя Русь' },
  { question: 'Кто победил на Куликовом поле?', answer: 'Дмитрий Донской', options: ['Иван Калита', 'Дмитрий Донской', 'Александр Невский', 'Иван III'], explanation: 'Битва состоялась 8 сентября 1380 года', era: 'Древняя Русь' },
  
  // Российская империя
  { question: 'Кто основал Санкт-Петербург?', answer: 'Пётр I', options: ['Екатерина II', 'Пётр I', 'Александр I', 'Николай I'], explanation: 'Санкт-Петербург основан в 1703 году', era: 'Империя' },
  { question: 'В каком году отменили крепостное право?', answer: '1861', options: ['1801', '1861', '1905', '1917'], explanation: 'Александр II отменил крепостное право 19 февраля 1861', era: 'Империя' },
  { question: 'Кто правил дольше всех в России?', answer: 'Екатерина II', options: ['Пётр I', 'Екатерина II', 'Александр I', 'Николай I'], explanation: 'Екатерина II правила 34 года (1762-1796)', era: 'Империя' },
  { question: 'Какая война была в 1812 году?', answer: 'Отечественная', options: ['Крымская', 'Отечественная', 'Русско-японская', 'Первая мировая'], explanation: 'Наполеон вторгся в Россию в июне 1812', era: 'Империя' },
  { question: 'Кто командовал русской армией в 1812?', answer: 'Кутузов', options: ['Суворов', 'Кутузов', 'Багратион', 'Барклай'], explanation: 'Михаил Кутузов — главнокомандующий', era: 'Империя' },
  
  // XX век
  { question: 'В каком году была революция?', answer: '1917', options: ['1905', '1917', '1924', '1941'], explanation: 'Февральская и Октябрьская революции 1917', era: 'XX век' },
  { question: 'Когда началась Великая Отечественная?', answer: '22 июня 1941', options: ['1 сентября 1939', '22 июня 1941', '9 мая 1945', '7 ноября 1917'], explanation: 'Германия напала на СССР 22 июня 1941', era: 'XX век' },
  { question: 'Когда День Победы?', answer: '9 мая', options: ['8 мая', '9 мая', '1 мая', '7 ноября'], explanation: 'Капитуляция Германии — 8 мая, в Москве — 9 мая 1945', era: 'XX век' },
  { question: 'Кто первым полетел в космос?', answer: 'Юрий Гагарин', options: ['Алексей Леонов', 'Юрий Гагарин', 'Герман Титов', 'Валентина Терешкова'], explanation: '12 апреля 1961 года на корабле "Восток"', era: 'XX век' },
  { question: 'Какое событие было в 1961?', answer: 'Полёт Гагарина', options: ['Полёт Гагарина', 'Запуск Спутника', 'Выход в космос', 'Строительство МКС'], explanation: 'Юрий Гагарин — первый человек в космосе', era: 'XX век' },
  
  // Великие люди
  { question: 'Кто написал "Войну и мир"?', answer: 'Лев Толстой', options: ['Достоевский', 'Лев Толстой', 'Тургенев', 'Чехов'], explanation: 'Роман написан в 1863-1869 годах', era: 'Люди' },
  { question: 'Кто автор картины "Чёрный квадрат"?', answer: 'Малевич', options: ['Кандинский', 'Малевич', 'Шагал', 'Петров-Водкин'], explanation: 'Казимир Малевич создал картину в 1915', era: 'Люди' },
  { question: 'Кто открыл периодическую таблицу?', answer: 'Менделеев', options: ['Ломоносов', 'Менделеев', 'Павлов', 'Курчатов'], explanation: 'Дмитрий Менделеев создал таблицу в 1869', era: 'Люди' },
  { question: 'Кто основал первый университет?', answer: 'Ломоносов', options: ['Ломоносов', 'Петр I', 'Екатерина II', 'Александр I'], explanation: 'Московский университет основан в 1755', era: 'Люди' },
  { question: 'Кто автор музыки гимна России?', answer: 'Александров', options: ['Глинка', 'Александров', 'Чайковский', 'Рахманинов'], explanation: 'Александр Александров написал музыку', era: 'Люди' },
  
  // Достижения
  { question: 'Какой город основан в 1703?', answer: 'Санкт-Петербург', options: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Казань'], explanation: 'Пётр I основал город на Неве', era: 'События' },
  { question: 'Когда запустили первый спутник?', answer: '1957', options: ['1957', '1961', '1965', '1970'], explanation: '4 октября 1957 года — Спутник-1', era: 'События' },
  { question: 'Кто первым вышел в открытый космос?', answer: 'Алексей Леонов', options: ['Юрий Гагарин', 'Алексей Леонов', 'Нил Армстронг', 'Герман Титов'], explanation: '18 марта 1965 года, длительность 12 минут', era: 'События' },
  { question: 'Когда были Олимпиада в Москве?', answer: '1980', options: ['1970', '1980', '1990', '2014'], explanation: 'XXII летние Олимпийские игры', era: 'События' },
]

type Difficulty = 'easy' | 'medium' | 'hard'

export default function HistoryQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentQuestion, setCurrentQuestion] = useState<HistoryQuestion | null>(null)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())

  const getQuestions = useCallback((diff: Difficulty) => {
    const eras = diff === 'easy'
      ? ['Древняя Русь', 'XX век']
      : diff === 'medium'
      ? ['Древняя Русь', 'Империя', 'XX век']
      : ['Древняя Русь', 'Империя', 'XX век', 'Люди', 'События']
    return historyQuestions.filter(q => eras.includes(q.era))
  }, [])

  const generateQuestion = useCallback(() => {
    const available = getQuestions(difficulty).filter((_, index) => !usedQuestions.has(index))
    if (available.length === 0) { setUsedQuestions(new Set()); return }
    const randomIndex = Math.floor(Math.random() * available.length)
    const q = available[randomIndex]
    const globalIndex = historyQuestions.indexOf(q)
    setCurrentQuestion(q)
    setUsedQuestions(prev => new Set(prev).add(globalIndex))
  }, [difficulty, usedQuestions, getQuestions])

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff)
    setScore(0)
    setQuestion(1)
    setCorrectAnswers(0)
    setStreak(0)
    setUsedQuestions(new Set())
    setGameState('playing')
    generateQuestion()
  }, [generateQuestion])

  const handleAnswer = (answer: string) => {
    if (showFeedback || !currentQuestion) return
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.answer
    if (isCorrect) {
      playSound('success')
      const xpGain = 10 + streak * 3
      addXP(xpGain)
      setScore(prev => prev + xpGain)
      setCorrectAnswers(prev => prev + 1)
      setStreak(prev => prev + 1)
      setShowFeedback('correct')
    } else {
      playSound('error')
      setStreak(0)
      setShowFeedback('wrong')
    }
    setTimeout(() => nextQuestion(), 2000)
  }

  const nextQuestion = useCallback(() => {
    setShowFeedback(null)
    setSelectedAnswer(null)
    if (question >= 10) setGameState('result')
    else { setQuestion(prev => prev + 1); generateQuestion() }
  }, [question, generateQuestion])

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-6 border border-amber-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📜</div>
          <h2 className="text-2xl font-bold text-amber-300">История России</h2>
          <p className="text-amber-200/70 text-sm mt-1">Важные события и люди</p>
        </div>
        <div className="grid gap-3 max-w-xs mx-auto">
          <button onClick={() => startGame('easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
            <div className="font-bold text-green-300">🟢 Легко</div>
            <div className="text-xs text-green-200/70">Древняя Русь и XX век</div>
          </button>
          <button onClick={() => startGame('medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
            <div className="font-bold text-yellow-300">🟡 Средне</div>
            <div className="text-xs text-yellow-200/70">+ Российская империя</div>
          </button>
          <button onClick={() => startGame('hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
            <div className="font-bold text-red-300">🔴 Сложно</div>
            <div className="text-xs text-red-200/70">+ Великие люди и события</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-6 border border-amber-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-amber-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <History className="w-8 h-8 mx-auto text-amber-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-amber-500/30 hover:bg-amber-500/40 rounded-xl text-amber-300 font-bold transition-all">Играть снова</button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-6 border border-amber-400/30">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-amber-300 font-bold">{question}/10</span>
          <span className="text-orange-300 text-sm">{currentQuestion?.era}</span>
        </div>
        {streak > 1 && <span className="text-orange-400 text-sm flex items-center gap-1"><Zap className="w-4 h-4" /> {streak}</span>}
      </div>
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all" style={{ width: `${(question / 10) * 100}%` }} />
      </div>
      <div className="text-center mb-6">
        <p className="text-xl text-white font-medium">{currentQuestion?.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {currentQuestion?.options.map((option, index) => {
          let bgClass = 'bg-white/10 hover:bg-white/20'
          if (showFeedback && currentQuestion) {
            if (option === currentQuestion.answer) bgClass = 'bg-green-500/40'
            else if (option === selectedAnswer && option !== currentQuestion.answer) bgClass = 'bg-red-500/40'
          }
          return (
            <button key={index} onClick={() => handleAnswer(option)} disabled={showFeedback !== null} className={`p-4 rounded-xl text-white font-medium transition-all ${bgClass}`}>{option}</button>
          )
        })}
      </div>
      {showFeedback && currentQuestion && (
        <div className={`text-center py-3 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <span className="text-2xl">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <p className={`font-medium mt-1 ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>{showFeedback === 'correct' ? 'Правильно!' : `Ответ: ${currentQuestion.answer}`}</p>
          <p className="text-white/60 text-sm mt-1">{currentQuestion.explanation}</p>
        </div>
      )}
      <button onClick={() => { playSound('click'); nextQuestion() }} disabled={showFeedback !== null} className="w-full mt-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50">
        <RotateCcw className="w-4 h-4" /> Пропустить
      </button>
    </div>
  )
}
