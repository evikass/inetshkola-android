/**
 * Скрипт конвертации данных из веб-приложения в React Native формат
 * Запуск: npx ts-node scripts/convert-to-react-native.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пути
const WEB_DATA_DIR = path.join(__dirname, '../src/data');
const RN_DATA_DIR = path.join(__dirname, '../inetshkola-android/src/data');

// Типы для React Native
interface RNLesson {
  title: string;
  description: string;
  tasks: string[];
  examples?: string[];
  facts?: string[];
}

interface RNTopic {
  topic: string;
  lessons: RNLesson[];
}

interface RNSubject {
  id: string;
  title: string;
  icon: string;
  color: string;
  topics: RNTopic[];
}

interface RNGrade {
  id: number;
  title: string;
  icon: string;
  subjects: RNSubject[];
}

interface RNQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface RNGame {
  id: string;
  title: string;
  subject: string;
  icon: string;
  questions: RNQuizQuestion[];
}

// Маппинг иконок
const ICON_MAP: { [key: string]: string } = {
  'Calculator': '🔢',
  'BookOpen': '📖',
  'BookText': '📚',
  'Globe': '🌍',
  'Languages': '🔤',
  'Music': '🎵',
  'Palette': '🎨',
  'Dumbbell': '⚽',
  'Wrench': '🔧',
  'Microscope': '🔬',
  'FlaskConical': '🧪',
  'Atom': '⚛️',
  'TestTube': '🧬',
  'Scale': '⚖️',
  'Landmark': '🏛️',
  'Map': '🗺️',
  'Pen': '✏️',
  'Pencil': '📝',
  'Target': '🎯',
  'Trophy': '🏆',
  'GraduationCap': '🎓',
  'Crown': '👑',
  'PencilLine': '✍️',
  'MessageCircle': '💬',
  'Hands': '✋',
  'Scissors': '✂️',
  'Shapes': '🔷',
  'Brain': '🧠',
  'Lightbulb': '💡',
  'Clock': '🕐',
  'Compass': '🧭',
};

// Маппинг цветов
const COLOR_MAP: { [key: string]: string } = {
  'text-blue-400': '#3B82F6',
  'text-red-400': '#EF4444',
  'text-orange-400': '#F97316',
  'text-green-400': '#10B981',
  'text-purple-400': '#8B5CF6',
  'text-pink-400': '#EC4899',
  'text-yellow-400': '#F59E0B',
  'text-teal-400': '#14B8A6',
  'text-gray-400': '#6B7280',
  'text-indigo-400': '#6366F1',
  'text-cyan-400': '#06B6D4',
  'text-amber-400': '#F59E0B',
  'text-lime-400': '#84CC16',
  'text-emerald-400': '#10B981',
  'text-sky-400': '#0EA5E9',
  'text-violet-400': '#8B5CF6',
  'text-fuchsia-400': '#D946EF',
  'text-rose-400': '#F43F5E',
};

// Получение иконки
function getIcon(iconName: string): string {
  return ICON_MAP[iconName] || '📚';
}

// Получение цвета
function getColor(colorClass: string): string {
  return COLOR_MAP[colorClass] || '#6B7280';
}

// Очистка description от markdown
function cleanDescription(desc: string): string {
  if (!desc) return '';
  return desc
    .replace(/#{1,6}\s/g, '') // Удаляем заголовки
    .replace(/\*\*(.*?)\*\*/g, '$1') // Удаляем bold
    .replace(/\*(.*?)\*/g, '$1') // Удаляем italic
    .replace(/`(.*?)`/g, '$1') // Удаляем code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Удаляем ссылки
    .replace(/\n{3,}/g, '\n\n') // Убираем лишние переносы
    .trim();
}

// Конвертация урока
function convertLesson(lesson: any): RNLesson {
  return {
    title: lesson.title || '',
    description: cleanDescription(lesson.description || ''),
    tasks: lesson.tasks || [],
    examples: lesson.examples || [],
    facts: lesson.facts || [],
  };
}

// Конвертация темы
function convertTopic(topic: any): RNTopic {
  return {
    topic: topic.topic || topic.title || '',
    lessons: (topic.lessons || []).map(convertLesson),
  };
}

// Конвертация предмета
function convertSubject(subject: any, id: string): RNSubject {
  return {
    id: id,
    title: subject.title || subject.name || id,
    icon: getIcon(subject.icon || 'BookOpen'),
    color: getColor(subject.color || 'text-blue-400'),
    topics: (subject.detailedTopics || subject.topics || []).map(convertTopic),
  };
}

// Названия классов
const GRADE_NAMES: { [key: number]: { title: string; icon: string } } = {
  0: { title: 'Подготовительный', icon: '🎒' },
  1: { title: '1 класс', icon: '📚' },
  2: { title: '2 класс', icon: '📖' },
  3: { title: '3 класс', icon: '📝' },
  4: { title: '4 класс', icon: '✏️' },
  5: { title: '5 класс', icon: '🔬' },
  6: { title: '6 класс', icon: '🧪' },
  7: { title: '7 класс', icon: '📐' },
  8: { title: '8 класс', icon: '🎯' },
  9: { title: '9 класс', icon: '🏆' },
  10: { title: '10 класс', icon: '🎓' },
  11: { title: '11 класс', icon: '👑' },
};

// Предметы для каждого класса
const GRADE_SUBJECTS: { [key: number]: { id: string; title: string; icon: string; color: string }[] } = {
  0: [
    { id: 'writing', title: 'Письмо', icon: '✍️', color: '#EF4444' },
    { id: 'math', title: 'Математика', icon: '🔢', color: '#3B82F6' },
    { id: 'speech', title: 'Речь', icon: '💬', color: '#8B5CF6' },
    { id: 'world', title: 'Окружающий мир', icon: '🌍', color: '#10B981' },
    { id: 'art', title: 'ИЗО', icon: '🎨', color: '#F97316' },
    { id: 'music', title: 'Музыка', icon: '🎵', color: '#EC4899' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
    { id: 'modeling', title: 'Лепка', icon: '🖐️', color: '#F59E0B' },
    { id: 'technology', title: 'Технология', icon: '🔧', color: '#6B7280' },
  ],
  1: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'math', title: 'Математика', icon: '🔢', color: '#3B82F6' },
    { id: 'world', title: 'Окружающий мир', icon: '🌍', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'technology', title: 'Технология', icon: '🔧', color: '#6B7280' },
    { id: 'art', title: 'ИЗО', icon: '🎨', color: '#F59E0B' },
    { id: 'music', title: 'Музыка', icon: '🎵', color: '#EC4899' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
  ],
  2: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'math', title: 'Математика', icon: '🔢', color: '#3B82F6' },
    { id: 'world', title: 'Окружающий мир', icon: '🌍', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'technology', title: 'Технология', icon: '🔧', color: '#6B7280' },
    { id: 'art', title: 'ИЗО', icon: '🎨', color: '#F59E0B' },
    { id: 'music', title: 'Музыка', icon: '🎵', color: '#EC4899' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
    { id: 'projects', title: 'Проекты', icon: '📋', color: '#6366F1' },
  ],
  3: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'math', title: 'Математика', icon: '🔢', color: '#3B82F6' },
    { id: 'world', title: 'Окружающий мир', icon: '🌍', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'informatics', title: 'Информатика', icon: '💻', color: '#06B6D4' },
    { id: 'technology', title: 'Технология', icon: '🔧', color: '#6B7280' },
    { id: 'art', title: 'ИЗО', icon: '🎨', color: '#F59E0B' },
    { id: 'music', title: 'Музыка', icon: '🎵', color: '#EC4899' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
    { id: 'ethics', title: 'Этика', icon: '💭', color: '#D946EF' },
    { id: 'robotics', title: 'Робототехника', icon: '🤖', color: '#84CC16' },
    { id: 'safety', title: 'ОБЖ', icon: '🛡️', color: '#F43F5E' },
  ],
  4: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'math', title: 'Математика', icon: '🔢', color: '#3B82F6' },
    { id: 'world', title: 'Окружающий мир', icon: '🌍', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'informatics', title: 'Информатика', icon: '💻', color: '#06B6D4' },
    { id: 'technology', title: 'Технология', icon: '🔧', color: '#6B7280' },
    { id: 'art', title: 'ИЗО', icon: '🎨', color: '#F59E0B' },
    { id: 'music', title: 'Музыка', icon: '🎵', color: '#EC4899' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
    { id: 'religion', title: 'Основы религии', icon: '🏛️', color: '#A78BFA' },
    { id: 'projects', title: 'Проекты', icon: '📋', color: '#6366F1' },
    { id: 'history', title: 'История', icon: '📜', color: '#92400E' },
    { id: 'geography', title: 'География', icon: '🗺️', color: '#059669' },
  ],
  5: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'math', title: 'Математика', icon: '🔢', color: '#3B82F6' },
    { id: 'history', title: 'История', icon: '📜', color: '#92400E' },
    { id: 'geography', title: 'География', icon: '🗺️', color: '#059669' },
    { id: 'biology', title: 'Биология', icon: '🧬', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'informatics', title: 'Информатика', icon: '💻', color: '#06B6D4' },
    { id: 'technology', title: 'Технология', icon: '🔧', color: '#6B7280' },
    { id: 'art', title: 'ИЗО', icon: '🎨', color: '#F59E0B' },
    { id: 'music', title: 'Музыка', icon: '🎵', color: '#EC4899' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
  ],
  6: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'math', title: 'Математика', icon: '🔢', color: '#3B82F6' },
    { id: 'history', title: 'История', icon: '📜', color: '#92400E' },
    { id: 'geography', title: 'География', icon: '🗺️', color: '#059669' },
    { id: 'biology', title: 'Биология', icon: '🧬', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'informatics', title: 'Информатика', icon: '💻', color: '#06B6D4' },
    { id: 'physics', title: 'Физика', icon: '⚛️', color: '#6366F1' },
    { id: 'chemistry', title: 'Химия', icon: '🧪', color: '#84CC16' },
    { id: 'music', title: 'Музыка', icon: '🎵', color: '#EC4899' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
    { id: 'technology', title: 'Технология', icon: '🔧', color: '#6B7280' },
    { id: 'art', title: 'ИЗО', icon: '🎨', color: '#F59E0B' },
  ],
  7: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'algebra', title: 'Алгебра', icon: '📐', color: '#3B82F6' },
    { id: 'geometry', title: 'Геометрия', icon: '📏', color: '#0EA5E9' },
    { id: 'history', title: 'История', icon: '📜', color: '#92400E' },
    { id: 'geography', title: 'География', icon: '🗺️', color: '#059669' },
    { id: 'biology', title: 'Биология', icon: '🧬', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'informatics', title: 'Информатика', icon: '💻', color: '#06B6D4' },
    { id: 'physics', title: 'Физика', icon: '⚛️', color: '#6366F1' },
    { id: 'chemistry', title: 'Химия', icon: '🧪', color: '#84CC16' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
  ],
  8: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'algebra', title: 'Алгебра', icon: '📐', color: '#3B82F6' },
    { id: 'geometry', title: 'Геометрия', icon: '📏', color: '#0EA5E9' },
    { id: 'history', title: 'История', icon: '📜', color: '#92400E' },
    { id: 'geography', title: 'География', icon: '🗺️', color: '#059669' },
    { id: 'biology', title: 'Биология', icon: '🧬', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'informatics', title: 'Информатика', icon: '💻', color: '#06B6D4' },
    { id: 'physics', title: 'Физика', icon: '⚛️', color: '#6366F1' },
    { id: 'chemistry', title: 'Химия', icon: '🧪', color: '#84CC16' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
  ],
  9: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'algebra', title: 'Алгебра', icon: '📐', color: '#3B82F6' },
    { id: 'geometry', title: 'Геометрия', icon: '📏', color: '#0EA5E9' },
    { id: 'history', title: 'История', icon: '📜', color: '#92400E' },
    { id: 'geography', title: 'География', icon: '🗺️', color: '#059669' },
    { id: 'biology', title: 'Биология', icon: '🧬', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'informatics', title: 'Информатика', icon: '💻', color: '#06B6D4' },
    { id: 'physics', title: 'Физика', icon: '⚛️', color: '#6366F1' },
    { id: 'chemistry', title: 'Химия', icon: '🧪', color: '#84CC16' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
  ],
  10: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'algebra', title: 'Алгебра', icon: '📐', color: '#3B82F6' },
    { id: 'geometry', title: 'Геометрия', icon: '📏', color: '#0EA5E9' },
    { id: 'history', title: 'История', icon: '📜', color: '#92400E' },
    { id: 'geography', title: 'География', icon: '🗺️', color: '#059669' },
    { id: 'biology', title: 'Биология', icon: '🧬', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'informatics', title: 'Информатика', icon: '💻', color: '#06B6D4' },
    { id: 'physics', title: 'Физика', icon: '⚛️', color: '#6366F1' },
    { id: 'chemistry', title: 'Химия', icon: '🧪', color: '#84CC16' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
  ],
  11: [
    { id: 'russian', title: 'Русский язык', icon: '📖', color: '#EF4444' },
    { id: 'literature', title: 'Литература', icon: '📚', color: '#F97316' },
    { id: 'algebra', title: 'Алгебра', icon: '📐', color: '#3B82F6' },
    { id: 'geometry', title: 'Геометрия', icon: '📏', color: '#0EA5E9' },
    { id: 'history', title: 'История', icon: '📜', color: '#92400E' },
    { id: 'geography', title: 'География', icon: '🗺️', color: '#059669' },
    { id: 'biology', title: 'Биология', icon: '🧬', color: '#10B981' },
    { id: 'english', title: 'Английский', icon: '🔤', color: '#8B5CF6' },
    { id: 'informatics', title: 'Информатика', icon: '💻', color: '#06B6D4' },
    { id: 'physics', title: 'Физика', icon: '⚛️', color: '#6366F1' },
    { id: 'chemistry', title: 'Химия', icon: '🧪', color: '#84CC16' },
    { id: 'pe', title: 'Физкультура', icon: '⚽', color: '#14B8A6' },
  ],
};

// Главная функция
async function main() {
  console.log('🔄 Конвертация данных для React Native...\n');

  // Создаём директорию если её нет
  if (!fs.existsSync(RN_DATA_DIR)) {
    fs.mkdirSync(RN_DATA_DIR, { recursive: true });
  }

  const gradesDir = path.join(RN_DATA_DIR, 'grades');
  if (!fs.existsSync(gradesDir)) {
    fs.mkdirSync(gradesDir, { recursive: true });
  }

  const allGrades: RNGrade[] = [];

  // Обрабатываем каждый класс
  for (let gradeId = 0; gradeId <= 11; gradeId++) {
    console.log(`📚 Обработка ${gradeId} класса...`);

    const gradeName = GRADE_NAMES[gradeId];
    const subjectsInfo = GRADE_SUBJECTS[gradeId] || [];

    // Создаём файл класса
    const gradeFile = path.join(gradesDir, `grade${gradeId}.ts`);
    const imports: string[] = [];
    const exports: string[] = [];
    const subjectInstances: string[] = [];

    // Для каждого предмета создаём данные
    for (const subjInfo of subjectsInfo) {
      const subjectVar = `grade${gradeId}${subjInfo.id.charAt(0).toUpperCase() + subjInfo.id.slice(1)}`;

      // Создаём базовую структуру предмета
      const subjectData: RNSubject = {
        id: subjInfo.id,
        title: subjInfo.title,
        icon: subjInfo.icon,
        color: subjInfo.color,
        topics: [], // Будем заполнять из реальных данных если есть
      };

      // Пытаемся загрузить реальные данные из веб-приложения
      const webGradePath = path.join(WEB_DATA_DIR, 'grades', String(gradeId), subjInfo.id, 'index.ts');
      const webCurriculumPath = path.join(WEB_DATA_DIR, 'curriculum', `grade-${gradeId}`, `${subjInfo.id}.ts`);

      // Здесь можно добавить логику загрузки реальных данных
      // Пока создаём заглушку с одной темой

      subjectData.topics = [{
        topic: `Основы ${subjInfo.title.toLowerCase()}`,
        lessons: [{
          title: `Введение в ${subjInfo.title.toLowerCase()}`,
          description: `Уроки по предмету "${subjInfo.title}" для ${gradeId === 0 ? 'подготовительного класса' : gradeId + ' класса'}. Скоро будет добавлено больше материалов!`,
          tasks: ['Ознакомиться с предметом'],
          examples: [],
          facts: [],
        }],
      }];

      imports.push(`import { Subject } from '../types';`);
      exports.push(`export const ${subjectVar}: Subject = ${JSON.stringify(subjectData, null, 2)};`);
      subjectInstances.push(subjectVar);
    }

    // Записываем файл класса
    const fileContent = `${imports.join('\n')}\n\n${exports.join('\n\n')}\n\nexport const grade${gradeId}Subjects = [\n  ${subjectInstances.join(',\n  ')}\n];\n`;

    fs.writeFileSync(gradeFile, fileContent);
    console.log(`  ✅ Создан файл ${gradeFile}`);

    // Добавляем класс в общий список
    allGrades.push({
      id: gradeId,
      title: gradeName.title,
      icon: gradeName.icon,
      subjects: subjectsInfo.map(s => ({
        id: s.id,
        title: s.title,
        icon: s.icon,
        color: s.color,
        topics: [],
      })),
    });
  }

  // Обновляем constants.ts
  console.log('\n📝 Обновление constants.ts...');
  const constantsContent = `import { Grade, Subject } from './types';
${allGrades.map((g, i) => `import { grade${i}Subjects } from './grades/grade${i}';`).join('\n')}

// Классы
export const GRADES: Grade[] = [
${allGrades.map((g, i) => `  { id: ${g.id}, title: '${g.title}', icon: '${g.icon}', subjects: grade${i}Subjects },`).join('\n')}
];

// Награды XP
export const XP_REWARDS = {
  CORRECT_ANSWER: 5,
  PERFECT_GAME: 20,
  COMPLETE_LESSON: 10,
  DAILY_LOGIN: 15,
  STREAK_BONUS: 5,
} as const;

// Звания
export const RANKS = [
  { name: 'Новичок', icon: '🌱', minLevel: 1 },
  { name: 'Ученик', icon: '📚', minLevel: 3 },
  { name: 'Знаток', icon: '⭐', minLevel: 5 },
  { name: 'Мастер', icon: '🏆', minLevel: 8 },
  { name: 'Эксперт', icon: '🎓', minLevel: 12 },
  { name: 'Гений', icon: '💎', minLevel: 16 },
  { name: 'Легенда', icon: '👑', minLevel: 20 },
];

// Достижения
export const ACHIEVEMENTS = [
  { id: 'first_lesson', name: 'Первый шаг', description: 'Завершить первый урок', icon: '👣' },
  { id: 'first_game', name: 'Игрок', description: 'Сыграть первую игру', icon: '🎮' },
  { id: 'perfect_game', name: 'Идеально!', description: 'Пройти игру без ошибок', icon: '💯' },
  { id: 'streak_3', name: 'Три дня подряд', description: 'Заниматься 3 дня подряд', icon: '🔥' },
  { id: 'streak_7', name: 'Неделя упорства', description: 'Заниматься 7 дней подряд', icon: '📅' },
  { id: 'xp_100', name: 'Сотня очков', description: 'Набрать 100 XP', icon: '💯' },
  { id: 'xp_500', name: 'Полтысячи', description: 'Набрать 500 XP', icon: '🌟' },
  { id: 'xp_1000', name: 'Тысячник', description: 'Набрать 1000 XP', icon: '🎯' },
];

// Вычисление уровня из XP
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

// Вычисление XP для следующего уровня
export function xpForNextLevel(level: number): number {
  return Math.pow(level, 2) * 100;
}

// Получение звания по уровню
export function getRankByLevel(level: number) {
  const sortedRanks = [...RANKS].reverse();
  for (const rank of sortedRanks) {
    if (level >= rank.minLevel) return rank;
  }
  return RANKS[0];
}
`;

  fs.writeFileSync(path.join(RN_DATA_DIR, 'constants.ts'), constantsContent);
  console.log('  ✅ Обновлён constants.ts');

  console.log('\n✅ Конвертация завершена!');
  console.log(`📊 Создано файлов: ${allGrades.length + 1}`);
}

main().catch(console.error);
