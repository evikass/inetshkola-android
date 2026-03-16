// Главный файл экспорта учебного плана
import { GradeCurriculum } from '../types'

import { grade0Subjects } from './grade-0'
import { grade1Subjects } from './grade-1'
import { grade2Subjects } from './grade-2'
import { grade3Subjects } from './grade-3'
import { grade4Subjects } from './grade-4'
import { grade5Subjects } from './grade-5'
import { grade6Subjects } from './grade-6'
import { grade7Subjects } from './grade-7'
import { grade8Subjects } from './grade-8'
import { grade9Subjects } from './grade-9'
import { grade10Subjects } from './grade-10'
import { grade11Subjects } from './grade-11'

// Экспорт предметов по классам
export { grade0Subjects } from './grade-0'
export { grade1Subjects } from './grade-1'
export { grade2Subjects } from './grade-2'
export { grade3Subjects } from './grade-3'
export { grade4Subjects } from './grade-4'
export { grade5Subjects } from './grade-5'
export { grade6Subjects } from './grade-6'
export { grade7Subjects } from './grade-7'
export { grade8Subjects } from './grade-8'
export { grade9Subjects } from './grade-9'
export { grade10Subjects } from './grade-10'
export { grade11Subjects } from './grade-11'

// Полный учебный план
export const curriculum: GradeCurriculum[] = [
  {
    grade: 0,
    title: "Подготовительный класс",
    subjects: grade0Subjects
  },
  {
    grade: 1,
    title: "1 класс",
    subjects: grade1Subjects
  },
  {
    grade: 2,
    title: "2 класс",
    subjects: grade2Subjects
  },
  {
    grade: 3,
    title: "3 класс",
    subjects: grade3Subjects
  },
  {
    grade: 4,
    title: "4 класс",
    subjects: grade4Subjects
  },
  {
    grade: 5,
    title: "5 класс",
    subjects: grade5Subjects
  },
  {
    grade: 6,
    title: "6 класс",
    subjects: grade6Subjects
  },
  {
    grade: 7,
    title: "7 класс",
    subjects: grade7Subjects
  },
  {
    grade: 8,
    title: "8 класс",
    subjects: grade8Subjects
  },
  {
    grade: 9,
    title: "9 класс",
    subjects: grade9Subjects
  },
  {
    grade: 10,
    title: "10 класс",
    subjects: grade10Subjects
  },
  {
    grade: 11,
    title: "11 класс",
    subjects: grade11Subjects
  }
]

// Типы для обратной совместимости
export type { LessonItem, LessonTopic, Subject, GradeCurriculum } from '../types'
