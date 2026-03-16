'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, X, UserPlus, Search, Trophy, Star, Flame,
  MessageCircle, Gift, Crown, Medal, Sparkles, Send
} from 'lucide-react'
import { useSchool } from '@/context/SchoolContext'

interface Friend {
  id: string
  name: string
  avatar: string
  points: number
  stars: number
  streak: number
  grade: number
  lastActive: string
  isOnline: boolean
}

// Демо-друзья
const demoFriends: Friend[] = [
  { id: '1', name: 'Алиса', avatar: '👧', points: 1250, stars: 45, streak: 7, grade: 3, lastActive: '5 мин', isOnline: true },
  { id: '2', name: 'Максим', avatar: '👦', points: 980, stars: 32, streak: 3, grade: 4, lastActive: '1 час', isOnline: true },
  { id: '3', name: 'София', avatar: '👧', points: 1580, stars: 58, streak: 12, grade: 2, lastActive: '2 часа', isOnline: false },
  { id: '4', name: 'Артём', avatar: '👦', points: 890, stars: 28, streak: 5, grade: 5, lastActive: '1 день', isOnline: false },
  { id: '5', name: 'Вика', avatar: '👧', points: 2100, stars: 72, streak: 15, grade: 3, lastActive: '3 часа', isOnline: true },
]

const demoSearchResults = [
  { id: '6', name: 'Даниил', avatar: '👦', grade: 4 },
  { id: '7', name: 'Полина', avatar: '👧', grade: 2 },
  { id: '8', name: 'Кирилл', avatar: '👦', grade: 5 },
]

export default function FriendsSystem() {
  const { totalPoints, totalStars, streak, selectedGrade } = useSchool()
  const [isOpen, setIsOpen] = useState(false)
  const [friends, setFriends] = useState<Friend[]>([])
  const [activeTab, setActiveTab] = useState<'friends' | 'search' | 'requests'>('friends')
  const [searchQuery, setSearchQuery] = useState('')
  const [sentGifts, setSentGifts] = useState<string[]>([])
  
  useEffect(() => {
    const saved = localStorage.getItem('friendsList')
    if (saved) {
      setFriends(JSON.parse(saved))
    } else {
      setFriends(demoFriends)
      localStorage.setItem('friendsList', JSON.stringify(demoFriends))
    }
    
    const gifts = localStorage.getItem('sentGifts')
    if (gifts) {
      setSentGifts(JSON.parse(gifts))
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('friendsList', JSON.stringify(friends))
  }, [friends])
  
  const sendGift = (friendId: string) => {
    if (sentGifts.includes(friendId)) return
    
    setSentGifts([...sentGifts, friendId])
    localStorage.setItem('sentGifts', JSON.stringify([...sentGifts, friendId]))
    
    // Анимация подарка
    const friend = friends.find(f => f.id === friendId)
    if (friend) {
      // В реальном приложении отправка на сервер
      console.log(`Gift sent to ${friend.name}`)
    }
  }
  
  const addFriend = (friend: typeof demoSearchResults[0]) => {
    const newFriend: Friend = {
      ...friend,
      points: Math.floor(Math.random() * 1000),
      stars: Math.floor(Math.random() * 50),
      streak: Math.floor(Math.random() * 10),
      lastActive: 'только что',
      isOnline: true
    }
    setFriends([...friends, newFriend])
    setActiveTab('friends')
  }
  
  const removeFriend = (friendId: string) => {
    setFriends(friends.filter(f => f.id !== friendId))
  }
  
  // Рейтинг среди друзей
  const ranking = [...friends, {
    id: 'me',
    name: 'Ты',
    avatar: '😎',
    points: totalPoints,
    stars: totalStars,
    streak: streak,
    grade: selectedGrade || 1,
    lastActive: 'сейчас',
    isOnline: true
  }].sort((a, b) => b.points - a.points)
  
  const myRank = ranking.findIndex(f => f.id === 'me') + 1
  
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
          className="fixed right-4 top-1/2 translate-y-16 z-40
                     bg-gradient-to-r from-pink-500 to-rose-500
                     p-4 rounded-full shadow-lg shadow-pink-500/30
                     border-2 border-white/20 group"
        >
          <Users className="w-6 h-6 text-white" />
          <span className="absolute -right-2 -top-2 bg-green-400 text-green-900 
                          text-xs font-bold px-2 py-1 rounded-full">
            {friends.filter(f => f.isOnline).length}
          </span>
          <span className="absolute right-full mr-3 bg-gray-900/90 text-white 
                          px-3 py-2 rounded-lg text-sm whitespace-nowrap
                          opacity-0 group-hover:opacity-100 transition-opacity">
            Друзья • #{myRank} в рейтинге
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
              className="bg-gradient-to-br from-slate-900 to-slate-800
                         rounded-3xl max-w-md w-full max-h-[85vh] overflow-hidden
                         shadow-2xl border-2 border-white/10 flex flex-col"
            >
              {/* Заголовок */}
              <div className="p-4 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/30 rounded-xl">
                      <Users className="w-5 h-5 text-pink-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Друзья</h3>
                      <p className="text-pink-300 text-sm">
                        Твой рейтинг: #{myRank}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Табы */}
                <div className="flex gap-2 mt-3">
                  {[
                    { id: 'friends', label: 'Друзья', count: friends.length },
                    { id: 'search', label: 'Поиск', icon: Search },
                    { id: 'requests', label: 'Заявки', count: 2 }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all
                                flex items-center justify-center gap-1 text-sm
                                ${activeTab === tab.id
                                  ? 'bg-pink-500 text-white'
                                  : 'bg-white/5 text-white/50 hover:bg-white/10'
                                }`}
                    >
                      {tab.label}
                      {tab.count !== undefined && (
                        <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Контент */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'friends' && (
                  <div className="space-y-3">
                    {/* Твоя позиция */}
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 
                                    rounded-2xl p-3 border border-pink-500/30">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <span className="text-3xl">😎</span>
                          <span className="absolute -bottom-1 -right-1 bg-pink-500 text-white 
                                          text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {myRank}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold">Ты</p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-yellow-400 flex items-center gap-1">
                              <Star className="w-3 h-3" /> {totalStars}
                            </span>
                            <span className="text-purple-400 flex items-center gap-1">
                              <Trophy className="w-3 h-3" /> {totalPoints}
                            </span>
                            <span className="text-orange-400 flex items-center gap-1">
                              <Flame className="w-3 h-3" /> {streak}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Список друзей */}
                    {friends.map((friend, idx) => (
                      <motion.div
                        key={friend.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white/5 rounded-xl p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <span className="text-2xl">{friend.avatar}</span>
                            {friend.isOnline && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                                              rounded-full border-2 border-slate-800" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-white font-medium">{friend.name}</p>
                              <span className="text-white/30 text-xs">{friend.grade} кл</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-yellow-400 flex items-center gap-1">
                                <Star className="w-3 h-3" /> {friend.stars}
                              </span>
                              <span className="text-purple-400">{friend.points} XP</span>
                              <span className="text-white/30">{friend.lastActive}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => sendGift(friend.id)}
                              disabled={sentGifts.includes(friend.id)}
                              className={`p-2 rounded-lg transition-colors
                                ${sentGifts.includes(friend.id)
                                  ? 'bg-white/5 text-white/20'
                                  : 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30'
                                }`}
                            >
                              <Gift className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-blue-500/20 text-blue-400 
                                            hover:bg-blue-500/30 rounded-lg">
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'search' && (
                  <div className="space-y-4">
                    {/* Поиск */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск друзей..."
                        className="w-full bg-white/5 text-white rounded-xl py-3 pl-10 pr-4
                                  border border-white/10 focus:border-pink-500/50 outline-none"
                      />
                    </div>
                    
                    {/* Результаты */}
                    <div className="space-y-2">
                      <p className="text-white/50 text-sm">Рекомендации</p>
                      {demoSearchResults.map((user) => (
                        <div
                          key={user.id}
                          className="bg-white/5 rounded-xl p-3 flex items-center gap-3"
                        >
                          <span className="text-2xl">{user.avatar}</span>
                          <div className="flex-1">
                            <p className="text-white">{user.name}</p>
                            <p className="text-white/50 text-sm">{user.grade} класс</p>
                          </div>
                          <button
                            onClick={() => addFriend(user)}
                            className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600
                                      text-white rounded-lg text-sm font-medium
                                      flex items-center gap-1"
                          >
                            <UserPlus className="w-4 h-4" />
                            Добавить
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'requests' && (
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
                      <span className="text-2xl">👦</span>
                      <div className="flex-1">
                        <p className="text-white">Иван хочет дружить</p>
                        <p className="text-white/50 text-sm">5 класс • 450 XP</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-green-500 hover:bg-green-600
                                          text-white rounded-lg text-sm">
                          Принять
                        </button>
                        <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20
                                          text-white rounded-lg text-sm">
                          ✕
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
                      <span className="text-2xl">👧</span>
                      <div className="flex-1">
                        <p className="text-white">Елена хочет дружить</p>
                        <p className="text-white/50 text-sm">3 класс • 820 XP</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-green-500 hover:bg-green-600
                                          text-white rounded-lg text-sm">
                          Принять
                        </button>
                        <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20
                                          text-white rounded-lg text-sm">
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Рейтинг */}
              <div className="p-3 border-t border-white/10">
                <div className="flex items-center justify-center gap-4">
                  {ranking.slice(0, 3).map((player, idx) => (
                    <div key={player.id} className="text-center">
                      <div className="relative inline-block">
                        <span className="text-2xl">{player.avatar}</span>
                        {idx === 0 && (
                          <Crown className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-xs text-white/70 mt-1">{player.name}</p>
                      <p className="text-xs text-purple-400">{player.points} XP</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
