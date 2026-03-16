'use client'

import { useState, useEffect } from 'react'
import { Zap, RefreshCw, Trophy, Sparkles, CheckCircle, XCircle, Filter, ChevronDown } from 'lucide-react'
import { useSound } from '@/lib/sounds'

// Extended quiz questions organized by category and difficulty
const QUIZ_CATEGORIES = {
  math: {
    name: 'Математика',
    emoji: '🔢',
    questions: [
      // Easy
      { q: "5 + 7 = ?", options: ["11", "12", "13"], answer: "12", difficulty: 'easy' },
      { q: "15 - 8 = ?", options: ["6", "7", "8"], answer: "7", difficulty: 'easy' },
      { q: "9 + 6 = ?", options: ["14", "15", "16"], answer: "15", difficulty: 'easy' },
      { q: "20 - 13 = ?", options: ["6", "7", "8"], answer: "7", difficulty: 'easy' },
      // Medium
      { q: "6 × 7 = ?", options: ["42", "43", "44"], answer: "42", difficulty: 'medium' },
      { q: "81 ÷ 9 = ?", options: ["8", "9", "10"], answer: "9", difficulty: 'medium' },
      { q: "12 × 8 = ?", options: ["86", "96", "106"], answer: "96", difficulty: 'medium' },
      { q: "144 ÷ 12 = ?", options: ["11", "12", "13"], answer: "12", difficulty: 'medium' },
      // Hard
      { q: "15² = ?", options: ["215", "225", "235"], answer: "225", difficulty: 'hard' },
      { q: "√196 = ?", options: ["12", "13", "14"], answer: "14", difficulty: 'hard' },
      { q: "25 × 25 = ?", options: ["615", "625", "635"], answer: "625", difficulty: 'hard' },
      { q: "2⁸ = ?", options: ["128", "256", "512"], answer: "256", difficulty: 'hard' },
    ]
  },
  russian: {
    name: 'Русский язык',
    emoji: '📝',
    questions: [
      // Easy
      { q: "Сколько букв в русском алфавите?", options: ["32", "33", "34"], answer: "33", difficulty: 'easy' },
      { q: "Какая буква гласная?", options: ["К", "М", "А"], answer: "А", difficulty: 'easy' },
      { q: "Сколько гласных букв?", options: ["8", "9", "10"], answer: "10", difficulty: 'easy' },
      // Medium
      { q: "Какая часть речи обозначает действие?", options: ["Существительное", "Глагол", "Прилагательное"], answer: "Глагол", difficulty: 'medium' },
      { q: "Как пишется: 'о_шибка' или 'оши_ка'?", options: ["ошибка", "ошыбка"], answer: "ошибка", difficulty: 'medium' },
      { q: "Какой падеж: 'без друга'?", options: ["Родительный", "Дательный", "Винительный"], answer: "Родительный", difficulty: 'medium' },
      { q: "Найди существительное:", options: ["бежать", "красивый", "стол"], answer: "стол", difficulty: 'medium' },
      // Hard
      { q: "Сколько падежей в русском языке?", options: ["5", "6", "7"], answer: "6", difficulty: 'hard' },
      { q: "Какое слово пишется слитно?", options: ["в течение", "вследствие", "на подобие"], answer: "вследствие", difficulty: 'hard' },
    ]
  },
  world: {
    name: 'Окружающий мир',
    emoji: '🌍',
    questions: [
      // Easy
      { q: "Сколько планет в Солнечной системе?", options: ["7", "8", "9"], answer: "8", difficulty: 'easy' },
      { q: "Какой газ мы вдыхаем?", options: ["Азот", "Кислород", "Углекислый газ"], answer: "Кислород", difficulty: 'easy' },
      { q: "Какое время года после зимы?", options: ["лето", "осень", "весна"], answer: "весна", difficulty: 'easy' },
      { q: "Какое животное домашнее?", options: ["волк", "лиса", "кошка"], answer: "кошка", difficulty: 'easy' },
      // Medium
      { q: "Какая самая большая планета?", options: ["Сатурн", "Юпитер", "Нептун"], answer: "Юпитер", difficulty: 'medium' },
      { q: "Где живут белые медведи?", options: ["Антарктида", "Арктика", "Африка"], answer: "Арктика", difficulty: 'medium' },
      { q: "Какая река самая длинная?", options: ["Амазонка", "Нил", "Волга"], answer: "Нил", difficulty: 'medium' },
      // Hard
      { q: "Сколько материков на Земле?", options: ["5", "6", "7"], answer: "6", difficulty: 'hard' },
      { q: "Какой океан самый большой?", options: ["Атлантический", "Тихий", "Индийский"], answer: "Тихий", difficulty: 'hard' },
    ]
  },
  history: {
    name: 'История',
    emoji: '🏛️',
    questions: [
      // Easy
      { q: "Столица России?", options: ["Санкт-Петербург", "Москва", "Новосибирск"], answer: "Москва", difficulty: 'easy' },
      { q: "Кто основал Санкт-Петербург?", options: ["Иван Грозный", "Пётр I", "Екатерина II"], answer: "Пётр I", difficulty: 'easy' },
      { q: "В каком году закончилась Великая Отечественная война?", options: ["1944", "1945", "1946"], answer: "1945", difficulty: 'easy' },
      // Medium
      { q: "Какой город был столицей Древней Руси?", options: ["Москва", "Киев", "Новгород"], answer: "Киев", difficulty: 'medium' },
      { q: "Кто крестил Русь?", options: ["Ярослав Мудрый", "Владимир Святой", "Иван Калита"], answer: "Владимир Святой", difficulty: 'medium' },
      { q: "В каком году Куликовская битва?", options: ["1378", "1380", "1385"], answer: "1380", difficulty: 'medium' },
      // Hard
      { q: "Кто был первым русским царём?", options: ["Иван III", "Иван IV", "Пётр I"], answer: "Иван IV", difficulty: 'hard' },
      { q: "Когда отменили крепостное право?", options: ["1855", "1861", "1865"], answer: "1861", difficulty: 'hard' },
    ]
  },
  literature: {
    name: 'Литература',
    emoji: '📚',
    questions: [
      // Easy
      { q: "Кто написал 'Руслан и Людмила'?", options: ["Лермонтов", "Пушкин", "Толстой"], answer: "Пушкин", difficulty: 'easy' },
      { q: "Сколько богатырей в сказке Пушкина?", options: ["31", "32", "33"], answer: "33", difficulty: 'easy' },
      { q: "Кто написал 'Винни-Пух'?", options: ["Милн", "Даль", "Барри"], answer: "Милн", difficulty: 'easy' },
      // Medium
      { q: "Кто написал 'Война и мир'?", options: ["Достоевский", "Толстой", "Тургенев"], answer: "Толстой", difficulty: 'medium' },
      { q: "Какой жанр у 'Мцыри'?", options: ["роман", "поэма", "повесть"], answer: "поэма", difficulty: 'medium' },
      { q: "Кто автор 'Преступления и наказания'?", options: ["Толстой", "Достоевский", "Чехов"], answer: "Достоевский", difficulty: 'medium' },
      // Hard
      { q: "В каком году родился Пушкин?", options: ["1799", "1809", "1819"], answer: "1799", difficulty: 'hard' },
      { q: "Кто написал 'Мастер и Маргарита'?", options: ["Булгаков", "Пастернак", "Солженицын"], answer: "Булгаков", difficulty: 'hard' },
    ]
  },
  english: {
    name: 'Английский',
    emoji: '🇬🇧',
    questions: [
      // Easy
      { q: "Как будет 'собака' по-английски?", options: ["cat", "dog", "bird"], answer: "dog", difficulty: 'easy' },
      { q: "Translate: 'apple'", options: ["апельсин", "яблоко", "банан"], answer: "яблоко", difficulty: 'easy' },
      { q: "Как будет 'красный'?", options: ["red", "blue", "green"], answer: "red", difficulty: 'easy' },
      { q: "Как сказать 'Привет'?", options: ["Bye", "Hi", "Thanks"], answer: "Hi", difficulty: 'easy' },
      // Medium
      { q: "Translate: 'I am a student'", options: ["Я учитель", "Я ученик", "Я студентка"], answer: "Я ученик", difficulty: 'medium' },
      { q: "Past tense глагола 'go'?", options: ["goed", "went", "gone"], answer: "went", difficulty: 'medium' },
      { q: "Множественное число 'child'?", options: ["childs", "childes", "children"], answer: "children", difficulty: 'medium' },
      // Hard
      { q: "Какой артикль перед 'hour'?", options: ["a", "an", "the"], answer: "an", difficulty: 'hard' },
      { q: "Conditionals: 'If I ___ rich...'", options: ["am", "were", "be"], answer: "were", difficulty: 'hard' },
    ]
  },
  science: {
    name: 'Наука',
    emoji: '🔬',
    questions: [
      // Easy
      { q: "Сколько ног у паука?", options: ["6", "8", "10"], answer: "8", difficulty: 'easy' },
      { q: "Что нужно растению для роста?", options: ["пластик", "свет", "металл"], answer: "свет", difficulty: 'easy' },
      { q: "Какой орган качает кровь?", options: ["печень", "сердце", "лёгкие"], answer: "сердце", difficulty: 'easy' },
      // Medium
      { q: "Формула воды?", options: ["H2O", "CO2", "O2"], answer: "H2O", difficulty: 'medium' },
      { q: "Какая планета ближе всех к Солнцу?", options: ["Венера", "Меркурий", "Марс"], answer: "Меркурий", difficulty: 'medium' },
      { q: "Единица измерения силы?", options: ["Джоуль", "Ньютон", "Ватт"], answer: "Ньютон", difficulty: 'medium' },
      // Hard
      { q: "Период полураспада - это...", options: ["физика", "химия", "биология"], answer: "физика", difficulty: 'hard' },
      { q: "Сколько костей в теле человека?", options: ["186", "206", "226"], answer: "206", difficulty: 'hard' },
    ]
  }
}

type CategoryKey = keyof typeof QUIZ_CATEGORIES
type Difficulty = 'easy' | 'medium' | 'hard'

export default function ExtendedQuickQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState<typeof QUIZ_CATEGORIES.math.questions[0] | null>(null)
  const [currentCategory, setCurrentCategory] = useState<CategoryKey | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const { playCorrect, playWrong } = useSound()

  const getFilteredQuestions = () => {
    let questions: (typeof QUIZ_CATEGORIES.math.questions[0] & { category: CategoryKey })[] = []
    
    const categories = currentCategory ? [currentCategory] : (Object.keys(QUIZ_CATEGORIES) as CategoryKey[])
    
    categories.forEach(cat => {
      const catQuestions = QUIZ_CATEGORIES[cat].questions
      const filtered = difficulty === 'all' 
        ? catQuestions 
        : catQuestions.filter(q => q.difficulty === difficulty)
      
      questions.push(...filtered.map(q => ({ ...q, category: cat })))
    })
    
    return questions
  }

  const nextQuestion = () => {
    const questions = getFilteredQuestions()
    if (questions.length === 0) return
    
    const randomIndex = Math.floor(Math.random() * questions.length)
    const selected = questions[randomIndex]
    setCurrentQuestion(selected)
    setSelected(null)
    setAnswered(false)
  }

  useEffect(() => {
    nextQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, difficulty])

  const handleAnswer = (option: string) => {
    if (answered || !currentQuestion) return
    
    setSelected(option)
    setAnswered(true)
    setTotal(t => t + 1)
    
    if (option === currentQuestion.answer) {
      playCorrect()
      setScore(s => s + 1)
      setStreak(s => {
        const newStreak = s + 1
        if (newStreak > bestStreak) setBestStreak(newStreak)
        return newStreak
      })
    } else {
      playWrong()
      setStreak(0)
    }
  }

  const getDifficultyColor = (diff: Difficulty) => {
    switch(diff) {
      case 'easy': return 'text-green-400 bg-green-400/20'
      case 'medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'hard': return 'text-red-400 bg-red-400/20'
    }
  }

  const getDifficultyLabel = (diff: Difficulty) => {
    switch(diff) {
      case 'easy': return 'Легко'
      case 'medium': return 'Средне'
      case 'hard': return 'Сложно'
    }
  }

  if (!currentQuestion) return null

  const categoryInfo = QUIZ_CATEGORIES[currentQuestion.category]

  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
      border-2 border-cyan-400/30 backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-cyan-400" />
          <span className="font-bold text-cyan-300">Быстрый тест</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-white/60">
            {score}/{total} ✅
          </div>
          {streak >= 3 && (
            <div className="text-sm text-orange-400 animate-pulse">
              🔥 x{streak}
            </div>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex gap-2 mb-4 text-xs">
        <div className="px-2 py-1 rounded-full bg-white/10 text-white/70">
          Серия: {streak} 🔥
        </div>
        <div className="px-2 py-1 rounded-full bg-white/10 text-white/70">
          Лучшая: {bestStreak} ⭐
        </div>
      </div>

      {/* Category & Difficulty filters */}
      <div className="mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-xs text-white/60 hover:text-white/80"
        >
          <Filter className="w-3 h-3" />
          Фильтры
          <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        
        {showFilters && (
          <div className="mt-2 p-3 rounded-xl bg-white/5 space-y-3 animate-slideIn">
            {/* Categories */}
            <div>
              <div className="text-xs text-white/50 mb-1">Предмет:</div>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setCurrentCategory(null)}
                  className={`px-2 py-1 rounded-full text-xs transition-all
                    ${!currentCategory ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  Все
                </button>
                {(Object.keys(QUIZ_CATEGORIES) as CategoryKey[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCurrentCategory(cat)}
                    className={`px-2 py-1 rounded-full text-xs transition-all
                      ${currentCategory === cat ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                  >
                    {QUIZ_CATEGORIES[cat].emoji} {QUIZ_CATEGORIES[cat].name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Difficulty */}
            <div>
              <div className="text-xs text-white/50 mb-1">Сложность:</div>
              <div className="flex gap-1">
                {(['all', 'easy', 'medium', 'hard'] as const).map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`px-2 py-1 rounded-full text-xs transition-all
                      ${difficulty === diff ? 'bg-purple-500 text-white' : 
                        diff === 'all' ? 'bg-white/10 text-white/70 hover:bg-white/20' :
                        getDifficultyColor(diff as Difficulty) + ' hover:opacity-80'}`}
                  >
                    {diff === 'all' ? 'Все' : getDifficultyLabel(diff as Difficulty)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subject & Difficulty badges */}
      <div className="flex gap-2 mb-4">
        <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm text-white/80">
          {categoryInfo.emoji} {categoryInfo.name}
        </div>
        <div className={`inline-block px-2 py-1 rounded-full text-xs ${getDifficultyColor(currentQuestion.difficulty)}`}>
          {getDifficultyLabel(currentQuestion.difficulty)}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-bold text-white mb-6">{currentQuestion.q}</h3>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selected === option
          const isCorrect = option === currentQuestion.answer
          const showCorrect = answered && isCorrect
          const showIncorrect = answered && isSelected && !isCorrect
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={answered}
              className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center gap-3
                ${showCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                  showIncorrect ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white' :
                  isSelected ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' :
                  'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
              {showCorrect && <CheckCircle className="w-5 h-5 ml-auto" />}
              {showIncorrect && <XCircle className="w-5 h-5 ml-auto" />}
            </button>
          )
        })}
      </div>

      {/* Result */}
      {answered && (
        <div className={`p-4 rounded-2xl mb-4 ${
          selected === currentQuestion.answer 
            ? 'bg-green-500/20 text-green-300' 
            : 'bg-red-500/20 text-red-300'
        }`}>
          {selected === currentQuestion.answer ? (
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">
                Правильно! Молодец! 🎉
                {streak >= 3 && <span className="ml-2">🔥 Серия: {streak}!</span>}
              </span>
            </div>
          ) : (
            <span>Правильный ответ: <strong>{currentQuestion.answer}</strong></span>
          )}
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={nextQuestion}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl 
            font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Следующий вопрос
          <Sparkles className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
