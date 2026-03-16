'use client'

import { useState, useEffect } from 'react'
import { Brain, RotateCcw, Trophy, Clock, Star, Sparkles, Home } from 'lucide-react'
import { useSound } from '@/lib/sounds'

interface Card {
  id: number
  value: string
  pairId: number
  isFlipped: boolean
  isMatched: boolean
}

const CARD_SETS = {
  math: {
    name: 'Математика',
    emoji: '🔢',
    pairs: [
      { left: '6 × 7', right: '42' },
      { left: '8 × 8', right: '64' },
      { left: '9 × 9', right: '81' },
      { left: '12 × 5', right: '60' },
      { left: '15 × 4', right: '60' },
      { left: '√144', right: '12' },
      { left: '√225', right: '15' },
      { left: '25%', right: '1/4' },
    ]
  },
  russian: {
    name: 'Русский язык',
    emoji: '📝',
    pairs: [
      { left: 'Существительное', right: 'Предмет' },
      { left: 'Глагол', right: 'Действие' },
      { left: 'Прилагательное', right: 'Признак' },
      { left: 'Наречие', right: 'Обстоятельство' },
      { left: 'И.п.', right: 'Кто? Что?' },
      { left: 'Р.п.', right: 'Кого? Чего?' },
      { left: 'Д.п.', right: 'Кому? Чему?' },
      { left: 'В.п.', right: 'Кого? Что?' },
    ]
  },
  english: {
    name: 'English',
    emoji: '🇬🇧',
    pairs: [
      { left: 'cat', right: 'кошка' },
      { left: 'dog', right: 'собака' },
      { left: 'bird', right: 'птица' },
      { left: 'house', right: 'дом' },
      { left: 'book', right: 'книга' },
      { left: 'water', right: 'вода' },
      { left: 'friend', right: 'друг' },
      { left: 'school', right: 'школа' },
    ]
  },
  science: {
    name: 'Наука',
    emoji: '🔬',
    pairs: [
      { left: 'H₂O', right: 'Вода' },
      { left: 'CO₂', right: 'Углекислый газ' },
      { left: 'O₂', right: 'Кислород' },
      { left: 'NaCl', right: 'Соль' },
      { left: 'Солнце', right: 'Звезда' },
      { left: 'Луна', right: 'Спутник' },
      { left: '206', right: 'Костей в теле' },
      { left: '8', right: 'Планет' },
    ]
  }
}

type CardSetKey = keyof typeof CARD_SETS

export default function MemoryGame() {
  const { playCorrect, playWrong, playAchievement } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [selectedSet, setSelectedSet] = useState<CardSetKey>('math')
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [difficulty, setDifficulty] = useState<4 | 6 | 8>(4) // number of pairs

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const timer = setInterval(() => {
      setTimeElapsed(t => t + 1)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameState])

  // Check for matches
  useEffect(() => {
    if (flippedCards.length !== 2) return
    
    const [first, second] = flippedCards
    const firstCard = cards.find(c => c.id === first)
    const secondCard = cards.find(c => c.id === second)
    
    if (firstCard && secondCard) {
      if (firstCard.pairId === secondCard.pairId && firstCard.id !== secondCard.id) {
        // Match!
        playCorrect()
        setCards(prev => prev.map(c => 
          c.id === first || c.id === second ? { ...c, isMatched: true } : c
        ))
        setMatches(m => m + 1)
        setFlippedCards([])
        
        // Check win
        const totalPairs = cards.length / 2
        if (matches + 1 === totalPairs) {
          setTimeout(() => {
            playAchievement()
            setGameState('result')
          }, 500)
        }
      } else {
        // No match
        playWrong()
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ))
          setFlippedCards([])
        }, 800)
      }
    }
  }, [flippedCards, cards, matches, playCorrect, playWrong, playAchievement])

  const startGame = (cardSet: CardSetKey, pairs: 4 | 6 | 8) => {
    setSelectedSet(cardSet)
    setDifficulty(pairs)
    
    const setData = CARD_SETS[cardSet]
    const selectedPairs = setData.pairs.slice(0, pairs)
    
    const newCards: Card[] = []
    selectedPairs.forEach((pair, index) => {
      newCards.push({ id: index * 2, value: pair.left, pairId: index, isFlipped: false, isMatched: false })
      newCards.push({ id: index * 2 + 1, value: pair.right, pairId: index, isFlipped: false, isMatched: false })
    })
    
    // Shuffle
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]]
    }
    
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setTimeElapsed(0)
    setGameState('playing')
  }

  const flipCard = (cardId: number) => {
    if (flippedCards.length >= 2) return
    
    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ))
    setFlippedCards(prev => [...prev, cardId])
    setMoves(m => m + 1)
  }

  const getStars = () => {
    const totalPairs = cards.length / 2
    const ratio = moves / totalPairs
    if (ratio <= 2) return 3
    if (ratio <= 3) return 2
    return 1
  }

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-lg mx-auto p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 
        border-2 border-purple-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Игра на Память</h2>
          <p className="text-white/60 text-sm mt-1">Найди все пары карточек!</p>
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <div className="text-sm text-white/60 mb-2">Сложность:</div>
          <div className="flex gap-2">
            {([4, 6, 8] as const).map(pairs => (
              <button
                key={pairs}
                onClick={() => setDifficulty(pairs)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all
                  ${difficulty === pairs 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                {pairs} пар
              </button>
            ))}
          </div>
        </div>

        {/* Card sets */}
        <div className="space-y-2">
          {(Object.keys(CARD_SETS) as CardSetKey[]).map(key => {
            const set = CARD_SETS[key]
            return (
              <button
                key={key}
                onClick={() => startGame(key, difficulty)}
                className="w-full p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 
                  transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{set.emoji}</span>
                  <span className="font-medium">{set.name}</span>
                </div>
                <span className="text-white/50 text-sm">→</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    const stars = getStars()
    
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 
        border-2 border-purple-400/30 backdrop-blur-sm">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Победа! 🎉</h2>
          <div className="flex justify-center gap-1">
            {Array(3).fill(0).map((_, i) => (
              <Star 
                key={i} 
                className={`w-8 h-8 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-2xl font-bold text-purple-400">{moves}</div>
            <div className="text-sm text-white/60">Ходов</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 text-center">
            <div className="text-2xl font-bold text-blue-400">{timeElapsed}с</div>
            <div className="text-sm text-white/60">Время</div>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => startGame(selectedSet, difficulty)}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl 
              font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Играть снова
          </button>
          <button
            onClick={() => setGameState('menu')}
            className="w-full py-3 bg-white/10 text-white rounded-2xl 
              font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            В меню
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto p-4 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 
      border-2 border-purple-400/30 backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{CARD_SETS[selectedSet].emoji}</span>
          <span className="text-white font-medium">{CARD_SETS[selectedSet].name}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {timeElapsed}с
          </span>
          <span>Ходы: {moves}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>Найдено: {matches}/{cards.length / 2}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
            style={{ width: `${(matches / (cards.length / 2)) * 100}%` }}
          />
        </div>
      </div>

      {/* Cards grid */}
      <div className={`grid gap-2 ${
        difficulty === 4 ? 'grid-cols-4' : 
        difficulty === 6 ? 'grid-cols-4' : 
        'grid-cols-4'
      }`}>
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => flipCard(card.id)}
            disabled={card.isFlipped || card.isMatched}
            className={`aspect-square rounded-xl font-medium text-sm transition-all duration-300 ${
              card.isMatched 
                ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-400/50 text-green-300' 
                : card.isFlipped 
                  ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400 text-white rotate-0' 
                  : 'bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-purple-400/30 hover:scale-105'
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <span className="flex items-center justify-center h-full px-1 text-center">
                {card.value}
              </span>
            ) : (
              <Sparkles className="w-5 h-5 mx-auto text-white/50" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
