import { SubjectData, GameLesson } from '@/data/types'

const L = (t: string, d: string, tasks: string[]) => ({ title: t, description: d, tasks })

export const lessons: SubjectData = {
  title: "Иностранный язык",
  icon: "Languages",
  color: "text-pink-400",
  topics: ["Семья", "Еда", "Животные", "Погода", "Цвета", "Числа", "Дом", "Школа"],
  detailedTopics: [
    {
      topic: "Семья",
      lessons: [
        L("Урок 1: Члены семьи", "Названия родственников.", ["Запомнить слова", "Произнести вслух", "Составить предложения", "Описать семью"]),
        L("Урок 2: Описание семьи", "Рассказ о семье.", ["Составить рассказ", "Использовать слова", "Задать вопросы", "Ответить на вопросы"])
      ]
    },
    {
      topic: "Еда",
      lessons: [
        L("Урок 3: Фрукты и овощи", "Названия продуктов.", ["Выучить слова", "Назвать фрукты", "Назвать овощи", "Составить список"]),
        L("Урок 4: Напитки", "Названия напитков.", ["Запомнить слова", "Произнести вслух", "Описать вкус", "Составить диалог"])
      ]
    },
    {
      topic: "Животные",
      lessons: [
        L("Урок 5: Домашние животные", "Наши питомцы.", ["Назвать животных", "Описать питомца", "Рассказать о любимце", "Задать вопросы"]),
        L("Урок 6: Дикие животные", "Животные леса.", ["Выучить слова", "Описать животное", "Где живёт?", "Что ест?"])
      ]
    },
    {
      topic: "Цвета и числа",
      lessons: [
        L("Урок 7: Цвета", "Названия цветов.", ["Запомнить цвета", "Назвать предметы", "Описать картинку", "Игра в цвета"]),
        L("Урок 8: Числа 1-20", "Счёт на английском.", ["Посчитать предметы", "Назвать число", "Решить примеры", "Игра в числа"])
      ]
    }
  ]
}

export const games: GameLesson[] = [
  {
    title: "Соедини слово и перевод",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      {
        type: 'match',
        question: "Соедини английское слово с русским:",
        options: ["Mother", "Father", "Sister", "Brother"],
        correctAnswer: ["Мама", "Папа", "Сестра", "Брат"],
        hint: "Семья = Family"
      },
      {
        type: 'match',
        question: "Соедини слово с переводом:",
        options: ["Cat", "Dog", "Bird", "Fish"],
        correctAnswer: ["Кошка", "Собака", "Птица", "Рыба"],
        hint: "Animals = животные"
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь слова! 📚" }
  },
  {
    title: "Найди правильный перевод",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      {
        type: 'find',
        question: "Что означает Apple?",
        options: ["Груша", "Яблоко", "Апельсин", "Банан"],
        correctAnswer: "Яблоко",
        hint: "Apple = яблоко"
      },
      {
        type: 'find',
        question: "Что означает Milk?",
        options: ["Вода", "Сок", "Молоко", "Чай"],
        correctAnswer: "Молоко",
        hint: "Milk = молоко"
      },
      {
        type: 'find',
        question: "Что означает Bread?",
        options: ["Молоко", "Хлеб", "Сыр", "Масло"],
        correctAnswer: "Хлеб",
        hint: "Bread = хлеб"
      },
      {
        type: 'find',
        question: "Что означает Water?",
        options: ["Вода", "Молоко", "Сок", "Чай"],
        correctAnswer: "Вода",
        hint: "Water = вода"
      }
    ],
    reward: { stars: 3, message: "Супер! Ты знаешь еду! 🍎" }
  },
  {
    title: "Цвета по-английски",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      {
        type: 'match',
        question: "Соедини цвет с переводом:",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: ["Красный", "Синий", "Зелёный", "Жёлтый"],
        hint: "Colors = цвета"
      },
      {
        type: 'find',
        question: "Какой цвет означает Black?",
        options: ["Белый", "Чёрный", "Серый", "Коричневый"],
        correctAnswer: "Чёрный",
        hint: "Black = чёрный"
      },
      {
        type: 'find',
        question: "Какой цвет означает White?",
        options: ["Белый", "Чёрный", "Серый", "Жёлтый"],
        correctAnswer: "Белый",
        hint: "White = белый"
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь цвета! 🌈" }
  },
  {
    title: "Числа по-английски",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      {
        type: 'order',
        question: "Расставь числа по порядку от 1 до 5:",
        options: ["Three", "One", "Five", "Two", "Four"],
        correctAnswer: ["One", "Two", "Three", "Four", "Five"],
        hint: "Один, два, три, четыре, пять"
      },
      {
        type: 'match',
        question: "Соедини число с переводом:",
        options: ["One", "Three", "Five", "Ten"],
        correctAnswer: ["1", "3", "5", "10"],
        hint: "Numbers = числа"
      },
      {
        type: 'find',
        question: "Какое число означает Seven?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7",
        hint: "Seven = 7"
      }
    ],
    reward: { stars: 3, message: "Супер! Ты умеешь считать! 🔢" }
  },
  {
    title: "Животные",
    subject: "Иностранный язык",
    icon: "Languages",
    color: "text-pink-400",
    tasks: [
      {
        type: 'find',
        question: "Какое животное означает Cat?",
        options: ["Собака", "Кошка", "Птица", "Рыба"],
        correctAnswer: "Кошка",
        hint: "Cat = кошка"
      },
      {
        type: 'find',
        question: "Какое животное означает Dog?",
        options: ["Кошка", "Собака", "Птица", "Лошадь"],
        correctAnswer: "Собака",
        hint: "Dog = собака"
      },
      {
        type: 'find',
        question: "Найди домашнее животное:",
        options: ["Tiger", "Lion", "Cat", "Wolf"],
        correctAnswer: "Cat",
        hint: "Pet = домашнее животное"
      },
      {
        type: 'find',
        question: "Найди дикое животное:",
        options: ["Cat", "Dog", "Tiger", "Fish"],
        correctAnswer: "Tiger",
        hint: "Wild = дикий"
      }
    ],
    reward: { stars: 3, message: "Отлично! Ты знаешь животных! 🐱🐶" }
  }
]
