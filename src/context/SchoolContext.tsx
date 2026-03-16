'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { getSubjectsForGrade, allGames } from '@/data'
import { SubjectData, GameLesson } from '@/data/types'

// Types
export type MiniGameType = 'challenge' | 'memory' | 'daily' | 'flashcards' | 'speedtest' | 'stats' | 'typing' | 'spelling' | 'puzzle' | 'scramble' | 'racing' | 'trivia' | 'crossword' | 'sentence' | 'colormatch' | 'wordsearch' | 'sequence' | 'emoji' | 'geography' | 'hangman' | 'truefalse' | 'anagram' | 'oddoneout' | 'soundquiz' | 'mathpuzzle' | 'wordchain' | 'quickmath' | 'alphabetsort' | 'synonym' | 'flags' | 'timequiz' | 'riddles' | 'proverbs' | 'punctuation' | 'capitals' | 'roman' | 'fraction' | 'percent' | 'geometry' | 'nature' | 'history' | 'science' | 'measurement' | 'equation' | 'parts' | null
type ViewType = 'classes' | 'subjects' | 'lessons' | 'games' | 'gameplay'

interface DailyProgress {
  lessonsCompleted: number
  gamesPlayed: number
  pointsEarned: number
}

interface Progress {
  totalPoints: number
  completedTopics: Record<string, boolean>
  achievements: string[]
  streak: number
  lastActiveDate: string
  gamesPlayed: number
  correctAnswers: number
  totalAnswers: number
  favoriteSubject: string | null
  dailyProgress: Record<string, DailyProgress>
  todayLessons: number
  todayGames: number
  todayPoints: number
}

// Тип для урока
export interface LessonData {
  title: string
  description: string
  tasks: string[]
}

interface SchoolContextType {
  // State
  selectedClass: number | null
  view: ViewType
  selectedSubject: SubjectData | null
  selectedGame: GameLesson | null
  selectedLesson: LessonData | null // Текущий открытый урок
  activeMiniGame: MiniGameType
  progress: Progress
  subjects: SubjectData[]
  games: GameLesson[]
  gameFromLesson: boolean // Игра запущена из урока
  
  // Actions
  goToClass: (cls: number) => void
  goToSubject: (subject: SubjectData) => void
  goToGames: () => void
  goBack: () => void
  selectGame: (game: GameLesson | null) => void
  selectGameFromLesson: (game: GameLesson) => void // Запуск игры из урока
  selectLesson: (lesson: LessonData | null) => void // Выбор урока
  setActiveMiniGame: (game: MiniGameType) => void
  addPoints: (points: number) => void
  completeTopic: (topicKey: string) => void
  recordGameResult: (correct: number, total: number, subject: string) => void
  unlockAchievement: (achievementId: string) => void
  
  // Helpers
  isKidMode: boolean
}

const SchoolContext = createContext<SchoolContextType | null>(null)

export function useSchool() {
  const context = useContext(SchoolContext)
  if (!context) throw new Error('useSchool must be used within SchoolProvider')
  return context
}

// Helper to get initial progress from localStorage
function getInitialProgress(): Progress {
  const defaultProgress = { 
    totalPoints: 0, 
    completedTopics: {}, 
    achievements: [],
    streak: 0,
    lastActiveDate: '',
    gamesPlayed: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    favoriteSubject: null,
    dailyProgress: {},
    todayLessons: 0,
    todayGames: 0,
    todayPoints: 0
  }
  
  if (typeof window === 'undefined') {
    return defaultProgress
  }
  try {
    const saved = localStorage.getItem('schoolProgress')
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...defaultProgress, ...parsed }
    }
  } catch {
    // ignore
  }
  return defaultProgress
}

// Get today's date string
function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

// Check and update streak
function calculateStreak(lastDate: string, currentStreak: number): number {
  const today = getTodayString()
  if (lastDate === today) return currentStreak // Already active today
  
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayString = yesterday.toISOString().split('T')[0]
  
  if (lastDate === yesterdayString) {
    return currentStreak + 1 // Continue streak
  }
  
  return 1 // Reset streak
}

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [view, setView] = useState<ViewType>('classes')
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null)
  const [selectedGame, setSelectedGame] = useState<GameLesson | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null)
  const [activeMiniGame, setActiveMiniGame] = useState<MiniGameType>(null)
  const [progress, setProgress] = useState<Progress>(getInitialProgress)
  const [gameFromLesson, setGameFromLesson] = useState(false)

  const subjects = useMemo(() => 
    selectedClass !== null ? getSubjectsForGrade(selectedClass) : [], 
    [selectedClass]
  )
  
  const games = useMemo(() => 
    selectedClass !== null ? (allGames[selectedClass] || []) : [], 
    [selectedClass]
  )
  
  const isKidMode = selectedClass !== null && selectedClass <= 2

  // Save progress
  const saveProgress = (newProgress: Progress) => {
    setProgress(newProgress)
    if (typeof window !== 'undefined') {
      localStorage.setItem('schoolProgress', JSON.stringify(newProgress))
    }
  }

  // Add points
  const addPoints = (points: number) => {
    const today = getTodayString()
    const newStreak = calculateStreak(progress.lastActiveDate, progress.streak)
    const newProgress = { 
      ...progress, 
      totalPoints: progress.totalPoints + points,
      streak: newStreak,
      lastActiveDate: today,
      todayPoints: progress.lastActiveDate === today ? progress.todayPoints + points : points
    }
    saveProgress(newProgress)
  }

  // Complete topic
  const completeTopic = (topicKey: string) => {
    if (!progress.completedTopics[topicKey]) {
      const today = getTodayString()
      const newStreak = calculateStreak(progress.lastActiveDate, progress.streak)
      const newProgress = {
        ...progress,
        completedTopics: { ...progress.completedTopics, [topicKey]: true },
        totalPoints: progress.totalPoints + 10,
        streak: newStreak,
        lastActiveDate: today,
        todayLessons: progress.lastActiveDate === today ? progress.todayLessons + 1 : 1,
        todayPoints: progress.lastActiveDate === today ? progress.todayPoints + 10 : 10
      }
      saveProgress(newProgress)
    }
  }

  // Record game result
  const recordGameResult = (correct: number, total: number, subject: string) => {
    const today = getTodayString()
    const newStreak = calculateStreak(progress.lastActiveDate, progress.streak)
    const newProgress = {
      ...progress,
      gamesPlayed: progress.gamesPlayed + 1,
      correctAnswers: progress.correctAnswers + correct,
      totalAnswers: progress.totalAnswers + total,
      streak: newStreak,
      lastActiveDate: today,
      favoriteSubject: progress.favoriteSubject || subject,
      todayGames: progress.lastActiveDate === today ? progress.todayGames + 1 : 1
    }
    saveProgress(newProgress)
  }

  // Unlock achievement
  const unlockAchievement = (achievementId: string) => {
    if (!progress.achievements.includes(achievementId)) {
      const newProgress = {
        ...progress,
        achievements: [...progress.achievements, achievementId]
      }
      saveProgress(newProgress)
    }
  }

  // Navigation
  const goToClass = (cls: number) => {
    setSelectedClass(cls)
    setView('subjects')
    setSelectedSubject(null)
  }

  const goToSubject = (subject: SubjectData) => {
    setSelectedSubject(subject)
    setView('lessons')
  }

  const goToGames = () => {
    setView('games')
    setSelectedGame(null)
  }

  const goBack = () => {
    if (view === 'lessons') {
      setView('subjects')
      setSelectedSubject(null)
    } else if (view === 'subjects') {
      setView('classes')
      setSelectedClass(null)
    } else if (view === 'games') {
      setView('subjects')
    } else if (view === 'gameplay') {
      setView('games')
      setSelectedGame(null)
    }
  }

  const selectGame = (game: GameLesson | null) => {
    setSelectedGame(game)
    if (game) {
      setView('gameplay')
      setGameFromLesson(false)
    } else {
      // Если игра была из урока - возвращаемся к уроку
      if (gameFromLesson) {
        setView('lessons')
        setGameFromLesson(false)
      } else {
        setView('games')
      }
    }
  }

  // Запуск игры из урока
  const selectGameFromLesson = (game: GameLesson) => {
    setSelectedGame(game)
    setView('gameplay')
    setGameFromLesson(true)
  }

  // Выбор урока
  const selectLesson = (lesson: LessonData | null) => {
    setSelectedLesson(lesson)
    if (!lesson) {
      setGameFromLesson(false)
    }
  }

  return (
    <SchoolContext.Provider value={{
      selectedClass,
      view,
      selectedSubject,
      selectedGame,
      selectedLesson,
      activeMiniGame,
      progress,
      subjects,
      games,
      gameFromLesson,
      goToClass,
      goToSubject,
      goToGames,
      goBack,
      selectGame,
      selectGameFromLesson,
      selectLesson,
      setActiveMiniGame,
      addPoints,
      completeTopic,
      recordGameResult,
      unlockAchievement,
      isKidMode
    }}>
      {children}
    </SchoolContext.Provider>
  )
}
