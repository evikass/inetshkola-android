'use client'

import { useState, useEffect, useCallback } from 'react'
import { RotateCcw, ChevronLeft, ChevronRight, Star, Sparkles, Check, X, Shuffle, Home } from 'lucide-react'
import { useSound } from '@/lib/sounds'

interface FlashCard {
  id: string
  front: string
  back: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const FLASHCARD_SETS: Record<string, { name: string; emoji: string; cards: FlashCard[] }> = {
  math: {
    name: 'Математика',
    emoji: '🔢',
    cards: [
      { id: 'm1', front: 'Формула площади прямоугольника', back: 'S = a × b', category: 'Геометрия', difficulty: 'easy' },
      { id: 'm2', front: 'Формула площади круга', back: 'S = πr²', category: 'Геометрия', difficulty: 'medium' },
      { id: 'm3', front: 'Теорема Пифагора', back: 'a² + b² = c²', category: 'Геометрия', difficulty: 'medium' },
      { id: 'm4', front: 'Формула длины окружности', back: 'C = 2πr', category: 'Геометрия', difficulty: 'easy' },
      { id: 'm5', front: 'Квадратное уравнение (дискриминант)', back: 'D = b² - 4ac', category: 'Алгебра', difficulty: 'hard' },
      { id: 'm6', front: 'Формула корней квадратного уравнения', back: 'x = (-b ± √D) / 2a', category: 'Алгебра', difficulty: 'hard' },
      { id: 'm7', front: '7² = ?', back: '49', category: 'Таблица квадратов', difficulty: 'easy' },
      { id: 'm8', front: '12² = ?', back: '144', category: 'Таблица квадратов', difficulty: 'medium' },
      { id: 'm9', front: '15² = ?', back: '225', category: 'Таблица квадратов', difficulty: 'medium' },
      { id: 'm10', front: '√169 = ?', back: '13', category: 'Корни', difficulty: 'medium' },
    ]
  },
  russian: {
    name: 'Русский язык',
    emoji: '📝',
    cards: [
      { id: 'r1', front: 'Именительный падеж', back: 'Кто? Что?', category: 'Падежи', difficulty: 'easy' },
      { id: 'r2', front: 'Родительный падеж', back: 'Кого? Чего?', category: 'Падежи', difficulty: 'easy' },
      { id: 'r3', front: 'Дательный падеж', back: 'Кому? Чему?', category: 'Падежи', difficulty: 'easy' },
      { id: 'r4', front: 'Винительный падеж', back: 'Кого? Что?', category: 'Падежи', difficulty: 'easy' },
      { id: 'r5', front: 'Творительный падеж', back: 'Кем? Чем?', category: 'Падежи', difficulty: 'easy' },
      { id: 'r6', front: 'Предложный падеж', back: 'О ком? О чём?', category: 'Падежи', difficulty: 'easy' },
      { id: 'r7', front: 'Существительное', back: 'Часть речи, обозначающая предмет', category: 'Части речи', difficulty: 'medium' },
      { id: 'r8', front: 'Глагол', back: 'Часть речи, обозначающая действие', category: 'Части речи', difficulty: 'medium' },
      { id: 'r9', front: 'Прилагательное', back: 'Часть речи, обозначающая признак предмета', category: 'Части речи', difficulty: 'medium' },
      { id: 'r10', front: 'Наречие', back: 'Неизменяемая часть речи, признак действия', category: 'Части речи', difficulty: 'hard' },
    ]
  },
  english: {
    name: 'English',
    emoji: '🇬🇧',
    cards: [
      { id: 'e1', front: 'cat', back: 'кошка', category: 'Animals', difficulty: 'easy' },
      { id: 'e2', front: 'dog', back: 'собака', category: 'Animals', difficulty: 'easy' },
      { id: 'e3', front: 'beautiful', back: 'красивый', category: 'Adjectives', difficulty: 'medium' },
      { id: 'e4', front: 'wonderful', back: 'замечательный', category: 'Adjectives', difficulty: 'medium' },
      { id: 'e5', front: 'to run', back: 'бежать', category: 'Verbs', difficulty: 'easy' },
      { id: 'e6', front: 'to swim', back: 'плавать', category: 'Verbs', difficulty: 'easy' },
      { id: 'e7', front: 'I am', back: 'Я есть/я являюсь', category: 'Grammar', difficulty: 'easy' },
      { id: 'e8', front: 'You are', back: 'Ты есть/вы являетесь', category: 'Grammar', difficulty: 'easy' },
      { id: 'e9', front: 'have been', back: 'был/была (Present Perfect)', category: 'Grammar', difficulty: 'hard' },
      { id: 'e10', front: 'will have', back: 'будет иметь (Future)', category: 'Grammar', difficulty: 'medium' },
    ]
  },
  history: {
    name: 'История',
    emoji: '🏛️',
    cards: [
      { id: 'h1', front: '862 год', back: 'Призвание Рюрика', category: 'Древняя Русь', difficulty: 'medium' },
      { id: 'h2', front: '988 год', back: 'Крещение Руси', category: 'Древняя Русь', difficulty: 'medium' },
      { id: 'h3', front: '1147 год', back: 'Основание Москвы', category: 'Русь', difficulty: 'medium' },
      { id: 'h4', front: '1380 год', back: 'Куликовская битва', category: 'Москва', difficulty: 'medium' },
      { id: 'h5', front: '1613 год', back: 'Начало династии Романовых', category: 'Россия', difficulty: 'hard' },
      { id: 'h6', front: '1703 год', back: 'Основание Санкт-Петербурга', category: 'Империя', difficulty: 'medium' },
      { id: 'h7', front: '1861 год', back: 'Отмена крепостного права', category: 'Империя', difficulty: 'hard' },
      { id: 'h8', front: '1945 год', back: 'Победа в ВОВ', category: 'СССР', difficulty: 'easy' },
      { id: 'h9', front: '1961 год', back: 'Полёт Гагарина в космос', category: 'СССР', difficulty: 'easy' },
      { id: 'h10', front: '1991 год', back: 'Распад СССР', category: 'Россия', difficulty: 'medium' },
    ]
  },
  science: {
    name: 'Наука',
    emoji: '🔬',
    cards: [
      { id: 's1', front: 'H₂O', back: 'Вода', category: 'Химия', difficulty: 'easy' },
      { id: 's2', front: 'CO₂', back: 'Углекислый газ', category: 'Химия', difficulty: 'easy' },
      { id: 's3', front: 'O₂', back: 'Кислород', category: 'Химия', difficulty: 'easy' },
      { id: 's4', front: 'NaCl', back: 'Поваренная соль', category: 'Химия', difficulty: 'medium' },
      { id: 's5', front: 'Второй закон Ньютона', back: 'F = ma', category: 'Физика', difficulty: 'medium' },
      { id: 's6', front: 'Закон Ома', back: 'I = U/R', category: 'Физика', difficulty: 'medium' },
      { id: 's7', front: 'Скорость света', back: '≈ 300 000 км/с', category: 'Физика', difficulty: 'hard' },
      { id: 's8', front: 'Митохондрия', back: 'Энергетическая станция клетки', category: 'Биология', difficulty: 'hard' },
      { id: 's9', front: 'Фотосинтез', back: 'Процесс создания органических веществ на свету', category: 'Биология', difficulty: 'medium' },
      { id: 's10', front: 'ДНК', back: 'Дезоксирибонуклеиновая кислота', category: 'Биология', difficulty: 'hard' },
    ]
  }
}

type CardSetKey = keyof typeof FLASHCARD_SETS

export default function FlashCards() {
  const { playCorrect, playWrong } = useSound()
  
  const [selectedSet, setSelectedSet] = useState<CardSetKey | null>(null)
  const [cards, setCards] = useState<FlashCard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set())
  const [unknownCards, setUnknownCards] = useState<Set<string>>(new Set())
  const [studyMode, setStudyMode] = useState<'all' | 'unknown'>('all')
  const [shuffled, setShuffled] = useState(false)

  const startStudy = (setKey: CardSetKey, shuffle: boolean = false) => {
    setSelectedSet(setKey)
    let setCards = [...FLASHCARD_SETS[setKey].cards]
    if (shuffle) {
      for (let i = setCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [setCards[i], setCards[j]] = [setCards[j], setCards[i]]
      }
      setShuffled(true)
    } else {
      setShuffled(false)
    }
    setCards(setCards)
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnownCards(new Set())
    setUnknownCards(new Set())
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleKnown = () => {
    const card = cards[currentIndex]
    if (!knownCards.has(card.id)) {
      playCorrect()
      setKnownCards(prev => new Set(prev).add(card.id))
      setUnknownCards(prev => {
        const newSet = new Set(prev)
        newSet.delete(card.id)
        return newSet
      })
    }
    nextCard()
  }

  const handleUnknown = () => {
    const card = cards[currentIndex]
    if (!unknownCards.has(card.id)) {
      playWrong()
      setUnknownCards(prev => new Set(prev).add(card.id))
      setKnownCards(prev => {
        const newSet = new Set(prev)
        newSet.delete(card.id)
        return newSet
      })
    }
    nextCard()
  }

  const nextCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(i => i + 1)
      }
    }, 200)
  }

  const prevCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(i => i - 1)
      }
    }, 200)
  }

  const restartUnknown = () => {
    const unknown = cards.filter(c => unknownCards.has(c.id))
    setCards(unknown)
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnownCards(new Set())
    setUnknownCards(new Set())
    setStudyMode('unknown')
  }

  // Menu screen
  if (!selectedSet) {
    return (
      <div className="w-full max-w-lg mx-auto p-6 rounded-3xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 
        border-2 border-teal-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 mb-4">
            <Star className="w-8 h-8 text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Карточки для запоминания</h2>
          <p className="text-white/60 text-sm mt-1">Учи формулы, определения и факты!</p>
        </div>

        <div className="space-y-2">
          {(Object.keys(FLASHCARD_SETS) as CardSetKey[]).map(key => {
            const set = FLASHCARD_SETS[key]
            return (
              <button
                key={key}
                onClick={() => startStudy(key, false)}
                className="w-full p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 
                  transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{set.emoji}</span>
                  <div className="text-left">
                    <div className="font-medium">{set.name}</div>
                    <div className="text-xs text-white/50">{set.cards.length} карточек</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); startStudy(key, true) }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
                    title="Перемешать"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const currentCard = cards[currentIndex]
  const currentSet = FLASHCARD_SETS[selectedSet]
  const isComplete = currentIndex === cards.length - 1
  const knownCount = knownCards.size
  const unknownCount = unknownCards.size

  // Results screen
  if (isComplete && isFlipped) {
    const accuracy = cards.length > 0 ? Math.round((knownCount / cards.length) * 100) : 0
    
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 
        border-2 border-teal-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
            <Sparkles className="w-10 h-10 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Карточки изучены!</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-2xl font-bold text-white">{cards.length}</div>
            <div className="text-xs text-white/60">Всего</div>
          </div>
          <div className="p-4 rounded-2xl bg-green-500/20 text-center">
            <div className="text-2xl font-bold text-green-400">{knownCount}</div>
            <div className="text-xs text-white/60">Знаю</div>
          </div>
          <div className="p-4 rounded-2xl bg-red-500/20 text-center">
            <div className="text-2xl font-bold text-red-400">{unknownCount}</div>
            <div className="text-xs text-white/60">Повторить</div>
          </div>
        </div>

        {accuracy === 100 && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 
            border border-yellow-400/30 mb-4 text-center">
            <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2 fill-yellow-400" />
            <div className="text-yellow-400 font-bold">Идеально! Все карточки выучены! 🎉</div>
          </div>
        )}

        <div className="space-y-2">
          {unknownCount > 0 && (
            <button
              onClick={restartUnknown}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl 
                font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Повторить неизвестные ({unknownCount})
            </button>
          )}
          <button
            onClick={() => startStudy(selectedSet, shuffled)}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl 
              font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Начать заново
          </button>
          <button
            onClick={() => setSelectedSet(null)}
            className="w-full py-3 bg-white/10 text-white rounded-2xl 
              font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Выбрать другую тему
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 
      border-2 border-teal-400/30 backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentSet.emoji}</span>
          <span className="text-white font-medium">{currentSet.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/60">{currentIndex + 1}/{cards.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-4">
        {cards.map((card, i) => (
          <div 
            key={card.id}
            className={`h-1.5 flex-1 rounded-full ${
              knownCards.has(card.id) ? 'bg-green-500' :
              unknownCards.has(card.id) ? 'bg-red-500' :
              i === currentIndex ? 'bg-teal-500' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div 
        onClick={handleFlip}
        className="relative h-48 mb-4 cursor-pointer perspective-1000"
      >
        <div className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className={`absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center
            bg-gradient-to-br from-teal-600/50 to-cyan-600/50 border-2 border-teal-400/50
            ${isFlipped ? 'invisible' : ''}`}>
            <div className="text-xs text-teal-300 mb-2">{currentCard.category}</div>
            <div className="text-xl font-bold text-white text-center">{currentCard.front}</div>
            <div className="text-xs text-white/40 mt-4">Нажми, чтобы перевернуть</div>
          </div>
          
          {/* Back */}
          <div className={`absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center
            bg-gradient-to-br from-purple-600/50 to-pink-600/50 border-2 border-purple-400/50
            rotate-y-180 ${!isFlipped ? 'invisible' : ''}`}>
            <div className="text-sm text-purple-300 mb-2">Ответ:</div>
            <div className="text-2xl font-bold text-white text-center">{currentCard.back}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {isFlipped ? (
          <div className="flex gap-2">
            <button
              onClick={handleUnknown}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white 
                font-medium flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <X className="w-5 h-5" />
              Повторить
            </button>
            <button
              onClick={handleKnown}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                font-medium flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Check className="w-5 h-5" />
              Знаю
            </button>
          </div>
        ) : (
          <div className="text-white/40 text-sm">Переверни карточку</div>
        )}
        
        <button
          onClick={() => { setIsFlipped(false); setTimeout(() => setCurrentIndex(i => Math.min(i + 1, cards.length - 1)), 200) }}
          disabled={currentIndex === cards.length - 1}
          className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-green-400">
          <Check className="w-4 h-4" />
          {knownCount}
        </div>
        <div className="flex items-center gap-1 text-red-400">
          <X className="w-4 h-4" />
          {unknownCount}
        </div>
      </div>
    </div>
  )
}
