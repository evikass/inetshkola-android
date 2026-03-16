'use client'

import { useState, useCallback } from 'react'
import { useSchool } from '@/context/SchoolContext'
import { useSound } from './SoundToggle'
import { BookOpen, Trophy, Star, Zap, RotateCcw, Shuffle } from 'lucide-react'

interface Proverb {
  text: string
  meaning: string
  category: string
}

interface ProverbQuestion {
  type: 'complete' | 'meaning' | 'match'
  proverb: Proverb
  missingPart: string
  options: string[]
}

const proverbs: Proverb[] = [
  { text: 'Без труда не выловишь и рыбку из пруда', meaning: 'Без усилий ничего не добьёшься', category: 'Труд' },
  { text: 'Век живи — век учись', meaning: 'Учиться нужно всю жизнь', category: 'Учёба' },
  { text: 'Время — деньги', meaning: 'Время ценно, его нужно беречь', category: 'Время' },
  { text: 'Где хотенье, там и уменье', meaning: 'При желании можно научиться всему', category: 'Труд' },
  { text: 'Делу время — потехе час', meaning: 'Сначала работа, потом отдых', category: 'Труд' },
  { text: 'За двумя зайцами погонишься — ни одного не поймаешь', meaning: 'Нельзя делать несколько дел одновременно', category: 'Мудрость' },
  { text: 'Землю солнце красит, а человека — труд', meaning: 'Труд делает человека лучше', category: 'Труд' },
  { text: 'Как аукнется, так и откликнется', meaning: 'Как относишься к другим, так и к тебе', category: 'Отношения' },
  { text: 'Книга — друг человека', meaning: 'Книги помогают и учат', category: 'Учёба' },
  { text: 'Красота требует жертв', meaning: 'Чтобы быть красивым, нужно стараться', category: 'Мудрость' },
  { text: 'Кто рано встаёт, тому Бог подаёт', meaning: 'Ранний подъём приносит успех', category: 'Труд' },
  { text: 'Курить — здоровью вредить', meaning: 'Курение вредит здоровью', category: 'Здоровье' },
  { text: 'Лучше один раз увидеть, чем сто раз услышать', meaning: 'Увидеть своими глазами лучше', category: 'Мудрость' },
  { text: 'Лучше поздно, чем никогда', meaning: 'Лучше сделать позже, чем не сделать', category: 'Мудрость' },
  { text: 'Любишь кататься — люби и саночки возить', meaning: 'За удовольствия нужно платить трудом', category: 'Труд' },
  { text: 'Мир освещается солнцем, а человек — знаниями', meaning: 'Знания делают человека лучше', category: 'Учёба' },
  { text: 'Много снега — много хлеба', meaning: 'Природные условия влияют на урожай', category: 'Природа' },
  { text: 'На ошибках учатся', meaning: 'Ошибки помогают набираться опыта', category: 'Учёба' },
  { text: 'Не в свои сани не садись', meaning: 'Не берись за то, что не умеешь', category: 'Мудрость' },
  { text: 'Не имей сто рублей, а имей сто друзей', meaning: 'Друзья важнее денег', category: 'Отношения' },
  { text: 'Не откладывай на завтра то, что можно сделать сегодня', meaning: 'Делай дела сразу', category: 'Труд' },
  { text: 'Нет друга — ищи, а нашёл — береги', meaning: 'Дружбу нужно ценить', category: 'Отношения' },
  { text: 'Один в поле не воин', meaning: 'Одному справиться трудно', category: 'Отношения' },
  { text: 'Один за всех и все за одного', meaning: 'Дружная команда справится с любым делом', category: 'Отношения' },
  { text: 'Порядок — душа всякого дела', meaning: 'Порядок важен для успеха', category: 'Труд' },
  { text: 'Повторение — мать учения', meaning: 'Повторять материал полезно', category: 'Учёба' },
  { text: 'Поспешишь — людей насмешишь', meaning: 'Спешка ведёт к ошибкам', category: 'Мудрость' },
  { text: 'Птицу узнают по полёту, а человека — по работе', meaning: 'Человека оценивают по делам', category: 'Труд' },
  { text: 'Семь раз отмерь, один раз отрежь', meaning: 'Сначала подумай, потом делай', category: 'Мудрость' },
  { text: 'С кем поведёшься, от того и наберёшься', meaning: 'Окружение влияет на человека', category: 'Отношения' },
  { text: 'Старый друг лучше новых двух', meaning: 'Старая дружба ценнее', category: 'Отношения' },
  { text: 'Терпение и труд всё перетрут', meaning: 'Упорство ведёт к успеху', category: 'Труд' },
  { text: 'Тише едешь — дальше будешь', meaning: 'Медленно, но верно придёшь к цели', category: 'Мудрость' },
  { text: 'У ленивого что на столе, то и в чреве', meaning: 'Лень приводит к бедности', category: 'Труд' },
  { text: 'Ученье — свет, а неученье — тьма', meaning: 'Образование даёт знания', category: 'Учёба' },
  { text: 'Что посеешь, то и пожнёшь', meaning: 'Что сделаешь, то и получишь', category: 'Мудрость' },
  { text: 'Чужую беду руками разведу', meaning: 'Чужие проблемы кажутся лёгкими', category: 'Отношения' },
  { text: 'Язык до Киева доведёт', meaning: 'Умение спрашивать помогает найти путь', category: 'Мудрость' },
]

type GameMode = 'complete' | 'meaning' | 'mixed'

export default function Proverbs() {
  const { addXP } = useSchool()
  const { playSound } = useSound()
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu')
  const [mode, setMode] = useState<GameMode>('mixed')
  const [currentQuestion, setCurrentQuestion] = useState<ProverbQuestion | null>(null)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedProverbs, setUsedProverbs] = useState<Set<number>>(new Set())

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const generateQuestion = useCallback(() => {
    const available = proverbs.filter((_, index) => !usedProverbs.has(index))
    if (available.length === 0) {
      setUsedProverbs(new Set())
      return
    }
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const proverb = available[randomIndex]
    const proverbIndex = proverbs.indexOf(proverb)
    
    const questionType: 'complete' | 'meaning' = mode === 'mixed' 
      ? (Math.random() > 0.5 ? 'complete' : 'meaning')
      : mode as 'complete' | 'meaning'
    
    let questionData: ProverbQuestion
    
    if (questionType === 'complete') {
      // Split proverb into parts
      const words = proverb.text.split(' ')
      const midPoint = Math.floor(words.length / 2)
      const startPart = words.slice(0, midPoint).join(' ')
      const endPart = words.slice(midPoint).join(' ')
      
      // Generate wrong endings
      const wrongEndings = proverbs
        .filter(p => p.text !== proverb.text)
        .map(p => p.text.split(' ').slice(Math.floor(p.text.split(' ').length / 2)).join(' '))
        .filter(e => e !== endPart && e.length > 5)
      
      const options = shuffleArray([endPart, ...shuffleArray(wrongEndings).slice(0, 3)])
      
      questionData = {
        type: 'complete',
        proverb,
        missingPart: startPart,
        options
      }
    } else {
      // Meaning question
      const wrongMeanings = proverbs
        .filter(p => p.text !== proverb.text)
        .map(p => p.meaning)
      
      const options = shuffleArray([proverb.meaning, ...shuffleArray(wrongMeanings).slice(0, 3)])
      
      questionData = {
        type: 'meaning',
        proverb,
        missingPart: proverb.text,
        options
      }
    }
    
    setCurrentQuestion(questionData)
    setUsedProverbs(prev => new Set(prev).add(proverbIndex))
  }, [mode, usedProverbs])

  const startGame = useCallback((gameMode: GameMode) => {
    setMode(gameMode)
    setScore(0)
    setQuestion(1)
    setCorrectAnswers(0)
    setStreak(0)
    setUsedProverbs(new Set())
    setGameState('playing')
    generateQuestion()
  }, [generateQuestion])

  const getCorrectAnswer = (): string => {
    if (!currentQuestion) return ''
    
    if (currentQuestion.type === 'complete') {
      return currentQuestion.proverb.text.split(' ').slice(Math.floor(currentQuestion.proverb.text.split(' ').length / 2)).join(' ')
    } else {
      return currentQuestion.proverb.meaning
    }
  }

  const handleAnswer = (answer: string) => {
    if (showFeedback || !currentQuestion) return
    
    setSelectedAnswer(answer)
    const correctAnswer = getCorrectAnswer()
    const isCorrect = answer === correctAnswer
    
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
    
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const nextQuestion = useCallback(() => {
    setShowFeedback(null)
    setSelectedAnswer(null)
    
    if (question >= 10) {
      setGameState('result')
    } else {
      setQuestion(prev => prev + 1)
      generateQuestion()
    }
  }, [question, generateQuestion])

  if (gameState === 'menu') {
    return (
      <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 border border-rose-400/30">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📖</div>
          <h2 className="text-2xl font-bold text-rose-300">Пословицы</h2>
          <p className="text-rose-200/70 text-sm mt-1">Мудрость народа</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-rose-200/70 text-sm text-center">Режим игры:</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setMode('complete')} className={`p-3 rounded-xl transition-all ${mode === 'complete' ? 'bg-rose-500/40 border-rose-300' : 'bg-white/10'} border border-rose-400/30`}>
                <div className="text-lg">✏️</div>
                <div className="text-xs text-rose-200">Дополни</div>
              </button>
              <button onClick={() => setMode('meaning')} className={`p-3 rounded-xl transition-all ${mode === 'meaning' ? 'bg-pink-500/40 border-pink-300' : 'bg-white/10'} border border-pink-400/30`}>
                <div className="text-lg">💡</div>
                <div className="text-xs text-pink-200">Значение</div>
              </button>
              <button onClick={() => setMode('mixed')} className={`p-3 rounded-xl transition-all ${mode === 'mixed' ? 'bg-fuchsia-500/40 border-fuchsia-300' : 'bg-white/10'} border border-fuchsia-400/30`}>
                <div className="text-lg">🎲</div>
                <div className="text-xs text-fuchsia-200">Смешанно</div>
              </button>
            </div>
          </div>
          
          <button onClick={() => startGame(mode)} className="w-full p-4 rounded-xl bg-rose-500/30 hover:bg-rose-500/40 border border-rose-400/30 transition-all">
            <div className="font-bold text-rose-300">▶️ Начать игру</div>
            <div className="text-xs text-rose-200/70">10 вопросов, {proverbs.length} пословиц</div>
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'result') {
    return (
      <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 border border-rose-400/30">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-rose-300 mb-2">Отлично!</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">XP</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <BookOpen className="w-8 h-8 mx-auto text-rose-400 mb-2" />
              <div className="text-2xl font-bold text-white">{correctAnswers}/10</div>
              <div className="text-xs text-white/70">Правильно</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Zap className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(correctAnswers / 10 * 100)}%</div>
              <div className="text-xs text-white/70">Точность</div>
            </div>
          </div>
          <button onClick={() => setGameState('menu')} className="px-6 py-3 bg-rose-500/30 hover:bg-rose-500/40 rounded-xl text-rose-300 font-bold transition-all">
            Играть снова
          </button>
        </div>
      </div>
    )
  }

  const correctAnswer = getCorrectAnswer()

  return (
    <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 border border-rose-400/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="text-rose-300 font-bold">{question}/10</span>
          <span className="text-pink-300 text-sm">{currentQuestion?.proverb.category}</span>
        </div>
        {streak > 1 && (
          <span className="text-orange-400 text-sm flex items-center gap-1">
            <Zap className="w-4 h-4" /> {streak}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-rose-400 to-pink-400 transition-all duration-300"
          style={{ width: `${(question / 10) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <div className={`inline-block px-4 py-1 rounded-full text-sm mb-4 ${
          currentQuestion?.type === 'complete' 
            ? 'bg-rose-500/30 text-rose-300' 
            : 'bg-pink-500/30 text-pink-300'
        }`}>
          {currentQuestion?.type === 'complete' ? '✏️ Продолжи пословицу' : '💡 Выбери значение'}
        </div>
        
        {currentQuestion?.type === 'complete' ? (
          <div className="text-lg text-white leading-relaxed">
            <span className="text-rose-200">{currentQuestion.missingPart}</span>
            <span className="text-white/40"> ...</span>
          </div>
        ) : (
          <p className="text-lg text-white leading-relaxed italic">&ldquo;{currentQuestion?.proverb.text}&rdquo;</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {currentQuestion?.options.map((option, index) => {
          let bgClass = 'bg-white/10 hover:bg-white/20'
          
          if (showFeedback) {
            if (option === correctAnswer) {
              bgClass = 'bg-green-500/40'
            } else if (option === selectedAnswer && option !== correctAnswer) {
              bgClass = 'bg-red-500/40'
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback !== null}
              className={`w-full p-4 rounded-xl text-white text-left transition-all ${bgClass}`}
            >
              <span className="text-rose-300 mr-2">{index + 1}.</span>
              {option}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`text-center py-3 rounded-xl ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <span className="text-2xl">{showFeedback === 'correct' ? '✅' : '❌'}</span>
          <p className={`font-medium mt-1 ${showFeedback === 'correct' ? 'text-green-300' : 'text-red-300'}`}>
            {showFeedback === 'correct' 
              ? 'Правильно!' 
              : currentQuestion?.type === 'complete'
                ? `Правильный ответ: ${correctAnswer}`
                : `Значение: ${correctAnswer}`
            }
          </p>
          {showFeedback === 'correct' && currentQuestion?.type === 'meaning' && (
            <p className="text-white/60 text-sm mt-1 italic">&ldquo;{currentQuestion.proverb.text}&rdquo;</p>
          )}
        </div>
      )}

      {/* Skip */}
      <button 
        onClick={() => {
          playSound('click')
          nextQuestion()
        }}
        disabled={showFeedback !== null}
        className="w-full mt-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        <RotateCcw className="w-4 h-4" />
        Пропустить
      </button>
    </div>
  )
}
