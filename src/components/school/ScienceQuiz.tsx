'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Trophy, Star, Zap, RotateCcw, Atom } from 'lucide-react'

interface ScienceQuestion {
  question: string
  answer: string
  options: string[]
  explanation: string
  category: string
}

const scienceQuestions: ScienceQuestion[] = [
  // Физика
  { question: 'Какая частица имеет положительный заряд?', answer: 'Протон', options: ['Электрон', 'Протон', 'Нейтрон', 'Фотон'], explanation: 'Протоны находятся в ядре и имеют заряд +1', category: 'Физика' },
  { question: 'Какая частица не имеет заряда?', answer: 'Нейтрон', options: ['Электрон', 'Протон', 'Нейтрон', 'Позитрон'], explanation: 'Нейтроны электрически нейтральны', category: 'Физика' },
  { question: 'Что измеряется в Ньютонах?', answer: 'Сила', options: ['Масса', 'Сила', 'Энергия', 'Работа'], explanation: '1 Ньютон = 1 кг·м/с²', category: 'Физика' },
  { question: 'Какая энергия у движущегося тела?', answer: 'Кинетическая', options: ['Потенциальная', 'Кинетическая', 'Тепловая', 'Ядерная'], explanation: 'Eк = mv²/2 — энергия движения', category: 'Физика' },
  { question: 'Что такое звук?', answer: 'Волна', options: ['Частица', 'Волна', 'Поток', 'Излучение'], explanation: 'Звук — механическая волна в среде', category: 'Физика' },
  { question: 'Скорость света в вакууме?', answer: '300 000 км/с', options: ['150 000 км/с', '300 000 км/с', '500 000 км/с', '1 000 000 км/с'], explanation: 'Точно: 299 792 458 м/с', category: 'Физика' },
  
  // Химия
  { question: 'Какой элемент самый лёгкий?', answer: 'Водород', options: ['Гелий', 'Водород', 'Литий', 'Кислород'], explanation: 'Водород (H) имеет атомную массу ~1', category: 'Химия' },
  { question: 'Формула воды?', answer: 'H₂O', options: ['H₂O', 'CO₂', 'NaCl', 'O₂'], explanation: 'Вода = 2 атома водорода + 1 кислорода', category: 'Химия' },
  { question: 'Какой газ мы выдыхаем?', answer: 'Углекислый газ', options: ['Кислород', 'Азот', 'Углекислый газ', 'Водород'], explanation: 'CO₂ — продукт дыхания', category: 'Химия' },
  { question: 'Какой элемент в таблице под номером 6?', answer: 'Углерод', options: ['Азот', 'Углерод', 'Кислород', 'Бор'], explanation: 'Углерод (C) — основа органики', category: 'Химия' },
  { question: 'Что такое pH?', answer: 'Кислотность', options: ['Температура', 'Кислотность', 'Плотность', 'Давление'], explanation: 'pH < 7 — кислота, pH > 7 — щёлочь', category: 'Химия' },
  { question: 'Какой металл жидкий?', answer: 'Ртуть', options: ['Железо', 'Ртуть', 'Золото', 'Свинец'], explanation: 'Ртуть плавится при -39°C', category: 'Химия' },
  
  // Биология
  { question: 'Какой орган качает кровь?', answer: 'Сердце', options: ['Лёгкие', 'Сердце', 'Печень', 'Почки'], explanation: 'Сердце — главный насос организма', category: 'Биология' },
  { question: 'Что содержит ДНК?', answer: 'Гены', options: ['Белки', 'Гены', 'Жиры', 'Углеводы'], explanation: 'ДНК хранит генетическую информацию', category: 'Биология' },
  { question: 'Какой орган очищает кровь?', answer: 'Почки', options: ['Сердце', 'Лёгкие', 'Почки', 'Печень'], explanation: 'Почки фильтруют кровь от токсинов', category: 'Биология' },
  { question: 'Сколько хромосом у человека?', answer: '46', options: ['23', '46', '48', '52'], explanation: '23 пары хромосом = 46', category: 'Биология' },
  { question: 'Где происходит фотосинтез?', answer: 'Хлоропласты', options: ['Митохондрии', 'Хлоропласты', 'Ядро', 'Рибосомы'], explanation: 'Хлоропласты содержат хлорофилл', category: 'Биология' },
  { question: 'Какая клетка — "энергетическая станция"?', answer: 'Митохондрия', options: ['Рибосома', 'Митохондрия', 'Ядро', 'Лизосома'], explanation: 'Митохондрии производят АТФ', category: 'Биология' },
  
  // Астрономия
  { question: 'Какая планета самая большая?', answer: 'Юпитер', options: ['Земля', 'Юпитер', 'Сатурн', 'Нептун'], explanation: 'Юпитер в 11 раз больше Земли', category: 'Астрономия' },
  { question: 'Что такое Солнце?', answer: 'Звезда', options: ['Планета', 'Звезда', 'Спутник', 'Астероид'], explanation: 'Солнце — звезда, источник энергии', category: 'Астрономия' },
  { question: 'Какая планета красная?', answer: 'Марс', options: ['Венера', 'Марс', 'Юпитер', 'Меркурий'], explanation: 'Оксид железа даёт красный цвет', category: 'Астрономия' },
  { question: 'Что такое галактика?', answer: 'Скопление звёзд', options: ['Планета', 'Скопление звёзд', 'Туманность', 'Чёрная дыра'], explanation: 'Млечный Путь — наша галактика', category: 'Астрономия' },
  
  // Наука и учёные
  { question: 'Кто открыл закон всемирного тяготения?', answer: 'Ньютон', options: ['Эйнштейн', 'Ньютон', 'Галилей', 'Коперник'], explanation: 'Исаак Ньютон, 1687 год', category: 'Учёные' },
  { question: 'Кто предложил теорию относительности?', answer: 'Эйнштейн', options: ['Ньютон', 'Эйнштейн', 'Бор', 'Фарадей'], explanation: 'Альберт Эйнштейн, 1905 и 1915', category: 'Учёные' },
  { question: 'Кто изобрёл электрическую лампу?', answer: 'Эдисон', options: ['Тесла', 'Эдисон', 'Фарадей', 'Вольт'], explanation: 'Томас Эдисон, 1879 год', category: 'Учёные' },
  { question: 'Кто первым наблюдал микробы?', answer: 'Левенгук', options: ['Пастер', 'Левенгук', 'Кох', 'Дженнер'], explanation: 'Антони ван Левенгук, микроскоп', category: 'Учёные' },
]

type Difficulty = 'easy' | 'medium' | 'hard'

export default function ScienceQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentQuestion, setCurrentQuestion] = useState<ScienceQuestion | null>(null)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())

  const getQuestions = useCallback((diff: Difficulty) => {
    const categories = diff === 'easy'
      ? ['Физика', 'Химия']
      : diff === 'medium'
      ? ['Физика', 'Химия', 'Биология']
      : ['Физика', 'Химия', 'Биология', 'Астрономия', 'Учёные']
    return scienceQuestions.filter(q => categories.includes(q.category))
  }, [])

  const generateQuestion = useCallback(() => {
    const available = getQuestions(difficulty).filter((_, index) => !usedQuestions.has(index))
    if (available.length === 0) { setUsedQuestions(new Set()); return }
    const randomIndex = Math.floor(Math.random() * available.length)
    const q = available[randomIndex]
    const globalIndex = scienceQuestions.indexOf(q)
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
      <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-6 border border-violet-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔬</div>
          <h2 className="text-2xl font-bold text-violet-300">Наука</h2>
          <p className="text-violet-200/70 text-sm mt-1">Физика, химия, биология</p>
        </div>
        <div className="grid gap-3 max-w-xs mx-auto">
          <button onClick={() => startGame('easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
            <div className="font-bold text-green-300">🟢 Легко</div>
            <div className="text-xs text-green-200/70">Физика и химия</div>
          </button>
          <button onClick={() => startGame('medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
            <div className="font-bold text-yellow-300">🟡 Средне</div>
            <div className="text-xs text-yellow-200/70">+ Биология</div>
          </button>
          <button onClick={() => startGame('hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
            <div className="font-bold text-red-300">🔴 Сложно</div>
            <div className="text-xs text-red-200/70">+ Астрономия и учёные</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-6 border border-violet-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-violet-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Atom className="w-8 h-8 mx-auto text-violet-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-violet-500/30 hover:bg-violet-500/40 rounded-xl text-violet-300 font-bold transition-all">Играть снова</button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-6 border border-violet-400/30">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-violet-300 font-bold">{question}/10</span>
          <span className="text-purple-300 text-sm">{currentQuestion?.category}</span>
        </div>
        {streak > 1 && <span className="text-orange-400 text-sm flex items-center gap-1"><Zap className="w-4 h-4" /> {streak}</span>}
      </div>
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-violet-400 to-purple-400 transition-all" style={{ width: `${(question / 10) * 100}%` }} />
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
