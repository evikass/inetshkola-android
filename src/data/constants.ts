// Константы для игры

// XP за действия
export const XP_REWARDS = {
  CORRECT_ANSWER: 5,
  PERFECT_GAME: 20,
  COMPLETE_LESSON: 10,
  DAILY_LOGIN: 15,
  STREAK_BONUS: 5, // за каждый день подряд
}

// Формула: level = 1 + floor(sqrt(xp / 100))
export const XP_PER_LEVEL = 100

// Рассчитать уровень из XP
export function calculateLevel(xp: number): number {
  return 1 + Math.floor(Math.sqrt(xp / XP_PER_LEVEL))
}

// XP для следующего уровня
export function xpForNextLevel(currentLevel: number): number {
  return (currentLevel * currentLevel) * XP_PER_LEVEL
}

// Прогресс до следующего уровня (0-100%)
export function levelProgress(xp: number): number {
  const level = calculateLevel(xp)
  const currentLevelXp = (level - 1) * (level - 1) * XP_PER_LEVEL
  const nextLevelXp = level * level * XP_PER_LEVEL
  const progress = ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100
  return Math.min(100, Math.max(0, progress))
}

// Звания по уровням
export const RANKS = [
  { minLevel: 1, name: 'Новичок', emoji: '🌱', color: 'from-gray-400 to-gray-500' },
  { minLevel: 3, name: 'Ученик', emoji: '📚', color: 'from-green-400 to-emerald-500' },
  { minLevel: 5, name: 'Знаток', emoji: '⭐', color: 'from-blue-400 to-cyan-500' },
  { minLevel: 8, name: 'Мастер', emoji: '🏆', color: 'from-purple-400 to-pink-500' },
  { minLevel: 12, name: 'Эксперт', emoji: '🎓', color: 'from-yellow-400 to-orange-500' },
  { minLevel: 16, name: 'Гений', emoji: '💎', color: 'from-pink-400 to-rose-500' },
  { minLevel: 20, name: 'Легенда', emoji: '👑', color: 'from-amber-400 to-yellow-500' },
]

// Получить звание по уровню
export function getRank(level: number) {
  let currentRank = RANKS[0]
  for (const rank of RANKS) {
    if (level >= rank.minLevel) {
      currentRank = rank
    }
  }
  return currentRank
}

// Достижения
export const ACHIEVEMENTS = [
  { id: 'first_lesson', name: 'Первый шаг', description: 'Завершить первый урок', emoji: '🎯' },
  { id: 'first_game', name: 'Игрок', description: 'Сыграть первую игру', emoji: '🎮' },
  { id: 'perfect_game', name: 'Идеально!', description: 'Пройти игру без ошибок', emoji: '💯' },
  { id: 'streak_3', name: 'Три дня подряд', description: 'Заниматься 3 дня подряд', emoji: '🔥' },
  { id: 'streak_7', name: 'Неделя подряд', description: 'Заниматься 7 дней подряд', emoji: '⚡' },
  { id: 'streak_30', name: 'Месяц упорства', description: 'Заниматься 30 дней подряд', emoji: '🌟' },
  { id: 'points_100', name: 'Сотня очков', description: 'Набрать 100 очков', emoji: '🏅' },
  { id: 'points_500', name: 'Полтысячи', description: 'Набрать 500 очков', emoji: '🎖️' },
  { id: 'points_1000', name: 'Тысячник', description: 'Набрать 1000 очков', emoji: '🥇' },
  { id: 'games_10', name: 'Любитель игр', description: 'Сыграть 10 игр', emoji: '🎲' },
  { id: 'games_50', name: 'Игроман', description: 'Сыграть 50 игр', emoji: '🕹️' },
  { id: 'level_5', name: 'Развиваемся', description: 'Достичь 5 уровня', emoji: '📈' },
  { id: 'level_10', name: 'Прогресс', description: 'Достичь 10 уровня', emoji: '🚀' },
  { id: 'level_20', name: 'Высота', description: 'Достичь 20 уровня', emoji: '🏔️' },
  { id: 'all_subjects', name: 'Энциклопедист', description: 'Попробовать все предметы', emoji: '📖' },
]

// Цвета для предметов
export const SUBJECT_COLORS: Record<string, string> = {
  'Математика': 'from-blue-500 to-cyan-500',
  'Алгебра': 'from-indigo-500 to-blue-500',
  'Геометрия': 'from-cyan-500 to-teal-500',
  'Русский язык': 'from-red-500 to-rose-500',
  'Литература': 'from-purple-500 to-pink-500',
  'История': 'from-amber-500 to-orange-500',
  'Биология': 'from-green-500 to-emerald-500',
  'География': 'from-teal-500 to-cyan-500',
  'Физика': 'from-violet-500 to-purple-500',
  'Химия': 'from-emerald-500 to-green-500',
  'Английский': 'from-pink-500 to-rose-500',
  'Окружающий мир': 'from-lime-500 to-green-500',
}
