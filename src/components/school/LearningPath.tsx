'use client'

import { useState } from 'react'
import { Map, ChevronRight, Star, Lock, CheckCircle, Circle, Zap, Trophy, Target, Sparkles } from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

interface PathNode {
  id: string
  title: string
  description: string
  type: 'lesson' | 'game' | 'challenge' | 'reward'
  difficulty: 'easy' | 'medium' | 'hard'
  xpReward: number
  completed: boolean
  locked: boolean
}

const PATH_DATA: Record<number, PathNode[]> = {
  0: [
    { id: '0-1', title: 'Знакомство с цифрами', description: 'Учимся считать от 1 до 5', type: 'lesson', difficulty: 'easy', xpReward: 10, completed: false, locked: false },
    { id: '0-2', title: 'Игра с формами', description: 'Найди правильную форму', type: 'game', difficulty: 'easy', xpReward: 15, completed: false, locked: false },
    { id: '0-3', title: 'Буквы А-Я', description: 'Первые буквы алфавита', type: 'lesson', difficulty: 'easy', xpReward: 10, completed: false, locked: true },
    { id: '0-4', title: 'Времена года', description: 'Узнаём сезоны', type: 'lesson', difficulty: 'easy', xpReward: 10, completed: false, locked: true },
    { id: '0-5', title: '🌟 Первый тест', description: 'Проверь знания!', type: 'challenge', difficulty: 'easy', xpReward: 30, completed: false, locked: true },
  ],
  1: [
    { id: '1-1', title: 'Счёт до 10', description: 'Учим числа от 1 до 10', type: 'lesson', difficulty: 'easy', xpReward: 15, completed: false, locked: false },
    { id: '1-2', title: 'Сложение', description: 'Учимся складывать', type: 'lesson', difficulty: 'easy', xpReward: 15, completed: false, locked: false },
    { id: '1-3', title: 'Математическая гонка', description: 'Реши примеры быстрее всех!', type: 'game', difficulty: 'easy', xpReward: 25, completed: false, locked: true },
    { id: '1-4', title: 'Алфавит', description: 'Все буквы русского алфавита', type: 'lesson', difficulty: 'easy', xpReward: 15, completed: false, locked: true },
    { id: '1-5', title: 'Слоги', description: 'Учимся читать по слогам', type: 'lesson', difficulty: 'medium', xpReward: 20, completed: false, locked: true },
    { id: '1-6', title: '🎯 Контрольная точка', description: 'Проверка знаний 1 класса', type: 'challenge', difficulty: 'medium', xpReward: 50, completed: false, locked: true },
  ],
  2: [
    { id: '2-1', title: 'Счёт до 100', description: 'Числа до сотни', type: 'lesson', difficulty: 'medium', xpReward: 20, completed: false, locked: false },
    { id: '2-2', title: 'Вычитание', description: 'Учимся вычитать', type: 'lesson', difficulty: 'medium', xpReward: 20, completed: false, locked: false },
    { id: '2-3', title: 'Таблица умножения', description: 'Учим умножение', type: 'lesson', difficulty: 'medium', xpReward: 25, completed: false, locked: true },
    { id: '2-4', title: 'Части речи', description: 'Существительное и глагол', type: 'lesson', difficulty: 'medium', xpReward: 20, completed: false, locked: true },
    { id: '2-5', title: '⚡ Математический спринт', description: 'Соревнование по счёту', type: 'game', difficulty: 'medium', xpReward: 35, completed: false, locked: true },
  ],
  3: [
    { id: '3-1', title: 'Таблица умножения', description: 'Полная таблица до 10', type: 'lesson', difficulty: 'medium', xpReward: 25, completed: false, locked: false },
    { id: '3-2', title: 'Деление', description: 'Учимся делить числа', type: 'lesson', difficulty: 'medium', xpReward: 25, completed: false, locked: false },
    { id: '3-3', title: 'Периметр и площадь', description: 'Геометрия фигур', type: 'lesson', difficulty: 'hard', xpReward: 30, completed: false, locked: true },
    { id: '3-4', title: 'Падежи', description: '6 падежей русского языка', type: 'lesson', difficulty: 'hard', xpReward: 30, completed: false, locked: true },
    { id: '3-5', title: '🏆 Геометрический марафон', description: 'Задачи на периметр и площадь', type: 'challenge', difficulty: 'hard', xpReward: 60, completed: false, locked: true },
  ],
  7: [
    { id: '7-1', title: 'Линейные уравнения', description: 'Решаем уравнения с одной переменной', type: 'lesson', difficulty: 'medium', xpReward: 30, completed: false, locked: false },
    { id: '7-2', title: 'Формулы сокращённого умножения', description: 'Квадрат суммы и разности', type: 'lesson', difficulty: 'hard', xpReward: 35, completed: false, locked: false },
    { id: '7-3', title: 'Треугольники', description: 'Свойства и признаки', type: 'lesson', difficulty: 'medium', xpReward: 30, completed: false, locked: true },
    { id: '7-4', title: 'Теорема Пифагора', description: 'Знаменитая теорема', type: 'lesson', difficulty: 'hard', xpReward: 40, completed: false, locked: true },
    { id: '7-5', title: '⚛️ Алгебраический челлендж', description: 'Реши все уравнения!', type: 'challenge', difficulty: 'hard', xpReward: 75, completed: false, locked: true },
  ],
}

const getGradePath = (grade: number): PathNode[] => {
  return PATH_DATA[grade] || PATH_DATA[1]
}

const getTypeIcon = (type: PathNode['type']) => {
  switch (type) {
    case 'lesson': return <Circle className="w-5 h-5" />
    case 'game': return <Zap className="w-5 h-5" />
    case 'challenge': return <Target className="w-5 h-5" />
    case 'reward': return <Trophy className="w-5 h-5" />
  }
}

const getTypeColor = (type: PathNode['type']) => {
  switch (type) {
    case 'lesson': return 'from-blue-500 to-cyan-500'
    case 'game': return 'from-purple-500 to-pink-500'
    case 'challenge': return 'from-orange-500 to-red-500'
    case 'reward': return 'from-yellow-500 to-amber-500'
  }
}

const getDifficultyStars = (difficulty: PathNode['difficulty']) => {
  const count = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
  return Array(count).fill(0).map((_, i) => (
    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
  ))
}

export default function LearningPath() {
  const { selectedClass, progress } = useSchool()
  const [selectedNode, setSelectedNode] = useState<PathNode | null>(null)
  
  const pathNodes = getGradePath(selectedClass || 1)
  
  // Calculate completion percentage
  const completedCount = pathNodes.filter(n => progress.completedTopics[n.id]).length
  const totalXp = pathNodes.reduce((sum, n) => sum + n.xpReward, 0)
  const earnedXp = pathNodes.filter(n => progress.completedTopics[n.id]).reduce((sum, n) => sum + n.xpReward, 0)

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 
      border-2 border-violet-400/30 backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Map className="w-6 h-6 text-violet-400" />
          <span className="font-bold text-violet-300">Путь обучения</span>
        </div>
        <div className="text-sm text-white/60">
          {completedCount}/{pathNodes.length} пройдено
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(completedCount / pathNodes.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-white/50">
          <span>XP: {earnedXp}/{totalXp}</span>
          <span>{Math.round((completedCount / pathNodes.length) * 100)}%</span>
        </div>
      </div>

      {/* Path nodes */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/20" />
        
        <div className="space-y-4">
          {pathNodes.map((node, index) => {
            const isCompleted = progress.completedTopics[node.id]
            const isLocked = index > 0 && !progress.completedTopics[pathNodes[index - 1].id] && !isCompleted
            const isCurrent = !isCompleted && !isLocked && (index === 0 || progress.completedTopics[pathNodes[index - 1].id])
            
            return (
              <div
                key={node.id}
                className={`relative pl-14 ${isLocked ? 'opacity-50' : 'cursor-pointer hover:scale-[1.02] transition-transform'}`}
                onClick={() => !isLocked && setSelectedNode(node)}
              >
                {/* Node circle */}
                <div 
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center
                    ${isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      isCurrent ? `bg-gradient-to-r ${getTypeColor(node.type)} animate-pulse` :
                      isLocked ? 'bg-gray-600' : 'bg-white/20'}`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : isLocked ? (
                    <Lock className="w-3 h-3 text-white/50" />
                  ) : (
                    <div className="text-white">{getTypeIcon(node.type)}</div>
                  )}
                </div>

                {/* Node content */}
                <div className={`p-4 rounded-2xl transition-all
                  ${isCurrent ? 'bg-white/15 border-2 border-violet-400/50' : 'bg-white/5'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white flex items-center gap-2">
                        {node.title}
                        {isCurrent && <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />}
                      </h4>
                      <p className="text-sm text-white/60 mt-1">{node.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-0.5">{getDifficultyStars(node.difficulty)}</div>
                      <div className="text-xs text-yellow-400">+{node.xpReward} XP</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected node details */}
      {selectedNode && (
        <div className="mt-6 p-4 rounded-2xl bg-white/10 animate-slideIn">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-white">{selectedNode.title}</h4>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-white/60 mb-3">{selectedNode.description}</p>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-white/10">
              {selectedNode.type === 'lesson' ? '📚 Урок' :
               selectedNode.type === 'game' ? '🎮 Игра' :
               selectedNode.type === 'challenge' ? '🎯 Челлендж' : '🏆 Награда'}
            </span>
            <span className="px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-400">
              +{selectedNode.xpReward} XP
            </span>
          </div>
          <button className="w-full mt-3 py-2 bg-gradient-to-r from-violet-500 to-purple-500 
            text-white rounded-xl font-medium hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
            Начать
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
