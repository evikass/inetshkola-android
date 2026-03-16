// Типы для уроков и мини-игр

export interface LessonTask {
  type: 'quiz' | 'match' | 'order' | 'find' | 'fill' | 'drag';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  hint?: string;
  image?: string;
}

export interface GameLesson {
  title: string;
  subject: string;
  icon: string;
  color: string;
  tasks: LessonTask[];
  reward: {
    stars: number;
    message: string;
  };
}

export interface LessonItem {
  title: string;
  description: string;
  tasks: string[];
  theory?: string;        // Подробная теория урока
  keyPoints?: string[];   // Ключевые моменты
  examples?: string[];    // Примеры
  facts?: string[];       // Интересные факты
  image?: string;         // Изображение к уроку
}

// Тема для уроков (средний уровень)
export interface TopicSection {
  title: string;           // Название темы
  lessons: LessonItem[];   // Уроки внутри темы
}

export interface LessonTopic {
  topic: string;              // Название раздела (крупной темы)
  subtopics?: TopicSection[]; // Темы внутри раздела (новая структура)
  lessons?: LessonItem[];     // Уроки (для обратной совместимости)
}

export interface SubjectData {
  title: string;
  icon: string;
  color: string;
  topics: string[];           // Список разделов (крупных тем)
  detailedTopics?: LessonTopic[];
  games?: GameLesson[];
}

// Alias для совместимости
export type Subject = SubjectData;

export interface GradeCurriculum {
  grade: number;
  title: string;
  subjects: Subject[];
}

// Маппинг названий папок на названия предметов
export const subjectNames: Record<string, { title: string; icon: string; color: string }> = {
  russian: { title: "Русский язык", icon: "BookOpen", color: "text-red-400" },
  literature: { title: "Литература", icon: "BookOpenText", color: "text-purple-400" },
  math: { title: "Математика", icon: "Calculator", color: "text-blue-400" },
  algebra: { title: "Алгебра", icon: "Sigma", color: "text-indigo-400" },
  geometry: { title: "Геометрия", icon: "Shapes", color: "text-cyan-400" },
  world: { title: "Окружающий мир", icon: "Globe", color: "text-green-400" },
  english: { title: "Иностранный язык", icon: "Languages", color: "text-pink-400" },
  history: { title: "История", icon: "Landmark", color: "text-amber-400" },
  biology: { title: "Биология", icon: "Atom", color: "text-green-400" },
  geography: { title: "География", icon: "Map", color: "text-teal-400" },
  physics: { title: "Физика", icon: "Atom", color: "text-purple-400" },
  chemistry: { title: "Химия", icon: "FlaskConical", color: "text-emerald-400" },
  social: { title: "Обществознание", icon: "Users", color: "text-violet-400" },
  informatics: { title: "Информатика", icon: "Monitor", color: "text-sky-400" },
  tech: { title: "Технология", icon: "Ruler", color: "text-yellow-400" },
  art: { title: "Изобразительное искусство", icon: "Palette", color: "text-rose-400" },
  music: { title: "Музыка", icon: "Music", color: "text-cyan-400" },
  pe: { title: "Физическая культура", icon: "Dumbbell", color: "text-orange-400" },
  reading: { title: "Развитие речи", icon: "MessageCircle", color: "text-teal-400" },
  craft: { title: "Лепка", icon: "Circle", color: "text-amber-400" },
  religion: { title: "Основы религиозных культур", icon: "HeartHandshake", color: "text-amber-400" },
  safety: { title: "Основы безопасности", icon: "Shield", color: "text-slate-400" }
};

// Порядок предметов по классам
export const gradeSubjects: Record<number, string[]> = {
  0: ["russian", "math", "reading", "world", "art", "music", "pe", "craft"],
  1: ["russian", "literature", "math", "world", "english", "tech", "art", "music", "pe"],
  2: ["russian", "literature", "math", "world", "english", "tech", "art", "music", "pe"],
  3: ["russian", "literature", "math", "world", "english", "tech", "art", "music", "pe"],
  4: ["russian", "literature", "math", "world", "english", "religion", "tech", "art", "music", "pe"],
  5: ["russian", "literature", "math", "history", "biology", "geography", "english", "tech", "art", "music", "pe", "safety"],
  6: ["russian", "literature", "math", "history", "biology", "geography", "english", "tech", "art", "music", "pe", "safety"],
  7: ["russian", "literature", "algebra", "geometry", "physics", "history", "biology", "geography", "english", "tech", "art", "music", "pe", "safety"],
  8: ["russian", "literature", "algebra", "geometry", "physics", "chemistry", "history", "biology", "geography", "english", "tech", "art", "music", "pe", "safety"],
  9: ["russian", "literature", "algebra", "geometry", "physics", "chemistry", "history", "biology", "geography", "english", "tech", "art", "music", "pe", "safety"],
  10: ["russian", "literature", "algebra", "geometry", "physics", "chemistry", "history", "social", "biology", "geography", "english", "informatics", "pe", "safety"],
  11: ["russian", "literature", "algebra", "geometry", "physics", "chemistry", "history", "social", "biology", "geography", "english", "informatics", "pe", "safety"]
};

export const gradeNames: Record<number, string> = {
  0: "Подготовительный класс",
  1: "1 класс",
  2: "2 класс",
  3: "3 класс",
  4: "4 класс",
  5: "5 класс",
  6: "6 класс",
  7: "7 класс",
  8: "8 класс",
  9: "9 класс",
  10: "10 класс",
  11: "11 класс"
};
