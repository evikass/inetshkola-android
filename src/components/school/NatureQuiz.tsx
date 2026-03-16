'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { Trophy, Star, Zap, RotateCcw, Leaf } from 'lucide-react'

interface NatureQuestion {
  question: string
  answer: string
  options: string[]
  explanation: string
  category: string
}

const natureQuestions: NatureQuestion[] = [
  // Животные
  { question: 'Какое животное самое быстрое?', answer: 'Гепард', options: ['Лев', 'Гепард', 'Тигр', 'Леопард'], explanation: 'Гепард может развивать скорость до 120 км/ч', category: 'Животные' },
  { question: 'Какое животное спит дольше всех?', answer: 'Коала', options: ['Коала', 'Ленивец', 'Кот', 'Летучая мышь'], explanation: 'Коала спит до 22 часов в сутки', category: 'Животные' },
  { question: 'Сколько ног у паука?', answer: '8', options: ['6', '8', '10', '12'], explanation: 'Пауки — это паукообразные, у них 8 ног', category: 'Животные' },
  { question: 'Какая самая большая птица?', answer: 'Африканский страус', options: ['Африканский страус', 'Пингвин', 'Альбатрос', 'Кондор'], explanation: 'Страус может достигать высоты 2.7 метра', category: 'Животные' },
  { question: 'Какое животное имеет самый длинный язык?', answer: 'Жираф', options: ['Муравьед', 'Жираф', 'Ящерица', 'Лягушка'], explanation: 'Язык жирафа может быть до 50 см', category: 'Животные' },
  { question: 'Какая рыба самая большая?', answer: 'Китовая акула', options: ['Китовая акула', 'Синий кит', 'Тунец', 'Марлин'], explanation: 'Китовая акула достигает 12-14 метров', category: 'Животные' },
  
  // Растения
  { question: 'Какое дерево самое высокое?', answer: 'Секвойя', options: ['Дуб', 'Секвойя', 'Сосна', 'Эвкалипт'], explanation: 'Секвойя может достигать 115 метров', category: 'Растения' },
  { question: 'Какой цветок самый большой?', answer: 'Раффлезия', options: ['Раффлезия', 'Пион', 'Подсолнух', 'Лотос'], explanation: 'Раффлезия Арнольди достигает 1 метра в диаметре', category: 'Растения' },
  { question: 'Какое растение живёт дольше всех?', answer: 'Сосна остистая', options: ['Дуб', 'Сосна остистая', 'Баобаб', 'Секвойя'], explanation: 'Сосна остистая живёт более 5000 лет', category: 'Растения' },
  { question: 'Где у растения происходит фотосинтез?', answer: 'В листьях', options: ['В корнях', 'В листьях', 'В стебле', 'В цветах'], explanation: 'Хлорофилл в листьях поглощает солнечный свет', category: 'Растения' },
  { question: 'Что нужно растению для фотосинтеза?', answer: 'Свет, вода, CO2', options: ['Только вода', 'Свет, вода, CO2', 'Только свет', 'Свет и вода'], explanation: 'Фотосинтез: 6CO2 + 6H2O + свет = C6H12O6 + 6O2', category: 'Растения' },
  
  // Экология
  { question: 'Что такое экосистема?', answer: 'Сообщество организмов и среда', options: ['Только растения', 'Сообщество организмов и среда', 'Только животные', 'Только почва'], explanation: 'Экосистема — это взаимосвязь живых организмов и среды', category: 'Экология' },
  { question: 'Какая цепь питания правильная?', answer: 'Растение → Травоядное → Хищник', options: ['Хищник → Растение', 'Растение → Травоядное → Хищник', 'Травоядное → Растение', 'Хищник → Хищник'], explanation: 'Продуценты → Консументы → Редуценты', category: 'Экология' },
  { question: 'Что производят зелёные растения?', answer: 'Кислород', options: ['Углекислый газ', 'Кислород', 'Азот', 'Водород'], explanation: 'Растения выделяют кислород при фотосинтезе', category: 'Экология' },
  { question: 'Кто такие редуценты?', answer: 'Бактерии и грибы', options: ['Травоядные', 'Хищники', 'Бактерии и грибы', 'Растения'], explanation: 'Редуценты разлагают органические вещества', category: 'Экология' },
  
  // Погода
  { question: 'Из чего состоят облака?', answer: 'Капельки воды', options: ['Пар', 'Капельки воды', 'Лёд', 'Газ'], explanation: 'Облака состоят из мельчайших капель воды или кристаллов льда', category: 'Погода' },
  { question: 'Что такое радуга?', answer: 'Преломление света', options: ['Отражение света', 'Преломление света', 'Рассеивание света', 'Поглощение света'], explanation: 'Капли воды преломляют солнечный свет на 7 цветов', category: 'Погода' },
  { question: 'Откуда дует ветер?', answer: 'От высокого давления', options: ['К высокому давлению', 'От высокого давления', 'Снизу вверх', 'Сверху вниз'], explanation: 'Ветер дует от области высокого к низкому давлению', category: 'Погода' },
  { question: 'Что такое молния?', answer: 'Электрический разряд', options: ['Свет', 'Электрический разряд', 'Огонь', 'Плазма'], explanation: 'Молния — это электрический разряд в атмосфере', category: 'Погода' },
  
  // Космос и природа
  { question: 'Сколько планет в Солнечной системе?', answer: '8', options: ['7', '8', '9', '10'], explanation: 'Плутон переведён в категорию карликовых планет', category: 'Космос' },
  { question: 'Какая планета ближе всех к Солнцу?', answer: 'Меркурий', options: ['Венера', 'Меркурий', 'Земля', 'Марс'], explanation: 'Меркурий находится на расстоянии 58 млн км от Солнца', category: 'Космос' },
  { question: 'Что такое Луна?', answer: 'Спутник Земли', options: ['Планета', 'Спутник Земли', 'Звезда', 'Астероид'], explanation: 'Луна — естественный спутник Земли', category: 'Космос' },
  { question: 'Откуда Земля получает энергию?', answer: 'От Солнца', options: ['От Луны', 'От Солнца', 'Из ядра', 'От звёзд'], explanation: 'Солнце — главный источник энергии для Земли', category: 'Космос' },
  
  // Природа России
  { question: 'Какая река самая длинная в России?', answer: 'Обь', options: ['Волга', 'Обь', 'Енисей', 'Лена'], explanation: 'Обь с Иртышом — самая длинная река России (5410 км)', category: 'Россия' },
  { question: 'Какое озеро самое глубокое?', answer: 'Байкал', options: ['Байкал', 'Ладожское', 'Онежское', 'Каспийское'], explanation: 'Байкал — глубина 1642 метра', category: 'Россия' },
  { question: 'Какая гора самая высокая в России?', answer: 'Эльбрус', options: ['Эльбрус', 'Казбек', 'Белуха', 'Ключевская Сопка'], explanation: 'Эльбрус — 5642 метра', category: 'Россия' },
  { question: 'Какой лес преобладает в Сибири?', answer: 'Тайга', options: ['Тайга', 'Тундра', 'Степь', 'Джунгли'], explanation: 'Тайга занимает большую часть Сибири', category: 'Россия' },
]

type Difficulty = 'easy' | 'medium' | 'hard'

export default function NatureQuiz() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [currentQuestion, setCurrentQuestion] = useState<NatureQuestion | null>(null)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())

  const getQuestions = useCallback((diff: Difficulty) => {
    const categories = diff === 'easy'
      ? ['Животные', 'Растения']
      : diff === 'medium'
      ? ['Животные', 'Растения', 'Экология', 'Погода']
      : ['Животные', 'Растения', 'Экология', 'Погода', 'Космос', 'Россия']
    
    return natureQuestions.filter(q => categories.includes(q.category))
  }, [])

  const generateQuestion = useCallback(() => {
    const available = getQuestions(difficulty).filter((_, index) => !usedQuestions.has(index))
    if (available.length === 0) {
      setUsedQuestions(new Set())
      return
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const q = available[randomIndex]
    const globalIndex = natureQuestions.indexOf(q)
    
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
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl p-6 border border-green-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🌿</div>
          <h2 className="text-2xl font-bold text-green-300">Окружающий мир</h2>
          <p className="text-green-200/70 text-sm mt-1">Природа и экология</p>
        </div>
        <div className="grid gap-3 max-w-xs mx-auto">
          <button onClick={() => startGame('easy')} className="p-4 rounded-xl bg-green-500/30 hover:bg-green-500/40 border border-green-400/30 transition-all">
            <div className="font-bold text-green-300">🟢 Легко</div>
            <div className="text-xs text-green-200/70">Животные и растения</div>
          </button>
          <button onClick={() => startGame('medium')} className="p-4 rounded-xl bg-yellow-500/30 hover:bg-yellow-500/40 border border-yellow-400/30 transition-all">
            <div className="font-bold text-yellow-300">🟡 Средне</div>
            <div className="text-xs text-yellow-200/70">+ Экология и погода</div>
          </button>
          <button onClick={() => startGame('hard')} className="p-4 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 transition-all">
            <div className="font-bold text-red-300">🔴 Сложно</div>
            <div className="text-xs text-red-200/70">+ Космос и Россия</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl p-6 border border-green-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-green-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Leaf className="w-8 h-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-green-500/30 hover:bg-green-500/40 rounded-xl text-green-300 font-bold transition-all">Играть снова</button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl p-6 border border-green-400/30">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-green-300 font-bold">{question}/10</span>
          <span className="text-emerald-300 text-sm">{currentQuestion?.category}</span>
        </div>
        {streak > 1 && <span className="text-orange-400 text-sm flex items-center gap-1"><Zap className="w-4 h-4" /> {streak}</span>}
      </div>
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all" style={{ width: `${(question / 10) * 100}%` }} />
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
